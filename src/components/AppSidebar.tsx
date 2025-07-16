import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { 
  MessageCircle, 
  FileText, 
  Lightbulb, 
  Grid3x3, 
  Calendar,
  BarChart3,
  Home
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Idea Capture",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Problem Statements",
    url: "/problems",
    icon: FileText,
  },
  {
    title: "Ideation Canvas",
    url: "/canvas",
    icon: Grid3x3,
  },
  {
    title: "Business Model",
    url: "/business-model",
    icon: Lightbulb,
  },
  {
    title: "Campaign Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "KPI Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 w-full transition-colors ${
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName}
                      end={item.url === "/"}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}