// App domain model for a candidate — consumed by all UI components

export interface MP {
  id: number;                    // unique composite ID
  personId: number;              // Democracy Club person ID (for photo fetching)
  name: string;
  constituency: string;
  party: string;
  partyColor: string;            // hex with "#" prefix, e.g. "#E4003B"
  partyForegroundColor: string;  // hex with "#" prefix for text contrast
  thumbnailUrl: string;          // populated lazily from DC person endpoint
  // Election data — stored but not displayed in pre-election framing
  voteCount?: number;
  elected?: boolean;
  // Future fields — nullable for now, will be populated when scoring is added
  manifesto?: string;
  feasibility?: string;
  credibility?: number;
}
