import type { MP } from "@/types/mp";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CandidateCardProps {
  candidate: MP;
  revealFace: boolean;
  revealParty: boolean;
  onHide: () => void;
  onClick: () => void;
}

const CandidateCard = ({ candidate, revealFace, revealParty, onHide, onClick }: CandidateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

        {/* Top gradient strip — party color */}
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(90deg, ${candidate.partyColor}, ${candidate.partyColor}4D)` }}
        />

        <div className="p-7">
          {/* Header with avatar / photo */}
          <div className="flex flex-col items-center text-center">
            {revealFace ? (
              <Avatar className="mb-4 h-24 w-24 shadow-md">
                {candidate.thumbnailUrl && (
                  <AvatarImage
                    src={candidate.thumbnailUrl}
                    alt={candidate.name}
                    className="object-cover"
                  />
                )}
                <AvatarFallback
                  className="text-3xl font-display"
                  style={{ backgroundColor: candidate.partyColor, color: candidate.partyForegroundColor }}
                >
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <User size={36} className="text-muted-foreground" />
              </div>
            )}

            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {revealFace ? candidate.name : `Candidate ${candidate.id}`}
              </h3>
            </div>

            {revealParty ? (
              <Badge
                className="mt-2 border-0 font-body text-xs font-medium"
                style={{
                  backgroundColor: `${candidate.partyColor}1A`,
                  color: candidate.partyColor,
                }}
              >
                {candidate.party}
              </Badge>
            ) : (
              <p className="mt-2 font-body text-xs italic text-muted-foreground">Party hidden</p>
            )}
          </div>

          {/* Credibility badge — only shown if scoring data exists (future) */}
          {candidate.credibility != null && (
            <div className={`mt-6 flex items-center justify-between rounded-xl border px-4 py-3 ${candidate.credibility >= 7 ? "bg-accent/10 border-accent/20" : candidate.credibility >= 5 ? "bg-score-mid/10 border-score-mid/20" : "bg-destructive/10 border-destructive/20"}`}>
              <span className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Credibility</span>
              <div className="flex items-baseline gap-0.5">
                <span className={`font-display text-2xl font-bold ${candidate.credibility >= 7 ? "text-accent" : candidate.credibility >= 5 ? "text-score-mid" : "text-destructive"}`}>
                  {candidate.credibility}
                </span>
                <span className="font-body text-xs text-muted-foreground">/10</span>
              </div>
            </div>
          )}

          {/* Manifesto preview — only shown if data exists (future) */}
          {candidate.manifesto && (
            <div className="mt-5">
              <h4 className="mb-1.5 font-body text-[11px] font-semibold uppercase tracking-wider text-primary">Manifesto</h4>
              <p className="line-clamp-4 font-body text-sm leading-relaxed text-muted-foreground">
                {candidate.manifesto}
              </p>
            </div>
          )}

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
