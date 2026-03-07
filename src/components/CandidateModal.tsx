import { Candidate } from "@/data/candidates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Award, User } from "lucide-react";

interface CandidateModalProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revealFace: boolean;
  revealParty: boolean;
}

const CandidateModal = ({ candidate, open, onOpenChange, revealFace, revealParty }: CandidateModalProps) => {
  if (!candidate) return null;

  const getCredColor = (s: number) => {
    if (s >= 7) return "text-accent";
    if (s >= 5) return "text-score-mid";
    return "text-destructive";
  };

  const getCredBg = (s: number) => {
    if (s >= 7) return "bg-accent/10";
    if (s >= 5) return "bg-score-mid/10";
    return "bg-destructive/10";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-2xl border-border/50 p-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-8 py-6">
          <div className="flex items-center gap-5">
            {revealFace ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15 backdrop-blur-sm">
                <span className="font-display text-2xl text-primary-foreground">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <User size={28} className="text-primary-foreground/60" />
              </div>
            )}
            <div>
              <DialogTitle className="font-display text-2xl text-primary-foreground">
                {revealFace ? candidate.name : `Candidate ${candidate.id.split("-")[1]}`}
              </DialogTitle>
              <div className="mt-1 flex items-center gap-2">
                {revealParty ? (
                  <Badge className="border-0 bg-primary-foreground/15 font-body text-xs text-primary-foreground backdrop-blur-sm">
                    {candidate.party}
                  </Badge>
                ) : (
                  <span className="font-body text-sm italic text-primary-foreground/50">Party hidden</span>
                )}
                {candidate.sittingMP && (
                  <Badge className="border-0 bg-accent/20 font-body text-xs text-accent-foreground backdrop-blur-sm">
                    <Award size={12} className="mr-1" />
                    Sitting MP
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 px-8 py-6">
          {/* Credibility */}
          <div className={`flex items-center justify-between rounded-xl ${getCredBg(candidate.credibility)} px-5 py-4`}>
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Credibility Rating</p>
              <p className="mt-0.5 font-body text-sm text-foreground/70">Based on track record & consistency</p>
            </div>
            <div className="text-right">
              <span className={`font-body text-4xl font-bold ${getCredColor(candidate.credibility)}`}>
                {candidate.credibility}
              </span>
              <span className="font-body text-lg text-muted-foreground">/10</span>
            </div>
          </div>

          {/* Manifesto */}
          <div>
            <h4 className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-primary">
              Manifesto
            </h4>
            <p className="font-body text-sm leading-relaxed text-foreground/80">
              {candidate.manifesto}
            </p>
          </div>

          {/* Feasibility */}
          <div>
            <h4 className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-accent">
              Feasibility Analysis
            </h4>
            <p className="font-body text-sm leading-relaxed text-foreground/80">
              {candidate.feasibility}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
