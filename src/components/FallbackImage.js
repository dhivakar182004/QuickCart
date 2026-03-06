'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function FallbackImage({ src, alt, ...props }) {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={alt}
            onError={() => {
                setImgSrc('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000'); // Default fallback
            }}
        />
    );
}
