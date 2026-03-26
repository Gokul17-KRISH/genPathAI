import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Zap, Brain, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useGenPath } from "@/context/GenPathContext";
import { CertificationGoal, InterestArea, HoursPerWeek } from "@/types";
import { cn } from "@/lib/utils";

const certificationGoals: CertificationGoal[] = [
  "AWS Solutions Architect",
  "Google Cloud Professional",
  "Microsoft Azure Fundamentals",
  "Kubernetes CKA",
  "Data Science (TensorFlow Developer)",
  "Full-Stack Web Developer",
  "Cybersecurity (Security+)",
];

const interestAreas: InterestArea[] = [
  "Cloud & DevOps",
  "ML & AI",
  "Web Development",
  "Data Engineering",
  "Cybersecurity",
  "Mobile Development",
];

const hoursOptions: { value: HoursPerWeek; label: string }[] = [
  { value: "5-10", label: "5-10 hrs" },
  { value: "10-20", label: "10-20 hrs" },
  { value: "20-30", label: "20-30 hrs" },
  { value: "30+", label: "30+ hrs" },
];

export function ProfileForm() {
  const navigate = useNavigate();
  const { profile, updateProfile, generatePath, loadDemoData } = useGenPath();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isValid = profile.name && profile.goal && profile.interest;

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    generatePath();
    setIsAnalyzing(false);
    navigate("/dashboard");
  };

  const handleDemo = () => {
    loadDemoData();
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 relative overflow-hidden">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 mb-4"
            >
              <UserCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Account Setup</span>
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Initialize Profile</h2>
            <p className="text-slate-600 font-medium">Calibrate your personalized learning path</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateProfile({ name: e.target.value })}
                  placeholder="Enter your name"
                  className="bg-slate-50 border-slate-200 text-slate-900 py-6 px-4 rounded-xl focus-visible:ring-indigo-500"
                />
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Certification Goal</Label>
                <Select
                  value={profile.goal}
                  onValueChange={(value) => updateProfile({ goal: value as CertificationGoal })}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 py-6 px-4 rounded-xl focus:ring-indigo-500">
                    <SelectValue placeholder="Select target" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
                    {certificationGoals.map((goal) => (
                      <SelectItem key={goal} value={goal} className="py-3 text-slate-700 focus:bg-indigo-50">{goal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interest */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Primary Interest</Label>
                <Select
                  value={profile.interest}
                  onValueChange={(value) => updateProfile({ interest: value as InterestArea })}
                >
                  <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 py-6 px-4 rounded-xl focus:ring-indigo-500">
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 rounded-xl shadow-lg">
                    {interestAreas.map((area) => (
                      <SelectItem key={area} value={area} className="py-3 text-slate-700 focus:bg-indigo-50">{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-xs font-semibold uppercase tracking-wider text-slate-500">Current Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => updateProfile({ role: e.target.value })}
                  placeholder="e.g. Student, Junior Dev"
                  className="bg-slate-50 border-slate-200 text-slate-900 py-6 px-4 rounded-xl focus-visible:ring-indigo-500"
                />
              </div>

              {/* Weekly Time */}
              <div className="space-y-3">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Study Intensity (Per Week)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {hoursOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateProfile({ hoursPerWeek: option.value })}
                      className={cn(
                        "py-3 rounded-xl text-xs font-semibold transition-all border",
                        profile.hoursPerWeek === option.value
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isAnalyzing}
              className="w-full h-14 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all duration-300"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Profile...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Path
                </span>
              )}
            </Button>

            <button
              onClick={handleDemo}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 group"
            >
              <Zap className="w-4 h-4 group-hover:fill-indigo-100" />
              Load Sample Data
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
