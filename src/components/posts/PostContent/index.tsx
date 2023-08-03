import type { FC } from 'react';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import type { Post } from '@/interfaces';

import styles from './index.module.css';

export interface PostContentProps {
  content: Post['content'];
}

const customMarkdownOptions: (content: Post['content']) => Options = (
  content,
) => {
  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = content.links.assets.block.find(
          (asset) => asset.sys.id === node.data.target.sys.id,
        );

        if (!asset) {
          return null;
        }

        return (
          <img src={asset.url} alt={asset.description} className="w-full" />
        );
      },
    },
  };
};

export const PostContent: FC<PostContentProps> = ({ content }) => {
  return (
    <div className={styles['content']}>
      {documentToReactComponents(content.json, customMarkdownOptions(content))}
    </div>
  );
};
