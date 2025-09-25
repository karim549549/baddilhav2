"use client";

import React from "react";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { validateRow as validateWithSchema, type Role, type Verification } from "@/schemas/userImport.schema";
import { COUNTRIES, type Country } from "@/constants/countries";
import UserEditHeader from "./UserEditHeader";
import UserEditForm from "./UserEditForm";
import UserEditValidation from "./UserEditValidation";
import UserEditActions from "./UserEditActions";

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

interface UserEditSheetProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	editingRow: PreviewRow | null;
	onSave: (updatedRow: PreviewRow) => void;
}


export default function UserEditSheet({
	isOpen,
	onOpenChange,
	editingRow,
	onSave,
}: UserEditSheetProps) {
	const [tempRow, setTempRow] = React.useState<PreviewRow | null>(null);
	const [selectedCountry, setSelectedCountry] = React.useState<Country>(COUNTRIES[0]);

	React.useEffect(() => {
		if (editingRow) {
			setTempRow({ ...editingRow });
			// Parse existing phone for country detection
			if (editingRow.phone) {
				const country = COUNTRIES.find(c => editingRow.phone?.startsWith(c.extension));
				if (country) {
					setSelectedCountry(country);
				}
			}
		}
	}, [editingRow]);

	function updateTempRow(key: keyof PreviewRow, value: string | boolean | number | undefined) {
		if (!tempRow) return;
		setTempRow({ ...tempRow, [key]: value });
	}

	function handleCountryChange(countryCode: string) {
		const country = COUNTRIES.find(c => c.code === countryCode);
		if (country) {
			setSelectedCountry(country);
			// Update phone with new extension if phone exists
			if (tempRow?.phone) {
				const phoneWithoutExtension = tempRow.phone.replace(/^\+\d+\s?/, "");
				updateTempRow("phone", `${country.extension} ${phoneWithoutExtension}`);
			}
		}
	}

	function handlePhoneChange(phone: string) {
		updateTempRow("phone", `${selectedCountry.extension} ${phone}`);
	}

	function handleSave() {
		if (!tempRow) return;
		
		const updatedRow = validateWithSchema(tempRow);
		onSave(updatedRow);
		onOpenChange(false);
		toast.success("User updated successfully!");
	}

	function handleCancel() {
		onOpenChange(false);
	}

	if (!tempRow) return null;

	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-[500px] bg-black border-gray-800 p-0">
				<div className="flex flex-col h-full">
					<UserEditHeader rowIndex={tempRow.idx} />

					<div className="flex-1 px-6 py-6 overflow-y-auto">
						<UserEditForm
							tempRow={tempRow}
							selectedCountry={selectedCountry}
							onUpdateRow={updateTempRow}
							onCountryChange={handleCountryChange}
							onPhoneChange={handlePhoneChange}
						/>

						<UserEditValidation issues={tempRow.issues} />
					</div>
					
					<UserEditActions onSave={handleSave} onCancel={handleCancel} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
