export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  prime: boolean;
}

export const products = {
  Electronics: [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      rating: 4.5,
      reviews: 2547,
      description: 'High-quality wireless headphones with noise cancellation',
      category: 'Electronics',
      prime: true
    },
    {
      id: 2,
      name: 'Smart Watch Series X',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      rating: 4.7,
      reviews: 1823,
      description: 'Latest smartwatch with health tracking features',
      category: 'Electronics',
      prime: true
    },
    {
      id: 3,
      name: 'Professional Camera Kit',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
      rating: 4.8,
      reviews: 956,
      description: 'Professional DSLR camera with multiple lenses',
      category: 'Electronics',
      prime: true
    },
    {
      id: 4,
      name: '4K Smart TV 65"',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80',
      rating: 4.6,
      reviews: 1523,
      description: 'Ultra HD Smart TV with HDR',
      category: 'Electronics',
      prime: true
    },
    {
      id: 5,
      name: 'Gaming Laptop Pro',
      price: 1499.99,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
      rating: 4.7,
      reviews: 892,
      description: 'High-performance gaming laptop with RGB keyboard',
      category: 'Electronics',
      prime: true
    },
    {
      id: 6,
      name: 'Wireless Gaming Mouse',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
      rating: 4.4,
      reviews: 2156,
      description: 'Ergonomic gaming mouse with customizable buttons',
      category: 'Electronics',
      prime: true
    },
    {
      id: 7,
      name: 'Smart Home Security Camera',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80',
      rating: 4.3,
      reviews: 1678,
      description: 'HD security camera with night vision and motion detection',
      category: 'Electronics',
      prime: true
    },
    {
      id: 8,
      name: 'Portable Power Bank',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1609592424857-26a1dd1c5209?w=500&q=80',
      rating: 4.5,
      reviews: 3421,
      description: '20000mAh power bank with fast charging',
      category: 'Electronics',
      prime: true
    },
    {
      id: 9,
      name: 'Wireless Earbuds Pro',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
      rating: 4.6,
      reviews: 2789,
      description: 'True wireless earbuds with active noise cancellation',
      category: 'Electronics',
      prime: true
    },
    {
      id: 10,
      name: 'Smart Robot Vacuum',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1589942181144-a092c2406240?w=500&q=80',
      rating: 4.4,
      reviews: 1456,
      description: 'Automated vacuum cleaner with smart mapping',
      category: 'Electronics',
      prime: true
    }
  ],
  Fashion: [
    {
      id: 11,
      name: 'Designer Sunglasses',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      rating: 4.3,
      reviews: 1247,
      description: 'Stylish designer sunglasses with UV protection',
      category: 'Fashion',
      prime: true
    },
    {
      id: 12,
      name: 'Luxury Watch Collection',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80',
      rating: 4.6,
      reviews: 789,
      description: 'Elegant luxury watch with premium build quality',
      category: 'Fashion',
      prime: true
    },
    {
      id: 13,
      name: 'Premium Leather Bag',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',
      rating: 4.4,
      reviews: 567,
      description: 'Handcrafted leather bag',
      category: 'Fashion',
      prime: true
    },
    {
      id: 14,
      name: 'Designer Sneakers',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
      rating: 4.5,
      reviews: 1823,
      description: 'Premium comfort sneakers for everyday wear',
      category: 'Fashion',
      prime: true
    },
    {
      id: 15,
      name: 'Cashmere Scarf',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
      rating: 4.7,
      reviews: 456,
      description: 'Soft and warm cashmere scarf',
      category: 'Fashion',
      prime: true
    },
    {
      id: 16,
      name: 'Leather Wallet',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80',
      rating: 4.3,
      reviews: 892,
      description: 'Genuine leather wallet with RFID protection',
      category: 'Fashion',
      prime: false
    },
    {
      id: 17,
      name: 'Designer Belt',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
      rating: 4.4,
      reviews: 567,
      description: 'Premium leather belt with designer buckle',
      category: 'Fashion',
      prime: true
    },
    {
      id: 18,
      name: 'Silk Tie Collection',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=500&q=80',
      rating: 4.6,
      reviews: 345,
      description: 'Set of premium silk ties',
      category: 'Fashion',
      prime: true
    },
    {
      id: 19,
      name: 'Designer Backpack',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a45?w=500&q=80',
      rating: 4.5,
      reviews: 678,
      description: 'Stylish and practical designer backpack',
      category: 'Fashion',
      prime: true
    },
    {
      id: 20,
      name: 'Premium Watch Box',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=500&q=80',
      rating: 4.8,
      reviews: 234,
      description: 'Luxury watch storage and display case',
      category: 'Fashion',
      prime: true
    }
  ],
  Books: [
    {
      id: 21,
      name: 'The Art of Programming',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80',
      rating: 4.8,
      reviews: 2341,
      description: 'Comprehensive guide to programming',
      category: 'Books',
      prime: true
    },
    {
      id: 22,
      name: 'Business Strategy Guide',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
      rating: 4.5,
      reviews: 892,
      description: 'Modern business strategies',
      category: 'Books',
      prime: true
    },
    {
      id: 23,
      name: 'Creative Writing Masterclass',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
      rating: 4.6,
      reviews: 567,
      description: 'Guide to improving writing skills',
      category: 'Books',
      prime: true
    },
    {
      id: 24,
      name: 'World History Collection',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
      rating: 4.7,
      reviews: 1234,
      description: 'Comprehensive world history series',
      category: 'Books',
      prime: true
    },
    {
      id: 25,
      name: 'Cooking Masterclass',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
      rating: 4.4,
      reviews: 789,
      description: 'Professional cooking techniques',
      category: 'Books',
      prime: true
    },
    {
      id: 26,
      name: 'Financial Planning Guide',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1554495439-f7d68cea0c49?w=500&q=80',
      rating: 4.5,
      reviews: 567,
      description: 'Personal finance and investment strategies',
      category: 'Books',
      prime: true
    },
    {
      id: 27,
      name: 'Science Fiction Collection',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
      rating: 4.8,
      reviews: 1567,
      description: 'Best sci-fi novels collection',
      category: 'Books',
      prime: true
    },
    {
      id: 28,
      name: 'Self-Development Guide',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
      rating: 4.6,
      reviews: 2345,
      description: 'Personal growth and development',
      category: 'Books',
      prime: true
    },
    {
      id: 29,
      name: 'Art History Encyclopedia',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&q=80',
      rating: 4.7,
      reviews: 456,
      description: 'Comprehensive art history guide',
      category: 'Books',
      prime: true
    },
    {
      id: 30,
      name: 'Photography Guide',
      price: 44.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80',
      rating: 4.5,
      reviews: 789,
      description: 'Professional photography techniques',
      category: 'Books',
      prime: true
    }
  ],
  Sports: [
    {
      id: 31,
      name: 'Professional Tennis Racket',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be2?w=500&q=80',
      rating: 4.7,
      reviews: 456,
      description: 'Professional grade tennis racket',
      category: 'Sports',
      prime: true
    },
    {
      id: 32,
      name: 'Smart Fitness Tracker',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1557166983-5939644443f5?w=500&q=80',
      rating: 4.6,
      reviews: 1234,
      description: 'Advanced fitness tracking',
      category: 'Sports',
      prime: true
    },
    {
      id: 33,
      name: 'Premium Yoga Mat',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
      rating: 4.5,
      reviews: 789,
      description: 'Non-slip professional yoga mat',
      category: 'Sports',
      prime: true
    },
    {
      id: 34,
      name: 'Basketball Pro',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&q=80',
      rating: 4.4,
      reviews: 567,
      description: 'Official size basketball',
      category: 'Sports',
      prime: true
    },
    {
      id: 35,
      name: 'Cycling Helmet',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1557166983-5939644443f5?w=500&q=80',
      rating: 4.8,
      reviews: 345,
      description: 'Safety certified cycling helmet',
      category: 'Sports',
      prime: true
    },
    {
      id: 36,
      name: 'Running Shoes Elite',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      rating: 4.7,
      reviews: 1234,
      description: 'Professional running shoes',
      category: 'Sports',
      prime: true
    },
    {
      id: 37,
      name: 'Gym Dumbbell Set',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80',
      rating: 4.6,
      reviews: 890,
      description: 'Adjustable weight dumbbell set',
      category: 'Sports',
      prime: true
    },
    {
      id: 38,
      name: 'Soccer Ball Pro',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=500&q=80',
      rating: 4.5,
      reviews: 678,
      description: 'Professional soccer ball',
      category: 'Sports',
      prime: true
    },
    {
      id: 39,
      name: 'Swimming Goggles',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1557166983-5939644443f5?w=500&q=80',
      rating: 4.4,
      reviews: 456,
      description: 'Anti-fog swimming goggles',
      category: 'Sports',
      prime: true
    },
    {
      id: 40,
      name: 'Sports Water Bottle',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1557166983-5939644443f5?w=500&q=80',
      rating: 4.3,
      reviews: 789,
      description: 'Insulated sports water bottle',
      category: 'Sports',
      prime: true
    }
  ]
};