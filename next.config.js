const ghPages = process.env.DEPLOY_TARGET === 'gh-pages';

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    pageExtensions: ['ts', 'tsx', 'mdx'],
    output: "export",
    basePath: ghPages? '/blog-nextjs' : '',
    assetPrefix: ghPages ? '/blog-nextjs' : '',
})


module.exports = nextConfig
