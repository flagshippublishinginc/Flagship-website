// schemas/index.ts
import page from './documents/page'
import homePage from './documents/homePage'
import contactPage from './documents/contactPage'
import teamPage from './documents/teamPage'
import blogListingPage from './documents/blogListing'
import post from './documents/post'
import teamMember from './documents/teamMember'
import author from './documents/author'
import category from './documents/category'
import testimonial from './documents/testimonial'
import settings from './documents/settings'
import themeSettings from './documents/themeSettings'
import site from './documents/site'

import seo from './objects/seo'
import links from './objects/links'

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

export const schemaTypes = [
  // documents
  page,
  homePage,
  contactPage,
  teamPage,
  blogListingPage,
  post,
  teamMember,
  author,
  category,
  testimonial,
  settings,
  themeSettings,
  site,

  // objects
  seo,
  links,

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
]
