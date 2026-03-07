import type { DCApiResponse, DCBallot, DCPersonDetail } from "@/types/democracy-club";

const BASE_URL = "https://candidates.democracyclub.org.uk/api/next";
const PAGE_SIZE = 50;

async function fetchBallotsPage(page: number): Promise<DCApiResponse> {
  const url = `${BASE_URL}/ballots/?election_id=parl.2024-07-04&format=json&page_size=${PAGE_SIZE}&page=${page}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Democracy Club API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

const BATCH_SIZE = 3; // requests per batch to avoid 429 rate limiting
const BATCH_DELAY = 500; // ms between batches

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all 650 ballots for the 2024 UK General Election.
 * Batches requests (3 at a time with 500ms delay) to avoid rate limiting.
 */
export async function fetchAllBallots(): Promise<DCBallot[]> {
  // First request to discover total count
  const firstPage = await fetchBallotsPage(1);
  const totalResults = firstPage.count;
  const allBallots: DCBallot[] = [...firstPage.results];

  if (totalResults <= PAGE_SIZE) {
    return allBallots;
  }

  // Remaining pages to fetch
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

  // Fetch in batches to avoid 429 rate limiting
  for (let i = 0; i < remainingPages.length; i += BATCH_SIZE) {
    const batch = remainingPages.slice(i, i + BATCH_SIZE);
    const pages = await Promise.all(batch.map(fetchBallotsPage));
    for (const page of pages) {
      allBallots.push(...page.results);
    }
    // Delay between batches (skip after last batch)
    if (i + BATCH_SIZE < remainingPages.length) {
      await delay(BATCH_DELAY);
    }
  }

  return allBallots;
}

/**
 * Fetch a single person's details to get their thumbnail URL.
 * Used for lazy-loading candidate photos.
 */
export async function fetchPersonDetail(personId: number): Promise<DCPersonDetail> {
  const url = `${BASE_URL}/people/${personId}/?format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Democracy Club Person API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
