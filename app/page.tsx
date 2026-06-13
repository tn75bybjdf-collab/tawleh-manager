"use client";

/* TAWLEH_MENU_ARABIC_ENGLISH_EMPTY_START_V4 */





import { createClient } from "@supabase/supabase-js";
import { ChangeEvent, CSSProperties, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";

const OPTION_ONE_CUSTOMER_CRITICAL_CSS = `
main.customer-only-shell,
.customer-only-shell {
  padding: 0 !important;
  margin: 0 !important;
  width: 100% !important;
  min-height: 100dvh !important;
  overflow-x: hidden !important;
  background: radial-gradient(circle at 50% -8%, #fffdf8 0 28%, #fff7ed 54%, #f2e4d3 100%) !important;
}

.customer-only-shell .topbar,
.customer-only-shell .panel-header,
.customer-only-shell .phone-status {
  display: none !important;
}

.customer-only-shell .grid,
.customer-only-shell .public-qr-grid {
  display: block !important;
  width: 100% !important;
  max-width: 560px !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

.customer-only-shell .customer-panel,
.customer-phone:has(.option-one-customer-hero),
.customer-only-shell .customer-phone {
  width: 100% !important;
  max-width: 560px !important;
  min-width: 0 !important;
  margin: 0 auto !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  overflow: visible !important;
}

.customer-only-shell .panel-body {
  padding: 0 !important;
}

.customer-only-shell .phone-screen,
.customer-phone:has(.option-one-customer-hero) .phone-screen {
  width: 100% !important;
  min-height: 100dvh !important;
  height: auto !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: radial-gradient(circle at 50% -2%, #fffdf9 0 28%, #fff7ee 58%, #f3e5d6 100%) !important;
  box-shadow: none !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  color: #2f2825 !important;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
}

.customer-only-shell .phone-content {
  padding: 0 18px 28px !important;
  position: relative !important;
  z-index: 1 !important;
}

.option-one-customer-hero {
  display: block !important;
  padding: 34px 18px 18px !important;
  text-align: center !important;
}

.option-one-logo-center {
  display: grid !important;
  justify-items: center !important;
  gap: 4px !important;
  margin: 0 auto 24px !important;
  text-align: center !important;
}

.option-one-logo-center .logo-box {
  width: 76px !important;
  height: 76px !important;
  min-width: 76px !important;
  min-height: 76px !important;
  max-width: 76px !important;
  max-height: 76px !important;
  border-radius: 28px !important;
  background: rgba(255, 255, 255, 0.86) !important;
  border: 1px solid rgba(150, 103, 68, 0.16) !important;
  box-shadow: 0 16px 36px rgba(76, 48, 31, 0.08) !important;
  overflow: hidden !important;
}

.option-one-logo-center .logo-box img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  padding: 7px !important;
  display: block !important;
}

.option-one-wordmark {
  margin-top: 8px !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 30px !important;
  line-height: 1 !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  color: #4a3024 !important;
  font-weight: 650 !important;
}

.option-one-submark {
  color: #a57652 !important;
  font-size: 9px !important;
  text-transform: uppercase !important;
  letter-spacing: 0.26em !important;
  font-weight: 900 !important;
}

.option-one-welcome-copy {
  text-align: center !important;
}

.option-one-welcome-copy span {
  display: block !important;
  color: #8e6648 !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 29px !important;
  line-height: 1.1 !important;
}

.option-one-welcome-copy h3 {
  margin: 3px 0 10px !important;
  color: #cc6440 !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: clamp(48px, 15vw, 66px) !important;
  line-height: 0.98 !important;
  letter-spacing: -0.05em !important;
  font-weight: 800 !important;
}

.option-one-welcome-copy p {
  max-width: 340px !important;
  margin: 0 auto 24px !important;
  color: #49423e !important;
  font-size: 17px !important;
  line-height: 1.42 !important;
}

.option-one-table-card {
  width: 100% !important;
  box-sizing: border-box !important;
  display: grid !important;
  grid-template-columns: 72px minmax(0, 1fr) 18px !important;
  align-items: center !important;
  gap: 14px !important;
  text-align: left !important;
  padding: 17px !important;
  background: rgba(255, 255, 255, 0.90) !important;
  border: 1px solid rgba(157, 117, 82, 0.14) !important;
  border-radius: 24px !important;
  box-shadow: 0 22px 54px rgba(73, 49, 30, 0.11) !important;
}

.option-one-table-icon {
  width: 58px !important;
  height: 58px !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: #f5e6d8 !important;
  color: #cf6540 !important;
  font-size: 26px !important;
  font-weight: 950 !important;
}

.option-one-table-card span {
  display: block !important;
  color: #81746c !important;
  font-size: 14px !important;
  line-height: 1.2 !important;
}

.option-one-table-card strong {
  display: block !important;
  color: #2d2928 !important;
  font-size: 28px !important;
  line-height: 1.02 !important;
  letter-spacing: -0.04em !important;
  margin-top: 1px !important;
}

.option-one-table-card em {
  display: block !important;
  margin-top: 3px !important;
  color: #7d746d !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 650 !important;
  white-space: normal !important;
}

.option-one-table-card b {
  color: #ac8a74 !important;
  font-size: 34px !important;
  line-height: 1 !important;
  font-weight: 300 !important;
}

.option-one-seat-card,
.option-one-explore-card {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  background: rgba(255, 255, 255, 0.86) !important;
  border: 1px solid rgba(157, 117, 82, 0.13) !important;
  border-radius: 25px !important;
  padding: 20px !important;
  margin: 0 0 16px !important;
  box-shadow: 0 20px 52px rgba(73, 49, 30, 0.10) !important;
  backdrop-filter: blur(14px) !important;
}

.option-one-card-head h4,
.option-one-section-row h4 {
  margin: 0 !important;
  color: #4a3227 !important;
  font-size: 23px !important;
  line-height: 1.1 !important;
  letter-spacing: -0.04em !important;
  font-weight: 900 !important;
}

.option-one-card-head p {
  margin: 6px 0 0 !important;
  color: #7e746c !important;
  font-size: 14px !important;
  line-height: 1.35 !important;
}

.option-one-name-entry {
  display: grid !important;
  grid-template-columns: 42px minmax(0, 1fr) 56px !important;
  align-items: center !important;
  margin-top: 18px !important;
  min-height: 62px !important;
  background: #fff !important;
  border: 1px solid rgba(157, 117, 82, 0.15) !important;
  border-radius: 999px !important;
  overflow: hidden !important;
}

.option-one-input-icon {
  display: grid !important;
  place-items: center !important;
  color: #b89a83 !important;
  font-size: 23px !important;
}

.option-one-name-entry input {
  width: 100% !important;
  height: 62px !important;
  border: 0 !important;
  outline: 0 !important;
  background: transparent !important;
  padding: 0 8px !important;
  box-shadow: none !important;
  font-size: 19px !important;
  color: #46352f !important;
  appearance: none !important;
}

.option-one-name-entry input::placeholder {
  color: #ae9a89 !important;
}

.option-one-arrow-button {
  width: 48px !important;
  height: 48px !important;
  border: 0 !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  margin-right: 7px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 29px !important;
  line-height: 1 !important;
  box-shadow: 0 13px 28px rgba(203, 94, 61, 0.28) !important;
}

.option-one-profile-chips {
  margin-top: 15px !important;
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.option-one-profile-chip {
  min-height: 46px !important;
  justify-content: center !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 7px !important;
  background: #fffaf4 !important;
  border: 1px solid rgba(157, 117, 82, 0.14) !important;
  border-radius: 999px !important;
  color: #5f4a3e !important;
  box-shadow: 0 8px 18px rgba(73, 49, 30, 0.06) !important;
  font-weight: 900 !important;
  font-size: 15px !important;
}

.option-one-profile-chip.active,
.option-one-profile-chip:hover {
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.option-one-section-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 14px !important;
  margin-bottom: 15px !important;
}

.option-one-section-row button {
  border: 0 !important;
  background: transparent !important;
  color: #c75f3f !important;
  font-weight: 900 !important;
  font-size: 14px !important;
  padding: 0 !important;
}

.option-one-category-preview {
  display: grid !important;
  grid-template-columns: repeat(4, 118px) !important;
  gap: 10px !important;
  overflow-x: auto !important;
  padding: 2px 2px 8px !important;
}

.option-one-category-card {
  min-width: 0 !important;
  border: 1px solid rgba(157, 117, 82, 0.12) !important;
  background: #fff !important;
  border-radius: 17px !important;
  padding: 8px !important;
  text-align: left !important;
  box-shadow: 0 12px 25px rgba(73, 49, 30, 0.08) !important;
  color: #4a3227 !important;
  text-decoration: none !important;
}

.option-one-category-photo {
  height: 74px !important;
  border-radius: 13px !important;
  display: grid !important;
  place-items: center !important;
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.12), rgba(151, 114, 77, 0.11)), #f6eee6 !important;
  font-size: 29px !important;
}

.option-one-category-card strong {
  display: block !important;
  margin-top: 9px !important;
  color: #4a3227 !important;
  font-size: 13px !important;
  line-height: 1.1 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.option-one-category-card small {
  display: block !important;
  color: #95877c !important;
  font-size: 12px !important;
  margin-top: 3px !important;
  min-height: 14px !important;
}

.option-one-bottom-nav {
  position: sticky !important;
  bottom: 14px !important;
  z-index: 20 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 9px !important;
  padding: 0 0 8px !important;
  margin-top: 8px !important;
}

.option-one-bottom-nav button {
  min-height: 58px !important;
  border: 1px solid rgba(157, 117, 82, 0.13) !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.94) !important;
  color: #5d4b40 !important;
  font-weight: 950 !important;
  font-size: 12px !important;
  box-shadow: 0 12px 28px rgba(73, 49, 30, 0.10) !important;
  text-decoration: none !important;
}

.option-one-bottom-nav button span {
  display: block !important;
  font-size: 20px !important;
  margin-bottom: 3px !important;
}

.option-one-bottom-nav button.active {
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.option-one-secure-row {
  display: flex !important;
  justify-content: center !important;
  gap: 10px !important;
  color: #c87957 !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  padding: 0 0 20px !important;
}

.option-one-secure-row em {
  font-style: normal !important;
  color: #8b796c !important;
}

.customer-only-shell .phone-tabs {
  display: none !important;
}


/* One-screen customer welcome mode + real category photos */
.customer-only-shell .phone-content {
  padding: 0 14px 10px !important;
}

.option-one-customer-hero {
  padding: 14px 14px 9px !important;
}

.option-one-welcome-first {
  margin: 0 auto 8px !important;
}

.option-one-welcome-first span {
  font-size: clamp(34px, 10vw, 44px) !important;
  line-height: 0.96 !important;
}

.option-one-logo-proud {
  margin-bottom: 10px !important;
}

.option-one-logo-proud .logo-box {
  width: 92px !important;
  height: 92px !important;
  min-width: 92px !important;
  min-height: 92px !important;
  max-width: 92px !important;
  max-height: 92px !important;
  border-radius: 28px !important;
  box-shadow: 0 14px 34px rgba(76, 48, 31, 0.10) !important;
}

.option-one-logo-proud .logo-box img {
  padding: 8px !important;
}

.option-one-logo-proud .option-one-wordmark {
  margin-top: 9px !important;
  font-size: 27px !important;
  letter-spacing: 0.15em !important;
}

.option-one-logo-proud .option-one-submark {
  font-size: 8px !important;
  letter-spacing: 0.22em !important;
}

.option-one-welcome-copy p {
  max-width: 310px !important;
  margin: 0 auto 12px !important;
  font-size: 14px !important;
  line-height: 1.28 !important;
}

.option-one-table-card {
  grid-template-columns: 54px minmax(0, 1fr) 14px !important;
  gap: 10px !important;
  padding: 11px 13px !important;
  border-radius: 19px !important;
  box-shadow: 0 12px 30px rgba(73, 49, 30, 0.09) !important;
}

.option-one-table-icon {
  width: 44px !important;
  height: 44px !important;
  font-size: 20px !important;
}

.option-one-table-card span {
  font-size: 11px !important;
}

.option-one-table-card strong {
  font-size: 22px !important;
}

.option-one-table-card em {
  font-size: 15px !important;
  margin-top: 1px !important;
}

.option-one-table-card b {
  font-size: 26px !important;
}

.option-one-seat-card,
.option-one-explore-card {
  padding: 12px !important;
  margin-bottom: 10px !important;
  border-radius: 20px !important;
  box-shadow: 0 12px 30px rgba(73, 49, 30, 0.08) !important;
}

.option-one-card-head h4,
.option-one-section-row h4 {
  font-size: 19px !important;
  line-height: 1 !important;
}

.option-one-card-head p {
  margin-top: 4px !important;
  font-size: 12px !important;
  line-height: 1.2 !important;
}

.option-one-name-entry {
  grid-template-columns: 34px minmax(0, 1fr) 46px !important;
  min-height: 48px !important;
  margin-top: 10px !important;
}

.option-one-input-icon {
  font-size: 18px !important;
}

.option-one-name-entry input {
  height: 48px !important;
  font-size: 16px !important;
}

.option-one-arrow-button {
  width: 38px !important;
  height: 38px !important;
  margin-right: 5px !important;
  font-size: 23px !important;
}

.option-one-profile-chips {
  margin-top: 10px !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 7px !important;
}

.option-one-profile-chip {
  min-height: 34px !important;
  font-size: 12px !important;
  padding: 6px 8px !important;
  gap: 4px !important;
}

.option-one-section-row {
  margin-bottom: 10px !important;
}

.option-one-section-row button {
  font-size: 12px !important;
}

.option-one-category-preview {
  grid-template-columns: repeat(4, minmax(76px, 1fr)) !important;
  gap: 7px !important;
  overflow: visible !important;
  padding: 0 !important;
}

.option-one-category-card {
  padding: 6px !important;
  border-radius: 14px !important;
  box-shadow: 0 8px 18px rgba(73, 49, 30, 0.07) !important;
}

.option-one-category-photo {
  height: 48px !important;
  border-radius: 11px !important;
  overflow: hidden !important;
  background: #f6eee6 !important;
}

.option-one-category-photo img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

.option-one-category-photo span {
  font-size: 22px !important;
}

.option-one-category-card strong {
  margin-top: 6px !important;
  font-size: 10.5px !important;
  line-height: 1.05 !important;
}

.option-one-category-card small {
  font-size: 10px !important;
  margin-top: 2px !important;
  min-height: 11px !important;
}

.option-one-bottom-nav {
  position: static !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 7px !important;
  margin-top: 0 !important;
  padding: 0 !important;
}

.option-one-bottom-nav button {
  min-height: 46px !important;
  border-radius: 15px !important;
  font-size: 11px !important;
  box-shadow: 0 8px 18px rgba(73, 49, 30, 0.08) !important;
}

.option-one-bottom-nav button span {
  font-size: 16px !important;
  margin-bottom: 1px !important;
}

.option-one-secure-row {
  display: none !important;
}

@media (max-width: 390px) {
  .option-one-customer-hero {
    padding-top: 10px !important;
  }

  .option-one-logo-proud .logo-box {
    width: 82px !important;
    height: 82px !important;
    min-width: 82px !important;
    min-height: 82px !important;
    max-width: 82px !important;
    max-height: 82px !important;
  }

  .option-one-logo-proud .option-one-wordmark {
    font-size: 24px !important;
  }

  .option-one-welcome-copy p {
    font-size: 12px !important;
    margin-bottom: 9px !important;
  }

  .option-one-category-preview {
    grid-template-columns: repeat(4, minmax(70px, 1fr)) !important;
  }

  .option-one-category-photo {
    height: 42px !important;
  }

  .option-one-category-card strong {
    font-size: 9.5px !important;
  }
}


/* Final customer category flow fixes */
.option-one-table-logo {
  width: 44px !important;
  height: 44px !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: #fff !important;
  border: 1px solid rgba(157, 117, 82, 0.14) !important;
  box-shadow: 0 8px 18px rgba(73, 49, 30, 0.07) !important;
  overflow: hidden !important;
}

.option-one-table-logo .logo-box {
  width: 100% !important;
  height: 100% !important;
  min-width: 100% !important;
  min-height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  border: 0 !important;
  border-radius: 50% !important;
  box-shadow: none !important;
  background: transparent !important;
}

.option-one-table-logo .logo-box img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  padding: 5px !important;
  display: block !important;
}

.option-one-current-guest-card {
  display: grid !important;
  grid-template-columns: 46px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 12px !important;
  margin-top: 10px !important;
  border-radius: 18px !important;
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.11), rgba(255, 255, 255, 0.88)) !important;
  border: 1px solid rgba(211, 109, 71, 0.13) !important;
}

.option-one-current-guest-card > span {
  width: 42px !important;
  height: 42px !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-weight: 950 !important;
  font-size: 18px !important;
}

.option-one-current-guest-card strong {
  display: block !important;
  color: #3e2d26 !important;
  font-size: 20px !important;
  line-height: 1.05 !important;
}

.option-one-current-guest-card small {
  display: block !important;
  color: #88766b !important;
  font-size: 12px !important;
  margin-top: 2px !important;
}

.option-one-add-name-chip {
  border-style: dashed !important;
}

.option-one-menu-back-row {
  display: grid !important;
  grid-template-columns: auto minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 10px !important;
  margin: 0 0 12px !important;
  padding: 12px !important;
  background: rgba(255, 255, 255, 0.88) !important;
  border: 1px solid rgba(157, 117, 82, 0.13) !important;
  border-radius: 18px !important;
  box-shadow: 0 10px 24px rgba(73, 49, 30, 0.08) !important;
}

.option-one-menu-back-row button {
  border: 0 !important;
  border-radius: 999px !important;
  background: #f5e6d8 !important;
  color: #bd5338 !important;
  font-size: 12px !important;
  font-weight: 950 !important;
  padding: 10px 12px !important;
}

.option-one-menu-back-row strong {
  color: #3e2d26 !important;
  font-size: 18px !important;
  line-height: 1.05 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.customer-only-shell .category-scroll {
  display: none !important;
}

.customer-only-shell .mini-card {
  display: none !important;
}

.customer-only-shell .menu-list {
  display: grid !important;
  gap: 10px !important;
}

.customer-only-shell .menu-item {
  display: grid !important;
  grid-template-columns: 76px minmax(0, 1fr) auto !important;
  gap: 11px !important;
  align-items: center !important;
  padding: 10px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.90) !important;
  border: 1px solid rgba(157, 117, 82, 0.12) !important;
  box-shadow: 0 10px 24px rgba(73, 49, 30, 0.07) !important;
}

.customer-only-shell .item-photo-button,
.customer-only-shell .item-icon {
  width: 76px !important;
  height: 76px !important;
  border-radius: 14px !important;
  overflow: hidden !important;
}

.customer-only-shell .item-photo-button img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.customer-only-shell .menu-item h5 {
  margin: 0 !important;
  font-size: 15px !important;
  line-height: 1.08 !important;
}

.customer-only-shell .menu-item p {
  margin: 3px 0 !important;
  font-size: 11px !important;
  line-height: 1.25 !important;
}

.customer-only-shell .menu-item .price {
  margin-top: 4px !important;
  font-size: 14px !important;
  font-weight: 950 !important;
}

.customer-only-shell .menu-item .btn.small {
  min-width: 52px !important;
  min-height: 36px !important;
  padding: 7px 10px !important;
  border-radius: 999px !important;
  font-size: 12px !important;
}

.customer-only-shell .cart-quantity-control {
  display: grid !important;
  grid-template-columns: 28px 26px 28px !important;
  align-items: center !important;
  border-radius: 999px !important;
}

.customer-only-shell .cart-quantity-control button {
  width: 28px !important;
  height: 28px !important;
}

@media (max-width: 390px) {
  .option-one-table-logo {
    width: 40px !important;
    height: 40px !important;
  }

  .customer-only-shell .menu-item {
    grid-template-columns: 68px minmax(0, 1fr) auto !important;
  }

  .customer-only-shell .item-photo-button,
  .customer-only-shell .item-icon {
    width: 68px !important;
    height: 68px !important;
  }
}


/* Final customer bill/service + premium quantity + fixed send bar */
.customer-only-shell .option-one-utility-screen {
  display: grid !important;
  gap: 12px !important;
  padding-bottom: 90px !important;
}

.customer-only-shell .option-one-bill-card,
.customer-only-shell .option-one-service-card,
.customer-only-shell .bill-stack .seat-card {
  background: rgba(255, 255, 255, 0.90) !important;
  border: 1px solid rgba(157, 117, 82, 0.13) !important;
  border-radius: 20px !important;
  box-shadow: 0 12px 30px rgba(73, 49, 30, 0.08) !important;
  padding: 14px !important;
}

.customer-only-shell .option-one-bill-card h4,
.customer-only-shell .option-one-service-card h4,
.customer-only-shell .bill-stack .seat-card h4 {
  margin: 0 0 4px !important;
  color: #3e2d26 !important;
  font-size: 20px !important;
  line-height: 1.1 !important;
}

.customer-only-shell .option-one-bill-card p,
.customer-only-shell .option-one-service-card p,
.customer-only-shell .bill-stack .seat-card p {
  margin: 0 0 12px !important;
  color: #7d746d !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
}

.customer-only-shell .bill-total {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 12px !important;
  margin-top: 10px !important;
  border-radius: 16px !important;
  background: #fff7ef !important;
  color: #3e2d26 !important;
  font-weight: 950 !important;
}

.customer-only-shell .request-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
  margin: 12px 0 !important;
}

.customer-only-shell .request-btn {
  min-height: 78px !important;
  border: 1px solid rgba(157, 117, 82, 0.13) !important;
  border-radius: 18px !important;
  background: #fffaf4 !important;
  color: #4a3227 !important;
  font-weight: 950 !important;
  box-shadow: 0 10px 22px rgba(73, 49, 30, 0.07) !important;
}

.customer-only-shell .request-btn span {
  display: block !important;
  margin-bottom: 4px !important;
  color: #bd5338 !important;
  font-size: 17px !important;
}

.customer-only-shell .menu-list {
  padding-bottom: 92px !important;
}

.customer-only-shell .cart-quantity-control {
  display: grid !important;
  grid-template-columns: 34px 30px 34px !important;
  align-items: center !important;
  justify-items: center !important;
  gap: 0 !important;
  width: 98px !important;
  height: 42px !important;
  padding: 4px !important;
  border-radius: 999px !important;
  background: linear-gradient(135deg, #fffaf4, #f4e6d8) !important;
  border: 1px solid rgba(157, 117, 82, 0.18) !important;
  box-shadow: 0 10px 24px rgba(73, 49, 30, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.85) !important;
}

.customer-only-shell .cart-quantity-control button {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  border: 0 !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 20px !important;
  font-weight: 950 !important;
  line-height: 1 !important;
  box-shadow: 0 8px 16px rgba(203, 94, 61, 0.23) !important;
}

.customer-only-shell .cart-quantity-control button:first-child {
  background: #fff !important;
  color: #bd5338 !important;
  border: 1px solid rgba(189, 83, 56, 0.20) !important;
  box-shadow: none !important;
}

.customer-only-shell .cart-quantity-control strong {
  min-width: 26px !important;
  text-align: center !important;
  color: #3e2d26 !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
  line-height: 1 !important;
}

.customer-only-shell .fixed-send-order-bar,
.fixed-send-order-bar {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: calc(12px + env(safe-area-inset-bottom)) !important;
  transform: translateX(-50%) !important;
  z-index: 9999 !important;
  width: calc(100% - 28px) !important;
  max-width: 520px !important;
  min-height: 66px !important;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 10px 10px 10px 16px !important;
  border-radius: 24px !important;
  background: rgba(41, 31, 27, 0.94) !important;
  border: 1px solid rgba(255, 255, 255, 0.13) !important;
  box-shadow: 0 18px 46px rgba(30, 20, 14, 0.30) !important;
  backdrop-filter: blur(16px) !important;
}

.fixed-send-order-summary {
  display: grid !important;
  gap: 2px !important;
  min-width: 0 !important;
}

.fixed-send-order-summary strong {
  color: #fff !important;
  font-size: 15px !important;
  line-height: 1.1 !important;
  font-weight: 950 !important;
}

.fixed-send-order-summary span {
  color: #f4c99f !important;
  font-size: 13px !important;
  font-weight: 900 !important;
}

.fixed-send-order-button {
  min-height: 46px !important;
  padding: 0 18px !important;
  border: 0 !important;
  border-radius: 18px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
  letter-spacing: -0.02em !important;
  box-shadow: 0 12px 24px rgba(203, 94, 61, 0.30) !important;
}

@media (max-width: 390px) {
  .customer-only-shell .cart-quantity-control {
    grid-template-columns: 30px 26px 30px !important;
    width: 88px !important;
    height: 38px !important;
  }

  .customer-only-shell .cart-quantity-control button {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    font-size: 18px !important;
  }

  .fixed-send-order-bar {
    width: calc(100% - 22px) !important;
    min-height: 62px !important;
    border-radius: 22px !important;
  }

  .fixed-send-order-button {
    min-height: 42px !important;
    padding: 0 14px !important;
    font-size: 14px !important;
  }
}


/* Customer home balance update:
   - smaller "You're ordering as"
   - bigger Explore menu section
   - full category names */
.customer-only-shell .option-one-seat-card:has(.option-one-current-guest-card) {
  padding: 9px 12px !important;
  margin-bottom: 8px !important;
  border-radius: 18px !important;
}

.customer-only-shell .option-one-seat-card:has(.option-one-current-guest-card) .option-one-card-head h4 {
  font-size: 15px !important;
  line-height: 1 !important;
}

.customer-only-shell .option-one-seat-card:has(.option-one-current-guest-card) .option-one-card-head p {
  display: none !important;
}

.customer-only-shell .option-one-current-guest-card {
  grid-template-columns: 34px minmax(0, 1fr) !important;
  gap: 9px !important;
  padding: 7px 9px !important;
  margin-top: 7px !important;
  border-radius: 15px !important;
}

.customer-only-shell .option-one-current-guest-card > span {
  width: 30px !important;
  height: 30px !important;
  font-size: 14px !important;
}

.customer-only-shell .option-one-current-guest-card strong {
  font-size: 16px !important;
  line-height: 1 !important;
}

.customer-only-shell .option-one-current-guest-card small {
  font-size: 10.5px !important;
  margin-top: 1px !important;
}

.customer-only-shell .option-one-seat-card:has(.option-one-current-guest-card) .option-one-profile-chips {
  margin-top: 7px !important;
  gap: 6px !important;
}

.customer-only-shell .option-one-seat-card:has(.option-one-current-guest-card) .option-one-profile-chip {
  min-height: 29px !important;
  padding: 4px 7px !important;
  font-size: 10.5px !important;
}

.customer-only-shell .option-one-explore-card {
  padding: 15px !important;
  margin-bottom: 11px !important;
  border-radius: 22px !important;
}

.customer-only-shell .option-one-section-row {
  margin-bottom: 12px !important;
}

.customer-only-shell .option-one-section-row h4 {
  font-size: 23px !important;
  line-height: 1 !important;
}

.customer-only-shell .option-one-section-row button {
  font-size: 13px !important;
}

.customer-only-shell .option-one-category-preview {
  grid-template-columns: repeat(4, minmax(82px, 1fr)) !important;
  gap: 8px !important;
  overflow: visible !important;
}

.customer-only-shell .option-one-category-card {
  min-height: 124px !important;
  padding: 7px !important;
  border-radius: 16px !important;
}

.customer-only-shell .option-one-category-photo {
  height: 62px !important;
  border-radius: 12px !important;
}

.customer-only-shell .option-one-category-card strong {
  display: -webkit-box !important;
  margin-top: 7px !important;
  min-height: 27px !important;
  color: #4a3227 !important;
  font-size: 11.5px !important;
  line-height: 1.15 !important;
  white-space: normal !important;
  overflow: hidden !important;
  text-overflow: clip !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
}

.customer-only-shell .option-one-category-card small {
  font-size: 10px !important;
  margin-top: 3px !important;
}

@media (max-width: 390px) {
  .customer-only-shell .option-one-category-preview {
    grid-template-columns: repeat(4, minmax(74px, 1fr)) !important;
    gap: 6px !important;
  }

  .customer-only-shell .option-one-category-card {
    min-height: 116px !important;
    padding: 6px !important;
  }

  .customer-only-shell .option-one-category-photo {
    height: 54px !important;
  }

  .customer-only-shell .option-one-category-card strong {
    font-size: 10.2px !important;
    min-height: 25px !important;
  }
}


/* Keep bottom customer navigation visible when fixed Send Order bar appears */
.customer-only-shell .phone-content {
  padding-bottom: 112px !important;
}

.customer-only-shell .option-one-bottom-nav {
  position: relative !important;
  z-index: 30 !important;
  margin-bottom: 82px !important;
}

.customer-only-shell .option-one-secure-row {
  display: none !important;
}

.customer-only-shell .fixed-send-order-bar,
.fixed-send-order-bar {
  bottom: calc(10px + env(safe-area-inset-bottom)) !important;
}

@media (max-width: 390px) {
  .customer-only-shell .phone-content {
    padding-bottom: 104px !important;
  }

  .customer-only-shell .option-one-bottom-nav {
    margin-bottom: 76px !important;
  }
}


/* Hard fix: bottom nav must never sit underneath the fixed Send Order bar */
.customer-only-shell .option-one-bottom-nav {
  position: fixed !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  bottom: calc(12px + env(safe-area-inset-bottom)) !important;
  width: calc(100% - 28px) !important;
  max-width: 520px !important;
  z-index: 9998 !important;
  margin: 0 !important;
  padding: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 9px !important;
  pointer-events: auto !important;
}

.customer-only-shell.customer-has-cart .option-one-bottom-nav {
  bottom: calc(88px + env(safe-area-inset-bottom)) !important;
}

.customer-only-shell .fixed-send-order-bar,
.fixed-send-order-bar {
  z-index: 9999 !important;
  bottom: calc(10px + env(safe-area-inset-bottom)) !important;
}

.customer-only-shell .phone-content {
  padding-bottom: 156px !important;
}

.customer-only-shell.customer-has-cart .phone-content {
  padding-bottom: 230px !important;
}

.customer-only-shell .option-one-bottom-nav button {
  min-height: 56px !important;
  box-shadow: 0 14px 34px rgba(73, 49, 30, 0.16) !important;
}

@media (max-width: 390px) {
  .customer-only-shell .option-one-bottom-nav {
    width: calc(100% - 20px) !important;
    gap: 7px !important;
  }

  .customer-only-shell.customer-has-cart .option-one-bottom-nav {
    bottom: calc(82px + env(safe-area-inset-bottom)) !important;
  }

  .customer-only-shell .phone-content {
    padding-bottom: 148px !important;
  }

  .customer-only-shell.customer-has-cart .phone-content {
    padding-bottom: 218px !important;
  }
}

@media (min-width: 431px) {
  .option-one-profile-chips {
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  }
}


/* =========================================================
   CUSTOMER QR RANDOM MENU PHOTO BACKGROUND
   Uses real uploaded Supabase menu item photos only.
   Rotates every 5 seconds from React state.
   ========================================================= */

main.customer-only-shell,
.customer-only-shell {
  position: relative !important;
  isolation: isolate !important;
  background: #f6eadb !important;
}

.customer-only-shell .phone-screen,
.customer-phone:has(.option-one-customer-hero) .phone-screen {
  position: relative !important;
  isolation: isolate !important;
  background: #f6eadb !important;
}

.customer-menu-photo-bg {
  position: fixed !important;
  inset: 0 !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  opacity: 1 !important;
  transform: scale(1.035) !important;
  filter: blur(1.4px) saturate(1.05) contrast(0.96) !important;
  animation: tawlehCustomerBgFade 760ms ease both !important;
}

.customer-menu-photo-bg::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background:
    radial-gradient(circle at 50% -8%, rgba(255, 253, 248, 0.82) 0 26%, rgba(255, 248, 238, 0.68) 56%, rgba(242, 228, 211, 0.84) 100%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.78) 0%, rgba(255, 246, 232, 0.72) 46%, rgba(239, 220, 198, 0.90) 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0.20)) !important;
}

.customer-only-shell .customer-panel,
.customer-only-shell .customer-phone,
.customer-only-shell .phone-screen,
.customer-only-shell .option-one-customer-hero,
.customer-only-shell .phone-content {
  position: relative !important;
  z-index: 2 !important;
}

.customer-only-shell .option-one-customer-hero {
  background: linear-gradient(180deg, rgba(255, 250, 242, 0.76), rgba(255, 250, 242, 0.18)) !important;
  border-bottom: 1px solid rgba(136, 94, 62, 0.08) !important;
}

.customer-only-shell .option-one-seat-card,
.customer-only-shell .option-one-explore-card,
.customer-only-shell .option-one-table-card,
.customer-only-shell .mini-card,
.customer-only-shell .seat-card,
.customer-only-shell .menu-item {
  background: rgba(255, 255, 255, 0.88) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
  border-color: rgba(157, 117, 82, 0.18) !important;
}

.customer-only-shell .option-one-category-card {
  background: rgba(255, 255, 255, 0.82) !important;
  backdrop-filter: blur(14px) !important;
  -webkit-backdrop-filter: blur(14px) !important;
}

@keyframes tawlehCustomerBgFade {
  from {
    opacity: 0;
    transform: scale(1.055);
  }

  to {
    opacity: 1;
    transform: scale(1.035);
  }
}

@media (max-width: 700px) {
  .customer-menu-photo-bg {
    background-position: center top !important;
    filter: blur(1.2px) saturate(1.04) contrast(0.96) !important;
  }
}



/* =========================================================
   CUSTOMER QR MENU PHOTO BACKGROUND HOTFIX
   This makes the rotating photo visible by putting it on the
   customer page root, not only as an inner child layer.
   ========================================================= */

main.customer-only-shell {
  min-height: 100dvh !important;
  background:
    radial-gradient(circle at 50% -8%, rgba(255, 253, 248, 0.66) 0 24%, rgba(255, 246, 234, 0.58) 52%, rgba(239, 220, 198, 0.78) 100%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.58), rgba(243, 226, 207, 0.76)),
    var(--customer-menu-bg, none),
    #f6eadb !important;
  background-size: cover !important;
  background-position: center center !important;
  background-attachment: fixed !important;
  transition: background-image 760ms ease !important;
}

main.customer-only-shell::before {
  content: "" !important;
  position: fixed !important;
  inset: 0 !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.40), transparent 38%),
    linear-gradient(180deg, rgba(255, 249, 241, 0.34), rgba(231, 210, 188, 0.42)) !important;
  backdrop-filter: blur(1.2px) saturate(1.03) !important;
  -webkit-backdrop-filter: blur(1.2px) saturate(1.03) !important;
}

main.customer-only-shell .grid,
main.customer-only-shell .customer-panel,
main.customer-only-shell .customer-phone,
main.customer-only-shell .phone-screen,
main.customer-only-shell .phone-content,
main.customer-only-shell .option-one-customer-hero,
main.customer-only-shell .option-one-bottom-nav {
  position: relative !important;
  z-index: 2 !important;
}

main.customer-only-shell .phone-screen {
  background: transparent !important;
}

main.customer-only-shell .customer-menu-photo-bg {
  display: none !important;
}

main.customer-only-shell .option-one-customer-hero {
  background: linear-gradient(180deg, rgba(255, 250, 242, 0.52), rgba(255, 250, 242, 0.08)) !important;
}

main.customer-only-shell .option-one-seat-card,
main.customer-only-shell .option-one-explore-card,
main.customer-only-shell .option-one-table-card,
main.customer-only-shell .option-one-category-card,
main.customer-only-shell .menu-item,
main.customer-only-shell .mini-card,
main.customer-only-shell .seat-card {
  background: rgba(255, 255, 255, 0.82) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
  border-color: rgba(136, 94, 62, 0.16) !important;
}

@supports not (backdrop-filter: blur(1px)) {
  main.customer-only-shell {
    background:
      radial-gradient(circle at 50% -8%, rgba(255, 253, 248, 0.80) 0 24%, rgba(255, 246, 234, 0.72) 52%, rgba(239, 220, 198, 0.88) 100%),
      var(--customer-menu-bg, none),
      #f6eadb !important;
  }
}



/* =========================================================
   CUSTOMER RANDOM BACKGROUND FINAL FIX
   The public-table API must send image_url, and the actual phone screen
   must use the variable, not only the outside page shell.
   ========================================================= */

main.customer-only-shell .phone-screen {
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 253, 248, 0.54) 0 24%, rgba(255, 246, 234, 0.42) 56%, rgba(239, 220, 198, 0.62) 100%),
    linear-gradient(180deg, rgba(255, 252, 247, 0.36), rgba(243, 226, 207, 0.54)),
    var(--customer-menu-bg, none),
    #f6eadb !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  transition: background-image 760ms ease !important;
}

main.customer-only-shell .phone-screen::before {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background:
    radial-gradient(circle at 50% 0%, rgba(255,255,255,0.36), transparent 40%),
    linear-gradient(180deg, rgba(255,248,238,0.20), rgba(242,224,203,0.32)) !important;
  backdrop-filter: blur(0.8px) saturate(1.02) !important;
  -webkit-backdrop-filter: blur(0.8px) saturate(1.02) !important;
}

main.customer-only-shell .phone-status,
main.customer-only-shell .option-one-customer-hero,
main.customer-only-shell .phone-content,
main.customer-only-shell .option-one-bottom-nav {
  position: relative !important;
  z-index: 2 !important;
}

main.customer-only-shell .option-one-customer-hero {
  background: rgba(255, 250, 242, 0.46) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}

main.customer-only-shell .phone-content {
  background: transparent !important;
}

main.customer-only-shell .option-one-seat-card,
main.customer-only-shell .option-one-explore-card,
main.customer-only-shell .option-one-table-card,
main.customer-only-shell .option-one-category-card,
main.customer-only-shell .menu-item,
main.customer-only-shell .mini-card,
main.customer-only-shell .seat-card {
  background: rgba(255, 255, 255, 0.78) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
}

main.customer-only-shell .customer-menu-photo-bg {
  display: block !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}



/* =========================================================
   CUSTOMER RANDOM BACKGROUND VISIBLE LAYER FIX
   The previous troubleshooting CSS accidentally allowed the inner photo layer
   to be hidden. This makes the food photo layer obvious and visible inside
   the actual customer phone screen.
   ========================================================= */

main.customer-only-shell .phone-screen {
  position: relative !important;
  overflow: hidden !important;
  background: #f3dfc9 !important;
}

main.customer-only-shell .phone-screen > .customer-menu-photo-bg {
  display: block !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  opacity: 1 !important;
  pointer-events: none !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  transform: scale(1.03) !important;
  filter: saturate(1.08) contrast(1.02) brightness(0.92) !important;
  animation: tawlehCustomerBgFade 760ms ease both !important;
}

main.customer-only-shell .phone-screen > .customer-menu-photo-bg::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background:
    radial-gradient(circle at 50% -12%, rgba(255, 253, 248, 0.48) 0 24%, rgba(255, 247, 235, 0.32) 54%, rgba(238, 216, 192, 0.62) 100%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.38) 0%, rgba(244, 224, 201, 0.54) 100%) !important;
}

main.customer-only-shell .phone-status,
main.customer-only-shell .option-one-customer-hero,
main.customer-only-shell .phone-content,
main.customer-only-shell .option-one-bottom-nav,
main.customer-only-shell .fixed-send-order-bar {
  position: relative !important;
  z-index: 3 !important;
}

main.customer-only-shell .phone-screen::before {
  display: none !important;
}

main.customer-only-shell .option-one-customer-hero {
  background: rgba(255, 249, 239, 0.54) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}

main.customer-only-shell .phone-content {
  background: transparent !important;
}

main.customer-only-shell .option-one-seat-card,
main.customer-only-shell .option-one-explore-card,
main.customer-only-shell .option-one-table-card,
main.customer-only-shell .option-one-category-card,
main.customer-only-shell .menu-item,
main.customer-only-shell .mini-card,
main.customer-only-shell .seat-card {
  background: rgba(255, 255, 255, 0.80) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-color: rgba(136, 94, 62, 0.16) !important;
}

/* If the menu has no uploaded image URLs, keep the original warm paper background. */
main.customer-only-shell:not([style*="--customer-menu-bg"]) .phone-screen {
  background: radial-gradient(circle at 50% -8%, #fffdf8 0 28%, #fff7ed 54%, #f2e4d3 100%) !important;
}



/* =========================================================
   CUSTOMER SCROLL + BOTTOM NAV + SMOOTH BACKGROUND FINAL
   - scrolling stays available immediately
   - bottom tabs no longer cover the Explore menu card
   - image changes only after the next image has fully loaded in React
   - the photo layer no longer remounts/flickers on each switch
   ========================================================= */

main.customer-only-shell,
main.customer-only-shell * {
  -webkit-tap-highlight-color: transparent !important;
}

main.customer-only-shell {
  overflow-x: hidden !important;
  overflow-y: auto !important;
  touch-action: pan-y !important;
}

main.customer-only-shell .customer-panel,
main.customer-only-shell .customer-phone {
  min-height: 100dvh !important;
  overflow: visible !important;
}

main.customer-only-shell .phone-screen {
  min-height: 100dvh !important;
  height: auto !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior-y: contain !important;
  touch-action: pan-y !important;
  scroll-behavior: auto !important;
  position: relative !important;
  background: #f3dfc9 !important;
}

main.customer-only-shell .phone-screen > .customer-menu-photo-bg {
  display: block !important;
  position: fixed !important;
  inset: 0 !important;
  z-index: 0 !important;
  opacity: 1 !important;
  pointer-events: none !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
  transform: translateZ(0) scale(1.025) !important;
  filter: saturate(1.06) contrast(1.01) brightness(0.93) !important;
  animation: none !important;
  transition: none !important;
  will-change: background-image !important;
}

main.customer-only-shell .phone-screen > .customer-menu-photo-bg::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background:
    radial-gradient(circle at 50% -10%, rgba(255, 253, 248, 0.52) 0 24%, rgba(255, 247, 235, 0.36) 54%, rgba(238, 216, 192, 0.64) 100%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.40) 0%, rgba(244, 224, 201, 0.56) 100%) !important;
}

main.customer-only-shell .phone-status,
main.customer-only-shell .option-one-customer-hero,
main.customer-only-shell .phone-content,
main.customer-only-shell .option-one-bottom-nav,
main.customer-only-shell .fixed-send-order-bar {
  position: relative !important;
  z-index: 3 !important;
}

main.customer-only-shell .phone-content {
  min-height: calc(100dvh - 196px) !important;
  padding-bottom: 190px !important;
  background: transparent !important;
  overflow: visible !important;
}

main.customer-only-shell.customer-has-cart .phone-content {
  padding-bottom: 270px !important;
}

main.customer-only-shell .option-one-explore-card {
  margin-bottom: 112px !important;
}

main.customer-only-shell.customer-has-cart .option-one-explore-card {
  margin-bottom: 190px !important;
}

main.customer-only-shell .option-one-bottom-nav {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: calc(14px + env(safe-area-inset-bottom)) !important;
  transform: translateX(-50%) !important;
  width: calc(100% - 28px) !important;
  max-width: 520px !important;
  z-index: 9998 !important;
  margin: 0 !important;
  padding: 0 !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 9px !important;
  pointer-events: auto !important;
}

main.customer-only-shell.customer-has-cart .option-one-bottom-nav {
  bottom: calc(88px + env(safe-area-inset-bottom)) !important;
}

main.customer-only-shell .option-one-bottom-nav button {
  min-height: 56px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.90) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
}

main.customer-only-shell .fixed-send-order-bar,
.fixed-send-order-bar {
  z-index: 9999 !important;
}

@media (max-width: 390px) {
  main.customer-only-shell .phone-content {
    padding-bottom: 176px !important;
  }

  main.customer-only-shell.customer-has-cart .phone-content {
    padding-bottom: 252px !important;
  }

  main.customer-only-shell .option-one-explore-card {
    margin-bottom: 104px !important;
  }

  main.customer-only-shell.customer-has-cart .option-one-explore-card {
    margin-bottom: 176px !important;
  }

  main.customer-only-shell .option-one-bottom-nav {
    width: calc(100% - 20px) !important;
    gap: 7px !important;
  }

  main.customer-only-shell.customer-has-cart .option-one-bottom-nav {
    bottom: calc(82px + env(safe-area-inset-bottom)) !important;
  }
}



/* =========================================================
   CUSTOMER ITEM PHOTO MODAL RESTORE
   Tapping a menu photo opens a real centered full-screen modal again,
   instead of rendering the enlarged image at the bottom of the page.
   ========================================================= */

.image-modal,
main.customer-only-shell .image-modal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 2147483000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: max(18px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom)) !important;
  background: rgba(24, 18, 14, 0.72) !important;
  backdrop-filter: blur(18px) saturate(1.05) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.05) !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  touch-action: pan-y !important;
}

.image-modal-card,
main.customer-only-shell .image-modal-card {
  width: min(94vw, 680px) !important;
  max-height: calc(100dvh - 32px) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  border-radius: 28px !important;
  background: rgba(255, 250, 243, 0.98) !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42) !important;
}

.image-modal-head,
main.customer-only-shell .image-modal-head {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  gap: 12px !important;
  align-items: start !important;
  padding: 16px 16px 12px !important;
  border-bottom: 1px solid rgba(129, 92, 62, 0.12) !important;
}

.image-modal-head h3,
main.customer-only-shell .image-modal-head h3 {
  margin: 0 !important;
  color: #32251f !important;
  font-size: 20px !important;
  line-height: 1.08 !important;
  font-weight: 950 !important;
}

.image-modal-head p,
main.customer-only-shell .image-modal-head p {
  margin: 5px 0 0 !important;
  color: #786a5f !important;
  font-size: 12px !important;
  line-height: 1.28 !important;
}

.image-modal-head .btn,
main.customer-only-shell .image-modal-head .btn {
  min-height: 36px !important;
  padding: 0 13px !important;
  border-radius: 999px !important;
  background: #fff !important;
  border: 1px solid rgba(129, 92, 62, 0.14) !important;
  color: #4a3227 !important;
  box-shadow: 0 8px 20px rgba(73, 49, 30, 0.10) !important;
}

.image-modal-card > img,
main.customer-only-shell .image-modal-card > img {
  width: 100% !important;
  height: auto !important;
  max-height: calc(100dvh - 150px) !important;
  display: block !important;
  object-fit: contain !important;
  background: #f3e6d7 !important;
}

@media (max-width: 430px) {
  .image-modal,
  main.customer-only-shell .image-modal {
    align-items: center !important;
    padding: 12px !important;
  }

  .image-modal-card,
  main.customer-only-shell .image-modal-card {
    width: calc(100vw - 24px) !important;
    max-height: calc(100dvh - 24px) !important;
    border-radius: 24px !important;
  }

  .image-modal-head,
  main.customer-only-shell .image-modal-head {
    padding: 13px 13px 10px !important;
  }

  .image-modal-head h3,
  main.customer-only-shell .image-modal-head h3 {
    font-size: 18px !important;
  }

  .image-modal-card > img,
  main.customer-only-shell .image-modal-card > img {
    max-height: calc(100dvh - 142px) !important;
  }
}



/* =========================================================
   CUSTOMER CATEGORY HORIZONTAL SCROLL RESTORE
   Restores swipe-left/right category browsing without breaking
   vertical page scroll, bottom nav spacing, photo modal, or random background.
   ========================================================= */

main.customer-only-shell .option-one-explore-card {
  overflow: visible !important;
}

main.customer-only-shell .option-one-category-preview {
  display: grid !important;
  grid-auto-flow: column !important;
  grid-auto-columns: minmax(96px, 118px) !important;
  grid-template-columns: none !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  max-width: 100% !important;
  padding: 2px 2px 12px !important;
  margin: 0 -2px !important;
  scroll-snap-type: x proximity !important;
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior-x: contain !important;
  touch-action: pan-x pan-y !important;
  scrollbar-width: none !important;
}

main.customer-only-shell .option-one-category-preview::-webkit-scrollbar {
  display: none !important;
}

main.customer-only-shell .option-one-category-card {
  width: auto !important;
  min-width: 96px !important;
  max-width: 118px !important;
  scroll-snap-align: start !important;
  touch-action: manipulation !important;
}

main.customer-only-shell .option-one-category-photo {
  height: 62px !important;
}

/* Keep the old chip scroller usable if the customer is inside a category list */
main.customer-only-shell .category-scroll {
  display: flex !important;
  gap: 8px !important;
  overflow-x: auto !important;
  overflow-y: hidden !important;
  max-width: 100% !important;
  padding: 0 2px 10px !important;
  margin: 0 0 10px !important;
  -webkit-overflow-scrolling: touch !important;
  overscroll-behavior-x: contain !important;
  touch-action: pan-x pan-y !important;
  scrollbar-width: none !important;
}

main.customer-only-shell .category-scroll::-webkit-scrollbar {
  display: none !important;
}

main.customer-only-shell .category-scroll .category-chip {
  flex: 0 0 auto !important;
  white-space: nowrap !important;
}

@media (max-width: 390px) {
  main.customer-only-shell .option-one-category-preview {
    grid-auto-columns: minmax(88px, 104px) !important;
    gap: 7px !important;
    padding-bottom: 12px !important;
  }

  main.customer-only-shell .option-one-category-card {
    min-width: 88px !important;
    max-width: 104px !important;
  }

  main.customer-only-shell .option-one-category-photo {
    height: 56px !important;
  }
}



/* =========================================================
   CUSTOMER GLASS SECTION TRANSPARENCY
   Makes the customer sections more see-through so rotating food
   backgrounds show through, while keeping text readable and bold.
   ========================================================= */

main.customer-only-shell .option-one-customer-hero {
  background: linear-gradient(
    180deg,
    rgba(255, 249, 239, 0.38),
    rgba(255, 249, 239, 0.18)
  ) !important;
  border-bottom: 1px solid rgba(136, 94, 62, 0.10) !important;
  backdrop-filter: blur(9px) saturate(1.06) !important;
  -webkit-backdrop-filter: blur(9px) saturate(1.06) !important;
}

main.customer-only-shell .option-one-logo-center .logo-box,
main.customer-only-shell .option-one-table-logo {
  background: rgba(255, 255, 255, 0.54) !important;
  border-color: rgba(255, 255, 255, 0.40) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
}

main.customer-only-shell .option-one-table-card,
main.customer-only-shell .option-one-seat-card,
main.customer-only-shell .option-one-explore-card,
main.customer-only-shell .option-one-current-guest-card,
main.customer-only-shell .option-one-bill-card,
main.customer-only-shell .option-one-service-card,
main.customer-only-shell .bill-stack .seat-card {
  background: rgba(255, 255, 255, 0.50) !important;
  border: 1px solid rgba(255, 255, 255, 0.36) !important;
  box-shadow: 0 16px 38px rgba(54, 36, 24, 0.13) !important;
  backdrop-filter: blur(14px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(14px) saturate(1.08) !important;
}

main.customer-only-shell .option-one-explore-card {
  background: rgba(255, 255, 255, 0.44) !important;
}

main.customer-only-shell .option-one-seat-card {
  background: rgba(255, 255, 255, 0.46) !important;
}

main.customer-only-shell .option-one-table-card {
  background: rgba(255, 255, 255, 0.42) !important;
}

main.customer-only-shell .option-one-category-card {
  background: rgba(255, 255, 255, 0.46) !important;
  border: 1px solid rgba(255, 255, 255, 0.32) !important;
  box-shadow: 0 12px 28px rgba(54, 36, 24, 0.12) !important;
  backdrop-filter: blur(13px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(13px) saturate(1.08) !important;
}

main.customer-only-shell .menu-item,
main.customer-only-shell .mini-card {
  background: rgba(255, 255, 255, 0.58) !important;
  border-color: rgba(255, 255, 255, 0.34) !important;
  backdrop-filter: blur(14px) saturate(1.06) !important;
  -webkit-backdrop-filter: blur(14px) saturate(1.06) !important;
}

/* Keep text strong on transparent cards */
main.customer-only-shell .option-one-card-head h4,
main.customer-only-shell .option-one-section-row h4,
main.customer-only-shell .option-one-table-card strong,
main.customer-only-shell .option-one-current-guest-card strong,
main.customer-only-shell .option-one-category-card strong,
main.customer-only-shell .menu-item h5,
main.customer-only-shell .option-one-wordmark {
  color: #2d211b !important;
  font-weight: 1000 !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.55) !important;
}

main.customer-only-shell .option-one-card-head p,
main.customer-only-shell .option-one-table-card span,
main.customer-only-shell .option-one-table-card em,
main.customer-only-shell .option-one-category-card small,
main.customer-only-shell .menu-item p,
main.customer-only-shell .option-one-submark,
main.customer-only-shell .option-one-welcome-copy p {
  color: #5f4c40 !important;
  font-weight: 850 !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.50) !important;
}

main.customer-only-shell .option-one-name-entry,
main.customer-only-shell .input-row,
main.customer-only-shell .request-btn,
main.customer-only-shell .cart-quantity-control {
  background: rgba(255, 255, 255, 0.62) !important;
  border-color: rgba(255, 255, 255, 0.38) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

/* Keep bottom nav readable but still glassy */
main.customer-only-shell .option-one-bottom-nav button {
  background: rgba(255, 255, 255, 0.72) !important;
  border-color: rgba(255, 255, 255, 0.38) !important;
  color: #34251f !important;
  font-weight: 1000 !important;
  backdrop-filter: blur(18px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.08) !important;
}

main.customer-only-shell .option-one-bottom-nav button.active {
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.88), rgba(189, 83, 56, 0.88)) !important;
  color: #fff !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18) !important;
}



/* =========================================================
   CUSTOMER SHOW ALL CATEGORIES + NO CATEGORY SWITCH PILLS
   Explore menu now shows every real saved category as wrapping cards.
   Once inside a category, guests only see Back to categories, not the
   horizontal text category switcher.
   ========================================================= */

main.customer-only-shell .option-one-category-preview {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  grid-auto-flow: row !important;
  grid-auto-columns: unset !important;
  gap: 9px !important;
  overflow: visible !important;
  max-width: 100% !important;
  padding: 2px 0 6px !important;
  margin: 0 !important;
  scroll-snap-type: none !important;
  touch-action: pan-y !important;
}

main.customer-only-shell .option-one-category-card {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 124px !important;
  scroll-snap-align: unset !important;
}

main.customer-only-shell .option-one-category-photo {
  height: 66px !important;
}

main.customer-only-shell .category-scroll {
  display: none !important;
}

main.customer-only-shell .option-one-menu-back-row {
  margin-bottom: 12px !important;
}

@media (max-width: 390px) {
  main.customer-only-shell .option-one-category-preview {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  main.customer-only-shell .option-one-category-card {
    min-height: 118px !important;
  }

  main.customer-only-shell .option-one-category-photo {
    height: 60px !important;
  }
}



/* =========================================================
   CUSTOMER CATEGORY PHOTO CENTER + FIXED SEND ORDER BAR
   - Category card photos are centered and cropped from the middle.
   - Send Order stays locked to the screen while ordering.
   - Bottom tabs stay locked above/below correctly without covering it.
   ========================================================= */

main.customer-only-shell .option-one-category-card {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
}

main.customer-only-shell .option-one-category-photo {
  width: 100% !important;
  height: 72px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  border-radius: 15px !important;
  margin: 0 auto 7px !important;
  background-position: center center !important;
}

main.customer-only-shell .option-one-category-photo img {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  object-fit: cover !important;
  object-position: center center !important;
  transform: scale(1.02) !important;
}

main.customer-only-shell .option-one-category-photo span {
  width: 100% !important;
  height: 100% !important;
  display: grid !important;
  place-items: center !important;
  text-align: center !important;
}

main.customer-only-shell .option-one-category-card strong,
main.customer-only-shell .option-one-category-card small {
  width: 100% !important;
  text-align: center !important;
}

/* Keep content clear of both fixed bars */
main.customer-only-shell .phone-content {
  padding-bottom: 176px !important;
}

main.customer-only-shell.customer-has-cart .phone-content {
  padding-bottom: 286px !important;
}

/* Bottom tabs locked when no cart; move up when cart/send bar exists */
main.customer-only-shell .option-one-bottom-nav {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: calc(14px + env(safe-area-inset-bottom)) !important;
  transform: translateX(-50%) !important;
  width: calc(100% - 28px) !important;
  max-width: 520px !important;
  z-index: 9998 !important;
  margin: 0 !important;
  pointer-events: auto !important;
}

main.customer-only-shell.customer-has-cart .option-one-bottom-nav {
  bottom: calc(92px + env(safe-area-inset-bottom)) !important;
}

/* Send Order bar must stay pinned to the viewport, not the scrolling phone content */
main.customer-only-shell .fixed-send-order-bar,
.fixed-send-order-bar {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: calc(12px + env(safe-area-inset-bottom)) !important;
  transform: translateX(-50%) !important;
  width: calc(100% - 28px) !important;
  max-width: 520px !important;
  min-height: 66px !important;
  z-index: 2147482000 !important;
  margin: 0 !important;
  pointer-events: auto !important;
  will-change: transform !important;
}

/* When cart exists, keep the fixed bottom nav above Send Order and the Send Order at the bottom */
main.customer-only-shell.customer-has-cart .fixed-send-order-bar,
main.customer-only-shell.customer-has-cart .fixed-send-order-bar {
  bottom: calc(12px + env(safe-area-inset-bottom)) !important;
}

main.customer-only-shell.customer-has-cart .option-one-explore-card {
  margin-bottom: 204px !important;
}

@media (max-width: 390px) {
  main.customer-only-shell .option-one-category-photo {
    height: 66px !important;
  }

  main.customer-only-shell .phone-content {
    padding-bottom: 166px !important;
  }

  main.customer-only-shell.customer-has-cart .phone-content {
    padding-bottom: 270px !important;
  }

  main.customer-only-shell .option-one-bottom-nav {
    width: calc(100% - 20px) !important;
    bottom: calc(12px + env(safe-area-inset-bottom)) !important;
  }

  main.customer-only-shell.customer-has-cart .option-one-bottom-nav {
    bottom: calc(88px + env(safe-area-inset-bottom)) !important;
  }

  main.customer-only-shell .fixed-send-order-bar,
  .fixed-send-order-bar {
    width: calc(100% - 20px) !important;
    bottom: calc(10px + env(safe-area-inset-bottom)) !important;
  }
}

`;


const MANAGER_DASHBOARD_OPTION2_CSS = `
:root {
  --dash-bg: #fbf7ef;
  --dash-card: rgba(255, 253, 248, 0.92);
  --dash-card-solid: #fffdf8;
  --dash-line: rgba(97, 72, 48, 0.12);
  --dash-ink: #2f2a25;
  --dash-muted: #817466;
  --dash-orange: #cf5f3b;
  --dash-orange-soft: #fff0e9;
  --dash-olive: #687044;
  --dash-olive-soft: #eef3df;
  --dash-gold: #bd8d47;
  --dash-shadow: 0 18px 45px rgba(80, 52, 27, 0.10);
}

body {
  background:
    radial-gradient(circle at 15% 0%, rgba(207, 95, 59, 0.08), transparent 34%),
    radial-gradient(circle at 100% 8%, rgba(104, 112, 68, 0.11), transparent 32%),
    linear-gradient(180deg, #fffcf6 0%, var(--dash-bg) 100%) !important;
}

.app-shell:not(.customer-only-shell) {
  min-height: 100vh !important;
  padding: 24px 28px 18px !important;
  background:
    linear-gradient(90deg, rgba(104, 112, 68, 0.045) 0 16%, transparent 16%),
    radial-gradient(circle at 96% 96%, rgba(104, 112, 68, 0.08), transparent 32%) !important;
}

.app-shell:not(.customer-only-shell)::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.78), rgba(255,255,255,0.20) 16%, transparent 16%),
    radial-gradient(circle at 7% 88%, rgba(104, 112, 68, 0.15), transparent 24%);
  z-index: -1;
}

.app-shell:not(.customer-only-shell) .topbar {
  max-width: 1680px !important;
  margin: 0 auto 22px !important;
  padding: 18px 20px !important;
  border-radius: 28px !important;
  border: 1px solid var(--dash-line) !important;
  background: rgba(255, 253, 248, 0.82) !important;
  box-shadow: 0 14px 38px rgba(80, 52, 27, 0.08) !important;
  backdrop-filter: blur(18px) !important;
  top: 14px !important;
}

.app-shell:not(.customer-only-shell) .brand {
  min-width: 320px !important;
  gap: 14px !important;
}

.app-shell:not(.customer-only-shell) .topbar-logo-img {
  width: 58px !important;
  height: 58px !important;
  min-width: 58px !important;
  max-width: 58px !important;
  max-height: 58px !important;
  padding: 8px !important;
  object-fit: contain !important;
  border-radius: 18px !important;
  background: #fff !important;
  border: 1px solid var(--dash-line) !important;
  box-shadow: 0 10px 24px rgba(80, 52, 27, 0.08) !important;
}

.app-shell:not(.customer-only-shell) .brand h1 {
  font-size: 27px !important;
  letter-spacing: -0.055em !important;
  color: var(--dash-ink) !important;
}

.app-shell:not(.customer-only-shell) .brand p {
  color: var(--dash-muted) !important;
  font-size: 13px !important;
  margin-top: 6px !important;
  max-width: 380px !important;
  white-space: normal !important;
}

.app-shell:not(.customer-only-shell) .top-actions {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
}

.app-shell:not(.customer-only-shell) .top-actions .pill {
  min-height: 42px !important;
  padding: 0 16px !important;
  border-radius: 999px !important;
  background: #fff !important;
  border: 1px solid var(--dash-line) !important;
  color: var(--dash-ink) !important;
  box-shadow: 0 8px 18px rgba(80, 52, 27, 0.06) !important;
  font-weight: 950 !important;
}

.app-shell:not(.customer-only-shell) .top-actions .btn {
  min-height: 42px !important;
  border-radius: 14px !important;
  font-weight: 950 !important;
  border: 1px solid var(--dash-line) !important;
  box-shadow: 0 8px 18px rgba(80, 52, 27, 0.05) !important;
}

.app-shell:not(.customer-only-shell) .top-actions .btn.secondary {
  background: var(--dash-orange-soft) !important;
  color: var(--dash-orange) !important;
}

.app-shell:not(.customer-only-shell) .top-actions .btn.ghost {
  background: #fff !important;
  color: var(--dash-ink) !important;
}

.app-shell:not(.customer-only-shell) .top-actions .btn.danger {
  background: #fff3ef !important;
  color: #b63e2a !important;
}

.app-shell:not(.customer-only-shell) .grid.manager-only-grid {
  max-width: 1680px !important;
  margin: 0 auto !important;
  display: block !important;
}

.app-shell:not(.customer-only-shell) .grid.manager-only-grid > .panel {
  border: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.app-shell:not(.customer-only-shell) .grid.manager-only-grid > .panel > .panel-header {
  display: none !important;
}

.app-shell:not(.customer-only-shell) .grid.manager-only-grid > .panel > .panel-body {
  padding: 0 !important;
}

.app-shell:not(.customer-only-shell) .manager-layout {
  gap: 18px !important;
}

.app-shell:not(.customer-only-shell) .stats {
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 16px !important;
}

.app-shell:not(.customer-only-shell) .stat-card {
  position: relative !important;
  min-height: 142px !important;
  padding: 22px 22px 18px 98px !important;
  border-radius: 24px !important;
  border: 1px solid var(--dash-line) !important;
  background: var(--dash-card) !important;
  box-shadow: var(--dash-shadow) !important;
  overflow: hidden !important;
}

.app-shell:not(.customer-only-shell) .stat-card::before {
  content: "";
  position: absolute;
  left: 24px;
  top: 24px;
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--dash-orange), #b84d2e);
  box-shadow: 0 14px 26px rgba(207, 95, 59, 0.22);
}

.app-shell:not(.customer-only-shell) .stat-card::after {
  position: absolute;
  left: 24px;
  top: 24px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  color: white;
  font-size: 23px;
  font-weight: 950;
}

.app-shell:not(.customer-only-shell) .stat-card:nth-child(1)::after { content: "▦"; }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(2)::before { background: linear-gradient(135deg, #d19a4c, #a87633); }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(2)::after { content: "▤"; }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(3)::before { background: linear-gradient(135deg, #c4953d, #8e6a2a); }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(3)::after { content: "◉"; }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(4)::before { background: linear-gradient(135deg, var(--dash-olive), #4c5632); }
.app-shell:not(.customer-only-shell) .stat-card:nth-child(4)::after { content: "$"; }

.app-shell:not(.customer-only-shell) .stat-card span {
  color: var(--dash-muted) !important;
  font-size: 12px !important;
  font-weight: 950 !important;
  letter-spacing: 0.08em !important;
}

.app-shell:not(.customer-only-shell) .stat-card strong {
  margin-top: 10px !important;
  color: var(--dash-ink) !important;
  font-size: 36px !important;
  line-height: 0.95 !important;
  letter-spacing: -0.065em !important;
}

.app-shell:not(.customer-only-shell) .manager-tabs {
  justify-content: space-between !important;
  gap: 4px !important;
  padding: 10px !important;
  border-radius: 24px !important;
  border: 1px solid var(--dash-line) !important;
  background: rgba(255, 253, 248, 0.92) !important;
  box-shadow: 0 14px 38px rgba(80, 52, 27, 0.07) !important;
}

.app-shell:not(.customer-only-shell) .manager-tab {
  position: relative !important;
  min-height: 50px !important;
  flex: 1 1 auto !important;
  border-radius: 17px !important;
  padding: 0 14px !important;
  color: #67594d !important;
  font-size: 13px !important;
  background: transparent !important;
  border: 0 !important;
  transition: transform 0.15s ease, background 0.15s ease !important;
}

.app-shell:not(.customer-only-shell) .manager-tab:hover {
  background: #fff7ee !important;
  transform: translateY(-1px) !important;
}

.app-shell:not(.customer-only-shell) .manager-tab.active {
  background: linear-gradient(135deg, #cf5f3b, #b84d2e) !important;
  color: white !important;
  box-shadow: 0 14px 25px rgba(207, 95, 59, 0.23) !important;
}

.app-shell:not(.customer-only-shell) .two-col {
  grid-template-columns: minmax(520px, 1.15fr) minmax(360px, 0.85fr) !important;
  gap: 18px !important;
  align-items: stretch !important;
}

.app-shell:not(.customer-only-shell) .manager-card {
  border-radius: 25px !important;
  border: 1px solid var(--dash-line) !important;
  background: var(--dash-card) !important;
  box-shadow: var(--dash-shadow) !important;
  padding: 20px !important;
  min-height: 100% !important;
}

.app-shell:not(.customer-only-shell) .manager-card h3 {
  color: var(--dash-ink) !important;
  font-size: 22px !important;
  line-height: 1.05 !important;
  letter-spacing: -0.045em !important;
}

.app-shell:not(.customer-only-shell) .sub {
  color: var(--dash-muted) !important;
  font-size: 13px !important;
  margin: 6px 0 18px !important;
}

.app-shell:not(.customer-only-shell) .kitchen-screen-header {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 16px !important;
  margin-bottom: 14px !important;
}

.app-shell:not(.customer-only-shell) .kitchen-bell-actions {
  display: flex !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
}

.app-shell:not(.customer-only-shell) .btn.small {
  min-height: 38px !important;
  border-radius: 13px !important;
  font-weight: 950 !important;
}

.app-shell:not(.customer-only-shell) .btn.secondary,
.app-shell:not(.customer-only-shell) .btn.success {
  background: #fff4ec !important;
  color: var(--dash-orange) !important;
  border: 1px solid rgba(207, 95, 59, 0.22) !important;
}

.app-shell:not(.customer-only-shell) .btn.ghost {
  background: #fff !important;
  color: #5b5148 !important;
  border: 1px solid var(--dash-line) !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-stack {
  gap: 12px !important;
  margin: 14px 0 0 !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-card {
  border-radius: 20px !important;
  background: #fffdf8 !important;
  border: 1px solid rgba(104, 112, 68, 0.13) !important;
  box-shadow: 0 10px 26px rgba(80, 52, 27, 0.07) !important;
  padding: 0 !important;
  overflow: hidden !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-card.not-printed {
  border-left: 5px solid var(--dash-orange) !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-card.printed {
  border-left: 5px solid var(--dash-olive) !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-top {
  padding: 16px 18px 12px !important;
  border-bottom: 1px solid var(--dash-line) !important;
  background: linear-gradient(180deg, #fffaf2, #fffdf8) !important;
}

.app-shell:not(.customer-only-shell) .ticket-eyebrow {
  color: var(--dash-orange) !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-top h4 {
  color: var(--dash-ink) !important;
  font-size: 23px !important;
  letter-spacing: -0.055em !important;
}

.app-shell:not(.customer-only-shell) .kitchen-ticket-top p {
  color: var(--dash-muted) !important;
}

.app-shell:not(.customer-only-shell) .print-status {
  min-height: 30px !important;
  padding: 0 10px !important;
  border-radius: 999px !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

.app-shell:not(.customer-only-shell) .print-status.pending {
  color: var(--dash-orange) !important;
  background: #fff0e9 !important;
}

.app-shell:not(.customer-only-shell) .print-status.printed {
  color: var(--dash-olive) !important;
  background: var(--dash-olive-soft) !important;
}

.app-shell:not(.customer-only-shell) .ticket-lines {
  margin: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: #fff !important;
}

.app-shell:not(.customer-only-shell) .ticket-line {
  padding: 12px 18px !important;
  border-top: 1px solid var(--dash-line) !important;
  font-weight: 950 !important;
  color: var(--dash-ink) !important;
}

.app-shell:not(.customer-only-shell) .ticket-line:first-child {
  border-top: 0 !important;
}

.app-shell:not(.customer-only-shell) .ticket-line small {
  color: var(--dash-olive) !important;
}

.app-shell:not(.customer-only-shell) .ticket-actions {
  padding: 13px 18px 16px !important;
  margin: 0 !important;
  background: #fffaf2 !important;
}

.app-shell:not(.customer-only-shell) .empty {
  border-radius: 20px !important;
  background: rgba(255, 253, 248, 0.75) !important;
  border: 1px dashed rgba(97, 72, 48, 0.18) !important;
  color: var(--dash-muted) !important;
  padding: 32px !important;
}

.app-shell:not(.customer-only-shell) .request-row {
  background: #fffdf8 !important;
  border: 1px solid var(--dash-line) !important;
  border-radius: 20px !important;
  padding: 15px !important;
  box-shadow: 0 10px 24px rgba(80, 52, 27, 0.06) !important;
}

.app-shell:not(.customer-only-shell) .request-row strong {
  color: var(--dash-ink) !important;
  font-size: 16px !important;
}

.app-shell:not(.customer-only-shell) .request-row span {
  color: var(--dash-muted) !important;
}

.app-shell:not(.customer-only-shell) .order-group {
  border-color: var(--dash-line) !important;
  border-radius: 22px !important;
  background: #fff !important;
  box-shadow: 0 10px 26px rgba(80, 52, 27, 0.06) !important;
}

.app-shell:not(.customer-only-shell) .order-group-header {
  background: #fff4ec !important;
  color: var(--dash-ink) !important;
  border-bottom: 1px solid var(--dash-line) !important;
}

.app-shell:not(.customer-only-shell) .order-row {
  background: #fffdf8 !important;
  border-top: 1px solid var(--dash-line) !important;
}

.app-shell:not(.customer-only-shell) .status {
  background: #fff3df !important;
  color: #a86717 !important;
}

.app-shell:not(.customer-only-shell) .status.ready,
.app-shell:not(.customer-only-shell) .status.served {
  color: var(--dash-olive) !important;
  background: var(--dash-olive-soft) !important;
}

.app-shell:not(.customer-only-shell) .status.waiting {
  color: var(--dash-orange) !important;
  background: #fff0e9 !important;
}

.app-shell:not(.customer-only-shell) .table-map {
  gap: 14px !important;
}

.app-shell:not(.customer-only-shell) .table-card {
  border-radius: 22px !important;
  border: 1px solid var(--dash-line) !important;
  background: #fffdf8 !important;
  box-shadow: 0 10px 24px rgba(80, 52, 27, 0.06) !important;
}

.app-shell:not(.customer-only-shell) input,
.app-shell:not(.customer-only-shell) textarea,
.app-shell:not(.customer-only-shell) select {
  background: #fff !important;
  border: 1px solid var(--dash-line) !important;
  border-radius: 15px !important;
}

.app-shell:not(.customer-only-shell) .toast {
  border-radius: 18px !important;
  border: 1px solid var(--dash-line) !important;
  background: rgba(47, 42, 37, 0.96) !important;
}

@media (max-width: 1180px) {
  .app-shell:not(.customer-only-shell) .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .app-shell:not(.customer-only-shell) .two-col {
    grid-template-columns: 1fr !important;
  }

  .app-shell:not(.customer-only-shell) .topbar {
    align-items: flex-start !important;
    border-radius: 24px !important;
  }
}

@media (max-width: 760px) {
  .app-shell:not(.customer-only-shell) {
    padding: 14px !important;
  }

  .app-shell:not(.customer-only-shell) .topbar {
    position: relative !important;
    top: auto !important;
    border-radius: 22px !important;
    display: grid !important;
  }

  .app-shell:not(.customer-only-shell) .brand {
    min-width: 0 !important;
  }

  .app-shell:not(.customer-only-shell) .stats {
    grid-template-columns: 1fr !important;
  }

  .app-shell:not(.customer-only-shell) .stat-card {
    min-height: 112px !important;
  }

  .app-shell:not(.customer-only-shell) .manager-tabs {
    overflow-x: auto !important;
    flex-wrap: nowrap !important;
    justify-content: flex-start !important;
  }

  .app-shell:not(.customer-only-shell) .manager-tab {
    min-width: 150px !important;
  }
}


/* =========================================================
   MANAGER DASHBOARD REAL FACELIFT - OPTION 2
   Structural dashboard redesign with sidebar + premium cards.
   ========================================================= */

.app-shell:not(.customer-only-shell) {
  padding: 18px !important;
  min-height: 100vh !important;
  background:
    radial-gradient(circle at 8% 4%, rgba(208, 102, 62, 0.10), transparent 26%),
    radial-gradient(circle at 94% 0%, rgba(103, 112, 69, 0.13), transparent 30%),
    linear-gradient(180deg, #fffdf8 0%, #f8f0e5 100%) !important;
  color: #2d2925 !important;
}

.app-shell:not(.customer-only-shell) > .topbar {
  display: none !important;
}

.app-shell:not(.customer-only-shell) .grid.manager-only-grid {
  max-width: 1860px !important;
  width: 100% !important;
  margin: 0 auto !important;
  display: block !important;
}

.manager-option2-shell {
  display: grid !important;
  grid-template-columns: 292px minmax(0, 1fr) !important;
  grid-template-rows: auto 1fr !important;
  gap: 0 !important;
  min-height: calc(100vh - 36px) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  border-radius: 32px !important;
  background: rgba(255, 253, 248, 0.82) !important;
  box-shadow: 0 28px 80px rgba(74, 45, 19, 0.12) !important;
  overflow: hidden !important;
  backdrop-filter: blur(18px) !important;
}

.manager-option2-sidebar {
  grid-row: 1 / span 2 !important;
  grid-column: 1 !important;
  padding: 26px 22px !important;
  background:
    radial-gradient(circle at 35% 0%, rgba(255,255,255,0.16), transparent 28%),
    linear-gradient(180deg, #fff9ef 0%, #f6eada 100%) !important;
  border-right: 1px solid rgba(91, 71, 48, 0.12) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 18px !important;
}

.sidebar-logo-block {
  display: flex !important;
  align-items: center !important;
  gap: 13px !important;
  padding: 4px 2px 14px !important;
}

.sidebar-app-logo {
  width: 54px !important;
  height: 54px !important;
  object-fit: contain !important;
  border-radius: 18px !important;
  background: #fff !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  padding: 8px !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.09) !important;
}

.sidebar-logo-block strong {
  display: block !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 28px !important;
  line-height: 1 !important;
  color: #2f2a25 !important;
  letter-spacing: -0.02em !important;
}

.sidebar-logo-block span {
  display: block !important;
  margin-top: 3px !important;
  color: #c46542 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.24em !important;
  font-size: 10px !important;
  font-weight: 950 !important;
}

.sidebar-restaurant-card {
  display: grid !important;
  grid-template-columns: 56px minmax(0, 1fr) !important;
  gap: 12px !important;
  align-items: center !important;
  padding: 14px !important;
  border-radius: 22px !important;
  background: rgba(255,255,255,0.78) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 14px 34px rgba(74, 45, 19, 0.08) !important;
}

.sidebar-restaurant-card .logo-box {
  width: 54px !important;
  height: 54px !important;
  min-width: 54px !important;
  min-height: 54px !important;
  border-radius: 18px !important;
  background: #fff !important;
  box-shadow: none !important;
}

.sidebar-restaurant-card strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 16px !important;
  line-height: 1.05 !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.sidebar-restaurant-card span {
  display: block !important;
  margin-top: 4px !important;
  color: #817466 !important;
  font-size: 12px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.sidebar-nav {
  display: grid !important;
  gap: 8px !important;
  margin-top: 4px !important;
}

.sidebar-nav-item {
  width: 100% !important;
  min-height: 48px !important;
  padding: 0 13px !important;
  border: 0 !important;
  border-radius: 16px !important;
  display: grid !important;
  grid-template-columns: 34px minmax(0, 1fr) !important;
  align-items: center !important;
  text-align: left !important;
  background: transparent !important;
  color: #5c5046 !important;
  font-size: 14px !important;
  font-weight: 900 !important;
}

.sidebar-nav-item span {
  width: 30px !important;
  height: 30px !important;
  border-radius: 10px !important;
  display: grid !important;
  place-items: center !important;
  background: rgba(104, 112, 68, 0.09) !important;
  color: #687044 !important;
  font-size: 15px !important;
}

.sidebar-nav-item.active {
  background: linear-gradient(135deg, #cf5f3b, #b84c2d) !important;
  color: white !important;
  box-shadow: 0 14px 30px rgba(207, 95, 59, 0.24) !important;
}

.sidebar-nav-item.active span {
  background: rgba(255,255,255,0.18) !important;
  color: white !important;
}

.sidebar-summary-card {
  margin-top: auto !important;
  padding: 16px !important;
  border-radius: 22px !important;
  background: rgba(255,255,255,0.75) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
}

.sidebar-summary-card > span {
  display: block !important;
  margin-bottom: 12px !important;
  color: #7c6f62 !important;
  font-size: 12px !important;
  font-weight: 950 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.sidebar-summary-card div {
  display: flex !important;
  justify-content: space-between !important;
  align-items: baseline !important;
  padding: 8px 0 !important;
  border-top: 1px solid rgba(91, 71, 48, 0.08) !important;
}

.sidebar-summary-card div:first-of-type {
  border-top: 0 !important;
}

.sidebar-summary-card strong {
  color: #2f2a25 !important;
  font-size: 20px !important;
  font-weight: 950 !important;
}

.sidebar-summary-card em {
  color: #817466 !important;
  font-style: normal !important;
  font-size: 12px !important;
}

.sidebar-primary-action {
  min-height: 48px !important;
  border: 0 !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #687044, #4f5a31) !important;
  color: #fff !important;
  font-weight: 950 !important;
  box-shadow: 0 14px 30px rgba(79, 90, 49, 0.20) !important;
}

.manager-option2-header {
  grid-column: 2 !important;
  grid-row: 1 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 22px !important;
  padding: 28px 32px 22px !important;
  border: 0 !important;
  border-bottom: 1px solid rgba(91, 71, 48, 0.10) !important;
  background: rgba(255,253,248,0.72) !important;
}

.manager-option2-greeting span {
  display: block !important;
  color: #c46542 !important;
  font-size: 12px !important;
  font-weight: 950 !important;
  letter-spacing: 0.10em !important;
  text-transform: uppercase !important;
  margin-bottom: 7px !important;
}

.manager-option2-greeting h2 {
  margin: 0 !important;
  font-family: Georgia, "Times New Roman", serif !important;
  color: #2f2a25 !important;
  font-size: clamp(30px, 3vw, 46px) !important;
  line-height: 1 !important;
  letter-spacing: -0.045em !important;
}

.manager-option2-greeting p {
  margin: 8px 0 0 !important;
  color: #817466 !important;
  font-size: 13px !important;
}

.manager-option2-actions {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
}

.manager-live-pill {
  min-height: 42px !important;
  padding: 0 16px !important;
  border-radius: 999px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: #eff4df !important;
  color: #4f5a31 !important;
  border: 1px solid rgba(104, 112, 68, 0.18) !important;
  font-weight: 950 !important;
}

.manager-option2-shell > .panel-body.manager-layout {
  grid-column: 2 !important;
  grid-row: 2 !important;
  padding: 24px 32px 32px !important;
  display: grid !important;
  gap: 20px !important;
  overflow: visible !important;
}

.manager-option2-shell > .panel-header + .panel-body {
  padding-top: 24px !important;
}

.manager-option2-shell .stats {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 18px !important;
}

.manager-option2-shell .stat-card {
  min-height: 154px !important;
  padding: 24px 22px 18px 106px !important;
  border-radius: 26px !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,253,248,0.90)) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 18px 44px rgba(74, 45, 19, 0.09) !important;
}

.manager-option2-shell .stat-card::before {
  left: 24px !important;
  top: 26px !important;
  width: 58px !important;
  height: 58px !important;
  border-radius: 20px !important;
}

.manager-option2-shell .stat-card span {
  color: #7f7164 !important;
  font-size: 12px !important;
}

.manager-option2-shell .stat-card strong {
  font-size: 40px !important;
}

.manager-option2-shell .stat-card:nth-child(1) {
  background-image:
    linear-gradient(180deg, rgba(255,255,255,0.94), rgba(255,253,248,0.90)),
    linear-gradient(90deg, transparent 0 58%, rgba(104,112,68,0.10) 58% 100%) !important;
}

.manager-option2-shell .manager-tabs {
  display: none !important;
}

.manager-option2-shell .two-col {
  display: grid !important;
  grid-template-columns: minmax(600px, 1.1fr) minmax(390px, 0.9fr) !important;
  gap: 20px !important;
  align-items: stretch !important;
}

.manager-option2-shell .manager-card {
  border-radius: 28px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: rgba(255, 253, 248, 0.90) !important;
  box-shadow: 0 18px 44px rgba(74, 45, 19, 0.09) !important;
  padding: 24px !important;
}

.manager-option2-shell .kitchen-screen-header {
  padding-bottom: 16px !important;
  border-bottom: 1px solid rgba(91, 71, 48, 0.10) !important;
  margin-bottom: 16px !important;
}

.manager-option2-shell .kitchen-screen-header h3,
.manager-option2-shell .manager-card h3 {
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 28px !important;
  line-height: 1 !important;
  letter-spacing: -0.04em !important;
  color: #2f2a25 !important;
}

.manager-option2-shell .kitchen-ticket-card {
  margin-bottom: 14px !important;
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: #fffdf8 !important;
  box-shadow: 0 12px 30px rgba(74, 45, 19, 0.07) !important;
}

.manager-option2-shell .kitchen-ticket-card.not-printed {
  border-left: 6px solid #cf5f3b !important;
}

.manager-option2-shell .kitchen-ticket-card.printed {
  border-left: 6px solid #687044 !important;
}

.manager-option2-shell .ticket-line {
  font-size: 16px !important;
}

.manager-option2-shell .ticket-actions .btn {
  min-height: 42px !important;
  border-radius: 14px !important;
}

.manager-option2-shell .empty {
  border-radius: 22px !important;
  min-height: 120px !important;
  display: grid !important;
  place-items: center !important;
}

.manager-option2-shell .table-card,
.manager-option2-shell .order-group,
.manager-option2-shell .request-row,
.manager-option2-shell .menu-card,
.manager-option2-shell .category-card {
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 12px 30px rgba(74, 45, 19, 0.06) !important;
}

.manager-option2-shell .btn {
  border-radius: 14px !important;
  font-weight: 950 !important;
}

.manager-option2-shell .btn:not(.danger) {
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
}

@media (max-width: 1260px) {
  .manager-option2-shell {
    grid-template-columns: 1fr !important;
  }

  .manager-option2-sidebar {
    grid-row: auto !important;
    grid-column: 1 !important;
    flex-direction: row !important;
    align-items: center !important;
    overflow-x: auto !important;
    padding: 16px !important;
    border-right: 0 !important;
    border-bottom: 1px solid rgba(91, 71, 48, 0.12) !important;
  }

  .sidebar-nav {
    display: flex !important;
    gap: 8px !important;
  }

  .sidebar-nav-item {
    min-width: 130px !important;
  }

  .sidebar-summary-card,
  .sidebar-primary-action {
    display: none !important;
  }

  .manager-option2-header,
  .manager-option2-shell > .panel-body.manager-layout {
    grid-column: 1 !important;
  }

  .manager-option2-shell .two-col {
    grid-template-columns: 1fr !important;
  }
}

@media (max-width: 880px) {
  .app-shell:not(.customer-only-shell) {
    padding: 10px !important;
  }

  .manager-option2-shell {
    border-radius: 24px !important;
  }

  .manager-option2-header {
    display: grid !important;
    padding: 20px !important;
  }

  .manager-option2-shell > .panel-body.manager-layout {
    padding: 18px !important;
  }

  .manager-option2-shell .stats {
    grid-template-columns: 1fr !important;
  }
}



/* Menu Builder category facelift */
.manager-option2-shell .category-builder-card {
  padding: 22px !important;
  border-radius: 28px !important;
  background:
    radial-gradient(circle at 0% 0%, rgba(207, 95, 59, 0.10), transparent 34%),
    linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,250,242,0.92)) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 16px 38px rgba(74, 45, 19, 0.08) !important;
  margin-bottom: 20px !important;
}

.manager-option2-shell .category-builder-card h4 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 28px !important;
  line-height: 1 !important;
  letter-spacing: -0.04em !important;
}

.manager-option2-shell .category-builder-card > p {
  margin: 7px 0 18px !important;
  color: #817466 !important;
  font-size: 13px !important;
}

.manager-option2-shell .premium-category-list {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 12px !important;
  margin-top: 18px !important;
}

.manager-option2-shell .manager-category-card {
  width: 100% !important;
  min-height: 92px !important;
  display: grid !important;
  grid-template-columns: 66px minmax(0, 1fr) auto !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 12px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  border-radius: 22px !important;
  background: rgba(255, 255, 255, 0.82) !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.07) !important;
  text-align: left !important;
  cursor: pointer !important;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease !important;
}

.manager-option2-shell .manager-category-card:hover {
  transform: translateY(-2px) !important;
  border-color: rgba(207, 95, 59, 0.24) !important;
  box-shadow: 0 18px 38px rgba(74, 45, 19, 0.10) !important;
}

.manager-option2-shell .manager-category-card.selected {
  background: linear-gradient(135deg, #fff4ec, #fffdf8) !important;
  border-color: rgba(207, 95, 59, 0.34) !important;
  box-shadow: 0 16px 36px rgba(207, 95, 59, 0.12) !important;
}

.manager-option2-shell .manager-category-photo {
  width: 66px !important;
  height: 66px !important;
  border-radius: 18px !important;
  overflow: hidden !important;
  display: grid !important;
  place-items: center !important;
  background:
    linear-gradient(135deg, rgba(207, 95, 59, 0.14), rgba(104, 112, 68, 0.11)),
    #f7eadb !important;
  color: #c46542 !important;
  font-weight: 950 !important;
  font-size: 18px !important;
}

.manager-option2-shell .manager-category-photo img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
}

.manager-option2-shell .manager-category-copy {
  min-width: 0 !important;
  display: grid !important;
  gap: 3px !important;
}

.manager-option2-shell .manager-category-copy strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 16px !important;
  line-height: 1.08 !important;
  font-weight: 950 !important;
  white-space: normal !important;
}

.manager-option2-shell .manager-category-copy em {
  display: block !important;
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.12 !important;
  font-style: normal !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

.manager-option2-shell .manager-category-copy small {
  display: inline-flex !important;
  width: fit-content !important;
  margin-top: 4px !important;
  padding: 4px 8px !important;
  border-radius: 999px !important;
  background: #eff4df !important;
  color: #4f5a31 !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

.manager-option2-shell .manager-category-card b {
  min-width: 58px !important;
  min-height: 32px !important;
  padding: 0 10px !important;
  border-radius: 999px !important;
  display: inline-grid !important;
  place-items: center !important;
  background: #fff3e8 !important;
  color: #c46542 !important;
  border: 1px solid rgba(207, 95, 59, 0.16) !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

.manager-option2-shell .manager-category-card.selected b {
  background: linear-gradient(135deg, #cf5f3b, #b84c2d) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.manager-option2-shell .premium-empty-category {
  grid-column: 1 / -1 !important;
  min-height: 100px !important;
  display: grid !important;
  place-items: center !important;
  text-align: center !important;
  padding: 18px !important;
  border-radius: 22px !important;
  border: 1px dashed rgba(91, 71, 48, 0.20) !important;
  background: rgba(255,255,255,0.55) !important;
}

.manager-option2-shell .premium-empty-category strong {
  color: #2f2a25 !important;
  font-size: 18px !important;
}

.manager-option2-shell .premium-empty-category span {
  color: #817466 !important;
  font-size: 13px !important;
}

/* Also upgrade the category accordion headers on the right side */
.manager-option2-shell .category-accordion {
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: rgba(255, 253, 248, 0.88) !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.06) !important;
  overflow: hidden !important;
  margin-bottom: 12px !important;
}

.manager-option2-shell .category-accordion-header {
  min-height: 72px !important;
  padding: 14px 16px !important;
  border: 0 !important;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,247,238,0.88)) !important;
}

.manager-option2-shell .category-accordion-header.expanded {
  background:
    linear-gradient(135deg, rgba(207, 95, 59, 0.10), rgba(255,253,248,0.96)) !important;
}

.manager-option2-shell .category-accordion-header strong {
  color: #2f2a25 !important;
  font-size: 18px !important;
  line-height: 1.05 !important;
}

.manager-option2-shell .category-accordion-header span {
  color: #817466 !important;
  font-size: 12px !important;
}

.manager-option2-shell .category-accordion-meta span {
  background: #eff4df !important;
  color: #4f5a31 !important;
  border-radius: 999px !important;
  padding: 6px 10px !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

.manager-option2-shell .category-accordion-meta b {
  background: #fff3e8 !important;
  color: #c46542 !important;
  border: 1px solid rgba(207, 95, 59, 0.16) !important;
  border-radius: 999px !important;
  padding: 7px 11px !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

@media (max-width: 980px) {
  .manager-option2-shell .premium-category-list {
    grid-template-columns: 1fr !important;
  }
}



/* Restaurant logo restore/fix */
.manager-option2-shell .restaurant-brand-logo-block {
  align-items: center !important;
  padding-bottom: 18px !important;
}

.manager-option2-shell .restaurant-brand-logo-block .logo-box {
  width: 70px !important;
  height: 70px !important;
  min-width: 70px !important;
  min-height: 70px !important;
  max-width: 70px !important;
  max-height: 70px !important;
  border-radius: 22px !important;
  background: #fff !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  box-shadow: 0 14px 32px rgba(74, 45, 19, 0.10) !important;
  overflow: hidden !important;
}

.manager-option2-shell .restaurant-brand-logo-block .logo-box img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  padding: 8px !important;
}

.manager-option2-shell .restaurant-brand-logo-block .logo-box span {
  font-size: 24px !important;
  font-weight: 1000 !important;
  color: #c46542 !important;
}

.manager-option2-shell .restaurant-brand-logo-block strong {
  font-size: 24px !important;
  max-width: 170px !important;
  white-space: normal !important;
  line-height: 1.02 !important;
}

.manager-option2-shell .restaurant-brand-logo-block span {
  letter-spacing: 0.08em !important;
}

.manager-option2-shell .restaurant-logo-upload-card {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  align-items: center !important;
  gap: 14px !important;
  margin: 0 0 18px !important;
  padding: 15px !important;
  border-radius: 20px !important;
  background: linear-gradient(135deg, #fff4ec, #fffdf8) !important;
  border: 1px solid rgba(207, 95, 59, 0.18) !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.07) !important;
}

.manager-option2-shell .restaurant-logo-upload-card strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 16px !important;
  font-weight: 950 !important;
}

.manager-option2-shell .restaurant-logo-upload-card span {
  display: block !important;
  margin-top: 4px !important;
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.3 !important;
}

.manager-option2-shell .restaurant-logo-upload-button {
  position: relative !important;
  overflow: hidden !important;
  cursor: pointer !important;
  white-space: nowrap !important;
}

.manager-option2-shell .restaurant-logo-upload-button input {
  position: absolute !important;
  inset: 0 !important;
  opacity: 0 !important;
  cursor: pointer !important;
}

.qr-logo-mark img,
.print-logo img,
.logo-box img {
  object-fit: contain !important;
}



/* =========================================================
   QR LOGO CENTER + REMOVE GENERIC DASHBOARD ICONS
   - Logo sits inside the QR code, centered.
   - No generic clip-art icons beside dashboard/sidebar tabs.
   ========================================================= */

.manager-option2-shell .sidebar-nav-item {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  grid-template-columns: none !important;
  gap: 0 !important;
  padding: 0 17px !important;
}

.manager-option2-shell .sidebar-nav-item span {
  display: none !important;
}

.manager-option2-shell .stat-card {
  padding-left: 24px !important;
}

.manager-option2-shell .stat-card::before,
.manager-option2-shell .stat-card::after,
.app-shell:not(.customer-only-shell) .stat-card::before,
.app-shell:not(.customer-only-shell) .stat-card::after {
  display: none !important;
  content: none !important;
}

.manager-option2-shell .manager-tab::before,
.manager-option2-shell .manager-tab::after,
.app-shell:not(.customer-only-shell) .manager-tab::before,
.app-shell:not(.customer-only-shell) .manager-tab::after {
  display: none !important;
  content: none !important;
}

/* QR preview and printed QR card */
.real-qr-wrap.prestigious-qr,
.print-qr-wrap.prestigious-qr {
  position: relative !important;
  width: min(100%, 360px) !important;
  max-width: 360px !important;
  aspect-ratio: 1 / 1 !important;
  display: grid !important;
  place-items: center !important;
  margin: 0 auto !important;
  padding: 14px !important;
  border-radius: 28px !important;
  background: #ffffff !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  box-shadow: 0 18px 45px rgba(74, 45, 19, 0.12) !important;
  overflow: hidden !important;
}

.real-qr-wrap.prestigious-qr .qr-base-image,
.print-qr-wrap.prestigious-qr .qr-base-image,
.real-qr-wrap.prestigious-qr .print-qr,
.print-qr-wrap.prestigious-qr .print-qr {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  object-fit: contain !important;
  border-radius: 20px !important;
  background: #ffffff !important;
}

.real-qr-wrap.prestigious-qr .qr-logo-mark,
.print-qr-wrap.prestigious-qr .qr-logo-mark,
.print-qr-logo-mark {
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  right: auto !important;
  bottom: auto !important;
  transform: translate(-50%, -50%) !important;
  width: 22% !important;
  height: 22% !important;
  min-width: 66px !important;
  min-height: 66px !important;
  max-width: 96px !important;
  max-height: 96px !important;
  z-index: 5 !important;
  display: grid !important;
  place-items: center !important;
  padding: 8px !important;
  border-radius: 22px !important;
  background: #ffffff !important;
  border: 4px solid #ffffff !important;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16) !important;
  pointer-events: none !important;
}

.real-qr-wrap.prestigious-qr .qr-logo-mark img,
.print-qr-wrap.prestigious-qr .qr-logo-mark img,
.print-qr-logo-mark img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  display: block !important;
}

.real-qr-wrap.prestigious-qr .qr-logo-mark span,
.print-qr-wrap.prestigious-qr .qr-logo-mark span {
  color: #2f2a25 !important;
  font-weight: 1000 !important;
  font-size: 24px !important;
}

.print-card > .logo-box,
.print-card > .print-logo,
.print-card > .qr-logo-mark:not(.print-qr-logo-mark) {
  display: none !important;
}

/* Remove remaining generic clip-art circles on the dashboard, but keep restaurant logos and menu item photos. */
.manager-option2-shell [class*="icon"]:not(.logo-box):not(.sidebar-app-logo):not(.manager-category-photo):not(.item-icon):not(.auth-feature-icon) {
  display: none !important;
}

@media print {
  .print-qr-wrap.prestigious-qr {
    width: 330px !important;
    max-width: 330px !important;
    padding: 12px !important;
    box-shadow: none !important;
  }

  .print-qr-wrap.prestigious-qr .qr-logo-mark {
    width: 22% !important;
    height: 22% !important;
    min-width: 64px !important;
    min-height: 64px !important;
    max-width: 86px !important;
    max-height: 86px !important;
    border: 4px solid #ffffff !important;
  }
}



/* =========================================================
   PRESENTABLE LETTER PAPER QR PRINT LAYOUT
   Designed for putting into a simple sleeve / table stand.
   ========================================================= */

.print-sheet {
  position: fixed !important;
  left: -99999px !important;
  top: 0 !important;
  width: 8.5in !important;
  min-height: 11in !important;
  padding: 0 !important;
  margin: 0 !important;
  pointer-events: none !important;
  opacity: 0 !important;
  overflow: hidden !important;
}

.print-page {
  width: 8.5in !important;
  min-height: 11in !important;
  padding: 0.42in !important;
  background:
    radial-gradient(circle at 0% 0%, rgba(207, 95, 59, 0.10), transparent 24%),
    radial-gradient(circle at 100% 0%, rgba(104, 112, 68, 0.10), transparent 28%),
    linear-gradient(180deg, #fffcf7 0%, #f7eee2 100%) !important;
}

.print-page-frame {
  min-height: calc(11in - 0.84in) !important;
  border-radius: 26px !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,252,247,0.93)) !important;
  box-shadow: 0 20px 60px rgba(74, 45, 19, 0.12) !important;
  padding: 0.42in 0.45in 0.36in !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  text-align: center !important;
}

.print-page-header {
  width: 100% !important;
  padding-bottom: 0.20in !important;
  border-bottom: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.print-page-eyebrow {
  display: inline-flex !important;
  min-height: 28px !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 12px !important;
  border-radius: 999px !important;
  background: #fff0e8 !important;
  color: #c46542 !important;
  font-size: 11px !important;
  font-weight: 950 !important;
  letter-spacing: 0.18em !important;
  margin-bottom: 10px !important;
}

.print-page-header h1 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-family: Georgia, "Times New Roman", serif !important;
  font-size: 34px !important;
  line-height: 1 !important;
  letter-spacing: -0.03em !important;
}

 .print-page-logo-card {
  width: 118px !important;
  height: 118px !important;
  margin: 0 auto 12px !important;
  border-radius: 30px !important;
  background: linear-gradient(180deg, #ffffff, #fff9f2) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 14px 34px rgba(74, 45, 19, 0.10) !important;
  display: grid !important;
  place-items: center !important;
  overflow: hidden !important;
}

.print-page-logo {
  width: 78% !important;
  height: 78% !important;
  object-fit: contain !important;
  display: block !important;
}

.print-page-logo-fallback {
  width: 78px !important;
  height: 78px !important;
  border-radius: 24px !important;
  display: grid !important;
  place-items: center !important;
  background: linear-gradient(180deg, #fff0e8, #f8d8c6) !important;
  color: #8f4f30 !important;
  font-size: 28px !important;
  font-weight: 1000 !important;
}

.print-page-header p {
  margin: 8px 0 16px !important;
  color: #7b7167 !important;
  font-size: 14px !important;
}

.print-table-badge {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 44px !important;
  padding: 0 22px !important;
  border-radius: 999px !important;
  background: linear-gradient(135deg, #cf5f3b, #b84c2d) !important;
  color: #fff !important;
  font-size: 19px !important;
  font-weight: 950 !important;
  letter-spacing: 0.01em !important;
  box-shadow: 0 14px 28px rgba(207, 95, 59, 0.20) !important;
}

.print-hero-copy {
  max-width: 5.8in !important;
  margin: 0.32in auto 0.24in !important;
}

.print-hero-copy h2 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-size: 28px !important;
  line-height: 1 !important;
  letter-spacing: -0.03em !important;
}

.print-hero-copy p {
  margin: 10px 0 0 !important;
  color: #6d6358 !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

.print-qr-showcase {
  width: 100% !important;
  display: grid !important;
  place-items: center !important;
  padding: 0.08in 0 0.24in !important;
}

.print-qr-wrap.prestigious-qr {
  width: 4.55in !important;
  max-width: 4.55in !important;
  aspect-ratio: 1 / 1 !important;
  padding: 0.20in !important;
  border-radius: 30px !important;
  background: #fff !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  box-shadow: 0 20px 44px rgba(74, 45, 19, 0.13) !important;
}

.print-qr-wrap.prestigious-qr .print-qr {
  border-radius: 20px !important;
  background: #fff !important;
}

.print-qr-wrap.prestigious-qr .qr-logo-mark {
  width: 20% !important;
  height: 20% !important;
  min-width: 0.86in !important;
  min-height: 0.86in !important;
  max-width: 1.04in !important;
  max-height: 1.04in !important;
  border-radius: 22px !important;
  border: 5px solid #fff !important;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16) !important;
}

.print-steps-grid {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 12px !important;
  margin-top: auto !important;
  padding-top: 0.10in !important;
}

.print-step-card {
  min-height: 108px !important;
  padding: 16px 14px !important;
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,249,241,0.88)) !important;
  display: grid !important;
  justify-items: center !important;
  align-content: center !important;
  gap: 10px !important;
  box-shadow: 0 12px 26px rgba(74, 45, 19, 0.07) !important;
}

.print-step-card strong {
  width: 38px !important;
  height: 38px !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: #eff4df !important;
  color: #4f5a31 !important;
  font-size: 18px !important;
  font-weight: 950 !important;
}

.print-step-card span {
  color: #2f2a25 !important;
  font-size: 14px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
}

.print-page-footer {
  width: 100% !important;
  margin-top: 0.20in !important;
  padding-top: 0.18in !important;
  border-top: 1px solid rgba(91, 71, 48, 0.10) !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 10px !important;
}

.print-page-footer span {
  color: #5f554b !important;
  font-size: 13px !important;
  font-weight: 900 !important;
}

.print-page-footer em {
  color: #9a8b7d !important;
  font-style: normal !important;
  font-size: 12px !important;
}

@page {
  size: letter portrait;
  margin: 0;
}

@media print {
  html, body {
    background: #fff !important;
  }

  body * {
    visibility: hidden !important;
  }

  .print-sheet,
  .print-sheet * {
    visibility: visible !important;
  }

  .print-sheet {
    position: static !important;
    left: auto !important;
    top: auto !important;
    width: auto !important;
    min-height: auto !important;
    opacity: 1 !important;
    overflow: visible !important;
    pointer-events: auto !important;
  }

  .print-page {
    width: 8.5in !important;
    min-height: 11in !important;
    padding: 0.42in !important;
    page-break-after: avoid !important;
  }

  .print-page-frame {
    box-shadow: none !important;
  }
}



/* =========================================================
   FORCE QR PRINT TO EXACTLY ONE LETTER PAGE
   Previous print CSS used visibility:hidden, which can still leave hidden
   dashboard layout taking print space in some browsers. This removes
   everything except the print sheet from print layout.
   ========================================================= */

@page {
  size: letter portrait;
  margin: 0;
}

@media print {
  html,
  body {
    width: 8.5in !important;
    height: 11in !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: #fff !important;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Remove dashboard/customer app from print layout completely. */
  main > *:not(.print-sheet),
  .app-shell > *:not(.print-sheet),
  .manager-option2-shell,
  .toast,
  .image-modal,
  .fixed-send-order-bar {
    display: none !important;
  }

  /* Print only the QR sheet. */
  .print-sheet {
    display: block !important;
    position: fixed !important;
    inset: 0 !important;
    left: 0 !important;
    top: 0 !important;
    width: 8.5in !important;
    height: 11in !important;
    min-height: 0 !important;
    max-height: 11in !important;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 1 !important;
    visibility: visible !important;
    overflow: hidden !important;
    pointer-events: auto !important;
    page-break-before: avoid !important;
    page-break-after: avoid !important;
    break-before: avoid !important;
    break-after: avoid !important;
  }

  .print-sheet * {
    visibility: visible !important;
    box-sizing: border-box !important;
  }

  .print-page {
    display: block !important;
    width: 8.5in !important;
    height: 11in !important;
    min-height: 0 !important;
    max-height: 11in !important;
    margin: 0 !important;
    padding: 0.34in !important;
    overflow: hidden !important;
    page-break-before: avoid !important;
    page-break-after: avoid !important;
    break-before: avoid !important;
    break-after: avoid !important;
  }

  .print-page-frame {
    width: 100% !important;
    height: 10.32in !important;
    min-height: 0 !important;
    max-height: 10.32in !important;
    margin: 0 !important;
    padding: 0.30in 0.36in 0.24in !important;
    overflow: hidden !important;
    box-shadow: none !important;
    border-radius: 24px !important;
  }

  .print-page-header {
    padding-bottom: 0.12in !important;
  }

  .print-page-eyebrow {
    min-height: 24px !important;
    margin-bottom: 7px !important;
    font-size: 9px !important;
  }

  .print-page-header h1 {
    font-size: 30px !important;
  }

  .print-page-logo-card {
    width: 96px !important;
    height: 96px !important;
    margin: 0 auto 9px !important;
    border-radius: 24px !important;
  }

  .print-page-logo-fallback {
    width: 66px !important;
    height: 66px !important;
    border-radius: 20px !important;
    font-size: 24px !important;
  }

  .print-page-header p {
    margin: 6px 0 11px !important;
    font-size: 12px !important;
  }

  .print-table-badge {
    min-height: 38px !important;
    padding: 0 18px !important;
    font-size: 17px !important;
  }

  .print-hero-copy {
    margin: 0.18in auto 0.15in !important;
    max-width: 5.8in !important;
  }

  .print-hero-copy h2 {
    font-size: 24px !important;
  }

  .print-hero-copy p {
    margin-top: 7px !important;
    font-size: 12px !important;
    line-height: 1.32 !important;
  }

  .print-qr-showcase {
    padding: 0.04in 0 0.14in !important;
  }

  .print-qr-wrap.prestigious-qr {
    width: 3.95in !important;
    max-width: 3.95in !important;
    padding: 0.16in !important;
    border-radius: 26px !important;
    box-shadow: none !important;
  }

  .print-qr-wrap.prestigious-qr .qr-logo-mark {
    width: 20% !important;
    height: 20% !important;
    min-width: 0.72in !important;
    min-height: 0.72in !important;
    max-width: 0.88in !important;
    max-height: 0.88in !important;
    border-radius: 18px !important;
    border: 4px solid #fff !important;
  }

  .print-steps-grid {
    gap: 9px !important;
    padding-top: 0.04in !important;
  }

  .print-step-card {
    min-height: 0.72in !important;
    padding: 9px 10px !important;
    border-radius: 18px !important;
    gap: 6px !important;
  }

  .print-step-card strong {
    width: 30px !important;
    height: 30px !important;
    font-size: 15px !important;
  }

  .print-step-card span {
    font-size: 12px !important;
    line-height: 1.15 !important;
  }

  .print-page-footer {
    margin-top: 0.11in !important;
    padding-top: 0.11in !important;
  }

  .print-page-footer span,
  .print-page-footer em {
    font-size: 10px !important;
  }
}



/* =========================================================
   FIX PRINT INSTRUCTION CARDS READABILITY
   The old 1/2/3 row was too compressed and only the numbers showed.
   This makes the text large, dark, and side-by-side with the number.
   ========================================================= */

.print-steps-grid.print-steps-readable,
.print-steps-readable {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px !important;
  margin-top: 0.08in !important;
  padding-top: 0 !important;
}

.print-steps-readable .print-step-card {
  min-height: 0.78in !important;
  padding: 10px 12px !important;
  border-radius: 18px !important;
  display: grid !important;
  grid-template-columns: 34px minmax(0, 1fr) !important;
  align-items: center !important;
  justify-items: stretch !important;
  align-content: center !important;
  gap: 10px !important;
  text-align: left !important;
  background: linear-gradient(180deg, #ffffff, #fff8ef) !important;
  border: 1px solid rgba(91, 71, 48, 0.13) !important;
  box-shadow: 0 10px 24px rgba(74, 45, 19, 0.07) !important;
}

.print-steps-readable .print-step-card strong {
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  min-height: 32px !important;
  border-radius: 999px !important;
  display: grid !important;
  place-items: center !important;
  background: #eff4df !important;
  color: #4f5a31 !important;
  font-size: 16px !important;
  font-weight: 1000 !important;
}

.print-step-text {
  display: grid !important;
  min-width: 0 !important;
  gap: 2px !important;
}

.print-step-text b {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 15px !important;
  line-height: 1.05 !important;
  font-weight: 1000 !important;
  letter-spacing: -0.02em !important;
  white-space: nowrap !important;
}

.print-step-text small {
  display: block !important;
  color: #6b6158 !important;
  font-size: 10.5px !important;
  line-height: 1.08 !important;
  font-weight: 800 !important;
  white-space: nowrap !important;
}

@media print {
  .print-steps-grid.print-steps-readable,
  .print-steps-readable {
    gap: 8px !important;
    margin-top: 0.07in !important;
    padding-top: 0 !important;
  }

  .print-steps-readable .print-step-card {
    min-height: 0.68in !important;
    padding: 8px 9px !important;
    border-radius: 16px !important;
    grid-template-columns: 30px minmax(0, 1fr) !important;
    gap: 8px !important;
  }

  .print-steps-readable .print-step-card strong {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    font-size: 14px !important;
  }

  .print-step-text b {
    font-size: 13px !important;
    color: #2f2a25 !important;
  }

  .print-step-text small {
    font-size: 9.5px !important;
    color: #6b6158 !important;
  }
}



/* =========================================================
   CUSTOMER ITEM PHOTO MODAL RESTORE
   Tapping a menu photo opens a real centered full-screen modal again,
   instead of rendering the enlarged image at the bottom of the page.
   ========================================================= */

.image-modal,
main.customer-only-shell .image-modal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 2147483000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: max(18px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom)) !important;
  background: rgba(24, 18, 14, 0.72) !important;
  backdrop-filter: blur(18px) saturate(1.05) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.05) !important;
  overflow-y: auto !important;
  overscroll-behavior: contain !important;
  touch-action: pan-y !important;
}

.image-modal-card,
main.customer-only-shell .image-modal-card {
  width: min(94vw, 680px) !important;
  max-height: calc(100dvh - 32px) !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  border-radius: 28px !important;
  background: rgba(255, 250, 243, 0.98) !important;
  border: 1px solid rgba(255, 255, 255, 0.22) !important;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42) !important;
}

.image-modal-head,
main.customer-only-shell .image-modal-head {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  gap: 12px !important;
  align-items: start !important;
  padding: 16px 16px 12px !important;
  border-bottom: 1px solid rgba(129, 92, 62, 0.12) !important;
}

.image-modal-head h3,
main.customer-only-shell .image-modal-head h3 {
  margin: 0 !important;
  color: #32251f !important;
  font-size: 20px !important;
  line-height: 1.08 !important;
  font-weight: 950 !important;
}

.image-modal-head p,
main.customer-only-shell .image-modal-head p {
  margin: 5px 0 0 !important;
  color: #786a5f !important;
  font-size: 12px !important;
  line-height: 1.28 !important;
}

.image-modal-head .btn,
main.customer-only-shell .image-modal-head .btn {
  min-height: 36px !important;
  padding: 0 13px !important;
  border-radius: 999px !important;
  background: #fff !important;
  border: 1px solid rgba(129, 92, 62, 0.14) !important;
  color: #4a3227 !important;
  box-shadow: 0 8px 20px rgba(73, 49, 30, 0.10) !important;
}

.image-modal-card > img,
main.customer-only-shell .image-modal-card > img {
  width: 100% !important;
  height: auto !important;
  max-height: calc(100dvh - 150px) !important;
  display: block !important;
  object-fit: contain !important;
  background: #f3e6d7 !important;
}

@media (max-width: 430px) {
  .image-modal,
  main.customer-only-shell .image-modal {
    align-items: center !important;
    padding: 12px !important;
  }

  .image-modal-card,
  main.customer-only-shell .image-modal-card {
    width: calc(100vw - 24px) !important;
    max-height: calc(100dvh - 24px) !important;
    border-radius: 24px !important;
  }

  .image-modal-head,
  main.customer-only-shell .image-modal-head {
    padding: 13px 13px 10px !important;
  }

  .image-modal-head h3,
  main.customer-only-shell .image-modal-head h3 {
    font-size: 18px !important;
  }

  .image-modal-card > img,
  main.customer-only-shell .image-modal-card > img {
    max-height: calc(100dvh - 142px) !important;
  }
}

`;



type Profile = {
  businessId: string;
  authUserId: string;
  restaurantName: string;
  branchName: string;
  businessType: string;
  tableCount: number;
  locationCount: number;
  businessEmail: string;
  username: string;
  businessPhone: string;
  location: string;
  locations: string[];
  signupIp: string;
  welcomeMessage: string;
  brandColor: string;
  logoDataUrl: string;
};

type SavedBusinessAccount = {
  username: string;
  businessEmail: string;
  businessPhone: string;
  restaurantName: string;
  branchName: string;
  location: string;
  locations: string[];
  signupIp: string;
  createdAt: string;
};

type MenuCategory = {
  id: string;
  name: string;
  nameAr: string;
};

type MenuItem = {
  id: string;
  name: string;
  nameAr: string;
  desc: string;
  price: number;
  icon: string;
  available: boolean;
  categoryId: string;
  categoryName: string;
  availableAllDay: boolean;
  availableFrom: string;
  availableTo: string;
  imageThumbUrl?: string;
  imageFullUrl?: string;
};

type MenuRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string;
  category_id: string | null;
  category_name: string | null;
  item_name: string;
  item_name_ar: string | null;
  description: string | null;
  price_jod: number | string;
  short_code: string | null;
  available: boolean | null;
  available_all_day: boolean | null;
  available_from: string | null;
  available_to: string | null;
  image_thumb_url: string | null;
  image_full_url: string | null;
  image_url?: string | null;
  image_path?: string | null;
  sort_order: number | null;
  created_at: string | null;
};

type CategoryRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string;
  name: string;
  name_ar: string | null;
  sort_order: number | null;
  created_at: string | null;
};

type TableGuestRow = {
  id: string;
  business_account_id: string;
  table_number: number;
  guest_name: string;
  active: boolean | null;
  created_at: string | null;
  last_seen_at: string | null;
};

type MenuDraft = {
  name: string;
  nameAr: string;
  desc: string;
  price: string;
  icon: string;
  categoryId: string;
  available: boolean;
  availableAllDay: boolean;
  availableFrom: string;
  availableTo: string;
  imageThumbUrl: string;
  imageFullUrl: string;
};

type Order = {
  id: string;
  table: number;
  guest: string;
  itemId: string;
  itemName: string;
  price: number;
  quantity: number;
  status: "New" | "Preparing" | "Ready" | "Picked up" | "Served";
  createdAt: string;
  orderTicketId: string;
  ticketNumber: number | null;
  kitchenPrintJobId: string;
  customerBillPrintJobId: string;
  kitchenPrintedAt: string;
  customerBillPrintedAt: string;
  printNote: string;
};

type CartLine = {
  item: MenuItem;
  quantity: number;
  lineTotal: number;
};

type KitchenTicketGroup = {
  key: string;
  orderTicketId: string;
  ticketNumber: number | null;
  table: number;
  guest: string;
  orders: Order[];
  itemCount: number;
  total: number;
  createdAt: string;
  kitchenPrintJobId: string;
  kitchenPrintedAt: string;
  printNote: string;
};

type TableOrderRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string;
  order_ticket_id?: string | null;
  ticket_number?: number | string | null;
  table_number: number;
  guest_name: string;
  item_id: string;
  item_name: string;
  quantity: number | null;
  price_jod: number | string;
  line_total_jod: number | string | null;
  status: Order["status"];
  kitchen_print_job_id?: string | null;
  customer_bill_print_job_id?: string | null;
  kitchen_printed_at?: string | null;
  customer_bill_printed_at?: string | null;
  print_note?: string | null;
  created_at: string | null;
};

type ServiceRequest = {
  id: string;
  table: number;
  guest: string;
  type: string;
  status: "Waiting" | "Resolved";
  createdAt: string;
};

type AppState = {
  profileComplete: boolean;
  profile: Profile;
  currentGuest: string;
  guests: string[];
  menu: MenuItem[];
  categories: MenuCategory[];
  orders: Order[];
  requests: ServiceRequest[];
  qrTokens: Record<string, string>;
  lastQrTable: number;
};

const STORAGE_KEY = "tawleh-manager-v8-working-baseline-signup";
const MANAGER_AUTH_STORAGE_KEY = "tawleh-manager-auth-session-v1";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
const DEMO_TABLE = 5;
const APP_LOGO_SRC = "/tawleh_logo.png";
const PUBLIC_CUSTOMER_SITE_URL = (process.env.NEXT_PUBLIC_TAWLEH_CUSTOMER_URL || "https://tawleh.getdarik.com").replace(/\/+$/, "");

const starterMenu: MenuItem[] = [];

const emptyMenuDraft: MenuDraft = {
  name: "",
  nameAr: "",
  desc: "",
  price: "",
  icon: "",
  categoryId: "",
  available: true,
  availableAllDay: true,
  availableFrom: "09:00",
  availableTo: "23:00",
  imageThumbUrl: "",
  imageFullUrl: "",
};

const defaultState: AppState = {
  profileComplete: false,
  profile: {
    businessId: "",
    authUserId: "",
    restaurantName: "",
    branchName: "",
    businessType: "Cafe",
    tableCount: 9,
    locationCount: 1,
    businessEmail: "",
    username: "",
    businessPhone: "",
    location: "",
    locations: [""],
    signupIp: "",
    welcomeMessage: "Have a seat, enter your name, and order under your own name.",
    brandColor: "#c8613f",
    logoDataUrl: "",
  },
  currentGuest: "",
  guests: [],
  menu: starterMenu,
  categories: [],
  orders: [],
  requests: [],
  qrTokens: {},
  lastQrTable: DEMO_TABLE,
};

function money(value: number) {
  return `${Number(value || 0).toFixed(2)} JOD`;
}

function slugify(value: string) {
  return (value || "restaurant")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "restaurant";
}

function normalizeUsername(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
}

function normalizePhone(value: string) {
  return value.trim().replace(/[^0-9+]/g, "");
}

function buildLocationInputs(current: string[], count: number) {
  const safeCount = Math.max(1, Math.min(25, Number(count || 1)));
  return Array.from({ length: safeCount }, (_, index) => current[index] || "");
}

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function initials(name: string) {
  const parts = (name || "Tawleh").trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0] || "").join("").toUpperCase() || "T";
}


function cleanPersistedImageUrl(value: unknown) {
  const text = String(value || "").trim();
  if (!text) return "";

  // Never keep base64 images in localStorage. They crash the browser fast.
  if (text.startsWith("data:image/")) return "";

  return text;
}

function cleanMenuItemForStorage(item: MenuItem): MenuItem {
  return {
    ...item,
    imageThumbUrl: cleanPersistedImageUrl(item.imageThumbUrl),
    imageFullUrl: cleanPersistedImageUrl(item.imageFullUrl),
  };
}

function sanitizeStateForLocalStorage(nextState: AppState): AppState {
  return {
    ...nextState,
    profile: {
      ...nextState.profile,
      // Logo upload will move to Supabase later too. For now, don't let a base64 logo crash the site.
      logoDataUrl: cleanPersistedImageUrl(nextState.profile.logoDataUrl),
    },
    menu: nextState.menu.map(cleanMenuItemForStorage),
  };
}

function safeSaveStateToLocalStorage(nextState: AppState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeStateForLocalStorage(nextState)));
  } catch (error) {
    console.warn("Tawleh localStorage save skipped to prevent browser crash", error);

    try {
      const fallbackState: AppState = {
        ...defaultState,
        profileComplete: nextState.profileComplete,
        profile: {
          ...nextState.profile,
          logoDataUrl: "",
        },
        categories: nextState.categories,
        qrTokens: nextState.qrTokens,
        lastQrTable: nextState.lastQrTable,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackState));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
}

function safeLoadState(): AppState {
  if (typeof window === "undefined") return defaultState;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultState;

    const parsed = JSON.parse(saved) as Partial<AppState>;
    return {
      ...defaultState,
      ...parsed,
      profile: { ...defaultState.profile, ...(parsed.profile || {}) },
      menu: parsed.menu?.length ? parsed.menu.map((item) => ({
        ...item,
        categoryId: item.categoryId || "",
        categoryName: item.categoryName || "Uncategorized",
        availableAllDay: item.availableAllDay !== false,
        availableFrom: item.availableFrom || "09:00",
        availableTo: item.availableTo || "23:00",
        imageThumbUrl: cleanPersistedImageUrl(item.imageThumbUrl),
        imageFullUrl: cleanPersistedImageUrl(item.imageFullUrl),
      })) : starterMenu,
      categories: parsed.categories || [],
      orders: (parsed.orders || []).map((order) => ({
        ...order,
        quantity: Math.max(1, Number(order.quantity || 1)),
      })),
      qrTokens: parsed.qrTokens || {},
    };
  } catch {
    return defaultState;
  }
}

function makeQrToken(restaurantName: string, branchName: string, tableNumber: number) {
  const raw = `${slugify(restaurantName)}-${slugify(branchName)}-table-${tableNumber}-${Date.now()}-${Math.random()}`;
  return `twl_${btoa(raw).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image"));
    image.src = dataUrl;
  });
}

async function resizeImageDataUrl(dataUrl: string, maxSize: number, quality: number) {
  const image = await loadImage(dataUrl);
  const largestSide = Math.max(image.width, image.height);
  const ratio = largestSide > maxSize ? maxSize / largestSide : 1;
  const width = Math.max(1, Math.round(image.width * ratio));
  const height = Math.max(1, Math.round(image.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return dataUrl;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", quality);
}

async function compressMenuImage(file: File) {
  const original = await readFileAsDataUrl(file);
  const imageThumbUrl = await resizeImageDataUrl(original, 280, 0.72);
  const imageFullUrl = await resizeImageDataUrl(original, 1400, 0.86);

  return { imageThumbUrl, imageFullUrl };
}


function dataUrlToBlob(dataUrl: string) {
  const [meta, base64 = ""] = dataUrl.split(",");
  const mime = meta.match(/^data:(.*?);base64$/)?.[1] || "image/jpeg";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mime });
}

async function uploadMenuItemImagesToStorage(
  businessId: string,
  username: string,
  itemName: string,
  imageData: { imageThumbUrl: string; imageFullUrl: string }
) {
  const headers = await getManagerAuthHeaders();
  delete headers["Content-Type"];

  const formData = new FormData();
  formData.append("businessId", businessId);
  formData.append("username", username);
  formData.append("itemName", itemName || "menu-item");
  formData.append("thumb", dataUrlToBlob(imageData.imageThumbUrl), "thumb.jpg");
  formData.append("full", dataUrlToBlob(imageData.imageFullUrl), "full.jpg");

  const response = await fetch("/api/menu-item-image", {
    method: "POST",
    headers,
    body: formData,
  });

  const result = await readApiJson(response);

  return {
    imageThumbUrl: cleanPersistedImageUrl(result.imageThumbUrl),
    imageFullUrl: cleanPersistedImageUrl(result.imageFullUrl),
  };
}

function menuIconFromName(name: string) {
  const clean = name.trim().replace(/[^a-zA-Z0-9 ]/g, "");
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return clean.slice(0, 2).toUpperCase() || "IT";
}

function rowToMenuItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.item_name || "Menu item",
    nameAr: row.item_name_ar || "",
    desc: row.description || "Menu item",
    price: Number(row.price_jod || 0),
    icon: (row.short_code || menuIconFromName(row.item_name || "Menu item")).slice(0, 3).toUpperCase(),
    available: row.available !== false,
    categoryId: row.category_id || "",
    categoryName: row.category_name || "Uncategorized",
    availableAllDay: row.available_all_day !== false,
    availableFrom: row.available_from || "09:00",
    availableTo: row.available_to || "23:00",
    imageThumbUrl: cleanPersistedImageUrl(row.image_thumb_url || row.image_url || ""),
    imageFullUrl: cleanPersistedImageUrl(row.image_full_url || row.image_url || ""),
  };
}

function rowToMenuCategory(row: CategoryRow): MenuCategory {
  return {
    id: row.id,
    name: row.name || "Category",
    nameAr: row.name_ar || "",
  };
}

function rowToGuestName(row: TableGuestRow) {
  return (row.guest_name || "").trim();
}

function uniqueGuestNames(names: string[]) {
  const seen = new Set<string>();
  const cleanNames: string[] = [];

  for (const name of names) {
    const clean = name.trim().replace(/\s+/g, " ");
    const key = clean.toLowerCase();

    if (!clean || seen.has(key)) continue;

    seen.add(key);
    cleanNames.push(clean);
  }

  return cleanNames;
}

function tableGuestsStorageKey(businessId: string, tableNumber: number) {
  return `tawleh-table-guests:${businessId || "unknown"}:${tableNumber}`;
}

function readCachedTableGuests(businessId: string, tableNumber: number) {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(tableGuestsStorageKey(businessId, tableNumber));
    const parsed = raw ? JSON.parse(raw) : [];

    return uniqueGuestNames(Array.isArray(parsed) ? parsed.map((name) => String(name || "")) : []);
  } catch {
    return [];
  }
}

function writeCachedTableGuests(businessId: string, tableNumber: number, guests: string[]) {
  if (typeof window === "undefined" || !businessId) return;

  const cleanGuests = uniqueGuestNames(guests).slice(0, 25);
  window.localStorage.setItem(tableGuestsStorageKey(businessId, tableNumber), JSON.stringify(cleanGuests));
}

function mergeGuestLists(...lists: string[][]) {
  return uniqueGuestNames(lists.flat());
}

function rowToOrder(row: TableOrderRow): Order {
  const quantity = Math.max(1, Number(row.quantity || 1));
  const unitPrice = Number(row.price_jod || 0);

  return {
    id: row.id,
    table: Number(row.table_number || DEMO_TABLE),
    guest: row.guest_name || "Guest",
    itemId: row.item_id || "",
    itemName: row.item_name || "Menu item",
    price: unitPrice,
    quantity,
    status: row.status || "New",
    createdAt: row.created_at || new Date().toISOString(),
    orderTicketId: row.order_ticket_id || "",
    ticketNumber: row.ticket_number ? Number(row.ticket_number) : null,
    kitchenPrintJobId: row.kitchen_print_job_id || "",
    customerBillPrintJobId: row.customer_bill_print_job_id || "",
    kitchenPrintedAt: row.kitchen_printed_at || "",
    customerBillPrintedAt: row.customer_bill_printed_at || "",
    printNote: row.print_note || "",
  };
}

function orderLineTotal(order: Order) {
  return Number(order.price || 0) * Math.max(1, Number(order.quantity || 1));
}
function timeToMinutes(value: string) {
  const [hourRaw, minuteRaw] = String(value || "").split(":");
  const hour = Number(hourRaw);
  const minute = Number(minuteRaw);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;

  return Math.max(0, Math.min(1439, hour * 60 + minute));
}

function isWithinDailyWindow(nowMinutes: number, fromValue: string, toValue: string) {
  const from = timeToMinutes(fromValue);
  const to = timeToMinutes(toValue);

  if (from === null || to === null) return true;
  if (from === to) return true;

  if (from < to) {
    return nowMinutes >= from && nowMinutes <= to;
  }

  return nowMinutes >= from || nowMinutes <= to;
}

function isMenuItemCurrentlyAvailable(item: MenuItem) {
  if (!item.available) return false;
  if (item.availableAllDay) return true;

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return isWithinDailyWindow(nowMinutes, item.availableFrom, item.availableTo);
}

function formatItemAvailability(item: MenuItem) {
  if (!item.available) return "Out of stock";
  if (item.availableAllDay) return "Available all day";
  return `Available daily ${item.availableFrom || "09:00"} - ${item.availableTo || "23:00"}`;
}

function unavailableButtonText(item: MenuItem) {
  if (!item.available) return "Out";
  if (!isMenuItemCurrentlyAvailable(item)) return "Not now";
  return "Add";
}


function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error && "message" in error) {
    const maybeMessage = (error as { message?: unknown }).message;
    if (maybeMessage) return String(maybeMessage);
  }

  return "Something went wrong";
}

function formatMenuDbError(error: unknown) {
  const message = getErrorMessage(error);

  if (message.toLowerCase().includes("menu_items") || message.toLowerCase().includes("schema cache")) {
    return "Menu table missing. Run the Tawleh menu_items SQL in Supabase first.";
  }

  return message;
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function saveManagerAuthSession(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    MANAGER_AUTH_STORAGE_KEY,
    JSON.stringify({
      accessToken,
      refreshToken,
      savedAt: Date.now(),
    })
  );
}

function loadManagerAuthSession() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(MANAGER_AUTH_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      accessToken?: string;
      refreshToken?: string;
      savedAt?: number;
    };

    if (!parsed.accessToken) return null;

    return parsed;
  } catch {
    return null;
  }
}

function clearManagerAuthSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(MANAGER_AUTH_STORAGE_KEY);
}

async function getManagerAuthHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!supabase) return headers;

  const { data } = await supabase.auth.getSession();
  let token = data.session?.access_token || "";

  if (!token) {
    const stored = loadManagerAuthSession();

    if (stored?.accessToken) {
      token = stored.accessToken;

      if (stored.refreshToken) {
        await supabase.auth.setSession({
          access_token: stored.accessToken,
          refresh_token: stored.refreshToken,
        });
      }
    }
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function readApiJson(response: Response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = typeof result?.error === "string" ? result.error : "Menu request failed";
    throw new Error(message);
  }

  return result;
}

type BusinessProfileRow = {
  id: string;
  auth_user_id: string;
  email: string | null;
  username: string | null;
  restaurant_name: string | null;
  branch_name: string | null;
  business_type: string | null;
  business_phone: string | null;
  table_count: number | null;
  location_count: number | null;
  location: string | null;
  locations: string[] | null;
  signup_ip: string | null;
  welcome_message: string | null;
  brand_color: string | null;
  logo_data_url: string | null;
};

function businessRowToProfile(row: BusinessProfileRow, fallback: Profile): Profile {
  return {
    businessId: row.id || fallback.businessId,
    authUserId: row.auth_user_id || fallback.authUserId,
    restaurantName: row.restaurant_name || fallback.restaurantName || "Restaurant",
    branchName: row.branch_name || fallback.branchName || "Main Branch",
    businessType: row.business_type || fallback.businessType || "Cafe",
    tableCount: row.table_count || fallback.tableCount || 1,
    locationCount: row.location_count || fallback.locationCount || 1,
    businessEmail: row.email || fallback.businessEmail || "",
    username: row.username || fallback.username || "",
    businessPhone: row.business_phone || fallback.businessPhone || "",
    location: row.location || fallback.location || "",
    locations: row.locations || fallback.locations || [row.location || fallback.location || ""],
    signupIp: row.signup_ip || fallback.signupIp || "",
    welcomeMessage: row.welcome_message || fallback.welcomeMessage || defaultState.profile.welcomeMessage,
    brandColor: row.brand_color || fallback.brandColor || defaultState.profile.brandColor,
    logoDataUrl: row.logo_data_url || fallback.logoDataUrl || "",
  };
}

async function fetchBusinessProfileFromServer(profile: Profile) {
  const params = new URLSearchParams();

  if (profile.businessId) params.set("businessId", profile.businessId);
  if (profile.username) params.set("username", profile.username);

  if (!params.toString()) {
    throw new Error("Login again before editing menu");
  }

  const response = await fetch(`/api/business-profile?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await readApiJson(response);
  return businessRowToProfile(result.business as BusinessProfileRow, profile);
}

async function fetchMenuItemsFromSupabase(businessId: string) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch(`/api/menu-items?businessId=${encodeURIComponent(businessId)}&username=${encodeURIComponent(safeLoadState().profile.username || "")}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.menu || []) as MenuRow[];

  return rows.map((row) => rowToMenuItem(row));
}

async function fetchMenuCategoriesFromSupabase(businessId: string) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch(`/api/menu-categories?businessId=${encodeURIComponent(businessId)}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.categories || []) as CategoryRow[];

  return rows.map((row) => rowToMenuCategory(row));
}

async function insertMenuCategoryIntoSupabase(businessId: string, name: string, nameAr: string) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/menu-categories", {
    method: "POST",
    headers,
    body: JSON.stringify({
      businessId,
      name,
      nameAr,
    }),
  });

  const result = await readApiJson(response);
  return rowToMenuCategory(result.category as CategoryRow);
}

async function fetchTableGuestsFromSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number,
  username = ""
) {
  const params = new URLSearchParams({
    businessId,
    authUserId,
    username,
    table: String(tableNumber),
  });

  const response = await fetch(`/api/table-guests?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.guests || []) as TableGuestRow[];

  return uniqueGuestNames(rows.map((row) => rowToGuestName(row)));
}

async function joinTableGuestInSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number,
  guestName: string,
  username = ""
) {
  const response = await fetch("/api/table-guests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessId,
      authUserId,
      username,
      table: tableNumber,
      guestName,
    }),
  });

  const result = await readApiJson(response);
  const rows = (result.guests || []) as TableGuestRow[];

  return uniqueGuestNames(rows.map((row) => rowToGuestName(row)));
}

async function fetchTableOrdersFromSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number | null,
  username = ""
) {
  const params = new URLSearchParams({
    businessId,
    authUserId,
    username,
  });

  if (tableNumber) {
    params.set("table", String(tableNumber));
  } else {
    params.set("all", "1");
  }

  const response = await fetch(`/api/table-orders?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.orders || []) as TableOrderRow[];

  return rows.map((row) => rowToOrder(row));
}

async function sendCartOrderToSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number,
  guestName: string,
  cartLines: CartLine[],
  username = ""
) {
  const response = await fetch("/api/table-orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessId,
      authUserId,
      username,
      table: tableNumber,
      guestName,
      items: cartLines.map((line) => ({
        itemId: line.item.id,
        itemName: line.item.name,
        price: line.item.price,
        quantity: line.quantity,
      })),
    }),
  });

  const result = await readApiJson(response);
  const rows = (result.orders || []) as TableOrderRow[];

  return rows.map((row) => rowToOrder(row));
}

async function updateTableOrderStatusInSupabase(
  businessId: string,
  authUserId: string,
  orderId: string,
  status: Order["status"],
  username = ""
) {
  const response = await fetch("/api/table-orders", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessId,
      authUserId,
      username,
      orderId,
      status,
    }),
  });

  const result = await readApiJson(response);
  return rowToOrder(result.order as TableOrderRow);
}

async function insertMenuItemIntoSupabase(businessId: string, item: MenuItem) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/menu-items", {
    method: "POST",
    headers,
    body: JSON.stringify({
      businessId,
      username: safeLoadState().profile.username || "",
      item,
    }),
  });

  const result = await readApiJson(response);
  return rowToMenuItem(result.item as MenuRow);
}

async function updateMenuItemAvailabilityInSupabase(businessId: string, itemId: string, available: boolean) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/menu-items", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      businessId,
      username: safeLoadState().profile.username || "",
      itemId,
      available,
    }),
  });

  await readApiJson(response);
}

async function updateMenuItemInSupabase(businessId: string, itemId: string, item: MenuItem) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/menu-items", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      businessId,
      username: safeLoadState().profile.username || "",
      itemId,
      item,
    }),
  });

  const result = await readApiJson(response);
  return rowToMenuItem(result.item as MenuRow);
}

async function deleteMenuItemFromSupabase(businessId: string, itemId: string) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/menu-items", {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      businessId,
      username: safeLoadState().profile.username || "",
      itemId,
    }),
  });

  await readApiJson(response);
}

export default function Page() {
  const [state, setState] = useState<AppState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [phoneTab, setPhoneTab] = useState<"menu" | "bill" | "service">("menu");
  const [managerTab, setManagerTab] = useState<"kitchen" | "waiter" | "tables" | "menu" | "menuBuilder" | "qr" | "profile">("kitchen");
  const [authTab, setAuthTab] = useState<"login" | "signup">("signup");
  const [guestName, setGuestName] = useState("");
  const [orderCart, setOrderCart] = useState<Record<string, number>>({});
  const [orderReviewOpen, setOrderReviewOpen] = useState(false);
  const [orderSendBusy, setOrderSendBusy] = useState(false);
  const [orderSendError, setOrderSendError] = useState("");
  const [kitchenBellEnabled, setKitchenBellEnabled] = useState(false);
  const kitchenBellPrimedRef = useRef(false);
  const lastKitchenNewOrderIdsRef = useRef<Set<string>>(new Set());
  const [signupProfile, setSignupProfile] = useState<Profile>(defaultState.profile);
  const [activeLocationTab, setActiveLocationTab] = useState(0);
  const [authBusy, setAuthBusy] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [qrInput, setQrInput] = useState(String(DEMO_TABLE));
  const [menuDraft, setMenuDraft] = useState<MenuDraft>(emptyMenuDraft);
  const [editingMenuItemId, setEditingMenuItemId] = useState("");
  const [categoryDraft, setCategoryDraft] = useState({ name: "", nameAr: "" });
  const [activeMenuCategory, setActiveMenuCategory] = useState("all");
  const [menuBuilderSearch, setMenuBuilderSearch] = useState("");
  const [expandedMenuCategories, setExpandedMenuCategories] = useState<Record<string, boolean>>({});
  const [imageBusy, setImageBusy] = useState(false);
  const [menuBusy, setMenuBusy] = useState(false);
  const [selectedMenuImage, setSelectedMenuImage] = useState<MenuItem | null>(null);
  const [customerBgImageUrl, setCustomerBgImageUrl] = useState("");
  const [toast, setToast] = useState("");
  const [publicTableMode, setPublicTableMode] = useState(false);
  const publicCustomerMode = publicTableMode;
  const [publicTableError, setPublicTableError] = useState("");
  const [activeTable, setActiveTable] = useState(DEMO_TABLE);

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const params = new URLSearchParams(window.location.search);
      const qrMode = params.get("mode") === "table" || params.has("table") || params.has("token") || params.has("businessId") || params.has("username");
      const businessId = params.get("businessId") || params.get("business") || "";
      const username = params.get("username") || "";
      const tableNumber = Math.max(1, Math.min(999, Number(params.get("table") || DEMO_TABLE)));
      const token = params.get("token") || "";

      if (qrMode) {
        setPublicTableMode(true);
        setActiveTable(tableNumber);
        setPhoneTab("menu");

        try {
          const query = new URLSearchParams({
            businessId,
            username,
            table: String(tableNumber),
            token,
          });
          const response = await fetch(`/api/public-table?${query.toString()}`, { cache: "no-store" });
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result?.error || "Could not load this table QR");
          }

          const business = result.business || {};
          const menuRows = (result.menu || []) as MenuRow[];
          const categoryRows = (result.categories || []) as CategoryRow[];
          const guestRows = (result.guests || []) as TableGuestRow[];
          const orderRows = (result.orders || []) as TableOrderRow[];

          const nextProfile: Profile = {
            businessId: business.id || businessId,
            authUserId: business.auth_user_id || "",
            restaurantName: business.restaurant_name || "Restaurant",
            branchName: business.branch_name || "Main Branch",
            businessType: business.business_type || "Cafe",
            tableCount: business.table_count || 1,
            locationCount: business.location_count || 1,
            businessEmail: "",
            username: business.username || "",
            businessPhone: "",
            location: business.location || "",
            locations: business.locations || [business.location || ""],
            signupIp: "",
            welcomeMessage: business.welcome_message || defaultState.profile.welcomeMessage,
            brandColor: business.brand_color || defaultState.profile.brandColor,
            logoDataUrl: business.logo_data_url || "",
          };

          if (!mounted) return;

          setState({
            ...defaultState,
            profileComplete: true,
            profile: nextProfile,
            menu: menuRows.map((row) => rowToMenuItem(row)),
            categories: categoryRows.map((row) => rowToMenuCategory(row)),
            guests: mergeGuestLists(
              uniqueGuestNames(guestRows.map((row) => rowToGuestName(row))),
              readCachedTableGuests(nextProfile.businessId, tableNumber)
            ),
            orders: orderRows.map((row) => rowToOrder(row)),
            qrTokens: token ? { [String(tableNumber)]: token } : {},
            lastQrTable: tableNumber,
          });
          writeCachedTableGuests(
            nextProfile.businessId,
            tableNumber,
            mergeGuestLists(
              uniqueGuestNames(guestRows.map((row) => rowToGuestName(row))),
              readCachedTableGuests(nextProfile.businessId, tableNumber)
            )
          );
          setSignupProfile(nextProfile);
          document.documentElement.style.setProperty("--brand", nextProfile.brandColor || "#c8613f");
          setLoaded(true);
          return;
        } catch (error) {
          if (!mounted) return;

          setPublicTableError(getErrorMessage(error));
          setState({
            ...defaultState,
            profileComplete: true,
            profile: {
              ...defaultState.profile,
              restaurantName: "Tawleh",
              branchName: `Table ${tableNumber}`,
            },
            lastQrTable: tableNumber,
          });
          setLoaded(true);
          return;
        }
      }

      const loadedState = safeLoadState();

      if (!mounted) return;

      setState(loadedState);
      setSignupProfile(loadedState.profile);
      setQrInput(String(loadedState.lastQrTable || DEMO_TABLE));
      setActiveTable(DEMO_TABLE);
      document.documentElement.style.setProperty("--brand", loadedState.profile.brandColor || "#c8613f");
      setLoaded(true);

      if (loadedState.profileComplete) {
        void restoreSessionAndLoadMenu(loadedState);
      }
    }

    void boot();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loaded || publicTableMode) return;
    safeSaveStateToLocalStorage(state);
    document.documentElement.style.setProperty("--brand", state.profile.brandColor || "#c8613f");
  }, [state, loaded, publicTableMode]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setKitchenBellEnabled(window.localStorage.getItem("tawleh-kitchen-bell-enabled") === "true");
  }, []);

  useEffect(() => {
    if (!publicCustomerMode || !state.profile.businessId) return;

    let cancelled = false;

    async function refreshSeatedGuests() {
      try {
        const savedGuests = await fetchTableGuestsFromSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          activeTable,
          state.profile.username
        );

        if (cancelled) return;

        const cachedGuests = readCachedTableGuests(state.profile.businessId, activeTable);
        const mergedGuests = mergeGuestLists(savedGuests, cachedGuests);

        if (mergedGuests.length) {
          writeCachedTableGuests(state.profile.businessId, activeTable, mergedGuests);
        }

        updateState((current) => ({
          ...current,
          guests: mergedGuests.length ? mergedGuests : current.guests,
        }));
      } catch (error) {
        console.error("Table guest refresh failed", error);
      }
    }

    void refreshSeatedGuests();

    const interval = window.setInterval(() => {
      void refreshSeatedGuests();
    }, 12000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [publicCustomerMode, state.profile.businessId, state.profile.username, activeTable]);

  useEffect(() => {
    if (!state.profile.businessId) return;

    let cancelled = false;

    async function refreshTableOrders() {
      try {
        const savedOrders = await fetchTableOrdersFromSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          publicCustomerMode ? activeTable : null,
          state.profile.username
        );

        if (cancelled) return;

        updateState((current) => ({
          ...current,
          orders: savedOrders,
        }));
      } catch (error) {
        console.error("Table order refresh failed", error);
      }
    }

    void refreshTableOrders();

    const interval = window.setInterval(() => {
      void refreshTableOrders();
    }, 7000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [state.profile.businessId, state.profile.username, activeTable, publicCustomerMode]);


  useEffect(() => {
    if (publicCustomerMode) return;

    const currentNewIds = new Set(
      state.orders
        .filter((order) => order.status === "New")
        .map((order) => order.id)
    );

    if (!kitchenBellPrimedRef.current) {
      lastKitchenNewOrderIdsRef.current = currentNewIds;
      kitchenBellPrimedRef.current = true;
      return;
    }

    const hasFreshNewOrder = Array.from(currentNewIds).some(
      (orderId) => !lastKitchenNewOrderIdsRef.current.has(orderId)
    );

    lastKitchenNewOrderIdsRef.current = currentNewIds;

    if (hasFreshNewOrder && kitchenBellEnabled) {
      playDeliBellSound();
      show("New kitchen order");
    }
  }, [state.orders, kitchenBellEnabled, publicCustomerMode]);

  const businessName = state.profile.restaurantName || "Restaurant";
  const branchName = state.profile.branchName || "Branch";
  const logoFallback = initials(businessName);
  const cleanSignupUsername = normalizeUsername(signupProfile.username);
  const usernameIsLongEnough = cleanSignupUsername.length >= 4;

  const signupLocations = buildLocationInputs(signupProfile.locations || [signupProfile.location || ""], signupProfile.locationCount);
  const completedLocationCount = signupLocations.filter((location) => location.trim()).length;

  const tableTotal = useMemo(() => {
    return state.orders.reduce((sum, order) => sum + orderLineTotal(order), 0);
  }, [state.orders]);

  const myTotal = useMemo(() => {
    return state.orders
      .filter((order) => order.guest === state.currentGuest)
      .reduce((sum, order) => sum + orderLineTotal(order), 0);
  }, [state.orders, state.currentGuest]);

  const menuCategoriesWithItems = useMemo(() => {
    return state.categories.filter((category) =>
      state.menu.some((item) => item.categoryId === category.id)
    );
  }, [state.categories, state.menu]);

  const seatedGuests = uniqueGuestNames(state.guests);

  const hasUncategorizedItems = state.menu.some((item) => !item.categoryId);
  const visibleCustomerMenu = activeMenuCategory === "all"
    ? state.menu
    : activeMenuCategory === "uncategorized"
      ? state.menu.filter((item) => !item.categoryId)
      : state.menu.filter((item) => item.categoryId === activeMenuCategory);

  const customerBackgroundImages = useMemo(() => {
    const seen = new Set<string>();

    state.menu.forEach((item) => {
      const imageUrl = cleanPersistedImageUrl(item.imageFullUrl || item.imageThumbUrl || "");

      if (imageUrl && !imageUrl.startsWith("data:")) {
        seen.add(imageUrl);
      }
    });

    return Array.from(seen);
  }, [state.menu]);

  const customerBackgroundImage = publicCustomerMode ? customerBgImageUrl : "";

  const customerBackgroundStyle = customerBackgroundImage
    ? ({ "--customer-menu-bg": `url("${customerBackgroundImage}")` } as CSSProperties)
    : undefined;

  useEffect(() => {
    if (!publicCustomerMode || !customerBackgroundImages.length) {
      setCustomerBgImageUrl("");
      return;
    }

    let cancelled = false;
    let activeIndex = -1;

    const chooseNextIndex = () => {
      if (customerBackgroundImages.length <= 1) return 0;

      let nextIndex = Math.floor(Math.random() * customerBackgroundImages.length);

      if (nextIndex === activeIndex) {
        nextIndex = (activeIndex + 1) % customerBackgroundImages.length;
      }

      return nextIndex;
    };

    const loadThenSet = (index: number) => {
      const nextUrl = customerBackgroundImages[index];

      if (!nextUrl) return;

      const image = new Image();

      image.onload = () => {
        if (cancelled) return;

        activeIndex = index;
        setCustomerBgImageUrl(nextUrl);
      };

      image.onerror = () => {
        if (cancelled || customerBackgroundImages.length <= 1) return;

        const retryIndex = (index + 1) % customerBackgroundImages.length;
        const retryUrl = customerBackgroundImages[retryIndex];

        if (!retryUrl || retryUrl === nextUrl) return;

        const retryImage = new Image();

        retryImage.onload = () => {
          if (cancelled) return;

          activeIndex = retryIndex;
          setCustomerBgImageUrl(retryUrl);
        };

        retryImage.src = retryUrl;
      };

      image.src = nextUrl;
    };

    loadThenSet(chooseNextIndex());

    const timer = window.setInterval(() => {
      loadThenSet(chooseNextIndex());
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [publicCustomerMode, customerBackgroundImages]);

  useEffect(() => {
    if (!publicCustomerMode || !customerBackgroundImages.length) return;

    customerBackgroundImages.slice(0, 24).forEach((imageUrl) => {
      const image = new Image();
      image.src = imageUrl;
    });
  }, [publicCustomerMode, customerBackgroundImages]);

  const orderCartLines = useMemo<CartLine[]>(() => {
    return Object.entries(orderCart)
      .map(([itemId, quantity]) => {
        const item = state.menu.find((menuItem) => menuItem.id === itemId);
        const cleanQuantity = Math.max(0, Number(quantity || 0));

        if (!item || cleanQuantity < 1) return null;

        return {
          item,
          quantity: cleanQuantity,
          lineTotal: item.price * cleanQuantity,
        };
      })
      .filter((line): line is CartLine => Boolean(line));
  }, [orderCart, state.menu]);

  const orderCartItemCount = orderCartLines.reduce((sum, line) => sum + line.quantity, 0);
  const orderCartTotal = orderCartLines.reduce((sum, line) => sum + line.lineTotal, 0);

  const menuBuilderGroups = useMemo(() => {
    const search = menuBuilderSearch.trim().toLowerCase();

    function itemMatchesSearch(item: MenuItem) {
      if (!search) return true;

      const searchable = [
        item.name,
        item.nameAr,
        item.desc,
        item.categoryName,
        money(item.price),
        formatItemAvailability(item),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    }

    const groups = new Map<string, {
      id: string;
      name: string;
      nameAr: string;
      items: MenuItem[];
      totalCount: number;
    }>();

    for (const category of state.categories) {
      groups.set(category.id, {
        id: category.id,
        name: category.name,
        nameAr: category.nameAr,
        items: [],
        totalCount: 0,
      });
    }

    for (const item of state.menu) {
      const id = item.categoryId || "uncategorized";
      const name = item.categoryName || "Uncategorized";

      if (!groups.has(id)) {
        groups.set(id, {
          id,
          name,
          nameAr: "",
          items: [],
          totalCount: 0,
        });
      }

      const group = groups.get(id);
      if (!group) continue;

      group.totalCount += 1;

      if (itemMatchesSearch(item)) {
        group.items.push(item);
      }
    }

    return Array.from(groups.values()).filter((group) =>
      search ? group.items.length > 0 : group.totalCount > 0
    );
  }, [state.categories, state.menu, menuBuilderSearch]);

  const openOrderCount = state.orders.filter((order) => order.status !== "Served").length;
  const waitingRequests = state.requests.filter((request) => request.status === "Waiting");
  const readyOrders = state.orders.filter((order) => order.status === "Ready");
  const activeOrders = state.orders.filter((order) => order.status !== "Served");

  const kitchenTickets = useMemo<KitchenTicketGroup[]>(() => {
    const groups = activeOrders.reduce<Record<string, Order[]>>((acc, order) => {
      const key = order.orderTicketId || `legacy-${order.table}-${order.guest}-${order.createdAt}`;
      acc[key] = acc[key] || [];
      acc[key].push(order);
      return acc;
    }, {});

    return Object.entries(groups)
      .map(([key, orders]) => {
        const sortedOrders = [...orders].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const first = sortedOrders[0];

        return {
          key,
          orderTicketId: first.orderTicketId,
          ticketNumber: first.ticketNumber,
          table: first.table,
          guest: first.guest,
          orders: sortedOrders,
          itemCount: sortedOrders.reduce((sum, order) => sum + Math.max(1, Number(order.quantity || 1)), 0),
          total: sortedOrders.reduce((sum, order) => sum + orderLineTotal(order), 0),
          createdAt: first.createdAt,
          kitchenPrintJobId: first.kitchenPrintJobId,
          kitchenPrintedAt: first.kitchenPrintedAt,
          printNote: first.printNote,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [activeOrders]);

  const selectedQrTable = Math.max(1, Math.min(999, Number(state.lastQrTable || DEMO_TABLE)));
  const selectedQrToken = state.qrTokens[String(selectedQrTable)] || "preview-token-create-qr-first";
  const selectedQrUrl = buildQrUrl(selectedQrTable, selectedQrToken);
  const selectedQrImage = `https://api.qrserver.com/v1/create-qr-code/?size=520x520&margin=18&ecc=H&data=${encodeURIComponent(selectedQrUrl)}`;

  const ordersByTable = activeOrders.reduce<Record<string, Record<string, Order[]>>>((acc, order) => {
    const tableKey = String(order.table || activeTable);
    acc[tableKey] = acc[tableKey] || {};
    acc[tableKey][order.guest] = acc[tableKey][order.guest] || [];
    acc[tableKey][order.guest].push(order);
    return acc;
  }, {});

  const billByGuest = state.orders.reduce<Record<string, Order[]>>((acc, order) => {
    acc[order.guest] = acc[order.guest] || [];
    acc[order.guest].push(order);
    return acc;
  }, {});

  function updateState(updater: (current: AppState) => AppState) {
    setState((current) => updater(current));
  }

  function show(message: string) {
    setToast(message);
  }

  function playDeliBellSound() {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const now = context.currentTime;
      const master = context.createGain();

      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.82, now + 0.012);
      master.gain.exponentialRampToValueAtTime(0.001, now + 0.95);
      master.connect(context.destination);

      const frequencies = [1760, 2349, 3136];

      frequencies.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = index === 0 ? "triangle" : "sine";
        oscillator.frequency.setValueAtTime(frequency, now);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.985, now + 0.38);

        gain.gain.setValueAtTime(index === 0 ? 0.55 : 0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.72 + index * 0.08);

        oscillator.connect(gain);
        gain.connect(master);

        oscillator.start(now);
        oscillator.stop(now + 0.92);
      });

      const clickOscillator = context.createOscillator();
      const clickGain = context.createGain();

      clickOscillator.type = "square";
      clickOscillator.frequency.setValueAtTime(920, now);
      clickGain.gain.setValueAtTime(0.18, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      clickOscillator.connect(clickGain);
      clickGain.connect(master);
      clickOscillator.start(now);
      clickOscillator.stop(now + 0.08);

      window.setTimeout(() => {
        void context.close();
      }, 1100);
    } catch (error) {
      console.error("Kitchen bell failed", error);
    }
  }

  function enableKitchenBell() {
    setKitchenBellEnabled(true);
    window.localStorage.setItem("tawleh-kitchen-bell-enabled", "true");
    playDeliBellSound();
    show("Kitchen deli bell enabled");
  }

  function testKitchenBell() {
    playDeliBellSound();
    show("Deli bell test");
  }

  function escapeReceiptHtml(value: string) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function buildKitchenTicketReceiptText(ticket: KitchenTicketGroup) {
    const ticketLabel = ticket.ticketNumber ? `#${ticket.ticketNumber}` : ticket.orderTicketId ? ticket.orderTicketId.slice(0, 8).toUpperCase() : "NEW";

    return [
      businessName.toUpperCase(),
      branchName ? branchName : "KITCHEN TICKET",
      "KITCHEN TICKET",
      `Ticket ${ticketLabel}`,
      `Table ${ticket.table}`,
      `Guest: ${ticket.guest}`,
      new Date(ticket.createdAt).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      "------------------------------",
      ...ticket.orders.map((order) => `${Math.max(1, Number(order.quantity || 1))}x ${order.itemName}`),
      "------------------------------",
      "Kitchen copy",
    ].join("\n");
  }

  function openBrowserPrintTicket(ticket: KitchenTicketGroup) {
    const receiptText = buildKitchenTicketReceiptText(ticket);
    const popup = window.open("", "_blank", "width=420,height=700");

    if (!popup) {
      show("Popup blocked. Allow popups, then try Print Ticket again.");
      return false;
    }

    popup.document.open();
    popup.document.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Kitchen Ticket</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 14px; background: #fff; color: #111; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
  .ticket { width: 280px; max-width: 100%; margin: 0 auto; white-space: pre-wrap; font-size: 13px; line-height: 1.35; }
  .hint { margin: 16px auto 0; width: 280px; font-family: Arial, sans-serif; font-size: 11px; color: #666; }
  @media print { body { padding: 0; } .hint { display: none; } .ticket { width: 72mm; margin: 0; padding: 2mm; } }
</style>
</head>
<body>
<pre class="ticket">${escapeReceiptHtml(receiptText)}</pre>
<div class="hint">If this is a demo, choose any printer or Save as PDF. Production auto-print will use the local Tawleh Print Bridge.</div>
<script>window.onload = function(){ setTimeout(function(){ window.print(); }, 200); };</script>
</body>
</html>`);
    popup.document.close();

    return true;
  }

  async function createPrintJobForTicket(ticket: KitchenTicketGroup, jobType: "kitchen_ticket" | "customer_bill") {
    if (!state.profile.businessId) {
      throw new Error("Login first, then print");
    }

    if (!ticket.orderTicketId) {
      throw new Error("This old local order has no ticket id. Send a fresh test order.");
    }

    const response = await fetch("/api/table-print-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId: state.profile.businessId,
        authUserId: state.profile.authUserId,
        username: state.profile.username,
        orderTicketId: ticket.orderTicketId,
        jobType,
      }),
    });

    const result = await readApiJson(response);
    return String(result.job?.id || "");
  }

  async function markPrintJobPrinted(jobId: string) {
    if (!jobId) return;

    const response = await fetch("/api/table-print-jobs", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId,
        action: "printed",
      }),
    });

    await readApiJson(response);
  }

  async function printKitchenTicket(ticket: KitchenTicketGroup, forceNewPrintJob = false) {
    try {
      const opened = openBrowserPrintTicket(ticket);
      if (!opened) return;

      let jobId = forceNewPrintJob ? "" : ticket.kitchenPrintJobId;

      if (!jobId) {
        jobId = await createPrintJobForTicket(ticket, "kitchen_ticket");
      }

      if (jobId) {
        await markPrintJobPrinted(jobId);

        const printedAt = new Date().toISOString();
        updateState((current) => ({
          ...current,
          orders: current.orders.map((order) =>
            (ticket.orderTicketId && order.orderTicketId === ticket.orderTicketId) || ticket.orders.some((ticketOrder) => ticketOrder.id === order.id)
              ? { ...order, kitchenPrintJobId: jobId, kitchenPrintedAt: printedAt, printNote: "" }
              : order
          ),
        }));
      }

      show(forceNewPrintJob ? "Kitchen ticket reprinted" : "Kitchen ticket printed");
    } catch (error) {
      const message = `Print failed: ${getErrorMessage(error)}`;
      console.error("Kitchen ticket print failed", error);
      show(message);
    }
  }

  async function refreshKitchenOrdersNow() {
    if (!state.profile.businessId) {
      show("Login first, then refresh kitchen orders");
      return;
    }

    try {
      const latestOrders = await fetchTableOrdersFromSupabase(
        state.profile.businessId,
        state.profile.authUserId,
        null,
        state.profile.username
      );

      updateState((current) => ({
        ...current,
        orders: latestOrders,
      }));

      show("Kitchen orders refreshed");
    } catch (error) {
      show(`Kitchen refresh failed: ${getErrorMessage(error)}`);
    }
  }

  async function restoreSessionAndLoadMenu(loadedState: AppState) {
    if (!loadedState.profile.businessId && !loadedState.profile.username) return;

    try {
      // Always reload the business profile from Supabase.
      // The restaurant logo is now stored in Supabase Storage, so localStorage can be stale.
      // This fixes the dashboard / QR card showing the generic fallback while the customer QR page shows the real logo.
      const repairedProfile = await fetchBusinessProfileFromServer(loadedState.profile);

      const [savedMenu, savedCategories] = repairedProfile.businessId
        ? await Promise.all([
            fetchMenuItemsFromSupabase(repairedProfile.businessId),
            fetchMenuCategoriesFromSupabase(repairedProfile.businessId),
          ])
        : [[], []];

      updateState((current) => ({
        ...current,
        profile: {
          ...current.profile,
          ...repairedProfile,
          logoDataUrl: repairedProfile.logoDataUrl || current.profile.logoDataUrl,
        },
        menu: savedMenu.length ? savedMenu : current.menu,
        categories: savedCategories,
      }));

      if (repairedProfile.brandColor) {
        document.documentElement.style.setProperty("--brand", repairedProfile.brandColor);
      }
    } catch (error) {
      console.error("Menu/profile restore failed", error);
    }
  }

  async function refreshMenuFromSupabase() {
    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login first, then refresh menu");
        return;
      }
    }

    if (!managerProfile.businessId) {
      show("Login first, then refresh menu");
      return;
    }

    setMenuBusy(true);

    try {
      const [savedMenu, savedCategories] = await Promise.all([
        fetchMenuItemsFromSupabase(managerProfile.businessId),
        fetchMenuCategoriesFromSupabase(managerProfile.businessId),
      ]);
      updateState((current) => ({
        ...current,
        menu: savedMenu,
        categories: savedCategories,
      }));
      show("Menu and categories loaded from Supabase");
    } catch (error) {
      show(formatMenuDbError(error));
    } finally {
      setMenuBusy(false);
    }
  }

  function buildQrUrl(tableNumber: number, token: string) {
    const params = new URLSearchParams({
      mode: "table",
      businessId: state.profile.businessId || "",
      username: state.profile.username || "",
      restaurant: `${slugify(businessName)}-${slugify(branchName)}`,
      table: String(tableNumber),
      token,
    });

    return `${PUBLIC_CUSTOMER_SITE_URL}/?${params.toString()}`;
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      show("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSignupProfile((current) => ({
        ...current,
        logoDataUrl: String(reader.result || ""),
      }));
      show("Restaurant logo loaded");
    };
    reader.readAsDataURL(file);
  }

  async function handleRestaurantLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      show("Please upload an image file");
      return;
    }

    if (!state.profile.businessId) {
      show("Login again before uploading a restaurant logo");
      return;
    }

    try {
      show("Uploading restaurant logo...");

      const headers = await getManagerAuthHeaders();
      const formData = new FormData();
      formData.append("businessId", state.profile.businessId);
      formData.append("username", state.profile.username || "");
      formData.append("logo", file);

      const response = await fetch("/api/business-logo", {
        method: "POST",
        headers,
        body: formData,
      });

      const result = await readApiJson(response);
      const logoUrl = String(result.logoUrl || "");

      if (!logoUrl) {
        show("Logo uploaded but no URL came back");
        return;
      }

      updateState((current) => ({
        ...current,
        profile: {
          ...current.profile,
          logoDataUrl: logoUrl,
        },
      }));

      try {
        const repairedProfile = await fetchBusinessProfileFromServer({
          ...state.profile,
          logoDataUrl: logoUrl,
        });

        updateState((current) => ({
          ...current,
          profile: {
            ...current.profile,
            ...repairedProfile,
            logoDataUrl: repairedProfile.logoDataUrl || logoUrl,
          },
        }));
      } catch {
        // The upload already succeeded; keep the returned logo URL.
      }

      show("Restaurant logo saved");
    } catch (error) {
      show(error instanceof Error ? error.message : "Restaurant logo upload failed");
    }
  }

  function updateLocationCount(nextCount: number) {
    const safeCount = Math.max(1, Math.min(25, Number(nextCount || 1)));
    const nextLocations = buildLocationInputs(signupLocations, safeCount);

    setSignupProfile((current) => ({
      ...current,
      locationCount: safeCount,
      locations: nextLocations,
      location: nextLocations[0] || "",
    }));

    setActiveLocationTab((current) => Math.min(current, safeCount - 1));
  }

  function updateSignupLocation(index: number, value: string) {
    const nextLocations = [...signupLocations];
    nextLocations[index] = value;

    setSignupProfile((current) => ({
      ...current,
      locations: nextLocations,
      location: nextLocations[0] || "",
    }));
  }

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authBusy) return;

    const cleanName = signupProfile.restaurantName.trim();
    const cleanBranch = signupProfile.branchName.trim();
    const cleanEmail = signupProfile.businessEmail.trim().toLowerCase();
    const cleanUsername = normalizeUsername(signupProfile.username);
    const cleanPhone = normalizePhone(signupProfile.businessPhone);
    const cleanLocations = signupLocations.map((location) => location.trim());

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      show("Missing Supabase keys in .env.local");
      return;
    }

    if (!cleanName || !cleanBranch) {
      show("Restaurant name and branch are required");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      show("Valid business email is required");
      return;
    }

    if (!cleanUsername || cleanUsername.length < 4) {
      show("Username must be at least 4 characters");
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      show("Business phone is required");
      return;
    }

    if (signupPassword.length < 8) {
      show("Password must be at least 8 characters");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      show("Passwords do not match");
      return;
    }

    if (cleanLocations.some((location) => !location)) {
      show("Every location tab must be filled");
      return;
    }

    const cleanTableCount = Math.max(1, Math.min(999, Number(signupProfile.tableCount || 1)));
    const cleanLocationCount = Math.max(1, Math.min(25, Number(signupProfile.locationCount || 1)));
    const cleanLocation = cleanLocations[0];

    setAuthBusy(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: signupPassword,
          username: cleanUsername,
          restaurantName: cleanName,
          branchName: cleanBranch,
          businessType: signupProfile.businessType,
          businessPhone: cleanPhone,
          tableCount: cleanTableCount,
          locationCount: cleanLocationCount,
          locations: cleanLocations,
          welcomeMessage: signupProfile.welcomeMessage.trim() || defaultState.profile.welcomeMessage,
          brandColor: signupProfile.brandColor,
          logoDataUrl: signupProfile.logoDataUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        show(result.error || "Signup failed");
        return;
      }

      if (result.business?.email && supabase) {
        const { data: signupSessionData } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: signupPassword,
        });

        if (signupSessionData.session?.access_token && signupSessionData.session?.refresh_token) {
          saveManagerAuthSession(
            signupSessionData.session.access_token,
            signupSessionData.session.refresh_token
          );
        }
      }

      const nextProfile: Profile = {
        ...signupProfile,
        businessId: result.business?.id || "",
        authUserId: result.business?.auth_user_id || "",
        restaurantName: cleanName,
        branchName: cleanBranch,
        businessEmail: cleanEmail,
        username: cleanUsername,
        businessPhone: cleanPhone,
        location: cleanLocation,
        locations: cleanLocations,
        locationCount: cleanLocationCount,
        signupIp: result.signupIp || "",
        tableCount: cleanTableCount,
        welcomeMessage: signupProfile.welcomeMessage.trim() || defaultState.profile.welcomeMessage,
      };

      updateState((current) => ({
        ...current,
        profileComplete: true,
        profile: nextProfile,
      }));

      setManagerTab("kitchen");
      show("Real Supabase account created");
    } catch {
      show("Signup failed. Check Supabase setup.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function fakeLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authBusy) return;

    const cleanUsername = normalizeUsername(loginUsername);

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !supabase) {
      show("Missing Supabase keys in .env.local");
      return;
    }

    if (!cleanUsername || !loginPassword) {
      show("Username and password are required");
      return;
    }

    setAuthBusy(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: loginPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        show(result.error || "Login failed");
        return;
      }

      if (result.session?.access_token && result.session?.refresh_token) {
        await supabase.auth.setSession({
          access_token: result.session.access_token,
          refresh_token: result.session.refresh_token,
        });

        saveManagerAuthSession(
          result.session.access_token,
          result.session.refresh_token
        );
      }

      const business = result.business;

      if (!business) {
        show("Login worked, but business profile was not found");
        return;
      }

      const savedMenu = business.id ? await fetchMenuItemsFromSupabase(business.id) : [];

      const nextProfile: Profile = {
        businessId: business.id || "",
        authUserId: business.auth_user_id || "",
        restaurantName: business.restaurant_name || "Restaurant",
        branchName: business.branch_name || "Main Branch",
        businessType: business.business_type || "Cafe",
        tableCount: business.table_count || 1,
        locationCount: business.location_count || 1,
        businessEmail: business.email || "",
        username: business.username || cleanUsername,
        businessPhone: business.business_phone || "",
        location: business.location || "",
        locations: business.locations || [business.location || ""],
        signupIp: business.signup_ip || "",
        welcomeMessage: business.welcome_message || defaultState.profile.welcomeMessage,
        brandColor: business.brand_color || defaultState.profile.brandColor,
        logoDataUrl: business.logo_data_url || "",
      };

      updateState((current) => ({
        ...current,
        profileComplete: true,
        profile: nextProfile,
        menu: savedMenu,
      }));

      setManagerTab("kitchen");
      show(savedMenu.length ? "Logged in and menu loaded" : "Logged in with username");
    } catch {
      show("Login failed. Check Supabase setup.");
    } finally {
      setAuthBusy(false);
    }
  }

  function resetAll() {
    const ok = window.confirm("Reset Tawleh Manager and clear restaurant setup, logo, orders, requests, and QR tokens?");
    if (!ok) return;

    window.localStorage.removeItem(STORAGE_KEY);
    clearManagerAuthSession();
    setState(defaultState);
    setSignupProfile(defaultState.profile);
    setQrInput(String(DEMO_TABLE));
    setManagerTab("kitchen");
    setPhoneTab("menu");
    setAuthTab("signup");
    document.documentElement.style.setProperty("--brand", defaultState.profile.brandColor);
    show("Prototype reset");
  }

  function openMenuBuilder() {
    setManagerTab("menuBuilder");
    show("Menu Builder opened");
  }

  function editRestaurantSetup() {
    setSignupProfile(state.profile);
    updateState((current) => ({ ...current, profileComplete: false }));
    setAuthTab("signup");
  }

  async function joinGuest(name: string) {
    const clean = name.trim().replace(/\s+/g, " ");

    if (!clean) {
      show("Enter a customer name first");
      return;
    }

    const immediateGuests = uniqueGuestNames([...state.guests, clean]);

    updateState((current) => ({
      ...current,
      currentGuest: clean,
      guests: uniqueGuestNames([...current.guests, clean]),
    }));

    if (state.profile.businessId) {
      writeCachedTableGuests(state.profile.businessId, activeTable, immediateGuests);
    }

    setGuestName("");
    setOrderCart({});
    setOrderReviewOpen(false);

    if (publicCustomerMode) {
      setPhoneTab("menu");
      setActiveMenuCategory("__home");
    }

    if (publicCustomerMode && state.profile.businessId) {
      try {
        const savedGuests = await joinTableGuestInSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          activeTable,
          clean,
          state.profile.username
        );

        const mergedGuests = mergeGuestLists(savedGuests, readCachedTableGuests(state.profile.businessId, activeTable), [clean]);
        writeCachedTableGuests(state.profile.businessId, activeTable, mergedGuests);

        updateState((current) => ({
          ...current,
          currentGuest: clean,
          guests: mergedGuests.length ? mergedGuests : uniqueGuestNames([...current.guests, clean]),
        }));
      } catch (error) {
        console.error("Table guest save failed", error);
        show(`Seat saved on this phone. Server save failed: ${getErrorMessage(error)}`);
        return;
      }
    }

    show(`${clean} joined Table ${activeTable}`);
  }

  function chooseSeatedGuest(name: string) {
    const clean = name.trim();

    if (!clean) return;

    updateState((current) => ({
      ...current,
      currentGuest: clean,
      guests: uniqueGuestNames([...current.guests, clean]),
    }));

    if (state.profile.businessId) {
      writeCachedTableGuests(state.profile.businessId, activeTable, uniqueGuestNames([...state.guests, clean]));
    }

    setOrderCart({});
    setOrderReviewOpen(false);

    if (publicCustomerMode) {
      setPhoneTab("menu");
      setActiveMenuCategory("__home");
    }

    show(`Welcome back, ${clean}`);
  }

  function changeCartQuantity(menuId: string, nextQuantity: number) {
    const item = state.menu.find((menuItem) => menuItem.id === menuId);

    if (!item || !isMenuItemCurrentlyAvailable(item)) {
      show("This item is not available right now");
      return;
    }

    const quantity = Math.max(0, Math.min(99, Math.floor(Number(nextQuantity || 0))));

    setOrderCart((current) => {
      const next = { ...current };

      if (quantity <= 0) {
        delete next[menuId];
      } else {
        next[menuId] = quantity;
      }

      return next;
    });
  }

  function addCartItem(menuId: string) {
    if (!state.currentGuest) {
      show("Have a seat first");
      return;
    }

    const item = state.menu.find((menuItem) => menuItem.id === menuId);

    if (!item || !isMenuItemCurrentlyAvailable(item)) {
      show("This item is not available right now");
      return;
    }

    setOrderCart((current) => ({
      ...current,
      [menuId]: Math.min(99, Number(current[menuId] || 0) + 1),
    }));
  }

  function removeCartItem(menuId: string) {
    setOrderCart((current) => {
      const next = { ...current };
      delete next[menuId];
      return next;
    });
  }

  function beginOrderReview() {
    if (!state.currentGuest) {
      show("Have a seat first");
      return;
    }

    if (!orderCartLines.length) {
      show("Add at least one item first");
      return;
    }

    setOrderSendError("");
    setOrderReviewOpen(true);
  }

  async function confirmOrderToKitchen() {
    if (!state.currentGuest) {
      show("Have a seat first");
      return;
    }

    if (!orderCartLines.length) {
      show("Add at least one item first");
      return;
    }

    if (!state.profile.businessId) {
      const message = "Missing restaurant account on this QR link. Create a fresh QR code from Table QR.";
      setOrderSendError(message);
      show(message);
      return;
    }

    if (!state.profile.authUserId) {
      const message = "Missing restaurant owner id. Refresh the QR page and try again.";
      setOrderSendError(message);
      show(message);
      return;
    }

    setOrderSendBusy(true);
    setOrderSendError("");

    try {
      const savedOrders = await sendCartOrderToSupabase(
        state.profile.businessId,
        state.profile.authUserId,
        activeTable,
        state.currentGuest,
        orderCartLines,
        state.profile.username
      );

      if (!savedOrders.length) {
        throw new Error("Kitchen API returned zero orders");
      }

      const latestOrders = await fetchTableOrdersFromSupabase(
        state.profile.businessId,
        state.profile.authUserId,
        publicCustomerMode ? activeTable : null,
        state.profile.username
      );

      updateState((current) => ({
        ...current,
        orders: latestOrders.length ? latestOrders : [...savedOrders, ...current.orders],
      }));

      setOrderCart({});
      setOrderReviewOpen(false);
      setPhoneTab("bill");
      show("Order sent to kitchen");
    } catch (error) {
      const message = `Kitchen communication failed: ${getErrorMessage(error)}`;
      console.error("Order send failed", error);
      setOrderSendError(message);
      show(message);
    } finally {
      setOrderSendBusy(false);
    }
  }

  async function setOrderStatus(orderId: string, status: Order["status"]) {
    updateState((current) => ({
      ...current,
      orders: current.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
    }));

    if (state.profile.businessId) {
      try {
        const savedOrder = await updateTableOrderStatusInSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          orderId,
          status,
          state.profile.username
        );

        updateState((current) => ({
          ...current,
          orders: current.orders.map((order) => (order.id === savedOrder.id ? savedOrder : order)),
        }));
      } catch (error) {
        console.error("Order status update failed", error);
      }
    }

    show(`Order marked ${status}`);
  }

  function addRequest(type: string) {
    if (!state.currentGuest) {
      show("Have a seat first");
      return;
    }

    updateState((current) => ({
      ...current,
      requests: [
        {
          id: makeId("request"),
          table: activeTable,
          guest: current.currentGuest,
          type,
          status: "Waiting",
          createdAt: new Date().toISOString(),
        },
        ...current.requests,
      ],
    }));

    show(`${type} requested for ${state.currentGuest}`);
  }

  function resolveRequest(id: string) {
    updateState((current) => ({
      ...current,
      requests: current.requests.map((request) =>
        request.id === id ? { ...request, status: "Resolved" } : request
      ),
    }));
    show("Request resolved");
  }

  async function toggleItem(itemId: string) {
    const item = state.menu.find((menuItem) => menuItem.id === itemId);
    if (!item) return;

    const nextAvailable = !item.available;

    if (state.profile.businessId && isUuid(itemId)) {
      setMenuBusy(true);

      try {
        await updateMenuItemAvailabilityInSupabase(state.profile.businessId, itemId, nextAvailable);
      } catch (error) {
        show(formatMenuDbError(error));
        setMenuBusy(false);
        return;
      }

      setMenuBusy(false);
    }

    updateState((current) => ({
      ...current,
      menu: current.menu.map((menuItem) => (menuItem.id === itemId ? { ...menuItem, available: nextAvailable } : menuItem)),
    }));
    show("Menu availability saved");
  }

  async function ensureManagerBusinessProfile() {
    if (state.profile.businessId) {
      return state.profile;
    }

    const repairedProfile = await fetchBusinessProfileFromServer(state.profile);

    updateState((current) => ({
      ...current,
      profile: repairedProfile,
    }));

    return repairedProfile;
  }

  async function addMenuCategoryFromBuilder() {
    const cleanName = categoryDraft.name.trim();
    const cleanNameAr = categoryDraft.nameAr.trim();

    if (!cleanName) {
      show("Category name is required");
      return;
    }

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login again, then add categories");
        return;
      }
    }

    if (!managerProfile.businessId) {
      show("Login again, then add categories");
      return;
    }

    setMenuBusy(true);

    try {
      const savedCategory = await insertMenuCategoryIntoSupabase(managerProfile.businessId, cleanName, cleanNameAr);

      updateState((current) => ({
        ...current,
        categories: [
          savedCategory,
          ...current.categories.filter((category) => category.id !== savedCategory.id),
        ],
      }));

      setMenuDraft((current) => ({
        ...current,
        categoryId: current.categoryId || savedCategory.id,
      }));

      setCategoryDraft({ name: "", nameAr: "" });
      show(`${cleanName} category added`);
    } catch (error) {
      show(formatMenuDbError(error));
    } finally {
      setMenuBusy(false);
    }
  }

  async function handleMenuImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      show("Please upload an image file");
      return;
    }

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login again, then upload item images");
        event.target.value = "";
        return;
      }
    }

    if (!managerProfile.businessId) {
      show("Login again, then upload item images");
      event.target.value = "";
      return;
    }

    setImageBusy(true);

    try {
      const imageData = await compressMenuImage(file);
      const uploadedImage = await uploadMenuItemImagesToStorage(
        managerProfile.businessId,
        managerProfile.username,
        menuDraft.name.trim() || file.name || "menu-item",
        imageData
      );

      setMenuDraft((current) => ({
        ...current,
        imageThumbUrl: uploadedImage.imageThumbUrl,
        imageFullUrl: uploadedImage.imageFullUrl,
      }));
      show("Image uploaded to Supabase Storage");
    } catch (error) {
      show(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setImageBusy(false);
      event.target.value = "";
    }
  }

  function buildMenuItemFromDraft(cleanName: string, cleanNameAr: string, cleanDesc: string, cleanPrice: number): MenuItem {
    const icon = (menuDraft.icon.trim() || menuIconFromName(cleanName)).slice(0, 3).toUpperCase();
    const selectedCategory = state.categories.find((category) => category.id === menuDraft.categoryId);

    return {
      id: editingMenuItemId || makeId("menu"),
      name: cleanName,
      nameAr: cleanNameAr,
      desc: cleanDesc || "Menu item",
      price: Math.round(cleanPrice * 1000) / 1000,
      icon,
      available: menuDraft.available,
      categoryId: selectedCategory?.id || "",
      categoryName: selectedCategory?.name || "Uncategorized",
      availableAllDay: menuDraft.availableAllDay,
      availableFrom: menuDraft.availableFrom || "09:00",
      availableTo: menuDraft.availableTo || "23:00",
      imageThumbUrl: menuDraft.imageThumbUrl,
      imageFullUrl: menuDraft.imageFullUrl,
    };
  }

  function validateMenuDraft() {
    const cleanName = menuDraft.name.trim();
    const cleanNameAr = menuDraft.nameAr.trim();
    const cleanDesc = menuDraft.desc.trim();
    const cleanPrice = Number(menuDraft.price);

    if (!cleanName) {
      show("English item name is required");
      return null;
    }

    if (!cleanNameAr) {
      show("Arabic item name is required");
      return null;
    }

    if (!Number.isFinite(cleanPrice) || cleanPrice <= 0) {
      show("Valid item price is required");
      return null;
    }

    if (!menuDraft.availableAllDay) {
      if (!menuDraft.availableFrom || !menuDraft.availableTo) {
        show("Enter the daily available times");
        return null;
      }
    }

    return { cleanName, cleanNameAr, cleanDesc, cleanPrice };
  }

  async function addMenuItemFromBuilder() {
    const valid = validateMenuDraft();
    if (!valid) return;

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login again, then add menu items");
        return;
      }
    }

    if (!managerProfile.businessId) {
      show("Login again, then add menu items");
      return;
    }

    const nextItem = buildMenuItemFromDraft(valid.cleanName, valid.cleanNameAr, valid.cleanDesc, valid.cleanPrice);

    setMenuBusy(true);

    try {
      const savedItem = await insertMenuItemIntoSupabase(managerProfile.businessId, nextItem);

      updateState((current) => ({
        ...current,
        menu: [savedItem, ...current.menu.filter((item) => item.id !== savedItem.id)],
      }));

      setMenuDraft(emptyMenuDraft);
      setEditingMenuItemId("");
      show(`${valid.cleanName} saved to menu`);
    } catch (error) {
      show(formatMenuDbError(error));
    } finally {
      setMenuBusy(false);
    }
  }

  function toggleMenuBuilderCategory(categoryId: string) {
    setExpandedMenuCategories((current) => ({
      ...current,
      [categoryId]: !current[categoryId],
    }));
  }

  function expandAllMenuBuilderCategories() {
    const next: Record<string, boolean> = {};

    for (const group of menuBuilderGroups) {
      next[group.id] = true;
    }

    setExpandedMenuCategories(next);
  }

  function collapseAllMenuBuilderCategories() {
    setExpandedMenuCategories({});
  }

  function startEditingMenuItem(item: MenuItem) {
    setEditingMenuItemId(item.id);
    setMenuDraft({
      name: item.name,
      nameAr: item.nameAr,
      desc: item.desc,
      price: String(item.price),
      icon: item.icon,
      categoryId: item.categoryId,
      available: item.available,
      availableAllDay: item.availableAllDay,
      availableFrom: item.availableFrom || "09:00",
      availableTo: item.availableTo || "23:00",
      imageThumbUrl: item.imageThumbUrl || "",
      imageFullUrl: item.imageFullUrl || "",
    });
    show(`Editing ${item.name}`);
  }

  function cancelEditingMenuItem() {
    setEditingMenuItemId("");
    setMenuDraft(emptyMenuDraft);
    show("Edit cancelled");
  }

  async function saveEditedMenuItemFromBuilder() {
    if (!editingMenuItemId) {
      await addMenuItemFromBuilder();
      return;
    }

    const valid = validateMenuDraft();
    if (!valid) return;

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login again, then edit menu items");
        return;
      }
    }

    if (!managerProfile.businessId) {
      show("Login again, then edit menu items");
      return;
    }

    const nextItem = buildMenuItemFromDraft(valid.cleanName, valid.cleanNameAr, valid.cleanDesc, valid.cleanPrice);

    setMenuBusy(true);

    try {
      const savedItem = await updateMenuItemInSupabase(managerProfile.businessId, editingMenuItemId, nextItem);

      updateState((current) => ({
        ...current,
        menu: current.menu.map((item) => (item.id === savedItem.id ? savedItem : item)),
      }));

      setEditingMenuItemId("");
      setMenuDraft(emptyMenuDraft);
      show(`${valid.cleanName} updated`);
    } catch (error) {
      show(formatMenuDbError(error));
    } finally {
      setMenuBusy(false);
    }
  }

  async function removeMenuItem(itemId: string) {
    const item = state.menu.find((menuItem) => menuItem.id === itemId);
    if (!item) return;

    const ok = window.confirm(`Remove ${item.name} from the menu?`);
    if (!ok) return;

    if (state.profile.businessId && isUuid(itemId)) {
      setMenuBusy(true);

      try {
        await deleteMenuItemFromSupabase(state.profile.businessId, itemId);
      } catch (error) {
        show(formatMenuDbError(error));
        setMenuBusy(false);
        return;
      }

      setMenuBusy(false);
    }

    updateState((current) => ({
      ...current,
      menu: current.menu.filter((menuItem) => menuItem.id !== itemId),
    }));

    show(`${item.name} removed from saved menu`);
  }

  function closeTable() {
    const ok = window.confirm(`Close Table ${activeTable} session and clear all guests, orders, and requests?`);
    if (!ok) return;

    updateState((current) => ({
      ...current,
      currentGuest: "",
      guests: [],
      orders: [],
      requests: [],
    }));

    show(`Table ${activeTable} session closed`);
  }

  function loadDemoTable() {
    updateState((current) => ({
      ...current,
      currentGuest: "",
      guests: [],
      orders: [],
      requests: [],
    }));

    show("Clean table loaded. Add real menu items from Menu Builder.");
  }

  function createQr() {
    if (!state.profile.businessId && !state.profile.username) {
      show("Login first, then create QR codes");
      return;
    }

    const tableNumber = Math.max(1, Math.min(999, Number(qrInput || DEMO_TABLE)));
    const token = makeQrToken(businessName, branchName, tableNumber);

    updateState((current) => ({
      ...current,
      lastQrTable: tableNumber,
      qrTokens: {
        ...current.qrTokens,
        [String(tableNumber)]: token,
      },
    }));

    show(`QR created for Table ${tableNumber}`);
  }

  async function copyQrLink() {
    try {
      await navigator.clipboard.writeText(selectedQrUrl);
      show("QR link copied");
    } catch {
      show("Copy failed. Select the link manually.");
    }
  }

  function printQrCard() {
    window.print();
  }

  if (!loaded) {
    return (
      <main className="loading-screen">
        <div className="loader-card">Loading Tawleh Manager...</div>
      </main>
    );
  }

  return (
    <main
      className={publicCustomerMode ? `app-shell customer-only-shell ${Object.values(orderCart).some((qty) => Number(qty) > 0) ? "customer-has-cart" : ""}` : "app-shell"}
      style={publicCustomerMode ? customerBackgroundStyle : undefined}
    >
      {publicCustomerMode ? (
        <style dangerouslySetInnerHTML={{ __html: OPTION_ONE_CUSTOMER_CRITICAL_CSS }} />
      ) : (
        <style dangerouslySetInnerHTML={{ __html: MANAGER_DASHBOARD_OPTION2_CSS }} />
      )}
      {!state.profileComplete && !publicTableMode ? (
        <section className="auth-page">
          <div className="auth-logo-wrap">
            <img className="main-auth-logo" src={APP_LOGO_SRC} alt="Tawleh Manager logo" />
          </div>

          <section className="auth-layout">
            <aside className="auth-info">
              <div>
                <h1>All your restaurant operations, simplified.</h1>
                <p>
                  Tawleh Manager helps restaurants handle table QR ordering, kitchen flow, waiter requests,
                  bills, and printable table QR codes from one clean dashboard.
                </p>
              </div>

              <div className="auth-feature-list">
                <AuthFeature icon="QR" title="QR ordering" text="Let customers order directly from their table." />
                <AuthFeature icon="KS" title="Kitchen screen" text="Real-time orders grouped by table and customer name." />
                <AuthFeature icon="WR" title="Waiter requests" text="Noor from Table 5 wants a waiter. Instant and clear." />
                <AuthFeature icon="PR" title="Printable table QR codes" text="Restaurants create and print their own table QR codes." />
              </div>

              <div className="price-card">
                <div className="price-icon">OK</div>
                <div>
                  <strong>30-day free trial</strong>
                  <span>Then100 JOD/month per branch.No setup fee.</span>
                </div>
              </div>
            </aside>

            <section className="auth-card">
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${authTab === "login" ? "active" : ""}`}
                  onClick={() => setAuthTab("login")}
                  type="button"
                >
                  Log In
                </button>
                <button
                  className={`auth-tab ${authTab === "signup" ? "active" : ""}`}
                  onClick={() => setAuthTab("signup")}
                  type="button"
                >
                  Create Account
                </button>
              </div>

              <div className="auth-panels">
                {authTab === "login" ? (
                  <form className="login-panel" onSubmit={fakeLogin}>
                    <div className="auth-heading">
                      <h2>Welcome back</h2>
                      <p>Log in with your Tawleh Manager username.</p>
                    </div>

                    <Field label="Username">
                      <input
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(normalizeUsername(e.target.value))}
                        placeholder="example: abdoun_cafe"
                      />
                    </Field>

                    <Field label="Password">
                      <input
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </Field>

                    <div className="auth-row">
                      <label className="check-row">
                        <input type="checkbox" />
                        <span>Remember me</span>
                      </label>
                      <button className="link-button" type="button">Forgot password?</button>
                    </div>

                    <button className="btn dark full" type="submit" disabled={authBusy}>
                      {authBusy ? "Logging in..." : "Log In"}
                    </button>

                    <div className="or-row">
                      <span />
                      <em>or</em>
                      <span />
                    </div>

                    <button className="google-button" type="button">
                      <span>G</span>
                      Log in with Google
                    </button>
                  </form>
                ) : (
                  <form className="signup-panel" onSubmit={submitSignup}>
                    <div className="auth-heading">
                      <h2>Create your account</h2>
                      <p>Start your 30-day free trial. No credit card required.</p>
                    </div>

                    <div className="signup-grid">
                      <Field label="Restaurant name">
                        <input
                          value={signupProfile.restaurantName}
                          onChange={(e) => setSignupProfile({ ...signupProfile, restaurantName: e.target.value })}
                          placeholder="Enter restaurant name"
                        />
                      </Field>

                      <Field label="Branch name">
                        <input
                          value={signupProfile.branchName}
                          onChange={(e) => setSignupProfile({ ...signupProfile, branchName: e.target.value })}
                          placeholder="Example: Abdoun Branch"
                        />
                      </Field>

                      <Field label="Business email">
                        <input
                          value={signupProfile.businessEmail}
                          onChange={(e) => setSignupProfile({ ...signupProfile, businessEmail: e.target.value })}
                          placeholder="owner@restaurant.com"
                          type="email"
                        />
                      </Field>

                      <Field label="Create username">
                        <input
                          value={signupProfile.username}
                          onChange={(e) => setSignupProfile({ ...signupProfile, username: normalizeUsername(e.target.value) })}
                          placeholder="example: abdoun_cafe"
                        />
                        <UsernameStatus
                          value={cleanSignupUsername}
                          longEnough={usernameIsLongEnough}
                        />
                      </Field>

                      <Field label="Business phone">
                        <input
                          value={signupProfile.businessPhone}
                          onChange={(e) => setSignupProfile({ ...signupProfile, businessPhone: e.target.value })}
                          placeholder="+962 7X XXX XXXX"
                        />
                      </Field>

                      <Field label="Password">
                        <input
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="At least 8 characters"
                          type="password"
                        />
                      </Field>

                      <Field label="Confirm password">
                        <input
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          type="password"
                        />
                      </Field>

                      <Field label="Business type">
                        <select
                          value={signupProfile.businessType}
                          onChange={(e) => setSignupProfile({ ...signupProfile, businessType: e.target.value })}
                        >
                          <option>Cafe</option>
                          <option>Restaurant</option>
                          <option>Lounge</option>
                          <option>Dessert shop</option>
                          <option>Food court</option>
                        </select>
                      </Field>

                      <Field label="Number of tables">
                        <input
                          type="number"
                          min={1}
                          max={999}
                          value={signupProfile.tableCount}
                          onChange={(e) => setSignupProfile({ ...signupProfile, tableCount: Number(e.target.value) })}
                        />
                      </Field>

                      <Field label="Number of locations">
                        <input
                          type="number"
                          min={1}
                          max={25}
                          value={signupProfile.locationCount}
                          onChange={(e) => updateLocationCount(Number(e.target.value))}
                        />
                        <div className="helper">Example: if this restaurant has 5 branches, enter 5.</div>
                      </Field>

                      <Field label={`Locations (${completedLocationCount}/${signupProfile.locationCount})`}>
                        <div className="location-tabs">
                          {signupLocations.map((location, index) => (
                            <button
                              className={`location-tab ${activeLocationTab === index ? "active" : ""} ${location.trim() ? "done" : ""}`}
                              key={`signup-location-tab-${index}`}
                              type="button"
                              onClick={() => setActiveLocationTab(index)}
                            >
                              {index + 1}
                            </button>
                          ))}
                        </div>

                        <input
                          value={signupLocations[activeLocationTab] || ""}
                          onChange={(e) => updateSignupLocation(activeLocationTab, e.target.value)}
                          placeholder={`Location ${activeLocationTab + 1}: Example: Amman, Sweifieh`}
                        />

                        <div className="ip-lock-note good">
                          <strong>IP lock:</strong> Supabase will block another free trial from the same IP address.
                        </div>
                      </Field>

                      <Field label="Restaurant logo">
                        <div className="logo-uploader compact">
                          <LogoBox logoDataUrl={signupProfile.logoDataUrl} fallback="Logo" large />
                          <div>
                            <input type="file" accept="image/*" onChange={handleLogoUpload} />
                            <div className="helper">This is the restaurant's own logo for customer QR pages.</div>
                          </div>
                        </div>
                      </Field>

                      <Field label="Brand color">
                        <input
                          type="color"
                          value={signupProfile.brandColor}
                          onChange={(e) => {
                            setSignupProfile({ ...signupProfile, brandColor: e.target.value });
                            document.documentElement.style.setProperty("--brand", e.target.value);
                          }}
                        />
                      </Field>

                      <Field label="Customer welcome message">
                        <textarea
                          value={signupProfile.welcomeMessage}
                          onChange={(e) => setSignupProfile({ ...signupProfile, welcomeMessage: e.target.value })}
                          placeholder="Have a seat, order under your name, and enjoy."
                        />
                      </Field>
                    </div>

                    <div className="password-rules">
                      <span>Username must be unique</span>
                      <span>Real Supabase account</span>
                      <span>IP locked on backend</span>
                    </div>

                    <button className="btn full" type="submit" disabled={authBusy}>
                      {authBusy ? "Creating account..." : "Create Tawleh Manager Account"}
                    </button>

                    <p className="terms">
                      By creating an account, you agree to Tawleh Manager's terms and restaurant self-setup policy.
                    </p>
                  </form>
                )}
              </div>
            </section>
          </section>

          <div className="auth-footnote">
            <span>Secure</span>
            Your restaurant controls its own menu, logo, tables, and printable QR codes.
          </div>
        </section>
      ) : (
        <>
          <header className="topbar">
            <div className="brand">
              <img className="topbar-logo-img" src={APP_LOGO_SRC} alt="Tawleh Manager" />
              <div>
                <h1>{publicCustomerMode ? businessName : "Tawleh Manager"}</h1>
                <p>{publicCustomerMode ? `Table ${activeTable} customer menu` : `@${state.profile.username || "username"}  ${businessName}  ${branchName}`}</p>
              </div>
            </div>

            <div className="top-actions">
              {publicCustomerMode ? (
                <span className="pill"><span className="dot" />Table {activeTable} live menu</span>
              ) : (
                <>
                  <span className="pill"><span className="dot" />{businessName} live</span>
                  <button className="btn secondary small" onClick={loadDemoTable}>Load demo table</button>
                  <button className="btn ghost small" onClick={openMenuBuilder}>Edit menu</button>
                  <button className="btn danger small" onClick={resetAll}>Reset</button>
                </>
              )}
            </div>
          </header>

          <section className={publicCustomerMode ? "grid public-qr-grid" : "grid manager-only-grid"}>
            {publicCustomerMode && (
            <section className="panel customer-panel">
              <div className="panel-header">
                <div>
                  <h2>{publicCustomerMode ? `Welcome to ${businessName}` : "Customer QR table flow"}</h2>
                  <p>{publicCustomerMode ? "Enter your name to begin ordering from your table." : "What the guest sees after scanning a table QR code."}</p>
                </div>
                <span className="pill">Table {activeTable}</span>
              </div>

              <div className="panel-body">
                {publicTableError ? <div className="inline-error">{publicTableError}</div> : null}
                <div className="customer-phone">
                  <div className="phone-screen">
                    <div className="phone-status">9:41 &nbsp; Tawleh</div>

                    {publicCustomerMode && customerBackgroundImage ? (
                      <div
                        className="customer-menu-photo-bg"
                        style={{ backgroundImage: `url("${customerBackgroundImage}")` }}
                        aria-hidden="true"
                      />
                    ) : null}

                    {publicCustomerMode ? (
                      <div className="option-one-customer-hero">
                        <div className="option-one-welcome-first">
                          <span>Welcome</span>
                        </div>

                        <div className="option-one-logo-center option-one-logo-proud">
                          <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} large customer />
                          <div className="option-one-wordmark">{businessName}</div>
                          <div className="option-one-submark">Lebanese Cuisine</div>
                        </div>

                        <div className="option-one-welcome-copy">
                          <p>{state.profile.welcomeMessage || "Sit back, relax, and enjoy. We'll take care of the rest."}</p>
                        </div>

                        <div className="option-one-table-card">
                          <div className="option-one-table-logo">
                            <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                          </div>
                          <div>
                            <span>You’re at</span>
                            <strong>Table {activeTable}</strong>
                            <em>{branchName}</em>
                          </div>
                          <b>›</b>
                        </div>
                      </div>
                    ) : (
                      <div className="hero-card">
                        <div className="customer-business-head">
                          <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                          <div>
                            <div className="eyebrow">Welcome to</div>
                            <h3>{businessName}</h3>
                          </div>
                        </div>
                        <p>{state.profile.welcomeMessage}</p>
                        <div className="table-chip">Table {activeTable}  {branchName}</div>
                      </div>
                    )}

                    <div className="phone-content">
                      {(!state.currentGuest || (publicCustomerMode && phoneTab === "menu" && activeMenuCategory === "__home")) ? (
                        publicCustomerMode ? (
                          <>
                          <div className="option-one-seat-card">
                            {state.currentGuest ? (
                              <>
                                <div className="option-one-card-head">
                                  <div>
                                    <h4>You’re ordering as</h4>
                                    <p>Stay on this screen, choose a category, then add items.</p>
                                  </div>
                                </div>

                                <div className="option-one-current-guest-card">
                                  <span>{state.currentGuest.slice(0, 1).toUpperCase()}</span>
                                  <div>
                                    <strong>{state.currentGuest}</strong>
                                    <small>Table {activeTable} • Current guest</small>
                                  </div>
                                </div>

                                <div className="guest-chips option-one-profile-chips">
                                  {seatedGuests.length ? (
                                    seatedGuests.map((guest) => (
                                      <button
                                        key={guest}
                                        className={`guest-chip option-one-profile-chip ${guest === state.currentGuest ? "active" : ""}`}
                                        type="button"
                                        onClick={() => chooseSeatedGuest(guest)}
                                      >
                                        <span>♙</span>{guest}
                                      </button>
                                    ))
                                  ) : (
                                    state.guests.map((guest) => (
                                      <button
                                        key={guest}
                                        className={`guest-chip option-one-profile-chip ${guest === state.currentGuest ? "active" : ""}`}
                                        type="button"
                                        onClick={() => chooseSeatedGuest(guest)}
                                      >
                                        <span>♙</span>{guest}
                                      </button>
                                    ))
                                  )}
                                  <button
                                    className="guest-chip option-one-profile-chip option-one-add-name-chip"
                                    type="button"
                                    onClick={() => {
                                      setGuestName("");
                                      updateState((current) => ({ ...current, currentGuest: "" }));
                                    }}
                                  >
                                    <span>+</span>Add name
                                  </button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="option-one-card-head">
                                  <div>
                                    <h4>Who’s dining today?</h4>
                                    <p>Enter your name or select your profile.</p>
                                  </div>
                                </div>

                                <div className="option-one-name-entry">
                                  <span className="option-one-input-icon">♙</span>
                                  <input
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && joinGuest(guestName)}
                                    placeholder="Enter your name"
                                    maxLength={24}
                                    autoFocus={!seatedGuests.length}
                                  />
                                  <button
                                    className="option-one-arrow-button"
                                    type="button"
                                    onClick={() => joinGuest(guestName)}
                                    aria-label="Begin ordering"
                                  >
                                    →
                                  </button>
                                </div>

                                <div className="guest-chips option-one-profile-chips">
                                  {seatedGuests.length ? (
                                    seatedGuests.map((guest) => (
                                      <button
                                        key={guest}
                                        className="guest-chip option-one-profile-chip active"
                                        type="button"
                                        onClick={() => chooseSeatedGuest(guest)}
                                      >
                                        <span>♙</span>{guest}
                                      </button>
                                    ))
                                  ) : (
                                    ["Jihad", "Rami", "Lina", "Sara"].map((name) => (
                                      <button
                                        key={name}
                                        className="guest-chip option-one-profile-chip"
                                        type="button"
                                        onClick={() => joinGuest(name)}
                                      >
                                        <span>♙</span>{name}
                                      </button>
                                    ))
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          <div className="option-one-explore-card">
                            <div className="option-one-section-row">
                              <h4>Explore our menu</h4>
                              <button
                                type="button"
                                onClick={() => {
                                  if (!state.currentGuest) {
                                    show("Enter your name first");
                                    return;
                                  }

                                  setActiveMenuCategory("all");
                                  setPhoneTab("menu");
                                }}
                              >
                                View all ›
                              </button>
                            </div>

                            <div className="option-one-category-preview">
                              {menuCategoriesWithItems.length ? (
                                menuCategoriesWithItems.map((category) => {
                                  const categoryItems = state.menu.filter((item) => item.categoryId === category.id);
                                  const itemCount = categoryItems.length;
                                  const firstPhotoItem = categoryItems.find((item) => item.imageThumbUrl || item.imageFullUrl);
                                  const categoryImageUrl = firstPhotoItem?.imageThumbUrl || firstPhotoItem?.imageFullUrl || "";
                                  const categoryInitials = menuIconFromName(category.name || "Menu");

                                  return (
                                    <button
                                      key={category.id}
                                      className="option-one-category-card"
                                      type="button"
                                      onClick={() => {
                                        if (!state.currentGuest) {
                                          show("Enter your name first");
                                          return;
                                        }

                                        setActiveMenuCategory(category.id);
                                        setPhoneTab("menu");
                                      }}
                                    >
                                      <div className="option-one-category-photo">
                                        {categoryImageUrl ? (
                                          <img src={categoryImageUrl} alt={category.name} />
                                        ) : (
                                          <span>{categoryInitials}</span>
                                        )}
                                      </div>
                                      <strong>{category.name}</strong>
                                      <small>{itemCount} {itemCount === 1 ? "item" : "items"}</small>
                                    </button>
                                  );
                                })
                              ) : (
                                <button
                                  className="option-one-category-card"
                                  type="button"
                                  onClick={() => {
                                    if (!state.currentGuest) {
                                      show("Enter your name first");
                                      return;
                                    }

                                    setActiveMenuCategory("all");
                                    setPhoneTab("menu");
                                  }}
                                >
                                  <div className="option-one-category-photo">
                                    <span>MN</span>
                                  </div>
                                  <strong>Menu</strong>
                                  <small>{state.menu.length} items</small>
                                </button>
                              )}

                              {hasUncategorizedItems ? (
                                <button
                                  className="option-one-category-card"
                                  type="button"
                                  onClick={() => {
                                    if (!state.currentGuest) {
                                      show("Enter your name first");
                                      return;
                                    }

                                    setActiveMenuCategory("uncategorized");
                                    setPhoneTab("menu");
                                  }}
                                >
                                  <div className="option-one-category-photo">
                                    <span>OT</span>
                                  </div>
                                  <strong>Other</strong>
                                  <small>{state.menu.filter((item) => !item.categoryId).length} items</small>
                                </button>
                              ) : null}
                            </div>
                          </div>

                          <div className="option-one-bottom-nav">
                            <button
                              type="button"
                              onClick={() => {
                                if (!state.currentGuest) {
                                  show("Enter your name first");
                                  return;
                                }

                                setPhoneTab("bill");
                              }}
                            >
                              <span>▤</span>
                              My Bill
                            </button>
                            <button className="active" type="button" onClick={() => {
                              setPhoneTab("menu");
                              setActiveMenuCategory("__home");
                            }}>
                              <span>⌂</span>
                              Menu
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (!state.currentGuest) {
                                  show("Enter your name first");
                                  return;
                                }

                                setPhoneTab("service");
                              }}
                            >
                              <span>◉</span>
                              Call Waiter
                            </button>
                          </div>

                          <div className="option-one-secure-row">
                            <span>Secure</span>
                            <em>Private</em>
                            <span>Hassle-free</span>
                          </div>
                          </>

                        ) : (
                          <div className="seat-card">
                            <h4>Have a Seat</h4>
                            <p>Everyone at this table joins separately. The kitchen sees who ordered each item.</p>
                            <div className="input-row">
                              <input
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && joinGuest(guestName)}
                                placeholder="Enter your name"
                                maxLength={24}
                              />
                              <button className="btn" onClick={() => joinGuest(guestName)}>Join</button>
                            </div>

                            <div className="guest-chips">
                              {["Sarah", "Fatima", "Hakim", "Noor"].map((name) => (
                                <button key={name} className="guest-chip" onClick={() => joinGuest(name)}>{name}</button>
                              ))}
                            </div>
                          </div>
                        )
                      ) : (
                        orderReviewOpen ? (
                          <div className="order-review-page darik-review-page">
                            <div className="review-hero-card">
                              <button className="review-back-button prestige-back-button" type="button" onClick={() => setOrderReviewOpen(false)}>
                                Back to menu
                              </button>

                              <div className="review-hero-main">
                                <div className="review-restaurant-mark">
                                  {state.profile.logoDataUrl ? (
                                    <img src={state.profile.logoDataUrl} alt={businessName} />
                                  ) : (
                                    <span>{logoFallback}</span>
                                  )}
                                </div>

                                <div>
                                  <p className="review-eyebrow">Confirm before kitchen</p>
                                  <h4>Review your order</h4>
                                  <p className="review-subtitle">Table {activeTable} - {state.currentGuest}</p>
                                </div>
                              </div>

                              <div className="review-hero-stats">
                                <div>
                                  <span>Items</span>
                                  <strong>{orderCartItemCount}</strong>
                                </div>
                                <div>
                                  <span>Total</span>
                                  <strong>{money(orderCartTotal)}</strong>
                                </div>
                              </div>
                            </div>

                            <div className="review-line-list darik-review-list">
                              {orderCartLines.map((line) => {
                                const itemImage = line.item.imageThumbUrl || line.item.imageFullUrl;

                                return (
                                  <div className="review-product-card" key={line.item.id}>
                                    <div className="review-product-photo">
                                      {itemImage ? (
                                        <img src={itemImage} alt={line.item.name} />
                                      ) : (
                                        <span>{line.item.icon}</span>
                                      )}
                                    </div>

                                    <div className="review-product-info">
                                      <div className="review-product-title-row">
                                        <div>
                                          <strong>{line.item.name}</strong>
                                          {line.item.nameAr ? <span dir="rtl">{line.item.nameAr}</span> : null}
                                        </div>
                                        <b>{money(line.lineTotal)}</b>
                                      </div>

                                      <p>{line.item.desc}</p>

                                      <div className="review-product-meta">
                                        <span>{line.item.categoryName || "Menu item"}</span>
                                        <span>{money(line.item.price)} each</span>
                                      </div>
                                    </div>

                                    <div className="review-product-actions">
                                      <div className="review-qty-stepper">
                                        <button type="button" onClick={() => changeCartQuantity(line.item.id, line.quantity - 1)}>-</button>
                                        <strong>{line.quantity}</strong>
                                        <button type="button" onClick={() => changeCartQuantity(line.item.id, line.quantity + 1)}>+</button>
                                      </div>

                                      <button className="remove-line review-delete-button" type="button" onClick={() => removeCartItem(line.item.id)}>
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="review-summary-card">
                              <div className="review-summary-row">
                                <span>Subtotal</span>
                                <strong>{money(orderCartTotal)}</strong>
                              </div>
                              <div className="review-summary-row muted">
                                <span>Payment</span>
                                <strong>Pay at restaurant</strong>
                              </div>
                              <p>When you tap looks good, this order goes straight to the kitchen screen.</p>

                              {orderSendError ? (
                                <div className="order-send-error">
                                  {orderSendError}
                                </div>
                              ) : null}

                              <button className="review-confirm-button" type="button" onClick={confirmOrderToKitchen} disabled={orderSendBusy || !orderCartLines.length}>
                                {orderSendBusy ? "Sending..." : "Looks good - send to kitchen"}
                              </button>
                            </div>
                          </div>
                        ) : (
                        <>
                          <div className="mini-card">
                            <p>You are seated as</p>
                            <h4>{state.currentGuest}</h4>
                            <div className="guest-chips">
                              {state.guests.map((guest) => (
                                <button
                                  key={guest}
                                  className={`guest-chip ${guest === state.currentGuest ? "active" : ""}`}
                                  onClick={() => updateState((current) => ({ ...current, currentGuest: guest }))}
                                >
                                  {guest}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="phone-tabs">
                            <button className={`phone-tab ${phoneTab === "menu" ? "active" : ""}`} onClick={() => setPhoneTab("menu")}>Menu</button>
                            <button className={`phone-tab ${phoneTab === "bill" ? "active" : ""}`} onClick={() => setPhoneTab("bill")}>My Bill</button>
                            <button className={`phone-tab ${phoneTab === "service" ? "active" : ""}`} onClick={() => setPhoneTab("service")}>Call Waiter</button>
                          </div>

                          {phoneTab === "menu" && (
                            <>
                              {publicCustomerMode && activeMenuCategory !== "__home" ? (
                                <div className="option-one-menu-back-row">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuCategory("__home");
                                      setPhoneTab("menu");
                                    }}
                                  >
                                    ← Back to categories
                                  </button>
                                  <strong>
                                    {activeMenuCategory === "all"
                                      ? "All menu items"
                                      : activeMenuCategory === "uncategorized"
                                        ? "Other"
                                        : menuCategoriesWithItems.find((category) => category.id === activeMenuCategory)?.name || "Menu"}
                                  </strong>
                                </div>
                              ) : null}

                              {state.menu.length && !publicCustomerMode ? (
                                <div className="category-scroll">
                                  <button
                                    className={`category-chip ${activeMenuCategory === "all" ? "active" : ""}`}
                                    type="button"
                                    onClick={() => setActiveMenuCategory("all")}
                                  >
                                    All
                                  </button>
                                  {menuCategoriesWithItems.map((category) => (
                                    <button
                                      key={category.id}
                                      className={`category-chip ${activeMenuCategory === category.id ? "active" : ""}`}
                                      type="button"
                                      onClick={() => setActiveMenuCategory(category.id)}
                                    >
                                      {category.name}
                                    </button>
                                  ))}
                                  {hasUncategorizedItems ? (
                                    <button
                                      className={`category-chip ${activeMenuCategory === "uncategorized" ? "active" : ""}`}
                                      type="button"
                                      onClick={() => setActiveMenuCategory("uncategorized")}
                                    >
                                      Other
                                    </button>
                                  ) : null}
                                </div>
                              ) : null}

                              <div className="menu-list">
                              {!state.menu.length ? (
                                <div className="seat-card menu-empty-card">
                                  <h4>No menu items yet</h4>
                                  <p>This table QR is connected, but no saved menu items were found for this restaurant account.</p>
                                </div>
                              ) : visibleCustomerMenu.length ? (
                                visibleCustomerMenu.map((item) => (
                                  <div key={item.id} className={`menu-item ${isMenuItemCurrentlyAvailable(item) ? "" : "unavailable"}`}>
                                    {item.imageThumbUrl ? (
                                      <button className="item-photo-button" type="button" onClick={() => setSelectedMenuImage(item)}>
                                        <img src={item.imageThumbUrl} alt={item.name} />
                                      </button>
                                    ) : (
                                      <div className="item-icon">{item.icon}</div>
                                    )}
                                    <div>
                                      <h5>{item.name}</h5>
                                      {item.nameAr ? <p className="arabic-item-name" dir="rtl">{item.nameAr}</p> : null}
                                      <p>{item.desc}</p>
                                      <p className="availability-line">{formatItemAvailability(item)}</p>
                                      <div className="price">{money(item.price)}</div>
                                    </div>
                                    {Number(orderCart[item.id] || 0) > 0 ? (
                                      <div className="cart-quantity-control">
                                        <button type="button" onClick={() => changeCartQuantity(item.id, Number(orderCart[item.id] || 0) - 1)}>-</button>
                                        <strong>{Number(orderCart[item.id] || 0)}</strong>
                                        <button type="button" onClick={() => changeCartQuantity(item.id, Number(orderCart[item.id] || 0) + 1)}>+</button>
                                      </div>
                                    ) : (
                                      <button className="btn small" disabled={!isMenuItemCurrentlyAvailable(item)} onClick={() => addCartItem(item.id)}>
                                        {isMenuItemCurrentlyAvailable(item) ? "Add" : unavailableButtonText(item)}
                                      </button>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="seat-card menu-empty-card">
                                  <h4>No items in this category</h4>
                                  <p>Choose All to see the full menu.</p>
                                </div>
                              )}
                            </div>

                            </>
                          )}

                          {phoneTab === "bill" && (
                            <div className="bill-stack option-one-utility-screen">
                              <div className="option-one-menu-back-row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuCategory("__home");
                                    setPhoneTab("menu");
                                  }}
                                >
                                  ← Back
                                </button>
                                <strong>My bill</strong>
                              </div>

                              <div className="seat-card option-one-bill-card">
                                <h4>My bill</h4>
                                <p>Items ordered under your name.</p>
                                <BillRows orders={state.orders.filter((order) => order.guest === state.currentGuest)} />
                                <div className="bill-total"><span>My total</span><span>{money(myTotal)}</span></div>
                              </div>

                              <div className="seat-card">
                                <h4>Table bill</h4>
                                <p>Full table total grouped by guest.</p>
                                <GuestBillRows billByGuest={billByGuest} />
                                <div className="bill-total"><span>Table total</span><span>{money(tableTotal)}</span></div>
                                <button className="btn secondary full" onClick={() => addRequest("Full bill")}>Request full bill</button>
                              </div>
                            </div>
                          )}

                          {phoneTab === "service" && (
                            <div className="option-one-utility-screen">
                              <div className="option-one-menu-back-row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuCategory("__home");
                                    setPhoneTab("menu");
                                  }}
                                >
                                  ← Back
                                </button>
                                <strong>Call waiter</strong>
                              </div>

                              <div className="seat-card option-one-service-card">
                                <h4>Need something?</h4>
                              <p>Your request appears in Tawleh Manager with your name and table number.</p>
                              <div className="request-grid">
                                {[
                                  ["WA", "Waiter"],
                                  ["WT", "Water"],
                                  ["NP", "Napkins"],
                                  ["CH", "Charcoal"],
                                ].map(([icon, text]) => (
                                  <button key={text} className="request-btn" onClick={() => addRequest(text)}>
                                    <span>{icon}</span>{text}
                                  </button>
                                ))}
                              </div>
                              <button className="btn ghost full" onClick={() => {
                                setOrderCart({});
                                setOrderReviewOpen(false);
                                updateState((current) => ({ ...current, currentGuest: "" }));
                              }}>Switch customer</button>
                              </div>
                            </div>
                          )}
                        </>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}

            {!publicCustomerMode && (
            <section className="panel manager-option2-shell">
              <aside className="manager-option2-sidebar">
                <div className="sidebar-logo-block restaurant-brand-logo-block">
                  <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                  <div>
                    <strong>{businessName}</strong>
                    <span>{branchName}</span>
                  </div>
                </div>

                <div className="sidebar-restaurant-card">
                  <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                  <div>
                    <strong>{businessName}</strong>
                    <span>Restaurant logo for dashboard and QR</span>
                  </div>
                </div>

                <nav className="sidebar-nav">
                  <button className={`sidebar-nav-item ${managerTab === "kitchen" ? "active" : ""}`} type="button" onClick={() => setManagerTab("kitchen")}>Kitchen</button>
                  <button className={`sidebar-nav-item ${managerTab === "waiter" ? "active" : ""}`} type="button" onClick={() => setManagerTab("waiter")}>Waiter Calls</button>
                  <button className={`sidebar-nav-item ${managerTab === "tables" ? "active" : ""}`} type="button" onClick={() => setManagerTab("tables")}>Tables</button>
                  <button className={`sidebar-nav-item ${managerTab === "menu" ? "active" : ""}`} type="button" onClick={() => setManagerTab("menu")}>Menu</button>
                  <button className={`sidebar-nav-item ${managerTab === "menuBuilder" ? "active" : ""}`} type="button" onClick={() => setManagerTab("menuBuilder")}>Builder</button>
                  <button className={`sidebar-nav-item ${managerTab === "qr" ? "active" : ""}`} type="button" onClick={() => setManagerTab("qr")}>QR Tables</button>
                  <button className={`sidebar-nav-item ${managerTab === "profile" ? "active" : ""}`} type="button" onClick={() => setManagerTab("profile")}>Profile</button>
                </nav>

                <div className="sidebar-summary-card">
                  <span>Today’s Summary</span>
                  <div><strong>{openOrderCount}</strong><em>open orders</em></div>
                  <div><strong>{waitingRequests.length}</strong><em>waiter calls</em></div>
                  <div><strong>{tableTotal.toFixed(2)}</strong><em>table bill</em></div>
                </div>

                <button className="sidebar-primary-action" type="button" onClick={() => setManagerTab("qr")}>View QR Tables →</button>
              </aside>

              <div className="panel-header manager-option2-header">
                <div className="manager-option2-greeting">
                  <span>Restaurant Control Center</span>
                  <h2>Good day, {businessName}</h2>
                  <p>@{state.profile.username || "username"} • {branchName} • Live operations dashboard</p>
                </div>

                <div className="manager-option2-actions">
                  <span className="manager-live-pill"><span className="dot" />Live</span>
                  <button className="btn ghost small" onClick={openMenuBuilder}>Edit menu</button>
                  <button className="btn secondary small" onClick={loadDemoTable}>Demo table</button>
                  <button className="btn danger small" onClick={resetAll}>Reset</button>
                </div>
              </div>

              <div className="panel-body manager-layout">
                <div className="stats">
                  <Stat label="Active tables" value={state.guests.length ? "1" : "0"} />
                  <Stat label="Open orders" value={String(openOrderCount)} />
                  <Stat label="Waiter calls" value={String(waitingRequests.length)} />
                  <Stat label="Table bill" value={tableTotal.toFixed(2)} />
                </div>

                <nav className="manager-tabs">
                  <Tab label="Kitchen Screen" active={managerTab === "kitchen"} onClick={() => setManagerTab("kitchen")} />
                  <Tab label="Waiter Screen" active={managerTab === "waiter"} onClick={() => setManagerTab("waiter")} />
                  <Tab label="Tables" active={managerTab === "tables"} onClick={() => setManagerTab("tables")} />
                  <Tab label="Menu Manager" active={managerTab === "menu"} onClick={() => setManagerTab("menu")} />
                  <Tab label="Menu Builder" active={managerTab === "menuBuilder"} onClick={() => setManagerTab("menuBuilder")} />
                  <Tab label="Table QR" active={managerTab === "qr"} onClick={() => setManagerTab("qr")} />
                  <Tab label="Restaurant Profile" active={managerTab === "profile"} onClick={() => setManagerTab("profile")} />
                </nav>

                {managerTab === "kitchen" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <div className="kitchen-screen-header">
                        <div>
                          <h3>Live Kitchen Orders</h3>
                          <p className="sub">Orders sent by customers appear here live. New orders ring one deli bell.</p>
                        </div>

                        <div className="kitchen-bell-actions">
                          <button
                            className={`btn small ${kitchenBellEnabled ? "success" : "secondary"}`}
                            type="button"
                            onClick={enableKitchenBell}
                          >
                            {kitchenBellEnabled ? "Bell on" : "Enable deli bell"}
                          </button>
                          <button className="btn small ghost" type="button" onClick={testKitchenBell}>
                            Test bell
                          </button>
                          <button className="btn small ghost" type="button" onClick={refreshKitchenOrdersNow}>
                            Refresh
                          </button>
                        </div>
                      </div>

                      {kitchenTickets.length ? (
                        <div className="kitchen-ticket-stack">
                          {kitchenTickets.map((ticket) => {
                            const ticketLabel = ticket.ticketNumber ? `#${ticket.ticketNumber}` : ticket.orderTicketId ? ticket.orderTicketId.slice(0, 8).toUpperCase() : "NEW";

                            return (
                              <div className={`kitchen-ticket-card ${ticket.kitchenPrintedAt ? "printed" : "not-printed"}`} key={ticket.key}>
                                <div className="kitchen-ticket-top">
                                  <div>
                                    <span className="ticket-eyebrow">Kitchen Ticket {ticketLabel}</span>
                                    <h4>Table {ticket.table} - {ticket.guest}</h4>
                                    <p>{new Date(ticket.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {ticket.itemCount} item{ticket.itemCount === 1 ? "" : "s"}</p>
                                  </div>

                                  <span className={`print-status ${ticket.kitchenPrintedAt ? "printed" : "pending"}`}>
                                    {ticket.kitchenPrintedAt ? "Printed" : "Not printed"}
                                  </span>
                                </div>

                                {ticket.printNote ? <div className="print-warning">{ticket.printNote}</div> : null}

                                <div className="ticket-lines">
                                  {ticket.orders.map((order) => (
                                    <div className="ticket-line" key={order.id}>
                                      <span>{Math.max(1, Number(order.quantity || 1))}x {order.itemName}</span>
                                      <small>{order.status}</small>
                                    </div>
                                  ))}
                                </div>

                                <div className="ticket-actions">
                                  <button className="btn small secondary" type="button" onClick={() => printKitchenTicket(ticket, false)}>
                                    {ticket.kitchenPrintedAt ? "Print again" : "Print Ticket"}
                                  </button>
                                  <button className="btn small ghost" type="button" onClick={() => printKitchenTicket(ticket, true)}>
                                    Reprint copy
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}

                      {!activeOrders.length ? (
                        <Empty text="No active kitchen orders yet. Add an item from the customer phone." />
                      ) : (
                        <div className="order-group">
                          {Object.entries(ordersByTable).map(([tableNumber, guestGroups]) => {
                            const tableOrders = Object.values(guestGroups).flat();

                            return (
                              <div className="kitchen-table-group" key={tableNumber}>
                                <div className="order-group-header">
                                  <span>Table {tableNumber}</span>
                                  <span>{tableOrders.length} active item{tableOrders.length === 1 ? "" : "s"}</span>
                                </div>

                                {Object.entries(guestGroups).map(([guest, orders]) => (
                                  <div key={`${tableNumber}-${guest}`}>
                                    <div className="order-row guest-row">
                                      <div>
                                        <h4>{guest}</h4>
                                        <p>Guest order group</p>
                                      </div>
                                      <span className="status">{orders.length} item{orders.length === 1 ? "" : "s"}</span>
                                    </div>

                                    {orders.map((order) => (
                                      <OrderRow key={order.id} order={order} onStatus={setOrderStatus} />
                                    ))}
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="manager-card">
                      <h3>Ready to Serve</h3>
                      <p className="sub">Runner sees the exact person for each ready item.</p>

                      {!readyOrders.length ? (
                        <Empty text="No ready items yet." />
                      ) : (
                        readyOrders.map((order) => (
                          <div className="request-row" key={order.id}>
                            <div>
                              <strong>{order.itemName} {Math.max(1, Number(order.quantity || 1)) > 1 ? `x${order.quantity}` : ""} for {order.guest}</strong>
                              <span>Table {activeTable}  "{order.itemName} for {order.guest}?"</span>
                            </div>
                            <button className="btn small ghost" onClick={() => setOrderStatus(order.id, "Served")}>Served</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {managerTab === "waiter" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Waiter Requests</h3>
                      <p className="sub">Customer calls from the table, with name included.</p>

                      {!waitingRequests.length ? (
                        <Empty text="No waiter requests. Try Call Waiter from the phone." />
                      ) : (
                        waitingRequests.map((request) => (
                          <div className="request-row" key={request.id}>
                            <div>
                              <strong>Table {request.table}  {request.guest} requested {request.type}</strong>
                              <span>{new Date(request.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}  {request.status}</span>
                            </div>
                            <button className="btn small success" onClick={() => resolveRequest(request.id)}>Resolve</button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="manager-card">
                      <h3>Service Script</h3>
                      <p className="sub">This is the real-world flow.</p>
                      <Empty alignLeft text={'"Turkey sandwich for Sarah?"\n"Spanish latte for Fatima?"\n"Noor requested a waiter from Table 5."'} />
                    </div>
                  </div>
                )}

                {managerTab === "tables" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Floor Tables</h3>
                      <p className="sub">A table becomes active after someone scans and joins.</p>
                      <div className="table-map">
                        {Array.from({ length: state.profile.tableCount }, (_, index) => {
                          const tableNumber = index + 1;
                          const isDemo = tableNumber === activeTable;
                          const active = isDemo && state.guests.length > 0;
                          const needsHelp = isDemo && waitingRequests.length > 0;
                          return (
                            <div key={tableNumber} className={`table-card ${active ? "active-table" : ""} ${needsHelp ? "needs-help" : ""}`}>
                              <div>
                                <h4>Table {tableNumber}</h4>
                                <p>{active ? `${state.guests.length} seated  ${openOrderCount} open orders` : "Available"}</p>
                              </div>
                              <span className={`status ${needsHelp ? "waiting" : active ? "ready" : "served"}`}>{needsHelp ? "Needs waiter" : active ? "Active" : "Empty"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>Table {activeTable} Bill</h3>
                      <p className="sub">Grouped by guest, but can also be paid together.</p>
                      <GuestBillRows billByGuest={billByGuest} />
                      <div className="bill-total"><span>Total</span><span>{money(tableTotal)}</span></div>
                      <button className="btn secondary full" onClick={closeTable}>Close Table Session</button>
                    </div>
                  </div>
                )}

                {managerTab === "menu" && (
                  <div className="manager-card">
                    <h3>Menu Manager</h3>
                    <p className="sub">Turn items on/off instantly. Changes are saved to this restaurant account.</p>
                    {menuBusy ? <p className="sub">Saving menu...</p> : null}
                    <div className="menu-edit-list">
                      {state.menu.map((item) => (
                        <div className="menu-edit-row with-photo" key={item.id}>
                          {item.imageThumbUrl ? (
                            <button className="menu-row-photo" type="button" onClick={() => setSelectedMenuImage(item)}>
                              <img src={item.imageThumbUrl} alt={item.name} />
                            </button>
                          ) : (
                            <div className="item-icon small-icon">{item.icon}</div>
                          )}

                          <div className="meta">
                            <strong>{item.name}</strong>
                            {item.nameAr ? <small className="arabic-item-name" dir="rtl">{item.nameAr}</small> : null}
                            <small>{item.categoryName || "Uncategorized"}</small>
                            <small>{item.desc}</small>
                          </div>

                          <strong>{money(item.price)}</strong>

                          <button className={`btn small ${item.available ? "success" : "danger"}`} onClick={() => toggleItem(item.id)} disabled={menuBusy}>
                            {item.available ? "Available" : "Unavailable"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {managerTab === "menuBuilder" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Menu Builder</h3>
                      <p className="sub">Add menu items with a photo. Items save to Supabase and stay after refresh/login.</p>
                      {menuBusy ? <p className="sub">Saving menu...</p> : null}

                      <div className="category-builder-card">
                        <h4>Menu Categories</h4>
                        <p>Add your own categories, then choose one when adding an item.</p>

                        <div className="menu-builder-row">
                          <Field label="Category name">
                            <input
                              value={categoryDraft.name}
                              onChange={(e) => setCategoryDraft({ ...categoryDraft, name: e.target.value })}
                              placeholder="Example: Salads"
                            />
                          </Field>

                          <Field label="Arabic category name">
                            <input
                              dir="rtl"
                              value={categoryDraft.nameAr}
                              onChange={(e) => setCategoryDraft({ ...categoryDraft, nameAr: e.target.value })}
                              placeholder="مثال: السلطات"
                            />
                          </Field>
                        </div>

                        <div className="row-actions">
                          <button className="btn secondary" type="button" onClick={addMenuCategoryFromBuilder} disabled={menuBusy}>
                            Add category
                          </button>
                        </div>

                        <div className="manager-category-list premium-category-list">
                          {state.categories.length ? state.categories.map((category, index) => {
                            const categoryItems = state.menu.filter((item) => item.categoryId === category.id);
                            const firstPhotoItem = categoryItems.find((item) => item.imageThumbUrl || item.imageFullUrl);
                            const previewImage = firstPhotoItem?.imageThumbUrl || firstPhotoItem?.imageFullUrl || "";
                            const selected = menuDraft.categoryId === category.id;

                            return (
                              <button
                                className={`manager-category-card ${selected ? "selected" : ""}`}
                                key={category.id}
                                type="button"
                                onClick={() => setMenuDraft({ ...menuDraft, categoryId: category.id })}
                              >
                                <div className="manager-category-photo">
                                  {previewImage ? (
                                    <img src={previewImage} alt={category.name} />
                                  ) : (
                                    <span>{String(index + 1).padStart(2, "0")}</span>
                                  )}
                                </div>

                                <div className="manager-category-copy">
                                  <strong>{category.name}</strong>
                                  {category.nameAr ? <em dir="rtl">{category.nameAr}</em> : <em>No Arabic name yet</em>}
                                  <small>{categoryItems.length} item{categoryItems.length === 1 ? "" : "s"}</small>
                                </div>

                                <b>{selected ? "Selected" : "Use"}</b>
                              </button>
                            );
                          }) : (
                            <div className="premium-empty-category">
                              <strong>No categories yet</strong>
                              <span>Add categories like Mashawi, Main Course, Drinks, or Desserts.</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="menu-builder-form">
                        {editingMenuItemId ? (
                          <div className="edit-banner">
                            Editing item. Change price, picture, stock, category, or daily serving hours, then save.
                          </div>
                        ) : null}
                        <div className="menu-builder-row">
                          <Field label="English item name">
                            <input
                              value={menuDraft.name}
                              onChange={(e) => setMenuDraft({ ...menuDraft, name: e.target.value })}
                              placeholder="Example: Chicken Caesar Salad"
                            />
                          </Field>

                          <Field label="Arabic item name">
                            <input
                              dir="rtl"
                              value={menuDraft.nameAr}
                              onChange={(e) => setMenuDraft({ ...menuDraft, nameAr: e.target.value })}
                              placeholder="مثال: سلطة سيزر دجاج"
                            />
                          </Field>
                        </div>

                        <Field label="Description">
                          <textarea
                            value={menuDraft.desc}
                            onChange={(e) => setMenuDraft({ ...menuDraft, desc: e.target.value })}
                            placeholder="Short description shown to the customer"
                          />
                        </Field>

                        <Field label="Category">
                          <select
                            value={menuDraft.categoryId}
                            onChange={(e) => setMenuDraft({ ...menuDraft, categoryId: e.target.value })}
                          >
                            <option value="">Uncategorized</option>
                            {state.categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}{category.nameAr ? ` / ${category.nameAr}` : ""}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <div className="menu-builder-row">
                          <Field label="Stock status">
                            <select
                              value={menuDraft.available ? "yes" : "no"}
                              onChange={(e) => setMenuDraft({ ...menuDraft, available: e.target.value === "yes" })}
                            >
                              <option value="yes">In stock</option>
                              <option value="no">Out of stock</option>
                            </select>
                          </Field>

                          <Field label="Available all day?">
                            <select
                              value={menuDraft.availableAllDay ? "yes" : "no"}
                              onChange={(e) => setMenuDraft({ ...menuDraft, availableAllDay: e.target.value === "yes" })}
                            >
                              <option value="yes">Yes</option>
                              <option value="no">No, only certain hours</option>
                            </select>
                          </Field>
                        </div>

                        {!menuDraft.availableAllDay ? (
                          <div className="menu-builder-row">
                            <Field label="Available from">
                              <input
                                type="time"
                                value={menuDraft.availableFrom}
                                onChange={(e) => setMenuDraft({ ...menuDraft, availableFrom: e.target.value })}
                              />
                            </Field>

                            <Field label="Available until">
                              <input
                                type="time"
                                value={menuDraft.availableTo}
                                onChange={(e) => setMenuDraft({ ...menuDraft, availableTo: e.target.value })}
                              />
                            </Field>
                          </div>
                        ) : null}

                        <div className="menu-builder-row">
                          <Field label="Price JOD">
                            <input
                              type="number"
                              min={0}
                              step="0.05"
                              value={menuDraft.price}
                              onChange={(e) => setMenuDraft({ ...menuDraft, price: e.target.value })}
                              placeholder="4.50"
                            />
                          </Field>

                          <Field label="Short code">
                            <input
                              value={menuDraft.icon}
                              onChange={(e) => setMenuDraft({ ...menuDraft, icon: e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 3) })}
                              placeholder="CS"
                              maxLength={3}
                            />
                          </Field>
                        </div>

                        <Field label="Item picture">
                          <div className="item-upload-card">
                            <div className="item-upload-preview">
                              {menuDraft.imageThumbUrl ? (
                                <button type="button" onClick={() => setSelectedMenuImage({
                                  id: "draft",
                                  name: menuDraft.name || "Preview item",
                                  nameAr: menuDraft.nameAr || "",
                                  desc: menuDraft.desc || "Preview",
                                  price: Number(menuDraft.price || 0),
                                  icon: menuDraft.icon || "IT",
                                  available: menuDraft.available,
                                  availableAllDay: menuDraft.availableAllDay,
                                  availableFrom: menuDraft.availableFrom,
                                  availableTo: menuDraft.availableTo,
                                  categoryId: menuDraft.categoryId,
                                  categoryName: state.categories.find((category) => category.id === menuDraft.categoryId)?.name || "Uncategorized",
                                  imageThumbUrl: menuDraft.imageThumbUrl,
                                  imageFullUrl: menuDraft.imageFullUrl,
                                })}>
                                  <img src={menuDraft.imageThumbUrl} alt="Compressed item thumbnail" />
                                </button>
                              ) : (
                                <span>Photo</span>
                              )}
                            </div>

                            <div>
                              <input
                                accept="image/*"
                                onChange={handleMenuImageUpload}
                                type="file"
                              />
                              <div className="helper">
                                {imageBusy
                                  ? "Compressing image..."
                                  : "Uploads save to Supabase Storage. The menu keeps only image URLs, not heavy browser data."}
                              </div>
                            </div>
                          </div>
                        </Field>

                        <div className="row-actions">
                          <button className="btn" type="button" onClick={editingMenuItemId ? saveEditedMenuItemFromBuilder : addMenuItemFromBuilder} disabled={imageBusy || menuBusy}>
                            {editingMenuItemId ? "Save changes" : "Add item"}
                          </button>
                          <button className="btn ghost" type="button" onClick={editingMenuItemId ? cancelEditingMenuItem : () => setMenuDraft(emptyMenuDraft)}>
                            {editingMenuItemId ? "Cancel edit" : "Clear"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>Current Menu Items</h3>
                      <p className="sub">Search items, then open each category tab to edit price, picture, stock, and serving hours.</p>

                      <div className="current-menu-toolbar">
                        <div className="current-menu-search">
                          <span>Search</span>
                          <input
                            value={menuBuilderSearch}
                            onChange={(e) => setMenuBuilderSearch(e.target.value)}
                            placeholder="Search by item, Arabic name, category, price..."
                          />
                        </div>

                        <div className="current-menu-actions">
                          <button className="btn ghost small" type="button" onClick={refreshMenuFromSupabase} disabled={menuBusy}>
                            Refresh
                          </button>
                          <button className="btn ghost small" type="button" onClick={expandAllMenuBuilderCategories}>
                            Expand all
                          </button>
                          <button className="btn ghost small" type="button" onClick={collapseAllMenuBuilderCategories}>
                            Collapse
                          </button>
                        </div>
                      </div>

                      <div className="category-accordion-list">
                        {menuBuilderGroups.length ? menuBuilderGroups.map((group) => {
                          const isExpanded = menuBuilderSearch.trim()
                            ? true
                            : expandedMenuCategories[group.id] === true;

                          return (
                            <div className="category-accordion" key={group.id}>
                              <button
                                className={`category-accordion-header ${isExpanded ? "expanded" : ""}`}
                                type="button"
                                onClick={() => toggleMenuBuilderCategory(group.id)}
                              >
                                <div>
                                  <strong>{group.name}</strong>
                                  {group.nameAr ? <span dir="rtl">{group.nameAr}</span> : null}
                                </div>

                                <div className="category-accordion-meta">
                                  <span>{group.items.length}{menuBuilderSearch.trim() ? ` match${group.items.length === 1 ? "" : "es"}` : ` item${group.items.length === 1 ? "" : "s"}`}</span>
                                  <b>{isExpanded ? "Hide" : "Open"}</b>
                                </div>
                              </button>

                              {isExpanded ? (
                                <div className="menu-builder-list">
                                  {group.items.map((item) => (
                                    <div className="menu-builder-item" key={item.id}>
                                      {item.imageThumbUrl ? (
                                        <button className="menu-builder-photo" type="button" onClick={() => setSelectedMenuImage(item)}>
                                          <img src={item.imageThumbUrl} alt={item.name} />
                                        </button>
                                      ) : (
                                        <div className="menu-builder-photo fallback">{item.icon}</div>
                                      )}

                                      <div className="menu-builder-main">
                                        <strong>{item.name}</strong>
                                        {item.nameAr ? <span className="arabic-item-name" dir="rtl">{item.nameAr}</span> : null}
                                        <span className="category-line">{item.categoryName || "Uncategorized"}</span>
                                        <span>{item.desc}</span>
                                        <span className="availability-line">{formatItemAvailability(item)}</span>
                                        <em>{money(item.price)}</em>
                                      </div>

                                      <div className="menu-builder-actions">
                                        <button className="btn small secondary" type="button" onClick={() => startEditingMenuItem(item)} disabled={menuBusy}>
                                          Edit
                                        </button>
                                        <button className={`btn small ${item.available ? "success" : "danger"}`} type="button" onClick={() => toggleItem(item.id)} disabled={menuBusy}>
                                          {item.available ? "In stock" : "Out"}
                                        </button>
                                        <button className="btn small danger" type="button" onClick={() => removeMenuItem(item.id)} disabled={menuBusy}>
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          );
                        }) : (
                          <div className="menu-empty-card">
                            <h4>No items found</h4>
                            <p>{menuBuilderSearch.trim() ? "Try a different search." : "Add items from the Menu Builder form."}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {managerTab === "qr" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Create a QR Code for a Table</h3>
                      <p className="sub">The restaurant prints its own QR codes. Each QR is tied to this business, this branch, and one table number.</p>

                      <div className="qr-create-row">
                        <Field label="Table number">
                          <input
                            type="number"
                            min={1}
                            max={999}
                            value={qrInput}
                            onChange={(e) => setQrInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && createQr()}
                          />
                        </Field>
                        <button className="btn" onClick={createQr}>Create QR</button>
                      </div>

                      <div className="qr-result-card">
                        <div className="real-qr-wrap prestigious-qr">
                          <img className="qr-base-image" src={selectedQrImage} alt={`QR code for table ${selectedQrTable}`} />
                          <div className="qr-logo-mark" aria-hidden="true">
                            {state.profile.logoDataUrl ? (
                              <img src={state.profile.logoDataUrl} alt="" />
                            ) : (
                              <span>{logoFallback}</span>
                            )}
                          </div>
                        </div>

                        <div className="bill-list">
                          <div className="bill-row"><span>Business</span><strong>{businessName}</strong></div>
                          <div className="bill-row"><span>Branch</span><strong>{branchName}</strong></div>
                          <div className="bill-row"><span>Table</span><strong>{selectedQrTable}</strong></div>
                        </div>

                        <div className="qr-url-box">{selectedQrUrl}</div>

                        <div className="row-actions">
                          <button className="btn secondary" onClick={printQrCard}>Print QR Card</button>
                          <button className="btn ghost" onClick={copyQrLink}>Copy Link</button>
                        </div>
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>How This Connects to Orders</h3>
                      <p className="sub">When a customer scans the table QR, Tawleh opens the correct menu and attaches orders to that table.</p>
                      <div className="bill-list">
                        <div className="bill-row"><span>Restaurant account</span><strong>Locked</strong></div>
                        <div className="bill-row"><span>Branch</span><strong>Locked</strong></div>
                        <div className="bill-row"><span>Table number</span><strong>Locked</strong></div>
                        <div className="bill-row"><span>Customer name required</span><strong>Yes</strong></div>
                        <div className="bill-row"><span>Kitchen receives</span><strong>Table + name</strong></div>
                      </div>
                      <Empty alignLeft text={"Example:\nCustomer scans Table QR -> enters their name -> orders an item.\n\nKitchen sees: table number, customer name, and item name."} />
                    </div>
                  </div>
                )}

                {managerTab === "profile" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Restaurant Profile</h3>
                      <p className="sub">This is what gets created during restaurant signup.</p>

                      <div className="profile-card">
                        <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} profile />
                        <div>
                          <h3>{businessName}</h3>
                          <p>{branchName}  {state.profile.location}</p>
                        </div>
                      </div>

                      <div className="restaurant-logo-upload-card">
                        <div>
                          <strong>Restaurant logo</strong>
                          <span>This logo appears on the dashboard, customer QR page, and printable QR cards.</span>
                        </div>
                        <label className="btn secondary small restaurant-logo-upload-button">
                          Upload logo
                          <input type="file" accept="image/*" onChange={handleRestaurantLogoUpload} />
                        </label>
                      </div>

                      <div className="bill-list">
                        <div className="bill-row"><span>Username</span><strong>@{state.profile.username}</strong></div>
                        <div className="bill-row"><span>Business email</span><strong>{state.profile.businessEmail}</strong></div>
                        <div className="bill-row"><span>Business phone</span><strong>{state.profile.businessPhone}</strong></div>
                        <div className="bill-row"><span>Locations</span><strong>{state.profile.locationCount}</strong></div>
                        {(state.profile.locations || [state.profile.location]).map((location, index) => (
                          <div className="bill-row" key={`profile-location-${index}`}>
                            <span>Location {index + 1}</span>
                            <strong>{location}</strong>
                          </div>
                        ))}
                        <div className="bill-row"><span>Signup IP lock</span><strong>{state.profile.signupIp}</strong></div>
                        <div className="bill-row"><span>Business type</span><strong>{state.profile.businessType}</strong></div>
                        <div className="bill-row"><span>Tables</span><strong>{state.profile.tableCount}</strong></div>
                        <div className="bill-row"><span>Pricing</span><strong>100 JOD/month</strong></div>
                        <div className="bill-row"><span>Trial</span><strong>30 days free</strong></div>
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>Menu Setup</h3>
                      <p className="sub">Add items, upload item pictures, and control what customers see on the QR menu.</p>
                      <button className="btn secondary full" onClick={openMenuBuilder}>Open Menu Builder</button>
                    </div>
                  </div>
                )}
              </div>
            </section>
            )}
          </section>

          <section className="print-sheet">
            <div className="print-page">
              <div className="print-page-frame">
                <div className="print-page-header">
                  <div className="print-page-eyebrow">TABLE ORDERING</div>
                  <div className="print-page-logo-card">
                    {state.profile.logoDataUrl ? (
                      <img className="print-page-logo" src={state.profile.logoDataUrl} alt={`${businessName} logo`} />
                    ) : (
                      <div className="print-page-logo-fallback" aria-hidden="true">{logoFallback}</div>
                    )}
                  </div>
                  <p>{branchName}</p>
                  <div className="print-table-badge">Table {selectedQrTable}</div>
                </div>

                <div className="print-hero-copy">
                  <h2>Scan to order</h2>
                  <p>
                    Have a seat, enter your name, browse the menu, send your order, call a waiter,
                    and view your bill directly from this table.
                  </p>
                </div>

                <div className="print-qr-showcase">
                  <div className="print-qr-wrap prestigious-qr">
                    <img className="print-qr qr-base-image" src={selectedQrImage} alt={`Printable QR for table ${selectedQrTable}`} />
                    <div className="qr-logo-mark print-qr-logo-mark" aria-hidden="true">
                      {state.profile.logoDataUrl ? (
                        <img src={state.profile.logoDataUrl} alt="" />
                      ) : (
                        <span>{logoFallback}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="print-steps-grid print-steps-readable">
                  <div className="print-step-card">
                    <strong>1</strong>
                    <div className="print-step-text">
                      <b>Scan</b>
                      <small>Open the menu</small>
                    </div>
                  </div>
                  <div className="print-step-card">
                    <strong>2</strong>
                    <div className="print-step-text">
                      <b>Enter name</b>
                      <small>Start your table</small>
                    </div>
                  </div>
                  <div className="print-step-card">
                    <strong>3</strong>
                    <div className="print-step-text">
                      <b>Order</b>
                      <small>Send to kitchen</small>
                    </div>
                  </div>
                </div>

                <div className="print-page-footer">
                  <span>No app download required</span>
                  <em>Powered by Tawleh Manager</em>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {publicCustomerMode && state.currentGuest && !orderReviewOpen && orderCartItemCount > 0 ? (
        <div className="fixed-send-order-bar">
          <div className="fixed-send-order-summary">
            <strong>{orderCartItemCount} item{orderCartItemCount === 1 ? "" : "s"}</strong>
            <span>{money(orderCartTotal)}</span>
          </div>
          <button className="fixed-send-order-button" type="button" onClick={beginOrderReview}>
            Send order
          </button>
        </div>
      ) : null}

      {selectedMenuImage?.imageFullUrl && (
        <div className="image-modal" onClick={() => setSelectedMenuImage(null)}>
          <div className="image-modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="image-modal-head">
              <div>
                <h3>{selectedMenuImage.name}</h3>
                {selectedMenuImage.nameAr ? <p className="arabic-item-name" dir="rtl">{selectedMenuImage.nameAr}</p> : null}
                <p>{selectedMenuImage.desc}</p>
              </div>
              <button className="btn ghost small" type="button" onClick={() => setSelectedMenuImage(null)}>Close</button>
            </div>
            <img src={selectedMenuImage.imageFullUrl} alt={selectedMenuImage.name} />
          </div>
        </div>
      )}

      <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>
    </main>
  );
}

function AuthFeature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="auth-feature">
      <div className="auth-feature-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </div>
  );
}

function UsernameStatus({
  value,
  longEnough,
}: {
  value: string;
  longEnough: boolean;
}) {
  if (!value) {
    return <div className="field-status">Letters, numbers, and underscores only.</div>;
  }

  if (!longEnough) {
    return <div className="field-status bad">Username must be at least 4 characters.</div>;
  }

  return <div className="field-status good">Username format looks good. Supabase checks if it is taken.</div>;
}

function LogoBox({
  logoDataUrl,
  fallback,
  large,
  customer,
  profile,
  print,
}: {
  logoDataUrl: string;
  fallback: string;
  large?: boolean;
  customer?: boolean;
  profile?: boolean;
  print?: boolean;
}) {
  const className = [
    "logo-box",
    large ? "large" : "",
    customer ? "customer-logo" : "",
    profile ? "profile-logo" : "",
    print ? "print-logo" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={className}>
      {logoDataUrl ? <img src={logoDataUrl} alt="Restaurant logo" /> : <span>{fallback}</span>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="form-row">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button className={`manager-tab ${active ? "active" : ""}`} onClick={onClick}>
      {label}
    </button>
  );
}

function Empty({ text, alignLeft }: { text: string; alignLeft?: boolean }) {
  return <div className={`empty ${alignLeft ? "left" : ""}`}>{text}</div>;
}

function BillRows({ orders }: { orders: Order[] }) {
  if (!orders.length) return <Empty text="No items under your name yet." />;

  return (
    <div className="bill-list">
      {orders.map((order) => (
        <div className="bill-row" key={order.id}>
          <span>{order.itemName} {Math.max(1, Number(order.quantity || 1)) > 1 ? `x${order.quantity}` : ""} <small> {order.status}</small></span>
          <strong>{money(orderLineTotal(order))}</strong>
        </div>
      ))}
    </div>
  );
}

function GuestBillRows({ billByGuest }: { billByGuest: Record<string, Order[]> }) {
  const entries = Object.entries(billByGuest);
  if (!entries.length) return <Empty text="No table bill yet." />;

  return (
    <div className="bill-list">
      {entries.map(([guest, orders]) => {
        const total = orders.reduce((sum, order) => sum + orderLineTotal(order), 0);
        return (
          <div className="bill-row" key={guest}>
            <span>{guest}  {orders.length} item{orders.length === 1 ? "" : "s"}</span>
            <strong>{money(total)}</strong>
          </div>
        );
      })}
    </div>
  );
}

function OrderRow({ order, onStatus }: { order: Order; onStatus: (id: string, status: Order["status"]) => void }) {
  return (
    <div className="order-row">
      <div>
        <h4>{order.itemName} {Math.max(1, Number(order.quantity || 1)) > 1 ? `x${order.quantity}` : ""} for {order.guest}</h4>
        <p>Table {order.table}  {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
      </div>

      <div>
        <div className="status-wrap">
          <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
        </div>

        <div className="row-actions">
          {order.status === "New" && (
            <button className="btn small secondary" onClick={() => onStatus(order.id, "Preparing")}>Preparing</button>
          )}
          {(order.status === "New" || order.status === "Preparing") && (
            <button className="btn small success" onClick={() => onStatus(order.id, "Ready")}>Ready</button>
          )}
          {order.status === "Ready" && (
            <button className="btn small ghost" onClick={() => onStatus(order.id, "Picked up")}>Picked up</button>
          )}
          {order.status === "Picked up" && (
            <button className="btn small ghost" onClick={() => onStatus(order.id, "Served")}>Served</button>
          )}
        </div>
      </div>
    </div>
  );
}