import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText,
  Activity,
  XCircle,
  PlayCircle,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useNavigate } from "react-router-dom";

const capexData = [
  { name: 'T1', capex: 400, budget: 500 },
  { name: 'T2', capex: 300, budget: 450 },
  { name: 'T3', capex: 550, budget: 500 },
  { name: 'T4', capex: 200, budget: 300 },
  { name: 'T5', capex: 450, budget: 600 },
  { name: 'T6', capex: 600, budget: 550 },
];

const statusData = [
  { name: 'Đã phê duyệt', value: 86, color: '#10b981' }, // Emerald
  { name: 'Đang triển khai', value: 23, color: '#2E68FF' }, // Bright Blue
  { name: 'Chờ phê duyệt', value: 15, color: '#f59e0b' }, // Amber
  { name: 'Từ chối', value: 8, color: '#f43f5e' }, // Rose
];

const irrData = [
  { name: 'Hạ tầng', actual: 14.5, target: 12 },
  { name: 'F&B', actual: 18.2, target: 15 },
  { name: 'Khách sạn', actual: 11.5, target: 14 },
  { name: 'Bán lẻ', actual: 22.1, target: 18 },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 pb-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0A2540] tracking-tight">Tổng quan Đầu tư</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Theo dõi hiệu quả và tiến độ danh mục dự án toàn hệ thống.</p>
        </div>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-200 shadow-sm text-[#0A2540] text-sm font-semibold rounded-lg focus:ring-2 focus:ring-[#2E68FF] block p-2 outline-none cursor-pointer">
            <option>Năm 2026</option>
            <option>Năm 2025</option>
            <option>Năm 2024</option>
          </select>
          <select className="bg-white border border-slate-200 shadow-sm text-[#0A2540] text-sm font-semibold rounded-lg focus:ring-2 focus:ring-[#2E68FF] block p-2 outline-none cursor-pointer">
            <option>Tất cả Khối/SBU</option>
            <option>Khối Sản xuất</option>
            <option>Khối Bán lẻ</option>
            <option>Khối Dịch vụ</option>
          </select>
        </div>
      </div>

      {/* Interactive Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <div 
          onClick={() => navigate('/projects')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(10,37,64,0.08)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-slate-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-[#0A2540] group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <FileText className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0A2540]">132</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-[#0A2540] transition-colors">Tổng dự án</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/projects?status=Đang triển khai')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(46,104,255,0.15)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-[#2E68FF] group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <PlayCircle className="h-4 w-4 text-[#2E68FF] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0A2540]">23</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-[#2E68FF] transition-colors">Đang triển khai</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/projects?status=Chờ phê duyệt')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(245,158,11,0.15)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-amber-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <Clock className="h-4 w-4 text-amber-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0A2540]">15</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-amber-600 transition-colors">Chờ phê duyệt</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/projects?status=Đã phê duyệt')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(16,185,129,0.15)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-emerald-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0A2540]">86</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-emerald-600 transition-colors">Đã phê duyệt</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/projects?status=Từ chối')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(244,63,94,0.15)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-rose-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-rose-50 rounded-lg flex items-center justify-center group-hover:bg-rose-500 group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <XCircle className="h-4 w-4 text-rose-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0A2540]">8</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-rose-600 transition-colors">Từ chối</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => navigate('/projects?risk=true')}
          className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(239,68,68,0.15)] cursor-pointer group relative overflow-hidden border border-slate-100"
        >
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          <div className="flex flex-col relative z-10 h-full justify-between">
            <div className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 mb-2 shadow-sm">
              <AlertCircle className="h-4 w-4 text-red-500 group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-red-500">8</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5 group-hover:text-red-600 transition-colors">Rủi ro cao</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CapEx Trend Chart */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(10,37,64,0.08)] group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center">
              <div className="p-1.5 bg-blue-50 rounded-lg mr-2">
                <Activity className="h-4 w-4 text-[#2E68FF]" />
              </div>
              Giải ngân CapEx vs Ngân sách
            </h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capexData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px -5px rgba(10,37,64,0.1)', fontWeight: 600, color: '#0A2540', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 500, color: '#64748b' }} />
                <Bar dataKey="capex" name="Thực tế" fill="#2E68FF" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="budget" name="Ngân sách" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IRR Performance Chart */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(10,37,64,0.08)] group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center">
              <div className="p-1.5 bg-emerald-50 rounded-lg mr-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              Hiệu quả Đầu tư (IRR %)
            </h3>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={irrData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px -5px rgba(10,37,64,0.1)', fontWeight: 600, color: '#0A2540', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 500, color: '#64748b' }} />
                <Line type="monotone" dataKey="actual" name="IRR Thực tế" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="target" name="IRR Mục tiêu" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lower Section: Projects & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Status Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_10px_20px_rgba(10,37,64,0.08)] group">
          <h3 className="text-lg font-bold text-[#0A2540] mb-4 flex items-center">
            <div className="p-1.5 bg-blue-50 rounded-lg mr-2">
              <BarChart3 className="h-4 w-4 text-[#2E68FF]" />
            </div>
            Trạng thái Hồ sơ
          </h3>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 25px -5px rgba(10,37,64,0.1)', fontWeight: 600, color: '#0A2540', fontSize: '12px' }}
                  itemStyle={{ color: '#0A2540', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-extrabold text-[#0A2540]">132</span>
              <span className="text-[10px] text-slate-500 font-semibold mt-0.5">Hồ sơ</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-2 mt-4">
            {statusData.map((status, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-1.5 shadow-sm" style={{ backgroundColor: status.color }}></div>
                <span className="text-xs font-medium text-slate-600">{status.name} <span className="text-[#0A2540] font-bold ml-1">{status.value}</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 flex flex-col transition-all duration-300 hover:shadow-[0_10px_20px_rgba(10,37,64,0.08)] group overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-[#0A2540] flex items-center">
              <div className="p-1.5 bg-amber-50 rounded-lg mr-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </div>
              AI Insights & Cảnh báo
            </h3>
            <button 
              onClick={() => toast.info("Tính năng đang phát triển")}
              className="text-xs text-[#2E68FF] font-bold hover:text-[#1A4BCE] flex items-center group-hover:translate-x-1 transition-transform">
              Xem tất cả <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[280px]">
            <div className="flex space-x-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200 cursor-default">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-amber-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A2540]">PRJ-2026-042: Rủi ro pháp lý (Điện gió Xuyên Mộc)</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Dự án thiếu báo cáo ĐTM (Đánh giá tác động môi trường). Đây là yêu cầu bắt buộc cho dự án Cấp 3. Đề xuất bổ sung trước khi trình duyệt.</p>
              </div>
            </div>

            <div className="flex space-x-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-[#2E68FF]/30 cursor-default">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-[#2E68FF]" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A2540]">PRJ-2026-041: IRR vượt kỳ vọng (Logistics Bình Dương)</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">IRR dự kiến đạt 18.5%, cao hơn mức hurdle rate (12%). Tuy nhiên, AI phát hiện giả định tăng trưởng doanh thu năm 2 khá lạc quan (+25%). Cần rà soát lại mô hình tài chính.</p>
              </div>
            </div>

            <div className="flex space-x-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 cursor-default">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                  <FileText className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A2540]">Gợi ý từ Feedback Loop (M&A TechStore)</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">Dựa trên 5 dự án M&A bị từ chối gần nhất, Ban lãnh đạo thường yêu cầu bổ sung kịch bản "Post-merger Integration Costs". Đã tự động thêm vào checklist cho PRJ-2026-040.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
