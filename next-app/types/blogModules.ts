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
  coverImage: any;
  author: Author;
  categories: Category[];
  _createdAt: string;
  description: string;
};
