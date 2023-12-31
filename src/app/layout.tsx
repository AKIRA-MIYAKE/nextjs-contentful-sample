import './globals.css';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import type { Metadata } from 'next';

import { OptimizeNext } from '@/components/OptimizeNext';

export const metadata: Metadata = {
  title: 'Next.js Contentful Sample',
  description: 'Generated by create next app',
};

const RootLayout: (props: {
  children: ReactNode;
}) => Promise<JSX.Element> = async ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <Suspense>
          <OptimizeNext />
        </Suspense>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
