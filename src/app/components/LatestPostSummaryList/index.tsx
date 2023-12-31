import type { Post } from '@/interfaces';

import { fetchGraphQL } from '@/libs/contentful/fetch-graph-ql';
import { isPreviewMode } from '@/libs/contentful/is-preview-mode';
import { POST_FIELDS, extractPosts } from '@/libs/contentful/post';
import { PostSummaryList } from '@/components/posts/post-summary-list/PostSummaryList';

const listLatestPost: () => Promise<Post[]> = async () => {
  const isPreview = isPreviewMode();
  const result = await fetchGraphQL(
    `
      query {
        postCollection(order: date_DESC, preview: ${
          isPreview ? 'true' : 'false'
        }, limit: 2) {
          items {
            ${POST_FIELDS}
          }
        }
      }
    `,
    {
      isPreview,
      next: {
        tags: ['posts'],
      },
    },
  );

  const posts = extractPosts(result);

  if (!posts) {
    return [];
  }

  return posts;
};

export const LatestPostSummaryList: () => Promise<JSX.Element> = async () => {
  const posts = await listLatestPost();

  return <PostSummaryList posts={posts} />;
};
