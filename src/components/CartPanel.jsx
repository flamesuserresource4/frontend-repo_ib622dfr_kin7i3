import React from 'react';
import { CreditCard, Wallet, Calendar, Users2, Link2 } from 'lucide-react';

export default function CartPanel({ items, mode, onRemove, onUpdateQty, onSchedule, schedule, onCreateInvite }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <aside className="w-full rounded-2xl border bg-white p-4 md:w-96">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{mode === 'group' ? 'Group Cart' : 'Your Cart'}</h3>
        {mode === 'group' && (
          <button onClick={onCreateInvite} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium hover:bg-gray-50">
            <Link2 className="h-3 w-3"/> Invite link
          </button>
        )}
      </div>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-500">No items yet. Add products to start.</p>}
        {items.map(it => (
          <div key={it.id} className="flex items-center gap-3 rounded-lg border p-2">
            <img src={it.image} alt={it.name} className="h-14 w-14 rounded object-cover"/>
            <div className="flex-1">
              <p className="text-sm font-medium">{it.name}</p>
              <p className="text-xs text-gray-500">₹{(it.price/100).toFixed(2)}</p>
              <div className="mt-1 inline-flex items-center rounded-full border">
                <button className="px-2 text-sm" onClick={() => onUpdateQty(it.id, Math.max(1, it.qty-1))}>-</button>
                <span className="border-x px-3 text-sm">{it.qty}</span>
                <button className="px-2 text-sm" onClick={() => onUpdateQty(it.id, it.qty+1)}>+</button>
              </div>
            </div>
            <button className="text-xs text-red-600" onClick={() => onRemove(it.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-semibold">₹{(subtotal/100).toFixed(2)}</span>
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Calendar className="h-4 w-4"/> Delivery schedule</div>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="w-full rounded border px-2 py-1 text-sm" value={schedule.date} onChange={(e) => onSchedule({ ...schedule, date: e.target.value })} />
            <input type="time" className="w-full rounded border px-2 py-1 text-sm" value={schedule.time} onChange={(e) => onSchedule({ ...schedule, time: e.target.value })} />
          </div>
          <p className="mt-2 text-xs text-gray-500">Select a slot at least 3 days from now.</p>
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Users2 className="h-4 w-4"/> Split payment</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="flex items-center justify-center gap-1 rounded bg-gray-900 px-3 py-2 font-medium text-white hover:bg-black"><CreditCard className="h-4 w-4"/> Card/UPI</button>
            <button className="flex items-center justify-center gap-1 rounded border px-3 py-2 font-medium"><Wallet className="h-4 w-4"/> Cash</button>
          </div>
          <p className="mt-2 text-xs text-gray-500">Pay with two different methods in one checkout.</p>
        </div>
        <button className="mt-2 w-full rounded-lg bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-black">Continue to checkout</button>
      </div>
    </aside>
  );
}
