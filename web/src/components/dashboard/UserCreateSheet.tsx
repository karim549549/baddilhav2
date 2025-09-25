"use client";

import React from "react";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { COUNTRIES, type Country } from "@/constants/countries";
import { type Role, type Verification } from "@/schemas/userImport.schema";
import UserEditHeader from "./UserEditHeader";
import UserEditForm from "./UserEditForm";
import UserEditValidation from "./UserEditValidation";
import UserEditActions from "./UserEditActions";

interface UserCreateSheetProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onUserCreated: (user: unknown) => void;
}

interface NewUser {
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

export default function UserCreateSheet({
	isOpen,
	onOpenChange,
	onUserCreated,
}: UserCreateSheetProps) {
	const [tempUser, setTempUser] = React.useState<NewUser>({
		idx: 0,
		fullName: "",
		email: "",
		role: undefined,
		verificationStatus: undefined,
		phone: "",
		avatar: "",
		isPhoneVerified: undefined,
		issues: [],
	});
	const [selectedCountry, setSelectedCountry] = React.useState<Country>(COUNTRIES[0]);

	React.useEffect(() => {
		if (isOpen) {
			// Reset form when opening
			setTempUser({
				idx: 0,
				fullName: "",
				email: "",
				role: undefined,
				verificationStatus: undefined,
				phone: "",
				avatar: "",
				isPhoneVerified: undefined,
				issues: [],
			});
			setSelectedCountry(COUNTRIES[0]);
		}
	}, [isOpen]);

	function updateTempUser(key: keyof NewUser, value: string | boolean | number | undefined) {
		setTempUser(prev => ({ ...prev, [key]: value }));
	}

	function handleCountryChange(countryCode: string) {
		const country = COUNTRIES.find(c => c.code === countryCode);
		if (country) {
			setSelectedCountry(country);
			// Update phone with new extension if phone exists
			if (tempUser.phone) {
				const phoneWithoutExtension = tempUser.phone.replace(/^\+\d+\s?/, "");
				updateTempUser("phone", `${country.extension} ${phoneWithoutExtension}`);
			}
		}
	}

	function handlePhoneChange(phone: string) {
		updateTempUser("phone", `${selectedCountry.extension} ${phone}`);
	}

	async function handleCreate() {
		// Basic validation
		const issues: string[] = [];
		
		if (!tempUser.fullName?.trim()) {
			issues.push("Full name is required");
		}
		
		if (!tempUser.email?.trim()) {
			issues.push("Email is required");
		} else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(tempUser.email)) {
			issues.push("Email format is invalid");
		}

		if (issues.length > 0) {
			setTempUser(prev => ({ ...prev, issues }));
			return;
		}

		try {
			// Here you would call your API to create the user
			const newUser = {
				fullName: tempUser.fullName,
				email: tempUser.email,
				role: tempUser.role || "USER",
				verificationStatus: tempUser.verificationStatus || "PENDING",
				phone: tempUser.phone || undefined,
				isPhoneVerified: tempUser.isPhoneVerified || false,
			};

			console.log("Creating user:", newUser);
			
			// TODO: Replace with actual API call
			// await createUser(newUser);
			
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			onUserCreated(newUser);
			onOpenChange(false);
			
			toast.success("User created successfully!", {
				description: `${newUser.fullName} has been added to the system.`,
			});
		} catch (error) {
			console.error("Failed to create user:", error);
			toast.error("Failed to create user", {
				description: "Please try again or contact support.",
			});
		}
	}

	function handleCancel() {
		onOpenChange(false);
	}

	// Convert NewUser to PreviewRow format for the form component
	const previewRow = tempUser;

	return (
		<Sheet open={isOpen} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-[500px] bg-black border-gray-800 p-0">
				<div className="flex flex-col h-full">
					<UserEditHeader rowIndex={0} />

					<div className="flex-1 px-6 py-6 overflow-y-auto">
						<UserEditForm
							tempRow={previewRow}
							selectedCountry={selectedCountry}
							onUpdateRow={updateTempUser}
							onCountryChange={handleCountryChange}
							onPhoneChange={handlePhoneChange}
						/>

						<UserEditValidation issues={tempUser.issues} />
					</div>
					
					<UserEditActions onSave={handleCreate} onCancel={handleCancel} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
