<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep demo learning progress in scenario-scoped React state and calculate it with the shared learning helpers, so completed decisions reward progress once and timeline ordering is testable without implying real account changes.
- The page has a Customer view and an IF internal view; customer-facing sections must never show IF business metrics or tags, so the customer experience stays human-centred.
- Demo state is saved to localStorage only after hydration and cleared by "Reset demo", so a refresh keeps the demo story without SSR mismatches.
- UI strings that switch language live in src/lib/i18n.ts, so EN/FI can grow in one place.
- Use shared accessible support sections for verified external help and keyboard guidance; keep help available in calm focus without gating it behind learning.
- Use Radix dialogs for demo action flows so Escape and keyboard focus are managed by accessible primitives.
- Keep customer insurance profiles and concept eligibility in shared browser-safe helpers; use customer-and-scenario keys for demo progress so switching customers cannot share decisions, and never use insurance breadth to change risk urgency.
- Contact requests are created only from the customer's own action and show the advisor only customer-approved context, so the warm handoff never exposes raw risk data; presenter/pilot material lives in the header 'Pilot & concept' dialog to keep the internal view a lean advisor tool.

- Keep the advisor workspace request-driven using the shared advisor helper: discussion areas come only from the chosen contact topic, never risk signals; hide customer scores and keep historical records unavailable unless actually connected.

- Keep pilot economics in a shared tested annual-assumption helper, separate from demo actions and pilot cash return; never present clicks or illustrative premiums as verified claims savings or profit.
- Keep presenter controls in the presentational DemoControls component and customer decisions in the route controller, so visual changes cannot alter scenario persistence or risk priority.
- Organize PilotConcept with accessible overview, economics and plan tabs, so executive material remains separate from customer and advisor workflows.
- Keep day-story follow-ups and live-data parsing in the shared story-engine helper, with public open-data fetches in a server function, so morning choices shape later messages and the pinned story never depends on live APIs.
- Project Mila's pinned day through the browser-safe mila-journey model in both customer and pilot views; derive completion only from completed demo actions and persist the selected moment with customer-scoped choices, so postponement and presentation never imply real account or travel outcomes.
