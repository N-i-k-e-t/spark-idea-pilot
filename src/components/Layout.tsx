
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
      <div className="min-h-screen w-full flex bg-gradient-to-br from-background via-yellow-50/30 to-secondary/40 overflow-hidden viewport-constrained">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
          <Header 
            onWisdomToggle={() => setWisdomSidebarOpen(!wisdomSidebarOpen)}
            wisdomSidebarOpen={wisdomSidebarOpen}
          />
          
          <main className="flex-1 overflow-hidden relative min-h-0">
            <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-thin">
              <div className="w-full min-h-full safe-area">
                <div className="max-w-full mx-auto px-2 sm:px-4 py-3 sm:py-4">
                  {children}
                </div>
              </div>
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
