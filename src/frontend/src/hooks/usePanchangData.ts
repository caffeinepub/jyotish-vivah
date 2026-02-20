import { useGetPanchangData } from './useQueries';

export function usePanchangData() {
  // Calculate day number from epoch (January 1, 1970)
  const today = new Date();
  const epoch = new Date(1970, 0, 1);
  const dayNumber = BigInt(Math.floor((today.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24)));

  const { data, isLoading, error } = useGetPanchangData(dayNumber);

  return {
    data,
    isLoading,
    error,
  };
}
