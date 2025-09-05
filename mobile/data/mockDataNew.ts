import { ItemCategory, ItemCondition, MockItem } from '../types';

// Helper function to generate mock owners
const createMockOwner = (username: string, rating: number) => ({
  username,
  avatar: `https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=${username.charAt(0).toUpperCase()}`,
  rating
});

export const mockItems: MockItem[] = [
  {
    id: '1',
    name: 'FIFA 26 PS5',
    category: ItemCategory.GAMING,
    description: 'Brand new FIFA 26 for PlayStation 5. Still sealed in original packaging.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.NEW,
    distance: 2.5,
    ownerId: 'user1',
    createdAt: new Date('2024-01-15'),
    isAvailable: true,
    tags: ['fifa', 'ps5', 'football', 'sports'],
    estimatedValue: 70,
    brand: 'EA Sports',
    year: 2024,
    mockOwner: createMockOwner('gamer123', 4.8)
  },
  {
    id: '2',
    name: 'GTA 6 Xbox Series X',
    category: ItemCategory.GAMING,
    description: 'GTA 6 for Xbox Series X. Excellent condition, barely played.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.EXCELLENT,
    distance: 5.2,
    ownerId: 'user2',
    createdAt: new Date('2024-01-10'),
    isAvailable: true,
    tags: ['gta', 'xbox', 'action', 'open-world'],
    estimatedValue: 65,
    brand: 'Rockstar Games',
    year: 2024,
    mockOwner: createMockOwner('xbox_lover', 4.6)
  },
  {
    id: '3',
    name: 'iPhone 15 Pro',
    category: ItemCategory.ELECTRONICS,
    description: 'iPhone 15 Pro 128GB. Like new condition, comes with original box and accessories.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.LIKE_NEW,
    distance: 1.8,
    ownerId: 'user3',
    createdAt: new Date('2024-01-08'),
    isAvailable: true,
    tags: ['iphone', 'smartphone', 'apple', 'mobile'],
    estimatedValue: 950,
    brand: 'Apple',
    year: 2024,
    mockOwner: createMockOwner('tech_geek', 4.9)
  },
  {
    id: '4',
    name: 'PS5 DualSense Controller',
    category: ItemCategory.ACCESSORIES,
    description: 'White PS5 controller. Good condition, works perfectly.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.GOOD,
    distance: 3.7,
    ownerId: 'user4',
    createdAt: new Date('2024-01-12'),
    isAvailable: true,
    tags: ['ps5', 'controller', 'gaming', 'accessory'],
    estimatedValue: 45,
    brand: 'Sony',
    year: 2023,
    mockOwner: createMockOwner('ps5_master', 4.7)
  },
  {
    id: '5',
    name: 'Nike Air Jordan 1 Retro',
    category: ItemCategory.CLOTHING,
    description: 'Air Jordan 1 Retro High OG. Size 10, excellent condition.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.EXCELLENT,
    distance: 4.1,
    ownerId: 'user5',
    createdAt: new Date('2024-01-05'),
    isAvailable: true,
    tags: ['nike', 'jordan', 'sneakers', 'shoes'],
    estimatedValue: 180,
    brand: 'Nike',
    year: 2023,
    mockOwner: createMockOwner('sneaker_head', 4.5)
  },
  {
    id: '6',
    name: 'MacBook Air M2',
    category: ItemCategory.ELECTRONICS,
    description: 'MacBook Air with M2 chip. 8GB RAM, 256GB SSD. Very good condition.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.GOOD,
    distance: 6.8,
    ownerId: 'user6',
    createdAt: new Date('2024-01-03'),
    isAvailable: true,
    tags: ['macbook', 'laptop', 'apple', 'computer'],
    estimatedValue: 1200,
    brand: 'Apple',
    year: 2023,
    mockOwner: createMockOwner('mac_user', 4.8)
  },
  {
    id: '7',
    name: 'Pokemon Cards Collection',
    category: ItemCategory.COLLECTIBLES,
    description: 'Rare Pokemon cards collection. Includes Charizard, Pikachu, and more.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.EXCELLENT,
    distance: 2.9,
    ownerId: 'user7',
    createdAt: new Date('2024-01-14'),
    isAvailable: true,
    tags: ['pokemon', 'cards', 'collectible', 'gaming'],
    estimatedValue: 300,
    brand: 'Pokemon Company',
    year: 2023,
    mockOwner: createMockOwner('pokemon_master', 4.7)
  },
  {
    id: '8',
    name: 'Sony WH-1000XM4 Headphones',
    category: ItemCategory.ACCESSORIES,
    description: 'Noise-cancelling wireless headphones. Excellent condition with original case.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.EXCELLENT,
    distance: 1.2,
    ownerId: 'user8',
    createdAt: new Date('2024-01-16'),
    isAvailable: true,
    tags: ['sony', 'headphones', 'wireless', 'noise-cancelling'],
    estimatedValue: 280,
    brand: 'Sony',
    year: 2022,
    mockOwner: createMockOwner('audio_phile', 4.9)
  },
  {
    id: '9',
    name: 'Call of Duty: Modern Warfare 3',
    category: ItemCategory.GAMING,
    description: 'COD MW3 for PS5. Good condition, includes all DLC.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.GOOD,
    distance: 7.5,
    ownerId: 'user9',
    createdAt: new Date('2024-01-07'),
    isAvailable: true,
    tags: ['cod', 'ps5', 'fps', 'shooter'],
    estimatedValue: 55,
    brand: 'Activision',
    year: 2023,
    mockOwner: createMockOwner('fps_gamer', 4.6)
  },
  {
    id: '10',
    name: 'Supreme Box Logo Hoodie',
    category: ItemCategory.CLOTHING,
    description: 'Supreme Box Logo Hoodie. Size L, black color. Fair condition.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.FAIR,
    distance: 4.6,
    ownerId: 'user10',
    createdAt: new Date('2024-01-11'),
    isAvailable: true,
    tags: ['supreme', 'hoodie', 'streetwear', 'fashion'],
    estimatedValue: 150,
    brand: 'Supreme',
    year: 2022,
    mockOwner: createMockOwner('streetwear_fan', 4.4)
  },
  {
    id: '11',
    name: 'Nintendo Switch OLED',
    category: ItemCategory.GAMING,
    description: 'Nintendo Switch OLED model. White color, excellent condition with games.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.EXCELLENT,
    distance: 3.2,
    ownerId: 'user11',
    createdAt: new Date('2024-01-09'),
    isAvailable: true,
    tags: ['nintendo', 'switch', 'gaming', 'console'],
    estimatedValue: 320,
    brand: 'Nintendo',
    year: 2023,
    mockOwner: createMockOwner('nintendo_fan', 4.8)
  },
  {
    id: '12',
    name: 'Yeezy Boost 350 V2',
    category: ItemCategory.CLOTHING,
    description: 'Yeezy Boost 350 V2 Zebra. Size 9, good condition.',
    photos: ['../assets/images/placeholder.jpg'],
    condition: ItemCondition.GOOD,
    distance: 5.9,
    ownerId: 'user12',
    createdAt: new Date('2024-01-13'),
    isAvailable: true,
    tags: ['yeezy', 'adidas', 'sneakers', 'boost'],
    estimatedValue: 220,
    brand: 'Adidas',
    year: 2022,
    mockOwner: createMockOwner('yeezy_lover', 4.5)
  }
];

export const mockUsers = [
  {
    id: 'user1',
    username: 'gamer123',
    displayName: 'Alex',
    rating: 4.8,
    totalSwaps: 15
  },
  {
    id: 'user2',
    username: 'xbox_lover',
    displayName: 'Sam',
    rating: 4.6,
    totalSwaps: 8
  },
  {
    id: 'user3',
    username: 'tech_geek',
    displayName: 'Jordan',
    rating: 4.9,
    totalSwaps: 22
  },
  {
    id: 'user4',
    username: 'ps5_master',
    displayName: 'Mike',
    rating: 4.7,
    totalSwaps: 12
  },
  {
    id: 'user5',
    username: 'sneaker_head',
    displayName: 'Chris',
    rating: 4.5,
    totalSwaps: 18
  }
];

// Helper function to get random items
export const getRandomItems = (count: number): MockItem[] => {
  const shuffled = [...mockItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get items by category
export const getItemsByCategory = (category: ItemCategory): MockItem[] => {
  return mockItems.filter(item => item.category === category);
};

// Helper function to get items within distance
export const getItemsWithinDistance = (maxDistance: number): MockItem[] => {
  return mockItems.filter(item => item.distance <= maxDistance);
}; 