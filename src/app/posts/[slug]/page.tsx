import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';

import type { Post } from '@/interfaces';
import { fetchGraphQL } from '@/libs/contentful/fetch-graph-ql';
import { isPreviewMode } from '@/libs/contentful/is-preview-mode'
import { POST_FIELDS, extractPosts } from '@/libs/contentful/post';
import { PostContent } from '@/components/posts/PostContent';

import { LatestPostWithoutSpecificPostSummaryList } from './components/LatestPostWithoutSpecificPostSummaryList';

const listPost: () => Promise<Post[]> = async () => {
  const isPreview = isPreviewMode();
  const result = await fetchGraphQL(
    `
      query {
        postCollection(preview: ${isPreview ? 'true' : 'false'}) {
          items {
            ${POST_FIELDS}
          }
        }
      }
    `,
    {
      isPreview,
    },
  );

  const posts = extractPosts(result);

  if (!posts) {
    return [];
  }

  return posts;
};

const readPostBySlug: (params: {
  slug: string;
}) => Promise<Post | undefined> = async ({ slug }) => {
  const isPreview = isPreviewMode();
  const result = await fetchGraphQL(
    `
      query {
        postCollection(where: { slug: "${slug}" }, preview: ${
          isPreview ? 'true' : 'false'
        }, limit: 1) {
          items {
            ${POST_FIELDS}
          }
        }
      }
    `,
    {
      isPreview,
    },
  );

  const posts = extractPosts(result);

  return posts?.[0];
};

interface PageProps {
  params: { slug: string };
}

export const generateStaticParams: () => Promise<
  PageProps['params'][]
> = async () => {
  const posts = await listPost();

  if (typeof posts === 'undefined') {
    throw new Error('Failed to fetch posts');
  }

  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
};

export const generateMetadata: (
  props: PageProps,
) => Promise<Metadata | undefined> = async ({ params: { slug } }) => {
  const post = await readPostBySlug({ slug });

  if (!post) {
    return undefined;
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
};

const Page: (props: PageProps) => Promise<JSX.Element> = async ({
  params: { slug },
}) => {
  const post = await readPostBySlug({ slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-8 pb-24">
      <section className="mb-24">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold">{post.title}</h1>
          </div>

          <div className="mb-12">
            <img
              className="w-full object-cover aspect-video"
              src={`${post.coverImage.url}?w=1024&q=75`}
              alt=""
            />
          </div>

          <div className="mb-3">{dayjs(post.date).format('YYYY/MM/DD')}</div>

          <div className="mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex-none w-12 h-12">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={`${post.author.picture.url}?w=48&q=75`}
                  alt=""
                />
              </div>
              <div>{post.author.name}</div>
            </div>
          </div>

          <div>
            <PostContent content={post.content} />
          </div>
        </div>
      </section>

      <div className="max-w-[1024px] mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">最新の記事</h2>
        </div>

        <div>
          <Suspense fallback="Loading...">
            <LatestPostWithoutSpecificPostSummaryList slug={slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
