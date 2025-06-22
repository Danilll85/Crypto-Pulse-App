import { useEffect, useState } from "react";

type Result = Record<string, Array<Array<number | string>>>;

interface ReceivedData {
  error: Array<any>;
  result: Result;
}

export const useChartData = (URL: string) => {
  const [data, setData] = useState<Array<ReceivedData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        setData(data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};
