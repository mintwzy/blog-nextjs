/** @type import('@next/mdx').WithMDX */
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})

/** @type import('next').NextConfig */
const nextConfig = withMDX({
    pageExtensions: ['ts', 'tsx', 'mdx'],
    /**
     * Enable a static export, After running next build, Next.js will produce an out folder which contains the
     * HTML/CSS/JS assets for your application.
     */
    output: "export",
    /**
     * To deploy a Next.js application under a sub-path of a domain you can use the basePath config option.
     *
     * basePath allows you to set a path prefix for the application.
     */
    basePath: '/blog-nextjs',
    assetPrefix: '/blog-nextjs',
})


module.exports = nextConfig
