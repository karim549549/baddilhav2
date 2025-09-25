import { z } from "zod";

export const ROLE_VALUES = ["USER", "ADMIN"] as const;
export const VERIFICATION_VALUES = [
	"UNVERIFIED",
	"PENDING",
	"VERIFIED",
	"REJECTED",
] as const;

export type Role = typeof ROLE_VALUES[number];
export type Verification = typeof VERIFICATION_VALUES[number];

export interface PreviewRow {
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

// Accepts both canonical and aliased keys, then normalizes
const RawRowSchema = z
	.object({
		fullName: z.string().optional(),
		name: z.string().optional(),
		email: z.union([z.string(), z.number()]).optional(),
		role: z.string().optional(),
		verificationStatus: z.string().optional(),
		status: z.string().optional(),
		phone: z.union([z.string(), z.number()]).optional(),
		avatar: z.string().optional(),
		isPhoneVerified: z.union([z.boolean(), z.string()]).optional(),
	})
	.passthrough();

export function normalizeRawRow(input: unknown): Omit<PreviewRow, "idx" | "issues"> {
	const parsed = RawRowSchema.safeParse(input);
	const value = parsed.success ? parsed.data : {};

	const fullName = (value.fullName ?? value.name ?? "").toString();
	const email = (value.email ?? "").toString();
	const role = (value.role ?? "").toString().toUpperCase() as Role;
	const verificationStatus = (value.verificationStatus ?? value.status ?? "")
		.toString()
		.toUpperCase() as Verification;
	const phone = value.phone !== undefined ? String(value.phone) : undefined;
	const avatar = value.avatar ? String(value.avatar) : undefined;
	const isPhoneVerified =
		value.isPhoneVerified !== undefined
			? typeof value.isPhoneVerified === "boolean"
				? value.isPhoneVerified
				: String(value.isPhoneVerified).toLowerCase() === "true"
			: undefined;

	return {
		fullName,
		email,
		role: (role as string) ? role : undefined,
		verificationStatus: (verificationStatus as string) ? verificationStatus : undefined,
		phone,
		avatar,
		isPhoneVerified,
	};
}

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateRow(row: PreviewRow): PreviewRow {
	const issues: string[] = [];
	if (!row.fullName?.trim()) issues.push("Missing fullName");
	if (!row.email || !emailRegex.test(row.email)) issues.push("Invalid email");
	if (row.role && !ROLE_VALUES.includes(row.role)) issues.push("Invalid role");
	if (
		row.verificationStatus &&
		!VERIFICATION_VALUES.includes(row.verificationStatus)
	)
		issues.push("Invalid verificationStatus");
	return { ...row, issues };
}

export function buildPreviewRow(input: unknown, indexOneBased: number): PreviewRow {
	const normalized = normalizeRawRow(input);
	return validateRow({ idx: indexOneBased, issues: [], ...normalized });
} 