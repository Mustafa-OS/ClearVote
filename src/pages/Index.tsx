import { useState, useMemo } from "react";
import { constituencies, candidates } from "@/data/candidates";
import CandidateCard from "@/components/CandidateCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Vote, RotateCcw, Eye, EyeOff, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortOption = "credibility" | "name";

const Index = () => {
  const [constituency, setConstituency] = useState(constituencies[0]);
  const [revealFace, setRevealFace] = useState(false);
  const [revealParty, setRevealParty] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("credibility");
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

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

  const hideCandidate = (id: string) => {
    setHiddenIds((prev) => new Set(prev).add(id));
  };

  const resetHidden = () => {
    setHiddenIds(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-primary px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(230_65%_60%/0.4),transparent_70%)]" />
        <div className="relative mx-auto flex max-w-6xl items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 backdrop-blur-sm">
            <Vote className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl text-primary-foreground">
              ClearVote
            </h1>
            <p className="font-body text-xs font-light tracking-wide text-primary-foreground/50">
              Vote on policy, not personality
            </p>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/95 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
          <Select value={constituency} onValueChange={(v) => { setConstituency(v); setHiddenIds(new Set()); }}>
            <SelectTrigger className="w-[200px] font-body text-sm border-border bg-background">
              <SelectValue placeholder="Select constituency" />
            </SelectTrigger>
            <SelectContent>
              {constituencies.map((c) => (
                <SelectItem key={c} value={c} className="font-body text-sm">{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4">
            <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox
                checked={revealFace}
                onCheckedChange={(checked) => setRevealFace(checked === true)}
                className="h-3.5 w-3.5"
              />
              Identity
            </label>
            <label className="flex cursor-pointer items-center gap-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox
                checked={revealParty}
                onCheckedChange={(checked) => setRevealParty(checked === true)}
                className="h-3.5 w-3.5"
              />
              Party
            </label>
          </div>

          <div className="ml-auto">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[160px] font-body text-sm border-border bg-background">
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
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl text-foreground">
              {constituency}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 font-body text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""}
              {hiddenCount > 0 && (
                <span className="text-destructive/70">
                  · {hiddenCount} removed
                </span>
              )}
            </p>
          </div>
          {hiddenCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetHidden}
              className="gap-1.5 font-body text-xs h-8"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          )}
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                revealFace={revealFace}
                revealParty={revealParty}
                onHide={() => hideCandidate(candidate.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20">
            <p className="font-body text-sm text-muted-foreground">
              All candidates removed
            </p>
            <Button variant="outline" size="sm" onClick={resetHidden} className="gap-1.5 font-body text-xs">
              <RotateCcw className="h-3 w-3" />
              Bring them back
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-6">
        <p className="mx-auto max-w-6xl text-center font-body text-[11px] text-muted-foreground">
          ClearVote — Vote on policy, not personality
        </p>
      </footer>
    </div>
  );
};

export default Index;
