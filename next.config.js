const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    pageExtensions: ['ts', 'tsx', 'mdx'],
    output: "export",
    basePath: '/blog-nextjs',
    assetPrefix: '/blog-nextjs',
})


module.exports = nextConfig
