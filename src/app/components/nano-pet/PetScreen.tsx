import { motion } from "motion/react";
import { Skull, Utensils, Droplets, BookOpen } from "lucide-react";

export type PetState = "idle" | "eating" | "drinking" | "sleeping" | "playing" | "dead";

interface PetScreenProps {
  state: PetState;
  health: number;
  happiness: number;
}

function OwlAvatar({ state, happiness, health }: PetScreenProps) {
  // Owl colors based on theme
  const bodyColor = "text-foreground";
  const eyeColor = "text-primary";
  
  if (state === "dead" || health <= 0) {
    return (
      <svg width="140" height="140" viewBox="0 0 100 100" className="text-destructive">
        {/* Body Outline */}
        <path d="M20 90 Q10 90 15 70 Q10 40 30 30 Q30 10 40 20 Q50 10 60 20 Q80 10 80 30 Q100 40 95 70 Q100 90 90 90 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        {/* Dead Eyes (X) */}
        <path d="M35 40 L55 60 M55 40 L35 60" stroke="currentColor" strokeWidth="3" />
        <path d="M65 40 L85 60 M85 40 L65 60" stroke="currentColor" strokeWidth="3" />
        {/* Beak */}
        <path d="M60 65 L50 75 L70 75 Z" fill="currentColor" />
      </svg>
    );
  }

  const isSleeping = state === "sleeping";
  const isBlinking = state === "idle" && Math.random() > 0.9; // Simple flicker logic handled by animation usually, but we'll use conditional rendering for simplicity or framer motion

  return (
    <div className="relative flex items-center justify-center">
      {/* Sleeping Zzzs */}
      {isSleeping && (
        <div className="absolute -top-12 right-0 flex flex-col items-end">
           <motion.span 
             animate={{ opacity: [0, 1, 0], y: [0, -20] }} 
             transition={{ duration: 2, repeat: Infinity, delay: 0 }}
             className="text-2xl font-bold text-primary"
           >
             Z
           </motion.span>
           <motion.span 
             animate={{ opacity: [0, 1, 0], y: [0, -20] }} 
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
             className="text-xl font-bold text-primary"
           >
             z
           </motion.span>
        </div>
      )}

      <svg width="160" height="160" viewBox="0 0 120 120" className="drop-shadow-xl">
        {/* Body */}
        <path 
          d="M25 100 
             C10 100, 10 60, 20 50
             C20 30, 30 20, 40 25
             L45 15 L50 25 
             C55 23, 65 23, 70 25 
             L75 15 L80 25
             C90 20, 100 30, 100 50
             C110 60, 110 100, 95 100 
             Z" 
          fill="var(--card)" 
          stroke="var(--foreground)" 
          strokeWidth="3"
        />
        
        {/* Wings (tucked) */}
        <path d="M22 60 C15 70, 15 90, 25 95" fill="none" stroke="var(--foreground)" strokeWidth="3" />
        <path d="M98 60 C105 70, 105 90, 95 95" fill="none" stroke="var(--foreground)" strokeWidth="3" />

        {/* Glasses (Wise Owl) */}
        <circle cx="45" cy="50" r="18" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2.5" />
        <circle cx="75" cy="50" r="18" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2.5" />
        <path d="M63 50 L57 50" stroke="var(--foreground)" strokeWidth="2" /> {/* Bridge */}
        
        {/* Eyes */}
        {isSleeping ? (
          <>
            <path d="M35 55 Q45 60 55 55" fill="none" stroke="var(--foreground)" strokeWidth="2" />
            <path d="M65 55 Q75 60 85 55" fill="none" stroke="var(--foreground)" strokeWidth="2" />
          </>
        ) : (
          <>
             {/* Pupils that look around or close when blinking could be animated, staying simple for now */}
             <motion.circle 
               cx="45" cy="50" r="6" 
               fill="var(--foreground)"
               animate={{ 
                 scaleY: state === "eating" ? [1, 0.1, 1] : 1 
               }}
               transition={{ repeat: Infinity, duration: 3 }}
             />
             <motion.circle 
               cx="75" cy="50" r="6" 
               fill="var(--foreground)"
               animate={{ 
                 scaleY: state === "eating" ? [1, 0.1, 1] : 1 
               }}
               transition={{ repeat: Infinity, duration: 3 }}
             />
          </>
        )}

        {/* Beak */}
        <motion.path 
          d="M55 70 L60 80 L65 70 Z" 
          fill="var(--primary)" 
          animate={{ 
            y: state === "eating" || state === "drinking" ? [0, 5, 0] : 0 
          }}
          transition={{ repeat: Infinity, duration: 0.3 }}
        />
        
        {/* Accessories depending on state */}
        {state === "drinking" && (
           <circle cx="85" cy="85" r="10" fill="var(--chart-4)" opacity="0.5" /> 
        )}
      </svg>
      
      {state === "eating" && (
        <div className="absolute bottom-4 right-10">
          <Utensils className="w-8 h-8 text-chart-2 animate-bounce" />
        </div>
      )}
      
      {state === "drinking" && (
        <div className="absolute bottom-4 right-10">
          <Droplets className="w-8 h-8 text-chart-4 animate-bounce" />
        </div>
      )}
    </div>
  );
}

export function PetScreen({ state, health, happiness }: PetScreenProps) {
  return (
    <div className="relative w-full aspect-square bg-gradient-to-b from-[var(--accent)] to-[var(--background)] rounded-[var(--radius-card)] border border-border flex flex-col items-center justify-center overflow-hidden shadow-inner p-8">
      
      {/* Background Decor */}
      <div className="absolute top-4 left-4 opacity-20">
        <BookOpen className="w-8 h-8 text-primary" />
      </div>

      <motion.div
        animate={{ 
          y: state === "idle" ? [0, -5, 0] : 0,
        }}
        transition={{ 
          repeat: state === "idle" ? Infinity : 0, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <OwlAvatar state={state} health={health} happiness={happiness} />
      </motion.div>
      
      {/* Floor shadow */}
      <div className="absolute bottom-10 w-32 h-4 bg-black/5 rounded-[50%] blur-sm" />
    </div>
  );
}
