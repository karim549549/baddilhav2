"use client";

import React, { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserEditSheet from "@/components/dashboard/UserEditSheet";
import {
	ROLE_VALUES,
	VERIFICATION_VALUES,
	type Role,
	type Verification,
	buildPreviewRow,
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

interface PreviewPayload {
	rows: PreviewRow[];
	validCount: number;
	invalidCount: number;
	source: "file" | "json";
	fileName?: string;
}

function classifyRow(row: PreviewRow) {
	const requiredMissing = !row.fullName?.trim() || !row.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email);
	const optionalInvalid = (row.role && !ROLE_VALUES.includes(row.role)) || (row.verificationStatus && !VERIFICATION_VALUES.includes(row.verificationStatus));
	if (!requiredMissing && !optionalInvalid) return { color: "bg-emerald-500", label: "Valid" };
	if (requiredMissing) return { color: "bg-rose-500", label: "Missing required/invalid required" };
	return { color: "bg-amber-500", label: "Has optional issues" };
}

function ImportPreviewPageContent() {
	const params = useSearchParams();
	const router = useRouter();
	const id = params.get("id");
	const [data, setData] = useState<PreviewPayload | null>(null);
	const [rows, setRows] = useState<PreviewRow[]>([]);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [editingRow, setEditingRow] = useState<PreviewRow | null>(null);

	const persist = useCallback((nextRows: PreviewRow[], base?: PreviewPayload) => {
		if (!id) return;
		const validCount = nextRows.filter((r) => r.issues.length === 0).length;
		const invalidCount = nextRows.length - validCount;
		const payload: PreviewPayload = { ...(base ?? data)!, rows: nextRows, validCount, invalidCount };
		sessionStorage.setItem(`import-preview:${id}`, JSON.stringify(payload));
		setData(payload);
		setRows(nextRows);
	}, [id, data]);

	useEffect(() => {
		if (!id) return;
		const raw = sessionStorage.getItem(`import-preview:${id}`);
		if (!raw) return;
		try {
			const parsed: PreviewPayload = JSON.parse(raw);
			setData(parsed);
			const migrated: PreviewRow[] = (parsed.rows || []).map((r: PreviewRow, i: number) => buildPreviewRow({ ...r, idx: r.idx ?? i + 1 }, (r.idx ?? i) + 1));
			setRows(migrated);
			persist(migrated, parsed);
		} catch {}
	}, [id, persist]);

	function deleteRow(index: number) {
		const next = rows.filter((_, i) => i !== index).map((r, i2) => ({ ...r, idx: i2 + 1 }));
		persist(next);
	}

	function handleRowClick(row: PreviewRow) {
		setEditingRow(row);
		setIsSheetOpen(true);
	}

	function handleSaveEdit(updatedRow: PreviewRow) {
		const next = rows.map(r => r.idx === updatedRow.idx ? updatedRow : r);
		persist(next);
		setIsSheetOpen(false);
		setEditingRow(null);
	}

	const validRows = useMemo(() => rows.filter((r) => r.issues.length === 0), [rows]);

	function handleImport() {
		if (validRows.length === 0) return;
		
		// Here you would typically call your API to import the users
		// For now, we'll simulate the import process
		console.log("Importing users:", validRows);
		
		// Show success toast
		toast.success(`Successfully imported ${validRows.length} user${validRows.length === 1 ? '' : 's'}!`, {
			description: "All valid rows have been processed and imported.",
		});
		
		// Remove the imported valid rows from the list
		const remainingRows = rows.filter((r) => r.issues.length > 0);
		persist(remainingRows);
	}

	function handleBack() {
		const willLose = rows.length > 0;
		if (!willLose || window.confirm("Leave preview? Unsaved import data will be lost.")) {
			router.back();
		}
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<button onClick={handleBack} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-gray-300 hover:bg-neutral-800" aria-label="Back">
						<ArrowLeft className="h-4 w-4" />
					</button>
					<h2 className="text-xl font-semibold">Import preview</h2>
				</div>
				<div className="text-xs text-gray-400">
					{data?.source === "file" ? (data?.fileName ?? "File") : "JSON"}
				</div>
			</div>
			{!data ? (
				<div className="rounded border border-neutral-800 bg-neutral-900 p-4 text-gray-400 text-sm">No preview data found. Return to import and validate again.</div>
			) : (
				<>
					<div className="rounded border border-neutral-800 bg-neutral-900 p-3 text-xs text-gray-400">
						Valid: <span className="text-emerald-400 font-medium">{data.validCount}</span> · Invalid: <span className="text-rose-400 font-medium">{data.invalidCount}</span>
					</div>
					<div className="rounded border border-neutral-800 overflow-hidden">
						<Table className="min-w-full text-sm">
							<TableHeader className="bg-neutral-900 sticky top-0">
								<TableRow className="text-left text-xs">
									<TableHead className="px-3 py-2 text-gray-300">#</TableHead>
									<TableHead className="px-3 py-2 text-gray-300">Full name</TableHead>
									<TableHead className="px-3 py-2 text-gray-300">Email</TableHead>
									<TableHead className="px-3 py-2 text-gray-300">Role</TableHead>
									<TableHead className="px-3 py-2 text-gray-300">Verification</TableHead>
									<TableHead className="px-3 py-2 text-gray-300">Phone</TableHead>
									<TableHead className="px-3 py-2"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rows.map((r, i) => {
									const status = classifyRow(r);
									return (
										<TableRow 
											key={r.idx} 
											className="border-t border-neutral-800 align-top cursor-pointer hover:bg-neutral-800/50 transition-colors"
											onClick={() => handleRowClick(r)}
										>
											<TableCell className="px-3 py-2 text-gray-400">
												<div className="flex items-center gap-2">
													<span title={r.issues.join(", ") || status.label} className={`inline-block h-2.5 w-2.5 rounded-full ${status.color}`}></span>
													<span>{r.idx}</span>
												</div>
											</TableCell>
											<TableCell className="px-3 py-2">
												<span className="text-gray-200">{r.fullName || "-"}</span>
											</TableCell>
											<TableCell className="px-3 py-2">
												<span className="text-gray-300">{r.email || "-"}</span>
											</TableCell>
											<TableCell className="px-3 py-2">
												<span className="text-gray-300">{r.role || "-"}</span>
											</TableCell>
											<TableCell className="px-3 py-2">
												{r.isPhoneVerified !== undefined ? (
													<div className="flex items-center gap-2">
														{r.isPhoneVerified ? (
															<CheckCircle className="h-4 w-4 text-green-500" />
														) : (
															<XCircle className="h-4 w-4 text-red-500" />
														)}
														<span className="text-gray-300">{r.isPhoneVerified ? "Verified" : "Not Verified"}</span>
													</div>
												) : (
													<span className="text-gray-300">-</span>
												)}
											</TableCell>
											<TableCell className="px-3 py-2">
												<span className="text-gray-300">{r.phone || "-"}</span>
											</TableCell>
											<TableCell className="px-3 py-2">
												<button 
													onClick={(e) => {
														e.stopPropagation();
														deleteRow(i);
													}} 
													className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-gray-300 hover:bg-neutral-800 hover:text-red-400 transition-colors" 
													aria-label="Delete row"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
					<div className="flex items-center justify-end gap-2">
						<button 
							onClick={handleImport}
							disabled={validRows.length === 0} 
							className="inline-flex items-center rounded-md bg-purple-600 px-3 py-1.5 text-sm text-white hover:bg-purple-500 disabled:opacity-50 transition-colors"
						>
							Import {validRows.length} valid
						</button>
					</div>
				</>
			)}
			
			{/* Edit Sheet */}
			<UserEditSheet
				isOpen={isSheetOpen}
				onOpenChange={setIsSheetOpen}
				editingRow={editingRow}
				onSave={handleSaveEdit}
			/>
		</div>
	);
}

export default function ImportPreviewPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ImportPreviewPageContent />
		</Suspense>
	);
} 