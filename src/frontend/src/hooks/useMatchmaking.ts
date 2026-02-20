import { useSaveCompatibility, useGetRecentCompatibilities } from './useQueries';
import type { AstroPerson } from '@/backend';
import { toast } from 'sonner';
import { marathiStrings } from '@/i18n/marathi';

export function useMatchmaking() {
  const saveMutation = useSaveCompatibility();
  const { data: recentCompatibilities } = useGetRecentCompatibilities(10);

  const saveCompatibility = async (
    person1: AstroPerson,
    person2: AstroPerson,
    score: number,
    details: string,
    isFavorable: boolean
  ) => {
    try {
      await saveMutation.mutateAsync({ person1, person2, score, details, isFavorable });
      toast.success(marathiStrings.success.compatibilitySaved);
    } catch (error) {
      toast.error(marathiStrings.errors.saveFailed);
      console.error('Error saving compatibility:', error);
    }
  };

  return {
    saveCompatibility,
    recentCompatibilities,
    isLoading: saveMutation.isPending,
  };
}
