import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApolloClientProvider from '@/components/ApolloClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chuck Norris Facts!',
  description: 'Generate Chuck Norris Facts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloClientProvider>
        {children}
        </ApolloClientProvider>
      </body>
    </html>
  );
}