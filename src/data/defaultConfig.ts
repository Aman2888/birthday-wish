import { BirthdayConfig } from '../types';

export const REASONS_WHY_I_LOVE_YOU = [
  { id: '1', emoji: '🥰', title: 'Your Warm Hugs', text: 'How you pull me close and suddenly the whole world feels safe and peaceful.' },
  { id: '2', emoji: '🍕', title: 'Food Partner in Crime', text: 'You never judge how much I eat and you always let me have the last delicious bite.' },
  { id: '3', emoji: '🥺', title: 'Your Cute Laugh', text: 'That adorable genuine laugh you make when I say something silly or annoying.' },
  { id: '4', emoji: '🛡️', title: 'My Safe Place', text: 'On my worst, most stressful days, just hearing your voice calms my entire soul down.' },
  { id: '5', emoji: '👑', title: 'How Special You Make Me Feel', text: 'You look at me like I am the only girl in the entire room, always.' },
  { id: '6', emoji: '😜', title: 'Tolerating My Drama', text: 'You handle all my sudden mood swings and dramatic tantrums like an absolute champion.' },
  { id: '7', emoji: '🌙', title: 'Late Night Talks', text: 'Talking about everything and nothing until our eyes can barely stay open at 3 AM.' },
  { id: '8', emoji: '✨', title: 'Your Big Heart', text: 'How genuinely caring, hardworking, and gentle you are with the people you love.' }
];

export const DEFAULT_CONFIG: BirthdayConfig = {
  petNickname: 'MY KUCHU PUCHU!',
  boyfriendName: 'David',
  senderName: 'Your Love',
  letterHeading: 'HUGGING YOU Through My Phone',
  letterContent: [
    'Happy Birthday to my favorite human in the entire universe! 🎂✨',
    'Even though we might have distance or a phone screen between us right now, every single beat of my heart is celebrating you today.',
    'Thank you for being my constant smile, my warm safe place, my best friend, and the cutest person alive. You make ordinary days feel like pure magic.',
    'I wish I could be right there next to you to give you the biggest, tightest hug, feed you cake, steal your hoodie, and celebrate your special day properly.',
    'Until then, here is this little universe made with love, laughter, and a thousand warm kisses just for you! Always yours. ❤️'
  ],
  dinner: {
    guestName: 'David',
    eventTitle: 'David Birthday Dinner',
    location: 'Silver Spoon',
    time: '8:30 PM',
    dressCode: 'Navy Blue',
    specialNote: 'Table reserved for two with candlelight, sweet desserts, and unlimited smiles ✨'
  },
  memories: [
    {
      id: 'mem-1',
      title: 'When we first met',
      caption: 'The moment my world suddenly became a hundred times brighter, warmer, and cuter. ✨',
      imageUrl: '/src/assets/images/cute_cats_cuddle_1792993737764.jpg',
      date: 'Our Day One',
      rotation: '-rotate-2'
    },
    {
      id: 'mem-2',
      title: 'Our Late Night Talks',
      caption: 'Laughing at 2 AM over nothing and falling in love with your voice over and over again. 🌙',
      imageUrl: '/src/assets/images/cute_bears_hugging_1792993739765.jpg',
      date: 'Endless Whispers',
      rotation: 'rotate-3'
    },
    {
      id: 'mem-3',
      title: 'That Cute Smile of Yours',
      caption: 'Warning: Looking at this boy causes extreme heart-fluttering and unconditional adoration! 💕',
      imageUrl: '/src/assets/images/cat_birthday_cake_roses_1792993741439.jpg',
      date: 'Every Single Day',
      rotation: '-rotate-1'
    },
    {
      id: 'mem-4',
      title: 'Always By Your Side',
      caption: 'No matter where life takes us, you will always be my home, my peace, and my favorite adventure. 🌸',
      imageUrl: '/src/assets/images/screaming_cat_baby_1792993741092.jpg',
      date: 'Forever & Always',
      rotation: 'rotate-2'
    }
  ],
  coupons: [
    {
      id: 'cpn-1',
      title: 'Free 30-Min Massage',
      description: 'Redeem anytime for a relaxing back & shoulder massage with scented lotion!',
      badge: '💆‍♂️ RELAX PASS',
      isRedeemed: false
    },
    {
      id: 'cpn-2',
      title: 'Movie Night - Your Pick',
      description: 'You get to pick any movie without any complaints, plus homemade popcorn!',
      badge: '🎬 CINEMA NIGHT',
      isRedeemed: false
    },
    {
      id: 'cpn-3',
      title: '1 Free Win in Any Argument',
      description: 'Present this coupon to instantly win any friendly argument. No questions asked!',
      badge: '🏆 GOLDEN PASS',
      isRedeemed: false
    },
    {
      id: 'cpn-4',
      title: 'Your Favorite Meal Cooked for You',
      description: 'I will cook your top favorite comfort food or sweet treat completely from scratch.',
      badge: '🍲 CHEF SPECIAL',
      isRedeemed: false
    },
    {
      id: 'cpn-5',
      title: 'Unlimited Hugs & Cuddles',
      description: 'Guaranteed 24/7 unlimited warm teddy bear hugs that never expire.',
      badge: '🧸 CUDDLE CARD',
      isRedeemed: false
    }
  ]
};
