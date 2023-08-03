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
}
