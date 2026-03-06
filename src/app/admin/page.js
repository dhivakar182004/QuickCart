import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect('/');
    }

    const [shoes] = await pool.query('SELECT * FROM shoes ORDER BY created_at DESC');

    return (
        <main className="main">
            <div className="blob blob1"></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="title" style={{ fontSize: '2.5rem', margin: 0 }}>Admin Dashboard</h1>
                <Link
                    href="/admin/add"
                    className="buyButton"
                    style={{ textDecoration: 'none' }}
                >
                    Add New Shoe
                </Link>
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 500 }}>ID</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 500 }}>Image</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 500 }}>Brand</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 500 }}>Name</th>
                            <th style={{ padding: '1rem', color: '#94a3b8', fontWeight: 500 }}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shoes.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No shoes found.</td>
                            </tr>
                        ) : shoes.map((shoe) => (
                            <tr key={shoe.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1rem', color: '#94a3b8' }}>#{shoe.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <img src={shoe.image_url} alt={shoe.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td style={{ padding: '1rem', color: '#60a5fa' }}>{shoe.brand}</td>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{shoe.name}</td>
                                <td style={{ padding: '1rem' }}>${parseFloat(shoe.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
