import pool from '@/lib/db';
import FallbackImage from '@/components/FallbackImage';
import { initializeDatabase } from '@/lib/init-db';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic'; // Ensure we always fetch fresh data

export default async function Home() {
  let shoes = [];
  let dbError = null;

  try {
    // Attempt to initialize database on first load if we have connection details
    if (process.env.DB_HOST && process.env.DB_USER) {
      await initializeDatabase();
    }

    const [rows] = await pool.query('SELECT * FROM shoes ORDER BY created_at DESC');
    shoes = rows;
  } catch (error) {
    console.error('Database connection error:', error);
    dbError = error.message;
  }

  return (
    <main className="main">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <header className="header">
        <h1 className="title">Kicks Drop</h1>
        <p className="subtitle">Discover the latest premium footwear curated just for you.</p>
        {dbError && (
          <div style={{ color: '#ef4444', marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
            Database Error: Ensure your `.env.local` is configured correctly.
          </div>
        )}
      </header>

      {shoes.length > 0 ? (
        <div className="grid">
          {shoes.map((shoe) => (
            <div key={shoe.id} className="card">
              <div className="imageContainer">
                <FallbackImage
                  src={shoe.image_url}
                  alt={shoe.name}
                  fill
                  className="image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="content">
                <span className="brand">{shoe.brand}</span>
                <h2 className="name">{shoe.name}</h2>
                <div className="priceRow">
                  <span className="price">${parseFloat(shoe.price).toFixed(2)}</span>
                  <AddToCartButton shoe={shoe} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !dbError ? (
        <div className="emptyState">
          <h2>No shoes found</h2>
          <p>The catalog is currently empty. Check back later to see our new drops.</p>
        </div>
      ) : null}
    </main>
  );
}
