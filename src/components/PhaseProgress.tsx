
import { cn } from "@/lib/utils"
import { Check, Circle } from "lucide-react"

interface PhaseProgressProps {
  currentPhase: number
}

const phases = [
  { id: 1, name: "Ideation", path: "/ideation" },
  { id: 2, name: "Analysis", path: "/opportunity" },
  { id: 3, name: "Solution", path: "/solution-mapping" },
  { id: 4, name: "Business Model", path: "/business-model" },
  { id: 5, name: "Prototype", path: "/prototype" },
  { id: 6, name: "Architecture", path: "/architecture" },
  { id: 7, name: "Go-to-Market", path: "/go-to-market" },
  { id: 8, name: "Deployment", path: "/deployment" },
  { id: 9, name: "Scaling", path: "/scaling" }
]

export function PhaseProgress({ currentPhase }: PhaseProgressProps) {
  const progress = (currentPhase / phases.length) * 100

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Startup Development Workflow</h2>
          <span className="text-sm text-muted-foreground">
            Phase {currentPhase} of {phases.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Phase indicators */}
        <div className="hidden md:flex items-center justify-between">
          {phases.map((phase, index) => (
            <div 
              key={phase.id}
              className={cn(
                "flex flex-col items-center text-xs space-y-2 phase-indicator",
                phase.id <= currentPhase ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                phase.id < currentPhase 
                  ? "bg-primary border-primary text-primary-foreground"
                  : phase.id === currentPhase
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/30"
              )}>
                {phase.id < currentPhase ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Circle className={cn(
                    "w-3 h-3",
                    phase.id === currentPhase ? "fill-primary" : "fill-muted-foreground/30"
                  )} />
                )}
              </div>
              <span className="whitespace-nowrap">{phase.name}</span>
            </div>
          ))}
        </div>
        
        {/* Mobile phase indicator */}
        <div className="md:hidden text-center">
          <span className="text-sm font-medium">
            {phases.find(p => p.id === currentPhase)?.name}
          </span>
        </div>
      </div>
    </div>
  )
}
