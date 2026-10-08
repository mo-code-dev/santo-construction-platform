import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Santo — Construction Operations Platform',
  description: 'Premium construction ERP, project management, and field operations platform.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
