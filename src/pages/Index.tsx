import { useState, useMemo } from "react";
import { useCandidateData } from "@/hooks/useCandidateData";
import CandidateCard from "@/components/CandidateCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Vote, Loader2 } from "lucide-react";

type SortOption = "votes" | "share" | "name";

const Index = () => {
  const { candidates, constituencies, loading, error } = useCandidateData();
  const [constituency, setConstituency] = useState<string>("");
  const [revealFace, setRevealFace] = useState(false);
  const [revealParty, setRevealParty] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("votes");

  // Set default constituency once data loads
  const selectedConstituency = constituency || constituencies[0] || "";

  const filteredCandidates = useMemo(() => {
    if (!selectedConstituency) return [];
    const filtered = candidates.filter((c) => c.constituency === selectedConstituency);
    return filtered.sort((a, b) => {
      if (sortBy === "votes") return b.votes - a.votes;
      if (sortBy === "share") return b.voteShare - a.voteShare;
      return a.name.localeCompare(b.name);
    });
  }, [selectedConstituency, sortBy, candidates]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="font-body text-muted-foreground">Loading candidate data…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-body text-destructive">{error}</p>
      </div>
    );
  }

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
              Unbiased candidate information · {constituencies.length} constituencies · GE 2024
            </p>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6">
          {/* Constituency Dropdown */}
          <div className="min-w-[280px]">
            <Select value={selectedConstituency} onValueChange={setConstituency}>
              <SelectTrigger className="font-body">
                <SelectValue placeholder="Select constituency" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
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
                <SelectItem value="votes" className="font-body">Sort by Votes</SelectItem>
                <SelectItem value="share" className="font-body">Sort by Vote Share</SelectItem>
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
            {selectedConstituency}
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            {filteredCandidates.length} candidates standing
          </p>
        </div>

        {filteredCandidates.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="flex gap-6 pb-4">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  revealFace={revealFace}
                  revealParty={revealParty}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="py-20 text-center">
            <p className="font-body text-lg text-muted-foreground">
              No candidates found for this constituency.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-6">
        <p className="mx-auto max-w-6xl text-center font-body text-xs text-muted-foreground">
          ClearVote — Helping you vote on policy, not personality. Data sourced from UK Parliament Research Briefings (GE 2024).
        </p>
      </footer>
    </div>
  );
};

export default Index;
