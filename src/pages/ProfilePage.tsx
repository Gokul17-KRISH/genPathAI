import { ProfileForm } from "../components/profile/ProfileForm";
import { UserCircle } from "lucide-react";

export function ProfilePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-100">
          <UserCircle className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Learning Identity</h2>
          <p className="text-slate-600">Define your goals and interests to optimize your path</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-8">
        <ProfileForm />
      </div>
    </div>
  );
}
