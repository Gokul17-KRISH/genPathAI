import { motion } from "framer-motion";
import { User, Mail, Shield, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
          <Shield className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Account Details</h2>
          <p className="text-slate-600 mt-1">Manage your identity and security settings</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-full border-2 border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <UserCircle className="w-10 h-10 text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
            <p className="text-slate-500 font-medium text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-slate-600 font-semibold flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </Label>
            <Input 
              value={user?.name || ""} 
              readOnly 
              className="bg-slate-50 border-slate-200 text-slate-900 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-600 font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </Label>
            <Input 
              value={user?.email || ""} 
              readOnly 
              className="bg-slate-50 border-slate-200 text-slate-900 rounded-xl"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mt-6">
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Note: Your account is managed via Google OAuth. To change your name or profile picture, please update your Google account settings directly through Google.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
