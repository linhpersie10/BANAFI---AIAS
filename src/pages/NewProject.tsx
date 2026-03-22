import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  UploadCloud,
  FileText,
  Building2,
  DollarSign,
  Calendar,
  Users,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

export function NewProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "Hạ tầng",
    budget: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    toast.success("Tạo hồ sơ thành công");
    navigate("/projects");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[#0A2540] hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Khai báo Hồ sơ mới</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Nhập thông tin cơ bản để khởi tạo dự án đầu tư.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xl font-bold text-[#0A2540] flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg mr-3">
                <FileText className="h-5 w-5 text-[#2E68FF]" />
              </div>
              Thông tin chung
            </h3>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-[#0A2540]">
                  Tên dự án <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                    placeholder="VD: Nhà máy Điện gió Xuyên Mộc"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-bold text-[#0A2540]">
                  Loại hình đầu tư <span className="text-rose-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="Hạ tầng">Hạ tầng</option>
                  <option value="Bất động sản">Bất động sản</option>
                  <option value="Sản xuất">Sản xuất</option>
                  <option value="Công nghệ">Công nghệ</option>
                  <option value="M&A">M&A</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="budget" className="block text-sm font-bold text-[#0A2540]">
                  Tổng mức đầu tư dự kiến (Tỷ VNĐ) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    required
                    min="0"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-bold text-[#0A2540]">
                  Đơn vị chủ trì
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                    placeholder="VD: Ban Phát triển Dự án"
                    defaultValue="Ban Phát triển Dự án"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-bold text-[#0A2540]">
                  Ngày bắt đầu dự kiến
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-bold text-[#0A2540]">
                  Ngày kết thúc dự kiến
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-bold text-[#0A2540]">
                Mô tả tóm tắt mục tiêu dự án
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none resize-none"
                placeholder="Nhập mục tiêu, phạm vi và kết quả dự kiến..."
              />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xl font-bold text-[#0A2540] flex items-center">
              <div className="p-2 bg-emerald-50 rounded-lg mr-3">
                <UploadCloud className="h-5 w-5 text-emerald-500" />
              </div>
              Tài liệu đính kèm ban đầu
            </h3>
          </div>
          <div className="p-8">
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-[#2E68FF]/50 transition-all cursor-pointer group">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-8 w-8 text-[#2E68FF]" />
              </div>
              <p className="text-sm font-bold text-[#0A2540] mb-1">Kéo thả file vào đây hoặc click để tải lên</p>
              <p className="text-xs text-slate-500 font-medium">Hỗ trợ PDF, DOCX, XLSX, PPTX (Tối đa 50MB)</p>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-bold mb-1">Lưu ý quan trọng:</p>
                <p className="font-medium opacity-90">Hệ thống AI sẽ tự động quét và trích xuất thông tin từ các tài liệu bạn tải lên để hỗ trợ điền form ở các bước tiếp theo. Vui lòng đảm bảo tài liệu rõ nét và đúng định dạng.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-[#2E68FF] hover:bg-[#1A4BCE] text-white rounded-xl text-sm font-bold flex items-center shadow-[0_4px_14px_0_rgba(46,104,255,0.39)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <Save className="h-5 w-5 mr-2" />
            Lưu & Tiếp tục
          </button>
        </div>
      </form>
    </div>
  );
}
