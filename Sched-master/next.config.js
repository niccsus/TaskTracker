/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => [
        {
          source: "/",
          destination: "/RegistrationForm.html",
        },
      ],
 }
 module.exports = nextConfig