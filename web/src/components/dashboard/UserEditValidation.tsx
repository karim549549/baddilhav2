"use client";

import React from "react";

interface UserEditValidationProps {
	issues: string[];
}

export default function UserEditValidation({ issues }: UserEditValidationProps) {
	if (issues.length === 0) return null;

	return (
		<div className="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-xs">
			<h4 className="text-sm font-medium text-red-400 mb-2">Validation Issues:</h4>
			<ul className="text-xs text-red-300 space-y-1">
				{issues.map((issue, idx) => (
					<li key={idx}>• {issue}</li>
				))}
			</ul>
		</div>
	);
}
