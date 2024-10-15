// app/components/BookCard.tsx

import React from 'react';

interface BookCardProps {
    title: string;
    price: string;
    image_url: string;
    category: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, price, image_url, category }) => {
    return (
        <div className="bg-gray-900 hover:scale-105 hover:cursor-pointer hover:shadow-lg transition-all duration-200 ease-linear hover:shadow-blue-600 rounded-lg shadow-md overflow-hidden p-4 shadow-blue-700">
            <img src={image_url} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2 text-center">
                <h3 className="text-lg text-gray-300 font-semibold">{title}</h3>
                <p className="text-white font-bold text-3xl  ">{price}</p>
                <p className="text-md text-gray-300">{category}</p>
            </div>
        </div>
    );
};

export default BookCard;

