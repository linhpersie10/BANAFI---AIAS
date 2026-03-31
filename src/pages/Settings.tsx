import { useState, useEffect } from "react";
import { 
  Settings as SettingsIcon, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X,
  LayoutGrid,
  FileText,
  ChevronRight,
  Loader2,
  Lock
} from "lucide-react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  setDoc,
  getDocs
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface Category {
  id: string;
  name: string;
  type: string;
  items: string[];
}

const INITIAL_CATEGORIES = [
  {
    type: "project_type",
    name: "Loại hình Dự án",
    items: [
      "Dự án vận hành & Duy trì (Operational/Maintenance Projects)",
      "Dự án Mở rộng & Cải tiến (Expansion/Incremental Projects)",
      "Dự án Chiến lược & Đầu tư mới (Strategic/Greenfield Projects)"
    ]
  },
  {
    type: "expertise_area",
    name: "Mảng chuyên môn",
    items: [
      "Dự án Hạ tầng, Giao thông (Infrastructure)",
      "Dự án Lưu trú & Nghỉ dưỡng (Hospitality)",
      "Dự án Vui chơi giải trí & Trò chơi (Attractions & Rides)",
      "Dự án Cảnh quan & Biểu tượng (Landmark & Landscaping)",
      "Dự án Dịch vụ F&B và Bán lẻ (Food & Beverage / Retail)",
      "Dự án Biểu diễn Nghệ thuật (Shows & Entertainment)",
      "Dự án Hợp tác kinh doanh (Bussiness Partnership)",
      "Dự án Công nghệ thông tin, chuyển đổi số (Digital transformation)",
      "Dự án An Toàn, Tuân thủ Kiểm soát (Safety, Compliance, and Control)"
    ]
  },
  {
    type: "project_scale",
    name: "Quy mô dự án",
    items: [
      "Quy mô tập đoàn",
      "Quy mô khối",
      "Quy mô toàn Công ty",
      "Quy mô mảng / khu vực địa lý cụ thể",
      "Quy mô bộ phận"
    ]
  },
  {
    type: "capital_scale",
    name: "Quy mô vốn",
    items: [
      "Dưới 1 tỷ",
      "Từ 1 đến dưới 10 tỷ",
      "Từ 10 đến dưới 50 tỷ",
      "Từ 50 tỷ trở lên"
    ]
  },
  {
    type: "form_type",
    name: "Loại biểu mẫu",
    items: [
      "Biểu mẫu Pháp lý",
      "Biểu mẫu Tài chính",
      "Biểu mẫu Kỹ thuật",
      "Biểu mẫu Quản lý dự án"
    ]
  }
];

export function Settings() {
  const { user, loading: authLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [editingItemIndex, setEditingItemIndex] = useState<{catId: string, index: number} | null>(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  useEffect(() => {
    if (!user) {
      setCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(collection(db, "categories"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(cats);
      setLoading(false);

      // Seed initial data if empty
      if (snapshot.empty) {
        seedInitialData();
      }
    }, (error) => {
      console.error("Error fetching categories:", error);
      // Only show error if it's not a permission error while logging out
      if (user) {
        toast.error("Không có quyền truy cập dữ liệu cài đặt");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const seedInitialData = async () => {
    try {
      for (const cat of INITIAL_CATEGORIES) {
        await addDoc(collection(db, "categories"), cat);
      }
      toast.success("Đã khởi tạo dữ liệu danh mục mặc định");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  };

  const handleAddItem = async (catId: string) => {
    if (!newItemName.trim()) return;
    
    const category = categories.find(c => c.id === catId);
    if (!category) return;

    try {
      const updatedItems = [...category.items, newItemName.trim()];
      await updateDoc(doc(db, "categories", catId), { items: updatedItems });
      setNewItemName("");
      toast.success("Đã thêm phần tử mới");
    } catch (error) {
      toast.error("Lỗi khi thêm phần tử");
    }
  };

  const handleDeleteItem = async (catId: string, index: number) => {
    const category = categories.find(c => c.id === catId);
    if (!category) return;

    try {
      const updatedItems = category.items.filter((_, i) => i !== index);
      await updateDoc(doc(db, "categories", catId), { items: updatedItems });
      toast.success("Đã xóa phần tử");
    } catch (error) {
      toast.error("Lỗi khi xóa phần tử");
    }
  };

  const startEditItem = (catId: string, index: number, value: string) => {
    setEditingItemIndex({ catId, index });
    setEditingItemValue(value);
  };

  const handleSaveItem = async (catId: string, index: number) => {
    const category = categories.find(c => c.id === catId);
    if (!category) return;

    try {
      const updatedItems = [...category.items];
      updatedItems[index] = editingItemValue.trim();
      await updateDoc(doc(db, "categories", catId), { items: updatedItems });
      setEditingItemIndex(null);
      toast.success("Đã cập nhật phần tử");
    } catch (error) {
      toast.error("Lỗi khi cập nhật phần tử");
    }
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
            Bạn cần đăng nhập để truy cập và quản lý các thiết lập hệ thống.
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
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight flex items-center">
          <SettingsIcon className="h-8 w-8 mr-3 text-[#2E68FF]" />
          Cài đặt Hệ thống
        </h2>
        <p className="text-slate-500 mt-1 text-sm font-medium">
          Thiết lập các danh mục, khối thông tin và biểu mẫu cho toàn hệ thống.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    {category.type === 'form_type' ? (
                      <FileText className="h-5 w-5 text-[#2E68FF]" />
                    ) : (
                      <LayoutGrid className="h-5 w-5 text-[#2E68FF]" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#0A2540]">{category.name}</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                  {category.type}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center group">
                      {editingItemIndex?.catId === category.id && editingItemIndex?.index === index ? (
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={editingItemValue}
                            onChange={(e) => setEditingItemValue(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-sm border border-[#2E68FF] rounded-lg outline-none"
                            autoFocus
                          />
                          <button onClick={() => handleSaveItem(category.id, index)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg">
                            <Save className="h-4 w-4" />
                          </button>
                          <button onClick={() => setEditingItemIndex(null)} className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1 py-2 px-3 text-sm font-medium text-slate-700 bg-slate-50 rounded-xl border border-transparent group-hover:border-slate-200 transition-all">
                            {item}
                          </div>
                          <div className="flex items-center ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => startEditItem(category.id, index, item)}
                              className="p-1.5 text-slate-400 hover:text-[#2E68FF] hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem(category.id, index)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Thêm phần tử mới..."
                      value={editingCategoryId === category.id ? newItemName : ""}
                      onChange={(e) => {
                        setEditingCategoryId(category.id);
                        setNewItemName(e.target.value);
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddItem(category.id)}
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#2E68FF] transition-all outline-none"
                    />
                    <button 
                      onClick={() => handleAddItem(category.id)}
                      className="p-2.5 bg-[#2E68FF] text-white rounded-xl hover:bg-[#1A4BCE] transition-colors shadow-sm"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
