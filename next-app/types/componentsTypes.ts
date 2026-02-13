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

export interface RichTextModule {
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
  headingHighlight: string;
  headingText: string;
}

export interface PostType {
  _key?: string;
  _ref: string;
  _type: string;
  title: string;
  coverImage: SanityImage;
  description: string;
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

export interface TwoColumnImageContentModule extends BaseModule {
  _type: "classicsModule";
  headingText: string;
  headingHighlight: string;
  featuredImage: SanityImage;
  featuredTitle: string;
  featuredDescription: string;
  featuredButtonLink: string;
  featuredButtonText: string;
  secondaryImage: SanityImage;
}

export interface GalleryItem {
  _key?: string;
  _type: string;
  title: string;
  image: SanityImage;
  itemType: string;
  photoCredit: string;
  location: string;
  textContent: string;
}

export interface GalleryModule extends BaseModule {
  _type: "galleryModule";
  headingHighlight: string;
  headingText: string;
  buttonText?: string;
  buttonLink?: string;
  galleryItems: GalleryItem[];
}

export interface CtaBannerModule extends BaseModule {
  _type: "ctaBannerModule";
  buttonLink: string;
  buttonText: string;
  title: string;
  description: string;
  image: SanityImage;
}

interface FaqItem {
  _key?: string;
  _type: string;
  question: string;
  answer: string;
}

interface ParentFaqItem {
  _key?: string;
  _type: string;
  title: string;
  faqs: FaqItem[];
}

export interface NestedFaqModuleType extends BaseModule {
  _type: "nestedFaqModule";
  faqs: ParentFaqItem[];
}

export interface SimpleBannerModule extends BaseModule {
  _type: "simpleBanner";
  title: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  contentAlignment: string;
}

export interface BannerWithBottomContentModule extends BaseModule {
  _type: "bannerWithBottomContent";
  addBottomContent: boolean;
  addButton: boolean;
  buttonText: string;
  buttonLink: string;
  buttonAlignment: string;
  topTextContent: any;
  textContent: string;
  image: SanityImage;
  imageAlt: string;
  textBackgroundColor: string;
  textColor: string;
  contentMaxWidth: number;
}

export interface IntroWithImagesModule extends BaseModule {
  _type: "introWithImages";
  headingText: string;
  headingHighlight: string;
  textContent: any;
  addImages: {
    image: SanityImage;
    alt: string;
  }[];
  addButton: boolean;
  buttonText: string;
  buttonLink: string;
}

export interface CoverageOverviewModule extends BaseModule {
  _type: "coverageOverview";
  heading: string;
  headingBackgroundColor: string;
  headingColor: string;
  title: string;
  titleHighlight: string;
  listItems: {
    iconImage: SanityImage;
    text: string;
  }[];
}

export interface MiniGalleryModule extends BaseModule {
  _type: "miniGallery";
  heading: string;
  highlightedHeadingText: string;
  images: {
    image: SanityImage;
    altText: string;
  }[];
  buttonText: string;
  buttonLink: string;
}

export interface TeamMemberModule extends BaseModule {
  _type: "teamMembers";
  headingHighlight: string;
  heading: string;
  teamMembers: {
    _key?: string;
    name: string;
    image: SanityImage;
    designation: string;
  }[];
}

export interface LinkType {
  _type: string;
  label: string;
  external: string;
  internal: any;
  type: string;
}

export interface CtaCardSectionModule extends BaseModule {
  _type: "ctaCardsSection";
  title: string;
  highlightedText: string;
  titleTextAlignment: string;
  ctaCards: {
    _key?: string;
    link: LinkType;
    description: string;
  }[];
}

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "datetime"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "image"
  | "url"
  | "textarea";

export interface FormField {
  label: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  options?: string[];
  defaultChecked?: boolean;
}

export interface RowLayout {
  columnType: "one" | "two" | "three";
  formFields: FormField[];
}

export interface DynamicFormModule extends BaseModule {
  _type: "dynamicForm";
  rowLayout: RowLayout[];
}
