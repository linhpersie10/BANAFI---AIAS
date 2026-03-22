import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PlayCircle
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

// Mock data
const projects = [
  { id: "PRJ-2026-042", name: "Nhà máy Điện gió Xuyên Mộc", type: "Hạ tầng", status: "Chờ phê duyệt", risk: "Cao", date: "15/05/2026", budget: "1,200 Tỷ VNĐ", author: "Nguyễn Văn A" },
  { id: "PRJ-2026-041", name: "Trung tâm Logistics Bình Dương", type: "Logistics", status: "Đang triển khai", risk: "Trung bình", date: "10/05/2026", budget: "450 Tỷ VNĐ", author: "Trần Thị B" },
  { id: "PRJ-2026-040", name: "M&A Chuỗi bán lẻ TechStore", type: "M&A", status: "Từ chối", risk: "Cao", date: "02/05/2026", budget: "800 Tỷ VNĐ", author: "Lê Văn C" },
  { id: "PRJ-2026-039", name: "Khu nghỉ dưỡng sinh thái Đà Lạt", type: "Khách sạn", status: "Đã phê duyệt", risk: "Thấp", date: "28/04/2026", budget: "650 Tỷ VNĐ", author: "Phạm Thị D" },
  { id: "PRJ-2026-038", name: "Nâng cấp hệ thống ERP", type: "CNTT", status: "Đang triển khai", risk: "Thấp", date: "20/04/2026", budget: "15 Tỷ VNĐ", author: "Hoàng Văn E" },
];

const statusConfig: Record<string, { icon: any, color: string, bg: string }> = {
  "Chờ phê duyệt": { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  "Đang triển khai": { icon: PlayCircle, color: "text-[#2E68FF]", bg: "bg-blue-50" },
  "Đã phê duyệt": { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  "Từ chối": { icon: XCircle, color: "text-rose-600", bg: "bg-rose-50" },
};

const riskConfig: Record<string, { color: string, bg: string }> = {
  "Cao": { color: "text-rose-600", bg: "bg-rose-50" },
  "Trung bình": { color: "text-amber-600", bg: "bg-amber-50" },
  "Thấp": { color: "text-emerald-600", bg: "bg-emerald-50" },
};

export function Projects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 font-sans pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">Quản lý Dự án</h2>
          <p className="text-slate-500 mt-2 text-sm font-medium">Danh sách toàn bộ hồ sơ dự án đầu tư.</p>
        </div>
        <button 
          onClick={() => navigate('/projects/new')}
          className="bg-[#2E68FF] hover:bg-[#1A4BCE] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center shadow-[0_4px_14px_0_rgba(46,104,255,0.39)] transition-all duration-200 hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tạo Hồ sơ mới
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_2px_10px_rgba(10,37,64,0.04)] border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo mã, tên dự án..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => toast.info("Tính năng đang phát triển")}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center shadow-sm">
              <Filter className="h-4 w-4 mr-2 text-slate-500" />
              Lọc
            </button>
            <select className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-[#0A2540] hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm outline-none cursor-pointer">
              <option>Mới nhất</option>
              <option>Cũ nhất</option>
              <option>Ngân sách cao nhất</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Mã DA</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên Dự án</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Loại hình</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Mức rủi ro</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Ngân sách</th>
                <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => {
                const StatusIcon = statusConfig[project.status]?.icon || FileText;
                return (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => navigate(project.status === 'Chờ phê duyệt' ? `/projects/${project.id}/approve` : `/projects/${project.id}/draft`)}>
                    <td className="p-5">
                      <span className="text-sm font-bold text-[#0A2540] bg-slate-100 px-2.5 py-1 rounded-md">{project.id}</span>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-bold text-[#0A2540] group-hover:text-[#2E68FF] transition-colors">{project.name}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">Bởi: {project.author} • {project.date}</p>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-semibold text-slate-600">{project.type}</span>
                    </td>
                    <td className="p-5">
                      <div className={cn("inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold", statusConfig[project.status]?.bg, statusConfig[project.status]?.color)}>
                        <StatusIcon className="w-4 h-4 mr-1.5" />
                        {project.status}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold", riskConfig[project.risk]?.bg, riskConfig[project.risk]?.color)}>
                        {project.risk === "Cao" && <AlertTriangle className="w-3.5 h-3.5 mr-1" />}
                        {project.risk}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="text-sm font-bold text-[#0A2540]">{project.budget}</span>
                    </td>
                    <td className="p-5 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toast.info("Tính năng đang phát triển"); }}
                        className="p-2 text-slate-400 hover:text-[#0A2540] hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-white">
          <span className="text-sm text-slate-500 font-medium">Hiển thị 1 đến 5 của 132 dự án</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>Trước</button>
            <button className="px-3 py-1.5 border border-[#2E68FF] bg-[#2E68FF] text-white rounded-lg text-sm font-bold shadow-sm">1</button>
            <button onClick={() => toast.info("Tính năng đang phát triển")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-[#0A2540] hover:bg-slate-50">2</button>
            <button onClick={() => toast.info("Tính năng đang phát triển")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-[#0A2540] hover:bg-slate-50">3</button>
            <button onClick={() => toast.info("Tính năng đang phát triển")} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-bold text-[#0A2540] hover:bg-slate-50">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
