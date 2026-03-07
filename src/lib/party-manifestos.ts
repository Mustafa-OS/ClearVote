/**
 * Summarised 2024 General Election manifesto pledges by party.
 * Each entry is a short bullet-point summary of the party's key promises.
 * Based on the actual published manifestos for the July 2024 election.
 */

const PARTY_MANIFESTOS: Record<string, string> = {
  "Labour Party":
    "• Create Great British Energy, a publicly owned clean energy company\n" +
    "• Recruit 6,500 new teachers and modernise the curriculum\n" +
    "• Cut NHS waiting lists with 40,000 extra appointments per week\n" +
    "• Build 1.5 million new homes over the parliament\n" +
    "• Establish a new Border Security Command to tackle small boat crossings",

  "Conservative and Unionist Party":
    "• Cut employee National Insurance to 6% by 2027\n" +
    "• Introduce National Service for 18-year-olds\n" +
    "• Cap migration with a legally binding target reducing annually\n" +
    "• Build 1.6 million homes and protect the Green Belt\n" +
    "• Increase defence spending to 2.5% of GDP by 2030",

  "Liberal Democrats":
    "• Fix the NHS and social care crisis with a dedicated health and care fund\n" +
    "• Tackle the sewage scandal and hold water companies to account\n" +
    "• Rejoin the EU Single Market to boost trade and growth\n" +
    "• Invest in renewable energy and insulate 10 million homes\n" +
    "• Restore trust in politics with electoral reform and a fair voting system",

  "Green Party":
    "• Invest £40bn per year in a Green New Deal for climate and nature\n" +
    "• Introduce a wealth tax on assets over £10 million\n" +
    "• Bring railways, water and energy into public ownership\n" +
    "• Provide free personal care and a fully funded NHS\n" +
    "• Build 150,000 new social homes per year",

  "Reform UK":
    "• Freeze non-essential immigration and leave the ECHR\n" +
    "• Lift income tax thresholds to £20,000 and scrap IR35\n" +
    "• Cut Net Zero mandates and fast-track domestic energy production\n" +
    "• Zero waiting lists through NHS reform and private sector partnerships\n" +
    "• Increase police numbers and introduce tougher sentencing",

  "Scottish National Party (SNP)":
    "• Campaign for Scottish independence and an independence referendum\n" +
    "• Oppose Tory and Labour austerity; protect Scottish public services\n" +
    "• Rejoin the EU as an independent Scotland\n" +
    "• Invest in Scotland's renewable energy potential\n" +
    "• Scrap Trident nuclear weapons and invest savings in public services",

  "Plaid Cymru - The Party of Wales":
    "• Deliver fair funding for Wales and reform the Barnett formula\n" +
    "• Campaign for Welsh independence and a stronger Senedd\n" +
    "• Invest in Welsh language, culture and communities\n" +
    "• Create green jobs and a just transition for Welsh industry\n" +
    "• Ensure HS2 consequential funding reaches Wales",

  "Workers Party of Britain":
    "• Nationalise key industries including energy, water and transport\n" +
    "• Withdraw from NATO and pursue a non-aligned foreign policy\n" +
    "• Invest in council housing and cap private rents\n" +
    "• Free education from nursery through to university\n" +
    "• End austerity with investment in public services",

  "Social Democratic and Labour Party":
    "• Protect the Good Friday Agreement and work for Irish unity by consent\n" +
    "• Invest in Northern Ireland's public services and NHS\n" +
    "• Tackle the cost of living with targeted support for families\n" +
    "• Promote reconciliation and cross-community cooperation\n" +
    "• Strengthen environmental protections for Northern Ireland",

  "Alliance - Alliance Party of Northern Ireland":
    "• Reform Northern Ireland's institutions to end sectarian division\n" +
    "• Protect and strengthen the Windsor Framework for NI trade\n" +
    "• Invest in integrated education and shared housing\n" +
    "• Tackle the cost of living and reform public services\n" +
    "• Champion climate action and green infrastructure",

  "Democratic Unionist Party - D.U.P.":
    "• Strengthen Northern Ireland's place within the United Kingdom\n" +
    "• Reform the Windsor Framework to reduce trade barriers\n" +
    "• Tackle NHS waiting lists and invest in healthcare\n" +
    "• Support businesses with lower regulation and rates\n" +
    "• Increase security and tackle paramilitarism",

  "Sinn Féin":
    "• Campaign for a referendum on Irish unity\n" +
    "• Invest in public services and end Tory austerity\n" +
    "• Deliver affordable housing and tackle homelessness\n" +
    "• Protect workers' rights and raise the minimum wage\n" +
    "• Oppose Brexit and seek EU alignment for Northern Ireland",

  "Ulster Unionist Party":
    "• Defend Northern Ireland's constitutional position in the UK\n" +
    "• Fix the Windsor Framework to restore full UK internal trade\n" +
    "• Transform health and social care with integrated services\n" +
    "• Support veterans and strengthen the armed forces covenant\n" +
    "• Invest in infrastructure and skills for economic growth",
};

/**
 * Look up manifesto summary for a party.
 * Falls back to partial match, then returns undefined for independents/minor parties.
 */
export function getPartyManifesto(partyName: string): string | undefined {
  // Exact match
  if (PARTY_MANIFESTOS[partyName]) {
    return PARTY_MANIFESTOS[partyName];
  }

  // Partial match (e.g. "Green Party of England and Wales" → "Green Party")
  const lower = partyName.toLowerCase();
  for (const [key, value] of Object.entries(PARTY_MANIFESTOS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value;
    }
  }

  return undefined;
}
