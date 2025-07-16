import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCw, Check, Edit2, Sparkles, Target } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ProblemStatement {
  id: string
  title: string
  description: string
  category: string
  marketSize: string
  urgency: "high" | "medium" | "low"
  isEditing: boolean
}

const initialProblems: ProblemStatement[] = [
  {
    id: "1",
    title: "Remote Team Collaboration Inefficiency",
    description: "Teams working remotely struggle with real-time collaboration, leading to decreased productivity and miscommunication. Current tools are fragmented and don't provide seamless integration.",
    category: "Productivity",
    marketSize: "$15B",
    urgency: "high",
    isEditing: false
  },
  {
    id: "2",
    title: "Sustainable Food Packaging Gap",
    description: "Small restaurants and food businesses need affordable, eco-friendly packaging solutions that maintain food quality while reducing environmental impact.",
    category: "Sustainability",
    marketSize: "$8B",
    urgency: "medium",
    isEditing: false
  },
  {
    id: "3",
    title: "Personal Finance Education for Gen Z",
    description: "Young adults lack accessible, engaging financial literacy education that's relevant to their digital-first lifestyle and unique economic challenges.",
    category: "Education",
    marketSize: "$5B",
    urgency: "medium",
    isEditing: false
  },
  {
    id: "4",
    title: "Healthcare Access in Rural Areas",
    description: "Rural communities face significant barriers to healthcare access, including limited providers, long travel distances, and inadequate telemedicine infrastructure.",
    category: "Healthcare",
    marketSize: "$12B",
    urgency: "high",
    isEditing: false
  }
]

export function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemStatement[]>(initialProblems)
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleEdit = (problemId: string) => {
    setProblems(prev => 
      prev.map(problem => 
        problem.id === problemId 
          ? { ...problem, isEditing: true }
          : { ...problem, isEditing: false }
      )
    )
  }

  const handleSave = (problemId: string, newDescription: string) => {
    setProblems(prev => 
      prev.map(problem => 
        problem.id === problemId 
          ? { ...problem, description: newDescription, isEditing: false }
          : problem
      )
    )
    toast({
      title: "Problem Statement Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleCancel = (problemId: string) => {
    setProblems(prev => 
      prev.map(problem => 
        problem.id === problemId 
          ? { ...problem, isEditing: false }
          : problem
      )
    )
  }

  const handleSelect = (problemId: string) => {
    setSelectedProblem(problemId)
    const problem = problems.find(p => p.id === problemId)
    toast({
      title: "Problem Statement Selected",
      description: `You've selected: "${problem?.title}". Ready to proceed to ideation!`,
    })
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)
    // Simulate AI regeneration
    setTimeout(() => {
      const newProblems = generateNewProblems()
      setProblems(newProblems)
      setSelectedProblem(null)
      setIsRegenerating(false)
      toast({
        title: "New Problems Generated",
        description: "Fresh problem statements have been generated for you.",
      })
    }, 2000)
  }

  const generateNewProblems = (): ProblemStatement[] => {
    const problemTemplates = [
      {
        title: "AI-Powered Personal Assistant Gap",
        description: "Busy professionals need a more intelligent personal assistant that can handle complex scheduling, email management, and task prioritization with minimal input.",
        category: "AI/Productivity",
        marketSize: "$20B",
        urgency: "high"
      },
      {
        title: "Sustainable Transportation for Cities",
        description: "Urban areas need affordable, eco-friendly transportation solutions that reduce traffic congestion and pollution while being accessible to all income levels.",
        category: "Transportation",
        marketSize: "$25B",
        urgency: "high"
      },
      {
        title: "Mental Health Support for Remote Workers",
        description: "Remote workers face increasing isolation and stress, requiring accessible mental health resources and community connections tailored to their unique challenges.",
        category: "Mental Health",
        marketSize: "$7B",
        urgency: "medium"
      },
      {
        title: "Micro-Learning for Skill Development",
        description: "Working professionals need bite-sized, practical skill development opportunities that fit into their busy schedules and provide immediate value.",
        category: "Education",
        marketSize: "$10B",
        urgency: "medium"
      }
    ]

    return problemTemplates.map((template, index) => ({
      id: `gen-${Date.now()}-${index}`,
      title: template.title,
      description: template.description,
      category: template.category,
      marketSize: template.marketSize,
      urgency: template.urgency as "high" | "medium" | "low",
      isEditing: false
    }))
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Problem Statement Selection
            </h1>
            <p className="text-muted-foreground mt-2">
              Choose a problem statement to focus on, or edit them to better match your vision.
            </p>
          </div>
          <Button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
            {isRegenerating ? "Generating..." : "Generate New"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {problems.map((problem) => (
          <Card
            key={problem.id}
            className={`transition-all duration-300 hover:shadow-lg ${
              selectedProblem === problem.id 
                ? "ring-2 ring-primary bg-primary/5" 
                : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {problem.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{problem.category}</Badge>
                    <Badge className={getUrgencyColor(problem.urgency)}>
                      {problem.urgency} urgency
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {problem.marketSize} market
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(problem.id)}
                  disabled={problem.isEditing}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {problem.isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    defaultValue={problem.description}
                    className="min-h-[100px]"
                    placeholder="Describe the problem..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.ctrlKey) {
                        handleSave(problem.id, e.currentTarget.value)
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={(e) => {
                        const textarea = e.currentTarget.parentElement?.previousElementSibling as HTMLTextAreaElement
                        handleSave(problem.id, textarea.value)
                      }}
                      className="btn-gradient"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCancel(problem.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSelect(problem.id)}
                      className={
                        selectedProblem === problem.id 
                          ? "bg-success text-success-foreground" 
                          : "btn-gradient"
                      }
                    >
                      {selectedProblem === problem.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Selected
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Select This
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProblem && (
        <div className="mt-8 p-6 bg-gradient-primary/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Great choice! Now that you've selected a problem statement, you can:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Move to Ideation Canvas
            </Button>
            <Button variant="outline" size="sm">
              Research Market Size
            </Button>
            <Button variant="outline" size="sm">
              Identify Stakeholders
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}