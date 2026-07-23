// ponytail: static approximate USD rates, refresh periodically. A live FX API
// is overkill for marketing-page pricing that already rounds to the nearest 5.
export const CURRENCY_BY_COUNTRY: Record<string, { currency: string; symbol: string; rate: number }> = {
  US: { currency: "USD", symbol: "$", rate: 1 },
  IN: { currency: "INR", symbol: "₹", rate: 83 },
  GB: { currency: "GBP", symbol: "£", rate: 0.79 },
  CA: { currency: "CAD", symbol: "CA$", rate: 1.36 },
  AU: { currency: "AUD", symbol: "A$", rate: 1.52 },
  JP: { currency: "JPY", symbol: "¥", rate: 150 },
  SG: { currency: "SGD", symbol: "S$", rate: 1.34 },
  AE: { currency: "AED", symbol: "AED ", rate: 3.67 },
  BR: { currency: "BRL", symbol: "R$", rate: 5.4 },
  DE: { currency: "EUR", symbol: "€", rate: 0.92 },
  FR: { currency: "EUR", symbol: "€", rate: 0.92 },
  ES: { currency: "EUR", symbol: "€", rate: 0.92 },
  IT: { currency: "EUR", symbol: "€", rate: 0.92 },
  NL: { currency: "EUR", symbol: "€", rate: 0.92 },
};

const DEFAULT_REGION = CURRENCY_BY_COUNTRY.US;

export function getRegionForCountry(countryCode: string | null | undefined) {
  if (!countryCode) return DEFAULT_REGION;
  return CURRENCY_BY_COUNTRY[countryCode.toUpperCase()] ?? DEFAULT_REGION;
}

export function convertUsd(usdAmount: number, rate: number): number {
  return Math.round((usdAmount * rate) / 5) * 5;
}
