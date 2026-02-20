import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AstroPerson, CompatibilityResult, DailyPlanetaryReport, PanchangDay } from '@/backend';

export function useGetRecentCompatibilities(limit: number = 10) {
  const { actor, isFetching } = useActor();

  return useQuery<CompatibilityResult[]>({
    queryKey: ['compatibilities', limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentCompatibilities(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCompatibility() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      person1,
      person2,
      score,
      details,
      isFavorable,
    }: {
      person1: AstroPerson;
      person2: AstroPerson;
      score: number;
      details: string;
      isFavorable: boolean;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveCompatibilityResult(person1, person2, score, details, isFavorable);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compatibilities'] });
    },
  });
}

export function useGetDailyReport(date: string) {
  const { actor, isFetching } = useActor();

  return useQuery<DailyPlanetaryReport>({
    queryKey: ['dailyReport', date],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getDailyReport(date);
    },
    enabled: !!actor && !isFetching && !!date,
    retry: false,
  });
}

export function useGetPanchangData(dayNumber: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<PanchangDay>({
    queryKey: ['panchang', dayNumber.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getPanchangData(dayNumber);
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
