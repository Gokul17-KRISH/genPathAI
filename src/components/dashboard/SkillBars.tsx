import { motion } from "framer-motion";
import { SkillConfidence } from "../../types";

interface SkillBarsProps {
  skills: SkillConfidence[];
}

export function SkillBars({ skills }: SkillBarsProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "from-green-500 to-emerald-500";
    if (confidence >= 60) return "from-blue-500 to-cyan-500";
    if (confidence >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-2xl p-6 border border-slate-700/50"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Skill Confidence</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-300">{skill.skill}</span>
              <span className="text-sm font-medium text-white">{skill.confidence}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.confidence}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`h-full bg-gradient-to-r ${getConfidenceColor(skill.confidence)} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
