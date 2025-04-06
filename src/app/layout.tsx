'use client';
import './globals.css';

import { ReactNode } from 'react';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { cn } from '@/utils/cn';

import { Providers } from './providers';
import dynamic from 'next/dynamic';


function ClientGuard({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return <>{children}</>;
}

const ClientOnly = dynamic(()=> {
  return Promise.resolve({
    default: ClientGuard
  })
}, {
  ssr: false
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={cn('min-w-[768px] overflow-y-hidden antialiased')}>
        <ClientOnly>
          <Providers>{children}</Providers>
        </ClientOnly>

      </body>
    </html>
  );
}
