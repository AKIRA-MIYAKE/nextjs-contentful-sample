import type { Document } from '@contentful/rich-text-types';

export interface Post {
  slug: string;
  title: string;
  content: {
    json: Document;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          url: string;
          description: string;
        }[];
      };
    };
  };
  excerpt: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
  cta?: PostCTA;
}

export interface PostCTA {
  id: string;
  variant: 'card';
  actionText: string;
  actionUrl: string;
  title?: string;
  description?: string;
}
