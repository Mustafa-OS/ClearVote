import { useState, useEffect } from "react";
import { Candidate, parseCSVData, CSV_URL } from "@/data/candidates";

interface CandidateData {
  candidates: Candidate[];
  constituencies: string[];
  loading: boolean;
  error: string | null;
}

export function useCandidateData(): CandidateData {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [constituencies, setConstituencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        // Try fetching directly
        const res = await fetch(CSV_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const data = parseCSVData(text);
        setCandidates(data.candidates);
        setConstituencies(data.constituencies);
      } catch (err) {
        console.error("Failed to load CSV:", err);
        // Try CORS proxy as fallback
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(CSV_URL)}`;
          const res = await fetch(proxyUrl);
          if (!res.ok) throw new Error(`Proxy HTTP ${res.status}`);
          const text = await res.text();
          const data = parseCSVData(text);
          setCandidates(data.candidates);
          setConstituencies(data.constituencies);
        } catch (err2) {
          console.error("Proxy also failed:", err2);
          setError("Failed to load candidate data. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { candidates, constituencies, loading, error };
}
