"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readStore, writeStore } from "./storage";

type Ctx = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  penguin: boolean;
  setPenguin: (v: boolean) => void;
};

const UiContext = createContext<Ctx>({ menuOpen: false, setMenuOpen: () => {}, penguin: false, setPenguin: () => {} });

export function UiProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [penguin, setPenguinState] = useState(false);

  useEffect(() => setPenguinState(readStore("sc-penguin", false)), []);

  const setPenguin = (v: boolean) => {
    setPenguinState(v);
    writeStore("sc-penguin", v);
  };

  return <UiContext.Provider value={{ menuOpen, setMenuOpen, penguin, setPenguin }}>{children}</UiContext.Provider>;
}

export const useUi = () => useContext(UiContext);
