import { NanoPetGame } from "@/app/components/nano-pet/NanoPetGame";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--background) 0%, var(--accent) 50%, var(--muted) 100%)`
      }}
    >
      {/* Decorative blobs for "fun" and "colorful" feel using design system colors */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-40 pointer-events-none"
        style={{ background: "var(--chart-4)" }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ background: "var(--chart-2)" }}
      />
      
      <div className="relative z-10 w-full max-w-md">
        <NanoPetGame />
      </div>
      
      <Toaster position="top-center" />
    </div>
  );
}
