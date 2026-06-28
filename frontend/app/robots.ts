import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crexio.app'
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/ipl-mock-auction', '/cricket-mock-auction', '/auction-analytics'],
      disallow: ['/room/', '/results/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}






