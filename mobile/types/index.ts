// Item swapping app data types

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  location: {
    city: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  maxDistance: number; // in kilometers
  createdAt: Date;
  lastActive: Date;
  isVerified: boolean;
  rating: number;
  totalSwaps: number;
}

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  photos: string[];
  condition: ItemCondition;
  distance: number; // distance from current user in km
  ownerId: string;
  owner: User;
  createdAt: Date;
  isAvailable: boolean;
  tags: string[];
  estimatedValue?: number;
  brand?: string;
  model?: string;
  year?: number;
}

export enum ItemCategory {
  GAMING = 'gaming',
  ELECTRONICS = 'electronics',
  COLLECTIBLES = 'collectibles',
  ACCESSORIES = 'accessories',
  BOOKS = 'books',
  CLOTHING = 'clothing',
  SPORTS = 'sports',
  OTHER = 'other'
}

export enum ItemCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor'
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  user1ItemId: string;
  user2ItemId: string;
  user1Item: Item;
  user2Item: Item;
  createdAt: Date;
  lastMessageAt: Date;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  createdAt: Date;
  isRead: boolean;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  LOCATION = 'location',
  SYSTEM = 'system'
}

export interface SwipeAction {
  userId: string;
  itemId: string;
  action: SwipeDirection;
  timestamp: Date;
}

export interface UserProfileCreation {
  displayName: string;
  selectedCategories: string[];
  distancePreference: number; // in kilometers
  swapRadius: number; // in kilometers
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    country?: string;
  };
}



export enum SwipeDirection {
  LEFT = 'left',    // Pass/Nope
  RIGHT = 'right',  // Like/Want to swap
  UP = 'up',        // Super Like
  DOWN = 'down'     // Dislike/Block
}

export interface UserPreferences {
  userId: string;
  categories: ItemCategory[];
  maxDistance: number;
  swapRadius: number; // How far user will travel for swaps
  minCondition: ItemCondition;
  ageRange?: {
    min: number;
    max: number;
  };
  notifications: {
    matches: boolean;
    messages: boolean;
    newItems: boolean;
    nearbyUsers: boolean;
  };
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ar';
  hapticFeedback: boolean;
  soundEffects: boolean;
  autoPlayVideos: boolean;
}

// Mock data types for development
export interface MockItem extends Omit<Item, 'owner' | 'distance'> {
  distance: number;
  mockOwner: {
    username: string;
    avatar?: string;
    rating: number;
  };
} 