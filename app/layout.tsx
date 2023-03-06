import type { Metadata } from 'next';
import localFont from '@next/font/local';
import SupabaseContextProvider from '@/store/app-context';
import './global.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gaiaDisplay.variable} font-gaiaDisplay`}>
      <SupabaseContextProvider>
        <body>
          {/* Header */}
          <header>
            <h1>MemoryLane</h1>
            <p>Travel through your best memories</p>
          </header>
          {/* Main */}
          <main>{children}</main>
          {/* Footer */}
          <footer>
            <p>
              &copy; All the rights from the design belong to Rolf Jensen & from
              the development to Dorsa Safari Zadeh
            </p>
          </footer>
        </body>
      </SupabaseContextProvider>
    </html>
  );
}
