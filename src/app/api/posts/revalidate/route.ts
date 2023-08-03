import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const POST: (req: NextRequest) => Promise<NextResponse> = async (
  req,
) => {
  const token = req.headers.get('x-vercel-reval-key');

  if (!token) {
    return NextResponse.json(
      { message: 'x-vercel-reval-key header not defined' },
      { status: 401 },
    );
  } else if (token !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    revalidateTag('posts');
    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 },
    );
  }
};
