import type { FC } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import type { Post } from '@/interfaces';

import styles from './index.module.css';

export interface PostContentProps {
  content: Post['content'];
}

export const PostContent: FC<PostContentProps> = ({ content }) => {
  return (
    <div className={styles['content']}>
      {documentToReactComponents(content.json)}
    </div>
  );
};
