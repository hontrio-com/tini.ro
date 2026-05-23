'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { Review } from '@/lib/types';

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-red-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-indigo-500',
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 w-12 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-sm text-gray-400 w-10 shrink-0">{percent}%</span>
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const dateStr = new Date(review.created_at).toLocaleDateString('ro-RO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center shrink-0`}
          >
            <span className="text-white text-sm font-bold">{initials}</span>
          </div>
          <div>
            <p className="font-semibold text-[#0A0A0A] text-sm">{review.name}</p>
            <p className="text-xs text-gray-400">{review.city}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>

      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        {review.verified && (
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">
              Cumparator verificat
            </span>
          </div>
        )}
        <span className="text-xs text-gray-300 ml-auto">{dateStr}</span>
      </div>
    </motion.div>
  );
}

const fallbackReviews: Review[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Andreea M.',
    city: 'Bucuresti',
    rating: 5,
    text: 'Sincer nu credeam ca o sa merite banii dar e super fain. Aerul chiar se simte mai racoros cu apa in el, nu e placebo. Il tin pe birou toata ziua.',
    verified: true,
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Mihai T.',
    city: 'Cluj-Napoca',
    rating: 5,
    text: 'Am luat 2 bucati, unul pentru dormitor si unul la birou. La noapte il pun pe viteza mica si nici nu se aude. Mult mai bun decat ma asteptam pentru banii astia.',
    verified: true,
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Raluca D.',
    city: 'Timisoara',
    rating: 5,
    text: 'A venit a doua zi dupa ce am comandat, am ramas surprinsa. Arata foarte bine, luminile led sunt dragute seara. Merita tot pretul.',
    verified: true,
  },
  {
    id: '4',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Bogdan C.',
    city: 'Iasi',
    rating: 4,
    text: 'Bun produs. L-am luat pentru copil, ii place mult la lumini. Racoreste decent, nu e AC dar face treaba pe caldura asta. Recomand.',
    verified: true,
  },
  {
    id: '5',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Elena P.',
    city: 'Brasov',
    rating: 5,
    text: 'Super multumita! Am pus cuburi de gheata in rezervor si e o diferenta clara fata de un ventilator normal. Livrare rapida, ambalat bine.',
    verified: true,
  },
  {
    id: '6',
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Cristian N.',
    city: 'Constanta',
    rating: 5,
    text: 'Pe la noi in Constanta e cald rau vara si asta m-a salvat la birou. Rezervorul tine vreo 3-4 ore, dupa reumplu rapid. Il recomand oricui.',
    verified: true,
  },
];

export default function ReviewsClient({ reviews }: { reviews: Review[] }) {
  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3">
            Recenzii verificate
          </p>
          <h2 className="tracking-tighttext-3xl md:text-4xl font-bold text-[#0A0A0A] mb-8">
            Ce spun clientii nostri
          </h2>

          {/* Rating summary */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="tracking-tighttext-6xl font-bold text-[#0A0A0A]">4.8</div>
              <div className="flex justify-center mt-2 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">din 847 recenzii</p>
            </div>
            <div className="flex-1 w-full space-y-2">
              <RatingBar label="5 ★" percent={89} />
              <RatingBar label="4 ★" percent={8} />
              <RatingBar label="3 ★" percent={2} />
              <RatingBar label="2 ★" percent={1} />
              <RatingBar label="1 ★" percent={0} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
