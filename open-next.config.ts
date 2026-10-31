// OpenNext config for Cloudflare (https://opennext.js.org/cloudflare).
// Pages are prerendered at build time and nothing revalidates, so prerendered
// HTML/RSC is served read-only from static assets: no R2/KV to provision.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

const config = {
  ...defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
    enableCacheInterception: true,
  }),
  // Same command Vercel runs, so pre-build steps (i18n) also run on Cloudflare.
  buildCommand: "npm run build",
};

export default config;
