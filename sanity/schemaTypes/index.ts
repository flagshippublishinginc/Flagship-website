// schemas/index.ts
import page from './documents/page'
import homePage from './documents/homePage'
import blogListingPage from './documents/blogListing'
import post from './documents/post'
import author from './documents/author'
import category from './documents/category'
import settings from './documents/settings'
import themeSettings from './documents/themeSettings'
import site from './documents/site'
import collections from './documents/collections'

import seo from './objects/seo'
import links from './objects/links'
import navItem from './objects/navItem'
import moduleBuilder from './objects/module'

import hero from './modules/heroModule'
import richTextBlock from './modules/richTextModule'
import featuredCards from './modules/featuredCardsModule'
import twoColumn from './modules/twoColumnModule'
import cta from './modules/ctaBannerModule'
import imageGallery from './modules/imageGalleryModule'
import faq from './modules/faqModule'
import testimonialModule from './modules/testimonialModule'
import stats from './modules/statsModule'
import logoCloud from './modules/logoModule'
import header from './modules/headerModule'
import footer from './modules/footerModule'
import homeBannerModule from './modules/homeBannerModule'
import readerFavourites from './modules/readerFavouritesModule'
import activities from './modules/activitiesModule'
import categoryHighlight from './modules/categoryHighlightModule'
import currentIssue from './modules/currentIssueModule'
import realEstate from './modules/realEstateModule'
import subscriptionBanner from './modules/subscriptionBannerModule'
import classics from './modules/classicsModule'
import gallery from './modules/galleryModule'
import singleImageModule from './modules/singleImageModule'
import twoColumnTextWithImage from './modules/twoColumnTextWithImage'
import nestedFaqModule from './modules/nestedFaqModule'
import simpleBanner from './modules/simpleBanner'
import teamMember from './modules/teamMember'
import bannerWithBottomContent from './modules/bannerWithBottomContent'
import introWithImages from './modules/introWithImages'
import coverageOverview from './modules/coverageOverview'
import miniGallery from './modules/miniGallery'
import ctaCardsSection from './modules/ctaCardsSection'
import formContent from './modules/formFields'
import contactUsModule from './modules/ContactUsModule'
import shopifyProductListingModule from './modules/shopifyProductListingModule'

export const schemaTypes = [
  // documents
  page,
  homePage,
  blogListingPage,
  post,
  author,
  category,
  settings,
  themeSettings,
  site,
  collections,

  // objects
  seo,
  links,
  navItem,
  moduleBuilder,

  // modules
  hero,
  richTextBlock,
  featuredCards,
  twoColumn,
  cta,
  imageGallery,
  faq,
  testimonialModule,
  stats,
  logoCloud,
  header,
  footer,
  homeBannerModule,
  readerFavourites,
  activities,
  categoryHighlight,
  currentIssue,
  realEstate,
  subscriptionBanner,
  classics,
  gallery,
  singleImageModule,
  twoColumnTextWithImage,
  nestedFaqModule,
  simpleBanner,
  teamMember,
  bannerWithBottomContent,
  introWithImages,
  coverageOverview,
  miniGallery,
  ctaCardsSection,
  formContent,
  contactUsModule,
  shopifyProductListingModule,
]
