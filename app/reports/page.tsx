"use client";

import { createClient } from "@supabase/supabase-js";
import { FormEvent, useEffect, useMemo, useState } from "react";

type CompanyReportSummary = {
  month: string;
  totalBusinesses: number;
  activeBusinesses: number;
  trialBusinesses: number;
  suspendedBusinesses: number;
  newAccountsMonth: number;
  newAccountsYtd: number;
  monthlyRecurringJod: number;
  monthlyRecurringAddedJod: number;
  ytdMonthlyRecurringAddedJod: number;
  monthlyCollectedJod: number;
  ytdCollectedJod: number;
  totalBalanceDueJod: number;
};

type SalespersonMonthlyReport = {
  salespersonId: string;
  username: string;
  fullName: string;
  phone: string;
  newAccountsMonth: number;
  newAccountsYtd: number;
  portfolioBusinesses: number;
  portfolioMonthlyRecurringJod: number;
  monthlyRecurringAddedJod: number;
  ytdMonthlyRecurringAddedJod: number;
  monthlyCollectedJod: number;
  ytdCollectedJod: number;
  totalBalanceDueJod: number;
};

type PlatformReports = {
  month: string;
  generatedAt: string;
  company: CompanyReportSummary;
  salespeople: SalespersonMonthlyReport[];
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

function currentYearMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function numberFrom(value: unknown) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function stringFrom(value: unknown) {
  return String(value ?? "").trim();
}

function readNumber(row: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null) return numberFrom(row[key]);
  }
  return 0;
}

function readString(row: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null) return stringFrom(row[key]);
  }
  return "";
}

function money(value: number) {
  return `${Number(value || 0).toFixed(2)} JOD`;
}

function compactMoney(value: number) {
  const safe = Number(value || 0);
  if (Math.abs(safe) >= 1000) return `${safe.toLocaleString(undefined, { maximumFractionDigits: 0 })} JOD`;
  return `${safe.toFixed(2)} JOD`;
}

function percentPart(value: number, total: number) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, (Number(value || 0) / Number(total || 1)) * 100));
}

function formatMonth(value: string) {
  if (!value) return "Selected month";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function salespersonReportHref(username: string, month: string, commissionRate: number) {
  const cleanUsername = String(username || "").trim().toLowerCase();
  const cleanMonth = String(month || currentYearMonth()).trim();
  const cleanCommission = Number.isFinite(Number(commissionRate)) ? Number(commissionRate) : 33;
  if (!cleanUsername) return "#";
  return `/salesperson-reports/${encodeURIComponent(cleanUsername)}?month=${encodeURIComponent(cleanMonth)}&commissionRate=${encodeURIComponent(String(cleanCommission))}`;
}

function formatDateTime(value: string) {
  if (!value) return "Not generated yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function rowToCompanyReportSummary(row: Record<string, unknown>): CompanyReportSummary {
  return {
    month: readString(row, "month"),
    totalBusinesses: readNumber(row, "totalBusinesses", "total_businesses"),
    activeBusinesses: readNumber(row, "activeBusinesses", "active_businesses"),
    trialBusinesses: readNumber(row, "trialBusinesses", "trial_businesses"),
    suspendedBusinesses: readNumber(row, "suspendedBusinesses", "suspended_businesses"),
    newAccountsMonth: readNumber(row, "newAccountsMonth", "new_accounts_month"),
    newAccountsYtd: readNumber(row, "newAccountsYtd", "new_accounts_ytd"),
    monthlyRecurringJod: readNumber(row, "monthlyRecurringJod", "monthly_recurring_jod"),
    monthlyRecurringAddedJod: readNumber(row, "monthlyRecurringAddedJod", "monthly_recurring_added_jod"),
    ytdMonthlyRecurringAddedJod: readNumber(row, "ytdMonthlyRecurringAddedJod", "ytd_monthly_recurring_added_jod"),
    monthlyCollectedJod: readNumber(row, "monthlyCollectedJod", "monthly_collected_jod"),
    ytdCollectedJod: readNumber(row, "ytdCollectedJod", "ytd_collected_jod"),
    totalBalanceDueJod: readNumber(row, "totalBalanceDueJod", "total_balance_due_jod"),
  };
}

function rowToSalespersonMonthlyReport(row: Record<string, unknown>): SalespersonMonthlyReport {
  return {
    salespersonId: readString(row, "salespersonId", "salesperson_id", "id"),
    username: readString(row, "username", "salespersonUsername", "salesperson_username"),
    fullName: readString(row, "fullName", "full_name", "name"),
    phone: readString(row, "phone", "phone_number"),
    newAccountsMonth: readNumber(row, "newAccountsMonth", "new_accounts_month"),
    newAccountsYtd: readNumber(row, "newAccountsYtd", "new_accounts_ytd"),
    portfolioBusinesses: readNumber(row, "portfolioBusinesses", "portfolio_businesses"),
    portfolioMonthlyRecurringJod: readNumber(row, "portfolioMonthlyRecurringJod", "portfolio_monthly_recurring_jod"),
    monthlyRecurringAddedJod: readNumber(row, "monthlyRecurringAddedJod", "monthly_recurring_added_jod"),
    ytdMonthlyRecurringAddedJod: readNumber(row, "ytdMonthlyRecurringAddedJod", "ytd_monthly_recurring_added_jod"),
    monthlyCollectedJod: readNumber(row, "monthlyCollectedJod", "monthly_collected_jod"),
    ytdCollectedJod: readNumber(row, "ytdCollectedJod", "ytd_collected_jod"),
    totalBalanceDueJod: readNumber(row, "totalBalanceDueJod", "total_balance_due_jod"),
  };
}

function rowToPlatformReports(row: Record<string, unknown>): PlatformReports {
  const company = rowToCompanyReportSummary((row.company || {}) as Record<string, unknown>);
  const salespeople = Array.isArray(row.salespeople)
    ? (row.salespeople as Record<string, unknown>[]).map((item) => rowToSalespersonMonthlyReport(item))
    : [];

  return {
    month: readString(row, "month") || company.month || currentYearMonth(),
    generatedAt: readString(row, "generatedAt", "generated_at"),
    company,
    salespeople,
  };
}

function commissionAmount(collected: number, commissionRate: number) {
  return Number(collected || 0) * (Number(commissionRate || 0) / 100);
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

const REPORTS_CSS = `
:root {
  color-scheme: light;
  --tm-bg: #f5f1eb;
  --tm-ink: #241a15;
  --tm-muted: #7d7068;
  --tm-card: rgba(255, 255, 255, 0.88);
  --tm-card-strong: #ffffff;
  --tm-line: rgba(88, 58, 38, 0.13);
  --tm-orange: #c8613f;
  --tm-orange-dark: #9f4329;
  --tm-green: #0d7a44;
  --tm-red: #b42318;
  --tm-shadow: 0 24px 70px rgba(72, 48, 31, 0.12);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background:
    radial-gradient(circle at top left, rgba(200, 97, 63, 0.12), transparent 34%),
    radial-gradient(circle at top right, rgba(155, 105, 65, 0.12), transparent 28%),
    var(--tm-bg);
}

.tm-report-page {
  min-height: 100dvh;
  padding: 28px;
  color: var(--tm-ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.tm-report-shell {
  width: min(1280px, 100%);
  margin: 0 auto;
}

.tm-report-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px;
  margin-bottom: 18px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--tm-line);
  border-radius: 28px;
  box-shadow: 0 14px 40px rgba(72, 48, 31, 0.08);
  backdrop-filter: blur(14px);
}

.tm-report-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tm-report-logo {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #d56d46, #9f4329);
  color: #fff;
  font-weight: 1000;
  letter-spacing: -0.05em;
  box-shadow: 0 12px 28px rgba(200, 97, 63, 0.28);
}

.tm-report-brand span,
.tm-eyebrow {
  display: block;
  color: var(--tm-orange);
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.tm-report-brand h1,
.tm-hero-copy h2 {
  margin: 2px 0 0;
  font-size: clamp(26px, 4vw, 48px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.tm-top-actions,
.tm-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.tm-button {
  border: 0;
  border-radius: 999px;
  padding: 12px 16px;
  background: #fff;
  color: var(--tm-ink);
  font-weight: 950;
  box-shadow: 0 8px 20px rgba(72, 48, 31, 0.08);
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tm-button.primary {
  background: linear-gradient(135deg, #d56d46, #9f4329);
  color: #fff;
}

.tm-button.dark {
  background: #241a15;
  color: #fff;
}

.tm-button.ghost {
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid var(--tm-line);
  box-shadow: none;
}

.tm-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tm-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);
  gap: 18px;
  margin-bottom: 18px;
}

.tm-card {
  background: var(--tm-card);
  border: 1px solid var(--tm-line);
  border-radius: 30px;
  padding: 22px;
  box-shadow: var(--tm-shadow);
  backdrop-filter: blur(14px);
}

.tm-hero-copy p {
  margin: 10px 0 0;
  color: var(--tm-muted);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.55;
  max-width: 820px;
}

.tm-report-meta {
  display: grid;
  gap: 12px;
}

.tm-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 14px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(88, 58, 38, 0.08);
}

.tm-meta-row span {
  color: var(--tm-muted);
  font-size: 13px;
  font-weight: 900;
}

.tm-meta-row strong {
  font-size: 14px;
  text-align: right;
}

.tm-controls-card {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.tm-field {
  display: grid;
  gap: 7px;
}

.tm-field label {
  color: var(--tm-muted);
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.09em;
}

.tm-field input {
  width: 180px;
  height: 46px;
  border-radius: 16px;
  border: 1px solid var(--tm-line);
  padding: 0 13px;
  background: #fff;
  color: var(--tm-ink);
  font-weight: 900;
  outline: none;
}

.tm-field input:focus {
  border-color: rgba(200, 97, 63, 0.55);
  box-shadow: 0 0 0 4px rgba(200, 97, 63, 0.10);
}

.tm-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.tm-kpi {
  position: relative;
  overflow: hidden;
  min-height: 158px;
  background: var(--tm-card-strong);
}

.tm-kpi::after {
  content: "";
  position: absolute;
  width: 160px;
  height: 160px;
  right: -70px;
  top: -70px;
  border-radius: 50%;
  background: rgba(200, 97, 63, 0.11);
}

.tm-kpi span {
  position: relative;
  z-index: 1;
  display: block;
  color: var(--tm-muted);
  font-size: 13px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.11em;
}

.tm-kpi strong {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 13px;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 0.95;
  letter-spacing: -0.07em;
}

.tm-kpi small {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 12px;
  color: var(--tm-muted);
  font-weight: 800;
}

.tm-two-col {
  display: grid;
  grid-template-columns: 0.88fr 1.12fr;
  gap: 18px;
  align-items: start;
}

.tm-section-title {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.tm-section-title h3 {
  margin: 0;
  font-size: 24px;
  letter-spacing: -0.04em;
}

.tm-section-title p {
  margin: 5px 0 0;
  color: var(--tm-muted);
  font-size: 14px;
  font-weight: 700;
}

.tm-status-grid {
  display: grid;
  gap: 12px;
}

.tm-status-row {
  display: grid;
  grid-template-columns: 118px minmax(0, 1fr) 70px;
  gap: 12px;
  align-items: center;
  padding: 14px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(88, 58, 38, 0.08);
}

.tm-status-row span {
  font-weight: 950;
}

.tm-status-row strong {
  text-align: right;
}

.tm-progress {
  height: 12px;
  border-radius: 999px;
  background: #f0e7dd;
  overflow: hidden;
}

.tm-progress > i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #d56d46, #9f4329);
}

.tm-progress.green > i {
  background: linear-gradient(90deg, #1f9d61, #0d7a44);
}

.tm-progress.red > i {
  background: linear-gradient(90deg, #ef6a5b, #b42318);
}

.tm-mini-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.tm-mini {
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(88, 58, 38, 0.08);
}

.tm-mini span {
  display: block;
  color: var(--tm-muted);
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tm-mini strong {
  display: block;
  margin-top: 8px;
  font-size: 24px;
  letter-spacing: -0.04em;
}

.tm-sales-table {
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--tm-line);
  background: #fff;
}

.tm-sales-head,
.tm-sales-row {
  display: grid;
  grid-template-columns: minmax(220px, 1.25fr) 0.7fr 0.78fr 0.82fr 0.82fr 0.78fr;
  gap: 12px;
  align-items: center;
}

.tm-sales-head {
  padding: 14px 16px;
  background: #241a15;
  color: #fff;
  font-size: 12px;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tm-sales-row {
  padding: 16px;
  border-top: 1px solid rgba(88, 58, 38, 0.09);
}

.tm-sales-row:hover {
  background: #fff9f4;
}

.tm-person strong {
  display: block;
  font-size: 16px;
}

.tm-person em {
  display: block;
  margin-top: 3px;
  color: var(--tm-muted);
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
}

.tm-money {
  font-weight: 950;
}

.tm-commission {
  color: var(--tm-green);
  font-weight: 1000;
}

.tm-empty {
  padding: 28px;
  text-align: center;
  color: var(--tm-muted);
  font-weight: 850;
}

.tm-login-page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(200, 97, 63, 0.14), transparent 36%),
    var(--tm-bg);
  color: var(--tm-ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.tm-login-card {
  width: min(460px, 100%);
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--tm-line);
  border-radius: 30px;
  padding: 24px;
  box-shadow: var(--tm-shadow);
}

.tm-login-card h1 {
  margin: 8px 0 8px;
  font-size: 34px;
  letter-spacing: -0.06em;
}

.tm-login-card p {
  color: var(--tm-muted);
  font-weight: 750;
  line-height: 1.45;
}

.tm-login-form {
  display: grid;
  gap: 14px;
  margin-top: 18px;
}

.tm-login-form input {
  width: 100%;
  height: 50px;
  border: 1px solid var(--tm-line);
  border-radius: 16px;
  padding: 0 14px;
  font-weight: 850;
}

.tm-alert {
  margin: 14px 0 0;
  padding: 14px;
  border-radius: 18px;
  background: #fff1ef;
  border: 1px solid rgba(180, 35, 24, 0.18);
  color: var(--tm-red);
  font-weight: 850;
}

.tm-loading {
  min-height: 320px;
  display: grid;
  place-items: center;
  color: var(--tm-muted);
  font-weight: 900;
}

@media (max-width: 1050px) {
  .tm-hero,
  .tm-two-col {
    grid-template-columns: 1fr;
  }

  .tm-kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .tm-sales-head {
    display: none;
  }

  .tm-sales-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .tm-sales-row > span,
  .tm-sales-row > b {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  .tm-sales-row > span::before {
    color: var(--tm-muted);
    font-size: 12px;
    font-weight: 950;
    text-transform: uppercase;
  }

  .tm-sales-row > span:nth-child(2)::before {
    content: "Accounts";
  }

  .tm-sales-row > span:nth-child(3)::before {
    content: "Portfolio MRR";
  }

  .tm-sales-row > span:nth-child(4)::before {
    content: "Collected month";
  }

  .tm-sales-row > span:nth-child(5)::before {
    content: "Collected YTD";
  }

  .tm-sales-row > b::before {
    content: "Commission";
    color: var(--tm-muted);
    font-size: 12px;
    font-weight: 950;
    text-transform: uppercase;
  }
}

@media (max-width: 720px) {
  .tm-report-page {
    padding: 14px;
  }

  .tm-report-topbar,
  .tm-controls-card {
    align-items: stretch;
    flex-direction: column;
  }

  .tm-top-actions,
  .tm-controls {
    width: 100%;
  }

  .tm-button,
  .tm-field,
  .tm-field input {
    width: 100%;
  }

  .tm-kpi-grid,
  .tm-mini-grid {
    grid-template-columns: 1fr;
  }

  .tm-status-row {
    grid-template-columns: 1fr;
  }

  .tm-status-row strong {
    text-align: left;
  }
}

@media print {
  body {
    background: #fff !important;
  }

  .tm-top-actions,
  .tm-controls-card,
  .tm-button {
    display: none !important;
  }

  .tm-report-page {
    padding: 0 !important;
  }

  .tm-card,
  .tm-report-topbar {
    box-shadow: none !important;
    border-color: #ddd !important;
    break-inside: avoid;
  }

  .tm-two-col {
    grid-template-columns: 1fr !important;
  }
}
`;

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="tm-card tm-kpi">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{helper}</small>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="tm-mini">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function LoginCard({
  email,
  password,
  message,
  busy,
  setEmail,
  setPassword,
  onSubmit,
}: {
  email: string;
  password: string;
  message: string;
  busy: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="tm-login-page">
      <style dangerouslySetInnerHTML={{ __html: REPORTS_CSS }} />
      <section className="tm-login-card">
        <span className="tm-eyebrow">Tawleh owner reports</span>
        <h1>Report Center</h1>
        <p>
          Log in with the same Platform Admin account. This page is separate from the company billing dashboard,
          so reports are clean, printable, and easier to read.
        </p>

        <form className="tm-login-form" onSubmit={onSubmit}>
          <div className="tm-field">
            <label>Admin email</label>
            <input
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="tm-field">
            <label>Admin password</label>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
            />
          </div>

          <button className="tm-button primary" disabled={busy} type="submit">
            {busy ? "Opening reports..." : "Open Reports"}
          </button>
        </form>

        {message ? <div className="tm-alert">{message}</div> : null}
      </section>
    </main>
  );
}

export default function ReportsPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [reportBusy, setReportBusy] = useState(false);
  const [reportMonth, setReportMonth] = useState(currentYearMonth());
  const [commissionRate, setCommissionRate] = useState(10);
  const [reports, setReports] = useState<PlatformReports | null>(null);

  async function getAuthToken() {
    if (!supabase) return "";
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadReports(nextMonth = reportMonth) {
    setReportBusy(true);
    setMessage("");

    try {
      const token = await getAuthToken();

      if (!token) {
        setLoggedIn(false);
        setReports(null);
        setMessage("Please log in as Platform Admin first.");
        return;
      }

      const params = new URLSearchParams();
      if (nextMonth) params.set("month", nextMonth);

      const response = await fetch(`/api/platform-admin/reports?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const result = await readApiJson(response);
      const nextReport = rowToPlatformReports((result.report || {}) as Record<string, unknown>);
      setReports(nextReport);
      setLoggedIn(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Could not load reports";
      setMessage(errorMessage);
      if (/login required|not allowed|unauthorized|forbidden|401|403/i.test(errorMessage)) {
        setLoggedIn(false);
      }
    } finally {
      setReportBusy(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setMessage("Missing Supabase environment variables.");
      return;
    }

    const cleanEmail = adminEmail.trim().toLowerCase();

    if (!cleanEmail || !adminPassword) {
      setMessage("Enter admin email and password.");
      return;
    }

    setBusy(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: adminPassword,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setAdminPassword("");
      setLoggedIn(true);
      await loadReports(reportMonth);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    setLoggedIn(false);
    setReports(null);
    setMessage("");
  }

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      if (!supabase) {
        if (mounted) {
          setSessionReady(true);
          setMessage("Missing Supabase environment variables.");
        }
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.access_token) {
        setLoggedIn(true);
        setSessionReady(true);
        loadReports(reportMonth).catch(() => {});
        return;
      }

      setSessionReady(true);
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedSalespeople = useMemo(() => {
    return [...(reports?.salespeople || [])].sort((a, b) => {
      return Number(b.monthlyCollectedJod || 0) - Number(a.monthlyCollectedJod || 0);
    });
  }, [reports]);

  const company = reports?.company;
  const totalStatus = company ? Math.max(1, company.totalBusinesses) : 1;
  const totalSalesCollected = sortedSalespeople.reduce((sum, person) => sum + Number(person.monthlyCollectedJod || 0), 0);
  const totalCommission = sortedSalespeople.reduce(
    (sum, person) => sum + commissionAmount(person.monthlyCollectedJod, commissionRate),
    0
  );
  const topSalesperson = sortedSalespeople[0] || null;

  if (!sessionReady) {
    return (
      <main className="tm-login-page">
        <style dangerouslySetInnerHTML={{ __html: REPORTS_CSS }} />
        <div className="tm-login-card tm-loading">Checking admin session...</div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <LoginCard
        email={adminEmail}
        password={adminPassword}
        message={message}
        busy={busy}
        setEmail={setAdminEmail}
        setPassword={setAdminPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <main className="tm-report-page">
      <style dangerouslySetInnerHTML={{ __html: REPORTS_CSS }} />

      <div className="tm-report-shell">
        <header className="tm-report-topbar">
          <div className="tm-report-brand">
            <div className="tm-report-logo">T</div>
            <div>
              <span>Tawleh Manager</span>
              <h1>Report Center</h1>
            </div>
          </div>

          <div className="tm-top-actions">
            <button className="tm-button ghost" type="button" onClick={() => { window.location.href = "/"; }}>
              Back to dashboard
            </button>
            <button className="tm-button ghost" type="button" onClick={() => window.print()}>
              Print report
            </button>
            <button className="tm-button dark" type="button" onClick={logout}>
              Logout
            </button>
          </div>
        </header>

        <section className="tm-hero">
          <div className="tm-card tm-hero-copy">
            <span className="tm-eyebrow">{formatMonth(reports?.month || reportMonth)}</span>
            <h2>Company performance and salesperson commissions</h2>
            <p>
              This page uses the existing platform reports API. Salesperson credit stays tied to the restaurant
              that originally signed up under that salesperson, so every future renewal from that restaurant keeps
              reporting under the same salesperson.
            </p>
          </div>

          <div className="tm-card tm-report-meta">
            <div className="tm-meta-row">
              <span>Generated</span>
              <strong>{formatDateTime(reports?.generatedAt || "")}</strong>
            </div>
            <div className="tm-meta-row">
              <span>Commission rate</span>
              <strong>{Number(commissionRate || 0).toFixed(1)}%</strong>
            </div>
            <div className="tm-meta-row">
              <span>Estimated commission</span>
              <strong>{money(totalCommission)}</strong>
            </div>
          </div>
        </section>

        <section className="tm-card tm-controls-card">
          <div className="tm-controls">
            <div className="tm-field">
              <label>Report month</label>
              <input
                type="month"
                value={reportMonth}
                onChange={(event) => {
                  const nextMonth = event.target.value;
                  setReportMonth(nextMonth);
                  loadReports(nextMonth).catch(() => {});
                }}
              />
            </div>

            <div className="tm-field">
              <label>Commission %</label>
              <input
                type="number"
                min={0}
                max={100}
                step="0.1"
                value={commissionRate}
                onChange={(event) => setCommissionRate(Number(event.target.value || 0))}
              />
            </div>
          </div>

          <button className="tm-button primary" type="button" onClick={() => loadReports(reportMonth)} disabled={reportBusy}>
            {reportBusy ? "Refreshing..." : "Refresh reports"}
          </button>
        </section>

        {message ? <div className="tm-alert">{message}</div> : null}

        {!reports || !company ? (
          <section className="tm-card tm-loading">
            {reportBusy ? "Loading reports..." : "No report data loaded yet."}
          </section>
        ) : (
          <>
            <section className="tm-kpi-grid">
              <MetricCard
                label="Monthly recurring"
                value={compactMoney(company.monthlyRecurringJod)}
                helper={`MRR added this month: ${money(company.monthlyRecurringAddedJod)}`}
              />
              <MetricCard
                label="Collected this month"
                value={compactMoney(company.monthlyCollectedJod)}
                helper={`Salesperson collected total: ${money(totalSalesCollected)}`}
              />
              <MetricCard
                label="Collected YTD"
                value={compactMoney(company.ytdCollectedJod)}
                helper={`MRR added YTD: ${money(company.ytdMonthlyRecurringAddedJod)}`}
              />
              <MetricCard
                label="Balance due"
                value={compactMoney(company.totalBalanceDueJod)}
                helper="Total open subscription balance"
              />
            </section>

            <section className="tm-two-col">
              <div className="tm-card">
                <div className="tm-section-title">
                  <div>
                    <h3>Company status</h3>
                    <p>Quick view of active, trial, and suspended restaurants.</p>
                  </div>
                </div>

                <div className="tm-status-grid">
                  <div className="tm-status-row">
                    <span>Active</span>
                    <div className="tm-progress green">
                      <i style={{ width: `${percentPart(company.activeBusinesses, totalStatus)}%` }} />
                    </div>
                    <strong>{company.activeBusinesses}</strong>
                  </div>

                  <div className="tm-status-row">
                    <span>Trial</span>
                    <div className="tm-progress">
                      <i style={{ width: `${percentPart(company.trialBusinesses, totalStatus)}%` }} />
                    </div>
                    <strong>{company.trialBusinesses}</strong>
                  </div>

                  <div className="tm-status-row">
                    <span>Suspended</span>
                    <div className="tm-progress red">
                      <i style={{ width: `${percentPart(company.suspendedBusinesses, totalStatus)}%` }} />
                    </div>
                    <strong>{company.suspendedBusinesses}</strong>
                  </div>
                </div>

                <div className="tm-mini-grid">
                  <MiniStat label="Total companies" value={String(company.totalBusinesses)} />
                  <MiniStat label="New this month" value={String(company.newAccountsMonth)} />
                  <MiniStat label="New YTD" value={String(company.newAccountsYtd)} />
                  <MiniStat
                    label="Top salesperson"
                    value={topSalesperson ? `@${topSalesperson.username}` : "None yet"}
                  />
                </div>
              </div>

              <div className="tm-card">
                <div className="tm-section-title">
                  <div>
                    <h3>Salesperson report</h3>
                    <p>Commission is calculated from selected-month collected payments.</p>
                  </div>
                </div>

                <div className="tm-sales-table">
                  <div className="tm-sales-head">
                    <span>Salesperson</span>
                    <span>Accounts</span>
                    <span>Portfolio MRR</span>
                    <span>Collected month</span>
                    <span>Collected YTD</span>
                    <span>Commission</span>
                  </div>

                  {sortedSalespeople.length ? (
                    sortedSalespeople.map((person) => (
                      <div className="tm-sales-row" key={person.salespersonId || person.username || person.fullName}>
                        <div className="tm-person">
                          <strong>@{person.username || "salesperson"}</strong>
                          <em>
                            {person.fullName || "Salesperson"}
                            {person.phone ? ` • ${person.phone}` : ""}
                          </em>
                          {person.username ? (
                            <a
                              href={salespersonReportHref(person.username, reports?.month || reportMonth, commissionRate)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#c8613f", fontWeight: 950, fontSize: 12, textDecoration: "none", marginTop: 6, display: "inline-flex" }}
                            >
                              Open salesperson report link
                            </a>
                          ) : null}
                        </div>
                        <span>{person.newAccountsMonth} month / {person.newAccountsYtd} YTD</span>
                        <span className="tm-money">{money(person.portfolioMonthlyRecurringJod)}</span>
                        <span className="tm-money">{money(person.monthlyCollectedJod)}</span>
                        <span className="tm-money">{money(person.ytdCollectedJod)}</span>
                        <b className="tm-commission">{money(commissionAmount(person.monthlyCollectedJod, commissionRate))}</b>
                      </div>
                    ))
                  ) : (
                    <div className="tm-empty">No salesperson report data yet.</div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}