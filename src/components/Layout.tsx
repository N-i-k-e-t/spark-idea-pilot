import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { WisdomSpark } from "@/components/WisdomSpark"
import { useState } from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [wisdomSidebarOpen, setWisdomSidebarOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <Header 
            onWisdomToggle={() => setWisdomSidebarOpen(!wisdomSidebarOpen)}
            wisdomSidebarOpen={wisdomSidebarOpen}
          />
          
          <main className="flex-1 relative">
            <div className="h-full">
              {children}
            </div>
            
            <WisdomSpark 
              isOpen={wisdomSidebarOpen}
              onClose={() => setWisdomSidebarOpen(false)}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}