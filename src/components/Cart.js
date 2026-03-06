'use client';

import { useCart } from '@/context/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import FallbackImage from './FallbackImage';

export default function CartSidebar() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                onClick={() => setIsCartOpen(false)}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
            />
            <div
                className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#0f172a] border-l border-white/10 shadow-2xl z-50 flex flex-col transform transition-transform duration-300"
                style={{ position: 'fixed', top: 0, bottom: 0, right: 0, width: '400px', backgroundColor: '#0f172a', borderLeft: '1px solid rgba(255,255,255,0.1)', zIndex: 50, display: 'flex', flexDirection: 'column', maxWidth: '100vw' }}
            >
                <div className="p-4 border-b border-white/10 flex justify-between items-center" style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ShoppingBag size={20} className="text-blue-500" style={{ color: '#3b82f6' }} />
                        <h2 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', margin: 0 }}>Your Cart</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                        style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', padding: '0.25rem' }}
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
                            <ShoppingBag size={48} className="mb-4 opacity-50" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Your cart is empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 text-blue-500 hover:text-blue-400 underline"
                                style={{ marginTop: '1rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="space-y-4" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map((item) => (
                                <li key={item.id} className="flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5" style={{ display: 'flex', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div className="h-20 w-20 relative rounded-md overflow-hidden bg-white shrink-0" style={{ height: '5rem', width: '5rem', position: 'relative', borderRadius: '0.375rem', overflow: 'hidden', backgroundColor: 'white', flexShrink: 0 }}>
                                        <FallbackImage src={item.image_url} alt={item.name} fill className="object-cover" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="flex flex-col flex-1" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div className="flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <h3 className="text-white font-medium text-sm leading-tight" style={{ color: 'white', fontWeight: 500, fontSize: '0.875rem', margin: 0, lineHeight: 1.2 }}>{item.name}</h3>
                                                <p className="text-blue-400 text-xs mt-1" style={{ color: '#60a5fa', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>{item.brand}</p>
                                            </div>
                                            <span className="text-white font-bold" style={{ color: 'white', fontWeight: 'bold' }}>${parseFloat(item.price).toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem' }}>
                                            <div className="flex items-center bg-black/30 rounded-lg p-1" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', padding: '0.25rem' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="text-white hover:bg-white/10 p-1 rounded transition-colors"
                                                    style={{ color: 'white', background: 'none', border: 'none', padding: '0.25rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-white w-6 text-center text-sm" style={{ color: 'white', width: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="text-white hover:bg-white/10 p-1 rounded transition-colors"
                                                    style={{ color: 'white', background: 'none', border: 'none', padding: '0.25rem', borderRadius: '0.25rem', cursor: 'pointer' }}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-300 p-1 transition-colors"
                                                style={{ color: '#f87171', background: 'none', border: 'none', padding: '0.25rem', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-4 border-t border-white/10 bg-black/20" style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <div className="flex justify-between items-center mb-4 text-white" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: 'white' }}>
                            <span className="font-medium" style={{ fontWeight: 500 }}>Subtotal</span>
                            <span className="font-bold text-xl" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={async () => {
                                try {
                                    const res = await fetch('/api/checkout', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ items: cart })
                                    });
                                    const data = await res.json();
                                    if (data.url) {
                                        window.location.href = data.url;
                                    }
                                } catch (err) {
                                    console.error('Checkout failed', err);
                                    alert('Checkout service unavailable');
                                }
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20"
                            style={{ width: '100%', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 15px -3px rgba(37,99,235,0.2)' }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
