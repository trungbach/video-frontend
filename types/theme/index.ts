import React from "react";
import { UseTranslation } from "next-i18next";

export type ThemeProviderProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  t?: UseTranslation;
  title?: string;
  description?: string;
  image?: string;
};

export type TranslateProps = {
  t: UseTranslation;
};
