import React, { useMemo } from 'react';
import { Plus, Filter } from 'lucide-react';

const sampleProducts = [
  { id: 'p1', name: 'Velvet Air Sneakers', brand: 'Velvet', price: 12999, type: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p2', name: 'Minimalist Watch', brand: 'Mono', price: 8999, type: 'Accessories', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p3', name: 'Everyday Tote', brand: 'CanvasCo', price: 3499, type: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p4', name: 'Wireless Earbuds', brand: 'Echo', price: 5999, type: 'Audio', image: 'https://images.unsplash.com/photo-1597950008696-af9cea48529a?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxWZWx2ZXQlMjBBaXIlMjBTbmVha2Vyc3xlbnwwfDB8fHwxNzYyNDg1NjAxfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'p5', name: 'Classic Hoodie', brand: 'Velvet', price: 4999, type: 'Apparel', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p6', name: 'Travel Backpack', brand: 'CanvasCo', price: 7499, type: 'Bags', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p7', name: 'Smart Lamp', brand: 'Glow', price: 2999, type: 'Home', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop' },
  { id: 'p8', name: 'Performance Tee', brand: 'Velvet', price: 2499, type: 'Apparel', image: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop' },
];

export default function ProductGrid({ onAdd, cartMode, filters, setFilters }) {
  const types = useMemo(() => Array.from(new Set(sampleProducts.map(p => p.type))), []);
  const brands = useMemo(() => Array.from(new Set(sampleProducts.map(p => p.brand))), []);

  const filtered = sampleProducts.filter(p => {
    if (filters.type && filters.type !== 'All' && p.type !== filters.type) return false;
    if (filters.brand && filters.brand !== 'All' && p.brand !== filters.brand) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    return true;
  });

  return (
    <section className="mx-auto w-full max-w-6xl px-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border bg-white px-2 py-1 text-xs">
          <span className={`cursor-pointer rounded-full px-3 py-1 ${cartMode === 'normal' ? 'bg-gray-900 text-white' : ''}`} onClick={() => setFilters(f => ({ ...f, mode: 'normal' }))}>Normal Cart</span>
          <span className={`cursor-pointer rounded-full px-3 py-1 ${cartMode === 'group' ? 'bg-gray-900 text-white' : ''}`} onClick={() => setFilters(f => ({ ...f, mode: 'group' }))}>Group Cart</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs"><Filter className="h-3 w-3"/> Filters</span>
          <select className="rounded-md border px-3 py-1 text-sm" value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
            <option>All</option>
            {types.map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="rounded-md border px-3 py-1 text-sm" value={filters.brand} onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))}>
            <option>All</option>
            {brands.map(b => <option key={b}>{b}</option>)}
          </select>
          <input className="w-28 rounded-md border px-3 py-1 text-sm" type="number" placeholder="Max price" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <div key={p.id} className="group overflow-hidden rounded-xl border bg-white">
            <div className="aspect-square overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
            </div>
            <div className="flex items-start justify-between p-4">
              <div>
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.brand} • {p.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{(p.price/100).toFixed(2)}</p>
                <button onClick={() => onAdd(p)} className="mt-2 inline-flex items-center gap-1 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-black">
                  <Plus className="h-4 w-4"/> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
