import { Candidate } from "@/data/candidates";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Award, X, Star, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CandidateCardProps {
  candidate: Candidate;
  revealFace: boolean;
  revealParty: boolean;
  onHide: () => void;
}

const CredibilityStars = ({ score }: { score: number }) => {
  const fullStars = Math.floor(score);
  const hasHalf = score - fullStars >= 0.5;
  const emptyStars = 10 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <span className="font-body text-2xl font-bold text-foreground">{score}</span>
      <span className="font-body text-sm text-muted-foreground">/10</span>
    </div>
  );
};

const CandidateCard = ({ candidate, revealFace, revealParty, onHide }: CandidateCardProps) => {
  const getCredibilityColor = (score: number) => {
    if (score >= 7) return "text-accent";
    if (score >= 5) return "text-score-mid";
    return "text-destructive";
  };

  const getCredibilityLabel = (score: number) => {
    if (score >= 8) return "Very High";
    if (score >= 6) return "Moderate";
    if (score >= 4) return "Low";
    return "Very Low";
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onHide}
        className="absolute right-2 top-2 z-10 h-7 w-7 rounded-full bg-card/90 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
      >
        <X className="h-3.5 w-3.5" />
      </Button>

      {/* Header area */}
      <div className="relative flex items-center gap-4 border-b border-border/40 px-5 py-4">
        {/* Avatar */}
        {revealFace ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm">
            <span className="font-display text-lg text-primary-foreground">
              {candidate.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
            <User size={20} className="text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-body text-base font-semibold text-foreground">
              {revealFace ? candidate.name : `Candidate ${candidate.id.split("-")[1]}`}
            </h3>
            {candidate.sittingMP && (
              <span className="inline-flex items-center gap-0.5 rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                <Award size={10} />
                MP
              </span>
            )}
          </div>
          {revealParty ? (
            <Badge
              className="mt-1 border-0 font-body text-[11px] font-medium"
              style={{
                backgroundColor: `hsl(${candidate.partyColor} / 0.12)`,
                color: `hsl(${candidate.partyColor})`,
              }}
            >
              {candidate.party}
            </Badge>
          ) : (
            <p className="mt-1 font-body text-xs italic text-muted-foreground">Party hidden</p>
          )}
        </div>

        {/* Credibility score badge */}
        <div className="flex flex-col items-center">
          <div className={`text-2xl font-bold font-body ${getCredibilityColor(candidate.credibility)}`}>
            {candidate.credibility}
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">/10 credibility</span>
        </div>
      </div>

      {/* Tabs for Manifesto & Feasibility */}
      <CardContent className="flex-1 p-0">
        <Tabs defaultValue="manifesto" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border/40 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="manifesto"
              className="rounded-none border-b-2 border-transparent py-2.5 font-body text-xs font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <FileText className="mr-1.5 h-3 w-3" />
              Manifesto
            </TabsTrigger>
            <TabsTrigger
              value="feasibility"
              className="rounded-none border-b-2 border-transparent py-2.5 font-body text-xs font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <CheckCircle className="mr-1.5 h-3 w-3" />
              Feasibility
            </TabsTrigger>
          </TabsList>
          <TabsContent value="manifesto" className="px-5 py-4 mt-0">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {candidate.manifesto}
            </p>
          </TabsContent>
          <TabsContent value="feasibility" className="px-5 py-4 mt-0">
            <p className="font-body text-sm leading-relaxed text-muted-foreground">
              {candidate.feasibility}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
