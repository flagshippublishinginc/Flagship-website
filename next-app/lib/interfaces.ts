export interface SanityImageAsset {
  _ref: string;
  _type: string;
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

export interface HomeBannerInterface {
  _key: string;
  _type: "homeBannerModule";
  author: string;
  authorPrefix: string;
  buttonLabel: string;
  buttonLink: string;
  description: string;
  image: SanityImage;
  title: string;
}

export interface ReaderFavouriteArticle {
  author: string;
  category: string;
  description: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  publishDate: string;
  readLink: string;
  readText: string;
  title: string;
}

export interface ReaderFavouritesInterface {
  articles: ReaderFavouriteArticle[];
  headingHighlight: string;
  headingText: string;
}

export interface LeadArticleInterface {
  description: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  readLink: string;
  title: string;
}

export interface SidebarArticlesInterface {
  description: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  readLink: string;
  title: string;
}

export interface ActivitiesModuleInterface {
  leadArticle: LeadArticleInterface;
  sidebarArticles: SidebarArticlesInterface[];
  headingHighlight: string;
  headingText: string;
}

export interface CurrentIssueInterface {
  badge?: string;
  issueDate: string;
  coverImage: SanityImage;
  volumeInfo?: string;
  featuredTitle?: string;
  mainFeature: string;
  features?: string[];
  heroImage: SanityImage;
  buttonText?: string;
  buttonLink?: string;
}

