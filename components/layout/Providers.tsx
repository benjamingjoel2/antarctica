"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ConsentProvider } from "@/lib/consent";
import { CurrencyProvider } from "@/lib/currency";
import { UiProvider } from "@/lib/ui";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ConsentProvider>
        <CurrencyProvider>
          <UiProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </UiProvider>
        </CurrencyProvider>
      </ConsentProvider>
    </MotionConfig>
  );
}
