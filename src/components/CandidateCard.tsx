import { Candidate } from "@/data/candidates";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
  onHide: () => void;
  onClick: () => void;
}

const CandidateCard = ({ candidate, revealFace, revealParty, onHide, onClick }: CandidateCardProps) => {
  const getCredColor = (s: number) => {
    if (s >= 7) return "text-accent";
    if (s >= 5) return "text-score-mid";
    return "text-destructive";
  };

  const getCredBg = (s: number) => {
    if (s >= 7) return "bg-accent/10 border-accent/20";
    if (s >= 5) return "bg-score-mid/10 border-score-mid/20";
    return "bg-destructive/10 border-destructive/20";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={onClick}
        className="group relative cursor-pointer overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
      >
        {/* Remove button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); onHide(); }}
          className="absolute right-3 top-3 z-10 h-7 w-7 rounded-full bg-foreground/5 opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </Button>

        {/* Top gradient strip */}
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, hsl(${candidate.partyColor}), hsl(${candidate.partyColor} / 0.3))` }}
        />

        <div className="p-7">
          {/* Header with large avatar */}
          <div className="flex flex-col items-center text-center">
            {revealFace ? (
              <div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full shadow-md"
                style={{ background: `linear-gradient(135deg, hsl(${candidate.partyColor}), hsl(${candidate.partyColor} / 0.6))` }}
              >
                <span className="font-display text-3xl text-primary-foreground">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
            ) : (
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <User size={36} className="text-muted-foreground" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {revealFace ? candidate.name : `Candidate ${candidate.id.split("-")[1]}`}
              </h3>
              {candidate.sittingMP && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                  <Award size={10} /> MP
                </span>
              )}
            </div>

            {revealParty ? (
              <Badge
                className="mt-2 border-0 font-body text-xs font-medium"
                style={{
                  backgroundColor: `hsl(${candidate.partyColor} / 0.1)`,
                  color: `hsl(${candidate.partyColor})`,
                }}
              >
                {candidate.party}
              </Badge>
            ) : (
              <p className="mt-2 font-body text-xs italic text-muted-foreground">Party hidden</p>
            )}
          </div>

          {/* Credibility badge */}
          <div className={`mt-6 flex items-center justify-between rounded-xl border px-4 py-3 ${getCredBg(candidate.credibility)}`}>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Credibility</span>
            <div className="flex items-baseline gap-0.5">
              <span className={`font-display text-2xl font-bold ${getCredColor(candidate.credibility)}`}>
                {candidate.credibility}
              </span>
              <span className="font-body text-xs text-muted-foreground">/10</span>
            </div>
          </div>

          {/* Manifesto preview */}
          <div className="mt-5">
            <h4 className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-primary">Manifesto</h4>
            <p className="line-clamp-4 font-body text-sm leading-relaxed text-muted-foreground">
              {candidate.manifesto}
            </p>
          </div>

          {/* Feasibility preview */}
          <div className="mt-4">
            <h4 className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-accent">Feasibility</h4>
            <p className="line-clamp-3 font-body text-sm leading-relaxed text-muted-foreground">
              {candidate.feasibility}
            </p>
          </div>

          {/* Click hint */}
          <p className="mt-5 text-center font-body text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Click to read more →
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default CandidateCard;
