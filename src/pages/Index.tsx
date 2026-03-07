import { useState, useMemo, useEffect } from "react";
import { useCandidates, useConstituencies, useCandidatePhotos } from "@/hooks/use-mps";
import type { MP } from "@/types/mp";
import CandidateCard from "@/components/CandidateCard";
import CandidateModal from "@/components/CandidateModal";
import { ConstituencyCombobox } from "@/components/ConstituencyCombobox";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Users, Eye, EyeOff, AlertCircle, RefreshCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: candidates, isLoading, error, refetch } = useCandidates();
  const constituencies = useConstituencies(candidates);
  const [constituency, setConstituency] = useState("");
  const [revealFace, setRevealFace] = useState(false);
  const [revealParty, setRevealParty] = useState(false);
  const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
  const [selectedCandidate, setSelectedCandidate] = useState<MP | null>(null);

  // Set default constituency once data loads
  useEffect(() => {
    if (constituencies.length > 0 && !constituency) {
      setConstituency(constituencies[0]);
    }
  }, [constituencies, constituency]);

  // Filter candidates for selected constituency
  const filteredCandidates = useMemo(() => {
    if (!candidates || !constituency) return [];
    return candidates
      .filter((c) => c.constituency === constituency)
      .filter((c) => !hiddenIds.has(c.id))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [candidates, constituency, hiddenIds]);

  // Lazy-load photos for candidates in the current constituency
  const photoMap = useCandidatePhotos(filteredCandidates);

  // Merge photos into candidates for display
  const candidatesWithPhotos = useMemo(() => {
    if (photoMap.size === 0) return filteredCandidates;
    return filteredCandidates.map((c) => {
      const photo = photoMap.get(c.personId);
      if (photo && photo !== c.thumbnailUrl) {
        return { ...c, thumbnailUrl: photo };
      }
      return c;
    });
  }, [filteredCandidates, photoMap]);

  const totalInConstituency = candidates
    ? candidates.filter((c) => c.constituency === constituency).length
    : 0;
  const hiddenCount = totalInConstituency - filteredCandidates.length;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="relative overflow-hidden bg-gradient-to-br from-[#4a6fa5] via-[#6b8fc4] to-[#89a8d4] px-6 py-12">
          <div className="absolute inset-0">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/5 blur-3xl" />
            <div className="absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
            <img src="/logo.png" alt="ClearVote" className="mb-2 h-40 w-auto mix-blend-multiply" />
            <p className="max-w-md font-body text-sm font-light text-primary-foreground/60">
              Loading 2024 election candidate data...
            </p>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Skeleton className="mb-8 h-10 w-[280px] rounded-xl" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <Skeleton className="h-2 w-full" />
                <div className="flex flex-col items-center p-7">
                  <Skeleton className="mb-4 h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="mt-2 h-5 w-20" />
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="font-display text-xl text-foreground">Unable to load candidate data</h2>
        <p className="max-w-md text-center font-body text-sm text-muted-foreground">
          {error instanceof Error ? error.message : "An unexpected error occurred while fetching data from Democracy Club."}
        </p>
        <Button
          onClick={() => refetch()}
          className="mt-2 gap-2 rounded-xl font-body text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#4a6fa5] via-[#6b8fc4] to-[#89a8d4] px-6 py-12">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
          <img src="/logo.png" alt="ClearVote" className="mb-2 h-40 w-auto mix-blend-multiply" />
          <p className="max-w-md font-body text-sm font-light text-primary-foreground/60">
            Choose Ideas not Labels
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-10 border-b border-border/60 bg-card/80 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-5">
          <ConstituencyCombobox
            constituencies={constituencies}
            value={constituency}
            onValueChange={(v) => {
              setConstituency(v);
              setHiddenIds(new Set());
            }}
          />

          {/* Toggle controls */}
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

        {candidatesWithPhotos.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {candidatesWithPhotos.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  revealFace={revealFace}
                  revealParty={revealParty}
                  onHide={() => setHiddenIds((prev) => new Set(prev).add(candidate.id))}
                  onClick={() => setSelectedCandidate(candidate)}
                />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-muted/40 py-20">
            <p className="font-body text-base text-muted-foreground">
              {constituency ? "All candidates removed" : "Select a constituency to view candidates"}
            </p>
            {hiddenCount > 0 && (
              <Button
                variant="outline"
                onClick={() => setHiddenIds(new Set())}
                className="gap-2 rounded-xl font-body text-sm"
              >
                <RotateCcw className="h-4 w-4" />
                Bring them all back
              </Button>
            )}
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
          ClearVote — Choose Ideas not Labels. Data from Democracy Club.
        </p>
      </footer>
    </div>
  );
};

export default Index;
