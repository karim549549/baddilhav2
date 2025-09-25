"use client";

import React from "react";
import { User } from "lucide-react";
import { SheetTitle } from "@/components/ui/sheet";

interface UserEditHeaderProps {
	rowIndex: number;
}

export default function UserEditHeader({ rowIndex }: UserEditHeaderProps) {
	return (
		<div className="px-6 py-6 border-b border-gray-800">
			<div className="flex items-center gap-3 mb-2">
				<div className="w-10 h-10 rounded-full bg-violet-600 grid place-items-center">
					<User className="w-5 h-5 text-white" />
				</div>
				<div>
					<SheetTitle className="text-white text-xl font-semibold">Edit User</SheetTitle>
					<p className="text-gray-400 text-sm">Row #{rowIndex}</p>
				</div>
			</div>
			<p className="text-gray-500 text-sm">
				Update user information and validation status.
			</p>
		</div>
	);
}
