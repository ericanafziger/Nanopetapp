import { motion } from "motion/react";
import { Heart, Zap, Droplets, Utensils, Brain } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: number;
  max?: number;
  label: string;
  colorClass?: string;
}

function StatBar({ icon: Icon, value, max = 100, label, colorClass = "bg-primary" }: StatProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center justify-center w-8 h-8 rounded-[var(--radius)] bg-accent text-accent-foreground">
        <Icon size={16} />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-end">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className="text-xs font-bold text-foreground">{Math.round(value)}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${colorClass}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}

interface StatsPanelProps {
  health: number;
  hunger: number;
  thirst: number;
  energy: number;
  happiness: number;
}

export function StatsPanel({ health, hunger, thirst, energy, happiness }: StatsPanelProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-card rounded-[var(--radius-card)] border border-border shadow-[var(--elevation-sm)]">
      <h3 className="text-lg font-semibold text-card-foreground mb-2">Vitals</h3>
      <StatBar icon={Heart} value={health} label="Health" colorClass="bg-destructive" />
      <StatBar icon={Utensils} value={hunger} label="Satiety" colorClass="bg-chart-4" />
      <StatBar icon={Droplets} value={thirst} label="Hydration" colorClass="bg-primary" />
      <StatBar icon={Zap} value={energy} label="Energy" colorClass="bg-chart-2" />
      <StatBar icon={Brain} value={happiness} label="Happiness" colorClass="bg-chart-5" />
    </div>
  );
}
