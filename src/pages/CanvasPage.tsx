import { useState, useRef } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Move,
  Lightbulb,
  Target,
  Users,
  Rocket
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface IdeaCard {
  id: string
  title: string
  description: string
  category: string
  votes: number
  tags: string[]
  clusterId: string
}

interface Cluster {
  id: string
  name: string
  color: string
  ideas: IdeaCard[]
}

const initialClusters: Cluster[] = [
  {
    id: "cluster-1",
    name: "Core Features",
    color: "bg-blue-100 border-blue-300",
    ideas: [
      {
        id: "idea-1",
        title: "Real-time Collaboration",
        description: "Enable multiple users to work simultaneously on documents with live cursor tracking",
        category: "Feature",
        votes: 8,
        tags: ["collaboration", "real-time"],
        clusterId: "cluster-1"
      },
      {
        id: "idea-2",
        title: "Smart Notifications",
        description: "AI-powered notification system that learns user preferences and priority levels",
        category: "Feature",
        votes: 6,
        tags: ["ai", "notifications"],
        clusterId: "cluster-1"
      }
    ]
  },
  {
    id: "cluster-2",
    name: "User Experience",
    color: "bg-green-100 border-green-300",
    ideas: [
      {
        id: "idea-3",
        title: "Intuitive Onboarding",
        description: "Interactive tutorial that adapts to user's experience level and learning pace",
        category: "UX",
        votes: 7,
        tags: ["onboarding", "tutorial"],
        clusterId: "cluster-2"
      }
    ]
  },
  {
    id: "cluster-3",
    name: "Revenue Streams",
    color: "bg-purple-100 border-purple-300",
    ideas: [
      {
        id: "idea-4",
        title: "Subscription Tiers",
        description: "Multiple pricing levels with clear value proposition for each tier",
        category: "Business",
        votes: 5,
        tags: ["pricing", "subscription"],
        clusterId: "cluster-3"
      }
    ]
  },
  {
    id: "unassigned",
    name: "New Ideas",
    color: "bg-gray-100 border-gray-300",
    ideas: []
  }
]

export function CanvasPage() {
  const [clusters, setClusters] = useState<Cluster[]>(initialClusters)
  const [zoom, setZoom] = useState(100)
  const [newIdeaTitle, setNewIdeaTitle] = useState("")
  const [newIdeaDescription, setNewIdeaDescription] = useState("")
  const [editingIdea, setEditingIdea] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceClusters = [...clusters]
    const sourceCluster = sourceClusters.find(cluster => cluster.id === source.droppableId)
    const destCluster = sourceClusters.find(cluster => cluster.id === destination.droppableId)

    if (!sourceCluster || !destCluster) return

    const draggedIdea = sourceCluster.ideas.find(idea => idea.id === draggableId)
    if (!draggedIdea) return

    // Remove from source
    sourceCluster.ideas.splice(source.index, 1)

    // Add to destination
    draggedIdea.clusterId = destination.droppableId
    destCluster.ideas.splice(destination.index, 0, draggedIdea)

    setClusters(sourceClusters)
    
    toast({
      title: "Idea Moved",
      description: `"${draggedIdea.title}" moved to ${destCluster.name}`,
    })
  }

  const addNewIdea = () => {
    if (!newIdeaTitle.trim()) return

    const newIdea: IdeaCard = {
      id: `idea-${Date.now()}`,
      title: newIdeaTitle,
      description: newIdeaDescription,
      category: "Feature",
      votes: 0,
      tags: [],
      clusterId: "unassigned"
    }

    setClusters(prev => 
      prev.map(cluster => 
        cluster.id === "unassigned" 
          ? { ...cluster, ideas: [...cluster.ideas, newIdea] }
          : cluster
      )
    )

    setNewIdeaTitle("")
    setNewIdeaDescription("")
    
    toast({
      title: "New Idea Added",
      description: `"${newIdea.title}" has been added to the canvas`,
    })
  }

  const deleteIdea = (ideaId: string) => {
    setClusters(prev => 
      prev.map(cluster => ({
        ...cluster,
        ideas: cluster.ideas.filter(idea => idea.id !== ideaId)
      }))
    )
    
    toast({
      title: "Idea Deleted",
      description: "The idea has been removed from the canvas",
    })
  }

  const voteForIdea = (ideaId: string) => {
    setClusters(prev => 
      prev.map(cluster => ({
        ...cluster,
        ideas: cluster.ideas.map(idea => 
          idea.id === ideaId 
            ? { ...idea, votes: idea.votes + 1 }
            : idea
        )
      }))
    )
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Feature":
        return <Lightbulb className="h-4 w-4" />
      case "UX":
        return <Users className="h-4 w-4" />
      case "Business":
        return <Target className="h-4 w-4" />
      default:
        return <Rocket className="h-4 w-4" />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      {/* Toolbar */}
      <div className="p-4 border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ideation Canvas
            </h1>
            <p className="text-sm text-muted-foreground">
              Drag and drop ideas to organize them into clusters
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Add New Idea Panel */}
      <div className="p-4 border-b bg-card/30 backdrop-blur-sm">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Input
              placeholder="Idea title..."
              value={newIdeaTitle}
              onChange={(e) => setNewIdeaTitle(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Brief description..."
              value={newIdeaDescription}
              onChange={(e) => setNewIdeaDescription(e.target.value)}
            />
          </div>
          <Button 
            onClick={addNewIdea}
            disabled={!newIdeaTitle.trim()}
            className="btn-gradient"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Idea
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 overflow-auto p-6"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 min-h-full">
            {clusters.map((cluster) => (
              <div key={cluster.id} className="flex flex-col">
                <div className={`p-4 rounded-t-lg border-2 ${cluster.color}`}>
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Move className="h-4 w-4" />
                    {cluster.name}
                    <Badge variant="secondary" className="ml-auto">
                      {cluster.ideas.length}
                    </Badge>
                  </h3>
                </div>
                
                <Droppable droppableId={cluster.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-4 border-2 border-t-0 rounded-b-lg min-h-[300px] transition-colors ${
                        cluster.color
                      } ${snapshot.isDraggingOver ? 'bg-opacity-50' : ''}`}
                    >
                      <div className="space-y-3">
                        {cluster.ideas.map((idea, index) => (
                          <Draggable key={idea.id} draggableId={idea.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`cursor-move transition-all hover:shadow-md ${
                                  snapshot.isDragging ? 'rotate-3 shadow-lg' : ''
                                }`}
                              >
                                <CardHeader className="pb-2">
                                  <div className="flex items-start justify-between">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                      {getCategoryIcon(idea.category)}
                                      {idea.title}
                                    </CardTitle>
                                    <div className="flex items-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          voteForIdea(idea.id)
                                        }}
                                        className="h-6 w-6 p-0"
                                      >
                                        👍
                                      </Button>
                                      <span className="text-xs">{idea.votes}</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          deleteIdea(idea.id)
                                        }}
                                        className="h-6 w-6 p-0 text-destructive"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {idea.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">
                                      {idea.category}
                                    </Badge>
                                    <div className="flex gap-1">
                                      {idea.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}