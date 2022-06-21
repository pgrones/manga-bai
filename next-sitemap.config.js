/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mangabai.com',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/*'
      }
    ]
  }
};
