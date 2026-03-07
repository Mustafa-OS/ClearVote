import { useState, useMemo } from "react";
import { constituencies, candidates, Candidate } from "@/data/candidates";
import CandidateCard from "@/components/CandidateCard";
import CandidateModal from "@/components/CandidateModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Vote, RotateCcw, Users, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";

type SortOption = "credibility" | "name";

const Index = () => {
  const [constituency, setConstituency] = useState(constituencies[0]);
  const [revealFace, setRevealFace] = useState(false);
  const [revealParty, setRevealParty] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("credibility");
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredCandidates = useMemo(() => {
    const filtered = candidates
      .filter((c) => c.constituency === constituency)
      .filter((c) => !hiddenIds.has(c.id));
    return filtered.sort((a, b) => {
      if (sortBy === "credibility") return b.credibility - a.credibility;
      return a.name.localeCompare(b.name);
    });
  }, [constituency, sortBy, hiddenIds]);

  const totalInConstituency = candidates.filter((c) => c.constituency === constituency).length;
  const hiddenCount = totalInConstituency - filteredCandidates.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 px-6 py-12">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 shadow-lg backdrop-blur-sm">
            <Vote className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl text-primary-foreground">ClearVote</h1>
          <p className="mt-2 max-w-md font-body text-sm font-light text-primary-foreground/60">
            Strip away the spin. Compare candidates on what actually matters — their policies, credibility, and feasibility.
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-10 border-b border-border/60 bg-card/80 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5">
          <Select value={constituency} onValueChange={(v) => { setConstituency(v); setHiddenIds(new Set()); }}>
            <SelectTrigger className="w-[200px] rounded-xl font-body text-sm border-border/60 bg-background shadow-sm">
              <SelectValue placeholder="Select constituency" />
            </SelectTrigger>
            <SelectContent>
              {constituencies.map((c) => (
                <SelectItem key={c} value={c} className="font-body text-sm">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Toggle controls — much clearer */}
          <div className="flex items-center gap-5 rounded-xl bg-muted/60 px-4 py-2">
            <div className="flex items-center gap-2.5">
              {revealFace ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              <label className="font-body text-sm font-medium text-foreground">Identity</label>
              <Switch checked={revealFace} onCheckedChange={setRevealFace} />
            </div>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2.5">
              {revealParty ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              <label className="font-body text-sm font-medium text-foreground">Party</label>
              <Switch checked={revealParty} onCheckedChange={setRevealParty} />
            </div>
          </div>

          <div className="ml-auto">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[160px] rounded-xl font-body text-sm border-border/60 bg-background shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credibility" className="font-body text-sm">By Credibility</SelectItem>
                <SelectItem value="name" className="font-body text-sm">By Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl text-foreground">{constituency}</h2>
            <p className="mt-1 flex items-center gap-1.5 font-body text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""}
              {hiddenCount > 0 && (
                <span className="ml-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                  {hiddenCount} removed
                </span>
              )}
            </p>
          </div>
          {hiddenCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHiddenIds(new Set())}
              className="gap-1.5 rounded-xl font-body text-xs shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </Button>
          )}
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  revealFace={revealFace}
                  revealParty={revealParty}
                  onHide={() => setHiddenIds((prev) => new Set(prev).add(candidate.id))}
                  onClick={() => setSelectedCandidate(candidate)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-muted/40 py-20">
            <p className="font-body text-base text-muted-foreground">All candidates removed</p>
            <Button
              variant="outline"
              onClick={() => setHiddenIds(new Set())}
              className="gap-2 rounded-xl font-body text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Bring them all back
            </Button>
          </div>
        )}
      </main>

      {/* Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        open={!!selectedCandidate}
        onOpenChange={(open) => { if (!open) setSelectedCandidate(null); }}
        revealFace={revealFace}
        revealParty={revealParty}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card px-6 py-8">
        <p className="mx-auto max-w-6xl text-center font-body text-xs text-muted-foreground">
          ClearVote — Strip away the spin. Vote on policy.
        </p>
      </footer>
    </div>
  );
};

export default Index;
