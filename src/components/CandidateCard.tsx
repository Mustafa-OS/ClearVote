import { Candidate } from "@/data/candidates";
import ScoreBar from "./ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
}

const CandidateCard = ({ candidate, revealFace, revealParty }: CandidateCardProps) => {
  return (
    <Card className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
      {/* Headshot area */}
      <div className="relative flex h-52 items-center justify-center bg-muted">
        {revealFace ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
              <span className="font-display text-3xl text-primary-foreground">
                {candidate.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <User size={48} strokeWidth={1.5} />
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
      </div>

      <CardContent className="space-y-4 p-5">
        {/* Name - always shown */}
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            {revealFace ? candidate.name : `Candidate ${candidate.id.split("-")[1]}`}
          </h3>
          {revealParty ? (
            <p className="font-body text-sm text-muted-foreground">{candidate.party}</p>
          ) : (
            <p className="font-body text-sm italic text-muted-foreground">Party hidden</p>
          )}
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

        {/* Manifesto */}
        <p className="font-body text-sm leading-relaxed text-muted-foreground">
          {candidate.manifesto}
        </p>

        {/* Experience */}
        <p className="font-body text-xs italic text-muted-foreground">
          {candidate.experience}
        </p>

        {/* Scores */}
        <div className="space-y-3 border-t border-border pt-4">
          <ScoreBar label="Credibility" score={candidate.credibilityScore} />
          <ScoreBar label="Feasibility" score={candidate.feasibilityScore} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
