import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartPanel from './components/CartPanel';

function validDate3DaysAhead(dateStr) {
  if (!dateStr) return false;
  const selected = new Date(dateStr);
  const now = new Date();
  const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
  return selected >= min;
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [cartMode, setCartMode] = useState('normal'); // 'normal' | 'group'
  const [filters, setFilters] = useState({ type: 'All', brand: 'All', maxPrice: '', mode: 'normal' });
  const [items, setItems] = useState([]);
  const [schedule, setSchedule] = useState({ date: '', time: '' });

  // keep cartMode in sync with toggle in product grid
  React.useEffect(() => {
    if (filters.mode && filters.mode !== cartMode) setCartMode(filters.mode);
  }, [filters.mode]);

  const handleAdd = (p) => {
    setItems(prev => {
      const found = prev.find(i => i.id === p.id);
      if (found) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const handleRemove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const handleQty = (id, qty) => setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));

  const onCreateInvite = () => {
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    navigator.clipboard.writeText(`${window.location.origin}?group=${code}`);
    alert(`Invite link copied! Share this with friends to join your cart.\nCode: ${code}`);
  };

  const Home = () => (
    <div className="space-y-8">
      <Hero />
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured products</h2>
          <div className="text-xs text-gray-500">Switch between normal and group carts right on the products page.</div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_380px]">
          <ProductGrid onAdd={handleAdd} cartMode={cartMode} filters={filters} setFilters={setFilters} />
          <CartPanel items={items} mode={cartMode} onRemove={handleRemove} onUpdateQty={handleQty} onSchedule={setSchedule} schedule={schedule} onCreateInvite={onCreateInvite} />
        </div>
      </section>
    </div>
  );

  const Products = () => (
    <div className="space-y-6">
      <section className="mx-auto max-w-6xl px-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All products</h2>
          <div className="flex items-center gap-2 text-xs">
            <span className={`cursor-pointer rounded-full px-3 py-1 ${cartMode === 'normal' ? 'bg-gray-900 text-white' : 'border'}`} onClick={() => setCartMode('normal')}>Normal Cart</span>
            <span className={`cursor-pointer rounded-full px-3 py-1 ${cartMode === 'group' ? 'bg-gray-900 text-white' : 'border'}`} onClick={() => setCartMode('group')}>Group Cart</span>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-[1fr_380px]">
        <ProductGrid onAdd={handleAdd} cartMode={cartMode} filters={filters} setFilters={setFilters} />
        <CartPanel items={items} mode={cartMode} onRemove={handleRemove} onUpdateQty={handleQty} onSchedule={setSchedule} schedule={schedule} onCreateInvite={onCreateInvite} />
      </section>
    </div>
  );

  const Carts = () => (
    <div className="mx-auto max-w-6xl space-y-6 px-4">
      <h2 className="text-xl font-semibold">Your carts</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4">
          <h3 className="font-semibold">Normal cart</h3>
          <p className="mt-1 text-sm text-gray-600">Private to you. Ideal for quick checkouts.</p>
          <button onClick={() => setRoute('products')} className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">Go to products</button>
        </div>
        <div className="rounded-2xl border bg-white p-4">
          <h3 className="font-semibold">Group carts</h3>
          <p className="mt-1 text-sm text-gray-600">Invite friends to add items and split the bill.</p>
          <button onClick={() => setRoute('products')} className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">Create a group cart</button>
        </div>
      </div>
    </div>
  );

  const Auth = () => (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold">Welcome to Velvet</h2>
      <p className="text-sm text-gray-600">Sign in to save carts, invite friends, and complete real checkouts.</p>
      <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Email"/>
      <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Password" type="password"/>
      <button className="w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white">Continue</button>
      <p className="text-center text-xs text-gray-500">Social login coming soon.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar onNavigate={setRoute} />
      <main className="mx-auto mt-6 max-w-6xl space-y-10 px-4 pb-16">
        {route === 'home' && <Home />}
        {route === 'products' && <Products />}
        {route === 'carts' && <Carts />}
        {route === 'auth' && <Auth />}
      </main>
      <footer className="border-t py-8 text-center text-xs text-gray-500">© {new Date().getFullYear()} Velvet — Social shopping and split payments.</footer>
    </div>
  );
}
