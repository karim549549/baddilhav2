"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function IconButton({ href, active, label, children }: { href: string; active: boolean; label: string; children: React.ReactNode }) {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href={href} className="block w-full">
						<div
							className={cn(
								"flex w-full items-center justify-center px-2 py-2 transition-colors duration-150 border-l-2",
								active
									? "border-l-violet-600 text-white bg-transparent"
									: "border-l-transparent text-gray-300 hover:text-white hover:bg-gray-800"
							)}
						>
							{children}
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right" className="bg-gray-900 text-white">
					{label}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
} 