import { Candidate } from "@/data/candidates";
import ScoreBar from "./ScoreBar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
  onHide: () => void;
}

const CandidateCard = ({ candidate, revealFace, revealParty, onHide }: CandidateCardProps) => {
  return (
    <Card className="group relative min-w-0 overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onHide}
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Headshot area */}
      <div className="relative flex h-40 items-center justify-center bg-muted">
        {revealFace ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
            <span className="font-display text-2xl text-primary-foreground">
              {candidate.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <User size={40} strokeWidth={1.5} />
            <span className="font-body text-xs italic">Identity hidden</span>
          </div>
        )}
        {revealParty && (
          <Badge
            className="absolute left-3 bottom-3 border-0 font-body text-xs font-semibold shadow-md"
            style={{
              backgroundColor: `hsl(${candidate.partyColor})`,
              color: "white",
            }}
          >
            {candidate.party}
          </Badge>
        )}
        {candidate.sittingMP && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-accent/90 px-2 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
            <Award size={12} />
            Sitting MP
          </div>
        )}
      </div>

      <CardContent className="space-y-4 p-5">
        {/* Name */}
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
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
              className="font-body text-xs font-normal rounded-lg"
            >
              {policy}
            </Badge>
          ))}
        </div>

        {/* Scores */}
        <div className="space-y-2.5 border-t border-border pt-4">
          <ScoreBar label="Credibility" score={candidate.credibilityScore} />
          <ScoreBar label="Feasibility" score={candidate.feasibilityScore} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
