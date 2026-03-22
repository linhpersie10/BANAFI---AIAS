import { GoogleGenAI, Type } from "@google/genai";

// Khởi tạo Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const AIAS_SYSTEM_PROMPT = `Act as a world-class Investment Appraisal Expert and Financial Systems Architect with decades of experience at top-tier firms like Goldman Sachs and McKinsey. Your mission is to power the "AI Investment Appraisal System" (AIAS).

Your core capabilities include:
1. Proficiency in IFRS, GAAP, and CFA-level financial modeling (DCF, NPV, IRR, WACC, Sensitivity Analysis).
2. Deep understanding of project risk management and strategic alignment.
3. Ability to transform raw financial data into professional, executive-level investment memorandums.

Rules of Engagement:
- Be rigorous: Flag inconsistencies in cash flow or logic.
- Be strategic: Always link financial outcomes to business objectives.
- Be adaptive: Learn from the "Approver's" feedback to refine future recommendations.
- Maintain professional, objective, and consultative tone at all times.`;

export const CLASSIFICATION_ENGINE_RULES = `
Define a "Project Classification Engine" for the system based on the following logic:

1. Classification by Type:
   - Greenfield (New Ventures)
   - Expansion (Increasing Capacity)
   - Replacement (Asset Upgrades)
   - M&A (Acquisitions)

2. Classification by Tier (Complexity):
   - Tier 1 (Small): Low CapEx. Focus on Payback Period and ROI. Short memo required.
   - Tier 2 (Standard): Medium CapEx. Requires full DCF, WACC calculation, and SWOT analysis.
   - Tier 3 (Strategic): High CapEx/Strategic impact. Requires Scenario Analysis (Best/Worst/Base), Monte Carlo simulations, and ESG impact assessment.

Task: When provided a brief project summary, you must classify it and output a "Required Documents Checklist" and the specific "Financial Appraisal Template" appropriate for that Tier.
`;

/**
 * Hàm phân loại dự án dựa trên tóm tắt (Project Classification Engine)
 */
export async function classifyProjectSummary(summary: string) {
  try {
    const prompt = `
      ${CLASSIFICATION_ENGINE_RULES}
      
      Here is the project summary provided by the user:
      "${summary}"
      
      Please classify this project and provide the required checklist and template.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, description: "Greenfield, Expansion, Replacement, or M&A" },
                tier: { type: Type.STRING, description: "Tier 1, Tier 2, or Tier 3" },
                reasoning: { type: Type.STRING, description: "Brief explanation of why this classification was chosen based on the summary." }
              },
              required: ["type", "tier", "reasoning"]
            },
            checklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of required documents based on the Type and Tier."
            },
            template: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the financial appraisal template" },
                requiredMetrics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of financial metrics required (e.g., ROI, NPV, IRR, Monte Carlo)"
                },
                sections: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Key sections required in the investment memo"
                }
              },
              required: ["name", "requiredMetrics", "sections"]
            }
          },
          required: ["classification", "checklist", "template"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Lỗi khi phân loại dự án:", error);
    throw new Error("Không thể phân loại dự án lúc này. Vui lòng thử lại sau.");
  }
}

export const WRITING_ASSISTANT_RULES = `
You are now the "Intelligent Writing Assistant." Your task is to assist users in gathering data and drafting the Investment Proposal.

Requirements:
1. Data Guidance: If a user provides incomplete data for a project (especially Tier 3), identify the missing pieces (e.g., "Market growth rate is missing," "Terminal value assumptions are unclear").
2. Executive Summary Generation: Transform raw financial tables (Excel style) into a narrative format. 
   - Instead of "IRR is 15%", write: "The project yields an IRR of 15%, providing a solid margin over our 10% hurdle rate, indicating strong resilience against capital cost fluctuations."
3. Visual Data Representation: Suggest which charts (Waterfall, Tornado, or Sensitivity Matrix) should be used to best present the findings to the Board.
4. Proactive Correction (RAG Integration): If Historical Approver Preferences are provided, you MUST include a "Pre-emptive Insight" section. This section must explicitly state how the current draft addresses or mitigates the specific concerns raised in past Board feedback (e.g., "Based on previous Board feedback regarding FX volatility, I have strengthened...").
`;

/**
 * Hàm hỗ trợ soạn thảo Tờ trình (Intelligent Writing Assistant)
 */
export async function generateInvestmentDraft(rawData: string, tier: string, historicalPreferences: string[] = []) {
  try {
    const prompt = `
      ${WRITING_ASSISTANT_RULES}
      
      Project Tier: ${tier}
      
      Historical Approver Preferences (RAG Data):
      ${historicalPreferences.length > 0 ? historicalPreferences.map(p => "- " + p).join('\n') : "None yet."}
      
      Raw Financial Data / Notes provided by the user:
      "${rawData}"
      
      Please analyze the data, identify missing information based on the Tier, generate a professional executive summary narrative, suggest visual charts, and if Historical Preferences exist, provide a preEmptiveInsight.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            missingData: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of missing data points or unclear assumptions based on the project Tier."
            },
            executiveSummary: {
              type: Type.STRING,
              description: "A professional, narrative-style executive summary transforming the raw numbers into strategic insights."
            },
            preEmptiveInsight: {
              type: Type.STRING,
              description: "A proactive statement addressing how this proposal aligns with or mitigates the concerns found in the Historical Approver Preferences. Leave empty if no historical preferences were provided."
            },
            chartSuggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  chartType: { type: Type.STRING, description: "e.g., Waterfall Chart, Tornado Chart, Sensitivity Matrix" },
                  reason: { type: Type.STRING, description: "Why this chart is best for presenting these specific findings to the Board." }
                },
                required: ["chartType", "reason"]
              },
              description: "Suggestions for visual data representation."
            }
          },
          required: ["missingData", "executiveSummary", "chartSuggestions"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Lỗi khi tạo bản nháp tờ trình:", error);
    throw new Error("Không thể tạo bản nháp lúc này. Vui lòng thử lại sau.");
  }
}
export async function analyzeInvestmentProject(projectData: any, additionalPrompt: string = "") {
  try {
    const prompt = `
      Dưới đây là thông tin dự án đầu tư:
      ${JSON.stringify(projectData, null, 2)}
      
      Yêu cầu phân tích:
      ${additionalPrompt || "Hãy phân tích tính khả thi tài chính, nhận diện rủi ro và đưa ra đề xuất cho Ban Giám đốc."}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Lỗi khi gọi AI phân tích:", error);
    throw new Error("Không thể thực hiện phân tích AI lúc này. Vui lòng thử lại sau.");
  }
}

/**
 * Hàm lấy gợi ý chỉ số ngành (Industry Benchmarks) cho Phase 2
 */
export async function getIndustryBenchmarks(projectType: string, objective: string, capex: string) {
  try {
    const prompt = `
      You are a Financial Expert. The user is unsure about financial assumptions for their project.
      Project Type: ${projectType}
      Strategic Objective: ${objective}
      Estimated CapEx: ${capex}
      
      Provide reasonable industry benchmarks or estimates for:
      1. Revenue Projections (e.g., "15% annual growth" or "50B VND/year")
      2. OPEX (e.g., "40% of revenue" or "20B VND/year")
      3. Project Life (e.g., "10 years")
      4. Discount Rate / WACC (e.g., "12%")
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            revenue: { type: Type.STRING },
            opex: { type: Type.STRING },
            projectLife: { type: Type.STRING },
            discountRate: { type: Type.STRING },
            reasoning: { type: Type.STRING, description: "Brief explanation of these benchmarks." }
          },
          required: ["revenue", "opex", "projectLife", "discountRate", "reasoning"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Lỗi khi lấy benchmarks:", error);
    throw new Error("Không thể lấy dữ liệu tham khảo lúc này.");
  }
}

/**
 * Hàm tổng hợp Tờ trình (Proposal Synthesis) từ dữ liệu 3 Phase
 */
export async function generateStructuredProposal(formData: any, tier: string) {
  try {
    const prompt = `
      You are the "Intelligent Writing Assistant" generating a Draft Investment Proposal.
      
      Project Tier: ${tier} (Constraint: Tier 3 projects MUST include deeper analysis of 'Sensitivity' and 'Strategic Fit').
      
      Phase 1 - Core Inputs:
      - Name: ${formData.projectName}
      - Type: ${formData.projectType}
      - CapEx: ${formData.capex}
      - Strategic Objective: ${formData.strategicObjective}
      
      Phase 2 - Financial Assumptions:
      - Revenue Projections: ${formData.revenue}
      - OPEX: ${formData.opex}
      - Project Life: ${formData.projectLife}
      - Discount Rate: ${formData.discountRate}
      
      Phase 3 - Qualitative Insights:
      - Top Risks: ${formData.topRisks}
      - Competitive Advantage: ${formData.competitiveAdvantage}
      
      Task: Synthesize this data into a professional Draft Investment Proposal. Calculate/Estimate NPV, IRR, and Payback Period based on the provided inputs (make reasonable financial approximations if exact cash flows aren't provided, but state them as estimates).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING, description: "A high-level pitch of the investment." },
            financialAnalysis: {
              type: Type.OBJECT,
              properties: {
                npv: { type: Type.STRING },
                irr: { type: Type.STRING },
                paybackPeriod: { type: Type.STRING },
                narrative: { type: Type.STRING, description: "Explanation of the financial metrics." }
              },
              required: ["npv", "irr", "paybackPeriod", "narrative"]
            },
            riskMatrix: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                },
                required: ["risk", "mitigation"]
              },
              description: "Structured table of identified risks and mitigation strategies."
            },
            tier3Extras: {
              type: Type.OBJECT,
              properties: {
                sensitivityAnalysis: { type: Type.STRING, description: "Required for Tier 3: Deeper sensitivity analysis." },
                strategicFit: { type: Type.STRING, description: "Required for Tier 3: Deeper strategic fit analysis." }
              }
            }
          },
          required: ["executiveSummary", "financialAnalysis", "riskMatrix"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Lỗi khi tổng hợp tờ trình:", error);
    throw new Error("Không thể tổng hợp tờ trình lúc này.");
  }
}

/**
 * Hàm Thẩm định Tờ trình (Appraisal & Review Module)
 */
export async function generateAppraisalReport(proposalContent: string, hurdleRate: string = "10%") {
  try {
    const prompt = `
      You are a Senior Investment Auditor. Analyze the following Investment Proposal.
      
      Company Hurdle Rate: ${hurdleRate}
      
      Proposal Content:
      "${proposalContent}"
      
      Task:
      1. Audit Mode: Identify any financial red flags (e.g., overly optimistic revenue growth, inconsistent WACC, or ignored operational risks).
      2. Benchmarking: Compare the project's IRR and NPV against the company's Hurdle Rate and typical historical performance.
      3. Scoring System: Generate an "Appraisal Score" (Scale 1-100) based on:
         - Financial Feasibility (40%)
         - Strategic Alignment (30%)
         - Risk Controllability (30%)
      4. Output: Provide a "Review Report" for the board, highlighting whether the project is 'Recommended', 'Needs Revision', or 'Not Recommended'.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of financial or operational red flags identified."
            },
            benchmarking: {
              type: Type.OBJECT,
              properties: {
                irrComparison: { type: Type.STRING },
                npvComparison: { type: Type.STRING },
                historicalContext: { type: Type.STRING }
              }
            },
            scoring: {
              type: Type.OBJECT,
              properties: {
                financialScore: { type: Type.NUMBER, description: "Score out of 40" },
                strategicScore: { type: Type.NUMBER, description: "Score out of 30" },
                riskScore: { type: Type.NUMBER, description: "Score out of 30" },
                totalScore: { type: Type.NUMBER, description: "Total score out of 100" },
                reasoning: { type: Type.STRING, description: "Explanation of the scores." }
              }
            },
            recommendation: {
              type: Type.STRING,
              description: "Must be exactly one of: 'Recommended', 'Needs Revision', or 'Not Recommended'"
            },
            reviewReport: {
              type: Type.STRING,
              description: "A summary review report for the board."
            }
          },
          required: ["redFlags", "benchmarking", "scoring", "recommendation", "reviewReport"]
        }
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Lỗi khi thẩm định tờ trình:", error);
    throw new Error("Không thể thẩm định tờ trình lúc này.");
  }
}

/**
 * Hàm tạo Smart Checklist cho Project Declaration
 */
export async function generateSmartChecklist(projectData: any) {
  try {
    const prompt = `
      You are the Lead System Architect for an Investment Management Platform.
      Generate a dynamic document checklist based on the following project details:
      
      Project Name: ${projectData.projectName}
      Type: ${projectData.projectType}
      Tier: ${projectData.tier}
      
      Rules:
      - If Tier 1: Quotations (3 vendors), Technical Specifications, Brief Rationale.
      - If Tier 2: Feasibility Study (FS), Financial Model (Excel), Market Research Report, Draft Contract.
      - If Tier 3: Environmental Impact Assessment (EIA), Legal Permits (1/500), Strategic Alignment Memo, Risk Mitigation Plan, Board Resolution Draft.
      - Specific to F&B: Food Safety Certifications, Menu Costing.
      - Specific to Infrastructure: Technical Blueprints, Land Survey Data.
      
      Output a JSON array of objects, each with 'id' (string), 'name' (string), and 'description' (string).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["id", "name", "description"]
          }
        }
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Lỗi khi tạo checklist:", error);
    throw new Error("Không thể tạo checklist lúc này.");
  }
}

/**
 * Hàm trích xuất bài học từ phản hồi của Ban Giám đốc (Feedback Loop)
 * Treats every Admin comment as a training data point for RAG logic.
 */
export async function extractFeedbackLearnings(approverFeedback: string) {
  try {
    const prompt = `
      You are the "Feedback Intelligence Loop" engine.
      
      Approver (Board/Admin) Feedback:
      "${approverFeedback}"
      
      Task: Analyze these comments to identify "Approver Preferences" (Pattern Recognition). 
      Extract the core strategic priorities, risk aversions, or specific metrics the Board focuses on (e.g., "The Board is currently very risk-averse regarding FX volatility" or "The CEO prioritizes projects with a Payback under 3 years").
      
      Output an array of distinct, generalized preference statements that can be used as RAG training data for future project appraisals.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview", // Using Pro for deeper pattern recognition
      contents: prompt,
      config: {
        systemInstruction: AIAS_SYSTEM_PROMPT,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of extracted Approver Preferences to be stored in the RAG database."
        }
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Lỗi khi trích xuất feedback:", error);
    return [];
  }
}
