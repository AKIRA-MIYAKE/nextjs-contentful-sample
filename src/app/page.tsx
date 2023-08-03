import { Suspense } from 'react';
import Link from 'next/link';

import { LatestPostSummaryList } from './components/LatestPostSummaryList';

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <>
      <div className="max-w-[1024px] mx-auto px-6 py-4">
        <h1 className="text-4xl font-bold">Next.js Contentful Sample</h1>
      </div>

      <main className="pt-12 pb-24">
        <section>
          <div className="max-w-[1024px] mx-auto px-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">最新の記事</h2>
            </div>

            <div className="mb-12">
              <Suspense fallback="Loading...">
                <LatestPostSummaryList />
              </Suspense>
            </div>

            <div className="flex justify-center">
              <div>
                <Link href="/posts" className="text-blue-500 hover:underline">
                  全ての記事を見る
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
