import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import SupabaseListener from "@/components/supabase-listener";
import TanstackProvider from "@/components/provider/tanstackProvider";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import SideNav from "@/components/side-nav";

const notoSansJp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <TanstackProvider>
        <body className={notoSansJp.className}>
          <div className="flex">
            <SideNav/>
           <main className="flex-1">
              <Header/>
              <HeaderMobile/>
           </main>
          </div>
          <div className="flex flex-col" style={{ minHeight: '93vh' }}>
            <SupabaseListener />
            <main className="flex-1 container max-w-screen-sm mx-auto px-1 py-5">
              {children}
            </main>
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright (c) All rights reserved | FullsStackChannel
              </div>
            </footer>
          </div>
        </body>
      </TanstackProvider>
    </html>
  );
}
