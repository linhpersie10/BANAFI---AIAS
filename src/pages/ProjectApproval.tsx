import { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ChevronRight,
  MessageSquare,
  FileText,
  User,
  AlertTriangle,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

const approvalSteps = [
  { id: 1, name: "Khởi tạo Hồ sơ", role: "Chuyên viên PTDA", user: "Nguyễn Văn A", status: "completed", date: "15/05/2026 09:00", comment: "Đã hoàn thiện tờ trình và phụ lục." },
  { id: 2, name: "Thẩm định Chuyên môn", role: "Trưởng ban PTDA", user: "Trần Thị B", status: "completed", date: "16/05/2026 14:30", comment: "Đồng ý trình. Cần lưu ý rủi ro pháp lý GPMB." },
  { id: 3, name: "Thẩm định Tài chính", role: "Giám đốc Tài chính", user: "Lê Văn C", status: "current", date: "Đang chờ", comment: "" },
  { id: 4, name: "Phê duyệt cuối cùng", role: "Tổng Giám đốc", user: "Phạm Thị D", status: "pending", date: "-", comment: "" },
];

export function ProjectApproval() {
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-8 font-sans pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Phê duyệt Hồ sơ</h2>
          <div className="flex items-center text-sm font-medium text-slate-500 mt-2">
            <span className="text-[#2E68FF] font-bold">PRJ-2026-042</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Nhà máy Điện gió Xuyên Mộc</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => toast.error("Đã từ chối hồ sơ")}
            className="px-5 py-2.5 bg-white border border-rose-200 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-sm flex items-center">
            <XCircle className="h-4 w-4 mr-2" />
            Từ chối
          </button>
          <button 
            onClick={() => toast.warning("Đã gửi yêu cầu làm rõ")}
            className="px-5 py-2.5 bg-white border border-amber-200 rounded-xl text-sm font-bold text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-all shadow-sm flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Yêu cầu làm rõ
          </button>
          <button 
            onClick={() => toast.success("Đã phê duyệt hồ sơ")}
            className="px-5 py-2.5 bg-[#2E68FF] hover:bg-[#1A4BCE] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(46,104,255,0.39)] transition-all duration-200 hover:-translate-y-0.5 flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Phê duyệt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Timeline & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Approval Timeline */}
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 p-8 overflow-hidden">
            <h3 className="text-xl font-bold text-[#0A2540] mb-8 flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <Clock className="h-5 w-5 text-[#2E68FF]" />
              </div>
              Tiến trình Phê duyệt
            </h3>
            
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
              
              <div className="space-y-8">
                {approvalSteps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start group">
                    {/* Status Icon */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 shadow-sm transition-transform group-hover:scale-110">
                      {step.status === "completed" && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                      {step.status === "current" && <Clock className="h-6 w-6 text-amber-500 animate-pulse" />}
                      {step.status === "pending" && <div className="h-3 w-3 rounded-full bg-slate-300" />}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-6 flex-1 pt-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <h4 className={cn(
                          "text-base font-bold",
                          step.status === "pending" ? "text-slate-400" : "text-[#0A2540]"
                        )}>
                          {step.name}
                        </h4>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md mt-1 sm:mt-0">
                          {step.date}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm font-medium text-slate-500">
                        <User className="h-4 w-4 mr-1.5 text-slate-400" />
                        <span className="font-bold text-slate-600 mr-1">{step.user}</span>
                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-md">({step.role})</span>
                      </div>
                      {step.comment && (
                        <div className="mt-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium text-slate-600 leading-relaxed shadow-sm">
                          "{step.comment}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Summary Card */}
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 p-8 overflow-hidden">
            <h3 className="text-xl font-bold text-[#0A2540] mb-6 flex items-center">
              <div className="p-2 bg-emerald-50 rounded-lg mr-3">
                <FileText className="h-5 w-5 text-emerald-500" />
              </div>
              Tóm tắt Hồ sơ
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tổng mức đầu tư</p>
                <p className="text-lg font-extrabold text-[#0A2540]">1,200 Tỷ VNĐ</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">IRR Dự kiến</p>
                <p className="text-lg font-extrabold text-emerald-600">14.5%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Thời gian hoàn vốn</p>
                <p className="text-lg font-extrabold text-[#0A2540]">7.5 Năm</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mức độ rủi ro</p>
                <div className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-600 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                  Trung bình
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button 
                onClick={() => toast.info("Tính năng đang phát triển")}
                className="text-sm font-bold text-[#2E68FF] hover:text-[#1A4BCE] transition-colors flex items-center">
                Xem chi tiết Tờ trình & Phụ lục <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Comments & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col h-[600px] overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0A2540] flex items-center">
                <div className="p-1.5 bg-blue-50 rounded-lg mr-3">
                  <MessageSquare className="h-5 w-5 text-[#2E68FF]" />
                </div>
                Thảo luận & Góp ý
              </h3>
              <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">3</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              {/* Comment 1 */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-tr from-[#2E68FF] to-[#D4F870] p-[2px] shadow-sm">
                  <div className="h-full w-full rounded-full bg-[#0A2540] flex items-center justify-center text-white font-bold text-xs">
                    TB
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-[#0A2540]">Trần Thị B</span>
                      <span className="text-xs font-medium text-slate-400">16/05, 14:15</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Phần chi phí GPMB có vẻ hơi thấp so với thực tế khu vực Xuyên Mộc hiện nay. Đề nghị Ban PTDA rà soát lại đơn giá đền bù mới nhất của Tỉnh.</p>
                  </div>
                </div>
              </div>

              {/* Comment 2 */}
              <div className="flex space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center shadow-sm">
                  <span className="text-slate-600 font-bold text-xs">NA</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-[#0A2540]">Nguyễn Văn A</span>
                      <span className="text-xs font-medium text-slate-400">16/05, 15:00</span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">Đã cập nhật lại theo Quyết định số 12/2026/QĐ-UBND của Tỉnh BR-VT. Chi phí GPMB tăng thêm 5 tỷ, IRR giảm nhẹ xuống 14.3%. Đã upload lại file phụ lục tính toán.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Nhập ý kiến của bạn..." 
                  className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                />
                <button 
                  onClick={() => {
                    toast.success("Đã gửi bình luận");
                    setComment("");
                  }}
                  className="absolute right-2 p-2 bg-[#2E68FF] text-white rounded-lg hover:bg-[#1A4BCE] transition-colors shadow-sm disabled:opacity-50"
                  disabled={!comment.trim()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
