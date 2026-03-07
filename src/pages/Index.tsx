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
import { Vote } from "lucide-react";

type SortOption = "credibility" | "feasibility" | "name";

const Index = () => {
  const [constituency, setConstituency] = useState(constituencies[0]);
  const [revealFace, setRevealFace] = useState(false);
  const [revealParty, setRevealParty] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("credibility");

  const filteredCandidates = useMemo(() => {
    const filtered = candidates.filter((c) => c.constituency === constituency);
    return filtered.sort((a, b) => {
      if (sortBy === "credibility") return b.credibilityScore - a.credibilityScore;
      if (sortBy === "feasibility") return b.feasibilityScore - a.feasibilityScore;
      return a.name.localeCompare(b.name);
    });
  }, [constituency, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-primary px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <Vote className="h-8 w-8 text-accent" />
          <div>
            <h1 className="font-display text-2xl font-bold text-primary-foreground">
              ClearVote
            </h1>
            <p className="font-body text-sm text-primary-foreground/70">
              Unbiased candidate information for informed voting
            </p>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6">
          {/* Constituency Dropdown */}
          <div className="min-w-[260px]">
            <Select value={constituency} onValueChange={setConstituency}>
              <SelectTrigger className="font-body">
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

          {/* Reveal toggles */}
          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm">
              <Checkbox
                checked={revealFace}
                onCheckedChange={(checked) => setRevealFace(checked === true)}
              />
              Reveal Identity
            </label>
            <label className="flex cursor-pointer items-center gap-2 font-body text-sm">
              <Checkbox
                checked={revealParty}
                onCheckedChange={(checked) => setRevealParty(checked === true)}
              />
              Reveal Party
            </label>
          </div>

          {/* Sort dropdown */}
          <div className="ml-auto min-w-[180px]">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="font-body">
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
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {constituency}
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {filteredCandidates.length} candidates standing
          </p>
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                revealFace={revealFace}
                revealParty={revealParty}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-body text-lg text-muted-foreground">
              No candidates found for this constituency yet.
            </p>
            <p className="font-body text-sm text-muted-foreground">
              Data is being added for more constituencies — check back soon.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-6">
        <p className="mx-auto max-w-6xl text-center font-body text-xs text-muted-foreground">
          ClearVote — Helping you vote on policy, not personality. Scores are based on independent analysis of manifesto commitments, voting records, and expert assessments.
        </p>
      </footer>
    </div>
  );
};

export default Index;
