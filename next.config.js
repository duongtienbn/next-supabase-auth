/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images:{
        domains: ['buzhxpnitxovhsagxago.supabase.co']
    },
}

module.exports = nextConfig
