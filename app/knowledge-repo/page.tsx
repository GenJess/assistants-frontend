"use client";

const knowledgeItems = [
  {
    id: "poly402",
    title:
      "Poly402: Architectural Blueprint for a Cross-Chain Prediction Market Mini-App",
    category: "Deep Research",
    updatedAt: "2025-09-14",
    tags: ["x402", "polymarket", "mini-apps"],
    summary:
      "Intent-based mini-app architecture connecting Farcaster, Telegram, and Polymarket with x402 payments.",
  },
];

const KnowledgeRepoPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-10">
      <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_-50px_rgba(15,23,42,0.8)]">
        <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
          Knowledge repo
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Knowledge that stays consistent across agents.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Centralize deep research, implementation notes, and strategic
              decisions. Agents can browse the list, open a record, and follow a
              consistent format when adding new knowledge.
            </p>
          </div>
          <button className="rounded-full border border-white/10 bg-white/10 px-6 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-white/30 hover:bg-white/20">
            Add knowledge
          </button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
            Knowledge list
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Browse the catalog. Select a record to view or update its structured
            content.
          </p>
          <ul className="mt-4 space-y-3">
            {knowledgeItems.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border border-white/10 bg-white/10 p-4"
              >
                <div className="text-sm font-semibold text-white">
                  {item.title}
                </div>
                <p className="mt-2 text-xs text-slate-400">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-slate-300">
                  <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                    Updated {item.updatedAt}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-white">
              How to add new knowledge
            </h2>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <span className="font-semibold text-slate-100">1.</span> Start
                with the title, category, and a short summary that helps agents
                decide if the entry is relevant.
              </li>
              <li>
                <span className="font-semibold text-slate-100">2.</span> Follow
                the section order: Context, Technical Notes, Decisions, and
                Next Steps.
              </li>
              <li>
                <span className="font-semibold text-slate-100">3.</span> Keep
                formatting consistent with bullet lists, numbered steps, and
                highlighted metrics so the UI remains scannable on mobile.
              </li>
            </ol>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
                  Deep research
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  Poly402: Architectural Blueprint for a Cross-Chain Prediction
                  Market Mini-App
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wide text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                  x402
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                  Polymarket
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1">
                  Mini Apps
                </span>
              </div>
            </div>

            <article className="mt-6 space-y-6 text-sm leading-relaxed text-slate-200">
              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  1. The Convergence of Super-App Runtimes and Agentic Commerce
                </h3>
                <p>
                  The digital asset ecosystem is currently witnessing the
                  simultaneous maturation of three distinct but complementary
                  architectural trends: the evolution of &quot;Super App&quot;
                  distribution channels, the emergence of autonomous
                  &quot;Agentic&quot; payment protocols, and the
                  institutionalization of decentralized information markets.
                  The intersection of these trends offers a fertile ground for
                  application development that moves beyond simple token
                  speculation into functional, utility-driven software. This
                  report outlines the strategic and technical blueprint for
                  &quot;Poly402,&quot; a unified Mini App designed to operate
                  seamlessly across Farcaster and Telegram. This application
                  integrates the x402 payment standard to facilitate
                  friction-free interaction with Polymarket&apos;s prediction
                  data, solving the endemic user experience challenge of
                  cross-chain execution through an intent-based architecture.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  1.1 The Renaissance of the Mini App Model
                </h4>
                <p>
                  The &quot;Mini App&quot; paradigm—lightweight, context-aware
                  applications running within a host &quot;Super App&quot;—has
                  long been dominant in Asian markets (e.g., WeChat) but is only
                  now achieving saturation in the Western crypto-native stack.
                  This shift is driven by the realization that user attention
                  is fragmented across social feeds, and requiring users to
                  leave a feed to interact with a standalone dApp results in
                  catastrophic funnel drop-off.
                </p>
                <p>
                  In the Farcaster ecosystem, this evolution is codified in the
                  transition from &quot;Frames v1&quot; to &quot;Frames v2&quot;
                  (now officially termed Mini Apps). Frames v1 relied on the
                  Open Graph protocol, essentially hacking static image metadata
                  to provide crude interactivity (four buttons and an image).
                  While novel, this approach was plagued by high latency,
                  limited statefulness, and a restrictive UI canvas. Frames v2
                  addresses these limitations by embedding a fully functional
                  webview within the Farcaster client (Warpcast). This allows
                  developers to deploy standard HTML/CSS/JS applications that
                  have access to a rich context object containing the user&apos;s
                  Farcaster ID (FID), wallet address, and notification tokens.
                </p>
                <p>
                  Simultaneously, Telegram has aggressively expanded its &quot;Web
                  Apps&quot; platform (tApps), allowing bots to launch
                  JavaScript-based interfaces that replace the traditional
                  command-line chat interaction. These apps support haptic
                  feedback, theme integration, and direct wallet connectivity
                  (TON Connect).
                </p>
                <p>
                  The strategic implication for &quot;Poly402&quot; is profound:
                  both Farcaster and Telegram environments are effectively
                  wrappers around a mobile webview. By utilizing a &quot;Write
                  Once, Run Everywhere&quot; strategy, a single codebase (built
                  on Next.js) can serve both platforms. The application simply
                  needs to inspect the window context at runtime—checking for
                  window.Telegram.WebApp or the farcaster-sdk context—to hydrate
                  the appropriate hooks. This unified approach satisfies the
                  requirement for &quot;ease and speed of development&quot; while
                  maximizing the total addressable market (TAM).
                </p>
                <h4 className="text-sm font-semibold text-white">
                  1.2 The &quot;Original Sin&quot; of HTTP and the x402 Solution
                </h4>
                <p>
                  A core constraint in modern web monetization is the friction
                  of payment. The HTTP protocol, defined in the early 1990s,
                  included error codes for client errors (400 Bad Request) and
                  unauthorized access (401 Unauthorized), but notably reserved
                  code 402 Payment Required for a future digital cash system
                  that never materialized. Consequently, web monetization
                  evolved around ad-supported models or cumbersome subscription
                  silos (paywalls), both of which are ill-suited for the atomic,
                  high-frequency transactions of the AI agent economy.
                </p>
                <p>
                  The x402 Protocol revives this dormant status code to create a
                  native internet payment layer. It functions as a middleware
                  standard: when a client (human or agent) requests a resource,
                  the server responds with a 402 status and a header detailing
                  the price, token (e.g., USDC), and destination address on a
                  high-throughput chain like Base. The client signs the
                  transaction, broadcasts it, and resends the request with a
                  proof-of-payment header.
                </p>
                <p>
                  For &quot;Poly402,&quot; x402 is not merely a payment gateway;
                  it is the enabler of Agentic Commerce. By moving the payment
                  logic to the HTTP layer, we decouple the &quot;intent to pay&quot;
                  from the &quot;execution of the trade.&quot; This allows the
                  application to act as a solver: the user pays USDC on Base
                  (where their social wallet lives), and the application
                  backend—acting as an agent—executes the complex trade on
                  Polygon (where Polymarket liquidity lives). This abstraction
                  is critical for meeting the &quot;impressiveness&quot; and
                  &quot;premium feel&quot; requirements, as it hides the messy
                  reality of bridging and network switching from the end user.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  1.3 The Polymarket Data Opportunity
                </h4>
                <p>
                  Polymarket has established itself as the premier source of
                  &quot;truth&quot; in the prediction market space, leveraging
                  the wisdom of crowds to price probabilities of real-world
                  events. However, its architecture presents a hurdle for
                  casual users. It operates on the Polygon Proof-of-Stake (PoS)
                  network and utilizes the Conditional Tokens Framework (CTF)
                  for binary outcome shares.
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-slate-300">
                  <li>Onboard to a Polygon-compatible wallet.</li>
                  <li>Bridge USDC to Polygon (specifically USDC.e).</li>
                  <li>
                    Sign EIP-712 orders for the Central Limit Order Book (CLOB).
                  </li>
                </ol>
                <p>
                  This friction is antithetical to the &quot;Mini App&quot; ethos,
                  which demands instant gratification. &quot;Poly402&quot;
                  positions itself as the interface layer. It does not seek to
                  replace the Polymarket frontend for power users but rather to
                  offer a &quot;lite&quot; betting terminal for social users. By
                  fetching data via the Gamma API (read layer) and executing
                  trades via a server-side agent (write layer), Poly402 bridges
                  the gap between the social graph on Base and the liquidity
                  graph on Polygon.
                </p>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/10 p-4 text-xs text-slate-300">
                  <table className="min-w-[520px] text-left">
                    <thead className="text-[10px] uppercase tracking-wide text-slate-400">
                      <tr>
                        <th className="pb-2 pr-4">Feature</th>
                        <th className="pb-2 pr-4">Farcaster Frames v2</th>
                        <th className="pb-2 pr-4">Telegram Mini Apps</th>
                        <th className="pb-2 pr-4">Polymarket Direct</th>
                        <th className="pb-2">Poly402 (Proposed)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      <tr>
                        <td className="py-2 pr-4">Runtime</td>
                        <td className="py-2 pr-4">In-App Webview</td>
                        <td className="py-2 pr-4">In-App Webview</td>
                        <td className="py-2 pr-4">Browser dApp</td>
                        <td className="py-2">Unified Webview</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Primary Chain</td>
                        <td className="py-2 pr-4">Base / Optimism</td>
                        <td className="py-2 pr-4">TON (usually)</td>
                        <td className="py-2 pr-4">Polygon</td>
                        <td className="py-2">Base → Polygon</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Payment Flow</td>
                        <td className="py-2 pr-4">Wallet Transaction</td>
                        <td className="py-2 pr-4">TON Connect / Stars</td>
                        <td className="py-2 pr-4">Wallet Transaction</td>
                        <td className="py-2">x402 Stream</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">User Friction</td>
                        <td className="py-2 pr-4">Low</td>
                        <td className="py-2 pr-4">Low</td>
                        <td className="py-2 pr-4">High (Bridging)</td>
                        <td className="py-2">Very Low (Intent-based)</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Dev Complexity</td>
                        <td className="py-2 pr-4">Medium (New SDK)</td>
                        <td className="py-2 pr-4">Medium (Bot API)</td>
                        <td className="py-2 pr-4">High (CLOB/CTF)</td>
                        <td className="py-2">High (Cross-chain Agent)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  2. Architectural Analysis: The Cross-Chain &quot;Intent&quot;
                  Solver
                </h3>
                <p>
                  The central technical challenge identified in this research
                  is the network mismatch: Farcaster and the x402 ecosystem are
                  heavily optimized for the Base L2 network, while Polymarket
                  resides on Polygon. A naive implementation would force the
                  user to switch networks, bridge funds, and manage gas on two
                  chains—a flow that guarantees high abandonment rates in a
                  mobile context.
                </p>
                <p>
                  To solve this, Poly402 employs an Intent-Based Architecture.
                  In this model, the user does not execute the trade directly.
                  Instead, they purchase an &quot;Intent to Bet&quot; using USDC
                  on Base. The application backend, acting as a sovereign agent,
                  verifies this payment and executes the corresponding trade on
                  Polygon.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  2.1 The Solver Pattern
                </h4>
                <ol className="list-decimal space-y-2 pl-5 text-slate-300">
                  <li>
                    Intent Expression: The user views a market (e.g., &quot;Will
                    Bitcoin hit $100k?&quot;) and selects &quot;Yes.&quot; They
                    choose a bet size (e.g., 10 USDC).
                  </li>
                  <li>
                    Payment Gate (x402): The client sends a request to POST
                    /api/bet. The server intercepts this with x402-next
                    middleware and returns a 402 Payment Required status,
                    demanding 10.00 USDC on Base.
                  </li>
                  <li>
                    Settlement: The user&apos;s wallet (e.g., Coinbase Smart
                    Wallet on Farcaster) signs and broadcasts the 10 USDC
                    transfer on Base. This is often a gasless or near-instant
                    transaction.
                  </li>
                  <li>
                    Verification: The client retries the request with the
                    transaction hash in the X-PAYMENT header. The middleware
                    verifies the on-chain settlement via a facilitator (or
                    direct RPC check).
                  </li>
                  <li>
                    Agent Execution: Upon successful payment verification, the
                    backend API initializes a server-side ClobClient (Polymarket
                    SDK). This agent, funded with Polygon USDC, executes a
                    &quot;Market Buy&quot; order on the Polymarket CLOB for the
                    equivalent value.
                  </li>
                  <li>
                    Asset Custody:
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                      <li>
                        Custodial (MVP): The agent holds the shares in a
                        database map linked to the user&apos;s FID. The user can
                        &quot;Cash Out&quot; later, triggering a reverse flow
                        (Agent sells on Polygon → Agent sends USDC on Base).
                      </li>
                      <li>
                        Non-Custodial (Advanced): The agent executes the buy and
                        immediately transfers the ERC-1155 Conditional Tokens
                        to the user&apos;s Polygon address (derived or
                        provided).
                      </li>
                    </ul>
                  </li>
                </ol>
                <p>
                  This architecture transforms the user experience from
                  &quot;Bridging &amp; Trading&quot; to &quot;One-Click
                  Streaming.&quot; It leverages the low fees and high speed of
                  Base for the user interaction while interacting with the deep
                  liquidity of Polygon in the background.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  2.2 Security Implications of the Proxy Model
                </h4>
                <p>
                  The &quot;Solver&quot; model introduces a trusted component:
                  the backend agent. If the agent receives the payment on Base
                  but fails to execute the trade on Polygon, the user loses
                  funds.
                </p>
                <p>
                  To mitigate this risk and ensure the &quot;impressiveness&quot;
                  required for a portfolio piece, the system should ideally
                  utilize a verifiable execution environment or, at minimum, a
                  robust queueing system (e.g., Redis/BullMQ) to ensure atomic
                  execution.
                </p>
                <p>
                  For a portfolio demonstration, transparency is key. The app
                  should display the &quot;Execution Hash&quot; (the Polygon
                  transaction ID) back to the user immediately after the trade
                  is processed, proving that the agent acted on the intent.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  2.3 Unified Context Detection
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Farcaster Detection: The app attempts to initialize the
                    @farcaster/frame-sdk. If the sdk.context resolves, it
                    confirms the Farcaster environment. The app then retrieves
                    the safeAreaInsets to adjust the UI padding.
                  </li>
                  <li>
                    Telegram Detection: The app checks for the global
                    window.Telegram object. If present, it initializes the
                    @telegram-apps/sdk-react. It adapts the theme colors (e.g.,
                    var(--tg-theme-bg-color)) to match the user&apos;s Telegram
                    client.
                  </li>
                </ul>
                <p>
                  This unification extends to the wallet connection. In
                  Farcaster, the app uses wagmi with the Frame Connector. In
                  Telegram, it defaults to TON Connect or an injected EVM
                  provider if the user is using a wallet-enabled browser inside
                  Telegram. However, given the requirement for x402 (which is
                  EVM-centric), the Telegram flow might require the user to
                  connect a mobile wallet like MetaMask or Rainbow via
                  WalletConnect.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  3. Deep Dive: The x402 Payment Protocol
                </h3>
                <p>
                  The x402 protocol is the linchpin of this architecture.
                  Understanding its mechanics is crucial for implementing the
                  &quot;Pay-to-Bet&quot; flow.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  3.1 Protocol Specification and Mechanics
                </h4>
                <ol className="list-decimal space-y-2 pl-5 text-slate-300">
                  <li>Client: GET /premium-content</li>
                  <li>
                    Server: 402 Payment Required with headers for price, token,
                    and recipient.
                  </li>
                  <li>
                    Client signs transfer(0xTreasury, 5000000) and waits for
                    receipt.
                  </li>
                  <li>
                    Client retries GET /premium-content with X-PAYMENT header.
                  </li>
                  <li>
                    Server verifies to == Treasury Address, amount >= price,
                    token == required token, and timestamp is recent.
                  </li>
                  <li>Server returns 200 OK with content.</li>
                </ol>
                <p>
                  This flow is stateless and atomic. It eliminates the need for
                  user accounts, API keys, or monthly subscriptions. For
                  Poly402, this means a user can place a single bet without ever
                  &quot;signing up&quot; or depositing funds into a smart
                  contract balance.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  3.2 The Facilitator Role
                </h4>
                <p>
                  In a production environment, verifying transactions on-chain
                  for every request can be slow and rate-limited. The x402
                  protocol introduces the concept of a Facilitator—a specialized
                  service that indexes payments and provides a fast verification
                  API.
                </p>
                <p>
                  For this implementation, using a self-hosted verification
                  logic (direct RPC calls via viem) is acceptable and
                  demonstrates a deeper understanding of the underlying
                  mechanics. However, utilizing the Coinbase-hosted facilitator
                  (if available) would improve response times.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  3.3 Agentic Commerce Implications
                </h4>
                <p>
                  The &quot;Impressiveness&quot; of this project lies in its
                  forward-looking nature. x402 is designed for AI Agents. By
                  building Poly402, you are effectively building a &quot;Merchant&quot;
                  that AI agents can interact with. An autonomous agent could
                  theoretically query your API, receive the 402 error, pay the
                  fee, and place a bet on a prediction market without human
                  intervention. This &quot;Machine-to-Machine&quot; commerce
                  capability is a powerful narrative for a portfolio piece.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  4. Polymarket Data Engineering and Execution
                </h3>
                <h4 className="text-sm font-semibold text-white">
                  4.1 The Gamma API (Market Discovery)
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Endpoint: https://gamma-api.polymarket.com/events
                  </li>
                  <li>
                    Data Structure: Markets are grouped into &quot;Events.&quot;
                  </li>
                  <li>
                    Optimization: Cache server-side to prevent rate limiting and
                    ensure fast page loads.
                  </li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  4.2 The CLOB Client (Execution)
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Authentication: Agent uses a Polygon private key to sign an
                    API key derivation message.
                  </li>
                  <li>
                    Order Construction: tokenID, price, and side (BUY/SELL).
                  </li>
                  <li>
                    Atomic Swaps: The CTF Exchange contract handles collateral
                    for outcome tokens.
                  </li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  4.3 Proxy Wallets vs. EOAs
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    The agent trades using its own EOA, accumulating positions.
                  </li>
                  <li>
                    The user&apos;s &quot;Portfolio&quot; is a filtered view of
                    the agent&apos;s holdings, tagged with the user&apos;s ID in
                    a local database.
                  </li>
                  <li>
                    A &quot;Withdraw to Polygon&quot; action can transfer ERC-1155
                    tokens to the user&apos;s address for trust-minimized
                    custody.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  5. Premium UI/UX Specification: &quot;Intentional and Modern&quot;
                </h3>
                <h4 className="text-sm font-semibold text-white">
                  5.1 Design Philosophy: &quot;Dark Glass &amp; Neon&quot;
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>Background: #09090b (Zinc 950).</li>
                  <li>
                    Surface: #18181b (Zinc 900) with backdrop blur.
                  </li>
                  <li>
                    Accents: #22c55e (Green) for YES, #ef4444 (Red) for NO,
                    desaturated for a finance aesthetic.
                  </li>
                  <li>Typography: Geist Sans or Inter Tight.</li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  5.2 Interaction Design: Haptics and Physics
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Haptic feedback on interactions, via Telegram WebApp or
                    Farcaster SDK.
                  </li>
                  <li>
                    Use framer-motion for shared layout animations on market
                    cards.
                  </li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  5.3 The &quot;Slide-to-Pay&quot; Mechanism
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>Slider acts as intentional confirmation.</li>
                  <li>
                    Track fills with gradient and becomes a progress bar during
                    processing.
                  </li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  5.4 Safe Area Management
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Apply CSS env(safe-area-inset-*) padding for notches.
                  </li>
                  <li>
                    Use Farcaster safeAreaInsets to keep nav visible.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  6. Implementation Guide &amp; Unified Codebase
                </h3>
                <p>
                  The project is structured as a monorepo-style Next.js
                  application that separates UI, blockchain logic, and platform
                  context. It includes API routes for x402 payment gating,
                  markets discovery, and trade execution, along with shared
                  components and hooks.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  6.2 The Unified Context Provider
                </h4>
                <p>
                  The Unified Context component detects Farcaster or Telegram
                  at runtime and exposes platform, readiness state, and safe
                  area insets. It adapts wallet connectivity and UI padding to
                  match the host super app.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  6.3 The x402 Middleware Implementation
                </h4>
                <p>
                  Middleware intercepts trade requests and enforces payment with
                  a 402 response. After verification, the request proceeds to
                  the agent execution route.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  6.4 The Client-Side Hook: useX402Payment
                </h4>
                <p>
                  A dedicated hook handles the 402 response, triggers wallet
                  transactions, and retries the request with payment proof.
                </p>
                <h4 className="text-sm font-semibold text-white">
                  6.5 Dev Agent Prompts
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Scaffold Next.js with Tailwind, shadcn-ui, Farcaster SDK,
                    Telegram SDK, wagmi, and viem.
                  </li>
                  <li>
                    Create a Market Feed with cached Gamma API data and a
                    responsive MarketGrid.
                  </li>
                  <li>
                    Implement /api/trade with x402 middleware and Polymarket
                    CLOB execution.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  7. Deployment and Growth Strategy
                </h3>
                <h4 className="text-sm font-semibold text-white">
                  7.1 The Viral Loop (Farcaster)
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Prompt &quot;Share Frame&quot; after bets to generate a Cast
                    with a referral URL.
                  </li>
                  <li>
                    Use @vercel/og to generate dynamic images showing live odds.
                  </li>
                  <li>
                    Use Farcaster notifications for market resolution alerts.
                  </li>
                </ul>
                <h4 className="text-sm font-semibold text-white">
                  7.2 Telegram Integration
                </h4>
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  <li>
                    Register Web App as a bot menu button for quick access.
                  </li>
                  <li>
                    Allow &quot;Send Bet&quot; deep links in chats for virality.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-semibold text-white">
                  8. Conclusion
                </h3>
                <p>
                  &quot;Poly402&quot; represents a high-conviction bet on the
                  convergence of the Mini App distribution model, the x402
                  payment protocol, and Polymarket as a source of truth. By
                  abstracting cross-chain interaction through an intent solver,
                  the project delivers a premium, modern experience and acts as
                  a robust portfolio demonstration of full-stack Web3
                  engineering.
                </p>
                <p>
                  The path forward is clear: utilize the unified codebase
                  approach to maximize reach, leverage x402 to minimize friction,
                  and employ agentic execution to bridge the liquidity gap. This
                  is the blueprint for the next generation of crypto consumer
                  applications.
                </p>
              </section>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
};

export default KnowledgeRepoPage;
