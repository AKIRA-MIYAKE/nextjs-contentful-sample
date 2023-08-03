export const isPreviewMode: () => boolean = () => {
  return process.env.CONTENTFUL_PREVIEW_MODE === 'true';
}
