// Q&A: what should I do if the images domain is a secret url?

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['mxnwsaviwndgdcirtndd.supabase.co'],
    // loader: 'custom',
    // loaderFile: './supabase-image-loader.js',
  },
  // this way of redirecting cant have a logic, but we need one => middleware
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
