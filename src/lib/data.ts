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
  {
    name: "GeekVape",
    imageId: "geek-brand",
    hits: [
      {
        type: "6000 Hits",
        flavors: ["Miami Mint", "Tropical Rainbow Blast", "White Gummy Ice", "Sour Apple Ice"],
      },
      {
        type: "10000 Hits",
        flavors: ["Meta Moon", "Cherry Bomb", "Blueberry Watermelon", "Pink Lemonade"],
      },
    ],
  },
  {
    name: "Smok",
    imageId: "smok-brand",
    hits: [
      {
        type: "9000 Hits",
        flavors: ["Alaskan Mint", "California Cherry", "Dragonfruit Berry", "Polar Ice"],
      },
    ],
  },
    {
    name: "Elf Bar",
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
];
