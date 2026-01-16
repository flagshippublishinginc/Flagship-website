export interface SanityImageAsset {
  _ref: string;
  _type: string;
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAsset;
}

export type HomeModule =
  | HomeBannerModule
  | RichTextModule
  | ReaderFavouritesModule
  | ActivitiesModule;

interface BaseModule {
  _key: string;
  _type: string;
}

export interface HomeBannerModule extends BaseModule {
  _type: "homeBannerModule";
  author: string;
  authorPrefix: string;
  buttonLabel: string;
  buttonLink: string;
  description: string;
  image: SanityImage;
  title: string;
}

export interface RichTextModule extends BaseModule {
  _type: "richTextModule";
  content: any;
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

export interface ReaderFavouritesModule extends BaseModule {
  _type: "readerFavouritesModule";
  articles: ReaderFavouriteArticle[];
  headingHighlight: string;
  headingText: string;
}

export interface LeadArticleInterface {
  description: string;
  mediaType?: string;
  image?: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  video?: {
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

export interface ActivitiesModule extends BaseModule {
  _type: "activitiesModule";
  leadArticle: LeadArticleInterface;
  sidebarArticles: SidebarArticlesInterface[];
  headingHighlight: string;
  headingText: string;
  buttonText?: string;
  ButtonUrl?: string;
}

export interface CurrentIssueModule extends BaseModule {
  _type: "currentIssueModule";
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

export interface PostType {
  _key?: string;
  _ref: string;
  _type: string;
  title: string;
  coverImage: SanityImage;
}

export interface TravelGuidesModule extends BaseModule {
  _type: "categoryHighlightModule";
  _key: string;
  rightSidePosts: PostType[];
  leftSidePosts: PostType[];
  featuredPost: PostType;
  headingHighlight: string;
  headingText: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface SubscribeModule extends BaseModule {
  _type: "subscriptionBannerModule";
  headingHighlight: string;
  headingText: string;
  buttonText?: string;
  buttonLink?: string;
  description?: string;
  imageLayout?: string;
  tripleImages?: {
    image1: SanityImage;
    image2: SanityImage;
    image3: SanityImage;
  };
  singleImage?: SanityImage;
}

export interface RealEstateArticle {
  _key?: string;
  _type: string;
  title: string;
  image: SanityImage;
  link: string;
  description: string;
}

export interface PropertySlide {
  _key?: string;
  _type: string;
  title: string;
  image: SanityImage;
  link: string;
}

export interface RealEstateModule extends BaseModule {
  _type: "realEstateModule";
  headingHighlight: string;
  headingText: string;
  featuredDescription: string;
  featuredImage: SanityImage;
  featuredTitle: string;
  sidebarArticles: RealEstateArticle[];
  propertySlides: PropertySlide[];
}
