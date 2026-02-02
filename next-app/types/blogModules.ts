import { SanityImage } from "./componentsTypes";

export type Author = {
  _id: string;
  name: string;
  image?: any;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
};

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: SanityImage;
  author: Author;
  categories: Category[];
  _createdAt: string;
  description: string;
};

export type SingleImageModule = {
  image: SanityImage;
  caption: string;
  title: string;
};

export type TwoColumnTextWithImageModule = {
  textColumn: any;
  image: SanityImage;
  imageAltText: string;
};
