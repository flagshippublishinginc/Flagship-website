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
