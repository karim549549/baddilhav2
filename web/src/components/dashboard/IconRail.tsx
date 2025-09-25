"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MAIN_CATEGORIES } from "@/constants/dashboard";
import IconButton from "@/components/dashboard/IconButton";
import LogoButton from "@/components/dashboard/LogoButton";

export default function IconRail() {
	const pathname = usePathname();
	const middle = MAIN_CATEGORIES.filter((c) => c.place === "middle");
	const supportCat = MAIN_CATEGORIES.find((c) => c.key === "support");
	const settingsCat = MAIN_CATEGORIES.find((c) => c.key === "settings");
	const anyMatch = MAIN_CATEGORIES.some((c) => pathname?.startsWith(c.href));
	return (
		<TooltipProvider delayDuration={0}>
			<div className="group flex h-screen w-16 hover:w-20 transition-[width] duration-150 ease-out flex-col justify-between sticky top-0 border-r border-gray-800 bg-[#0b0b0b] py-4">
				<div className="flex items-center justify-center">
					<LogoButton />
				</div>
				<div className="flex flex-col items-stretch gap-1">
					{middle.map(({ key, icon: Icon, href }) => {
						const active = pathname === href || pathname?.startsWith(href) || (!anyMatch && key === "users");
						return (
							<IconButton key={key} href={href} active={active} label={key}>
								<Icon className="w-5 h-5" />
							</IconButton>
						);
					})}
				</div>
				<div className="flex flex-col items-stretch gap-1">
					{supportCat ? (
						(() => {
							const active = pathname === supportCat.href || pathname?.startsWith(supportCat.href) || (!anyMatch && false);
							const Icon = supportCat.icon;
							return (
								<IconButton href={supportCat.href} active={active} label={supportCat.key}>
									<Icon className="w-5 h-5" />
								</IconButton>
							);
						})()
					) : null}
					{settingsCat ? (
						(() => {
							const active = pathname === settingsCat.href || pathname?.startsWith(settingsCat.href) || (!anyMatch && false);
							const Icon = settingsCat.icon;
							return (
								<IconButton href={settingsCat.href} active={active} label={settingsCat.key}>
									<Icon className="w-5 h-5" />
								</IconButton>
							);
						})()
					) : null}
				</div>
			</div>
		</TooltipProvider>
	);
} 