import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/learning-path/Timeline";
import { useGenPath } from "@/context/GenPathContext";

export function LearningPathPage() {
  const { profile, learningPath, setStep } = useGenPath();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
        <p className="text-slate-400">Generating your personalized learning path...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Your Learning Path</h1>
        <p className="text-slate-400">
          Personalized roadmap for{" "}
          <span className="text-purple-400">{profile.goal}</span>
        </p>
      </motion.div>

      <Timeline modules={learningPath} />

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between mt-8"
      >
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Adjust Assessment
        </Button>
        <Button
          onClick={() => setStep(3)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
