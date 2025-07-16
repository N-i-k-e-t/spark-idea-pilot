
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Quote, Brain, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface WisdomSparkProps {
  isOpen: boolean
  onClose: () => void
  currentPhase: number
}

interface Spark {
  id: string
  type: "quote" | "paradox" | "prompt"
  content: string
  author?: string
  category: string
  phase: number[]
}

const wisdomSparks: Spark[] = [
  {
    id: "1",
    type: "quote",
    content: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Action",
    phase: [1, 2]
  },
  {
    id: "2",
    type: "paradox",
    content: "The best way to find out if you can trust somebody is to trust them.",
    author: "Ernest Hemingway",
    category: "Trust",
    phase: [2, 4]
  },
  {
    id: "3",
    type: "prompt",
    content: "What if the opposite of your solution is actually the answer?",
    category: "Lateral Thinking",
    phase: [3, 4]
  },
  {
    id: "4",
    type: "quote",
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "Innovation",
    phase: [1, 3, 5]
  },
  {
    id: "5",
    type: "prompt",
    content: "How might we solve this problem if we had unlimited resources? Now, how might we do it with no resources?",
    category: "Constraints",
    phase: [3, 4, 5]
  },
  {
    id: "6",
    type: "paradox",
    content: "The more you know, the more you realize you don't know.",
    author: "Aristotle",
    category: "Learning",
    phase: [2, 6, 9]
  }
]

export function WisdomSpark({ isOpen, onClose, currentPhase }: WisdomSparkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter sparks relevant to current phase
  const relevantSparks = wisdomSparks.filter(spark => 
    spark.phase.includes(currentPhase) || currentPhase === 0
  )

  const categories = Array.from(new Set(relevantSparks.map(spark => spark.category)))

  const filteredSparks = selectedCategory 
    ? relevantSparks.filter(spark => spark.category === selectedCategory)
    : relevantSparks

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quote": return <Quote className="h-4 w-4" />
      case "paradox": return <Brain className="h-4 w-4" />
      case "prompt": return <Target className="h-4 w-4" />
      default: return <Sparkles className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quote": return "bg-blue-100 text-blue-800 border-blue-200"
      case "paradox": return "bg-purple-100 text-purple-800 border-purple-200"
      case "prompt": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-l border-border shadow-xl z-50 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Wisdom Sparks</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Phase {currentPhase} insights
          </p>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredSparks.map((spark) => (
            <Card key={spark.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge className={getTypeColor(spark.type)} variant="outline">
                    {getTypeIcon(spark.type)}
                    <span className="ml-1 capitalize">{spark.type}</span>
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {spark.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm italic text-muted-foreground mb-2">
                  "{spark.content}"
                </blockquote>
                {spark.author && (
                  <p className="text-xs text-muted-foreground">— {spark.author}</p>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 w-full text-primary hover:text-primary-foreground hover:bg-primary"
                  onClick={() => {
                    // In real app, this would insert the spark into current context
                    console.log('Insert spark:', spark.content)
                  }}
                >
                  Insert into Context
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
