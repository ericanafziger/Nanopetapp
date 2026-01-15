import { Utensils, Droplets, Moon, Gamepad2, RotateCcw } from "lucide-react";

interface ControlsProps {
  onFeed: () => void;
  onDrink: () => void;
  onSleep: () => void;
  onPlay: () => void;
  onReset: () => void;
  isSleeping: boolean;
  isDead: boolean;
}

export function Controls({ onFeed, onDrink, onSleep, onPlay, onReset, isSleeping, isDead }: ControlsProps) {
  if (isDead) {
    return (
      <button 
        onClick={onReset}
        className="w-full py-4 bg-destructive text-destructive-foreground font-semibold rounded-[var(--radius-button)] shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
        Resurrect Pet
      </button>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onFeed}
        disabled={isSleeping}
        className="group relative flex flex-col items-center justify-center p-4 bg-card hover:bg-accent border border-border rounded-[var(--radius-button)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Utensils className="mb-2 text-primary group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-foreground">Feed</span>
      </button>

      <button
        onClick={onDrink}
        disabled={isSleeping}
        className="group relative flex flex-col items-center justify-center p-4 bg-card hover:bg-accent border border-border rounded-[var(--radius-button)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Droplets className="mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-foreground">Hydrate</span>
      </button>

      <button
        onClick={onPlay}
        disabled={isSleeping}
        className="group relative flex flex-col items-center justify-center p-4 bg-card hover:bg-accent border border-border rounded-[var(--radius-button)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Gamepad2 className="mb-2 text-chart-2 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium text-foreground">Play</span>
      </button>

      <button
        onClick={onSleep}
        className={`group relative flex flex-col items-center justify-center p-4 border border-border rounded-[var(--radius-button)] transition-all ${isSleeping ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-accent text-foreground'}`}
      >
        <Moon className={`mb-2 group-hover:scale-110 transition-transform ${isSleeping ? 'text-white' : 'text-indigo-500'}`} />
        <span className="text-sm font-medium">{isSleeping ? 'Wake Up' : 'Sleep'}</span>
      </button>
    </div>
  );
}
