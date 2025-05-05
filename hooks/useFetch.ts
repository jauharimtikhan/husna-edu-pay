import { useEffect, useState } from "react";

const useFetch = <T>(
  fetchFunction: (params?: any) => Promise<T>,
  autofetch: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchFunction(params);
      setData(results);
    } catch (err) {
      //@ts-ignore
      setError(err instanceof Error ? err : new Error("An error occoured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autofetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, refect: fetchData, reset };
};

export default useFetch;
