import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Chrome } from "lucide-react";

type AuthMode = "login" | "signup" | "google";

interface AuthModalProps {
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ initialMode = "signup", onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
        >
          <div className="p-8">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-sm">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {mode === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-slate-500 font-medium mt-1">
                {mode === "login"
                  ? "Sign in to continue your secure session"
                  : "Start your professional learning path today"}
              </p>
            </div>

            {/* Google Button */}
            <button
              onClick={onSuccess}
              className="w-full flex items-center justify-center gap-3 px-4 h-12 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-semibold transition-all shadow-sm mb-6 group"
            >
              <Chrome className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider">or email</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-10 pr-10 py-3 text-slate-900 placeholder:text-slate-400 text-sm outline-none transition-all focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {mode === "login" && (
                <div className="text-right">
                  <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm mt-2"
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-sm font-medium text-slate-500 mt-6 pt-6 border-t border-slate-100">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
