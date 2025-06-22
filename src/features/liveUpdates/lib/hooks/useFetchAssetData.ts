import { useEffect, useState } from "react";

interface KrakenAssetPair {
  altname: string;
  wsname: string;
  base: string;
  quote: string;
  [key: string]: any;
}

interface KrakenAssetPairsResponse {
  error: string[];
  result: Record<string, KrakenAssetPair>;
}

export interface AssetPairData {
  wsname: string;
  base: string;
}

export const useFetchAssetData = () => {
  const [assets, setAssets] = useState<Record<string, AssetPairData> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("https://api.kraken.com/0/public/AssetPairs");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: KrakenAssetPairsResponse = await response.json();

        if (data.error && data.error.length > 0) {
          throw new Error(data.error.join(", "));
        }

        const usdAssets = Object.entries(data.result).reduce((acc, [key, pair]) => {
          if (pair.quote === "ZUSD" || pair.quote === "USD") {
            acc[key] = {
              wsname: pair.wsname,
              base: pair.base,
            };
          }
          return acc;
        }, {} as Record<string, AssetPairData>);

        setAssets(usdAssets);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setAssets(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  return { assets, loading, error };
};
