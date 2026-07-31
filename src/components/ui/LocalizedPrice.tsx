"use client";

import { useEffect, useState } from "react";

export function LocalizedPrice({
  usdPrice,
  inrPrice,
}: {
  usdPrice: string;
  inrPrice: string;
}) {
  const [price, setPrice] = useState<string>(usdPrice);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Asia/Calcutta" || tz === "Asia/Kolkata") {
        setPrice(inrPrice);
      } else {
        setPrice(usdPrice);
      }
    } catch (e) {
      // Fallback to USD on any error
      setPrice(usdPrice);
    }
  }, [inrPrice, usdPrice]);

  return <span className="animate-fade-in">{price}</span>;
}
