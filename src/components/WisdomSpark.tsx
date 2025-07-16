import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Quote, Zap, RefreshCw } from "lucide-react"

const wisdomSparks = [
  {
    type: "quote",
    title: "Innovation Quote",
    content: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    category: "Innovation"
  },
  {
    type: "paradox",
    title: "The Paradox of Choice",
    content: "Sometimes having fewer options leads to better decisions and greater satisfaction.",
    author: "Barry Schwartz",
    category: "Decision Making"
  },
  {
    type: "prompt",
    title: "Lateral Thinking",
    content: "What if your biggest constraint became your biggest advantage?",
    author: "Creative Prompt",
    category: "Problem Solving"
  },
  {
    type: "quote",
    title: "Startup Wisdom",
    content: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    category: "Customer Focus"
  },
  {
    type: "paradox",
    title: "The Lean Paradox",
    content: "The fastest way to scale is to do things that don't scale first.",
    author: "Paul Graham",
    category: "Growth"
  },
  {
    type: "prompt",
    title: "Reframing Challenge",
    content: "How might we turn this problem into an opportunity?",
    author: "Design Thinking",
    category: "Reframing"
  }
]

interface WisdomSparkProps {
  isOpen: boolean
  onClose: () => void
}

export function WisdomSpark({ isOpen, onClose }: WisdomSparkProps) {
  const [currentSparks, setCurrentSparks] = useState(wisdomSparks.slice(0, 3))

  const regenerateSparks = () => {
    const shuffled = [...wisdomSparks].sort(() => Math.random() - 0.5)
    setCurrentSparks(shuffled.slice(0, 3))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "quote":
        return <Quote className="h-4 w-4" />
      case "paradox":
        return <Zap className="h-4 w-4" />
      case "prompt":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quote":
        return "bg-blue-100 text-blue-800"
      case "paradox":
        return "bg-purple-100 text-purple-800"
      case "prompt":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Wisdom Sparks
          </SheetTitle>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Inspirational content to spark creativity
            </p>
            <Button variant="outline" size="sm" onClick={regenerateSparks}>
              <RefreshCw className="h-4 w-4 mr-2" />
              New Sparks
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {currentSparks.map((spark, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {getIcon(spark.type)}
                    {spark.title}
                  </CardTitle>
                  <Badge variant="secondary" className={getTypeColor(spark.type)}>
                    {spark.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-2 leading-relaxed">
                  "{spark.content}"
                </CardDescription>
                <p className="text-xs text-muted-foreground">
                  — {spark.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Click on any spark to insert it into your current workspace or use it as inspiration for your ideas.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}