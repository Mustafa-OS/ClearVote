import { Candidate } from "@/data/candidates";
import ScoreBar from "./ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Award } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
}

const CandidateCard = ({ candidate, revealFace, revealParty }: CandidateCardProps) => {
  return (
    <Card className="min-w-0 overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
      {/* Headshot area */}
      <div className="relative flex h-44 items-center justify-center bg-muted">
        {revealFace ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <span className="font-display text-2xl text-primary-foreground">
                {candidate.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <User size={44} strokeWidth={1.5} />
            <span className="font-body text-sm italic">Identity hidden</span>
          </div>
        )}
        {revealParty && (
          <Badge
            className="absolute right-3 top-3 border-0 font-body text-xs font-semibold"
            style={{
              backgroundColor: `hsl(${candidate.partyColor})`,
              color: "white",
            }}
          >
            {candidate.party}
          </Badge>
        )}
        {candidate.sittingMP && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded bg-accent/90 px-2 py-0.5 text-xs font-semibold text-accent-foreground">
            <Award size={12} />
            Sitting MP
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-4">
        {/* Name */}
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {revealFace ? candidate.name : `Candidate ${candidate.id.split("-")[1]}`}
          </h3>
          {revealParty ? (
            <p className="font-body text-sm text-muted-foreground">{candidate.party}</p>
          ) : (
            <p className="font-body text-sm italic text-muted-foreground">Party hidden</p>
          )}
        </div>

        {/* Vote share */}
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-foreground">{candidate.voteShare}%</span>
          <span className="font-body text-xs text-muted-foreground">vote share</span>
          <span className="ml-auto font-body text-xs text-muted-foreground">{candidate.votes.toLocaleString()} votes</span>
        </div>

        {/* Key Policies */}
        <div className="flex flex-wrap gap-1.5">
          {candidate.keyPolicies.map((policy) => (
            <Badge
              key={policy}
              variant="secondary"
              className="font-body text-xs font-normal"
            >
              {policy}
            </Badge>
          ))}
        </div>

        {/* Scores */}
        <div className="space-y-2 border-t border-border pt-3">
          <ScoreBar label="Credibility" score={candidate.credibilityScore} />
          <ScoreBar label="Feasibility" score={candidate.feasibilityScore} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
