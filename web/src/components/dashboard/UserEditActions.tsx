"use client";

import React from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserEditActionsProps {
	onSave: () => void;
	onCancel: () => void;
}

export default function UserEditActions({ onSave, onCancel }: UserEditActionsProps) {
	return (
		<div className="px-6 py-6 border-t border-gray-800">
			<div className="flex gap-3">
				<Button 
					onClick={onSave}
					className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xs transition-colors flex items-center justify-center"
				>
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
				<Button 
					variant="outline" 
					onClick={onCancel}
					className="flex-1 border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white py-3 rounded-xs flex items-center justify-center"
				>
					<X className="h-4 w-4 mr-2" />
					Cancel
				</Button>
			</div>
		</div>
	);
}
