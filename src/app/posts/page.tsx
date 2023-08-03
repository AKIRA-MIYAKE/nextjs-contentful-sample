import { Suspense } from 'react';
import type { Metadata } from 'next';

import { AllPostSummaryList } from './components/AllPostSummaryList';

export const metadata: Metadata = {
  title: '全ての記事 | Next.js Contentful Sample',
};

const Page: () => Promise<JSX.Element> = async () => {
  return (
    <div className="pt-8 pb-24">
      <section>
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold">全ての記事</h1>
          </div>

          <div>
            <Suspense fallback="Loading...">
              <AllPostSummaryList />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
