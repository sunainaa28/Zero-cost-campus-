
export enum Category {
  DESIGN = 'Design',
  CODING = 'Coding',
  STUDY = 'Study',
  MEDIA = 'Media',
  PRODUCTIVITY = 'Productivity',
  ENGINEERING = 'Engineering',
  SECURITY = 'Security'
}

export enum Platform {
  WEB = 'Web',
  WINDOWS = 'Windows',
  MACOS = 'macOS',
  LINUX = 'Linux',
  ANDROID = 'Android',
  IOS = 'iOS'
}

export interface Tool {
  id: string;
  name: string;
  category: Category;
  description: string;
  features: string[];
  pricingModel: string;
  officialLink: string;
  offlineAvailable: boolean;
  platforms: Platform[];
  pros: string[];
  cons: string[];
  rating: number;
  popular: boolean;
  paidAlternativeTo?: string;
  imageUrl?: string;
}

export interface StarterPack {
  id: string;
  title: string;
  description: string;
  role: string;
  toolIds: string[];
  icon: string;
}

export interface UserRole {
  isAdmin: boolean;
}
