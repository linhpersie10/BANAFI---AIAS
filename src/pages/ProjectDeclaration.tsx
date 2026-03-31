import { useState, useEffect, ChangeEvent } from "react";
import { 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Building2,
  Briefcase,
  Layers,
  DollarSign,
  ListChecks,
  FileCheck,
  AlertCircle,
  Loader2,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function ProjectDeclaration() {
  const { user, loading: authLoading } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    pic: "",
    time: "",
    location: "",
    type: "",
    expertise: "",
    scale: "",
    capital: ""
  });
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "categories"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching categories:", error);
      if (user) {
        toast.error("Không có quyền truy cập dữ liệu danh mục");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const getCategoryItems = (type: string) => {
    const cat = categories.find(c => c.type === type);
    return cat ? cat.items : [];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrepareDocs = () => {
    if (!formData.name || !formData.department || !formData.pic || !formData.time || !formData.location || !formData.type || !formData.expertise || !formData.scale || !formData.capital) {
      toast.error("Vui lòng điền đầy đủ thông tin cơ bản của dự án");
      return;
    }
    setShowChecklist(true);
    toast.success("Đã tạo danh mục hồ sơ cần chuẩn bị");
  };

  if (authLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#2E68FF] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center font-sans text-center">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 max-w-md">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#0A2540] mb-2">Yêu cầu đăng nhập</h2>
          <p className="text-slate-500 mb-8">
            Bạn cần đăng nhập để thực hiện khai báo hồ sơ dự án.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#2E68FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Khai báo Hồ sơ Dự án</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Khai báo thông tin cơ bản để hệ thống gợi ý danh mục hồ sơ phù hợp.</p>
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
        
        {/* Left Panel: Basic Info Form */}
        <div className="flex-1 bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg mr-3">
              <FileText className="h-5 w-5 text-[#2E68FF]" />
            </div>
            <h3 className="text-lg font-bold text-[#0A2540]">Thông tin cơ bản dự án</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Tên dự án <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                  placeholder="Nhập tên dự án..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Phòng ban triển khai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                  placeholder="VD: Ban Đầu tư"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  PIC (Người phụ trách) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="pic"
                  value={formData.pic}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                  placeholder="VD: Nguyễn Văn A"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Thời gian triển khai <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Địa điểm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none"
                  placeholder="VD: TP. Hồ Chí Minh"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Loại hình Dự án Đầu tư <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Building2 className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">-- Chọn loại hình --</option>
                    {getCategoryItems('project_type').map((type: string) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Mảng chuyên môn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">-- Chọn mảng chuyên môn --</option>
                    {getCategoryItems('expertise_area').map((area: string) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Quy mô dự án <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Layers className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    name="scale"
                    value={formData.scale}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">-- Chọn quy mô --</option>
                    {getCategoryItems('project_scale').map((scale: string) => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#0A2540]">
                  Quy mô vốn <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </div>
                  <select
                    name="capital"
                    value={formData.capital}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">-- Chọn quy mô vốn --</option>
                    {getCategoryItems('capital_scale').map((capital: string) => (
                      <option key={capital} value={capital}>{capital}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handlePrepareDocs}
                className="px-6 py-3 bg-[#0A2540] hover:bg-[#113255] text-white rounded-xl text-sm font-bold shadow-md transition-all duration-200 flex items-center"
              >
                <ListChecks className="h-5 w-5 mr-2" />
                Chuẩn bị tài liệu
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Document Checklist */}
        <div className="w-[350px] bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-[#0A2540] flex items-center">
            <div className="p-2 bg-[#2E68FF] rounded-lg mr-3 shadow-sm">
              <FileCheck className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Danh mục hồ sơ cần chuẩn bị</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
            {!showChecklist ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ListChecks className="h-10 w-10 text-slate-300" />
                </div>
                <h4 className="text-base font-bold text-[#0A2540] mb-2">Chưa có danh mục</h4>
                <p className="text-sm text-slate-500 font-medium">Vui lòng khai báo thông tin cơ bản và click "Chuẩn bị tài liệu" để hệ thống gợi ý checklist phù hợp.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-[#2E68FF]/20 rounded-2xl p-4 flex items-start shadow-sm">
                  <AlertCircle className="h-5 w-5 text-[#2E68FF] mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2540] mb-1">Gợi ý từ hệ thống</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">Dựa trên loại hình <strong>{formData.type.split('(')[0].trim()}</strong> và quy mô <strong>{formData.scale}</strong>, dưới đây là các tài liệu bắt buộc và Key Drivers cần chuẩn bị.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">I. Hồ sơ Pháp lý & Quy hoạch</h4>
                  <div className="space-y-3">
                    <label className="flex items-start p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#2E68FF] transition-colors shadow-sm">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-[#2E68FF] rounded border-slate-300 focus:ring-[#2E68FF]" />
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-[#0A2540]">Quyết định chủ trương đầu tư</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Bản sao y có công chứng</span>
                      </div>
                    </label>
                    <label className="flex items-start p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#2E68FF] transition-colors shadow-sm">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-[#2E68FF] rounded border-slate-300 focus:ring-[#2E68FF]" />
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-[#0A2540]">Giấy chứng nhận quyền sử dụng đất</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Hoặc hợp đồng thuê đất hợp lệ</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">II. Hồ sơ Tài chính & Kỹ thuật</h4>
                  <div className="space-y-3">
                    <label className="flex items-start p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#2E68FF] transition-colors shadow-sm">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-[#2E68FF] rounded border-slate-300 focus:ring-[#2E68FF]" />
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-[#0A2540]">Báo cáo Nghiên cứu Khả thi (FS)</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Bao gồm mô hình tài chính chi tiết</span>
                      </div>
                    </label>
                    <label className="flex items-start p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-[#2E68FF] transition-colors shadow-sm">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-[#2E68FF] rounded border-slate-300 focus:ring-[#2E68FF]" />
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-[#0A2540]">Báo cáo Đánh giá Tác động Môi trường</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Đã được phê duyệt bởi cơ quan có thẩm quyền</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    onClick={() => toast.success("Đã lưu tiến độ chuẩn bị hồ sơ")}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#0A2540] rounded-xl text-sm font-bold transition-colors">
                    Lưu tiến độ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
