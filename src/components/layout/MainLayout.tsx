import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Sparkles, 
  Settings, 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown,
  UserCircle,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { GridBackground } from "@/components/ui/GridBackground";
import { LynxChat } from "@/components/chat/LynxChat";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { label: "Profile", path: "/profile", icon: User },
    { label: "Assessment", path: "/assessment", icon: ShieldCheck },
    { label: "Learning Path", path: "/learning", icon: BookOpen },
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <GridBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 bg-white/80 border-b border-slate-200 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 group-hover:shadow-indigo-600/40 transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
              GenPath <span className="text-indigo-600">AI</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-1.5 pl-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300 group shadow-sm"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none mb-0.5">{user?.name}</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Pro Member</p>
              </div>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100">
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-slate-400" />
                  </div>
                )}
              </div>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 overflow-hidden z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</p>
                    </div>
                    
                    <button
                      onClick={() => { navigate("/profile"); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                      <User className="w-4 h-4 text-indigo-500" />
                      Profile
                    </button>
                    
                    <button
                      onClick={() => { navigate("/account"); setIsDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Account details
                    </button>
                    
                    <div className="h-px bg-slate-100 my-1" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Global AI Chat Assistant */}
      <LynxChat />
    </div>
  );
}
