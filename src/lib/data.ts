export type Flavor = string;

export type Hit = {
  type: string;
  flavors: Flavor[];
};

export type Brand = {
  name: string;
  imageId: string;
  hits: Hit[];
};

export const catalogData: Brand[] = [
  {
    name: 'IPLAY BOX',
    imageId: 'iplay-brand',
    hits: [
      {
        type: '15,000 Hits',
        flavors: [
          'México Mango 🥭🇲🇽 (mango, méxico)',
          'Pink drink 🌸🍹 (bebida rosa, fresa, acai)',
          'Mango dragónfruit refresher 🥭🐉🍹 (mango, pitahaya)',
          'Kiwi starfruit refresher 🥝🍹 (kiwi, carambola)',
          'Very berry 🫐❄️ (frutos rojos, fresco)',
          'Mamba 🍊🌴 (naranja, tropical)',
          'Pink lemonade 🌸🍸🍋 (limonada rosa)',
        ],
      },
    ],
  },
  {
    name: 'GEEK BAR',
    imageId: 'geek-brand',
    hits: [
      {
        type: '15,000 Hits',
        flavors: [
          'Black Cherry 🫐 (cereza negra)',
          'Blue razz ice 💠❄️ (frambuesa azul, hielo, fresco)',
          'Cherry bomb 🍒💣 (cereza, explosión)',
          'Pink lemonade 🌸🍸🍋 (limonada rosa)',
          'Sour watermelon drop 🍉🍬 (sandía, dulce, agrio)',
          'Cool mint 🌿❄️ (menta, fresco)',
          'Frozen white grape 🍇❄️ (uva blanca, hielo, fresco)',
          'Frozen Blackberry fab 🫐❄️ (mora, hielo, fresco)',
          'Frozen cherry Apple 🍒🍏❄️ (cereza, manzana, hielo, fresco)',
          'Stone Freeze 🌿💠❄️ (menta, hielo, fresco)',
          'Berry blis 🍒🫐💠 (frutos rojos, cereza, frambuesa)',
        ],
      },
      {
        type: '25,000 Hits',
        flavors: [
          'Pink y blue 🌸💠 (rosa, azul, algodón de azúcar)',
          'Blue rancher 💠🍬 (caramelo, frambuesa azul)',
          'RASPBERRY jam 🍒 (mermelada de frambuesa)',
          'Cool mint 🌿❄️ (menta, fresco)',
          'White peach raspberry 🍑🫐 (durazno blanco, frambuesa)',
        ],
      },
    ],
  },
  {
    name: 'HUMO AZUL',
    imageId: 'humo-azul-brand',
    hits: [
      {
        type: '15,000 Hits',
        flavors: ['Grape ice 🍇❄️ (uva, hielo, fresco)'],
      },
    ],
  },
  {
    name: 'CORE',
    imageId: 'core-brand',
    hits: [
      {
        type: '12,000 Hits',
        flavors: ['Strawberry Cherry 🍉🍒 (fresa, cereza)'],
      },
    ],
  },
];

export type PlumaBrand = string;

export type PlumaType = {
  name: string;
  description: string;
  brands: PlumaBrand[];
};

export type PlumasCategory = {
  name: string;
  imageId: string;
  items: PlumaType[];
};

export const plumasData: PlumasCategory = {
  name: 'Plumas',
  imageId: 'plumas-brand',
  items: [
    {
      name: 'Pluma USA',
      description: 'SATIVA - INDICA - HIBRIDA',
      brands: ['MUHAMEDS', 'FADE', 'STONER STIX', 'LUIGI'],
    },
    {
      name: 'Pluma MX',
      description: 'SATIVA - INDICA - HIBRIDA',
      brands: [
        'FRYD',
        'BODEGA BOYS',
        'MUHAMEDS',
        'SAUCE',
        'PACK MAN',
        'PACKWOODS',
        'JEETER',
        'COOKIES FREAK',
        'FUSIÓN',
        'CARNIVAL',
      ],
    },
  ],
};
