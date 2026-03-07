import { Candidate } from "@/data/candidates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Award, TrendingUp, TrendingDown } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
}

const CandidateCard = ({ candidate, revealFace, revealParty }: CandidateCardProps) => {
  const shareChangeDisplay = candidate.shareChange !== null
    ? `${candidate.shareChange > 0 ? "+" : ""}${candidate.shareChange.toFixed(1)}%`
    : null;

  return (
    <Card className="min-w-[300px] max-w-[340px] flex-shrink-0 overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
      {/* Headshot area */}
      <div className="relative flex h-44 items-center justify-center bg-muted">
        {revealFace ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <span className="font-display text-2xl text-primary-foreground">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
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
          <Badge className="absolute left-3 top-3 border-0 bg-accent font-body text-xs font-semibold text-accent-foreground">
            <Award className="mr-1 h-3 w-3" /> Sitting MP
          </Badge>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        {/* Name */}
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {revealFace ? candidate.name : `Candidate`}
          </h3>
          {revealParty ? (
            <p className="font-body text-sm text-muted-foreground">{candidate.party}</p>
          ) : (
            <p className="font-body text-sm italic text-muted-foreground">Party hidden</p>
          )}
        </div>

        {/* Vote stats */}
        <div className="space-y-2 border-t border-border pt-3">
          <div className="flex items-center justify-between font-body text-sm">
            <span className="text-muted-foreground">Votes (2024)</span>
            <span className="font-semibold text-foreground">
              {candidate.votes.toLocaleString()}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between font-body text-sm">
              <span className="text-muted-foreground">Vote share</span>
              <span className="font-semibold text-foreground">
                {candidate.voteShare.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(candidate.voteShare, 100)}%`,
                  backgroundColor: `hsl(${candidate.partyColor})`,
                }}
              />
            </div>
          </div>

          {shareChangeDisplay && (
            <div className="flex items-center justify-between font-body text-sm">
              <span className="text-muted-foreground">Change from 2019</span>
              <span
                className={`flex items-center gap-1 font-semibold ${
                  candidate.shareChange! > 0 ? "text-score-high" : "text-score-low"
                }`}
              >
                {candidate.shareChange! > 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {shareChangeDisplay}
              </span>
            </div>
          )}
        </div>

        {/* Gender & status */}
        <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
          <Badge variant="secondary" className="font-body text-xs font-normal">
            {candidate.gender}
          </Badge>
          {candidate.formerMP && (
            <Badge variant="secondary" className="font-body text-xs font-normal">
              Former MP
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
