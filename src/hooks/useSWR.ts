import useSWR from 'swr';
import axios from 'axios';

export function useFetch(url: string) {
  const { data, mutate } = useSWR(url, async (url: string) => {
    const response = await axios(url);
    const data = await response.data;

    return data;
  });

  return { data, mutate };
}
