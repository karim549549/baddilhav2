"use client";

import React, { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { Users, Ban, TrendingUp, UserPlus, Upload } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { buildPreviewRow } from "@/schemas/userImport.schema";
import UserCreateSheet from "@/components/dashboard/UserCreateSheet";
// CSV row interface
interface CsvRow {
	[key: string]: string;
}

// Simple CSV parser function
function parseCSV(csvText: string): CsvRow[] {
	const lines = csvText.trim().split('\n');
	if (lines.length < 2) return [];
	
	const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
	const rows: CsvRow[] = [];
	
	for (let i = 1; i < lines.length; i++) {
		const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
		const row: CsvRow = {};
		
		headers.forEach((header, index) => {
			row[header] = values[index] || '';
		});
		
		rows.push(row);
	}
	
	return rows;
}
import { toast } from "sonner";

function UsersPageContent() {
	// Mock data for UI only
	const kpis = [
		{ label: "Total Users", value: "24,582", delta: "+3.2%", positive: true, icon: Users },
		{ label: "Suspended", value: "126", delta: "-0.4%", positive: false, icon: Ban },
	];

	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const currentModal = params.get("modal");

	const setModal = useCallback((modal: string | null) => {
		const url = new URL(window.location.href);
		if (modal) url.searchParams.set("modal", modal); else url.searchParams.delete("modal");
		router.push(url.pathname + (url.search ? url.search : ""), { scroll: false });
	}, [router]);

	useEffect(() => {
		function onEsc(e: KeyboardEvent) {
			if (e.key === "Escape" && currentModal) setModal(null);
		}
		document.addEventListener("keydown", onEsc);
		return () => document.removeEventListener("keydown", onEsc);
	}, [currentModal, setModal]);

	// Import dialog state (UI only)
	const [importMode, setImportMode] = useState<"file" | "json">("file");
	const [jsonText, setJsonText] = useState("");
	const [selectedFileName, setSelectedFileName] = useState<string>("");
	const [csvData, setCsvData] = useState<CsvRow[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Create user sheet state
	const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

	function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		setSelectedFileName(file ? file.name : "");
		
		// If it's a CSV file, parse it immediately
		if (file && file.name.toLowerCase().endsWith('.csv')) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const csvText = event.target?.result as string;
					const parsedData = parseCSV(csvText);
					console.log("CSV parsed:", parsedData);
					setCsvData(parsedData);
				} catch (error) {
					console.error("CSV parsing error:", error);
					toast.error("Failed to parse CSV file", {
						description: "Please check the file format and try again.",
					});
				}
			};
			reader.readAsText(file);
		}
	}

	function handleValidate() {
		try {
			let rows: Array<Record<string, unknown>>;
			
			if (importMode === "json") {
				const parsed = JSON.parse(jsonText || "[]");
				rows = Array.isArray(parsed) ? parsed : [];
			} else {
				// For file mode, use parsed CSV data
				if (csvData.length === 0) {
					toast.error("No data to validate", {
						description: "Please select a CSV file first.",
					});
					return;
				}
				rows = csvData;
			}
			
			const canonical = rows.map((r, i) => buildPreviewRow(r, i + 1));
			const validCount = canonical.filter((r) => r.issues.length === 0).length;
			const invalidCount = canonical.length - validCount;
			const payload = { rows: canonical, validCount, invalidCount, source: importMode, fileName: selectedFileName };
			const id = (window.crypto && "randomUUID" in window.crypto) ? window.crypto.randomUUID() : String(Date.now());
			sessionStorage.setItem(`import-preview:${id}`, JSON.stringify(payload));
			setModal(null);
			router.push(`${pathname}/import/preview?id=${id}`, { scroll: false });
		} catch (err) {
			console.error("Validation error:", err);
			toast.error("Validation failed", {
				description: "Please check your data format and try again.",
			});
		}
	}

	function handleUserCreated(user: unknown) {
		console.log("New user created:", user);
		// Here you could refresh the user list, update KPIs, etc.
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Users</h1>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							aria-label="Add user"
							className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-neutral-700 bg-neutral-900 text-gray-200 hover:bg-neutral-800 cursor-pointer"
						>
							<UserPlus className="h-4 w-4" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56 border-neutral-800 bg-neutral-900 text-gray-200">
						<DropdownMenuLabel className="text-gray-400">Add users</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => setModal("import-users")}>
							<Upload className="h-4 w-4 text-violet-500" />
							<span>Upload CSV/JSON</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => setIsCreateSheetOpen(true)}>
							<UserPlus className="h-4 w-4 text-emerald-500" />
							<span>Add manually (form)</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* KPI cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{kpis.map(({ label, value, delta, positive, icon: Icon }) => (
					<div key={label} className="rounded-md border border-neutral-800 bg-neutral-900 p-4">
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-400">{label}</div>
							<div className="h-8 w-8 grid place-items-center rounded-md bg-neutral-800 border border-neutral-700">
								<Icon className="h-4 w-4 text-gray-300" />
							</div>
						</div>
						<div className="mt-2 flex items-baseline gap-2">
							<div className="text-2xl font-semibold text-white">{value}</div>
							<div className={positive ? "text-emerald-400 text-xs inline-flex items-center gap-1" : "text-rose-400 text-xs inline-flex items-center gap-1"}>
								<TrendingUp className="h-3 w-3" />
								{delta}
							</div>
						</div>
						<div className="mt-3 h-2 w-full overflow-hidden rounded bg-neutral-800">
							<div className={positive ? "h-full w-2/3 bg-emerald-600" : "h-full w-1/3 bg-rose-600"} />
						</div>
					</div>
				))}
			</div>

			{/* Import users dialog */}
			<Dialog open={currentModal === "import-users"} onOpenChange={(open) => setModal(open ? "import-users" : null)}>
				<DialogContent className="border-neutral-800 bg-neutral-900 text-gray-200">
					<DialogHeader>
						<DialogTitle>Upload users (CSV or JSON)</DialogTitle>
						<DialogDescription className="text-gray-400">Choose a file or paste JSON. Validate to open the preview and import valid rows.</DialogDescription>
					</DialogHeader>
					<div className="space-y-3">
						<div className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-950 p-1 text-xs">
							<button type="button" onClick={() => { 
								setImportMode("file"); 
								setJsonText(""); 
								setCsvData([]);
								setSelectedFileName("");
							}} className={importMode === "file" ? "rounded-sm bg-neutral-800 px-3 py-1 text-gray-200" : "rounded-sm px-3 py-1 text-gray-400 hover:text-gray-200"}>File</button>
							<button type="button" onClick={() => { 
								setImportMode("json"); 
								setCsvData([]);
								setSelectedFileName("");
							}} className={importMode === "json" ? "rounded-sm bg-neutral-800 px-3 py-1 text-gray-200" : "rounded-sm px-3 py-1 text-gray-400 hover:text-gray-200"}>Paste JSON</button>
						</div>

						{importMode === "file" ? (
							<div className="space-y-2">
								<input ref={fileInputRef} onChange={handleFileChange} type="file" accept=".csv,application/json" className="block w-full text-sm file:mr-3 file:rounded file:border file:border-neutral-700 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-gray-200 hover:file:bg-neutral-700" />
								{selectedFileName && (
									<div className="text-xs text-gray-400">
										Selected: {selectedFileName}
										{csvData.length > 0 && (
											<span className="ml-2 text-emerald-400">
												• {csvData.length} rows loaded
											</span>
										)}
									</div>
								)}
							</div>
						) : (
							<div>
								<textarea value={jsonText} onChange={(e) => { setJsonText(e.target.value); }} rows={8} placeholder='[ { "name": "Jane", "email": "jane@example.com", "role": "USER", "status": "VERIFIED" } ]' className="w-full rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-gray-200 outline-none focus:border-neutral-700 placeholder:text-gray-600" />
								<div className="mt-1 text-xs text-gray-500">Paste an array of user objects.</div>
							</div>
						)}

						<div className="flex items-center justify-end gap-2 pt-2">
							<DialogClose className="inline-flex items-center rounded-md border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-gray-200 hover:bg-neutral-800">Close</DialogClose>
							<button onClick={handleValidate} className="inline-flex items-center rounded-md bg-violet-600 px-3 py-1.5 text-sm text-white hover:bg-violet-500">Validate</button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Create User Sheet */}
			<UserCreateSheet
				isOpen={isCreateSheetOpen}
				onOpenChange={setIsCreateSheetOpen}
				onUserCreated={handleUserCreated}
			/>
		</div>
	);
}

export default function UsersPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UsersPageContent />
		</Suspense>
	);
} 