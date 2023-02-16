import SupabaseContextProvider from '@/store/app-context';
import { Oswald } from '@next/font/google';
import './global.css';

const oswald = Oswald({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={oswald.className}>
      <head />
      <SupabaseContextProvider>
        <body>
          <header>
            <h1>MemoryLane</h1>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; All the rights belong to the developer</p>
          </footer>
        </body>
      </SupabaseContextProvider>
    </html>
  );
}
