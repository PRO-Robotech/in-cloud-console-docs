import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const DEFAULT_GITHUB_REPO = 'PRO-Robotech/openapi-ui'
const DEFAULT_GITHUB_REPO_URL = `https://github.com/${DEFAULT_GITHUB_REPO}`
const DEFAULT_GITHUB_API_URL = `https://api.github.com/repos/${DEFAULT_GITHUB_REPO}`
const DEFAULT_GITHUB_API_URL_TAG = `${DEFAULT_GITHUB_API_URL}/tags?per_page=1`
const DEFAULT_GITHUB_API_URL_STAR = DEFAULT_GITHUB_API_URL
const DEFAULT_GITHUB_REPO_LABEL = 'openapi-ui'

const parseEnvNumber = (value: string | undefined): number | null => {
  if (!value) {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const config: Config = {
  title: process.env.TITLE || 'in-cloud',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.URL || 'http://localhost',
  baseUrl: process.env.BASEURL || '/infrastructure/in-cloud-console-docs/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en-US' },
      ru: { label: 'Русский', htmlLang: 'ru-RU' },
    },
  },

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async params => {
            const { defaultCreateSitemapItems, ...rest } = params
            const items = await defaultCreateSitemapItems(rest)
            return items.filter(item => !item.url.includes('/page/'))
          },
        },
        docs: {
          sidebarPath: './sidebars.ts',
          breadcrumbs: true,
          routeBasePath: '/',
          // includeCurrentVersion:
          //   (process.env.DOC_INCLUDE_CURRENT_VERSION &&
          //     process.env.DOC_INCLUDE_CURRENT_VERSION.toLowerCase() === 'true') ||
          //   false,
        },
        // blog: {
        //   blogTitle: 'Docusaurus blog!',
        //   blogDescription: 'A Docusaurus powered blog!',
        //   postsPerPage: 'ALL'
        // },
        pages: {
          path: 'src/pages',
          routeBasePath: '',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
          exclude: ['**/_*.{js,jsx,ts,tsx,md,mdx}', '**/_*/**', '**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**'],
          mdxPageComponent: '@theme/MDXPage',
          remarkPlugins: [],
          rehypePlugins: [],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
        theme: {
          customCss: './src/css/custom.scss',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    require.resolve('./plugins/webpack'),
    require.resolve('./plugins/medusa'),
    'docusaurus-plugin-astroturf',
    [
      'docusaurus2-dotenv-2',
      {
        systemvars: true,
      },
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
      type: 'text/css',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap',
      type: 'text/css',
      crossOrigin: 'anonymous',
    },
  ],

  customFields: {
    githubRepo: {
      apiUrlStar: process.env.Docusaurus_GIT_API_URL_STAR || DEFAULT_GITHUB_API_URL_STAR,
      apiUrlTag: process.env.Docusaurus_GIT_API_URL_TAG || DEFAULT_GITHUB_API_URL_TAG,
      forks: parseEnvNumber(process.env.Docusaurus_GIT_FORKS),
      label: process.env.Docusaurus_GIT_LABEL || DEFAULT_GITHUB_REPO_LABEL,
      stars: parseEnvNumber(process.env.Docusaurus_GIT_STARS),
      tag: process.env.Docusaurus_GIT_TAG || null,
      url: process.env.Docusaurus_GIT_URL || DEFAULT_GITHUB_REPO_URL,
    },
  },

  themeConfig: {
    navbar: {
      logo: {
        src: 'img/paws.svg',
        href: 'https://in-cloud.io/',
      },
      title: 'in-Cloud Console',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'techDocs',
          position: 'left',
          label: 'Документация',
        },
        {
          to: '/storybook',
          label: 'Сторибук',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' }, // or position: 'right'
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },

    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },

    footer: {
      style: 'dark',
      links: [],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'hcl', 'json', 'docker'],
      defaultLanguage: 'bash',
    },
  } satisfies Preset.ThemeConfig,

  scripts: [
    {
      src: '/js/observer.js',
      async: false,
    },
  ],
}

export default config
