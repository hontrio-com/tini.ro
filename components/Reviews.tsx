import { createServerClient } from '@/lib/supabase-server';
import { Review } from '@/lib/types';
import ReviewsClient from './ReviewsClient';

async function getReviews(): Promise<Review[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function Reviews() {
  const reviews = await getReviews();
  return <ReviewsClient reviews={reviews} />;
}
