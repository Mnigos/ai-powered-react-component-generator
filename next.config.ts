import type { NextConfig } from 'next'

const CSPHeader = `
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

export default {
	reactStrictMode: true,
	experimental: {
		reactCompiler: true,
	},
	logging: {
		fetches: {
			hmrRefreshes: true,
		},
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'x-frame-options',
						value: 'deny',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Content-Security-Policy',
						value: CSPHeader.replaceAll('\n', ''),
					},
				],
			},
		]
	},
} satisfies NextConfig
