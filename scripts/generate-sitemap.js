const fs = require('fs');
const path = require('path');

const pages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/market', priority: 0.9, changefreq: 'hourly' },
  { url: '/weather', priority: 0.8, changefreq: 'hourly' },
  { url: '/schemes', priority: 0.7, changefreq: 'weekly' },
  { url: '/calculator', priority: 0.6, changefreq: 'monthly' },
  { url: '/seeds', priority: 0.5, changefreq: 'monthly' },
  { url: '/fertilizer', priority: 0.5, changefreq: 'monthly' },
  { url: '/calendar', priority: 0.4, changefreq: 'monthly' },
  { url: '/insurance', priority: 0.6, changefreq: 'weekly' },
  { url: '/drone', priority: 0.4, changefreq: 'monthly' },
  { url: '/storage', priority: 0.4, changefreq: 'monthly' },
  { url: '/alerts', priority: 0.8, changefreq: 'hourly' },
  { url: '/disease', priority: 0.5, changefreq: 'monthly' },
  { url: '/marketplace', priority: 0.6, changefreq: 'daily' },
  { url: '/chatbot', priority: 0.5, changefreq: 'monthly' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>https://agrotech-telangana-ap.vercel.app${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully!');
