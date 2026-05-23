import { Suspense } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGif from '@/components/ProductGif';
import Benefits from '@/components/Benefits';
import HowItWorks from '@/components/HowItWorks';
import Specifications from '@/components/Specifications';
import Reviews from '@/components/Reviews';
import TrustBadges from '@/components/TrustBadges';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import OrderModal from '@/components/OrderModal';
import StickyBar from '@/components/StickyBar';

function ReviewsSkeleton() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="h-4 w-32 bg-gray-100 rounded mx-auto mb-3 animate-pulse" />
          <div className="h-8 w-64 bg-gray-100 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 h-48 animate-pulse">
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-24" />
                  <div className="h-3 bg-gray-100 rounded w-16" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
                <div className="h-3 bg-gray-100 rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-[#FAFAFA]">
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductGif />
      <Benefits />
      <HowItWorks />
      <Specifications />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
      <TrustBadges />
      <FAQ />
      <Footer />
      <OrderModal />
      <StickyBar />
    </main>
  );
}
