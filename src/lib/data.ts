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
          'Pink lemonade 🌸🍸 (limonada rosa)',
          'Cherry bomb 🍒💣 (cereza, explosión)',
          'Sour watermelon drop 🍉 (sandía ácida)',
          'Frozen Blackberry fab 🫐❄️ (mora, helado, fresco)',
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

export type Pluma = {
  name: string;
  description: string;
  price: string;
};

export type PlumasCategory = {
  name: string;
  imageId: string;
  items: Pluma[];
};

export const plumasData: PlumasCategory = {
  name: 'Plumas',
  imageId: 'plumas-brand',
  items: [
    {
      name: 'Pluma USA',
      description: 'SATIVA - INDICA - HIBRIDA',
      price: '$650',
    },
    {
      name: 'Pluma MX',
      description: 'SATIVA - INDICA - HIBRIDA',
      price: '$850',
    },
  ],
};
