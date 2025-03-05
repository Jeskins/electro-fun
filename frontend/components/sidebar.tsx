// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  Clock,
  Star,
  PlusCircle,
  Wallet,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui";

export function Sidebar() {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Trending", href: "/trending", icon: TrendingUp },
    { name: "Recent", href: "/recent", icon: Clock },
    { name: "Favorites", href: "/favorites", icon: Star },
    { name: "Mint Token", href: "/mint", icon: PlusCircle },
    { name: "Portfolio", href: "/portfolio", icon: Wallet },
  ];

  const helpLinks = [
    {
      name: "Documentation",
      href: "https://docs.pump.fun",
      icon: ExternalLink,
    },
    { name: "Help & Support", href: "/help", icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex h-screen fixed left-0 top-0 w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-background pt-16">
      <div className="flex flex-col gap-2 px-3 py-4">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
                pathname === link.href
                  ? "bg-gray-100 dark:bg-gray-800 font-medium"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-3 py-4">
        <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          Resources
        </p>
        <div className="flex flex-col gap-1">
          {helpLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="px-3 py-2">
          <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-3">
            <h4 className="font-medium text-sm mb-1">Need help?</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Join our Discord community for support and updates.
            </p>
            <Link
              href="https://discord.gg/pumpfun"
              target="_blank"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Join Discord
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
