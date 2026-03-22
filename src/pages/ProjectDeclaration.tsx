import { useState } from "react";
import { 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  UploadCloud,
  MessageSquare,
  Send,
  Bot,
  User,
  AlertCircle,
  FileSearch,
  Wand2
} from "lucide-react";
import { toast } from "sonner";

export function ProjectDeclaration() {
  const [activeTab, setActiveTab] = useState("form");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Chào bạn, tôi là trợ lý AI của BANAFI. Tôi đã quét tài liệu 'Bao_cao_kha_thi_Dien_gio.pdf' bạn vừa tải lên. Bạn có muốn tôi tự động điền các thông tin vào form Khai báo không?" }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { role: "user", content: chatMessage }]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "ai", 
        content: "Đã hiểu. Tôi đang trích xuất phần 'Phân tích Rủi ro' từ trang 12 của tài liệu và cập nhật vào form. Bạn vui lòng kiểm tra lại nhé." 
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Khai báo chi tiết Hồ sơ</h2>
          <div className="flex items-center text-sm font-medium text-slate-500 mt-2">
            <span className="text-[#2E68FF] font-bold">PRJ-2026-042</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Nhà máy Điện gió Xuyên Mộc</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => toast.success("Đã lưu bản nháp")}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Lưu nháp
          </button>
          <button 
            onClick={() => toast.success("Đã gửi trình duyệt thành công")}
            className="px-5 py-2.5 bg-[#2E68FF] hover:bg-[#1A4BCE] text-white rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(46,104,255,0.39)] transition-all duration-200 hover:-translate-y-0.5">
            Trình duyệt
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 min-h-0">
        
        {/* Left Panel: Form & Documents */}
        <div className="flex-1 bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2">
            <button 
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center ${activeTab === "form" ? "bg-white text-[#2E68FF] shadow-sm border border-slate-200/60" : "text-slate-500 hover:text-[#0A2540] hover:bg-slate-100/50"}`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Biểu mẫu Khai báo
            </button>
            <button 
              onClick={() => setActiveTab("docs")}
              className={`flex-1 py-3 px-4 text-sm font-bold rounded-xl transition-all flex items-center justify-center ${activeTab === "docs" ? "bg-white text-[#2E68FF] shadow-sm border border-slate-200/60" : "text-slate-500 hover:text-[#0A2540] hover:bg-slate-100/50"}`}
            >
              <FileSearch className="h-4 w-4 mr-2" />
              Tài liệu gốc (PDF)
            </button>
          </div>

          {/* Form Content */}
          {activeTab === "form" && (
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* AI Suggestion Banner */}
              <div className="bg-blue-50 border border-[#2E68FF]/20 rounded-2xl p-5 flex items-start shadow-sm">
                <div className="p-2 bg-[#2E68FF] rounded-xl mr-4 flex-shrink-0 shadow-md shadow-[#2E68FF]/20">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A2540] mb-1">AI đã tự động điền 65% biểu mẫu</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">Dựa trên tài liệu "Bao_cao_kha_thi_Dien_gio.pdf", AI đã trích xuất các thông tin về Tổng mức đầu tư, IRR, NPV và Phân tích rủi ro. Các trường được điền tự động có viền màu xanh. Vui lòng kiểm tra lại.</p>
                  <button 
                    onClick={() => toast.info("Tính năng đang phát triển")}
                    className="mt-3 text-sm font-bold text-[#2E68FF] hover:text-[#1A4BCE] transition-colors">Xem chi tiết trích xuất</button>
                </div>
              </div>

              {/* Form Sections */}
              <div className="space-y-6">
                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/30">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-5 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center text-sm mr-3 shadow-sm">1</span>
                    Thông tin Pháp lý & Quy hoạch
                  </h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">Tình trạng đất đai</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-[#2E68FF]/40 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm" defaultValue="Đã có quyết định giao đất (50 năm)" />
                      <p className="text-xs text-[#2E68FF] font-bold mt-1.5 flex items-center"><Wand2 className="h-3 w-3 mr-1" /> AI điền từ trang 4</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">Sự phù hợp quy hoạch</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-[#2E68FF]/40 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm" defaultValue="Phù hợp Quy hoạch điện VIII" />
                      <p className="text-xs text-[#2E68FF] font-bold mt-1.5 flex items-center"><Wand2 className="h-3 w-3 mr-1" /> AI điền từ trang 5</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/30">
                  <h3 className="text-lg font-bold text-[#0A2540] mb-5 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center text-sm mr-3 shadow-sm">2</span>
                    Chỉ số Tài chính (Tóm tắt)
                  </h3>
                  <div className="grid grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">Tổng mức đầu tư</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-[#2E68FF]/40 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm" defaultValue="1,200 Tỷ VNĐ" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">IRR dự kiến</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-[#2E68FF]/40 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm" defaultValue="14.5%" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0A2540] mb-2">Thời gian hoàn vốn</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-[#2E68FF]/40 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm" defaultValue="7.5 Năm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Docs Content (Placeholder) */}
          {activeTab === "docs" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50/50">
              <div className="p-6 bg-white rounded-full shadow-sm mb-6">
                <FileText className="h-16 w-16 text-slate-300" />
              </div>
              <p className="text-lg font-bold text-[#0A2540] mb-2">Trình xem PDF đang được tích hợp</p>
              <p className="text-sm text-slate-500 font-medium text-center max-w-md">Tại đây sẽ hiển thị tài liệu gốc. Khi click vào một trường thông tin do AI điền bên form, PDF sẽ tự động cuộn đến vị trí trích xuất tương ứng.</p>
            </div>
          )}
        </div>

        {/* Right Panel: AI Assistant Chat */}
        <div className="w-96 bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-[#0A2540] flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center">
              <div className="p-1.5 bg-[#2E68FF] rounded-lg mr-3 shadow-sm">
                <Bot className="h-5 w-5 text-white" />
              </div>
              Trợ lý AI BANAFI
            </h3>
            <div className="flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-emerald-400">Online</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/30">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === "user" ? "bg-slate-200 ml-3" : "bg-[#2E68FF] mr-3"}`}>
                    {msg.role === "user" ? <User className="h-4 w-4 text-slate-600" /> : <Bot className="h-4 w-4 text-white" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-white border border-slate-200 text-[#0A2540] rounded-tr-sm" 
                      : "bg-[#F0F5FF] border border-[#2E68FF]/20 text-[#0A2540] rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Yêu cầu AI trích xuất, tóm tắt..." 
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 p-2 bg-[#2E68FF] text-white rounded-lg hover:bg-[#1A4BCE] transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button 
                onClick={() => setChatMessage("Tóm tắt rủi ro")}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors">Tóm tắt rủi ro</button>
              <button 
                onClick={() => setChatMessage("Kiểm tra pháp lý")}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors">Kiểm tra pháp lý</button>
              <button 
                onClick={() => setChatMessage("Tính lại IRR")}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors">Tính lại IRR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
