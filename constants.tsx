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
		title: "Home",
		path: "/",
		icon: <Icon icon="lucide:home" width="24" height="24" />,
	},
	{
		title: "Todo",
		path: "/todos/todo",
		icon: <Icon icon="ri:todo-line" width="24" height="24" />,
	},
	{
		title: "プロフィール",
		path: "/settings/profile",
		icon: <Icon icon="mingcute:profile-line" width="24" height="24" />,
	},
	{
		title: "ユーザー一覧",
		path: "/settings/users-list",
		icon: <Icon icon="mdi:user-outline" width="24" height="24" />,
	},
	{
		title: "Settings",
		path: "/settings",
		icon: <Icon icon="lucide:settings" width="24" height="24" />,
		submenu: true,
		subMenuItems: [
			{ title: "メールアドレス", path: "/settings/email" },
			{ title: "パスワード", path: "/settings/password" },
			{ title: "Account", path: "/settings/account" },
			{ title: "Privacy", path: "/settings/privacy" },
			{ title: "ログアウト", path: "/settings/logout" },
		],
	},
	{
		title: "Help",
		path: "/help",
		icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
	},
];
