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
    name: 'Vaporesso',
    imageId: 'vapo-brand',
    hits: [
      {
        type: '5000 Hits',
        flavors: [
          'Cool Mint (menta, fresco)',
          'Blue Razz Ice (frambuesa azul, hielo, fresco)',
          'Lush Ice (sandía, hielo, fresco)',
          'Mango Peach (mango, durazno)',
        ],
      },
      {
        type: '8000 Hits',
        flavors: [
          'Strawberry Kiwi (fresa, kiwi)',
          'Watermelon Bubblegum (sandía, chicle)',
          'Grape Energy (uva, bebida energética)',
          'Peach Mango Watermelon (durazno, mango, sandía)',
        ],
      },
    ],
  },
];
