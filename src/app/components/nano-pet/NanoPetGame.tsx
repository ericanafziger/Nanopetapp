import { useState, useEffect, useCallback } from "react";
import { PetScreen, PetState } from "./PetScreen";
import { StatsPanel } from "./StatsPanel";
import { Controls } from "./Controls";
import { toast } from "sonner";
import { motion } from "motion/react";

const TICK_RATE_MS = 1000;
const DECAY_RATE = 2;

export function NanoPetGame() {
  // Stats are 0-100
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100); // 100 is full, 0 is starving
  const [thirst, setThirst] = useState(100); // 100 is hydrated
  const [energy, setEnergy] = useState(100);
  const [happiness, setHappiness] = useState(100);
  
  const [petState, setPetState] = useState<PetState>("idle");

  const isDead = health <= 0;

  const resetGame = () => {
    setHealth(100);
    setHunger(100);
    setThirst(100);
    setEnergy(100);
    setHappiness(100);
    setPetState("idle");
    toast.success("New pet adopted!");
  };

  // Game Loop
  useEffect(() => {
    if (isDead) return;

    const interval = setInterval(() => {
      setHunger((prev) => Math.max(0, prev - (petState === "sleeping" ? 0.5 : 1.5)));
      setThirst((prev) => Math.max(0, prev - (petState === "sleeping" ? 0.8 : 2)));
      setHappiness((prev) => Math.max(0, prev - (petState === "sleeping" ? 0.2 : 1)));
      
      if (petState === "sleeping") {
        setEnergy((prev) => Math.min(100, prev + 5));
      } else {
        setEnergy((prev) => Math.max(0, prev - 0.5));
      }

      // Health Logic
      setHealth((prev) => {
        let change = 0;
        if (hunger <= 0) change -= 2;
        if (thirst <= 0) change -= 3;
        if (energy <= 0) change -= 1;
        if (hunger > 50 && thirst > 50 && energy > 50) change += 0.5; // Regenerate if healthy
        return Math.min(100, Math.max(0, prev + change));
      });

      // Wake up if full energy
      if (petState === "sleeping" && energy >= 100) {
        setPetState("idle");
        toast("Pet woke up fully rested!");
      }

    }, TICK_RATE_MS);

    return () => clearInterval(interval);
  }, [petState, isDead, hunger, thirst, energy]);

  // Notifications for low stats
  useEffect(() => {
    if (isDead) { 
      setPetState("dead");
      toast.error("Your pet has passed away..."); 
    }
    else if (hunger < 20) toast.warning("Pet is starving!", { id: "hunger-warning" });
    else if (thirst < 20) toast.warning("Pet is thirsty!", { id: "thirst-warning" });
  }, [hunger, thirst, isDead]);

  const handleFeed = () => {
    setHunger((prev) => Math.min(100, prev + 30));
    setPetState("eating");
    setTimeout(() => setPetState("idle"), 2000);
  };

  const handleDrink = () => {
    setThirst((prev) => Math.min(100, prev + 30));
    setPetState("drinking");
    setTimeout(() => setPetState("idle"), 2000);
  };

  const handlePlay = () => {
    if (energy < 20) {
      toast.error("Too tired to play!");
      return;
    }
    setHappiness((prev) => Math.min(100, prev + 20));
    setEnergy((prev) => Math.max(0, prev - 10));
    setHunger((prev) => Math.max(0, prev - 5));
    setPetState("playing"); // Could add playing animation
    setTimeout(() => setPetState("idle"), 1000);
  };

  const handleSleep = () => {
    if (petState === "sleeping") {
      setPetState("idle");
    } else {
      setPetState("sleeping");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col gap-6">
      <div className="text-center mb-4">
        <h1 className="text-foreground">Nano Pet</h1>
        <p className="text-muted-foreground">Twilio Edition</p>
      </div>

      <PetScreen state={petState} health={health} happiness={happiness} />
      
      <StatsPanel 
        health={health}
        hunger={hunger}
        thirst={thirst}
        energy={energy}
        happiness={happiness}
      />

      <Controls 
        onFeed={handleFeed}
        onDrink={handleDrink}
        onPlay={handlePlay}
        onSleep={handleSleep}
        onReset={resetGame}
        isSleeping={petState === "sleeping"}
        isDead={isDead}
      />
    </div>
  );
}
