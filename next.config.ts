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
				hostname: 'sea-turtle-app-4dk5h.ondigitalocean.app',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'wixcrbqfoxbnk3ak.public.blob.vercel-storage.com',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'wixcrbqfoxbnk3ak.public.blob.vercel-storage.com',
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
