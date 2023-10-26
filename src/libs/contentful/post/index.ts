import { Post } from '@/interfaces';

export const POST_FIELDS = `
title
slug
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
excerpt
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
cta {
  id
  variant
  actionText
  actionUrl
  title
  description
}
`;

/* eslint-disable @typescript-eslint/no-explicit-any */
export const extractPosts: (result: any) => Post[] | undefined = (result) => {
  return result?.data?.postCollection?.items;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
