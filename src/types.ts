export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  date?: string;
  rotation?: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  badge: string;
  isRedeemed: boolean;
}

export interface DinnerInvitation {
  guestName: string;
  eventTitle: string;
  location: string;
  time: string;
  dressCode: string;
  specialNote: string;
}

export interface BirthdayConfig {
  petNickname: string;
  boyfriendName: string;
  senderName: string;
  letterHeading: string;
  letterContent: string[];
  dinner: DinnerInvitation;
  memories: MemoryItem[];
  coupons: LoveCoupon[];
}

export type SurpriseScreen = 
  | 'welcome'           // Screen 1: Happy Birthday My Kuchu Puchu
  | 'gift-intro'        // Screen 2: I have a surprise... but
  | 'love-question'     // Screen 3: Do You Love Me? YES / NO
  | 'gun-warning'       // Screen 4: How Dare You! Meme cat with gun
  | 'love-confirmed'    // Screen 5: Thanks! I knew it!
  | 'surprises-hub'     // Screen 6: 3 Little Surprises hub
  | 'read-me'           // Screen 7: Hugging you through phone letter
  | 'fav-memories'      // Screen 8: Polaroid memory album
  | 'dinner-ticket'     // Screen 9: Dinner ticket invitation + coupons
  | 'cake-blow'         // Interactive: Blow candle & Cut cake
  | 'final-love';       // Screen 10: BABYYYYYYYYYY shouting cat & finale
