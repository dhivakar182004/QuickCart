import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const { name, brand, price, description, image_url } = await req.json();

        if (!name || !brand || !price || !image_url) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const insertQuery = `
      INSERT INTO shoes (name, brand, price, description, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;

        await pool.query(insertQuery, [name, brand, price, description || null, image_url]);

        return NextResponse.json({ message: 'Shoe added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Failed to add shoe:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
