import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.prod.website-files.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'payload-cms-dun.vercel.app',
				pathname: '/**',
			},
		],
		domains: [
			'localhost',
			'payload-cms-dun.vercel.app',
			'wdc-test-payload.vercel.app',
		],
	},
}

export default nextConfig
