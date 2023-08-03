/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchGraphQL: (
  query: string,
  options?: { isPreview?: boolean; next?: any },
) => Promise<any> = async (query, options) => {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          options?.isPreview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: options?.next,
    },
  );

  return await response.json();
};
/* eslint-enable @typescript-eslint/no-explicit-any */
