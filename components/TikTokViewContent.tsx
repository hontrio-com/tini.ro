'use client';

import { useEffect } from 'react';
import { ttqViewContent } from '@/lib/tiktok-pixel';

export default function TikTokViewContent({ price }: { price: number }) {
  useEffect(() => {
    ttqViewContent(price);
  }, [price]);

  return null;
}
