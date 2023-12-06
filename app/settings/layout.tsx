"use client";

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

const subNavigation = [
  {
    name: "プロフィール",
    icon: UserCircleIcon,
    href: "settings/profile",
  },
  {
    name: "メールアドレス",
    icon: EnvelopeIcon,
    href: "settings/email",
  },
  {
    name: "パスワード",
    icon: KeyIcon,
    href: "settings/password",
  },
  {
    name: "ログアウト",
    icon: ArrowLeftOnRectangleIcon,
    href: "settings/logout",
  },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-1 text-sm space-y-1 font-bold flex flex-col">
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div
            className={`${item.href == pathname && 'bg-'}`}>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsLayout;
