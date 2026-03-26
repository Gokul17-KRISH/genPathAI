import { motion } from "framer-motion";
import { Check, User, ClipboardList, Route, LayoutDashboard } from "lucide-react";
import { useGenPath } from "@/context/GenPathContext";
import { cn } from "@/lib/utils";

const steps = [
  { id: 0, label: "Profile", icon: User },
  { id: 1, label: "Assessment", icon: ClipboardList },
  { id: 2, label: "Learning Path", icon: Route },
  { id: 3, label: "Dashboard", icon: LayoutDashboard },
];

export function Stepper() {
  const { currentStep, setStep } = useGenPath();

  return (
    <div className="w-full py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isClickable = step.id <= currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => isClickable && setStep(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "flex flex-col items-center gap-2 transition-all duration-300",
                    isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted
                        ? "rgb(139, 92, 246)"
                        : isCurrent
                        ? "rgb(88, 28, 135)"
                        : "rgb(30, 41, 59)",
                    }}
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center",
                      "border-2 transition-colors duration-300",
                      isCompleted
                        ? "border-purple-500"
                        : isCurrent
                        ? "border-purple-400 shadow-lg shadow-purple-500/30"
                        : "border-slate-600"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    ) : (
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isCurrent ? "text-purple-300" : "text-slate-400"
                        )}
                      />
                    )}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-purple-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "text-xs font-medium transition-colors",
                      isCurrent ? "text-purple-300" : isCompleted ? "text-purple-400" : "text-slate-500"
                    )}
                  >
                    {step.label}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 relative">
                    <div className="absolute inset-0 bg-slate-700 rounded-full" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
