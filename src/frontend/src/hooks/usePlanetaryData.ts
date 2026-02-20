import { useGetDailyReport } from './useQueries';

export function usePlanetaryData() {
  const today = new Date().toISOString().split('T')[0];
  const { data, isLoading, error } = useGetDailyReport(today);

  return {
    data,
    isLoading,
    error,
  };
}
