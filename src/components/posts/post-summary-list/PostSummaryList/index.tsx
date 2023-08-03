import type { FC } from 'react';

import type { Post } from '@/interfaces';

import { PostSummaryListItem } from '../PostSummaryListItem';

export interface PostSummaryListProps {
  posts: Post[];
}

export const PostSummaryList: FC<PostSummaryListProps> = ({ posts }) => {
  return (
    <ul className="relative flex flex-wrap gap-12">
      {posts.map((post) => {
        return <PostSummaryListItem key={post.slug} post={post} />;
      })}
    </ul>
  );
};
