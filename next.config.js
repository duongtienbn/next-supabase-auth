/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images:{
        domains: ['jcgqzykfybhzodzyycsl.supabase.co']
    },
}

module.exports = nextConfig
