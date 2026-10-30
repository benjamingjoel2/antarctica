import createMDX from "@next/mdx";

// SC_EXPORT=1 produces a static export, used only for offline visual QA builds.
const isExport = process.env.SC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  ...(isExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  eslint: { ignoreDuringBuilds: true },
  // Retired pages (owner's fix list, October 2026).
  ...(isExport
    ? {}
    : {
        async redirects() {
          return [
            { source: "/legals", destination: "/privacy", permanent: true },
            { source: "/testimonials", destination: "/about", permanent: true },
          ];
        },
        // Browsers ask for /favicon.ico regardless of <link rel="icon">.
        async rewrites() {
          return [{ source: "/favicon.ico", destination: "/icon.svg" }];
        },
      }),
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
