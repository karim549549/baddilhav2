"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Package,
  Shield,
  Bell,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import AuthLogo from "@/components/auth/AuthLogo";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState(["overview", "user-management", "item-management"]);

  const navSections = [
    { 
      id: "overview", 
      title: "Overview", 
      icon: LayoutDashboard, 
      items: [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/users", label: "Users", icon: Users },
        { href: "/dashboard/items", label: "Items", icon: Package },
        { href: "/dashboard/settings", label: "Settings", icon: Settings }
      ]
    },
    {
      id: "user-management",
      title: "User Management",
      icon: Users,
      items: [
        { href: "/dashboard/users", label: "All Users", icon: Users },
        { href: "/dashboard/users/create", label: "Create User", icon: Users }
      ]
    },
    {
      id: "moderation",
      title: "Content Moderation",
      icon: Shield,
      items: [
        { href: "/dashboard/moderation/reports", label: "Reports", icon: Bell }
      ]
    },
    {
      id: "security",
      title: "Security",
      icon: Shield,
      items: [
        { href: "/dashboard/security/oauth", label: "OAuth Settings", icon: Shield }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="flex h-full w-64 flex-col bg-neutral-900 border-r border-neutral-800">
      <div className="p-6">
        <AuthLogo />
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {navSections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const Icon = section.icon;
            
            return (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {section.title}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = pathname === item.href;
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-neutral-800 text-white"
                              : "text-gray-400 hover:bg-neutral-800 hover:text-white"
                          )}
                        >
                          <ItemIcon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}