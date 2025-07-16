import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Save, 
  Edit2, 
  Check, 
  X, 
  Users, 
  Wrench, 
  Package, 
  Heart,
  Target,
  Radio,
  DollarSign,
  TrendingDown,
  HelpCircle
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CanvasSection {
  id: string
  title: string
  content: string
  placeholder: string
  tips: string[]
  icon: React.ReactNode
  isEditing: boolean
}

const initialSections: CanvasSection[] = [
  {
    id: "key-partners",
    title: "Key Partners",
    content: "Strategic technology partners, Cloud infrastructure providers, Integration platform vendors, Industry experts and advisors",
    placeholder: "Who are your key partners and suppliers? What key resources are you acquiring from partners?",
    tips: [
      "Focus on partnerships that provide competitive advantages",
      "Consider both upstream (suppliers) and downstream (distributors) partners",
      "Include strategic alliances and joint ventures"
    ],
    icon: <Users className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "key-activities",
    title: "Key Activities",
    content: "Software development and maintenance, Customer support and success, Platform security and compliance, Marketing and sales operations",
    placeholder: "What key activities does your value proposition require?",
    tips: [
      "List the most important activities for your business model",
      "Consider production, problem-solving, and platform/network activities",
      "Include both internal and external activities"
    ],
    icon: <Wrench className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "key-resources",
    title: "Key Resources",
    content: "Proprietary technology platform, Skilled engineering team, Customer data and insights, Brand reputation and trust",
    placeholder: "What key resources does your value proposition require?",
    tips: [
      "Include physical, intellectual, human, and financial resources",
      "Focus on the most important assets required to make your business work",
      "Consider both owned and leased resources"
    ],
    icon: <Package className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "value-propositions",
    title: "Value Propositions",
    content: "Streamlined team collaboration that reduces meeting overhead by 40%, Intelligent task prioritization using AI, Seamless integration with existing tools, Real-time visibility into project progress",
    placeholder: "What value do you deliver to the customer?",
    tips: [
      "Focus on the bundle of products and services that create value",
      "Address customer jobs, pains, and gains",
      "Highlight what makes you different from competitors"
    ],
    icon: <Heart className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "customer-relationships",
    title: "Customer Relationships",
    content: "Self-service onboarding and support, Dedicated customer success managers for enterprise clients, Community forums and user groups, Regular product updates and feature releases",
    placeholder: "What type of relationship does each customer segment expect?",
    tips: [
      "Consider personal assistance, self-service, automated services",
      "Think about acquisition, retention, and upselling strategies",
      "Define how you'll maintain relationships at scale"
    ],
    icon: <Heart className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "channels",
    title: "Channels",
    content: "Direct online sales through website, Partner channel program, App marketplace distributions, Industry conferences and events, Content marketing and SEO",
    placeholder: "Through which channels do your customers want to be reached?",
    tips: [
      "Include both direct and indirect channels",
      "Consider awareness, evaluation, purchase, delivery, and after-sales",
      "Think about online and offline touchpoints"
    ],
    icon: <Radio className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "customer-segments",
    title: "Customer Segments",
    content: "Remote-first startups and scale-ups, Distributed teams in enterprise companies, Project managers and team leads, Consulting firms and agencies",
    placeholder: "For whom are you creating value? Who are your most important customers?",
    tips: [
      "Define distinct groups of people or organizations",
      "Consider demographics, behaviors, and needs",
      "Prioritize segments based on profitability and strategic importance"
    ],
    icon: <Target className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "cost-structure",
    title: "Cost Structure",
    content: "Software development and engineering costs, Cloud infrastructure and hosting, Customer acquisition and marketing, Personnel and operational expenses",
    placeholder: "What are the most important costs inherent in your business model?",
    tips: [
      "Include both fixed and variable costs",
      "Consider cost-driven vs. value-driven structures",
      "Focus on the most expensive elements of your business"
    ],
    icon: <TrendingDown className="h-5 w-5" />,
    isEditing: false
  },
  {
    id: "revenue-streams",
    title: "Revenue Streams",
    content: "SaaS subscription tiers (Basic, Pro, Enterprise), Professional services and consulting, Marketplace transaction fees, Premium integrations and add-ons",
    placeholder: "For what value are your customers really willing to pay?",
    tips: [
      "Consider one-time payments, subscriptions, licensing, etc.",
      "Think about pricing mechanisms and strategies",
      "Include both direct and indirect revenue sources"
    ],
    icon: <DollarSign className="h-5 w-5" />,
    isEditing: false
  }
]

export function BusinessModelPage() {
  const [sections, setSections] = useState<CanvasSection[]>(initialSections)
  const [isSaving, setIsSaving] = useState(false)

  const handleEdit = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isEditing: true }
          : { ...section, isEditing: false }
      )
    )
  }

  const handleSave = (sectionId: string, newContent: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, content: newContent, isEditing: false }
          : section
      )
    )
    toast({
      title: "Section Updated",
      description: "Your changes have been saved successfully.",
    })
  }

  const handleCancel = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isEditing: false }
          : section
      )
    )
  }

  const saveCanvas = () => {
    setIsSaving(true)
    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Canvas Saved",
        description: "Your business model canvas has been saved successfully.",
      })
    }, 1000)
  }

  const exportToPDF = async () => {
    const canvas = document.getElementById('business-model-canvas')
    if (!canvas) return

    try {
      const canvasImage = await html2canvas(canvas, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvasImage.toDataURL('image/png')
      const pdf = new jsPDF('l', 'mm', 'a4')
      
      const imgWidth = 297
      const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save('business-model-canvas.pdf')
      
      toast({
        title: "Export Successful",
        description: "Your business model canvas has been exported as PDF.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your canvas.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Business Model Canvas
            </h1>
            <p className="text-muted-foreground mt-2">
              Map out your business model across nine essential components
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={saveCanvas}
              disabled={isSaving}
              variant="outline"
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={exportToPDF}
              className="btn-gradient gap-2"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Grid */}
      <div id="business-model-canvas" className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-5 gap-4 min-h-[800px]">
          {/* Key Partners */}
          <div className="row-span-2">
            <CanvasCard section={sections.find(s => s.id === "key-partners")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Key Activities */}
          <div>
            <CanvasCard section={sections.find(s => s.id === "key-activities")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Value Propositions */}
          <div className="row-span-2">
            <CanvasCard section={sections.find(s => s.id === "value-propositions")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Customer Relationships */}
          <div>
            <CanvasCard section={sections.find(s => s.id === "customer-relationships")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Customer Segments */}
          <div className="row-span-2">
            <CanvasCard section={sections.find(s => s.id === "customer-segments")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Key Resources */}
          <div>
            <CanvasCard section={sections.find(s => s.id === "key-resources")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Channels */}
          <div>
            <CanvasCard section={sections.find(s => s.id === "channels")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Cost Structure */}
          <div className="col-span-2">
            <CanvasCard section={sections.find(s => s.id === "cost-structure")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>

          {/* Revenue Streams */}
          <div className="col-span-3">
            <CanvasCard section={sections.find(s => s.id === "revenue-streams")!} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface CanvasCardProps {
  section: CanvasSection
  onEdit: (sectionId: string) => void
  onSave: (sectionId: string, content: string) => void
  onCancel: (sectionId: string) => void
}

function CanvasCard({ section, onEdit, onSave, onCancel }: CanvasCardProps) {
  const [tempContent, setTempContent] = useState(section.content)
  const [showTips, setShowTips] = useState(false)

  return (
    <Card className="h-full flex flex-col group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            {section.icon}
            {section.title}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTips(!showTips)}
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <HelpCircle className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(section.id)}
              disabled={section.isEditing}
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {showTips && (
          <div className="mt-2 p-2 bg-muted rounded text-xs">
            <ul className="space-y-1">
              {section.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        {section.isEditing ? (
          <div className="space-y-3 h-full flex flex-col">
            <Textarea
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              placeholder={section.placeholder}
              className="flex-1 min-h-[120px] text-sm"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onSave(section.id, tempContent)}
                className="btn-gradient"
              >
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setTempContent(section.content)
                  onCancel(section.id)
                }}
              >
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {section.content || section.placeholder}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}