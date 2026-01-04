import en from "./translations/en.json";
import zh from "./translations/zh.json";
import ms from "./translations/ms.json";

export type Locale = "en" | "zh" | "ms";

export const locales: Locale[] = ["en", "zh", "ms"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ms: "Malay",
};

export const translations = {
  en,
  zh,
  ms,
} as const;

export type TranslationKeys = typeof en;

// Helper to get nested translation value
export function getTranslation(
  locale: Locale,
  key: string
): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let fallback: any = translations.en;
      for (const fk of keys) {
        if (fallback && typeof fallback === "object" && fk in fallback) {
          fallback = fallback[fk];
        } else {
          return key; // Return key if not found
        }
      }
      return typeof fallback === "string" ? fallback : key;
    }
  }

  return typeof value === "string" ? value : key;
}

export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "aone-locale";
