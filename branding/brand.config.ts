// freilernen.social brand on the runtime branding mechanism (replaces branding/constants/*.js).
//
// Authored in TypeScript against @ocelot-social/branding: `defineBranding` type-checks these
// overrides against the branding schema; a wrong key or type FAILS the build. Only values that
// differ from the framework defaults are set (sparse override).
//
// Content layout (one served assets folder, dynamically bound at runtime): assets/ = images,
// html/ = static page HTML per locale. Paths are ROOT-relative; the multi-brand build namespaces
// them to /branding/freilernen/… (collision-free).
//
// assets/css/branding.css holds a tiny mobile-logo tweak (.ds-logo-mobile). It is listed in
// `assets.css` and injected at RUNTIME; it used to be a build-time SCSS overlay, which stopped
// applying when the nuxt bundle became brand-agnostic.
//
// NOT here: e-mails (SUPPORT_EMAIL / *_LINK) are ENV → set in the deployment env.
import { defineBranding, type LinkPageKey } from '@ocelot-social/branding'

const HTML_FILE: Partial<Record<LinkPageKey, string>> = {
  organization: 'organization',
  donate: 'donate',
  imprint: 'imprint',
  termsAndConditions: 'terms-and-conditions',
  codeOfConduct: 'code-of-conduct',
  dataPrivacy: 'data-privacy',
  faq: 'faq',
  support: 'support',
}
const html = Object.fromEntries(
  Object.entries(HTML_FILE).map(([page, file]) => [
    page,
    { de: `html/de/${file}.html`, en: `html/en/${file}.html` },
  ]),
)

export default defineBranding({
  about: {
    description: 'freilernen.social — a community network by ASP – Aktive Schule Petershausen.',
    license: {
      logosReusable: false,
      colorsReusable: false,
      note: 'freilernen.social logos and name belong to ASP – Aktive Schule Petershausen — ask before reuse.',
    },
  },
  metadata: {
    applicationName: 'freilernen.social',
    applicationShortName: 'freilernen.social',
    applicationDescription: 'Ocelot Social Community',
    organizationName: 'ASP – Aktive Schule Petershausen',
    organizationJurisdiction: 'Deutschland',
  },
  group: {
    descriptionMinLength: 10,
  },
  logos: {
    headerPath: 'assets/logo-horizontal.svg',
    headerMobilePath: 'assets/logo-horizontal.svg',
    headerWidth: '47px',
    signupPath: 'assets/logo-squared.svg',
    welcomePath: 'assets/logo-squared.svg',
    logoutPath: 'assets/logo-squared.svg',
    passwordResetPath: 'assets/logo-squared.svg',
  },
  headerMenu: {
    menu: [
      {
        nameIdent: 'freilernensocialRebranding.header.asp',
        url: 'https://freilernen.com',
        target: '_blank',
      },
    ],
  },
  links: {
    // All static pages are internal (the framework defaults point several at ocelot.social) — force
    // them back to the brand's own HTML. FAQ carries a custom "Hilfe / Help" headline.
    pages: {
      organization: { externalLink: null },
      donate: { externalLink: null },
      imprint: { externalLink: null },
      support: { externalLink: null },
      faq: {
        internalPage: {
          footerIdent: 'freilernensocialRebranding.footer.faq.headline',
          headTitleIdent: 'freilernensocialRebranding.footer.faq.headline',
          headlineIdent: 'freilernensocialRebranding.footer.faq.headline',
        },
      },
    },
    // freilernen drops Support from the footer.
    footerOrder: [
      'organization',
      'termsAndConditions',
      'codeOfConduct',
      'dataPrivacy',
      'faq',
      'donate',
      'imprint',
    ],
  },
  assets: {
    css: ['assets/css/branding.css'],
    html,
    favicon: 'assets/favicon.ico',
  },
  locales: {
    de: {
      freilernensocialRebranding: {
        footer: { faq: { headline: 'Hilfe' } },
        header: { asp: 'ASP' },
      },
    },
    en: {
      freilernensocialRebranding: {
        footer: { faq: { headline: 'Help' } },
        header: { asp: 'ASP' },
      },
    },
  },
})
