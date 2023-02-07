import SupabaseContextProvider  from '@/store/app-context';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <SupabaseContextProvider>
        <body>{children}</body>
      </SupabaseContextProvider>
    </html>
  );
}
