'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, User, LogOut, Shield } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
    const { cartItemCount, setIsCartOpen } = useCart();
    const { data: session } = useSession();

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 30, backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.025em' }}>
                Kicks<span style={{ color: '#3b82f6' }}>Drop</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {session ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                        {session.user.role === 'admin' && (
                            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', textDecoration: 'none' }}>
                                <Shield size={16} /> Admin
                            </Link>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <User size={16} /> {session.user.name}
                        </span>
                        <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}>
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <Link href="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                        Sign In
                    </Link>
                )}

                <button
                    onClick={() => setIsCartOpen(true)}
                    style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                >
                    <ShoppingBag size={24} />
                    {cartItemCount > 0 && (
                        <span style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(25%, -25%)' }}>
                            {cartItemCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}
