import { useMemo } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchAllBallots, fetchPersonDetail } from "@/lib/democracy-club-api";
import { mapAllBallotsToCandidates } from "@/lib/candidate-mapper";
import type { MP } from "@/types/mp";

/**
 * Fetch all 2024 election candidates from Democracy Club and map to domain model.
 * Data is cached for 1 hour.
 */
export function useCandidates() {
  return useQuery<MP[]>({
    queryKey: ["candidates", "parl-2024"],
    queryFn: async () => {
      const ballots = await fetchAllBallots();
      return mapAllBallotsToCandidates(ballots);
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

/**
 * Derive a sorted list of unique constituency names from the candidate data.
 */
export function useConstituencies(candidates: MP[] | undefined): string[] {
  return useMemo(() => {
    if (!candidates) return [];
    const unique = [...new Set(candidates.map((c) => c.constituency))];
    return unique.sort((a, b) => a.localeCompare(b));
  }, [candidates]);
}

/**
 * Lazy-load candidate photos from Democracy Club person endpoint.
 * Only fetches when the candidate list changes (i.e. constituency selected).
 * Returns a map of personId → thumbnailUrl.
 */
export function useCandidatePhotos(candidates: MP[]): Map<number, string> {
  const queries = useQueries({
    queries: candidates.map((c) => ({
      queryKey: ["person-thumbnail", c.personId],
      queryFn: async () => {
        const detail = await fetchPersonDetail(c.personId);
        return {
          personId: c.personId,
          thumbnailUrl: detail.thumbnail ?? "",
        };
      },
      staleTime: 1000 * 60 * 60 * 24, // 24 hours — photos don't change
      gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      refetchOnWindowFocus: false,
      retry: 1,
    })),
  });

  return useMemo(() => {
    const map = new Map<number, string>();
    for (const query of queries) {
      if (query.data) {
        map.set(query.data.personId, query.data.thumbnailUrl);
      }
    }
    return map;
  }, [queries]);
}
