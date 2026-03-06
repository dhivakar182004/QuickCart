import pool from './db.js';

export async function initializeDatabase() {
    try {
        // Attempting to create a generic table for shoes
        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS shoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        await pool.query(createTableQuery);

        const createUsersQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        await pool.query(createUsersQuery);

        // Initial check to see if database is populated
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM shoes');

        if (rows[0].count === 0) {
            console.log('Database empty, inserting initial shoe data...');

            const insertQuery = `
        INSERT INTO shoes (name, brand, price, description, image_url)
        VALUES 
        ('Air Max 90', 'Nike', 129.99, 'Classic silhouette with iconic Air cushioning.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'),
        ('Ultraboost 22', 'Adidas', 189.99, 'Premium running shoe with responsive boost midsole.', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=1000'),
        ('Classic Leather', 'Reebok', 85.00, 'Timeless sneaker made with soft garment leather.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=1000'),
        ('Gel-Kayano 29', 'ASICS', 160.00, 'Structured cushioning shoe perfect for long distance runs.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000')
      `;

            await pool.query(insertQuery);
            console.log('Initial shoe data inserted successfully.');
        } else {
            console.log('Database already populated.');
        }
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
}
