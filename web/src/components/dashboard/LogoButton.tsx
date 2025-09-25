"use client";

import React from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LogoButton() {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link href="/dashboard" className="block">
						<div className="rounded-xl p-2 bg-violet-600/90 text-white">
							<span className="block w-5 h-5 font-bold leading-5 text-center">B</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right" className="bg-gray-900 text-white">
					Dashboard
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
} 