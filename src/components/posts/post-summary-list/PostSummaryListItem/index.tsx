import type { FC } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

import type { Post } from '@/interfaces';

export interface PostSummaryListItemProps {
  post: Post;
}

export const PostSummaryListItem: FC<PostSummaryListItemProps> = ({ post }) => {
  return (
    <li className="w-full sm:w-[calc(50%-1.5rem)]">
      <div className="mb-3">
        <Link href={`/posts/${post.slug}`} className="group">
          <div className="mb-2">
            <img
              className="w-full aspect-video object-cover group-hover:shadow-md transition"
              src={`${post.coverImage.url}?w=600&q=75`}
              alt={''}
            />
          </div>
          <div className="group-hover:underline text-3xl font-bold">
            {post.title}
          </div>
        </Link>
      </div>

      <div className="space-y-3">
        <div>{dayjs(post.date).format('YYYY/MM/DD')}</div>

        <div className="flex items-center space-x-4">
          <div className="flex-none w-12 h-12">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={`${post.author.picture.url}?w=48&q=75`}
            />
          </div>
          <div>{post.author.name}</div>
        </div>

        <div>
          <p>{post.excerpt}</p>
        </div>
      </div>
    </li>
  );
};
