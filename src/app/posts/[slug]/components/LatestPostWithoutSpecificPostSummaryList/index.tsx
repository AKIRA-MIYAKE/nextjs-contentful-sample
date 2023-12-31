import type { Post } from '@/interfaces';
import { fetchGraphQL } from '@/libs/contentful/fetch-graph-ql';
import { isPreviewMode } from '@/libs/contentful/is-preview-mode';
import { POST_FIELDS, extractPosts } from '@/libs/contentful/post';
import { PostSummaryList } from '@/components/posts/post-summary-list/PostSummaryList';

const listLatestPostWithoutSpecificPostBySlug: (params: {
  slug: string;
}) => Promise<Post[]> = async ({ slug }) => {
  const isPreview = isPreviewMode();
  const result = await fetchGraphQL(
    `
      query {
        postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
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

export const LatestPostWithoutSpecificPostSummaryList: (props: {
  slug: string;
}) => Promise<JSX.Element> = async ({ slug }) => {
  const posts = await listLatestPostWithoutSpecificPostBySlug({ slug });

  return <PostSummaryList posts={posts} />;
};
