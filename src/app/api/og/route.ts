import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';
import React from 'react';

export const runtime = 'edge';

const interSemiBold = fetch(
  'https://www.raghavsingla.tech/fonts/Inter_24pt-SemiBold.ttf'
).then((res) => res.arrayBuffer());



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') ?? 'Raghav Singla';
  const subtitle =
    searchParams.get('subtitle') ??
    'Fullstack & AI Developer · raghavsingla.tech';

  const fontData = await interSemiBold;

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f0f0f',
          color: '#ffffff',
          padding: '40px',
          fontFamily: 'Inter',
          textAlign: 'center',
        },
      },
      React.createElement(
        'div',
        { style: { fontSize: 72, fontWeight: 'bold' } },
        title
      ),
      React.createElement(
        'div',
        { style: { fontSize: 32, opacity: 0.7, marginTop: '20px' } },
        subtitle
      )
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
