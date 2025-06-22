import { useQuery } from "@tanstack/react-query";

export interface OHLCDataPoint {
  x: Date;
  o: number;
  h: number;
  l: number;
  c: number;
}

export const useOHLCData = (pair: string, interval: number) => {
  return useQuery<OHLCDataPoint[], Error>({
    queryKey: ["ohlc", pair, interval],
    queryFn: async () => {
      const res = await fetch(`https://api.kraken.com/0/public/OHLC?pair=${pair}USD&interval=${interval}`);
      const json = await res.json();

      if (json.error?.length > 0) {
        throw new Error(json.error.join(", "));
      }

      const firstKey = Object.keys(json.result)[0];
      const raw = json.result[firstKey].slice(-100);

      return raw.map(
        (item: any[]): OHLCDataPoint => ({
          x: new Date(item[0] * 1000),
          o: parseFloat(item[1]),
          h: parseFloat(item[2]),
          l: parseFloat(item[3]),
          c: parseFloat(item[4]),
        })
      );
    },
    staleTime: 1000 * 60 * 5, 
    refetchInterval: 1000 * 60 * 5, 
  });
};
