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
    name: "IPLAY BOX",
    imageId: "iplay-brand",
    hits: [
      {
        type: "15,000 Hits",
        flavors: [
          "México Mango 🥭🇲🇽",
          "Pink drink 🌸🍹",
          "Mango dragónfruit refresher 🥭🐉🍹",
          "Kiwi starfruit refresher 🥝🍹",
        ],
      },
    ],
  },
  {
    name: "GEEK BAR",
    imageId: "geek-brand",
    hits: [
      {
        type: "15,000 Hits",
        flavors: [
          "Black Cherry 🫐",
          "Blue razz ice 💠❄️",
          "Pink lemonade 🌸🍸",
          "Cherry bomb 🍒💣",
          "Sour watermelon drop 🍉",
          "Frozen Blackberry fab 🫐❄️",
        ],
      },
      {
        type: "25,000 Hits",
        flavors: [
          "Pink y blue 🌸💠",
          "Blue rancher 💠🍬",
          "RASPBERRY jam 🍒",
          "Cool mint 🌿❄️",
          "White peach raspberry 🍑🫐",
        ],
      },
    ],
  },
  {
    name: "HUMO AZUL",
    imageId: "humo-azul-brand",
    hits: [
      {
        type: "15,000 Hits",
        flavors: ["Grape ice 🍇❄️"],
      },
    ],
  },
    {
    name: "Vaporesso",
    imageId: "vapo-brand",
    hits: [
      {
        type: "5000 Hits",
        flavors: ["Cool Mint", "Blue Razz Ice", "Lush Ice", "Mango Peach"],
      },
      {
        type: "8000 Hits",
        flavors: ["Strawberry Kiwi", "Watermelon Bubblegum", "Grape Energy", "Peach Mango Watermelon"],
      },
    ],
  },
];
