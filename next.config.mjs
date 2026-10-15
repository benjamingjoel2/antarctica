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
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
