import type { ReactNode } from 'react';
import Link from 'next/link';

const Layout: (props: {
  children: ReactNode;
}) => Promise<JSX.Element> = async ({ children }) => {
  return (
    <>
      <header>
        <div className="max-w-[1024px] mx-auto px-6 py-4">
          <Link href="/" className="text-xl font-bold hover:underline">
            Next.js Contentful Sample
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
