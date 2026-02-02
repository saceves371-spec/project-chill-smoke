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
    imageId: "elf-brand",
    hits: [
      {
        type: "BC5000",
        flavors: ["Sakura Grape", "Watermelon Ice", "Strawberry Mango", "Kiwi Passionfruit Guava"],
      },
      {
        type: "TE6000",
        flavors: ["Apple Peach", "Grape Ice", "Juicy Peach", "Strawberry Ice Cream"],
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
          "Black Cherry 🫐",
          "Blue razz ice 💠❄️",
          "Pink lemonade 🌸🍸",
          "Cherry bomb 🍒💣",
          "Sour watermelon drop 🍉",
          "Frozen Blackberry fab 🫐❄️",
        ],
      },
      {
        type: "25,000 Hits",
        flavors: [
          "Pink y blue 🌸💠",
          "Blue rancher 💠🍬",
          "RASPBERRY jam 🍒",
          "Cool mint 🌿❄️",
          "White peach raspberry 🍑🫐",
        ],
      },
    ],
  },
  {
    name: "PUFF",
    imageId: "puff-brand",
    hits: [
      {
        type: "9000 Hits",
        flavors: ["Alaskan Mint", "California Cherry", "Dragonfruit Berry", "Polar Ice"],
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
