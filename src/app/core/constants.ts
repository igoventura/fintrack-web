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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wallet"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" /><path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" /></svg>',
  },
  {
    name: 'bank_traditional',
    defaultColor: 'var(--color-inst-red)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-building-bank"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" /></svg>',
  },
  {
    name: 'bank_digital',
    defaultColor: 'var(--color-nu-purple)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" /><path d="M11 4h2" /><path d="M12 17v.01" /></svg>',
  },
  {
    name: 'credit_card',
    defaultColor: 'var(--color-infinite-blue)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-credit-card"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -8" /><path d="M3 10l18 0" /><path d="M7 15l.01 0" /><path d="M11 15l2 0" /></svg>',
  },
  {
    name: 'bitcoin',
    defaultColor: 'var(--color-inter-orange)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-currency-bitcoin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 6h8a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-8" /><path d="M8 6l0 12" /><path d="M8 12l6 0" /><path d="M9 3l0 3" /><path d="M13 3l0 3" /><path d="M9 18l0 3" /><path d="M13 18l0 3" /></svg>',
  },
  {
    name: 'savings',
    defaultColor: 'var(--color-revenue-green)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pig-money"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11v.01" /><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" /><path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3" /></svg>',
  },
  {
    name: 'investment',
    defaultColor: 'var(--color-gold)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ease-in-out"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20c8 0 10 -16 18 -16" /></svg>',
  },
  {
    name: 'pix',
    defaultColor: 'var(--color-teal)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" style="fill: currentColor !important;" viewBox="0 0 512 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M242.4 292.5c5.4-5.4 14.7-5.4 20.1 0l77 77c14.2 14.2 33.1 22 53.1 22l15.1 0-97.1 97.1c-30.3 29.5-79.5 29.5-109.8 0l-97.5-97.4 9.3 0c20 0 38.9-7.8 53.1-22l76.7-76.7zm20.1-73.6c-6.4 5.5-14.6 5.6-20.1 0l-76.7-76.7c-14.2-15.1-33.1-22-53.1-22l-9.3 0 97.4-97.4c30.4-30.3 79.6-30.3 109.9 0l97.2 97.1-15.2 0c-20 0-38.9 7.8-53.1 22l-77 77zM112.6 142.7c13.8 0 26.5 5.6 37.1 15.4l76.7 76.7c7.2 6.3 16.6 10.8 26.1 10.8 9.4 0 18.8-4.5 26-10.8l77-77c9.8-9.7 23.3-15.3 37.1-15.3l37.7 0 58.3 58.3c30.3 30.3 30.3 79.5 0 109.8l-58.3 58.3-37.7 0c-13.8 0-27.3-5.6-37.1-15.4l-77-77c-13.9-13.9-38.2-13.9-52.1 .1l-76.7 76.6c-10.6 9.8-23.3 15.4-37.1 15.4l-31.8 0-58-58c-30.3-30.3-30.3-79.5 0-109.8l58-58.1 31.8 0z"/></svg>',
  },
  {
    name: 'money_cash',
    defaultColor: 'var(--color-revenue-green)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cash-banknote"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M3 8a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -8" /><path d="M18 12h.01" /><path d="M6 12h.01" /></svg>',
  },
  {
    name: 'brand_mastercard',
    defaultColor: 'var(--color-inst-red)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-mastercard"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 9.765a3 3 0 1 0 0 4.47" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" /></svg>',
  },
  {
    name: 'brand_visa',
    defaultColor: 'var(--color-royal-blue)',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-visa"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 15l-1 -6l-2.5 6" /><path d="M9 15l1 -6" /><path d="M3 9h1v6h.5l2.5 -6" /><path d="M16 9.5a.5 .5 0 0 0 -.5 -.5h-.75c-.721 0 -1.337 .521 -1.455 1.233l-.09 .534a1.059 1.059 0 0 0 1.045 1.233a1.059 1.059 0 0 1 1.045 1.233l-.09 .534a1.476 1.476 0 0 1 -1.455 1.233h-.75a.5 .5 0 0 1 -.5 -.5" /><path d="M18 14h2.7" /></svg>',
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
