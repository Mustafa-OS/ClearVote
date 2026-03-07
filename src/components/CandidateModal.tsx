import type { MP } from "@/types/mp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, ExternalLink } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CandidateModalProps {
  candidate: MP | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revealFace: boolean;
  revealParty: boolean;
}

const CandidateModal = ({ candidate, open, onOpenChange, revealFace, revealParty }: CandidateModalProps) => {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-2xl border-border/50 p-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-primary/80 px-8 py-6">
          <div className="flex items-center gap-5">
            {revealFace ? (
              <Avatar className="h-16 w-16 rounded-2xl shadow-md">
                {candidate.thumbnailUrl && (
                  <AvatarImage
                    src={candidate.thumbnailUrl}
                    alt={candidate.name}
                    className="object-cover"
                  />
                )}
                <AvatarFallback
                  className="rounded-2xl text-2xl font-display"
                  style={{ backgroundColor: candidate.partyColor, color: candidate.partyForegroundColor }}
                >
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <User size={28} className="text-primary-foreground/60" />
              </div>
            )}
            <div>
              <DialogTitle className="font-display text-2xl text-primary-foreground">
                {revealFace ? candidate.name : `Candidate ${candidate.id}`}
              </DialogTitle>
              <div className="mt-1 flex items-center gap-2">
                {revealParty ? (
                  <Badge className="border-0 bg-primary-foreground/15 font-body text-xs text-primary-foreground backdrop-blur-sm">
                    {candidate.party}
                  </Badge>
                ) : (
                  <span className="font-body text-sm italic text-primary-foreground/50">Party hidden</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6 px-8 py-6">
          {/* Constituency */}
          <div className="rounded-xl bg-muted/50 px-5 py-4">
            <p className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Constituency</p>
            <p className="mt-0.5 font-body text-sm font-medium text-foreground">{candidate.constituency}</p>
          </div>

          {/* Credibility — only if scoring data exists (future) */}
          {candidate.credibility != null && (
            <div className={`flex items-center justify-between rounded-xl ${candidate.credibility >= 7 ? "bg-accent/10" : candidate.credibility >= 5 ? "bg-score-mid/10" : "bg-destructive/10"} px-5 py-4`}>
              <div>
                <p className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground">Credibility Rating</p>
                <p className="mt-0.5 font-body text-sm text-foreground/70">Based on track record & consistency</p>
              </div>
              <div className="text-right">
                <span className={`font-body text-4xl font-bold ${candidate.credibility >= 7 ? "text-accent" : candidate.credibility >= 5 ? "text-score-mid" : "text-destructive"}`}>
                  {candidate.credibility}
                </span>
                <span className="font-body text-lg text-muted-foreground">/10</span>
              </div>
            </div>
          )}

          {/* Manifesto — only if data exists (future) */}
          {candidate.manifesto && (
            <div>
              <h4 className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-primary">
                Manifesto
              </h4>
              <p className="font-body text-sm leading-relaxed text-foreground/80">
                {candidate.manifesto}
              </p>
            </div>
          )}

          {/* Feasibility — only if data exists (future) */}
          {candidate.feasibility && (
            <div>
              <h4 className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-accent">
                Feasibility Analysis
              </h4>
              <p className="font-body text-sm leading-relaxed text-foreground/80">
                {candidate.feasibility}
              </p>
            </div>
          )}

          {/* Democracy Club profile link */}
          <a
            href={`https://whocanivotefor.co.uk/person/${candidate.personId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border/60 px-5 py-3 font-body text-sm text-primary transition-colors hover:bg-muted/50"
          >
            <ExternalLink className="h-4 w-4" />
            View full candidate profile
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateModal;
