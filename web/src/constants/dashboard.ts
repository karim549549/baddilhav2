import React from "react";
import {
	Users,
	Package,
	BarChart3,
	Settings,
	Activity,
	Heart,
	MessageSquare,
} from "lucide-react";

export type MainCategoryKey =
	| "users"
	| "items"
	| "matches"
	| "analytics"
	| "monitoring"
	| "support"
	| "settings";

export type DashboardCategory = {
	key: MainCategoryKey;
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	subnav: Array<{ label: string; href: string }>;
	place?: "top" | "middle" | "bottom";
};

export const MAIN_CATEGORIES: Array<DashboardCategory> = [
	{
		key: "users",
		icon: Users,
		href: "/dashboard/users",
		subnav: [
			{ label: "All Users", href: "/dashboard/users" },
			{ label: "Verification", href: "/dashboard/users/verification" },
			{ label: "Suspended", href: "/dashboard/users?suspended=true" },
		],
		place: "middle",
	},
	{
		key: "items",
		icon: Package,
		href: "/dashboard/items",
		subnav: [
			{ label: "All Items", href: "/dashboard/items" },
			{ label: "Approval", href: "/dashboard/items/approval" },
			{ label: "Categories", href: "/dashboard/items/categories" },
			{ label: "Conditions", href: "/dashboard/items/conditions" },
		],
		place: "middle",
	},
	{
		key: "matches",
		icon: Heart,
		href: "/dashboard/matches",
		subnav: [
			{ label: "All Matches", href: "/dashboard/matches" },
		],
		place: "middle",
	},
	{
		key: "analytics",
		icon: BarChart3,
		href: "/dashboard/stats",
		subnav: [
			{ label: "User Stats", href: "/dashboard/stats/users" },
			{ label: "Item Stats", href: "/dashboard/stats/items" },
			{ label: "Match & Swipe", href: "/dashboard/stats/matches" },
		],
		place: "middle",
	},
	{
		key: "monitoring",
		icon: Activity,
		href: "/dashboard/realtime/health",
		subnav: [
			{ label: "System Health", href: "/dashboard/realtime/health" },
			{ label: "Live Feed", href: "/dashboard/realtime/feed" },
		],
		place: "middle",
	},
	{
		key: "support",
		icon: MessageSquare,
		href: "/dashboard/support/inbox",
		subnav: [
			{ label: "Inbox", href: "/dashboard/support/inbox" },
			{ label: "Assigned", href: "/dashboard/support/assigned" },
			{ label: "Closed", href: "/dashboard/support/closed" },
		],
		place: "bottom",
	},
	{
		key: "settings",
		icon: Settings,
		href: "/dashboard/settings",
		subnav: [
			{ label: "App Settings", href: "/dashboard/settings" },
			{ label: "Feature Toggles", href: "/dashboard/settings/features" },
		],
		place: "bottom",
	},
]; 