import { useEffect, useState } from "react";

export function useFetch(initialValue, fetchFn, fetchFnArgs = null) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = fetchFnArgs !== null ? await fetchFn(...fetchFnArgs) : await fetchFn();
 
        setFetchedData(data);
      }
      catch (err) {
        setError({ message: err.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn, ...fetchFnArgs]);

  return { isFetching, error, fetchedData, setFetchedData }
}