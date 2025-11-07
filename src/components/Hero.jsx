import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden rounded-2xl border bg-gray-50">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white pointer-events-none" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6">
        <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
          Velvet • Modern Group Shopping
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          The most social way to shop
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          Create group carts, split payments across methods, and schedule delivery at your convenience.
        </p>
      </div>
    </section>
  );
}
