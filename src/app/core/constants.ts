/**
 * Application Constants
 */

export const ACCOUNT_COLORS = [
  // Fintechs
  'var(--color-nu-purple)',
  'var(--color-inter-orange)',
  'var(--color-neon-green)',
  'var(--color-intense-pink)',
  'var(--color-carbon-black)',
  'var(--color-fintech-yellow)',
  // Traditional
  'var(--color-inst-red)',
  'var(--color-royal-blue)',
  'var(--color-bb-gold)',
  'var(--color-std-blue)',
  'var(--color-expense-red)',
  'var(--color-revenue-green)',
  // Premium
  'var(--color-platinum)',
  'var(--color-gold)',
  'var(--color-bronze)',
  'var(--color-infinite-blue)',
  'var(--color-matte-black)',
  'var(--color-titanium)',
  // Auxiliary
  'var(--color-cyan)',
  'var(--color-indigo)',
  'var(--color-shock-pink)',
  'var(--color-burnt-orange)',
  'var(--color-teal)',
  'var(--color-graphite)',
];

export const ACCOUNT_ICONS = [
  {
    name: 'wallet',
    defaultColor: 'var(--color-bronze)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12V7H5a2 2 0 0 1 0-4h14v4' /><path d='M3 5v14a2 2 0 0 0 2 2h16v-5' /><path d='M18 12a2 2 0 0 0 0 4h4v-4Z' /></svg>",
  },
  {
    name: 'bank_traditional',
    defaultColor: 'var(--color-inst-red)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 21h18' /><path d='M5 21v-7' /><path d='M19 21v-7' /><path d='M10 9L3 21' opacity='0' /><path d='M2 10l10-7 10 7' /><path d='M12 21v-9' /></svg>",
  },
  {
    name: 'bank_digital',
    defaultColor: 'var(--color-nu-purple)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='2' width='14' height='20' rx='2' ry='2' /><path d='M12 18h.01' /></svg>",
  },
  {
    name: 'credit_card',
    defaultColor: 'var(--color-infinite-blue)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='5' width='20' height='14' rx='2' /><line x1='2' y1='10' x2='22' y2='10' /></svg>",
  },
  {
    name: 'bitcoin',
    defaultColor: 'var(--color-inter-orange)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.279 5.307m-5.355-.946 2.083 11.822a.99.99 0 0 0 1.144.793l1.97-.348' /></svg>",
  },
  {
    name: 'savings',
    defaultColor: 'var(--color-revenue-green)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11 3.3-11 3.3 1 3.8 2 6.5 6 6.5h3.8c3.8 0 5-5 5-7 0-1.2-1.2-3.8-3.8-4.8z' /><path d='M16 5c1 0 2 .5 2.5 1.5' /><path d='M19 14v1' /><path d='M14 9a1 1 0 0 1 0 2 1 1 0 0 1 0-2z' /></svg>",
  },
  {
    name: 'investment',
    defaultColor: 'var(--color-gold)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='12' y1='20' x2='12' y2='10' /><line x1='18' y1='20' x2='18' y2='4' /><line x1='6' y1='20' x2='6' y2='16' /></svg>",
  },
  {
    name: 'pix',
    defaultColor: 'var(--color-teal)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2L2 12l10 10 10-10L12 2z' /><path d='M12 8v8' /><path d='M8 12h8' /></svg>",
  },
  {
    name: 'money_cash',
    defaultColor: 'var(--color-revenue-green)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='6' width='20' height='12' rx='2' /><circle cx='12' cy='12' r='2' /><path d='M6 12h.01M18 12h.01' /></svg>",
  },
  {
    name: 'crypto_alt',
    defaultColor: 'var(--color-indigo)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 12l6-9 6 9-6 9-6-9z' /></svg>",
  },
  {
    name: 'brand_mastercard',
    defaultColor: 'var(--color-inst-red)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-mastercard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 9.765a3 3 0 1 0 0 4.47" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /></svg>',
  },
  {
    name: 'brand_visa',
    defaultColor: 'var(--color-royal-blue)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M10.7 3.8L7.3 19.8H3.9L7.3 3.8H10.7ZM20.8 4L22.2 11.2C22.2 11.2 23 4.2 23 3.9C22.6 3.8 21.6 3.7 20.8 4ZM15.6 3.8L12.5 19.8H9.1L12.2 3.8H15.6ZM19.5 19.8L21.8 8L21.4 6C20.8 8.1 19.3 15.2 19.3 15.2L17.7 19.8H19.5ZM7.7 13C7.7 10.2 4.4 9.9 4.4 7.6C4.4 6.7 5.3 6.1 6.5 6C7 6 8.5 6.1 9 7L9.6 4.3C8.8 3.9 7.7 3.7 6.5 3.7C3.5 3.7 1.5 5.3 1.5 7.8C1.5 10.8 5 11 5 13.2C5 14.1 4.1 14.7 3.2 14.7C2.4 14.7 1 14.4 0.5 13.9L0 16.6C1 17 2.6 17.5 3.5 17.5C6.7 17.5 8.7 15.9 7.7 13Z'/></svg>",
  },
  {
    name: 'brand_amex',
    defaultColor: 'var(--color-cyan)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM10 14H8.5L8 13H6L5.5 14H4L6.5 9H7.5L10 14ZM14 14H12.5L12 11.5H11V14H10V9H13C13.5 9 14 9.5 14 10V14ZM19 14H15V9H19V10.5H16.5V11H18.5V12.5H16.5V14Z'/></svg>",
  },
  {
    name: 'brand_elo',
    defaultColor: 'var(--color-matte-black)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.5 15.5C7.1 15.5 6 14.4 6 13C6 11.6 7.1 10.5 8.5 10.5H15.5V12.5H8.5C8.2 12.5 8 12.7 8 13C8 13.3 8.2 13.5 8.5 13.5H16V15.5H8.5ZM16.5 11.5H13.5V9.5H16.5C16.8 9.5 17 9.3 17 9C17 8.7 16.8 8.5 16.5 8.5H7.5V6.5H16.5C17.9 6.5 19 7.6 19 9C19 10.4 17.9 11.5 16.5 11.5Z'/></svg>",
  },
  {
    name: 'brand_hipercard',
    defaultColor: 'var(--color-expense-red)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M3 6H21V18H3V6Z' opacity='0.5'/><path d='M16 8H19V16H16V13H14V16H11V8H14V11H16V8Z'/></svg>",
  },
];

export const CATEGORY_COLORS = [
  // Housing & Bills
  'var(--color-housing-dark-blue)',
  'var(--color-housing-light-blue)',
  'var(--color-housing-gray)',
  'var(--color-housing-blue-gray)',
  // Food & Drink
  'var(--color-food-red)',
  'var(--color-food-orange)',
  'var(--color-food-pumpkin)',
  'var(--color-food-wine)',
  // Transport & Travel
  'var(--color-transport-purple)',
  'var(--color-transport-blue)',
  'var(--color-transport-green)',
  'var(--color-transport-gray)',
  // Health & Wellness
  'var(--color-health-emerald)',
  'var(--color-health-turquoise)',
  'var(--color-health-light-green)',
  // Leisure & Shopping
  'var(--color-leisure-lilac)',
  'var(--color-leisure-pink)',
  'var(--color-leisure-coral)',
  'var(--color-leisure-yellow)',
  // Education & Family
  'var(--color-edu-brown)',
  'var(--color-edu-light-brown)',
  'var(--color-edu-olive)',
  // Income & Investments
  'var(--color-income-teal)',
  'var(--color-income-gold)',
];

export const CATEGORY_ICONS = [
  {
    name: 'category_home',
    defaultColor: 'var(--color-housing-dark-blue)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>",
  },
  {
    name: 'category_food',
    defaultColor: 'var(--color-food-red)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 8h1a4 4 0 0 1 0 8h-1'/><path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z'/><line x1='6' y1='1' x2='6' y2='4'/><line x1='10' y1='1' x2='10' y2='4'/><line x1='14' y1='1' x2='14' y2='4'/></svg>",
  },
  {
    name: 'category_grocery',
    defaultColor: 'var(--color-food-orange)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='9' cy='21' r='1'/><circle cx='20' cy='21' r='1'/><path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'/></svg>",
  },
  {
    name: 'category_transport',
    defaultColor: 'var(--color-transport-purple)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='1' y='3' width='15' height='13'/><polygon points='16 8 20 8 23 11 23 16 16 16 16 8'/><circle cx='5.5' cy='18.5' r='2.5'/><circle cx='18.5' cy='18.5' r='2.5'/></svg>",
  },
  {
    name: 'category_fuel',
    defaultColor: 'var(--color-transport-blue)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M3 22v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8'/><path d='M13 14h2a2 2 0 0 1 2 2v2'/><path d='M15 13L18 7h2'/><path d='M3 6h10v6H3z'/><path d='M3 6l2-3h6l2 3'/></svg>",
  },
  {
    name: 'category_health',
    defaultColor: 'var(--color-health-emerald)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 12h-4l-3 9L9 3l-3 9H2'/></svg>",
  },
  {
    name: 'category_fitness',
    defaultColor: 'var(--color-health-turquoise)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6.5 6.5l5 5'/><path d='M21 21l-1-1'/><path d='M3 3l1 1'/><path d='M18 22l4-4'/><path d='M2 6l4-4'/><path d='M3 10l7-7'/><path d='M14 21l7-7'/></svg>",
  },
  {
    name: 'category_shopping',
    defaultColor: 'var(--color-leisure-pink)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/><line x1='3' y1='6' x2='21' y2='6'/><path d='M16 10a4 4 0 0 1-8 0'/></svg>",
  },
  {
    name: 'category_travel',
    defaultColor: 'var(--color-transport-green)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'/><path d='M15 7a2 2 0 0 1 2 2'/><path d='M15 3a6 6 0 0 1 6 6'/></svg>",
  },
  {
    name: 'category_education',
    defaultColor: 'var(--color-edu-brown)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M22 10v6M2 10l10-5 10 5-10 5z'/><path d='M6 12v5c3 3 9 3 12 0v-5'/></svg>",
  },
  {
    name: 'category_entertainment',
    defaultColor: 'var(--color-leisure-lilac)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='6' width='20' height='12' rx='2'/><path d='M6 12h4'/><path d='M8 10v4'/><line x1='15' y1='13' x2='15.01' y2='13'/><line x1='18' y1='11' x2='18.01' y2='11'/></svg>",
  },
  {
    name: 'category_pets',
    defaultColor: 'var(--color-edu-olive)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 5.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/><path d='M17 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/><path d='M7 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/><path d='M12 21c-3.3 0-6-2.7-6-6v-3c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v3c0 3.3-2.7 6-6 6z'/></svg>",
  },
  {
    name: 'category_utilities',
    defaultColor: 'var(--color-housing-light-blue)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>",
  },
  {
    name: 'category_income',
    defaultColor: 'var(--color-income-teal)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='12' y1='1' x2='12' y2='23'/><path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/></svg>",
  },
  {
    name: 'category_gift',
    defaultColor: 'var(--color-leisure-coral)',
    icon: "<svg width='100%' height='100%' style='width: 100%; height: 100%;' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 12 20 22 4 22 4 12'/><rect x='2' y='7' width='20' height='5'/><line x1='12' y1='22' x2='12' y2='7'/><path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'/><path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'/></svg>",
  },
];
