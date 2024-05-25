/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "s3.us-east-2.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "lh3.googleusercontent.com",
      "truecondos.com",
      "realtors-test.s3.eu-north-1.amazonaws.com",
      "realtor-app-media.s3.ap-south-1.amazonaws.com",
      "source.unsplash.com",
      "realtor-website-omlizkpf.s3.ap-south-1.amazonaws.com",
      "m.media-amazon.com",
      "example.com",
      "url.com",
      "img.freepik.com",
    ],
  },
};

module.exports = nextConfig;
