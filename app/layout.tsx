import type { Metadata } from "next";
import localFont from "next/font/local";
import SupabaseProvider from "@/components/supabase-provider";
import "./global.css";
import createClient from "@/util/subpabaseClient-server";
import CustomCursor from "../components/ui/CustomCursor";
import CursorManager from "../components/ui/CursorManager";
// import NextNProgress from 'nextjs-progressbar';

// dont want it to be cached and therefore not perform the session getting function
// export const revalidate = 0;

const gaiaDisplay = localFont({
  src: [
    {
      path: "../public/fonts/Gaia-Display.otf",
      weight: "400",
    },
  ],
  variable: "--font-gaiaDisplay",
});

// can be set in page/layout (properties that arent specified, would be inherited from the roots metadata)
export const metadata: Metadata = {
  title: {
    default: "MemoryLane",
    template: "%s | MemoryLane", // setting the title on the other pages, would make the text appear in the place of %s
  },
  description: "Travel through your best memories",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const serverAccessToken = session?.access_token ?? null;

  return (
    <>
      <html
        lang="en"
        className={`${gaiaDisplay.variable} font-gaiaDisplay cursor-none`}
      >
        <CursorManager>
          <CustomCursor />
          {/* <NextNProgress /> */}
          <SupabaseProvider serverAccessToken={serverAccessToken}>
            <body className="relative w-screen h-screen bg-primary text-dark cursor-none">
              {children}
            </body>
          </SupabaseProvider>
        </CursorManager>
      </html>
    </>
  );
}
