// Raw API response types for Democracy Club Ballots API
// https://candidates.democracyclub.org.uk/api/next/ballots/

export interface DCApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DCBallot[];
}

export interface DCBallot {
  ballot_paper_id: string;
  post: DCPost;
  election: DCElection;
  candidacies: DCCandidacy[];
  winner_count: number;
  cancelled: boolean;
  candidates_locked: boolean;
  voting_system: string;
  results: DCBallotResults | null;
}

export interface DCPost {
  id: string;
  label: string;         // constituency name, e.g. "Aberafan Maesteg"
  slug: string;
}

export interface DCElection {
  election_id: string;   // e.g. "parl.2024-07-04"
  name: string;
  election_date: string;
}

export interface DCCandidacy {
  elected: boolean;
  party: DCParty;
  party_name: string;
  party_description_text: string;
  person: DCPerson;
  result: DCCandidateResult | null;
  deselected: boolean;
  deselected_source: string | null;
}

export interface DCParty {
  url: string;
  ec_id: string;
  name: string;
  legacy_slug: string;
}

export interface DCPerson {
  id: number;
  url: string;
  name: string;
}

export interface DCCandidateResult {
  elected: boolean;
  num_ballots: number;
}

export interface DCBallotResults {
  num_turnout_reported: number;
  turnout_percentage: number;
  num_spoilt_ballots: number;
  source: string;
  total_electorate: number;
}

// Person detail API response (for fetching thumbnails)
export interface DCPersonDetail {
  id: number;
  name: string;
  thumbnail: string | null;
  image: {
    image_url: string;
  } | null;
}
