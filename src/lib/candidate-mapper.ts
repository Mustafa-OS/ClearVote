import type { DCBallot, DCCandidacy } from "@/types/democracy-club";
import type { MP } from "@/types/mp";
import { getPartyColor } from "@/lib/party-colors";
import { getPartyManifesto } from "@/lib/party-manifestos";

let idCounter = 0;

/**
 * Convert a Democracy Club ballot into an array of candidates (MP objects).
 */
export function mapBallotToCandidates(ballot: DCBallot): MP[] {
  const constituency = ballot.post.label;

  return ballot.candidacies
    .filter((c) => !c.deselected)
    .map((candidacy) => mapCandidacyToMP(candidacy, constituency));
}

function mapCandidacyToMP(candidacy: DCCandidacy, constituency: string): MP {
  const colors = getPartyColor(candidacy.party_name);
  idCounter += 1;

  return {
    id: idCounter,
    personId: candidacy.person.id,
    name: candidacy.person.name,
    constituency,
    party: candidacy.party_name,
    partyColor: colors.bg,
    partyForegroundColor: colors.fg,
    thumbnailUrl: "", // populated lazily from person endpoint
    voteCount: candidacy.result?.num_ballots,
    elected: candidacy.elected,
    manifesto: getPartyManifesto(candidacy.party_name),
  };
}

/**
 * Convert all ballots into a flat array of candidates.
 */
export function mapAllBallotsToCandidates(ballots: DCBallot[]): MP[] {
  idCounter = 0;
  return ballots.flatMap(mapBallotToCandidates);
}
