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
import { Vote, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type SortOption = "credibility" | "feasibility" | "name";

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
      if (sortBy === "credibility") return b.credibilityScore - a.credibilityScore;
      if (sortBy === "feasibility") return b.feasibilityScore - a.feasibilityScore;
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
      <header className="bg-primary px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
            <Vote className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-primary-foreground">
              ClearVote
            </h1>
            <p className="font-body text-sm text-primary-foreground/60">
              Vote on policy, not personality
            </p>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5">
          <div className="min-w-[220px]">
            <Select value={constituency} onValueChange={(v) => { setConstituency(v); setHiddenIds(new Set()); }}>
              <SelectTrigger className="font-body rounded-xl border-border bg-background">
                <SelectValue placeholder="Select constituency" />
              </SelectTrigger>
              <SelectContent>
                {constituencies.map((c) => (
                  <SelectItem key={c} value={c} className="font-body">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-5">
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-foreground">
              <Checkbox
                checked={revealFace}
                onCheckedChange={(checked) => setRevealFace(checked === true)}
              />
              Reveal Identity
            </label>
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-foreground">
              <Checkbox
                checked={revealParty}
                onCheckedChange={(checked) => setRevealParty(checked === true)}
              />
              Reveal Party
            </label>
          </div>

          <div className="ml-auto min-w-[180px]">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="font-body rounded-xl border-border bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credibility" className="font-body">Sort by Credibility</SelectItem>
                <SelectItem value="feasibility" className="font-body">Sort by Feasibility</SelectItem>
                <SelectItem value="name" className="font-body">Sort by Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {constituency}
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? "s" : ""} showing
              {hiddenCount > 0 && (
                <span className="ml-1 text-accent">
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
              className="gap-2 rounded-xl font-body"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </Button>
          )}
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="font-body text-lg text-muted-foreground">
              All candidates have been removed.
            </p>
            <Button variant="outline" onClick={resetHidden} className="gap-2 rounded-xl font-body">
              <RotateCcw className="h-4 w-4" />
              Bring them all back
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-8">
        <p className="mx-auto max-w-6xl text-center font-body text-xs text-muted-foreground">
          ClearVote — Helping you vote on policy, not personality.
        </p>
      </footer>
    </div>
  );
};

export default Index;
