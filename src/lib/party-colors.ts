// Static party color mapping for UK political parties.
// Democracy Club doesn't provide party colors, so we maintain them here.
// Source: official party branding / Wikipedia.

const PARTY_COLORS: Record<string, { bg: string; fg: string }> = {
  // Major GB parties
  "Labour Party":                 { bg: "#E4003B", fg: "#FFFFFF" },
  "Labour and Co-operative Party": { bg: "#E4003B", fg: "#FFFFFF" },
  "Conservative and Unionist Party": { bg: "#0087DC", fg: "#FFFFFF" },
  "Liberal Democrats":            { bg: "#FAA61A", fg: "#000000" },
  "Green Party":                  { bg: "#6AB023", fg: "#FFFFFF" },
  "Reform UK":                    { bg: "#12B6CF", fg: "#FFFFFF" },
  "Scottish National Party (SNP)": { bg: "#FDF38E", fg: "#000000" },
  "Plaid Cymru - The Party of Wales": { bg: "#005B54", fg: "#FFFFFF" },

  // Northern Ireland parties
  "Sinn Féin":                    { bg: "#326760", fg: "#FFFFFF" },
  "Democratic Unionist Party - D.U.P.": { bg: "#D46A4C", fg: "#FFFFFF" },
  "Alliance - Alliance Party of Northern Ireland": { bg: "#F6CB2F", fg: "#000000" },
  "Social Democratic & Labour Party": { bg: "#2AA82C", fg: "#FFFFFF" },
  "Ulster Unionist Party":        { bg: "#48A5EE", fg: "#FFFFFF" },
  "Traditional Unionist Voice - TUV": { bg: "#0C3A6A", fg: "#FFFFFF" },

  // Smaller parties
  "Workers Party of Britain":     { bg: "#E91D50", fg: "#FFFFFF" },
  "Heritage Party":               { bg: "#0A2F5C", fg: "#FFFFFF" },
  "Social Democratic Party":      { bg: "#C41E3A", fg: "#FFFFFF" },
  "Trade Unionist and Socialist Coalition": { bg: "#EC008C", fg: "#FFFFFF" },
  "Communist Party of Britain":   { bg: "#CC0000", fg: "#FFFFFF" },
  "Women's Equality Party":       { bg: "#68C468", fg: "#FFFFFF" },
  "Yorkshire Party":              { bg: "#00AEEF", fg: "#FFFFFF" },
  "English Democrats":            { bg: "#2D2F87", fg: "#FFFFFF" },
  "Monster Raving Loony Party":   { bg: "#FFF000", fg: "#000000" },
  "Rejoin EU":                    { bg: "#003399", fg: "#FFFFFF" },
  "Volt UK":                      { bg: "#502379", fg: "#FFFFFF" },
  "UK Independence Party (UKIP)": { bg: "#70147A", fg: "#FFFFFF" },
  "British Democrats":            { bg: "#1C1C6E", fg: "#FFFFFF" },
  "Climate Party":                { bg: "#2E8B57", fg: "#FFFFFF" },
  "Ashfield Independents":        { bg: "#FF6600", fg: "#FFFFFF" },

  // Independent / Speaker
  "Independent":                  { bg: "#888888", fg: "#FFFFFF" },
  "Speaker seeking re-election":  { bg: "#444444", fg: "#FFFFFF" },
};

const DEFAULT_COLOR = { bg: "#888888", fg: "#FFFFFF" };

export function getPartyColor(partyName: string): { bg: string; fg: string } {
  // Try exact match first
  if (PARTY_COLORS[partyName]) {
    return PARTY_COLORS[partyName];
  }

  // Try partial match (some party names vary slightly)
  const lowerName = partyName.toLowerCase();
  for (const [key, value] of Object.entries(PARTY_COLORS)) {
    if (lowerName.includes(key.toLowerCase().split(" ")[0])) {
      return value;
    }
  }

  return DEFAULT_COLOR;
}
