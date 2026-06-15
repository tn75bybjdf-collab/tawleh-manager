"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type SalespersonRestaurant = {
  id: string;
  username: string;
  restaurantName: string;
  branchName: string;
  contactName: string;
  phone: string;
  createdAt: string;
  serviceStatus: string;
  serviceExpiresAt: string;
  monthlyFeeJod: number;
  balanceDueJod: number;
  collectedMonthJod: number;
  collectedYtdJod: number;
  lifetimeCollectedJod: number;
  lastPaymentAt: string;
};

type SalespersonPublicReport = {
  month: string;
  generatedAt: string;
  salesperson: {
    username: string;
    fullName: string;
    phone: string;
    active: boolean;
  };
  summary: {
    newAccountsMonth: number;
    newAccountsYtd: number;
    portfolioBusinesses: number;
    portfolioMonthlyRecurringJod: number;
    monthlyRecurringAddedJod: number;
    ytdMonthlyRecurringAddedJod: number;
    monthlyCollectedJod: number;
    ytdCollectedJod: number;
    totalBalanceDueJod: number;
    commissionRate: number;
    estimatedCommissionMonthJod: number;
    estimatedCommissionYtdJod: number;
  };
  restaurants: SalespersonRestaurant[];
};

function currentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function money(value: number) {
  return `${Number(value || 0).toFixed(2)} JOD`;
}

function compactMoney(value: number) {
  const safe = Number(value || 0);
  if (Math.abs(safe) >= 1000) return `${safe.toLocaleString(undefined, { maximumFractionDigits: 0 })} JOD`;
  return `${safe.toFixed(2)} JOD`;
}

function formatMonth(value: string) {
  if (!value) return "Selected month";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatDateTime(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function statusClass(value: string) {
  const status = String(value || "").toLowerCase();
  if (status === "active" || status === "paid") return "good";
  if (status === "suspended" || status === "expired") return "bad";
  return "wait";
}

async function readApiJson(response: Response) {
  const text = await response.text();
  let result: Record<string, unknown> = {};

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    result = {};
  }

  if (!response.ok) {
    throw new Error(String(result.error || result.message || `Request failed with status ${response.status}`));
  }

  return result;
}

const CSS = `
:root { color-scheme: light; --bg:#f6f1eb; --ink:#241a15; --muted:#74685d; --line:rgba(80,53,35,.13); --card:rgba(255,255,255,.92); --dark:#241a15; --orange:#c8613f; --green:#0d7a44; --red:#b42318; --shadow:0 24px 70px rgba(72,48,31,.12); }
* { box-sizing:border-box; } body { margin:0; background:radial-gradient(circle at top left, rgba(200,97,63,.13), transparent 34%), var(--bg); }
.sp-page { min-height:100dvh; padding:28px; color:var(--ink); font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
.sp-shell { width:min(1180px,100%); margin:0 auto; }
.sp-top { display:flex; justify-content:space-between; gap:18px; align-items:center; margin-bottom:20px; }
.sp-brand { display:flex; align-items:center; gap:12px; } .sp-logo { width:48px; height:48px; border-radius:18px; background:var(--dark); color:#fff; display:grid; place-items:center; font-weight:950; font-size:22px; box-shadow:var(--shadow); }
.sp-brand span { color:var(--muted); font-weight:900; font-size:12px; letter-spacing:.08em; text-transform:uppercase; } .sp-brand h1 { margin:2px 0 0; font-size:clamp(26px,4vw,44px); letter-spacing:-.04em; }
.sp-actions { display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end; } .sp-btn { appearance:none; border:1px solid var(--line); border-radius:14px; padding:11px 14px; font-weight:950; background:#fff; color:var(--ink); cursor:pointer; text-decoration:none; } .sp-btn.dark { background:var(--dark); color:#fff; border-color:var(--dark); }
.sp-card { background:var(--card); border:1px solid var(--line); border-radius:26px; padding:22px; box-shadow:var(--shadow); backdrop-filter:blur(14px); }
.sp-hero { display:grid; grid-template-columns:minmax(0,1.45fr) minmax(280px,.55fr); gap:18px; margin-bottom:18px; } .sp-eyebrow { display:inline-flex; padding:7px 10px; border-radius:999px; background:rgba(200,97,63,.1); color:var(--orange); font-weight:950; font-size:12px; text-transform:uppercase; letter-spacing:.08em; }
.sp-card h2,.sp-card h3 { margin:10px 0 8px; letter-spacing:-.03em; } .sp-card p { margin:0; color:var(--muted); line-height:1.55; font-weight:700; }
.sp-meta { display:grid; gap:12px; } .sp-meta-row { display:flex; justify-content:space-between; gap:12px; border-bottom:1px solid var(--line); padding-bottom:10px; } .sp-meta-row:last-child { border-bottom:0; padding-bottom:0; } .sp-meta-row span { color:var(--muted); font-weight:850; } .sp-meta-row strong { text-align:right; font-weight:950; }
.sp-controls { display:flex; justify-content:space-between; align-items:end; gap:14px; margin-bottom:18px; } .sp-field { display:grid; gap:6px; } .sp-field label { color:var(--muted); font-size:12px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; } .sp-field input { border:1px solid var(--line); border-radius:14px; padding:11px 12px; font-weight:900; min-width:170px; }
.sp-kpis { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-bottom:18px; } .sp-kpi b { display:block; font-size:clamp(23px,4vw,34px); letter-spacing:-.04em; margin-top:6px; } .sp-kpi span { color:var(--muted); font-size:12px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; } .sp-kpi em { display:block; margin-top:8px; color:var(--muted); font-style:normal; font-weight:750; font-size:13px; }
.sp-table { overflow:hidden; } .sp-table-head,.sp-row { display:grid; grid-template-columns:1.4fr .75fr .75fr .75fr .75fr .75fr; gap:10px; align-items:center; } .sp-table-head { padding:12px 14px; border-radius:16px; background:rgba(36,26,21,.06); color:var(--muted); font-size:12px; font-weight:950; text-transform:uppercase; letter-spacing:.06em; } .sp-row { padding:14px; border-bottom:1px solid var(--line); font-weight:850; } .sp-row:last-child { border-bottom:0; }
.sp-rest strong { display:block; font-size:15px; } .sp-rest em { display:block; font-style:normal; color:var(--muted); font-weight:750; font-size:12px; margin-top:3px; } .sp-money { font-variant-numeric:tabular-nums; }
.sp-pill { display:inline-flex; width:fit-content; padding:7px 10px; border-radius:999px; font-size:12px; font-weight:950; background:rgba(116,104,93,.13); color:var(--muted); } .sp-pill.good { background:rgba(13,122,68,.1); color:var(--green); } .sp-pill.bad { background:rgba(180,35,24,.1); color:var(--red); } .sp-pill.wait { background:rgba(200,97,63,.11); color:var(--orange); }
.sp-alert { margin-bottom:18px; padding:14px 16px; border-radius:18px; background:rgba(180,35,24,.08); color:var(--red); font-weight:850; border:1px solid rgba(180,35,24,.15); } .sp-empty { padding:28px; text-align:center; color:var(--muted); font-weight:900; }
@media (max-width:900px) { .sp-hero,.sp-kpis { grid-template-columns:1fr; } .sp-top,.sp-controls { align-items:stretch; flex-direction:column; } .sp-actions { justify-content:stretch; } .sp-btn { text-align:center; } .sp-table-head { display:none; } .sp-row { grid-template-columns:1fr; gap:8px; } .sp-row > span::before { content:attr(data-label) ": "; color:var(--muted); font-weight:950; } }
`;

export default function SalespersonReportPage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(String(params?.username || "")).trim().toLowerCase();
  const [month, setMonth] = useState(currentYearMonth());
  const [commissionRate, setCommissionRate] = useState(33);
  const [report, setReport] = useState<SalespersonPublicReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function loadReport(targetMonth = month, targetCommissionRate = commissionRate) {
    if (!username) {
      setMessage("Missing salesperson username.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const url = `/api/salesperson-reports?username=${encodeURIComponent(username)}&month=${encodeURIComponent(targetMonth)}&commissionRate=${encodeURIComponent(String(targetCommissionRate))}`;
      const result = await readApiJson(await fetch(url, { cache: "no-store" }));
      setReport(result.report as SalespersonPublicReport);
    } catch (error) {
      setReport(null);
      setMessage(error instanceof Error ? error.message : "Could not load salesperson report.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const search = new URLSearchParams(window.location.search);
    const urlMonth = search.get("month") || currentYearMonth();
    const urlCommission = Number(search.get("commissionRate") || 33);
    const safeCommission = Number.isFinite(urlCommission) ? urlCommission : 33;

    setMonth(urlMonth);
    setCommissionRate(safeCommission);
    loadReport(urlMonth, safeCommission).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const restaurants = useMemo(() => {
    return [...(report?.restaurants || [])].sort((a, b) => Number(b.collectedMonthJod || 0) - Number(a.collectedMonthJod || 0));
  }, [report]);

  const summary = report?.summary;

  return (
    <main className="sp-page">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sp-shell">
        <header className="sp-top">
          <div className="sp-brand"><div className="sp-logo">T</div><div><span>Tawleh Sales Report</span><h1>@{username}</h1></div></div>
          <div className="sp-actions"><button className="sp-btn" type="button" onClick={() => window.print()}>Print</button><button className="sp-btn dark" type="button" onClick={() => loadReport(month)} disabled={busy}>{busy ? "Refreshing..." : "Refresh"}</button></div>
        </header>

        <section className="sp-hero">
          <div className="sp-card"><span className="sp-eyebrow">{formatMonth(report?.month || month)}</span><h2>{report?.salesperson.fullName || username} sales transparency page</h2><p>This is a read-only report for the salesperson. It shows restaurants credited to this salesperson, collected revenue, monthly recurring value, and estimated commission based on the selected rate.</p></div>
          <div className="sp-card sp-meta"><div className="sp-meta-row"><span>Generated</span><strong>{formatDateTime(report?.generatedAt || "")}</strong></div><div className="sp-meta-row"><span>Commission rate</span><strong>{Number(summary?.commissionRate ?? commissionRate).toFixed(1)}%</strong></div><div className="sp-meta-row"><span>Monthly commission</span><strong>{money(summary?.estimatedCommissionMonthJod || 0)}</strong></div></div>
        </section>

        <section className="sp-card sp-controls"><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><div className="sp-field"><label>Report month</label><input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></div><div className="sp-field"><label>Commission %</label><input type="number" min={0} max={100} step="0.1" value={commissionRate} onChange={(event) => setCommissionRate(Number(event.target.value || 0))} /></div></div><button className="sp-btn dark" type="button" onClick={() => loadReport(month)} disabled={busy}>{busy ? "Loading..." : "Load month"}</button></section>

        {message ? <div className="sp-alert">{message}</div> : null}

        {summary ? (<>
          <section className="sp-kpis"><div className="sp-card sp-kpi"><span>Collected month</span><b>{compactMoney(summary.monthlyCollectedJod)}</b><em>Sales paid in {formatMonth(month)}</em></div><div className="sp-card sp-kpi"><span>Estimated commission</span><b>{compactMoney(summary.estimatedCommissionMonthJod)}</b><em>{Number(summary.commissionRate).toFixed(1)}% of collected month</em></div><div className="sp-card sp-kpi"><span>Portfolio MRR</span><b>{compactMoney(summary.portfolioMonthlyRecurringJod)}</b><em>{summary.portfolioBusinesses} restaurant{summary.portfolioBusinesses === 1 ? "" : "s"}</em></div><div className="sp-card sp-kpi"><span>New accounts</span><b>{summary.newAccountsMonth}</b><em>{summary.newAccountsYtd} new accounts YTD</em></div></section>
          <section className="sp-card sp-table"><div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 14, alignItems: "end" }}><div><h3 style={{ margin: 0 }}>Restaurant list</h3><p style={{ marginTop: 6 }}>Only restaurants credited to @{username} are shown here.</p></div><span className="sp-pill">YTD collected: {money(summary.ytdCollectedJod)}</span></div><div className="sp-table-head"><span>Restaurant</span><span>Status</span><span>Monthly fee</span><span>Collected month</span><span>Collected YTD</span><span>Expires</span></div>{restaurants.length ? restaurants.map((restaurant) => (<div className="sp-row" key={restaurant.id || restaurant.username}><div className="sp-rest"><strong>{restaurant.restaurantName}</strong><em>{restaurant.branchName || restaurant.username || "No branch"}{restaurant.createdAt ? ` • signed ${formatDate(restaurant.createdAt)}` : ""}</em></div><span data-label="Status"><i className={`sp-pill ${statusClass(restaurant.serviceStatus)}`}>{restaurant.serviceStatus || "trial"}</i></span><span data-label="Monthly fee" className="sp-money">{money(restaurant.monthlyFeeJod)}</span><span data-label="Collected month" className="sp-money">{money(restaurant.collectedMonthJod)}</span><span data-label="Collected YTD" className="sp-money">{money(restaurant.collectedYtdJod)}</span><span data-label="Expires">{formatDate(restaurant.serviceExpiresAt)}</span></div>)) : (<div className="sp-empty">No restaurants are credited to this salesperson yet.</div>)}</section>
        </>) : (<section className="sp-card sp-empty">{busy ? "Loading report..." : "No report loaded yet."}</section>)}
      </div>
    </main>
  );
}