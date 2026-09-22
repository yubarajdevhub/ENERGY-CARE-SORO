"use client";

import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/lib/services/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Package, 
  Wrench, 
  Image as ImageIcon, 
  Clock, 
  MapPin, 
  Target, 
  UserCircle, 
  Star, 
  FileText, 
  Settings,
  LogOut,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/company", label: "Company", icon: Building2 },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
  { href: "/admin/attendance", label: "Attendance", icon: Clock },
  { href: "/admin/locations", label: "Staff Locations", icon: MapPin },
  { href: "/admin/leads", label: "Leads", icon: Target },
  { href: "/admin/customers", label: "Customers", icon: UserCircle },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/quotations", label: "Quotations", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center px-6 text-white font-bold text-xl gap-2 border-b border-slate-800">
        <div className="bg-green-600 p-1.5 rounded">
           <LayoutDashboard className="h-5 w-5" />
        </div>
        Energy Care
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-4 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive ? "bg-green-600/10 text-green-500" : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-green-500" : "text-slate-400"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen w-full flex-col bg-slate-50">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden border-r md:block md:w-64 lg:w-72 fixed h-full z-10">
            <SidebarContent />
          </div>

          <div className="flex flex-col flex-1 md:ml-64 lg:ml-72 min-w-0">
            {/* Header */}
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm md:px-6">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  }
                />
                <SheetContent side="left" className="p-0 w-72">
                  <SidebarContent />
                </SheetContent>
              </Sheet>
              
              <div className="w-full flex-1">
                <form>
                  <div className="relative max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="search"
                      placeholder="Search anything..."
                      className="w-full bg-slate-100 pl-9 border-none focus-visible:ring-1"
                    />
                  </div>
                </form>
              </div>
              
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5 text-slate-500" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              
              <div className="flex items-center gap-3 border-l pl-4 ml-2">
                <div className="hidden md:flex flex-col items-end text-sm">
                  <span className="font-medium leading-none">{user?.name}</span>
                  <span className="text-xs text-slate-500 mt-1 capitalize">{user?.role}</span>
                </div>
                <Avatar className="h-9 w-9 bg-green-100 text-green-700">
                  <AvatarFallback>{user?.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
