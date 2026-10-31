"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Decorative looping background video with poster, captions track and a
 * pause control (WCAG 2.2.2). Never autoplays for reduced-motion users.
 *
 * Performance: nothing (poster or video) loads until the player is near the
 * viewport, and players that are hidden (e.g. `hidden md:block`) never load.
 * On phones, coarse pointers and Save-Data the video does not autoplay: the
 * poster shows, and the video is fetched only when the visitor presses play.
 */
const autoplayAllowed = () => {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (c?.saveData) return false;
  return window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
};

export function BackgroundVideo({
  src,
  poster,
  captions,
  label,
  className,
  showControl = true,
  controlClassName,
}: {
  src: string;
  poster: string;
  captions?: string;
  label: string;
  className?: string;
  showControl?: boolean;
  controlClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // near: within 300px of the viewport (poster may load); armed: the video source is attached.
  const [near, setNear] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (near && !reduce && autoplayAllowed()) setArmed(true);
  }, [near, reduce]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !armed) return;
    if (reduce) {
      v.pause();
      setPlaying(false);
      return;
    }
    if (v.networkState === v.NETWORK_EMPTY) v.load();
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [reduce, armed]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!armed) {
      setArmed(true); // the play effect above starts it once the source is attached
      return;
    }
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video
        ref={ref}
        className={cn("h-full w-full object-cover", className)}
        poster={near ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      >
        {armed && <source src={src} type="video/mp4" />}
        {armed && captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
      </video>
      {showControl && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
          className={cn(
            "absolute bottom-[1.25rem] right-[1.25rem] z-20 grid h-[1.8rem] w-[1.8rem] cursor-pointer place-items-center bg-ice text-ink transition hover:bg-orange",
            controlClassName,
          )}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><rect x="2" y="1" width="3" height="10" fill="currentColor" /><rect x="7" y="1" width="3" height="10" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2 1l9 5-9 5z" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </>
  );
}
