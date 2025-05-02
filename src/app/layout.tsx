import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Manrope, Monomaniac_One } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const monomaniacOne = Monomaniac_One({
  weight: '400',
  variable: '--font-monomaniac-one',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Silatik',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={cn(
          manrope.variable,
          monomaniacOne.variable,
          'font-sans antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
