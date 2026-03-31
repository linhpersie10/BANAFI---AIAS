import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  Settings, 
  LogOut,
  BrainCircuit,
  FilePlus,
  Bell,
  Search,
  LogIn,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Dự án", href: "/projects", icon: FolderOpen },
  { name: "Khai báo hồ sơ", href: "/projects/declare", icon: FilePlus },
  { name: "Biểu mẫu", href: "/templates", icon: FileText },
  { name: "Cài đặt", href: "/settings", icon: Settings },
];

export function Layout() {
  const location = useLocation();
  const { user, loading, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất");
    } catch (error) {
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F7F9] font-sans">
      {/* Sidebar - Everfit Dark Style */}
      <aside className="w-64 bg-[#0A2540] flex flex-col transition-all duration-300 shadow-xl z-20">
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#2E68FF] p-2 rounded-xl shadow-lg shadow-[#2E68FF]/30">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">A.I.A.S</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="px-6 mb-3 text-xs font-bold text-slate-500 uppercase tracking-widest">Menu</div>
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => {
              // Fix double highlight: only highlight the most specific matching path
              const isActive = item.href === "/" 
                ? location.pathname === "/" 
                : location.pathname === item.href || 
                  (location.pathname.startsWith(item.href + "/") && 
                   !navItems.some(other => other.href.length > item.href.length && location.pathname.startsWith(other.href)));
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                      isActive 
                        ? "bg-[#2E68FF] text-white shadow-md shadow-[#2E68FF]/20" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 transition-colors", 
                      isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 m-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          {loading ? (
            <div className="flex justify-center p-2">
              <Loader2 className="h-5 w-5 text-white/50 animate-spin" />
            </div>
          ) : user ? (
            <div className="flex items-center">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ""} className="h-10 w-10 rounded-full border-2 border-[#2E68FF]" referrerPolicy="no-referrer" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#2E68FF] to-[#D4F870] p-[2px]">
                  <div className="h-full w-full rounded-full bg-[#0A2540] flex items-center justify-center text-white font-bold text-sm">
                    {user.displayName?.substring(0, 2).toUpperCase() || "US"}
                  </div>
                </div>
              )}
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user.displayName || "User"}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2E68FF] text-white rounded-xl hover:bg-[#1A4BCE] transition-all font-medium text-sm"
            >
              <LogIn className="h-4 w-4" />
              Đăng nhập
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-[#0A2540]">
            {navItems.find(item => item.href === location.pathname)?.name || "Chi tiết"}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-[#2E68FF] focus:ring-2 focus:ring-[#2E68FF]/20 transition-all w-64 outline-none"
              />
            </div>
            <button 
              onClick={() => toast.info("Chưa có thông báo mới")}
              className="relative p-2 text-slate-400 hover:text-[#0A2540] transition-colors rounded-full hover:bg-slate-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            {user && (
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-2 text-sm font-medium">
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            )}
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
