# 🗳️ ClearVote

**A blind taste test for UK politics: compare your local election candidates on what they promise, with their names, faces and parties hidden until you choose to reveal them.**

**[▶ Try the live demo](https://mustafa-os.github.io/ClearVote/#/)** · React · TypeScript · Vite · Tailwind · TanStack Query · Built at the Claude AI hackathon

![ClearVote in blind mode: anonymised candidate cards showing only key pledges](docs/img/blind-mode.png)

## At a glance

- 🗺️ **All 650 constituencies** from the July 2024 UK General Election, using live data from the Democracy Club API.
- 🙈 **Judge the ideas, not the brand.** Candidates appear as "Candidate 2003" with identical cards: no names, photos, party colours or logos.
- 🔄 **Reveal when ready.** Flip the Identity and Party toggles to see who you actually agreed with.
- ⚡ **Fast with no backend.** Everything runs in the browser; the full candidate list is cached, so switching constituencies is instant after the first load.

## How it works

1. **Pick a constituency** and read each candidate's key pledges, taken from their party's 2024 manifesto.
2. **Rule candidates out** as you go, or open any card for the full pledge list and a link to their [WhoCanIVoteFor](https://whocanivotefor.co.uk) profile.
3. **Flip the toggles** to reveal photos, names and colour-coded party badges:

![The same constituency with identity and party revealed: photos, names and party badges appear](docs/img/revealed-mode.png)

<details>
<summary><b>Technical details</b></summary>

A single-page React app with no backend — everything runs in the browser:

- **Live election data** is fetched from the [Democracy Club](https://candidates.democracyclub.org.uk) candidates API (every ballot for `parl.2024-07-04`). The 13 paginated requests are batched three at a time with 500 ms pauses to stay inside the API's rate limits
- **TanStack Query** caches the full candidate set for an hour, so switching constituencies is instant after the first load
- **Candidate photos are lazy-loaded** per constituency from the person endpoint (cached for 24 hours) rather than fetching thousands of images upfront
- A **mapping layer** (`src/lib/candidate-mapper.ts`) converts raw ballots into a clean domain model, attaching party colours (`party-colors.ts`) and manifesto summaries
- **Key pledges** are short summaries of the 13 largest parties' published 2024 manifestos (`src/lib/party-manifestos.ts`); candidates from other parties are labelled as having no credible manifesto source
- The domain model reserves **credibility and feasibility fields** — the UI already renders scoring panels when those are populated, the planned next step

**Stack:** React 18 + TypeScript · Vite · Tailwind CSS + shadcn/ui (Radix primitives) · TanStack Query · React Router · Framer Motion · deployed to GitHub Pages via GitHub Actions

</details>

## Run it

```bash
npm install
npm run dev     # Vite dev server on http://localhost:8080
npm run build   # production build to dist/
npm test        # Vitest
```

No API keys required — the Democracy Club API is public.

## About

Built at the Claude AI hackathon in March 2026: prototyped from a Lovable template, then built out with Claude Code and hand-written TypeScript. Candidate data from [Democracy Club](https://democracyclub.org.uk).

---

<sub>Built by <b>Mustafa Suleman</b>, MEng Design Engineering, Imperial College London · <a href="https://github.com/Mustafa-OS">More projects</a> · <a href="https://www.linkedin.com/in/mustafaosuleman/">LinkedIn</a></sub>
