import { motion } from "framer-motion";
import { Sparkles, Zap, ClipboardCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    { label: "AI-powered personalization", icon: Sparkles, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Skill gap analysis", icon: ClipboardCheck, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Real-time progress tracking", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.5
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-100 blur-[120px] rounded-full opacity-50" />
      </div>

      <main className="relative z-10 max-w-4xl w-full text-center space-y-10">
        {/* Hero Section */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mx-auto"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-slate-600">The Modern Standard for Tech Learning</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">GenPath AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Your personalized AI-powered learning path for tech careers. Discover skill gaps, get curated roadmaps, and track your growth — all in one unified platform.
          </motion.p>
        </div>

        {/* Cta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 text-white hover:bg-indigo-700 h-14 px-10 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-md shadow-indigo-200"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="text-sm text-slate-500 mt-2">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              Log in
            </button>
          </div>
        </motion.div>

        {/* Feature Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`p-2 rounded-xl ${feature.bg}`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
