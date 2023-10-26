import type { FC } from 'react';

import type { PostCTA as IPostCTA } from '@/interfaces';

export interface PostCTAProps {
  cta: IPostCTA;
}

export const PostCTA: FC<PostCTAProps> = ({ cta }) => {
  return (
    <div
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md"
      data-post-cta-id={cta.id}
    >
      {(() => {
        if (!cta.title && !cta.description) {
          return null;
        }

        return (
          <div className="mb-4">
            {cta.title && (
              <p className="mb-2 text-2xl font-bold text-gray-900">
                {cta.title}
              </p>
            )}
            {cta.description && (
              <p className="text-gray-700">{cta.description}</p>
            )}
          </div>
        );
      })()}

      <div>
        <a
          href={cta.actionUrl}
          target="_blank"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          {cta.actionText}
        </a>
      </div>
    </div>
  );
};
