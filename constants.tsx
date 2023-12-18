import { Icon } from "@iconify/react";

export type SideNavItem = {
	title: string;
	path: string;
	icon?: JSX.Element;
	submenu?: boolean;
	subMenuItems?: SideNavItem[];
};
export const SIDENAV_ITEMS: SideNavItem[] = [
	{
		title: "home",
		path: "/",
		icon: <Icon icon="lucide:home" width="24" height="24" />,
	},
	{
		title: "todo",
		path: "/todos/todo",
		icon: <Icon icon="ri:todo-line" width="24" height="24" />,
	},
	{
		title: "profile",
		path: "/settings/profile",
		icon: <Icon icon="mingcute:profile-line" width="24" height="24" />,
	},
	{
		title: "users",
		path: "/settings/users-list",
		icon: <Icon icon="mdi:user-outline" width="24" height="24" />,
	},
	{
		title: "settings",
		path: "/settings",
		icon: <Icon icon="lucide:settings" width="24" height="24" />,
		submenu: true,
		subMenuItems: [
			{ title: "email", path: "/settings/email" },
			{ title: "password", path: "/settings/password" },
			{ title: "Account", path: "/settings/account" },
			{ title: "Privacy", path: "/settings/privacy" },
			{ title: "logout", path: "/settings/logout" },
		],
	},
	{
		title: "Help",
		path: "/help",
		icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
	},
];
