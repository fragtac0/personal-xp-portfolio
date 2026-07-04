import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'

const SITE_URL = 'https://fragtaco.com'
const SITE_IMAGE = `${SITE_URL}/img/logo-portfolio-black.webp`
const DESCRIPTION =
  'Aditya Bhoir (FragTaco) is a Mumbai-based motion designer, video editor and content strategist crafting motion graphics, explainer videos and short- and long-form content for brands and creators.'
const KEYWORDS = 'portfolio, aditya bhoir, fragtaco, video editor, editor, motion graphics, motion designer, content strategist, mumbai'
const AUTHOR = 'Aditya Bhoir'

const baseMeta = (title, url) => [
  { rel: 'canonical', href: url },
  { name: 'title', content: title },
  { name: 'description', content: DESCRIPTION },
  { name: 'keywords', content: KEYWORDS },
  { name: 'author', content: AUTHOR },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#000000' },
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: title },
  { name: 'application-name', content: title },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: DESCRIPTION },
  { name: 'twitter:image', content: SITE_IMAGE },
  { name: 'twitter:image:alt', content: 'Aditya Bhoir - FragTaco logo' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: title },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:site_name', content: 'Aditya Bhoir - FragTaco' },
  { property: 'og:url', content: url },
  { property: 'og:image', content: SITE_IMAGE },
  { property: 'og:image:alt', content: 'Aditya Bhoir - FragTaco logo' },
  { property: 'og:locale', content: 'en_US' }
]

const HOME_TITLE = 'Portfolio | Aditya Bhoir - Motion Designer <> Video Editor <> Content Strategist'
const OFFICE_TITLE = 'Desktop | Aditya Bhoir - Motion Designer & Video Editor'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Loader,
      meta: {
        title: HOME_TITLE,
        metaTags: baseMeta(HOME_TITLE, SITE_URL)
      }
    },
    {
      path: '/office',
      name: 'Office',
      component: Office,
      meta: {
        title: OFFICE_TITLE,
        metaTags: baseMeta(OFFICE_TITLE, `${SITE_URL}/office`)
      }
    }
  ]
})

export default router
