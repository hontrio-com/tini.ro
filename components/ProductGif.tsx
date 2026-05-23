import Image from 'next/image';

export default function ProductGif() {
  return (
    <section className="bg-white py-8 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <Image
            src="/produs.gif"
            alt="Ventilator Portabil 3-in-1 in actiune"
            width={900}
            height={600}
            className="w-full h-auto"
            unoptimized
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-3 font-medium">
          Racorire reala prin evaporare - vezi cum functioneaza
        </p>
      </div>
    </section>
  );
}
