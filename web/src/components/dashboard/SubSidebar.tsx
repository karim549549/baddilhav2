"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_CATEGORIES } from "@/constants/dashboard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SubSidebar() {
	const pathname = usePathname();
	const current = MAIN_CATEGORIES.find((c) => pathname?.startsWith(c.href)) ?? MAIN_CATEGORIES[0];
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			const isMac = navigator.platform.toUpperCase().includes("MAC");
			const isModPressed = isMac ? event.metaKey : event.ctrlKey;
			if (isModPressed && (event.key === "k" || event.key === "K")) {
				event.preventDefault();
				searchInputRef.current?.focus();
			}
		}
		document.addEventListener("keydown", handleKeydown);
		return () => document.removeEventListener("keydown", handleKeydown);
	}, []);
	return (
		<div className={cn(
			"relative z-40 h-screen overflow-hidden border-r bg-neutral-900 p-3 transition-all duration-300 ease-out",
			// Animate between breakpoints instead of display-none
			"w-0 opacity-0 -translate-x-4 pointer-events-none border-transparent",
			"md:w-56 md:opacity-100 md:translate-x-0 md:pointer-events-auto md:border-gray-800"
		)}>
			{/* Search */}
			<div className="mb-3" role="search" aria-label="Sidebar search">
				<div className="group flex items-center justify-between gap-2 rounded border border-neutral-800 bg-neutral-950 px-2  transition-colors focus-within:border-neutral-600 focus-within:bg-neutral-800">
					<div className="flex items-center gap-2 flex-1">
						<Search className="h-3.5 w-3.5 text-gray-500 group-focus-within:text-gray-300" aria-hidden="true" />
						<Input
							ref={searchInputRef}
							placeholder="Search"
							className="h-8 text-xs text-gray-200 focus:text-white bg-transparent border-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500 px-0 flex-1"
						/>
					</div>
					<button
						type="button"
						className="text-[10px] text-gray-400 group-focus-within:text-gray-200 hover:text-gray-300"
						onClick={() => searchInputRef.current?.focus()}
						aria-label="Focus search (Ctrl or Cmd + K)"
						title="Focus search (Ctrl/Cmd + K)"
					>
						<kbd className="px-1 py-0.5 rounded bg-transparent border border-gray-700 group-focus-within:border-gray-600 text-[10px]">Ctrl K</kbd>
					</button>
				</div>
			</div>

			{/* Header + simple list (indented with left border) */}
			<div>
				<div className="list-none select-none text-[11px] uppercase tracking-wide text-gray-400 mb-2 flex items-center justify-between">
					<span>User</span>
				</div>
				<ul className="space-y-1">
					{current.subnav
						.filter((item) => item.label === "Verification" || item.label?.toLowerCase().includes("suspended"))
						.map((item) => {
							const active = pathname === item.href || pathname?.startsWith(item.href);
							const display = item.label === "Verification" ? "Verified" : "Suspended";
							return (
								<li key={item.href} className="ml-2">
									<Link
										href={item.href}
										className={cn(
											"block border-l-2 pl-3 pr-2 py-2 text-xs",
											active ? "border-l-violet-600 text-white" : "border-l-gray-800 text-gray-300 hover:text-white hover:bg-gray-800"
										)}
									>
										{display}
									</Link>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
} 