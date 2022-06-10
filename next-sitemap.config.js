/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'TODO',
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
