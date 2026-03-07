export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyAbbreviation: string;
  partyColor: string;
  constituency: string;
  gender: string;
  sittingMP: boolean;
  formerMP: boolean;
  votes: number;
  voteShare: number;
  shareChange: number | null;
}

const PARTY_COLORS: Record<string, string> = {
  "Labour": "0 72% 51%",
  "Conservative": "210 100% 35%",
  "Liberal Democrat": "35 100% 50%",
  "Green": "142 71% 35%",
  "Scottish Green Party": "142 71% 35%",
  "Reform UK": "195 100% 35%",
  "Scottish National Party": "45 100% 50%",
  "Plaid Cymru": "120 60% 35%",
  "Independent": "270 30% 50%",
  "Workers Party of Britain": "0 60% 40%",
  "Alba Party": "210 60% 45%",
  "Social Democratic Party": "200 50% 45%",
  "Heritage Party": "30 50% 40%",
  "UK Independence Party": "270 80% 35%",
  "Trade Unionist and Socialist Coalition": "0 80% 45%",
  "Scottish Family Party": "200 40% 50%",
};

const DEFAULT_PARTY_COLOR = "220 15% 50%";

function getPartyColor(party: string): string {
  return PARTY_COLORS[party] || DEFAULT_PARTY_COLOR;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseCSVData(csvText: string): {
  candidates: Candidate[];
  constituencies: string[];
} {
  const lines = csvText.split("\n").filter((l) => l.trim());
  // Skip header
  const dataLines = lines.slice(1);

  const candidatesMap = new Map<string, Candidate>();
  const constituencySet = new Set<string>();

  for (const line of dataLines) {
    const cols = parseCSVLine(line);
    if (cols.length < 20) continue;

    const constituency = cols[2];
    const partyName = cols[7];
    const partyAbbr = cols[8];
    const firstName = cols[12];
    const surname = cols[13];
    const gender = cols[14];
    const sittingMP = cols[15] === "Yes";
    const formerMP = cols[16] === "Yes";
    const votes = parseInt(cols[18]) || 0;
    const share = parseFloat(cols[19]) || 0;
    const change = cols[20] ? parseFloat(cols[20]) : null;

    const name = `${firstName} ${surname}`;
    const id = `${constituency}-${name}`.replace(/\s+/g, "-").toLowerCase();

    constituencySet.add(constituency);
    candidatesMap.set(id, {
      id,
      name,
      party: partyName,
      partyAbbreviation: partyAbbr,
      partyColor: getPartyColor(partyName),
      constituency,
      gender,
      sittingMP,
      formerMP,
      votes,
      voteShare: Math.round(share * 1000) / 10, // Convert to percentage
      shareChange: change !== null ? Math.round(change * 1000) / 10 : null,
    });
  }

  const constituencies = Array.from(constituencySet).sort();
  const candidates = Array.from(candidatesMap.values());

  return { candidates, constituencies };
}

// CSV URL
export const CSV_URL =
  "https://researchbriefings.files.parliament.uk/documents/CBP-10009/HoC-GE2024-results-by-candidate.csv";
