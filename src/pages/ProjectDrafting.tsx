import { useState } from "react";
import { 
  CheckCircle2, 
  ChevronRight,
  Save,
  Download,
  Printer,
  Wand2,
  AlertCircle,
  RefreshCw,
  FileSignature,
  FileText
} from "lucide-react";
import { toast } from "sonner";

export function ProjectDrafting() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState(`TỜ TRÌNH XIN PHÊ DUYỆT CHỦ TRƯƠNG ĐẦU TƯ
Dự án: Nhà máy Điện gió Xuyên Mộc

Kính gửi: Hội đồng Quản trị / Ban Tổng Giám đốc

I. THÔNG TIN CHUNG
1. Tên dự án: Nhà máy Điện gió Xuyên Mộc
2. Địa điểm: Huyện Xuyên Mộc, Tỉnh Bà Rịa - Vũng Tàu
3. Chủ đầu tư: Công ty Cổ phần Năng lượng Tái tạo BANAFI
4. Mục tiêu đầu tư: Xây dựng nhà máy điện gió công suất 50MW, cung cấp điện sạch hòa lưới quốc gia, góp phần đảm bảo an ninh năng lượng và phát triển kinh tế địa phương.

II. SỰ CẦN THIẾT ĐẦU TƯ
(AI đang chờ lệnh để viết phần này dựa trên phân tích thị trường...)

III. QUY MÔ VÀ TỔNG MỨC ĐẦU TƯ
1. Quy mô: 10 tuabin gió (5MW/tuabin), trạm biến áp 110kV, đường dây đấu nối.
2. Tổng mức đầu tư dự kiến: 1,200 Tỷ VNĐ
   - Chi phí xây dựng: 300 Tỷ VNĐ
   - Chi phí thiết bị: 700 Tỷ VNĐ
   - Chi phí GPMB: 50 Tỷ VNĐ
   - Chi phí QLDA & Tư vấn: 50 Tỷ VNĐ
   - Dự phòng: 100 Tỷ VNĐ

IV. HIỆU QUẢ TÀI CHÍNH
- IRR: 14.5%
- NPV: 150 Tỷ VNĐ
- Thời gian hoàn vốn: 7.5 năm

V. ĐÁNH GIÁ RỦI RO
- Rủi ro pháp lý: ...
- Rủi ro thi công: ...
- Rủi ro vận hành: ...`);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setContent(prev => prev.replace(
        "(AI đang chờ lệnh để viết phần này dựa trên phân tích thị trường...)",
        "Nhu cầu tiêu thụ điện tại khu vực phía Nam đang tăng trưởng mạnh (khoảng 8-10%/năm). Việc đầu tư dự án phù hợp với định hướng phát triển năng lượng tái tạo của Chính phủ (Quy hoạch điện VIII), đồng thời tận dụng được tiềm năng gió rất tốt tại khu vực ven biển Xuyên Mộc. Dự án dự kiến mang lại dòng tiền ổn định và tỷ suất sinh lời hấp dẫn cho Tập đoàn."
      ));
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Soạn thảo Tờ trình</h2>
          <div className="flex items-center text-sm font-medium text-slate-500 mt-2">
            <span className="text-[#2E68FF] font-bold">PRJ-2026-042</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Nhà máy Điện gió Xuyên Mộc</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => toast.success("Đã xuất file Word")}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Xuất Word
          </button>
          <button 
            onClick={() => toast.info("Đang kết nối máy in...")}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            In
          </button>
          <button 
            onClick={() => toast.success("Đã lưu bản nháp")}
            className="px-5 py-2.5 bg-[#2E68FF] hover:bg-[#1A4BCE] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(46,104,255,0.39)] transition-all duration-200 hover:-translate-y-0.5 flex items-center">
            <Save className="h-4 w-4 mr-2" />
            Lưu bản nháp
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Panel: Editor */}
        <div className="flex-1 bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileSignature className="h-5 w-5 text-[#2E68FF]" />
              </div>
              <span className="font-bold text-[#0A2540]">Trình soạn thảo văn bản</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-bold text-sm">B</button>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-bold text-sm italic">I</button>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-bold text-sm underline">U</button>
              <div className="w-px h-6 bg-slate-300 mx-2"></div>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-bold text-sm">H1</button>
              <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 font-bold text-sm">H2</button>
            </div>
          </div>
          <textarea 
            className="flex-1 w-full p-8 resize-none outline-none text-slate-700 leading-relaxed font-medium text-[15px] bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck="false"
          />
        </div>

        {/* Right Panel: AI Tools */}
        <div className="w-96 flex flex-col gap-6">
          {/* AI Generator Card */}
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 p-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
            <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center relative z-10">
              <div className="p-1.5 bg-[#2E68FF] rounded-lg mr-3 shadow-sm">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              AI Viết tự động
            </h3>
            <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed relative z-10">
              AI có thể tự động viết các phần nội dung dựa trên dữ liệu đã khai báo và các biểu mẫu chuẩn của Tập đoàn.
            </p>
            
            <div className="space-y-3 relative z-10">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-[#2E68FF] hover:bg-blue-50 transition-all group/btn disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-slate-400 group-hover/btn:text-[#2E68FF] mr-3 transition-colors" />
                  <span className="text-sm font-bold text-[#0A2540]">Viết "Sự cần thiết đầu tư"</span>
                </div>
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 text-[#2E68FF] animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover/btn:text-[#2E68FF] transition-colors" />
                )}
              </button>

              <button 
                onClick={() => toast.info("Tính năng đang phát triển")}
                className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:border-[#2E68FF] hover:bg-blue-50 transition-all group/btn shadow-sm">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-slate-400 group-hover/btn:text-[#2E68FF] mr-3 transition-colors" />
                  <span className="text-sm font-bold text-[#0A2540]">Phân tích "Rủi ro dự án"</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover/btn:text-[#2E68FF] transition-colors" />
              </button>
            </div>
          </div>

          {/* Compliance Check Card */}
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 p-6 overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
            <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center relative z-10">
              <div className="p-1.5 bg-emerald-500 rounded-lg mr-3 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              Kiểm tra Tuân thủ
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0A2540]">Đúng biểu mẫu quy định</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Sử dụng Form BM-ĐT-01 ban hành ngày 01/01/2026</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0A2540]">Đầy đủ các mục bắt buộc</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Đã có đủ 5 phần nội dung chính</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0A2540]">Cảnh báo logic tài chính</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Tổng mức đầu tư (1,200) không khớp với tổng chi tiết (1,250). Cần kiểm tra lại mục III.2.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => toast.success("Đã kiểm tra xong. Không có lỗi mới.")}
              className="w-full mt-6 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center relative z-10">
              <RefreshCw className="h-4 w-4 mr-2 text-slate-500" />
              Chạy lại kiểm tra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
