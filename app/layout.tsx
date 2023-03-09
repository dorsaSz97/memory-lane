import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SupabaseContextProvider from '@/store/app-context';
import './global.css';
import createClient from '@/lib/subpabaseClient-server';

export const revalidate = 0;

const gaiaDisplay = localFont({
  src: [
    {
      path: '../public/fonts/Gaia-Display.otf',
      weight: '400',
    },
  ],
  variable: '--font-gaiaDisplay',
});

// can be set in page/layout (properties that arent specified, would be inherited from the roots metadata)
export const metadata: Metadata = {
  title: {
    default: 'MemoryLane',
    template: '%s | MemoryLane', // setting the title on the other pages, would make the text appear in the place of %s
  },
  description: 'Travel through your best memories',
  icons: {
    icon: '/favicon.ico',
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

  const accessToken = session?.access_token || null;

  return (
    <html
      lang="en"
      className={`${gaiaDisplay.variable} font-gaiaDisplay h-full w-full`}
    >
      <SupabaseContextProvider accessToken={accessToken}>
        <body className="relative flex flex-col items-center w-full h-full bg-primary bg-opacity-50 text-dark">
          <main className="w-full flex-1">{children}</main>

          <footer className="p-2 font-sans text-xs">
            <p>
              &copy; All the rights belong to Rolf Jensen (the designer) & Dorsa
              Safari Zadeh (the developer)
            </p>
          </footer>
        </body>
      </SupabaseContextProvider>
    </html>
  );
}
