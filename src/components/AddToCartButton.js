'use client';

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ shoe }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(shoe)}
            className="buyButton"
        >
            Add to Cart
        </button>
    );
}
