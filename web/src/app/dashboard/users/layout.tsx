import React from "react";
import SubSidebar from "@/components/dashboard/SubSidebar";
import { Bell, UserRound } from "lucide-react";
import { Toaster } from "sonner";

export default function UsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col w-full h-screen overflow-y-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-6 py-4">
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-violet-600 grid place-items-center">
						<UserRound className="w-5 h-5 text-white" />
					</div>
					<div>
						<div className="text-sm font-medium">Admin User</div>
						<div className="text-xs text-gray-400">admin@example.com</div>
					</div>
				</div>
				<button className="p-2 text-gray-300 hover:text-white">
					<Bell className="w-5 h-5" />
				</button>
			</div>
			<hr className="border-gray-800" />

			{/* Body: sub sidebar + page content */}
			<div className="flex min-h-0 flex-1">
				<SubSidebar />
				<main className="flex-1 overflow-y-auto p-6">
					{children}
				</main>
			</div>
			<Toaster 
				richColors 
				position="top-right" 
				theme="dark"
				toastOptions={{
					style: {
						background: '#171717',
						border: '1px solid #404040',
						color: '#f5f5f5',
					},
				}}
			/>
		</div>
	);
} 