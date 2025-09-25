"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, type Country } from "@/constants/countries";
import {
	ROLE_VALUES,
	VERIFICATION_VALUES,
	type Role,
	type Verification,
} from "@/schemas/userImport.schema";

interface PreviewRow {
	idx: number;
	fullName: string;
	email: string;
	role?: Role;
	verificationStatus?: Verification;
	phone?: string;
	avatar?: string;
	isPhoneVerified?: boolean;
	issues: string[];
}

interface UserEditFormProps {
	tempRow: PreviewRow;
	selectedCountry: Country;
	onUpdateRow: (key: keyof PreviewRow, value: string | boolean | number | undefined) => void;
	onCountryChange: (countryCode: string) => void;
	onPhoneChange: (phone: string) => void;
}

const inputClass = "bg-black border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 rounded-xs";
const selectClass = "bg-black border-gray-700 text-white focus:border-purple-500 rounded-xs";

export default function UserEditForm({
	tempRow,
	selectedCountry,
	onUpdateRow,
	onCountryChange,
	onPhoneChange,
}: UserEditFormProps) {
	return (
		<div className="space-y-6">
			{/* Full Name */}
			<div className="space-y-2">
				<Label htmlFor="fullName" className="text-white text-sm font-medium">
					Full Name <span className="text-red-500">*</span>
				</Label>
				<Input
					id="fullName"
					value={tempRow.fullName || ""}
					onChange={(e) => onUpdateRow("fullName", e.target.value)}
					className={inputClass}
					placeholder="Enter full name"
				/>
			</div>
			
			{/* Email */}
			<div className="space-y-2">
				<Label htmlFor="email" className="text-white text-sm font-medium">
					Email <span className="text-red-500">*</span>
				</Label>
				<Input
					id="email"
					type="email"
					value={tempRow.email || ""}
					onChange={(e) => onUpdateRow("email", e.target.value)}
					className={inputClass}
					placeholder="Enter email address"
				/>
			</div>
			
			{/* Role */}
			<div className="space-y-2">
				<Label className="text-white text-sm font-medium">Role</Label>
				<Select
					value={tempRow.role || ""}
					onValueChange={(value) => onUpdateRow("role", value as Role)}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder="Select a role" />
					</SelectTrigger>
					<SelectContent className="bg-black border-gray-700">
						{ROLE_VALUES.map((role) => (
							<SelectItem key={role} value={role} className="text-white hover:bg-gray-800 focus:bg-gray-800">
								{role}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			
			{/* Verification Status */}
			<div className="space-y-2">
				<Label className="text-white text-sm font-medium">Verification Status</Label>
				<Select
					value={tempRow.verificationStatus || ""}
					onValueChange={(value) => onUpdateRow("verificationStatus", value as Verification)}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder="Select verification status" />
					</SelectTrigger>
					<SelectContent className="bg-black border-gray-700">
						{VERIFICATION_VALUES.map((status) => (
							<SelectItem key={status} value={status} className="text-white hover:bg-gray-800 focus:bg-gray-800">
								{status}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			
			{/* Country */}
			<div className="space-y-2">
				<Label className="text-white text-sm font-medium">Country</Label>
				<Select
					value={selectedCountry.code}
					onValueChange={onCountryChange}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent className="bg-black border-gray-700 max-h-60">
						{COUNTRIES.map((country) => (
							<SelectItem key={country.code} value={country.code} className="text-white hover:bg-gray-800 focus:bg-gray-800">
								<span className="flex items-center gap-2">
									<span>{country.flag}</span>
									<span>{country.name}</span>
									<span className="text-gray-400">({country.extension})</span>
								</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			
			{/* Phone Number */}
			<div className="space-y-2">
				<Label htmlFor="phone" className="text-white text-sm font-medium">Phone Number</Label>
				<div className="flex gap-2">
					<div className="flex items-center gap-2 px-3 py-2 bg-black border border-gray-700 rounded-xs text-gray-300 text-sm">
						<span>{selectedCountry.flag}</span>
						<span>{selectedCountry.extension}</span>
					</div>
					<Input
						id="phone"
						value={tempRow.phone?.replace(/^\+\d+\s?/, "") || ""}
						onChange={(e) => onPhoneChange(e.target.value)}
						className={`flex-1 ${inputClass}`}
						placeholder="Enter phone number"
					/>
				</div>
			</div>
			
			{/* Phone Verified */}
			<div className="space-y-2">
				<Label className="text-white text-sm font-medium">Phone Verified</Label>
				<Select
					value={tempRow.isPhoneVerified === undefined ? "undefined" : tempRow.isPhoneVerified.toString()}
					onValueChange={(value) => onUpdateRow("isPhoneVerified", value === "undefined" ? undefined : value === "true")}
				>
					<SelectTrigger className={selectClass}>
						<SelectValue placeholder="Select verification status" />
					</SelectTrigger>
					<SelectContent className="bg-black border-gray-700">
						<SelectItem value="undefined" className="text-white hover:bg-gray-800 focus:bg-gray-800">
							Not specified
						</SelectItem>
						<SelectItem value="true" className="text-white hover:bg-gray-800 focus:bg-gray-800">
							Verified
						</SelectItem>
						<SelectItem value="false" className="text-white hover:bg-gray-800 focus:bg-gray-800">
							Not Verified
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
