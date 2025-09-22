export type Item = {
  id: string;
  href: string;
  title: string;
  jpg300: string; jpg600: string;     
  webp300: string; webp600: string;   
};

export const items: Item[] = [
  {
    id: "1", href: "https://example.com/a", title: "Instagram",
    jpg300: "/thumb-300.jpg", jpg600: "/thumb-600.jpg",
    webp300: "/thumb-300.webp", webp600: "/thumb-600.webp",
  },
  {
    id: "2", href: "https://example.com/b", title: "LinkedIn",
    jpg300: "/thumb-300.jpg", jpg600: "/thumb-600.jpg",
    webp300: "/thumb-300.webp", webp600: "/thumb-600.webp",
  }
];
