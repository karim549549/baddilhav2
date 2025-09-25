"use client";

import React from "react";
import IconRail from "@/components/dashboard/IconRail";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen relative bg-[#0b0b0b] text-white">
			{/* Overlayed icon rail */}
			<div className="absolute inset-y-0 left-0 z-30">
				<IconRail />
			</div>

			{/* Main layout with fixed spacer equal to base rail width */}
			<div className="flex">
				<div className="w-16 shrink-0" />
				<main className="flex-1 transition-opacity duration-150">
					{children}
				</main>
			</div>
		</div>
	);
} 