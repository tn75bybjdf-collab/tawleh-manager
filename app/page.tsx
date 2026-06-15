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



/* =========================================================
   CUSTOMER QR REMOVE NAME SUGGESTIONS
   New QR guests should only enter their own name.
   No previous/suggested guest name chips under the name field.
   ========================================================= */

main.customer-only-shell .guest-chips,
main.customer-only-shell .guest-chip {
  display: none !important;
}



/* =========================================================
   CUSTOMER NAME REQUIRED RED HIGHLIGHT
   If guest taps a category/order button before entering name,
   highlight the name bar red and focus the field.
   ========================================================= */

main.customer-only-shell .option-one-name-entry.name-entry-error {
  border: 2px solid rgba(220, 38, 38, 0.92) !important;
  background: rgba(255, 245, 245, 0.86) !important;
  box-shadow:
    0 0 0 4px rgba(220, 38, 38, 0.16),
    0 14px 34px rgba(168, 35, 35, 0.20) !important;
  animation: tawlehNameRequiredPulse 880ms ease-in-out 0s 2 !important;
}

main.customer-only-shell .option-one-name-entry.name-entry-error .option-one-input-icon {
  color: #dc2626 !important;
}

main.customer-only-shell .option-one-name-entry.name-entry-error input {
  color: #3f1d1d !important;
  font-weight: 950 !important;
}

main.customer-only-shell .option-one-name-entry.name-entry-error input::placeholder {
  color: #dc2626 !important;
  font-weight: 950 !important;
  opacity: 1 !important;
}

main.customer-only-shell .option-one-name-entry.name-entry-error .option-one-arrow-button {
  background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
  box-shadow: 0 12px 28px rgba(185, 28, 28, 0.28) !important;
}

main.customer-only-shell .name-entry-error-text {
  margin: 8px 10px 0 !important;
  color: #b91c1c !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  text-align: center !important;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.60) !important;
}

@keyframes tawlehNameRequiredPulse {
  0%, 100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-3px);
  }

  40% {
    transform: translateX(3px);
  }

  60% {
    transform: translateX(-2px);
  }

  80% {
    transform: translateX(2px);
  }
}



/* =========================================================
   MENU MODIFIERS / ADD-ONS / SPECIAL INSTRUCTIONS
   Dashboard creates option groups. Customer chooses add-ons and notes.
   ========================================================= */

.option-builder-card {
  margin: 16px 0 6px !important;
  padding: 16px !important;
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: rgba(255, 250, 243, 0.76) !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.06) !important;
}

.option-builder-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
  margin-bottom: 14px !important;
}

.option-builder-head h4 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-size: 20px !important;
}

.option-builder-head p,
.option-empty-helper {
  margin: 5px 0 0 !important;
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
}

.option-builder-stack {
  display: grid !important;
  gap: 14px !important;
}

.option-group-editor {
  padding: 14px !important;
  border-radius: 18px !important;
  background: rgba(255,255,255,0.78) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
}

.option-group-grid,
.option-choice-editor {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.option-group-grid.compact {
  margin-top: 10px !important;
}

.option-choice-editor-list {
  display: grid !important;
  gap: 8px !important;
  margin-top: 12px !important;
}

.option-choice-editor {
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr) 96px auto !important;
  align-items: center !important;
}

.option-actions {
  margin-top: 10px !important;
}

.modifier-summary {
  display: inline-flex !important;
  width: fit-content !important;
  margin-top: 4px !important;
  padding: 4px 8px !important;
  border-radius: 999px !important;
  background: rgba(207, 95, 59, 0.10) !important;
  color: #9a442f !important;
  font-size: 11px !important;
  font-weight: 900 !important;
}

.customer-only-shell .menu-item.has-customization {
  grid-template-columns: 76px minmax(0, 1fr) auto !important;
}

.customer-customize-panel {
  grid-column: 1 / -1 !important;
  display: grid !important;
  gap: 10px !important;
  margin-top: 2px !important;
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.56) !important;
  border: 1px solid rgba(255, 255, 255, 0.34) !important;
  backdrop-filter: blur(14px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(14px) saturate(1.08) !important;
}

.customer-option-groups {
  display: grid !important;
  gap: 11px !important;
}

.customer-option-group {
  display: grid !important;
  gap: 8px !important;
}

.customer-option-group-head {
  display: flex !important;
  justify-content: space-between !important;
  gap: 10px !important;
  align-items: center !important;
}

.customer-option-group-head strong {
  color: #2d211b !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
}

.customer-option-group-head span {
  color: #7b6354 !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-align: right !important;
}

.customer-option-choice-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 7px !important;
}

.customer-option-choice {
  min-height: 42px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 6px !important;
  border-radius: 13px !important;
  border: 1px solid rgba(136, 94, 62, 0.16) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  color: #3c2b24 !important;
  font-size: 11px !important;
  font-weight: 950 !important;
  padding: 8px !important;
}

.customer-option-choice.selected {
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.92), rgba(189, 83, 56, 0.92)) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.customer-option-choice b {
  font-size: 10px !important;
  white-space: nowrap !important;
}

.customer-special-instructions {
  display: grid !important;
  gap: 6px !important;
}

.customer-special-instructions span {
  color: #3b2a22 !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

.customer-special-instructions textarea {
  min-height: 70px !important;
  resize: vertical !important;
  border-radius: 14px !important;
  border: 1px solid rgba(136, 94, 62, 0.16) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  color: #2d211b !important;
  padding: 10px !important;
  font-size: 13px !important;
  outline: none !important;
}

.review-product-modifiers,
.review-product-instructions,
.order-modifiers,
.order-special-instructions {
  margin: 5px 0 0 !important;
  color: #6f5142 !important;
  font-size: 12px !important;
  line-height: 1.28 !important;
  font-weight: 850 !important;
}

.ticket-line em,
.bill-row em {
  display: block !important;
  margin-top: 3px !important;
  color: #7a6254 !important;
  font-size: 11px !important;
  line-height: 1.25 !important;
  font-style: normal !important;
}

@media (max-width: 720px) {
  .option-builder-head,
  .option-group-grid,
  .option-choice-editor {
    grid-template-columns: 1fr !important;
    display: grid !important;
  }

  .option-choice-editor {
    grid-template-columns: 1fr !important;
  }

  .customer-option-choice-grid {
    grid-template-columns: 1fr !important;
  }
}



/* =========================================================
   MENU OPTION NESTED ADD-ONS FIX
   - Empty option name fields no longer disappear while editing.
   - Choices can have sub-options, e.g. Mashed Potato -> Gravy Type.
   ========================================================= */

.option-choice-with-nesting {
  display: grid !important;
  gap: 10px !important;
}

.option-choice-editor {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 100px auto auto !important;
}

.nested-option-builder {
  margin: -2px 0 10px 16px !important;
  padding: 12px !important;
  border-left: 3px solid rgba(203, 94, 61, 0.32) !important;
  border-radius: 18px !important;
  background: rgba(255, 248, 239, 0.78) !important;
  box-shadow: inset 0 0 0 1px rgba(151, 114, 77, 0.10) !important;
}

.nested-option-title {
  margin: 0 0 10px !important;
  color: #8a553c !important;
  font-size: 12px !important;
  font-weight: 950 !important;
}

.nested-option-group-editor {
  display: grid !important;
  gap: 10px !important;
  padding: 10px !important;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(151, 114, 77, 0.14) !important;
}

.nested-choice-list {
  gap: 8px !important;
}

.nested-choice-list .option-choice-editor {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 100px auto !important;
}

.nested-actions {
  justify-content: flex-start !important;
}

.customer-option-choice-wrap {
  display: grid !important;
  gap: 8px !important;
}

.customer-nested-option-groups {
  margin: -2px 0 6px 12px !important;
  padding: 10px !important;
  border-left: 3px solid rgba(203, 94, 61, 0.32) !important;
  border-radius: 16px !important;
  background: rgba(255, 248, 239, 0.66) !important;
}

.customer-option-group.nested {
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

.customer-option-choice.nested-choice {
  background: rgba(255,255,255,0.74) !important;
}

@media (max-width: 820px) {
  .option-choice-editor,
  .nested-choice-list .option-choice-editor {
    grid-template-columns: 1fr !important;
  }

  .nested-option-builder {
    margin-left: 6px !important;
  }
}



/* =========================================================
   PREMIUM CUSTOMER CHECKOUT SCREEN
   Replaces the rough order review with a clean checkout-style screen.
   ========================================================= */

main.customer-only-shell .phone-content:has(.tawleh-checkout-page) {
  padding: 8px 10px 18px !important;
}

main.customer-only-shell .tawleh-checkout-page {
  display: grid !important;
  gap: 12px !important;
  padding: 4px 0 18px !important;
}

main.customer-only-shell .checkout-top-card,
main.customer-only-shell .checkout-item-card,
main.customer-only-shell .checkout-summary-card {
  background: rgba(255, 255, 255, 0.68) !important;
  border: 1px solid rgba(255, 255, 255, 0.42) !important;
  box-shadow: 0 18px 42px rgba(38, 25, 17, 0.16) !important;
  backdrop-filter: blur(16px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(16px) saturate(1.08) !important;
}

main.customer-only-shell .checkout-top-card {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 28px !important;
  padding: 13px !important;
}

main.customer-only-shell .checkout-top-card::before {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background:
    radial-gradient(circle at 12% 0%, rgba(211, 109, 71, 0.22), transparent 36%),
    linear-gradient(135deg, rgba(255, 252, 247, 0.74), rgba(255, 244, 230, 0.38)) !important;
  pointer-events: none !important;
}

main.customer-only-shell .checkout-top-card > * {
  position: relative !important;
  z-index: 1 !important;
}

main.customer-only-shell .checkout-top-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 10px !important;
  margin-bottom: 13px !important;
}

main.customer-only-shell .checkout-back-button,
main.customer-only-shell .checkout-table-pill {
  height: 34px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 999px !important;
  padding: 0 12px !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-back-button {
  border: 1px solid rgba(189, 83, 56, 0.16) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  color: #9f422d !important;
}

main.customer-only-shell .checkout-table-pill {
  background: rgba(48, 33, 26, 0.86) !important;
  color: #fff !important;
  box-shadow: 0 10px 22px rgba(48, 33, 26, 0.18) !important;
}

main.customer-only-shell .checkout-brand-row {
  display: grid !important;
  grid-template-columns: 66px minmax(0, 1fr) !important;
  gap: 12px !important;
  align-items: center !important;
}

main.customer-only-shell .checkout-restaurant-mark {
  width: 66px !important;
  height: 66px !important;
  display: grid !important;
  place-items: center !important;
  overflow: hidden !important;
  border-radius: 23px !important;
  background: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(255, 255, 255, 0.52) !important;
  box-shadow: 0 12px 26px rgba(38, 25, 17, 0.12) !important;
}

main.customer-only-shell .checkout-restaurant-mark img {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  padding: 7px !important;
}

main.customer-only-shell .checkout-restaurant-mark span {
  color: #bd5338 !important;
  font-size: 20px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-title-copy p {
  margin: 0 0 3px !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.13em !important;
}

main.customer-only-shell .checkout-title-copy h4 {
  margin: 0 !important;
  color: #2d211b !important;
  font-size: 31px !important;
  line-height: 0.98 !important;
  letter-spacing: -0.055em !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-title-copy span {
  display: block !important;
  margin-top: 5px !important;
  color: #6e584a !important;
  font-size: 13px !important;
  font-weight: 900 !important;
}

main.customer-only-shell .checkout-metrics {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 9px !important;
  margin-top: 13px !important;
}

main.customer-only-shell .checkout-metrics div {
  min-height: 62px !important;
  padding: 10px !important;
  border-radius: 19px !important;
  background: rgba(255, 255, 255, 0.58) !important;
  border: 1px solid rgba(255, 255, 255, 0.40) !important;
}

main.customer-only-shell .checkout-metrics span {
  display: block !important;
  color: #7b6354 !important;
  font-size: 11px !important;
  font-weight: 900 !important;
}

main.customer-only-shell .checkout-metrics strong {
  display: block !important;
  margin-top: 4px !important;
  color: #2d211b !important;
  font-size: 21px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-section-title {
  display: flex !important;
  justify-content: space-between !important;
  padding: 2px 3px 0 !important;
}

main.customer-only-shell .checkout-section-title span {
  display: block !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.13em !important;
}

main.customer-only-shell .checkout-section-title strong {
  display: block !important;
  margin-top: 2px !important;
  color: #2d211b !important;
  font-size: 18px !important;
  font-weight: 1000 !important;
  letter-spacing: -0.03em !important;
}

main.customer-only-shell .checkout-items-list {
  display: grid !important;
  gap: 10px !important;
}

main.customer-only-shell .checkout-item-card {
  display: grid !important;
  grid-template-columns: 72px minmax(0, 1fr) !important;
  gap: 11px !important;
  align-items: start !important;
  border-radius: 24px !important;
  padding: 10px !important;
}

main.customer-only-shell .checkout-item-photo {
  width: 72px !important;
  height: 72px !important;
  display: grid !important;
  place-items: center !important;
  overflow: hidden !important;
  border-radius: 18px !important;
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.12), rgba(151, 114, 77, 0.10)), #fff7ef !important;
  color: #bd5338 !important;
  font-size: 20px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-item-photo img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
}

main.customer-only-shell .checkout-item-main {
  min-width: 0 !important;
  display: grid !important;
  gap: 7px !important;
}

main.customer-only-shell .checkout-item-title-row {
  display: flex !important;
  justify-content: space-between !important;
  gap: 10px !important;
  align-items: flex-start !important;
}

main.customer-only-shell .checkout-item-title-row strong {
  display: block !important;
  color: #2d211b !important;
  font-size: 15px !important;
  line-height: 1.1 !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-item-title-row span {
  display: block !important;
  margin-top: 2px !important;
  color: #7b6354 !important;
  font-size: 12px !important;
  font-weight: 850 !important;
}

main.customer-only-shell .checkout-item-title-row b {
  flex: 0 0 auto !important;
  color: #bd5338 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
  white-space: nowrap !important;
}

main.customer-only-shell .checkout-item-subline {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
}

main.customer-only-shell .checkout-item-subline span {
  display: inline-flex !important;
  align-items: center !important;
  width: fit-content !important;
  min-height: 24px !important;
  padding: 4px 8px !important;
  border-radius: 999px !important;
  background: rgba(189, 83, 56, 0.08) !important;
  color: #805b49 !important;
  font-size: 10.5px !important;
  font-weight: 950 !important;
}

main.customer-only-shell .checkout-detail-box {
  display: grid !important;
  gap: 3px !important;
  padding: 8px 9px !important;
  border-radius: 16px !important;
  background: rgba(255, 250, 243, 0.72) !important;
  border: 1px dashed rgba(189, 83, 56, 0.20) !important;
}

main.customer-only-shell .checkout-detail-box small {
  color: #bd5338 !important;
  font-size: 10px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

main.customer-only-shell .checkout-detail-box p {
  margin: 0 !important;
  color: #3b2a23 !important;
  font-size: 11.5px !important;
  line-height: 1.35 !important;
  font-weight: 850 !important;
}

main.customer-only-shell .checkout-detail-box.note {
  background: rgba(255, 255, 255, 0.76) !important;
}

main.customer-only-shell .checkout-item-actions {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 8px !important;
  margin-top: 2px !important;
}

main.customer-only-shell .checkout-qty-control {
  display: grid !important;
  grid-template-columns: 30px 30px 30px !important;
  align-items: center !important;
  justify-items: center !important;
  height: 38px !important;
  border-radius: 999px !important;
  padding: 4px !important;
  background: rgba(255, 255, 255, 0.74) !important;
  border: 1px solid rgba(189, 83, 56, 0.15) !important;
}

main.customer-only-shell .checkout-qty-control button {
  width: 29px !important;
  height: 29px !important;
  border: 0 !important;
  border-radius: 50% !important;
  display: grid !important;
  place-items: center !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 18px !important;
  font-weight: 1000 !important;
  line-height: 1 !important;
}

main.customer-only-shell .checkout-qty-control button:first-child {
  background: #fff !important;
  color: #bd5338 !important;
  border: 1px solid rgba(189, 83, 56, 0.18) !important;
}

main.customer-only-shell .checkout-qty-control strong {
  color: #2d211b !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-remove-button {
  min-height: 34px !important;
  border: 0 !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: rgba(255, 255, 255, 0.66) !important;
  color: #a33a2b !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-summary-card {
  position: sticky !important;
  bottom: 10px !important;
  z-index: 50 !important;
  display: grid !important;
  gap: 10px !important;
  border-radius: 27px !important;
  padding: 13px !important;
  background: rgba(45, 33, 27, 0.88) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  box-shadow: 0 20px 52px rgba(30, 20, 14, 0.34) !important;
}

main.customer-only-shell .checkout-summary-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
}

main.customer-only-shell .checkout-summary-head span {
  display: block !important;
  color: #f4c99f !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

main.customer-only-shell .checkout-summary-head strong {
  display: block !important;
  margin-top: 2px !important;
  color: #fff !important;
  font-size: 28px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .checkout-summary-head em {
  padding: 7px 9px !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.10) !important;
  color: #fff8f0 !important;
  font-style: normal !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

main.customer-only-shell .checkout-summary-lines {
  display: grid !important;
  gap: 6px !important;
  padding: 9px 0 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.10) !important;
}

main.customer-only-shell .checkout-summary-lines div {
  display: flex !important;
  justify-content: space-between !important;
  gap: 10px !important;
  color: rgba(255, 255, 255, 0.82) !important;
  font-size: 12px !important;
  font-weight: 900 !important;
}

main.customer-only-shell .checkout-kitchen-note {
  margin: 0 !important;
  color: rgba(255, 248, 240, 0.72) !important;
  font-size: 11.5px !important;
  line-height: 1.35 !important;
  font-weight: 800 !important;
}

main.customer-only-shell .checkout-error {
  border-radius: 14px !important;
  background: rgba(255, 230, 230, 0.12) !important;
  color: #ffd2d2 !important;
  border: 1px solid rgba(255, 180, 180, 0.22) !important;
}

main.customer-only-shell .checkout-confirm-button {
  min-height: 54px !important;
  width: 100% !important;
  border: 0 !important;
  border-radius: 19px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 16px !important;
  font-weight: 1000 !important;
  box-shadow: 0 15px 30px rgba(203, 94, 61, 0.32) !important;
}

main.customer-only-shell .checkout-confirm-button:disabled {
  opacity: 0.62 !important;
}

@media (max-width: 390px) {
  main.customer-only-shell .checkout-title-copy h4 {
    font-size: 28px !important;
  }

  main.customer-only-shell .checkout-item-card {
    grid-template-columns: 64px minmax(0, 1fr) !important;
    gap: 9px !important;
  }

  main.customer-only-shell .checkout-item-photo {
    width: 64px !important;
    height: 64px !important;
    border-radius: 16px !important;
  }

  main.customer-only-shell .checkout-summary-head strong {
    font-size: 25px !important;
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



/* =========================================================
   MENU MODIFIERS / ADD-ONS / SPECIAL INSTRUCTIONS
   Dashboard creates option groups. Customer chooses add-ons and notes.
   ========================================================= */

.option-builder-card {
  margin: 16px 0 6px !important;
  padding: 16px !important;
  border-radius: 22px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: rgba(255, 250, 243, 0.76) !important;
  box-shadow: 0 12px 28px rgba(74, 45, 19, 0.06) !important;
}

.option-builder-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
  margin-bottom: 14px !important;
}

.option-builder-head h4 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-size: 20px !important;
}

.option-builder-head p,
.option-empty-helper {
  margin: 5px 0 0 !important;
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
}

.option-builder-stack {
  display: grid !important;
  gap: 14px !important;
}

.option-group-editor {
  padding: 14px !important;
  border-radius: 18px !important;
  background: rgba(255,255,255,0.78) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
}

.option-group-grid,
.option-choice-editor {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.option-group-grid.compact {
  margin-top: 10px !important;
}

.option-choice-editor-list {
  display: grid !important;
  gap: 8px !important;
  margin-top: 12px !important;
}

.option-choice-editor {
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr) 96px auto !important;
  align-items: center !important;
}

.option-actions {
  margin-top: 10px !important;
}

.modifier-summary {
  display: inline-flex !important;
  width: fit-content !important;
  margin-top: 4px !important;
  padding: 4px 8px !important;
  border-radius: 999px !important;
  background: rgba(207, 95, 59, 0.10) !important;
  color: #9a442f !important;
  font-size: 11px !important;
  font-weight: 900 !important;
}

.customer-only-shell .menu-item.has-customization {
  grid-template-columns: 76px minmax(0, 1fr) auto !important;
}

.customer-customize-panel {
  grid-column: 1 / -1 !important;
  display: grid !important;
  gap: 10px !important;
  margin-top: 2px !important;
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.56) !important;
  border: 1px solid rgba(255, 255, 255, 0.34) !important;
  backdrop-filter: blur(14px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(14px) saturate(1.08) !important;
}

.customer-option-groups {
  display: grid !important;
  gap: 11px !important;
}

.customer-option-group {
  display: grid !important;
  gap: 8px !important;
}

.customer-option-group-head {
  display: flex !important;
  justify-content: space-between !important;
  gap: 10px !important;
  align-items: center !important;
}

.customer-option-group-head strong {
  color: #2d211b !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
}

.customer-option-group-head span {
  color: #7b6354 !important;
  font-size: 10px !important;
  font-weight: 900 !important;
  text-align: right !important;
}

.customer-option-choice-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 7px !important;
}

.customer-option-choice {
  min-height: 42px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 6px !important;
  border-radius: 13px !important;
  border: 1px solid rgba(136, 94, 62, 0.16) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  color: #3c2b24 !important;
  font-size: 11px !important;
  font-weight: 950 !important;
  padding: 8px !important;
}

.customer-option-choice.selected {
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.92), rgba(189, 83, 56, 0.92)) !important;
  color: #fff !important;
  border-color: transparent !important;
}

.customer-option-choice b {
  font-size: 10px !important;
  white-space: nowrap !important;
}

.customer-special-instructions {
  display: grid !important;
  gap: 6px !important;
}

.customer-special-instructions span {
  color: #3b2a22 !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

.customer-special-instructions textarea {
  min-height: 70px !important;
  resize: vertical !important;
  border-radius: 14px !important;
  border: 1px solid rgba(136, 94, 62, 0.16) !important;
  background: rgba(255, 255, 255, 0.72) !important;
  color: #2d211b !important;
  padding: 10px !important;
  font-size: 13px !important;
  outline: none !important;
}

.review-product-modifiers,
.review-product-instructions,
.order-modifiers,
.order-special-instructions {
  margin: 5px 0 0 !important;
  color: #6f5142 !important;
  font-size: 12px !important;
  line-height: 1.28 !important;
  font-weight: 850 !important;
}

.ticket-line em,
.bill-row em {
  display: block !important;
  margin-top: 3px !important;
  color: #7a6254 !important;
  font-size: 11px !important;
  line-height: 1.25 !important;
  font-style: normal !important;
}

@media (max-width: 720px) {
  .option-builder-head,
  .option-group-grid,
  .option-choice-editor {
    grid-template-columns: 1fr !important;
    display: grid !important;
  }

  .option-choice-editor {
    grid-template-columns: 1fr !important;
  }

  .customer-option-choice-grid {
    grid-template-columns: 1fr !important;
  }
}



/* =========================================================
   MENU OPTION NESTED ADD-ONS FIX
   - Empty option name fields no longer disappear while editing.
   - Choices can have sub-options, e.g. Mashed Potato -> Gravy Type.
   ========================================================= */

.option-choice-with-nesting {
  display: grid !important;
  gap: 10px !important;
}

.option-choice-editor {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 100px auto auto !important;
}

.nested-option-builder {
  margin: -2px 0 10px 16px !important;
  padding: 12px !important;
  border-left: 3px solid rgba(203, 94, 61, 0.32) !important;
  border-radius: 18px !important;
  background: rgba(255, 248, 239, 0.78) !important;
  box-shadow: inset 0 0 0 1px rgba(151, 114, 77, 0.10) !important;
}

.nested-option-title {
  margin: 0 0 10px !important;
  color: #8a553c !important;
  font-size: 12px !important;
  font-weight: 950 !important;
}

.nested-option-group-editor {
  display: grid !important;
  gap: 10px !important;
  padding: 10px !important;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.72) !important;
  border: 1px solid rgba(151, 114, 77, 0.14) !important;
}

.nested-choice-list {
  gap: 8px !important;
}

.nested-choice-list .option-choice-editor {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 100px auto !important;
}

.nested-actions {
  justify-content: flex-start !important;
}

.customer-option-choice-wrap {
  display: grid !important;
  gap: 8px !important;
}

.customer-nested-option-groups {
  margin: -2px 0 6px 12px !important;
  padding: 10px !important;
  border-left: 3px solid rgba(203, 94, 61, 0.32) !important;
  border-radius: 16px !important;
  background: rgba(255, 248, 239, 0.66) !important;
}

.customer-option-group.nested {
  padding: 0 !important;
  border: 0 !important;
  background: transparent !important;
}

.customer-option-choice.nested-choice {
  background: rgba(255,255,255,0.74) !important;
}

@media (max-width: 820px) {
  .option-choice-editor,
  .nested-choice-list .option-choice-editor {
    grid-template-columns: 1fr !important;
  }

  .nested-option-builder {
    margin-left: 6px !important;
  }
}



/* =========================================================
   REUSABLE MODIFIER MEMORY
   Dashboard remembers option groups/choices already saved on other items.
   The browser dropdown appears while typing in option/add-on fields.
   ========================================================= */

.option-builder-card input[list] {
  background-image: linear-gradient(45deg, transparent 50%, rgba(91, 71, 48, 0.42) 50%), linear-gradient(135deg, rgba(91, 71, 48, 0.42) 50%, transparent 50%) !important;
  background-position: calc(100% - 16px) 50%, calc(100% - 11px) 50% !important;
  background-size: 5px 5px, 5px 5px !important;
  background-repeat: no-repeat !important;
  padding-right: 30px !important;
}

.option-builder-card input[list][dir="rtl"] {
  background-position: 16px 50%, 11px 50% !important;
  padding-left: 30px !important;
  padding-right: 12px !important;
}

.option-builder-head p::after {
  content: " Reuse memory: saved groups and choices autocomplete here." !important;
  display: block !important;
  width: fit-content !important;
  margin-top: 7px !important;
  padding: 5px 8px !important;
  border-radius: 999px !important;
  background: rgba(207, 95, 59, 0.10) !important;
  color: #9a442f !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}



/* =========================================================
   MENU BUILDER EDIT AUTO-SCROLL RESTORE
   Clicking Edit item scrolls back to the editing form at the top.
   ========================================================= */

.menu-builder-form {
  scroll-margin-top: 24px !important;
}

.menu-builder-form .edit-banner {
  animation: tawlehEditBannerPulse 900ms ease-in-out 0s 2 !important;
}

@keyframes tawlehEditBannerPulse {
  0%, 100% {
    box-shadow: 0 0 0 rgba(207, 95, 59, 0);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(207, 95, 59, 0.16);
  }
}



/* =========================================================
   TABLE RESET DASHBOARD
   Reset table clears seated guests, waiter requests, orders, and bill total.
   ========================================================= */

.resettable-table-map {
  gap: 12px !important;
}

.resettable-table-card {
  display: grid !important;
  gap: 10px !important;
  padding: 12px !important;
}

.resettable-table-card.selected-table-card {
  outline: 2px solid rgba(189, 83, 56, 0.42) !important;
  box-shadow: 0 16px 36px rgba(189, 83, 56, 0.13) !important;
}

.resettable-table-card .table-card-main {
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
  border: 0 !important;
  background: transparent !important;
  padding: 0 !important;
  text-align: left !important;
  cursor: pointer !important;
}

.resettable-table-card .table-card-main h4 {
  margin: 0 !important;
}

.resettable-table-card .table-card-main p {
  margin: 5px 0 0 !important;
  line-height: 1.35 !important;
}

.table-reset-button {
  min-height: 38px !important;
  width: 100% !important;
  border: 0 !important;
  border-radius: 14px !important;
  background: rgba(189, 83, 56, 0.10) !important;
  color: #a33a2b !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.table-reset-button:not(:disabled):hover {
  background: rgba(189, 83, 56, 0.18) !important;
}

.table-reset-button:disabled {
  opacity: 0.46 !important;
  cursor: not-allowed !important;
}

.table-reset-summary {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 8px !important;
  margin: 12px 0 !important;
}

.table-reset-summary span {
  display: grid !important;
  min-height: 38px !important;
  place-items: center !important;
  border-radius: 14px !important;
  background: rgba(189, 83, 56, 0.08) !important;
  color: #6c4c3f !important;
  font-size: 12px !important;
  font-weight: 950 !important;
}



/* =========================================================
   ACTIVE TABLE SORT TOOLBAR
   Lets dashboard sort tables by active/open/needs-help/highest-bill.
   ========================================================= */

.table-sort-toolbar {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
  margin: 14px 0 12px !important;
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 250, 243, 0.78) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.table-sort-toolbar > div {
  display: grid !important;
  gap: 2px !important;
}

.table-sort-toolbar span,
.table-sort-toolbar label {
  color: #7c6c5f !important;
  font-size: 11px !important;
  font-weight: 950 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.table-sort-toolbar strong {
  color: #2f2a25 !important;
  font-size: 22px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
}

.table-sort-toolbar label {
  display: grid !important;
  gap: 6px !important;
  min-width: 180px !important;
}

.table-sort-toolbar select {
  width: 100% !important;
  min-height: 39px !important;
  border-radius: 13px !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  background: rgba(255, 255, 255, 0.88) !important;
  color: #2f2a25 !important;
  font-size: 13px !important;
  font-weight: 900 !important;
  padding: 0 10px !important;
}

@media (max-width: 720px) {
  .table-sort-toolbar {
    align-items: stretch !important;
    flex-direction: column !important;
  }

  .table-sort-toolbar label {
    min-width: 0 !important;
  }
}



/* =========================================================
   CLEAN ORGANIZED LOGIN / SIGNUP PAGE
   Restores a proper landing/auth layout for creating another restaurant.
   ========================================================= */

.app-shell:not(.customer-only-shell) .auth-page {
  min-height: calc(100vh - 48px) !important;
  width: 100% !important;
  display: grid !important;
  grid-template-rows: auto 1fr auto !important;
  gap: 18px !important;
  padding: 8px 0 18px !important;
}

.app-shell:not(.customer-only-shell) .auth-logo-wrap {
  width: min(1180px, 100%) !important;
  margin: 0 auto !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.app-shell:not(.customer-only-shell) .main-auth-logo {
  width: 96px !important;
  height: 96px !important;
  object-fit: contain !important;
  padding: 12px !important;
  border-radius: 28px !important;
  background: rgba(255, 253, 248, 0.88) !important;
  border: 1px solid rgba(97, 72, 48, 0.12) !important;
  box-shadow: 0 18px 44px rgba(80, 52, 27, 0.12) !important;
  backdrop-filter: blur(18px) !important;
  -webkit-backdrop-filter: blur(18px) !important;
}

.app-shell:not(.customer-only-shell) .auth-layout {
  width: min(1180px, 100%) !important;
  margin: 0 auto !important;
  display: grid !important;
  grid-template-columns: minmax(320px, 0.82fr) minmax(420px, 1.18fr) !important;
  gap: 24px !important;
  align-items: start !important;
}

.app-shell:not(.customer-only-shell) .auth-info,
.app-shell:not(.customer-only-shell) .auth-card {
  border-radius: 34px !important;
  border: 1px solid rgba(97, 72, 48, 0.12) !important;
  background: rgba(255, 253, 248, 0.86) !important;
  box-shadow: 0 24px 60px rgba(80, 52, 27, 0.12) !important;
  backdrop-filter: blur(22px) !important;
  -webkit-backdrop-filter: blur(22px) !important;
}

.app-shell:not(.customer-only-shell) .auth-info {
  position: sticky !important;
  top: 24px !important;
  overflow: hidden !important;
  min-height: 660px !important;
  padding: 32px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  gap: 24px !important;
  background:
    radial-gradient(circle at 10% 0%, rgba(207, 95, 59, 0.16), transparent 34%),
    radial-gradient(circle at 100% 80%, rgba(104, 112, 68, 0.14), transparent 38%),
    rgba(255, 253, 248, 0.88) !important;
}

.app-shell:not(.customer-only-shell) .auth-info h1 {
  max-width: 420px !important;
  margin: 0 !important;
  color: #2f2a25 !important;
  font-size: clamp(36px, 4.2vw, 58px) !important;
  line-height: 0.95 !important;
  letter-spacing: -0.07em !important;
  font-weight: 1000 !important;
}

.app-shell:not(.customer-only-shell) .auth-info p {
  max-width: 460px !important;
  margin: 16px 0 0 !important;
  color: #74685d !important;
  font-size: 15px !important;
  line-height: 1.58 !important;
  font-weight: 800 !important;
}

.app-shell:not(.customer-only-shell) .auth-feature-list {
  display: grid !important;
  gap: 12px !important;
  margin: 8px 0 !important;
}

.app-shell:not(.customer-only-shell) .auth-feature {
  display: grid !important;
  grid-template-columns: 46px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 12px !important;
  min-height: 72px !important;
  padding: 12px !important;
  border-radius: 22px !important;
  background: rgba(255, 255, 255, 0.66) !important;
  border: 1px solid rgba(97, 72, 48, 0.10) !important;
}

.app-shell:not(.customer-only-shell) .auth-feature-icon {
  width: 46px !important;
  height: 46px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  letter-spacing: -0.04em !important;
}

.app-shell:not(.customer-only-shell) .auth-feature strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

.app-shell:not(.customer-only-shell) .auth-feature span {
  display: block !important;
  margin-top: 3px !important;
  color: #7a6b5e !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 800 !important;
}

.app-shell:not(.customer-only-shell) .price-card {
  display: grid !important;
  grid-template-columns: 54px minmax(0, 1fr) !important;
  gap: 12px !important;
  align-items: center !important;
  padding: 15px !important;
  border-radius: 24px !important;
  background: #2f2a25 !important;
  color: #fff !important;
  box-shadow: 0 18px 42px rgba(47, 42, 37, 0.20) !important;
}

.app-shell:not(.customer-only-shell) .price-icon {
  width: 54px !important;
  height: 54px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.12) !important;
  color: #f7d3a6 !important;
  font-weight: 1000 !important;
}

.app-shell:not(.customer-only-shell) .price-card strong {
  display: block !important;
  color: #fff !important;
  font-size: 16px !important;
  font-weight: 1000 !important;
}

.app-shell:not(.customer-only-shell) .price-card span {
  display: block !important;
  margin-top: 4px !important;
  color: rgba(255, 255, 255, 0.74) !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 850 !important;
}

.app-shell:not(.customer-only-shell) .auth-card {
  overflow: hidden !important;
  padding: 0 !important;
}

.app-shell:not(.customer-only-shell) .auth-tabs {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: 8px !important;
  padding: 12px !important;
  background: rgba(255, 247, 239, 0.78) !important;
  border-bottom: 1px solid rgba(97, 72, 48, 0.10) !important;
}

.app-shell:not(.customer-only-shell) .auth-tab {
  min-height: 52px !important;
  border: 0 !important;
  border-radius: 18px !important;
  background: transparent !important;
  color: #6f6155 !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.app-shell:not(.customer-only-shell) .auth-tab.active {
  background: #fff !important;
  color: #bd5338 !important;
  box-shadow: 0 12px 28px rgba(80, 52, 27, 0.10) !important;
}

.app-shell:not(.customer-only-shell) .auth-panels {
  padding: 26px !important;
}

.app-shell:not(.customer-only-shell) .login-panel,
.app-shell:not(.customer-only-shell) .signup-panel {
  display: grid !important;
  gap: 18px !important;
}

.app-shell:not(.customer-only-shell) .auth-heading {
  margin-bottom: 2px !important;
}

.app-shell:not(.customer-only-shell) .auth-heading h2 {
  margin: 0 !important;
  color: #2f2a25 !important;
  font-size: 32px !important;
  line-height: 1 !important;
  letter-spacing: -0.055em !important;
  font-weight: 1000 !important;
}

.app-shell:not(.customer-only-shell) .auth-heading p {
  margin: 8px 0 0 !important;
  color: #817466 !important;
  font-size: 14px !important;
  line-height: 1.45 !important;
  font-weight: 850 !important;
}

.app-shell:not(.customer-only-shell) .signup-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 14px !important;
  align-items: start !important;
}

.app-shell:not(.customer-only-shell) .auth-page .form-row {
  min-width: 0 !important;
  display: grid !important;
  gap: 7px !important;
  margin: 0 !important;
}

.app-shell:not(.customer-only-shell) .auth-page .form-row > span {
  color: #4e4339 !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.07em !important;
}

.app-shell:not(.customer-only-shell) .auth-page input,
.app-shell:not(.customer-only-shell) .auth-page select,
.app-shell:not(.customer-only-shell) .auth-page textarea {
  width: 100% !important;
  min-height: 50px !important;
  box-sizing: border-box !important;
  border: 1px solid rgba(97, 72, 48, 0.14) !important;
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.92) !important;
  color: #2f2a25 !important;
  font-size: 15px !important;
  font-weight: 850 !important;
  outline: none !important;
  padding: 0 14px !important;
  box-shadow: 0 8px 18px rgba(80, 52, 27, 0.035) !important;
}

.app-shell:not(.customer-only-shell) .auth-page textarea {
  min-height: 96px !important;
  padding: 13px 14px !important;
  resize: vertical !important;
}

.app-shell:not(.customer-only-shell) .auth-page input:focus,
.app-shell:not(.customer-only-shell) .auth-page select:focus,
.app-shell:not(.customer-only-shell) .auth-page textarea:focus {
  border-color: rgba(207, 95, 59, 0.48) !important;
  box-shadow: 0 0 0 4px rgba(207, 95, 59, 0.12) !important;
}

.app-shell:not(.customer-only-shell) .auth-page input[type="color"] {
  height: 50px !important;
  padding: 6px !important;
}

.app-shell:not(.customer-only-shell) .signup-grid .form-row:nth-child(11),
.app-shell:not(.customer-only-shell) .signup-grid .form-row:nth-child(12),
.app-shell:not(.customer-only-shell) .signup-grid .form-row:nth-child(14) {
  grid-column: 1 / -1 !important;
}

.app-shell:not(.customer-only-shell) .helper,
.app-shell:not(.customer-only-shell) .ip-lock-note {
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 800 !important;
}

.app-shell:not(.customer-only-shell) .ip-lock-note.good {
  margin-top: 8px !important;
  padding: 10px 12px !important;
  border-radius: 14px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  color: #59613c !important;
}

.app-shell:not(.customer-only-shell) .location-tabs {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 7px !important;
  padding: 8px !important;
  border-radius: 16px !important;
  background: rgba(255, 246, 236, 0.82) !important;
  border: 1px solid rgba(97, 72, 48, 0.09) !important;
}

.app-shell:not(.customer-only-shell) .location-tab {
  width: 38px !important;
  height: 38px !important;
  border: 0 !important;
  border-radius: 13px !important;
  background: rgba(255, 255, 255, 0.74) !important;
  color: #7b6b5c !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.app-shell:not(.customer-only-shell) .location-tab.active {
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
}

.app-shell:not(.customer-only-shell) .location-tab.done:not(.active) {
  background: rgba(104, 112, 68, 0.14) !important;
  color: #59613c !important;
}

.app-shell:not(.customer-only-shell) .logo-uploader.compact {
  display: grid !important;
  grid-template-columns: 96px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 14px !important;
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 247, 239, 0.76) !important;
  border: 1px solid rgba(97, 72, 48, 0.10) !important;
}

.app-shell:not(.customer-only-shell) .logo-uploader.compact .logo-box {
  width: 96px !important;
  height: 96px !important;
  min-width: 96px !important;
  border-radius: 24px !important;
  background: #fff !important;
}

.app-shell:not(.customer-only-shell) .logo-uploader.compact input[type="file"] {
  min-height: auto !important;
  padding: 11px !important;
  border-radius: 14px !important;
  background: #fff !important;
}

.app-shell:not(.customer-only-shell) .username-status,
.app-shell:not(.customer-only-shell) .password-rules {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}

.app-shell:not(.customer-only-shell) .username-status span,
.app-shell:not(.customer-only-shell) .password-rules span {
  display: inline-flex !important;
  align-items: center !important;
  min-height: 28px !important;
  padding: 0 9px !important;
  border-radius: 999px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  color: #59613c !important;
  font-size: 11px !important;
  font-weight: 950 !important;
}

.app-shell:not(.customer-only-shell) .auth-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
}

.app-shell:not(.customer-only-shell) .check-row {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  color: #6f6155 !important;
  font-size: 13px !important;
  font-weight: 900 !important;
}

.app-shell:not(.customer-only-shell) .check-row input {
  width: 18px !important;
  height: 18px !important;
  min-height: 18px !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.app-shell:not(.customer-only-shell) .link-button {
  border: 0 !important;
  background: transparent !important;
  color: #bd5338 !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.app-shell:not(.customer-only-shell) .auth-page .btn.full,
.app-shell:not(.customer-only-shell) .auth-page .btn.dark.full {
  min-height: 56px !important;
  width: 100% !important;
  border: 0 !important;
  border-radius: 18px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
  box-shadow: 0 16px 30px rgba(207, 95, 59, 0.22) !important;
  cursor: pointer !important;
}

.app-shell:not(.customer-only-shell) .auth-page .btn.dark.full {
  background: #2f2a25 !important;
  box-shadow: 0 16px 30px rgba(47, 42, 37, 0.20) !important;
}

.app-shell:not(.customer-only-shell) .or-row {
  display: grid !important;
  grid-template-columns: 1fr auto 1fr !important;
  align-items: center !important;
  gap: 10px !important;
  color: #9b8a7b !important;
  font-size: 12px !important;
  font-weight: 900 !important;
}

.app-shell:not(.customer-only-shell) .or-row span {
  height: 1px !important;
  background: rgba(97, 72, 48, 0.12) !important;
}

.app-shell:not(.customer-only-shell) .or-row em {
  font-style: normal !important;
}

.app-shell:not(.customer-only-shell) .google-button {
  min-height: 54px !important;
  width: 100% !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  border: 1px solid rgba(97, 72, 48, 0.12) !important;
  border-radius: 18px !important;
  background: #fff !important;
  color: #2f2a25 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.app-shell:not(.customer-only-shell) .google-button span {
  width: 28px !important;
  height: 28px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 50% !important;
  background: rgba(207, 95, 59, 0.10) !important;
  color: #bd5338 !important;
}

.app-shell:not(.customer-only-shell) .terms {
  margin: 0 !important;
  color: #817466 !important;
  font-size: 12px !important;
  line-height: 1.45 !important;
  text-align: center !important;
  font-weight: 800 !important;
}

.app-shell:not(.customer-only-shell) .auth-footnote {
  width: min(1180px, 100%) !important;
  margin: 0 auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  color: #817466 !important;
  font-size: 13px !important;
  font-weight: 850 !important;
}

.app-shell:not(.customer-only-shell) .auth-footnote span {
  display: inline-flex !important;
  min-height: 26px !important;
  align-items: center !important;
  padding: 0 9px !important;
  border-radius: 999px !important;
  background: rgba(104, 112, 68, 0.12) !important;
  color: #59613c !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

@media (max-width: 980px) {
  .app-shell:not(.customer-only-shell) .auth-layout {
    grid-template-columns: 1fr !important;
  }

  .app-shell:not(.customer-only-shell) .auth-info {
    position: relative !important;
    top: auto !important;
    min-height: auto !important;
  }
}

@media (max-width: 680px) {
  .app-shell:not(.customer-only-shell) {
    padding: 14px !important;
  }

  .app-shell:not(.customer-only-shell) .auth-page {
    gap: 12px !important;
  }

  .app-shell:not(.customer-only-shell) .main-auth-logo {
    width: 78px !important;
    height: 78px !important;
    border-radius: 24px !important;
  }

  .app-shell:not(.customer-only-shell) .auth-info,
  .app-shell:not(.customer-only-shell) .auth-card {
    border-radius: 26px !important;
  }

  .app-shell:not(.customer-only-shell) .auth-info {
    padding: 22px !important;
  }

  .app-shell:not(.customer-only-shell) .auth-info h1 {
    font-size: 34px !important;
  }

  .app-shell:not(.customer-only-shell) .auth-panels {
    padding: 18px !important;
  }

  .app-shell:not(.customer-only-shell) .signup-grid {
    grid-template-columns: 1fr !important;
  }

  .app-shell:not(.customer-only-shell) .signup-grid .form-row {
    grid-column: 1 / -1 !important;
  }

  .app-shell:not(.customer-only-shell) .logo-uploader.compact {
    grid-template-columns: 1fr !important;
  }

  .app-shell:not(.customer-only-shell) .auth-footnote {
    align-items: flex-start !important;
    text-align: center !important;
    flex-direction: column !important;
  }
}



/* =========================================================
   WAITER CALL BUTTON BUILDER
   Manager can create Call Waiter buttons with optional photos.
   ========================================================= */

.waiter-manager-grid {
  align-items: start !important;
}

.manager-card-heading-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
  margin-bottom: 14px !important;
}

.service-item-form {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 12px !important;
  padding: 14px !important;
  border-radius: 20px !important;
  background: rgba(255, 250, 243, 0.76) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.service-item-form .service-active-row,
.service-item-form .service-draft-preview,
.service-item-form .row-actions {
  grid-column: 1 / -1 !important;
}

.service-draft-preview {
  display: grid !important;
  grid-template-columns: 74px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 10px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.78) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.service-draft-preview img {
  width: 74px !important;
  height: 74px !important;
  object-fit: cover !important;
  border-radius: 16px !important;
}

.service-draft-preview button {
  width: fit-content !important;
  min-height: 36px !important;
  border: 0 !important;
  border-radius: 999px !important;
  padding: 0 12px !important;
  background: rgba(189, 83, 56, 0.10) !important;
  color: #a33a2b !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

.service-items-list {
  display: grid !important;
  gap: 10px !important;
  margin-top: 14px !important;
}

.service-item-row {
  display: grid !important;
  grid-template-columns: 58px minmax(0, 1fr) auto !important;
  gap: 12px !important;
  align-items: center !important;
  padding: 10px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.80) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.service-item-row.inactive {
  opacity: 0.55 !important;
}

.service-item-avatar {
  width: 58px !important;
  height: 58px !important;
  display: grid !important;
  place-items: center !important;
  overflow: hidden !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, rgba(211, 109, 71, 0.12), rgba(151, 114, 77, 0.10)), #fff7ef !important;
  color: #bd5338 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

.service-item-avatar img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.service-item-row strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

.service-item-row span {
  display: block !important;
  margin-top: 3px !important;
  color: #7a6b5e !important;
  font-size: 12px !important;
  font-weight: 850 !important;
}

.service-item-actions {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
  gap: 7px !important;
}

main.customer-only-shell .service-request-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}

main.customer-only-shell .service-request-btn {
  min-height: 100px !important;
  display: grid !important;
  place-items: center !important;
  gap: 5px !important;
  text-align: center !important;
}

main.customer-only-shell .service-request-btn img {
  width: 48px !important;
  height: 48px !important;
  object-fit: cover !important;
  border-radius: 15px !important;
  box-shadow: 0 8px 18px rgba(54, 36, 24, 0.12) !important;
}

main.customer-only-shell .service-request-btn span {
  width: 48px !important;
  height: 48px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 15px !important;
  background: rgba(189, 83, 56, 0.12) !important;
  color: #bd5338 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .service-request-btn strong {
  color: #2d211b !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .service-request-btn small {
  color: #7b6354 !important;
  font-size: 11px !important;
  font-weight: 850 !important;
}

@media (max-width: 720px) {
  .service-item-form,
  .service-item-row {
    grid-template-columns: 1fr !important;
  }

  .service-item-actions {
    justify-content: flex-start !important;
  }
}



/* =========================================================
   PLATFORM ADMIN DASHBOARD + SUSPENDED QR PAGE
   Owner login can view all companies and suspend/expire service.
   ========================================================= */

.platform-admin-panel {
  display: grid !important;
  gap: 18px !important;
}

.platform-admin-dashboard {
  display: grid !important;
  gap: 16px !important;
}

.platform-admin-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 16px !important;
  padding: 16px !important;
  border-radius: 24px !important;
  background: rgba(255, 250, 243, 0.82) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.platform-admin-head span {
  display: block !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.platform-admin-head h2 {
  margin: 4px 0 !important;
  color: #2f2a25 !important;
  font-size: 34px !important;
  line-height: 1 !important;
  letter-spacing: -0.055em !important;
  font-weight: 1000 !important;
}

.platform-admin-head p {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 13px !important;
  line-height: 1.45 !important;
  font-weight: 850 !important;
}

.platform-admin-actions {
  display: flex !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
}

.platform-admin-stats {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.platform-admin-stats div {
  padding: 14px !important;
  border-radius: 20px !important;
  background: rgba(255, 255, 255, 0.82) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.platform-admin-stats span {
  display: block !important;
  color: #7c6c5f !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.platform-admin-stats strong {
  display: block !important;
  margin-top: 5px !important;
  color: #2f2a25 !important;
  font-size: 24px !important;
  font-weight: 1000 !important;
}

.admin-message {
  padding: 12px 14px !important;
  border-radius: 16px !important;
  background: rgba(189, 83, 56, 0.10) !important;
  color: #8f3a2b !important;
  font-size: 13px !important;
  line-height: 1.35 !important;
  font-weight: 950 !important;
}

.platform-business-list {
  display: grid !important;
  gap: 14px !important;
}

.platform-business-card {
  display: grid !important;
  gap: 14px !important;
  padding: 16px !important;
  border-radius: 26px !important;
  background: rgba(255, 255, 255, 0.86) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
  box-shadow: 0 16px 34px rgba(80, 52, 27, 0.08) !important;
}

.platform-business-card.suspended {
  border-color: rgba(185, 28, 28, 0.28) !important;
  background: rgba(255, 247, 247, 0.92) !important;
}

.platform-business-top {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
}

.platform-business-top span {
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.09em !important;
}

.platform-business-top h3 {
  margin: 4px 0 !important;
  color: #2f2a25 !important;
  font-size: 22px !important;
  line-height: 1.05 !important;
  font-weight: 1000 !important;
}

.platform-business-top p {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 12px !important;
  font-weight: 850 !important;
}

.platform-business-top b {
  display: inline-flex !important;
  align-items: center !important;
  min-height: 31px !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: #2f2a25 !important;
  color: #fff !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  white-space: nowrap !important;
}

.platform-business-card.suspended .platform-business-top b {
  background: #b91c1c !important;
}

.platform-business-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 12px !important;
}

.platform-business-grid .form-row:nth-last-child(1) {
  grid-column: 1 / -1 !important;
}

.platform-business-footer {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
  padding-top: 4px !important;
}

.platform-business-footer span {
  color: #74685d !important;
  font-size: 12px !important;
  font-weight: 900 !important;
}

main.customer-only-shell .service-suspended-screen {
  min-height: 100dvh !important;
  display: grid !important;
  place-items: center !important;
  padding: 28px 18px !important;
  position: relative !important;
  z-index: 2 !important;
}

main.customer-only-shell .service-suspended-card {
  width: min(420px, 100%) !important;
  display: grid !important;
  justify-items: center !important;
  gap: 12px !important;
  text-align: center !important;
  padding: 26px !important;
  border-radius: 32px !important;
  background: rgba(255, 255, 255, 0.76) !important;
  border: 1px solid rgba(255, 255, 255, 0.42) !important;
  box-shadow: 0 24px 60px rgba(48, 33, 26, 0.22) !important;
  backdrop-filter: blur(18px) saturate(1.08) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.08) !important;
}

main.customer-only-shell .service-suspended-logo {
  width: 92px !important;
  height: 92px !important;
  display: grid !important;
  place-items: center !important;
  border-radius: 28px !important;
  background: rgba(255, 255, 255, 0.82) !important;
  border: 1px solid rgba(255, 255, 255, 0.44) !important;
  overflow: hidden !important;
}

main.customer-only-shell .service-suspended-card > span {
  color: #b91c1c !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.14em !important;
}

main.customer-only-shell .service-suspended-card h2 {
  margin: 0 !important;
  color: #2d211b !important;
  font-size: 32px !important;
  line-height: 1 !important;
  letter-spacing: -0.055em !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .service-suspended-card p {
  margin: 0 !important;
  color: #5f4c40 !important;
  font-size: 15px !important;
  line-height: 1.45 !important;
  font-weight: 900 !important;
}

main.customer-only-shell .service-suspended-details {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 9px !important;
}

main.customer-only-shell .service-suspended-details div {
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(185, 28, 28, 0.08) !important;
  border: 1px solid rgba(185, 28, 28, 0.12) !important;
}

main.customer-only-shell .service-suspended-details small {
  display: block !important;
  color: #8f3a2b !important;
  font-size: 10px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

main.customer-only-shell .service-suspended-details strong {
  display: block !important;
  margin-top: 4px !important;
  color: #2d211b !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .service-suspended-card em {
  color: #7b6354 !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-style: normal !important;
  font-weight: 850 !important;
}

@media (max-width: 760px) {
  .platform-admin-stats,
  .platform-business-grid {
    grid-template-columns: 1fr !important;
  }

  .platform-admin-head,
  .platform-business-top,
  .platform-business-footer {
    flex-direction: column !important;
    align-items: stretch !important;
  }
}



/* =========================================================
   PLATFORM ADMIN CHANGE PASSWORD
   Allows logged-in admin to update their Supabase Auth password.
   ========================================================= */

.platform-admin-password-card {
  display: grid !important;
  grid-template-columns: minmax(220px, 0.8fr) minmax(320px, 1.2fr) !important;
  gap: 14px !important;
  align-items: end !important;
  padding: 16px !important;
  border-radius: 24px !important;
  background: rgba(47, 42, 37, 0.92) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  box-shadow: 0 18px 42px rgba(47, 42, 37, 0.16) !important;
}

.platform-admin-password-card > div:first-child span {
  display: block !important;
  color: #f4c99f !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.platform-admin-password-card h3 {
  margin: 5px 0 4px !important;
  color: #fff !important;
  font-size: 22px !important;
  line-height: 1.05 !important;
  font-weight: 1000 !important;
  letter-spacing: -0.04em !important;
}

.platform-admin-password-card p {
  margin: 0 !important;
  color: rgba(255, 255, 255, 0.68) !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 850 !important;
}

.platform-admin-password-fields {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto !important;
  gap: 10px !important;
  align-items: end !important;
}

.platform-admin-password-card .form-row > span {
  color: rgba(255, 255, 255, 0.78) !important;
}

.platform-admin-password-card input {
  background: rgba(255, 255, 255, 0.95) !important;
}

.platform-admin-password-card .btn.dark,
.platform-admin-password-card .btn.small.dark {
  min-height: 50px !important;
  border-radius: 16px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  border: 0 !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
  white-space: nowrap !important;
}

@media (max-width: 860px) {
  .platform-admin-password-card,
  .platform-admin-password-fields {
    grid-template-columns: 1fr !important;
  }
}



/* =========================================================
   RESTAURANT LICENSE + CLIQ PAYMENT DISPLAY
   Shows license active date under logo and billing rows in profile.
   ========================================================= */

.license-active-until {
  display: block !important;
  margin-top: 5px !important;
  color: rgba(75, 56, 43, 0.70) !important;
  font-size: 11px !important;
  line-height: 1.25 !important;
  font-style: normal !important;
  font-weight: 950 !important;
}

.sidebar-restaurant-card .license-active-until {
  color: rgba(255, 255, 255, 0.74) !important;
}

.profile-license-line {
  display: inline-flex !important;
  align-items: center !important;
  width: fit-content !important;
  min-height: 28px !important;
  margin-top: 8px !important;
  padding: 0 10px !important;
  border-radius: 999px !important;
  background: rgba(104, 112, 68, 0.12) !important;
  color: #59613c !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

.profile-payment-card {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 14px !important;
  margin: 14px 0 !important;
  padding: 16px !important;
  border-radius: 24px !important;
  background: rgba(47, 42, 37, 0.94) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  box-shadow: 0 18px 42px rgba(47, 42, 37, 0.16) !important;
}

.profile-payment-card span {
  display: block !important;
  color: #f4c99f !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.profile-payment-card strong {
  display: block !important;
  margin-top: 5px !important;
  color: #fff !important;
  font-size: 28px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
}

.profile-payment-card p {
  margin: 6px 0 0 !important;
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 850 !important;
}

.profile-payment-card .btn {
  min-height: 48px !important;
  flex: 0 0 auto !important;
  border-radius: 16px !important;
  padding: 0 16px !important;
  background: linear-gradient(135deg, #d36d47, #bd5338) !important;
  color: #fff !important;
  border: 0 !important;
  font-size: 13px !important;
  font-weight: 1000 !important;
  white-space: nowrap !important;
}

@media (max-width: 720px) {
  .profile-payment-card {
    align-items: stretch !important;
    flex-direction: column !important;
  }

  .profile-payment-card .btn {
    width: 100% !important;
  }
}



/* =========================================================
   SUBSCRIPTION EXPIRED CUSTOMER QR MESSAGE
   Shows the expired payment notice in large bold red text.
   ========================================================= */

main.customer-only-shell .subscription-expired-title {
  margin: 2px 0 0 !important;
  color: #b91c1c !important;
  font-size: clamp(34px, 8vw, 54px) !important;
  line-height: 0.92 !important;
  letter-spacing: -0.07em !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
}

main.customer-only-shell .subscription-expired-copy {
  margin: 0 !important;
  color: #b91c1c !important;
  font-size: clamp(22px, 5.6vw, 36px) !important;
  line-height: 1.02 !important;
  letter-spacing: -0.045em !important;
  font-weight: 1000 !important;
}

main.customer-only-shell .subscription-expired-restaurant {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 32px !important;
  padding: 0 12px !important;
  border-radius: 999px !important;
  background: rgba(185, 28, 28, 0.08) !important;
  color: #7f1d1d !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

main.customer-only-shell .service-suspended-card > span {
  color: #b91c1c !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.14em !important;
}

main.customer-only-shell .service-suspended-card {
  border: 2px solid rgba(185, 28, 28, 0.20) !important;
}



/* =========================================================
   TABLE-BASED PRICING PREVIEW
   Pricing is 1 JOD per table per month, minimum 25 QR codes/month, set during signup.
   ========================================================= */

.price-preview-helper {
  padding: 10px 12px !important;
  border-radius: 14px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  color: #59613c !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 1000 !important;
}

.price-preview-helper span {
  display: block !important;
  margin-top: 3px !important;
  color: #74685d !important;
  font-size: 11px !important;
  font-weight: 850 !important;
}





/* =========================================================
   NETWORK PRINTER SETTINGS
   Restaurant enters printer IP/port from POS printer self-test printout.
   Actual printing still requires the local Tawleh print bridge later.
   ========================================================= */

.printer-settings-card {
  display: grid !important;
  gap: 16px !important;
}

.printer-settings-head {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 14px !important;
}

.printer-settings-head h3 {
  margin: 0 !important;
}

.printer-settings-head p {
  margin: 4px 0 0 !important;
  color: var(--muted) !important;
}

.printer-form-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 12px !important;
}

.printer-form-grid .field.full {
  grid-column: 1 / -1 !important;
}

.printer-ready-note {
  padding: 13px 14px !important;
  border-radius: 18px !important;
  background: rgba(200, 97, 63, 0.09) !important;
  border: 1px solid rgba(200, 97, 63, 0.15) !important;
  color: #6b4635 !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  font-weight: 800 !important;
}

.printer-list {
  display: grid !important;
  gap: 10px !important;
}

.printer-row {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) auto !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 14px !important;
  border-radius: 20px !important;
  background: rgba(255, 255, 255, 0.84) !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  box-shadow: 0 10px 24px rgba(39, 28, 20, 0.06) !important;
}

.printer-row strong {
  display: block !important;
  color: #35241c !important;
  font-size: 16px !important;
  line-height: 1.1 !important;
}

.printer-row span {
  display: block !important;
  margin-top: 4px !important;
  color: var(--muted) !important;
  font-size: 12px !important;
  font-weight: 800 !important;
}

.printer-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 24px !important;
  padding: 0 9px !important;
  border-radius: 999px !important;
  margin-top: 7px !important;
  background: rgba(32, 124, 82, 0.10) !important;
  color: #16714a !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

.printer-status-pill.off {
  background: rgba(130, 105, 80, 0.12) !important;
  color: #7c6a5c !important;
}

.printer-row-actions {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-end !important;
  gap: 8px !important;
}

@media (max-width: 760px) {
  .printer-settings-head,
  .printer-row {
    grid-template-columns: 1fr !important;
    display: grid !important;
  }

  .printer-form-grid {
    grid-template-columns: 1fr !important;
  }

  .printer-row-actions {
    justify-content: stretch !important;
  }

  .printer-row-actions .btn {
    width: 100% !important;
  }
}


/* =========================================================
   CLIQ PAYMENT MODAL + ADMIN NOTIFICATIONS
   Restaurant sends payment notice; platform admin sees it.
   ========================================================= */

.cliq-payment-backdrop {
  position: fixed !important;
  inset: 0 !important;
  z-index: 1200 !important;
  display: grid !important;
  place-items: center !important;
  padding: 18px !important;
  background: rgba(22, 18, 15, 0.58) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}

.cliq-payment-modal {
  width: min(720px, 100%) !important;
  max-height: min(90vh, 860px) !important;
  overflow-y: auto !important;
  display: grid !important;
  gap: 16px !important;
  padding: 20px !important;
  border-radius: 30px !important;
  background: rgba(255, 253, 248, 0.96) !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  box-shadow: 0 32px 90px rgba(18, 13, 10, 0.34) !important;
}

.cliq-payment-modal-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
}

.cliq-payment-modal-head span,
.cliq-send-to-box span,
.cliq-payment-due-box span,
.cliq-admin-notification-head span {
  display: block !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.cliq-payment-modal-head h2 {
  margin: 5px 0 4px !important;
  color: #2f2a25 !important;
  font-size: 32px !important;
  line-height: 1 !important;
  letter-spacing: -0.055em !important;
  font-weight: 1000 !important;
}

.cliq-payment-modal-head p {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 13px !important;
  line-height: 1.45 !important;
  font-weight: 850 !important;
}

.modal-close {
  width: 38px !important;
  height: 38px !important;
  border: 0 !important;
  border-radius: 14px !important;
  background: rgba(47, 42, 37, 0.08) !important;
  color: #2f2a25 !important;
  font-size: 24px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
  cursor: pointer !important;
}

.cliq-payment-due-box {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.cliq-payment-due-box div {
  padding: 14px !important;
  border-radius: 20px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  border: 1px solid rgba(104, 112, 68, 0.13) !important;
}

.cliq-payment-due-box strong {
  display: block !important;
  margin-top: 6px !important;
  color: #2f2a25 !important;
  font-size: 22px !important;
  font-weight: 1000 !important;
}

.cliq-send-to-box {
  display: grid !important;
  gap: 5px !important;
  padding: 16px !important;
  border-radius: 22px !important;
  background: #2f2a25 !important;
  color: #fff !important;
}

.cliq-send-to-box strong {
  color: #fff !important;
  font-size: 24px !important;
  line-height: 1.05 !important;
  letter-spacing: -0.04em !important;
  font-weight: 1000 !important;
}

.cliq-send-to-box p {
  margin: 0 !important;
  color: rgba(255, 255, 255, 0.72) !important;
  font-size: 12px !important;
  font-weight: 850 !important;
}

.cliq-payment-grid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 12px !important;
}

.cliq-payment-actions {
  display: flex !important;
  justify-content: flex-end !important;
  gap: 10px !important;
}

.cliq-admin-notification-card {
  display: grid !important;
  gap: 12px !important;
  padding: 16px !important;
  border-radius: 26px !important;
  background: rgba(255, 255, 255, 0.88) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
  box-shadow: 0 16px 34px rgba(80, 52, 27, 0.08) !important;
}

.cliq-admin-notification-head {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 12px !important;
}

.cliq-admin-notification-head h3 {
  margin: 5px 0 4px !important;
  color: #2f2a25 !important;
  font-size: 24px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
  letter-spacing: -0.045em !important;
}

.cliq-admin-notification-head p {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
  font-weight: 850 !important;
}

.cliq-admin-payment-list {
  display: grid !important;
  gap: 10px !important;
}

.cliq-admin-payment-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
  padding: 13px !important;
  border-radius: 20px !important;
  background: rgba(255, 247, 239, 0.82) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.cliq-admin-payment-row strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
}

.cliq-admin-payment-row span {
  display: block !important;
  margin-top: 3px !important;
  color: #5f5147 !important;
  font-size: 12px !important;
  line-height: 1.35 !important;
  font-weight: 900 !important;
}

.cliq-admin-payment-row em {
  display: block !important;
  margin-top: 4px !important;
  color: #817466 !important;
  font-size: 11px !important;
  line-height: 1.35 !important;
  font-style: normal !important;
  font-weight: 800 !important;
}

.cliq-admin-payment-row b {
  flex: 0 0 auto !important;
  min-height: 32px !important;
  display: inline-flex !important;
  align-items: center !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: #2f2a25 !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
  white-space: nowrap !important;
}

@media (max-width: 720px) {
  .cliq-payment-due-box,
  .cliq-payment-grid {
    grid-template-columns: 1fr !important;
  }

  .cliq-payment-actions,
  .cliq-admin-notification-head,
  .cliq-admin-payment-row {
    align-items: stretch !important;
    flex-direction: column !important;
  }
}



/* =========================================================
   SIGNUP SOURCE GATE + SALESPERSON ADMIN
   Requires business self-signup or valid salesperson username.
   ========================================================= */

.signup-source-gate {
  display: grid !important;
  gap: 18px !important;
}

.signup-source-options {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 14px !important;
}

.signup-source-option {
  min-height: 190px !important;
  display: grid !important;
  align-content: start !important;
  gap: 10px !important;
  text-align: left !important;
  padding: 18px !important;
  border-radius: 26px !important;
  border: 1px solid rgba(91, 71, 48, 0.12) !important;
  background: rgba(255, 255, 255, 0.88) !important;
  box-shadow: 0 16px 34px rgba(80, 52, 27, 0.08) !important;
  cursor: pointer !important;
}

.signup-source-option span,
.signup-selected-source span,
.salespeople-admin-head span {
  display: block !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.signup-source-option strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 24px !important;
  line-height: 1.02 !important;
  font-weight: 1000 !important;
  letter-spacing: -0.045em !important;
}

.signup-source-option em,
.signup-selected-source em {
  color: #74685d !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
  font-style: normal !important;
  font-weight: 850 !important;
}

.signup-selected-source {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 14px !important;
  border-radius: 22px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  border: 1px solid rgba(104, 112, 68, 0.13) !important;
}

.signup-selected-source strong {
  display: block !important;
  margin-top: 4px !important;
  color: #2f2a25 !important;
  font-size: 18px !important;
  font-weight: 1000 !important;
}

.salespeople-admin-card {
  display: grid !important;
  gap: 12px !important;
  padding: 16px !important;
  border-radius: 26px !important;
  background: rgba(255, 255, 255, 0.88) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
  box-shadow: 0 16px 34px rgba(80, 52, 27, 0.08) !important;
}

.salespeople-admin-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
}

.salespeople-admin-head h3 {
  margin: 5px 0 4px !important;
  color: #2f2a25 !important;
  font-size: 24px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
  letter-spacing: -0.045em !important;
}

.salespeople-admin-head p {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
  font-weight: 850 !important;
}

.salespeople-list {
  display: grid !important;
  gap: 10px !important;
}

.salesperson-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  gap: 12px !important;
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 247, 239, 0.82) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.salesperson-row strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 15px !important;
  font-weight: 1000 !important;
}

.salesperson-row span {
  display: block !important;
  margin-top: 3px !important;
  color: #74685d !important;
  font-size: 12px !important;
  font-weight: 850 !important;
}

.salesperson-row b {
  flex: 0 0 auto !important;
  min-height: 30px !important;
  display: inline-flex !important;
  align-items: center !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: #2f2a25 !important;
  color: #fff !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
}

.salesperson-modal {
  width: min(600px, 100%) !important;
  max-height: min(90vh, 780px) !important;
  overflow-y: auto !important;
  display: grid !important;
  gap: 16px !important;
  padding: 20px !important;
  border-radius: 30px !important;
  background: rgba(255, 253, 248, 0.96) !important;
  border: 1px solid rgba(91, 71, 48, 0.14) !important;
  box-shadow: 0 32px 90px rgba(18, 13, 10, 0.34) !important;
}

@media (max-width: 720px) {
  .signup-source-options {
    grid-template-columns: 1fr !important;
  }

  .signup-selected-source,
  .salespeople-admin-head,
  .salesperson-row {
    align-items: stretch !important;
    flex-direction: column !important;
  }
}



/* Inline salesperson form in admin dashboard.
   This avoids the old hidden modal issue on the auth/admin screen. */
.salesperson-inline-form {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto !important;
  gap: 12px !important;
  align-items: end !important;
  padding: 14px !important;
  border-radius: 22px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  border: 1px solid rgba(104, 112, 68, 0.14) !important;
}

.salesperson-inline-actions {
  display: flex !important;
  gap: 8px !important;
  align-items: center !important;
  justify-content: flex-end !important;
  padding-bottom: 1px !important;
}

@media (max-width: 900px) {
  .salesperson-inline-form {
    grid-template-columns: 1fr !important;
  }

  .salesperson-inline-actions {
    justify-content: stretch !important;
  }

  .salesperson-inline-actions .btn {
    width: 100% !important;
  }
}



/* =========================================================
   REPORT CENTER
   Platform-level monthly/YTD report and salesperson commission table.
   ========================================================= */

.report-center-card {
  display: grid !important;
  gap: 14px !important;
  padding: 16px !important;
  border-radius: 28px !important;
  background: rgba(255, 255, 255, 0.90) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
  box-shadow: 0 16px 34px rgba(80, 52, 27, 0.08) !important;
}

.report-center-head {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 14px !important;
}

.report-center-head span,
.report-summary-grid span,
.report-company-mini span {
  display: block !important;
  color: #bd5338 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.10em !important;
}

.report-center-head h3 {
  margin: 5px 0 4px !important;
  color: #2f2a25 !important;
  font-size: 28px !important;
  line-height: 1 !important;
  letter-spacing: -0.05em !important;
  font-weight: 1000 !important;
}

.report-center-head p,
.report-note {
  margin: 0 !important;
  color: #74685d !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
  font-weight: 850 !important;
}

.report-center-controls {
  width: min(520px, 100%) !important;
  display: grid !important;
  grid-template-columns: 1fr 120px auto !important;
  gap: 10px !important;
  align-items: end !important;
}

.report-summary-grid {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px !important;
}

.report-summary-grid div {
  padding: 14px !important;
  border-radius: 20px !important;
  background: rgba(255, 247, 239, 0.82) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.report-summary-grid strong {
  display: block !important;
  margin-top: 6px !important;
  color: #2f2a25 !important;
  font-size: 22px !important;
  line-height: 1 !important;
  font-weight: 1000 !important;
}

.report-company-mini {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}

.report-company-mini span {
  min-height: 30px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: rgba(104, 112, 68, 0.10) !important;
  color: #59613c !important;
}

.report-company-mini strong {
  color: #2f2a25 !important;
}

.sales-report-table {
  display: grid !important;
  gap: 8px !important;
  overflow-x: auto !important;
}

.sales-report-header,
.sales-report-row {
  min-width: 860px !important;
  display: grid !important;
  grid-template-columns: 1.6fr 1fr 1fr 1fr 1fr 1fr !important;
  gap: 10px !important;
  align-items: center !important;
}

.sales-report-header {
  padding: 0 10px !important;
}

.sales-report-header span {
  color: #817466 !important;
  font-size: 11px !important;
  font-weight: 1000 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}

.sales-report-row {
  padding: 12px !important;
  border-radius: 18px !important;
  background: rgba(255, 255, 255, 0.86) !important;
  border: 1px solid rgba(91, 71, 48, 0.10) !important;
}

.sales-report-row strong {
  display: block !important;
  color: #2f2a25 !important;
  font-size: 14px !important;
  font-weight: 1000 !important;
}

.sales-report-row em {
  display: block !important;
  margin-top: 3px !important;
  color: #817466 !important;
  font-size: 11px !important;
  font-style: normal !important;
  font-weight: 850 !important;
}

.sales-report-row span {
  color: #4e4339 !important;
  font-size: 12px !important;
  font-weight: 900 !important;
}

.sales-report-row b {
  width: fit-content !important;
  min-height: 30px !important;
  display: inline-flex !important;
  align-items: center !important;
  border-radius: 999px !important;
  padding: 0 10px !important;
  background: #2f2a25 !important;
  color: #fff !important;
  font-size: 12px !important;
  font-weight: 1000 !important;
}

@media (max-width: 900px) {
  .report-center-head {
    flex-direction: column !important;
  }

  .report-center-controls,
  .report-summary-grid {
    width: 100% !important;
    grid-template-columns: 1fr !important;
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
  serviceStatus: string;
  serviceExpiresAt: string;
  servicePaymentDueDate: string;
  serviceBalanceDueJod: number;
  serviceMonthlyFeeJod: number;
  serviceSuspendedReason: string;
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

type MenuOptionChoice = {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  subOptionGroups?: MenuOptionGroup[];
};

type MenuOptionGroup = {
  id: string;
  name: string;
  nameAr: string;
  required: boolean;
  multiple: boolean;
  choices: MenuOptionChoice[];
};

type CartCustomization = {
  specialInstructions: string;
  selectedChoices: Record<string, string[]>;
};

type OrderModifier = {
  groupId: string;
  groupName: string;
  choiceId: string;
  choiceName: string;
  price: number;
  parentChoiceId?: string;
  parentChoiceName?: string;
  level?: number;
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
  optionGroups: MenuOptionGroup[];
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
  option_groups?: unknown;
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
  table_label?: string | null;
  guest_name: string;
  active: boolean | null;
  created_at: string | null;
  last_seen_at: string | null;
};

type TableSession = {
  id: string;
  businessId: string;
  authUserId: string;
  tableNumber: number;
  token: string;
  status: "pending" | "active" | "closed" | "expired" | "blocked";
  guestName: string;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string;
  approvedAt: string;
  closedAt: string;
  expiresAt: string;
  idleExpiresAt: string;
  lastOrderAt: string;
};

type TableSessionRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string | null;
  table_number: number | string | null;
  session_token?: string | null;
  token?: string | null;
  status: string | null;
  guest_name: string | null;
  created_at: string | null;
  updated_at: string | null;
  last_seen_at: string | null;
  approved_at: string | null;
  closed_at: string | null;
  expires_at: string | null;
  idle_expires_at: string | null;
  last_order_at: string | null;
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
  optionGroups: MenuOptionGroup[];
};

type Order = {
  id: string;
  table: number;
  tableLabel: string;
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
  specialInstructions: string;
  modifiers: OrderModifier[];
  modifiersTotal: number;
  basePrice: number;
  unitTotal: number;
};

type CartLine = {
  item: MenuItem;
  quantity: number;
  customization: CartCustomization;
  selectedModifiers: OrderModifier[];
  addonsTotal: number;
  unitTotal: number;
  lineTotal: number;
};

type KitchenTicketGroup = {
  key: string;
  orderTicketId: string;
  ticketNumber: number | null;
  table: number;
  tableLabel: string;
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
  table_label?: string | null;
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
  special_instructions?: string | null;
  modifiers?: unknown;
  modifiers_total_jod?: number | string | null;
  base_price_jod?: number | string | null;
  unit_total_jod?: number | string | null;
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

type ServiceItem = {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  imageUrl: string;
  active: boolean;
  sortOrder: number;
};

type ServiceItemRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string;
  item_name: string;
  item_name_ar: string | null;
  short_code: string | null;
  image_url: string | null;
  active: boolean | null;
  sort_order: number | null;
  created_at: string | null;
};



type PrinterSetting = {
  id: string;
  printerName: string;
  printerRole: string;
  printerIp: string;
  printerPort: number;
  paperWidth: string;
  autoPrint: boolean;
  copies: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PrinterSettingRow = {
  id: string;
  business_account_id: string;
  auth_user_id: string | null;
  printer_name: string | null;
  printer_role: string | null;
  printer_ip: string | null;
  printer_port: number | string | null;
  paper_width: string | null;
  auto_print: boolean | null;
  copies: number | string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

type PublicSuspension = {
  suspended: boolean;
  message: string;
  paymentDueDate: string;
  balanceDueJod: number;
};

type PlatformAdminBusiness = {
  id: string;
  username: string;
  restaurantName: string;
  branchName: string;
  email: string;
  phone: string;
  tableCount: number;
  locationCount: number;
  createdAt: string;
  serviceStatus: string;
  serviceExpiresAt: string;
  servicePaymentDueDate: string;
  serviceBalanceDueJod: number;
  serviceMonthlyFeeJod: number;
  serviceSuspendedReason: string;
  serviceAdminNote: string;
};

type CliqPaymentRequest = {
  id: string;
  businessId: string;
  username: string;
  restaurantName: string;
  branchName: string;
  months: number;
  monthlyFeeJod: number;
  amountJod: number;
  paymentDueDate: string;
  referenceNumber: string;
  senderCliqName: string;
  senderCliqPhone: string;
  status: string;
  createdAt: string;
};

type PlatformSalesperson = {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  active: boolean;
  createdAt: string;
};

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
  active: boolean;
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

type AppState = {
  profileComplete: boolean;
  profile: Profile;
  currentGuest: string;
  guests: string[];
  menu: MenuItem[];
  categories: MenuCategory[];
  orders: Order[];
  requests: ServiceRequest[];
  serviceItems: ServiceItem[];
  qrTokens: Record<string, string>;
  tableLabels: Record<string, string>;
  tableAutoModes: Record<string, boolean>;
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

const defaultServiceItems: ServiceItem[] = [
  { id: "service_waiter", name: "Waiter", nameAr: "نادل", icon: "WA", imageUrl: "", active: true, sortOrder: 400 },
  { id: "service_water", name: "Water", nameAr: "ماء", icon: "WT", imageUrl: "", active: true, sortOrder: 300 },
  { id: "service_napkins", name: "Napkins", nameAr: "مناديل", icon: "NP", imageUrl: "", active: true, sortOrder: 200 },
  { id: "service_charcoal", name: "Charcoal", nameAr: "فحم", icon: "CH", imageUrl: "", active: true, sortOrder: 100 },
];

const emptyServiceItemDraft: ServiceItem = {
  id: "",
  name: "",
  nameAr: "",
  icon: "",
  imageUrl: "",
  active: true,
  sortOrder: 0,
};



const emptyPrinterDraft: PrinterSetting = {
  id: "",
  printerName: "Kitchen Printer",
  printerRole: "kitchen",
  printerIp: "",
  printerPort: 9100,
  paperWidth: "80mm",
  autoPrint: true,
  copies: 1,
  isActive: true,
  createdAt: "",
  updatedAt: "",
};

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
  optionGroups: [],
};

const defaultState: AppState = {
  profileComplete: false,
  profile: {
    businessId: "",
    authUserId: "",
    restaurantName: "",
    branchName: "",
    businessType: "Cafe",
    tableCount: 25,
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
    serviceStatus: "active",
    serviceExpiresAt: "",
    servicePaymentDueDate: "",
    serviceBalanceDueJod: 0,
    serviceMonthlyFeeJod: 25,
    serviceSuspendedReason: "",
  },
  currentGuest: "",
  guests: [],
  menu: starterMenu,
  categories: [],
  orders: [],
  requests: [],
  serviceItems: defaultServiceItems,
  qrTokens: {},
  tableLabels: {},
  tableAutoModes: {},
  lastQrTable: DEMO_TABLE,
};

function money(value: number) {
  return `${Number(value || 0).toFixed(2)} JOD`;
}

function monthlyTableFee(tableCount: number) {
  return Math.max(25, Math.min(999, Number(tableCount || 25)));
}

function currentYearMonth() {
  return new Date().toISOString().slice(0, 7);
}

function commissionAmount(baseAmount: number, rate: number) {
  const safeBase = Number(baseAmount || 0);
  const safeRate = Math.max(0, Math.min(100, Number(rate || 0)));

  return Math.round(safeBase * safeRate * 10) / 1000;
}

function displayDate(value: string) {
  if (!value) return "Not set";

  const clean = String(value).slice(0, 10);
  const parts = clean.split("-");

  if (parts.length !== 3) return clean;

  const [year, month, day] = parts;
  return `${month}/${day}/${year}`;
}

function licenseStatusText(profile: Profile) {
  const status = String(profile.serviceStatus || "active").toLowerCase();

  if (status === "suspended") return "Suspended";
  if (profile.serviceExpiresAt) return displayDate(profile.serviceExpiresAt);

  return "Not set";
}

function automaticBalanceDueJod(profile: Profile) {
  const manualDue = Number(profile.serviceBalanceDueJod || 0);
  const monthlyFee = Number(profile.serviceMonthlyFeeJod || monthlyTableFee(profile.tableCount));

  return Math.max(manualDue, monthlyFee);
}

function cliqAmountForMonths(profile: Profile, months: number) {
  const safeMonths = Math.max(1, Math.min(24, Number(months || 1)));
  const monthlyFee = Number(profile.serviceMonthlyFeeJod || monthlyTableFee(profile.tableCount));

  return Math.round(monthlyFee * safeMonths * 1000) / 1000;
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

function normalizeMenuOptionGroups(value: unknown, keepBlankChoices = false): MenuOptionGroup[] {
  let raw = value;

  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = [];
    }
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((group, groupIndex): MenuOptionGroup | null => {
      const groupRecord = group as Partial<MenuOptionGroup> & { choices?: unknown };
      const name = String(groupRecord.name || "").trim();
      const nameAr = String(groupRecord.nameAr || "").trim();
      const choicesRaw = Array.isArray(groupRecord.choices) ? groupRecord.choices : [];
      const choices = choicesRaw
        .map((choice, choiceIndex): MenuOptionChoice | null => {
          const choiceRecord = choice as Partial<MenuOptionChoice> & { sub_option_groups?: unknown; subOptionGroups?: unknown };
          const choiceName = String(choiceRecord.name || "").trim();
          const choiceNameAr = String(choiceRecord.nameAr || "").trim();
          const price = Number(choiceRecord.price || 0);
          const subOptionGroups = normalizeMenuOptionGroups(choiceRecord.subOptionGroups || choiceRecord.sub_option_groups || [], keepBlankChoices);

          if (!keepBlankChoices && !choiceName && !choiceNameAr && !subOptionGroups.length) return null;

          return {
            id: String(choiceRecord.id || `choice_${choiceIndex}_${Date.now()}`),
            name: keepBlankChoices ? choiceName : (choiceName || choiceNameAr),
            nameAr: choiceNameAr,
            price: Number.isFinite(price) ? Math.max(0, Math.round(price * 1000) / 1000) : 0,
            subOptionGroups,
          };
        })
        .filter((choice): choice is MenuOptionChoice => Boolean(choice));

      if (!keepBlankChoices && !name && !nameAr && !choices.length) return null;

      return {
        id: String(groupRecord.id || `group_${groupIndex}_${Date.now()}`),
        name: keepBlankChoices ? name : (name || nameAr || "Options"),
        nameAr,
        required: groupRecord.required === true,
        multiple: groupRecord.multiple === true,
        choices,
      };
    })
    .filter((group): group is MenuOptionGroup => Boolean(group));
}

function cleanMenuOptionGroups(value: unknown): MenuOptionGroup[] {
  return normalizeMenuOptionGroups(value, false);
}

function draftMenuOptionGroups(value: unknown): MenuOptionGroup[] {
  return normalizeMenuOptionGroups(value, true);
}

function updateOptionGroupTree(groups: MenuOptionGroup[], groupId: string, updater: (group: MenuOptionGroup) => MenuOptionGroup | null): MenuOptionGroup[] {
  return groups
    .map((group) => {
      if (group.id === groupId) return updater(group);

      return {
        ...group,
        choices: group.choices.map((choice) => ({
          ...choice,
          subOptionGroups: updateOptionGroupTree(choice.subOptionGroups || [], groupId, updater),
        })),
      };
    })
    .filter((group): group is MenuOptionGroup => Boolean(group));
}

function updateOptionChoiceTree(groups: MenuOptionGroup[], choiceId: string, updater: (choice: MenuOptionChoice) => MenuOptionChoice | null): MenuOptionGroup[] {
  return groups.map((group) => ({
    ...group,
    choices: group.choices
      .map((choice) => {
        if (choice.id === choiceId) return updater(choice);

        return {
          ...choice,
          subOptionGroups: updateOptionChoiceTree(choice.subOptionGroups || [], choiceId, updater),
        };
      })
      .filter((choice): choice is MenuOptionChoice => Boolean(choice)),
  }));
}

function makeDefaultOptionChoice(label = "Option 1"): MenuOptionChoice {
  return { id: makeId("option_choice"), name: label, nameAr: "", price: 0, subOptionGroups: [] };
}

function modifierMemoryKey(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function cloneOptionChoiceForDraft(choice: MenuOptionChoice): MenuOptionChoice {
  return {
    id: makeId("option_choice"),
    name: choice.name || "",
    nameAr: choice.nameAr || "",
    price: Math.max(0, Math.round(Number(choice.price || 0) * 1000) / 1000),
    subOptionGroups: cloneOptionGroupsForDraft(choice.subOptionGroups || []),
  };
}

function cloneOptionGroupsForDraft(groups: MenuOptionGroup[]): MenuOptionGroup[] {
  return groups.map((group) => ({
    id: makeId("option_group"),
    name: group.name || "",
    nameAr: group.nameAr || "",
    required: group.required === true,
    multiple: group.multiple === true,
    choices: (group.choices || []).map((choice) => cloneOptionChoiceForDraft(choice)),
  }));
}

function findReusableOptionGroupTemplate(groups: MenuOptionGroup[], value: string) {
  const key = modifierMemoryKey(value);
  if (!key) return null;

  return groups.find((group) => modifierMemoryKey(group.name || "") === key || modifierMemoryKey(group.nameAr || "") === key) || null;
}

function findReusableOptionChoiceTemplate(choices: MenuOptionChoice[], value: string) {
  const key = modifierMemoryKey(value);
  if (!key) return null;

  return choices.find((choice) => modifierMemoryKey(choice.name || "") === key || modifierMemoryKey(choice.nameAr || "") === key) || null;
}

function cleanSelectedChoices(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== "object") return {};

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string[]>>((acc, [groupId, choices]) => {
    const cleanGroupId = String(groupId || "").trim();
    if (!cleanGroupId || !Array.isArray(choices)) return acc;

    const cleanChoices = choices.map((choice) => String(choice || "").trim()).filter(Boolean);
    if (cleanChoices.length) acc[cleanGroupId] = cleanChoices;
    return acc;
  }, {});
}

function normalizeCartCustomization(value?: Partial<CartCustomization>): CartCustomization {
  return {
    specialInstructions: String(value?.specialInstructions || "").slice(0, 240),
    selectedChoices: cleanSelectedChoices(value?.selectedChoices || {}),
  };
}

function cleanOrderModifiers(value: unknown): OrderModifier[] {
  let raw = value;

  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      raw = [];
    }
  }

  if (!Array.isArray(raw)) return [];

  return raw
    .map((modifier): OrderModifier | null => {
      const record = modifier as Partial<OrderModifier>;
      const choiceName = String(record.choiceName || "").trim();
      const groupName = String(record.groupName || "").trim();
      const parentChoiceName = String(record.parentChoiceName || "").trim();
      const price = Number(record.price || 0);

      if (!choiceName) return null;

      return {
        groupId: String(record.groupId || ""),
        groupName: groupName || "Option",
        choiceId: String(record.choiceId || ""),
        choiceName,
        price: Number.isFinite(price) ? Math.max(0, Math.round(price * 1000) / 1000) : 0,
        parentChoiceId: String(record.parentChoiceId || ""),
        parentChoiceName,
        level: Number(record.level || 0),
      };
    })
    .filter((modifier): modifier is OrderModifier => Boolean(modifier));
}

function getSelectedModifiersForItem(item: MenuItem, customization: CartCustomization): OrderModifier[] {
  const selectedChoices = cleanSelectedChoices(customization.selectedChoices);
  const modifiers: OrderModifier[] = [];

  function collect(groups: MenuOptionGroup[], parentChoice?: MenuOptionChoice, level = 0) {
    for (const group of groups || []) {
      const selectedIds = selectedChoices[group.id] || [];

      for (const choice of group.choices) {
        if (!selectedIds.includes(choice.id)) continue;

        modifiers.push({
          groupId: group.id,
          groupName: parentChoice ? `${parentChoice.name || "Choice"} / ${group.name || "Option"}` : (group.name || "Option"),
          choiceId: choice.id,
          choiceName: choice.name || choice.nameAr || "Choice",
          price: choice.price,
          parentChoiceId: parentChoice?.id || "",
          parentChoiceName: parentChoice?.name || "",
          level,
        });

        if (choice.subOptionGroups?.length) {
          collect(choice.subOptionGroups, choice, level + 1);
        }
      }
    }
  }

  collect(item.optionGroups || []);
  return modifiers;
}

function getModifiersTotal(modifiers: OrderModifier[]) {
  return Math.round(modifiers.reduce((sum, modifier) => sum + Number(modifier.price || 0), 0) * 1000) / 1000;
}

function formatOrderModifiers(modifiers: OrderModifier[]) {
  if (!modifiers.length) return "";

  return modifiers
    .map((modifier) => `${modifier.groupName}: ${modifier.choiceName}${modifier.price > 0 ? ` (+${money(modifier.price)})` : ""}`)
    .join(" • ");
}

function cleanMenuItemForStorage(item: MenuItem): MenuItem {
  return {
    ...item,
    imageThumbUrl: cleanPersistedImageUrl(item.imageThumbUrl),
    imageFullUrl: cleanPersistedImageUrl(item.imageFullUrl),
    optionGroups: cleanMenuOptionGroups(item.optionGroups),
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
    serviceItems: cleanServiceItems(nextState.serviceItems).map(serviceItemForStorage),
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
        serviceItems: cleanServiceItems(nextState.serviceItems).map(serviceItemForStorage),
        qrTokens: nextState.qrTokens,
        tableLabels: nextState.tableLabels,
        tableAutoModes: nextState.tableAutoModes,
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
        optionGroups: cleanMenuOptionGroups((item as MenuItem).optionGroups || []),
      })) : starterMenu,
      categories: parsed.categories || [],
      serviceItems: cleanServiceItems(parsed.serviceItems || defaultServiceItems).map(serviceItemForStorage),
      orders: (parsed.orders || []).map((order) => ({
        ...order,
        quantity: Math.max(1, Number(order.quantity || 1)),
        specialInstructions: String((order as Order).specialInstructions || ""),
        modifiers: cleanOrderModifiers((order as Order).modifiers || []),
        modifiersTotal: Number((order as Order).modifiersTotal || 0),
        basePrice: Number((order as Order).basePrice || order.price || 0),
        unitTotal: Number((order as Order).unitTotal || order.price || 0),
      })),
      qrTokens: parsed.qrTokens || {},
      tableLabels: parsed.tableLabels || {},
      tableAutoModes: parsed.tableAutoModes || {},
    };
  } catch {
    return defaultState;
  }
}

function makeQrToken(restaurantName: string, branchName: string, tableNumber: number) {
  const raw = `${slugify(restaurantName)}-${slugify(branchName)}-table-${tableNumber}-${Date.now()}-${Math.random()}`;
  return `twl_${btoa(raw).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`;
}

function cleanTableLabel(value: unknown) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 60);
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
    optionGroups: cleanMenuOptionGroups(row.option_groups || []),
  };
}

function rowToMenuCategory(row: CategoryRow): MenuCategory {
  return {
    id: row.id,
    name: row.name || "Category",
    nameAr: row.name_ar || "",
  };
}

function cleanServiceIcon(value: unknown, fallback: string) {
  return String(value || fallback)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase() || fallback;
}

function cleanServiceItems(value: unknown): ServiceItem[] {
  if (!Array.isArray(value)) return defaultServiceItems;

  const cleaned = value
    .map((item, index): ServiceItem | null => {
      const source = item as Partial<ServiceItem>;
      const name = String(source.name || "").trim();
      const nameAr = String(source.nameAr || "").trim();

      if (!name && !nameAr) return null;

      return {
        id: String(source.id || makeId("service_item")),
        name: name || nameAr,
        nameAr,
        icon: cleanServiceIcon(source.icon, menuIconFromName(name || nameAr || "Service")),
        imageUrl: String(source.imageUrl || "").trim(),
        active: source.active !== false,
        sortOrder: Number.isFinite(Number(source.sortOrder)) ? Number(source.sortOrder) : Date.now() - index,
      };
    })
    .filter((item): item is ServiceItem => Boolean(item));

  return cleaned.length ? cleaned : defaultServiceItems;
}

function serviceItemForStorage(item: ServiceItem): ServiceItem {
  return {
    ...item,
    imageUrl: cleanPersistedImageUrl(item.imageUrl),
  };
}

function rowToServiceItem(row: ServiceItemRow): ServiceItem {
  const name = row.item_name || "Service";
  return {
    id: row.id,
    name,
    nameAr: row.item_name_ar || "",
    icon: cleanServiceIcon(row.short_code, menuIconFromName(name)),
    imageUrl: String(row.image_url || "").trim(),
    active: row.active !== false,
    sortOrder: Number(row.sort_order || 0),
  };
}

function serviceItemToPayload(item: ServiceItem) {
  return {
    id: item.id,
    name: item.name.trim(),
    nameAr: item.nameAr.trim(),
    icon: cleanServiceIcon(item.icon, menuIconFromName(item.name || item.nameAr || "Service")),
    imageUrl: item.imageUrl.trim(),
    active: item.active !== false,
    sortOrder: Number(item.sortOrder || Date.now()),
  };
}



function rowToPrinterSetting(row: PrinterSettingRow): PrinterSetting {
  return {
    id: String(row.id || ""),
    printerName: String(row.printer_name || "Network Printer"),
    printerRole: String(row.printer_role || "kitchen"),
    printerIp: String(row.printer_ip || ""),
    printerPort: Math.max(1, Math.min(65535, Number(row.printer_port || 9100))),
    paperWidth: String(row.paper_width || "80mm"),
    autoPrint: row.auto_print !== false,
    copies: Math.max(1, Math.min(10, Number(row.copies || 1))),
    isActive: row.is_active !== false,
    createdAt: String(row.created_at || ""),
    updatedAt: String(row.updated_at || ""),
  };
}

function printerSettingToPayload(printer: PrinterSetting) {
  return {
    id: printer.id,
    printerName: printer.printerName.trim(),
    printerRole: printer.printerRole,
    printerIp: printer.printerIp.trim(),
    printerPort: Math.max(1, Math.min(65535, Number(printer.printerPort || 9100))),
    paperWidth: printer.paperWidth || "80mm",
    autoPrint: printer.autoPrint !== false,
    copies: Math.max(1, Math.min(10, Number(printer.copies || 1))),
    isActive: printer.isActive !== false,
  };
}

function isLikelyPrinterIp(value: string) {
  const clean = value.trim();
  if (!clean) return false;

  const parts = clean.split(".");
  if (parts.length !== 4) return false;

  return parts.every((part) => {
    if (!/^\d+$/.test(part)) return false;
    const number = Number(part);
    return number >= 0 && number <= 255;
  });
}

function getActiveServiceItems(items: ServiceItem[]) {
  const cleaned = cleanServiceItems(items);
  const active = cleaned.filter((item) => item.active !== false);

  return (active.length ? active : defaultServiceItems)
    .slice()
    .sort((a, b) => Number(b.sortOrder || 0) - Number(a.sortOrder || 0));
}

function rowToGuestName(row: TableGuestRow) {
  return (row.guest_name || "").trim();
}

function rowToTableSession(row: TableSessionRow): TableSession {
  const rawStatus = String(row.status || "pending").toLowerCase();
  const allowedStatuses = new Set(["pending", "active", "closed", "expired", "blocked"]);

  return {
    id: String(row.id || ""),
    businessId: String(row.business_account_id || ""),
    authUserId: String(row.auth_user_id || ""),
    tableNumber: Math.max(1, Math.min(999, Number(row.table_number || 1))),
    token: String(row.session_token || row.token || ""),
    status: (allowedStatuses.has(rawStatus) ? rawStatus : "pending") as TableSession["status"],
    guestName: String(row.guest_name || ""),
    createdAt: String(row.created_at || ""),
    updatedAt: String(row.updated_at || ""),
    lastSeenAt: String(row.last_seen_at || ""),
    approvedAt: String(row.approved_at || ""),
    closedAt: String(row.closed_at || ""),
    expiresAt: String(row.expires_at || ""),
    idleExpiresAt: String(row.idle_expires_at || ""),
    lastOrderAt: String(row.last_order_at || ""),
  };
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
    tableLabel: cleanTableLabel(row.table_label),
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
    specialInstructions: row.special_instructions || "",
    modifiers: cleanOrderModifiers(row.modifiers || []),
    modifiersTotal: Number(row.modifiers_total_jod || 0),
    basePrice: Number(row.base_price_jod || unitPrice || 0),
    unitTotal: Number(row.unit_total_jod || unitPrice || 0),
  };
}

function orderLineTotal(order: Order) {
  return Number(order.unitTotal || order.price || 0) * Math.max(1, Number(order.quantity || 1));
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
  service_status?: string | null;
  service_expires_at?: string | null;
  service_payment_due_date?: string | null;
  service_balance_due_jod?: number | string | null;
  service_monthly_fee_jod?: number | string | null;
  service_suspended_reason?: string | null;
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
    serviceStatus: row.service_status || fallback.serviceStatus || "active",
    serviceExpiresAt: String(row.service_expires_at || fallback.serviceExpiresAt || "").slice(0, 10),
    servicePaymentDueDate: String(row.service_payment_due_date || fallback.servicePaymentDueDate || "").slice(0, 10),
    serviceBalanceDueJod: Number(row.service_balance_due_jod ?? fallback.serviceBalanceDueJod ?? 0),
    serviceMonthlyFeeJod: Number(row.service_monthly_fee_jod ?? fallback.serviceMonthlyFeeJod ?? monthlyTableFee(row.table_count || fallback.tableCount || 25)),
    serviceSuspendedReason: row.service_suspended_reason || fallback.serviceSuspendedReason || "",
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
  username = "",
  sessionToken = ""
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
      sessionToken,
    }),
  });

  const result = await readApiJson(response);
  const rows = (result.guests || []) as TableGuestRow[];

  return uniqueGuestNames(rows.map((row) => rowToGuestName(row)));
}

async function startTableSessionInSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number,
  username = "",
  qrToken = ""
) {
  const response = await fetch("/api/table-sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessId,
      authUserId,
      username,
      table: tableNumber,
      qrToken,
    }),
  });

  const result = await readApiJson(response);
  return rowToTableSession((result.session || {}) as TableSessionRow);
}

async function fetchTableSessionsFromSupabase(
  businessId: string,
  username = ""
) {
  const params = new URLSearchParams({
    businessId,
    username,
    all: "1",
  });

  const headers = await getManagerAuthHeaders();

  const response = await fetch(`/api/table-sessions?${params.toString()}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.sessions || []) as TableSessionRow[];

  return rows.map((row) => rowToTableSession(row));
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
  tableLabel: string,
  guestName: string,
  cartLines: CartLine[],
  username = "",
  sessionToken = "",
  autoModePrintOnly = false
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
      tableLabel: cleanTableLabel(tableLabel),
      guestName,
      sessionToken,
      autoModePrintOnly,
      items: cartLines.map((line) => ({
        itemId: line.item.id,
        itemName: line.item.name,
        basePrice: line.item.price,
        price: line.unitTotal,
        addonsTotal: line.addonsTotal,
        quantity: line.quantity,
        specialInstructions: line.customization.specialInstructions,
        modifiers: line.selectedModifiers,
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

async function resetTableInSupabase(
  businessId: string,
  authUserId: string,
  tableNumber: number,
  username = ""
) {
  const response = await fetch("/api/table-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      businessId,
      authUserId,
      username,
      table: tableNumber,
    }),
  });

  const result = await readApiJson(response);

  return {
    clearedGuests: Number(result.clearedGuests || 0),
    clearedOrders: Number(result.clearedOrders || 0),
    table: Number(result.table || tableNumber),
  };
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

async function fetchServiceItemsFromSupabase(businessId: string, username = "") {
  const headers = await getManagerAuthHeaders();

  const params = new URLSearchParams({
    businessId,
    username: username || safeLoadState().profile.username || "",
  });

  const response = await fetch(`/api/service-items?${params.toString()}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.serviceItems || []) as ServiceItemRow[];

  return rows.map((row) => rowToServiceItem(row));
}

async function saveServiceItemToSupabase(businessId: string, item: ServiceItem, username = "") {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/service-items", {
    method: item.id && isUuid(item.id) ? "PATCH" : "POST",
    headers,
    body: JSON.stringify({
      businessId,
      username: username || safeLoadState().profile.username || "",
      itemId: item.id,
      item: serviceItemToPayload(item),
    }),
  });

  const result = await readApiJson(response);
  return rowToServiceItem(result.item as ServiceItemRow);
}

async function deleteServiceItemFromSupabase(businessId: string, itemId: string, username = "") {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/service-items", {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      businessId,
      username: username || safeLoadState().profile.username || "",
      itemId,
    }),
  });

  await readApiJson(response);
}



async function fetchPrinterSettingsFromSupabase(businessId: string, username = "") {
  const headers = await getManagerAuthHeaders();
  const params = new URLSearchParams({
    businessId,
    username: username || safeLoadState().profile.username || "",
  });

  const response = await fetch(`/api/printer-settings?${params.toString()}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  const rows = (result.printers || []) as PrinterSettingRow[];

  return rows.map((row) => rowToPrinterSetting(row));
}

async function savePrinterSettingToSupabase(businessId: string, printer: PrinterSetting, username = "") {
  const headers = await getManagerAuthHeaders();
  const response = await fetch("/api/printer-settings", {
    method: printer.id && isUuid(printer.id) ? "PATCH" : "POST",
    headers,
    body: JSON.stringify({
      businessId,
      username: username || safeLoadState().profile.username || "",
      printerId: printer.id,
      printer: printerSettingToPayload(printer),
    }),
  });

  const result = await readApiJson(response);
  return rowToPrinterSetting(result.printer as PrinterSettingRow);
}

async function deletePrinterSettingFromSupabase(businessId: string, printerId: string, username = "") {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/printer-settings", {
    method: "DELETE",
    headers,
    body: JSON.stringify({
      businessId,
      username: username || safeLoadState().profile.username || "",
      printerId,
    }),
  });

  await readApiJson(response);
}

function rowToPlatformBusiness(row: Record<string, unknown>): PlatformAdminBusiness {
  const tableCount = Number(row.table_count || 25);
  const monthlyFee = Number(row.service_monthly_fee_jod || monthlyTableFee(tableCount));

  return {
    id: String(row.id || ""),
    username: String(row.username || ""),
    restaurantName: String(row.restaurant_name || "Restaurant"),
    branchName: String(row.branch_name || "Main Branch"),
    email: String(row.email || ""),
    phone: String(row.business_phone || ""),
    tableCount,
    locationCount: Number(row.location_count || 0),
    createdAt: String(row.created_at || ""),
    serviceStatus: String(row.service_status || "active"),
    serviceExpiresAt: String(row.service_expires_at || ""),
    servicePaymentDueDate: String(row.service_payment_due_date || ""),
    serviceBalanceDueJod: Math.max(Number(row.service_balance_due_jod || 0), monthlyFee),
    serviceMonthlyFeeJod: monthlyFee,
    serviceSuspendedReason: String(row.service_suspended_reason || ""),
    serviceAdminNote: String(row.service_admin_note || ""),
  };
}

function rowToCliqPaymentRequest(row: Record<string, unknown>): CliqPaymentRequest {
  return {
    id: String(row.id || ""),
    businessId: String(row.business_account_id || ""),
    username: String(row.username || ""),
    restaurantName: String(row.restaurant_name || "Restaurant"),
    branchName: String(row.branch_name || "Main Branch"),
    months: Number(row.months || 1),
    monthlyFeeJod: Number(row.monthly_fee_jod || 0),
    amountJod: Number(row.amount_jod || 0),
    paymentDueDate: String(row.payment_due_date || ""),
    referenceNumber: String(row.reference_number || ""),
    senderCliqName: String(row.sender_cliq_name || ""),
    senderCliqPhone: String(row.sender_cliq_phone || ""),
    status: String(row.status || "pending"),
    createdAt: String(row.created_at || ""),
  };
}

function rowToPlatformSalesperson(row: Record<string, unknown>): PlatformSalesperson {
  return {
    id: String(row.id || ""),
    username: String(row.username || ""),
    fullName: String(row.full_name || ""),
    phone: String(row.phone || ""),
    active: row.active !== false,
    createdAt: String(row.created_at || ""),
  };
}

function rowToCompanyReportSummary(row: Record<string, unknown>): CompanyReportSummary {
  return {
    month: String(row.month || currentYearMonth()),
    totalBusinesses: Number(row.totalBusinesses || 0),
    activeBusinesses: Number(row.activeBusinesses || 0),
    trialBusinesses: Number(row.trialBusinesses || 0),
    suspendedBusinesses: Number(row.suspendedBusinesses || 0),
    newAccountsMonth: Number(row.newAccountsMonth || 0),
    newAccountsYtd: Number(row.newAccountsYtd || 0),
    monthlyRecurringJod: Number(row.monthlyRecurringJod || 0),
    monthlyRecurringAddedJod: Number(row.monthlyRecurringAddedJod || 0),
    ytdMonthlyRecurringAddedJod: Number(row.ytdMonthlyRecurringAddedJod || 0),
    monthlyCollectedJod: Number(row.monthlyCollectedJod || 0),
    ytdCollectedJod: Number(row.ytdCollectedJod || 0),
    totalBalanceDueJod: Number(row.totalBalanceDueJod || 0),
  };
}

function rowToSalespersonMonthlyReport(row: Record<string, unknown>): SalespersonMonthlyReport {
  return {
    salespersonId: String(row.salespersonId || ""),
    username: String(row.username || ""),
    fullName: String(row.fullName || ""),
    phone: String(row.phone || ""),
    active: row.active !== false,
    newAccountsMonth: Number(row.newAccountsMonth || 0),
    newAccountsYtd: Number(row.newAccountsYtd || 0),
    portfolioBusinesses: Number(row.portfolioBusinesses || 0),
    portfolioMonthlyRecurringJod: Number(row.portfolioMonthlyRecurringJod || 0),
    monthlyRecurringAddedJod: Number(row.monthlyRecurringAddedJod || 0),
    ytdMonthlyRecurringAddedJod: Number(row.ytdMonthlyRecurringAddedJod || 0),
    monthlyCollectedJod: Number(row.monthlyCollectedJod || 0),
    ytdCollectedJod: Number(row.ytdCollectedJod || 0),
    totalBalanceDueJod: Number(row.totalBalanceDueJod || 0),
  };
}

function rowToPlatformReports(row: Record<string, unknown>): PlatformReports {
  const company = rowToCompanyReportSummary((row.company || {}) as Record<string, unknown>);
  const salespeople = Array.isArray(row.salespeople)
    ? (row.salespeople as Record<string, unknown>[]).map((item) => rowToSalespersonMonthlyReport(item))
    : [];

  return {
    month: String(row.month || company.month || currentYearMonth()),
    generatedAt: String(row.generatedAt || ""),
    company,
    salespeople,
  };
}

async function getPlatformAdminHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!supabase) return headers;

  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token || "";

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchPlatformBusinessesFromServer() {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/platform-admin/businesses", {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  return ((result.businesses || []) as Record<string, unknown>[]).map((row) => rowToPlatformBusiness(row));
}

async function fetchCliqPaymentsForAdmin() {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/cliq-payments", {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  return ((result.payments || []) as Record<string, unknown>[]).map((row) => rowToCliqPaymentRequest(row));
}

async function fetchPlatformSalespeopleForAdmin() {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/platform-admin/salespeople", {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  return ((result.salespeople || []) as Record<string, unknown>[]).map((row) => rowToPlatformSalesperson(row));
}

async function fetchPlatformReportsForAdmin(month: string) {
  const headers = await getPlatformAdminHeaders();
  const params = new URLSearchParams();

  if (month) params.set("month", month);

  const response = await fetch(`/api/platform-admin/reports?${params.toString()}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const result = await readApiJson(response);
  return rowToPlatformReports(result.report as Record<string, unknown>);
}

async function createPlatformSalespersonInServer(payload: {
  username: string;
  fullName: string;
  phone: string;
}) {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/platform-admin/salespeople", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const result = await readApiJson(response);
  return rowToPlatformSalesperson(result.salesperson as Record<string, unknown>);
}

async function submitCliqPaymentToServer(payload: {
  businessId: string;
  username: string;
  months: number;
  monthlyFeeJod: number;
  amountJod: number;
  paymentDueDate: string;
  referenceNumber: string;
  senderCliqName: string;
  senderCliqPhone: string;
}) {
  const headers = await getManagerAuthHeaders();

  const response = await fetch("/api/cliq-payments", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const result = await readApiJson(response);
  return rowToCliqPaymentRequest(result.payment as Record<string, unknown>);
}

async function updatePlatformBusinessInServer(business: PlatformAdminBusiness) {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/platform-admin/businesses", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      businessId: business.id,
      serviceStatus: business.serviceStatus,
      serviceExpiresAt: business.serviceExpiresAt || null,
      servicePaymentDueDate: business.servicePaymentDueDate || null,
      serviceBalanceDueJod: Math.max(Number(business.serviceBalanceDueJod || 0), Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount))),
      serviceMonthlyFeeJod: Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount)),
      serviceSuspendedReason: business.serviceSuspendedReason,
      serviceAdminNote: business.serviceAdminNote,
    }),
  });

  const result = await readApiJson(response);
  return rowToPlatformBusiness(result.business as Record<string, unknown>);
}

async function markPlatformBusinessPaidInServer(payload: {
  businessId: string;
  paidAmountJod: number;
}) {
  const headers = await getPlatformAdminHeaders();

  const response = await fetch("/api/platform-admin/businesses", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      action: "markPaid",
      businessId: payload.businessId,
      paidAmountJod: payload.paidAmountJod,
    }),
  });

  const result = await readApiJson(response);

  return {
    business: rowToPlatformBusiness(result.business as Record<string, unknown>),
    payment: result.payment ? rowToCliqPaymentRequest(result.payment as Record<string, unknown>) : null,
    monthsPaid: Number(result.monthsPaid || 1),
    expiresAt: String(result.expiresAt || ""),
  };
}

export default function Page() {
  const [state, setState] = useState<AppState>(defaultState);
  const [loaded, setLoaded] = useState(false);
  const [phoneTab, setPhoneTab] = useState<"menu" | "bill" | "service">("menu");
  const [managerTab, setManagerTab] = useState<"kitchen" | "waiter" | "tables" | "menu" | "menuBuilder" | "qr" | "profile">("kitchen");
  const [authTab, setAuthTab] = useState<"login" | "signup" | "platformAdmin">("signup");
  const [guestName, setGuestName] = useState("");
  const [namePromptError, setNamePromptError] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const [orderCart, setOrderCart] = useState<Record<string, number>>({});
  const [orderCustomizations, setOrderCustomizations] = useState<Record<string, CartCustomization>>({});
  const [orderReviewOpen, setOrderReviewOpen] = useState(false);
  const [orderSendBusy, setOrderSendBusy] = useState(false);
  const [orderSendError, setOrderSendError] = useState("");
  const [kitchenBellEnabled, setKitchenBellEnabled] = useState(false);
  const kitchenBellPrimedRef = useRef(false);
  const lastKitchenNewOrderIdsRef = useRef<Set<string>>(new Set());
  const [signupProfile, setSignupProfile] = useState<Profile>(defaultState.profile);
  const [signupSource, setSignupSource] = useState<"" | "self" | "salesperson">("");
  const [signupSalespersonUsername, setSignupSalespersonUsername] = useState("");
  const [activeLocationTab, setActiveLocationTab] = useState(0);
  const [authBusy, setAuthBusy] = useState(false);
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [platformAdminEmail, setPlatformAdminEmail] = useState("");
  const [platformAdminPassword, setPlatformAdminPassword] = useState("");
  const [platformAdminNewPassword, setPlatformAdminNewPassword] = useState("");
  const [platformAdminConfirmPassword, setPlatformAdminConfirmPassword] = useState("");
  const [platformAdminPasswordBusy, setPlatformAdminPasswordBusy] = useState(false);
  const [platformAdminLoggedIn, setPlatformAdminLoggedIn] = useState(false);
  const [platformAdminBusinesses, setPlatformAdminBusinesses] = useState<PlatformAdminBusiness[]>([]);
  const [platformAdminPayments, setPlatformAdminPayments] = useState<CliqPaymentRequest[]>([]);
  const [platformSalespeople, setPlatformSalespeople] = useState<PlatformSalesperson[]>([]);
  const [platformReports, setPlatformReports] = useState<PlatformReports | null>(null);
  const [reportMonth, setReportMonth] = useState(currentYearMonth());
  const [reportCommissionRate, setReportCommissionRate] = useState(10);
  const [platformReportBusy, setPlatformReportBusy] = useState(false);
  const [salespersonModalOpen, setSalespersonModalOpen] = useState(false);
  const [salespersonDraftUsername, setSalespersonDraftUsername] = useState("");
  const [salespersonDraftName, setSalespersonDraftName] = useState("");
  const [salespersonDraftPhone, setSalespersonDraftPhone] = useState("");
  const [salespersonBusy, setSalespersonBusy] = useState(false);
  const [platformAdminBusy, setPlatformAdminBusy] = useState(false);
  const [platformAdminMessage, setPlatformAdminMessage] = useState("");
  const [cliqPayOpen, setCliqPayOpen] = useState(false);
  const [cliqMonths, setCliqMonths] = useState(1);
  const [cliqReferenceNumber, setCliqReferenceNumber] = useState("");
  const [cliqSenderName, setCliqSenderName] = useState("");
  const [cliqSenderPhone, setCliqSenderPhone] = useState("");
  const [cliqPayBusy, setCliqPayBusy] = useState(false);
  const [cliqPayMessage, setCliqPayMessage] = useState("");
  const [qrInput, setQrInput] = useState(String(DEMO_TABLE));
  const [qrLabelInput, setQrLabelInput] = useState("");
  const [qrAutoModeInput, setQrAutoModeInput] = useState(false);
  const [menuDraft, setMenuDraft] = useState<MenuDraft>(emptyMenuDraft);
  const menuBuilderFormRef = useRef<HTMLDivElement | null>(null);
  const [editingMenuItemId, setEditingMenuItemId] = useState("");
  const [categoryDraft, setCategoryDraft] = useState({ name: "", nameAr: "" });
  const [activeMenuCategory, setActiveMenuCategory] = useState("all");
  const [menuBuilderSearch, setMenuBuilderSearch] = useState("");
  const [expandedMenuCategories, setExpandedMenuCategories] = useState<Record<string, boolean>>({});
  const [imageBusy, setImageBusy] = useState(false);
  const [menuBusy, setMenuBusy] = useState(false);
  const [resettingTable, setResettingTable] = useState<number | null>(null);
  const [serviceItemDraft, setServiceItemDraft] = useState<ServiceItem>(emptyServiceItemDraft);
  const [serviceItemBusy, setServiceItemBusy] = useState(false);

  const [printerSettings, setPrinterSettings] = useState<PrinterSetting[]>([]);
  const [printerDraft, setPrinterDraft] = useState<PrinterSetting>(emptyPrinterDraft);
  const [printerBusy, setPrinterBusy] = useState(false);
  const [printerMessage, setPrinterMessage] = useState("");
  const printersLoadedKeyRef = useRef("");
  const [selectedMenuImage, setSelectedMenuImage] = useState<MenuItem | null>(null);
  const [customerBgImageUrl, setCustomerBgImageUrl] = useState("");
  const [toast, setToast] = useState("");
  const [publicTableMode, setPublicTableMode] = useState(false);
  const publicCustomerMode = publicTableMode;
  const [publicTableError, setPublicTableError] = useState("");
  const [publicSuspension, setPublicSuspension] = useState<PublicSuspension>({
    suspended: false,
    message: "",
    paymentDueDate: "",
    balanceDueJod: 0,
  });
  const [tableSession, setTableSession] = useState<TableSession | null>(null);
  const [tableSessions, setTableSessions] = useState<TableSession[]>([]);
  const [tableSessionMessage, setTableSessionMessage] = useState("");
  const tableSessionLoadedKeyRef = useRef("");
  const [activeTable, setActiveTable] = useState(DEMO_TABLE);
  const [tableSortMode, setTableSortMode] = useState<"number" | "active" | "needsHelp" | "openOrders" | "billHigh" | "empty">("number");

  useEffect(() => {
    let mounted = true;

    async function boot() {
      const params = new URLSearchParams(window.location.search);
      const adminMode = params.get("admin") === "1" || params.has("admin");

      if (adminMode) {
        setPublicTableMode(false);
        setTableSession(null);
        setTableSessionMessage("");
        setAuthTab("platformAdmin");
        setState(defaultState);
        setSignupProfile(defaultState.profile);
        setLoaded(true);
        return;
      }

      const qrMode = params.get("mode") === "table" || params.has("table") || params.has("token") || params.has("businessId") || params.has("username");
      const businessId = params.get("businessId") || params.get("business") || "";
      const username = params.get("username") || "";
      const restaurantSlug = params.get("restaurant") || "";
      const tableNumber = Math.max(1, Math.min(999, Number(params.get("table") || DEMO_TABLE)));
      const tableLabel = cleanTableLabel(params.get("tableLabel") || params.get("label") || "");
      const autoModeFromQr = params.get("autoMode") === "1" || params.get("auto") === "1";
      const token = params.get("token") || "";

      if (qrMode) {
        setPublicTableMode(true);
        setTableSession(null);
        setTableSessionMessage("");
        setActiveTable(tableNumber);
        setPhoneTab("menu");

        try {
          const query = new URLSearchParams({
            businessId,
            username,
            restaurant: restaurantSlug,
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
          const serviceItemRows = (result.serviceItems || []) as ServiceItemRow[];

          setPublicSuspension({
            suspended: result.suspended === true,
            message: String(result.suspensionMessage || "Service suspended. Please make a payment to restore service."),
            paymentDueDate: String(result.paymentDueDate || business.service_payment_due_date || ""),
            balanceDueJod: Number(result.balanceDueJod || business.service_balance_due_jod || 0),
          });

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
            serviceStatus: business.service_status || "active",
            serviceExpiresAt: String(business.service_expires_at || "").slice(0, 10),
            servicePaymentDueDate: String(business.service_payment_due_date || "").slice(0, 10),
            serviceBalanceDueJod: Number(business.service_balance_due_jod || 0),
            serviceMonthlyFeeJod: Number(business.service_monthly_fee_jod || monthlyTableFee(Number(business.table_count || 25))),
            serviceSuspendedReason: business.service_suspended_reason || "",
          };

          if (!mounted) return;

          setState({
            ...defaultState,
            profileComplete: true,
            profile: nextProfile,
            menu: menuRows.map((row) => rowToMenuItem(row)),
            categories: categoryRows.map((row) => rowToMenuCategory(row)),
            serviceItems: serviceItemRows.length ? serviceItemRows.map((row) => rowToServiceItem(row)) : defaultServiceItems,
            guests: mergeGuestLists(
              uniqueGuestNames(guestRows.map((row) => rowToGuestName(row))),
              readCachedTableGuests(nextProfile.businessId, tableNumber)
            ),
            orders: orderRows.map((row) => rowToOrder(row)),
            qrTokens: token ? { [String(tableNumber)]: token } : {},
            tableLabels: tableLabel ? { [String(tableNumber)]: tableLabel } : {},
            tableAutoModes: autoModeFromQr ? { [String(tableNumber)]: true } : {},
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

          setPublicSuspension({
            suspended: false,
            message: "",
            paymentDueDate: "",
            balanceDueJod: 0,
          });
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
      setQrLabelInput(cleanTableLabel(loadedState.tableLabels?.[String(loadedState.lastQrTable || DEMO_TABLE)] || ""));
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
    if (!loaded || publicTableMode || !state.profileComplete || !state.profile.businessId) return;

    const key = state.profile.businessId;
    if (printersLoadedKeyRef.current === key) return;

    printersLoadedKeyRef.current = key;
    void refreshPrinterSettingsNow(false);
  }, [loaded, publicTableMode, state.profileComplete, state.profile.businessId]);

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

        if (!savedGuests.length) {
          writeCachedTableGuests(state.profile.businessId, activeTable, []);

          updateState((current) => ({
            ...current,
            currentGuest: "",
            guests: [],
          }));

          setOrderCart({});
          setOrderCustomizations({});
          setOrderReviewOpen(false);
          setPhoneTab("menu");
          setActiveMenuCategory("__home");
          return;
        }

        const cachedGuests = readCachedTableGuests(state.profile.businessId, activeTable);
        const mergedGuests = mergeGuestLists(savedGuests, cachedGuests);

        writeCachedTableGuests(state.profile.businessId, activeTable, mergedGuests);

        updateState((current) => ({
          ...current,
          guests: mergedGuests,
          currentGuest: current.currentGuest && mergedGuests.includes(current.currentGuest) ? current.currentGuest : "",
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
    if (!publicCustomerMode || !state.profile.businessId || !state.profile.authUserId || publicSuspension.suspended) return;

    let cancelled = false;

    async function refreshTableSession() {
      const qrToken = new URLSearchParams(window.location.search).get("token") || "";
      const sessionKey = `${state.profile.businessId}:${activeTable}:${qrToken}`;

      try {
        const session = await startTableSessionInSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          activeTable,
          state.profile.username,
          qrToken
        );

        if (cancelled) return;

        tableSessionLoadedKeyRef.current = sessionKey;
        setTableSession(session);

        if (session.status === "pending") {
          setTableSessionMessage("");
        } else if (session.status === "active") {
          setTableSessionMessage("");
        } else {
          setTableSessionMessage("This table session expired. Please scan the table QR again or ask the waiter to reset the table.");
        }
      } catch (error) {
        if (cancelled) return;
        const message = getErrorMessage(error);
        setTableSessionMessage(message);
        console.error("Table session refresh failed", error);
      }
    }

    void refreshTableSession();

    const interval = window.setInterval(() => {
      void refreshTableSession();
    }, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [publicCustomerMode, state.profile.businessId, state.profile.authUserId, state.profile.username, activeTable, publicSuspension.suspended]);

  useEffect(() => {
    if (publicCustomerMode || !state.profile.businessId || !state.profileComplete) return;

    let cancelled = false;

    async function refreshTableSessions() {
      try {
        const sessions = await fetchTableSessionsFromSupabase(
          state.profile.businessId,
          state.profile.username
        );

        if (cancelled) return;
        setTableSessions(sessions);
      } catch (error) {
        console.error("Table session dashboard refresh failed", error);
      }
    }

    void refreshTableSessions();

    const interval = window.setInterval(() => {
      void refreshTableSessions();
    }, 7000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [publicCustomerMode, state.profile.businessId, state.profile.username, state.profileComplete]);

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

  const autoBalanceDueJod = automaticBalanceDueJod(state.profile);
  const cliqMonthlyFeeJod = Number(state.profile.serviceMonthlyFeeJod || monthlyTableFee(state.profile.tableCount));
  const cliqPaymentAmountJod = cliqAmountForMonths(state.profile, cliqMonths);
  const pendingCliqPayments = platformAdminPayments.filter((payment) => payment.status === "pending");

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

        const customization = normalizeCartCustomization(orderCustomizations[itemId]);
        const selectedModifiers = getSelectedModifiersForItem(item, customization);
        const addonsTotal = getModifiersTotal(selectedModifiers);
        const unitTotal = Math.round((item.price + addonsTotal) * 1000) / 1000;

        return {
          item,
          quantity: cleanQuantity,
          customization,
          selectedModifiers,
          addonsTotal,
          unitTotal,
          lineTotal: Math.round(unitTotal * cleanQuantity * 1000) / 1000,
        };
      })
      .filter((line): line is CartLine => Boolean(line));
  }, [orderCart, orderCustomizations, state.menu]);

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

  const modifierMemory = useMemo(() => {
    const optionGroupMap = new Map<string, MenuOptionGroup>();
    const subOptionGroupMap = new Map<string, MenuOptionGroup>();
    const optionChoiceMap = new Map<string, MenuOptionChoice>();
    const subOptionChoiceMap = new Map<string, MenuOptionChoice>();

    const rememberGroup = (group: MenuOptionGroup, nested: boolean): void => {
      const key = modifierMemoryKey(group.name || group.nameAr || "");
      if (!key) return;

      const targetMap = nested ? subOptionGroupMap : optionGroupMap;
      if (!targetMap.has(key)) {
        targetMap.set(key, {
          ...group,
          choices: (group.choices || []).map((choice) => ({
            ...choice,
            subOptionGroups: draftMenuOptionGroups(choice.subOptionGroups || []),
          })),
        });
      }
    };

    const rememberChoice = (choice: MenuOptionChoice, nested: boolean): void => {
      const key = modifierMemoryKey(choice.name || choice.nameAr || "");
      if (!key) return;

      const targetMap = nested ? subOptionChoiceMap : optionChoiceMap;
      if (!targetMap.has(key)) {
        targetMap.set(key, {
          ...choice,
          price: Math.max(0, Math.round(Number(choice.price || 0) * 1000) / 1000),
          subOptionGroups: draftMenuOptionGroups(choice.subOptionGroups || []),
        });
      }
    };

    const walkGroups = (groups: MenuOptionGroup[], nested: boolean): void => {
      draftMenuOptionGroups(groups).forEach((group) => {
        rememberGroup(group, nested);

        group.choices.forEach((choice) => {
          rememberChoice(choice, nested);
          walkGroups(choice.subOptionGroups || [], true);
        });
      });
    };

    state.menu.forEach((item) => walkGroups(item.optionGroups || [], false));

    return {
      optionGroups: Array.from(optionGroupMap.values()),
      subOptionGroups: Array.from(subOptionGroupMap.values()),
      optionChoices: Array.from(optionChoiceMap.values()),
      subOptionChoices: Array.from(subOptionChoiceMap.values()),
    };
  }, [state.menu]);

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
        const sortedOrders = [...(orders as Order[])].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const first = sortedOrders[0];

        return {
          key,
          orderTicketId: first.orderTicketId,
          ticketNumber: first.ticketNumber,
          table: first.table,
          tableLabel: first.tableLabel,
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
  const selectedQrTableLabel = cleanTableLabel(state.tableLabels[String(selectedQrTable)] || "");
  const selectedQrAutoMode = state.tableAutoModes[String(selectedQrTable)] === true;
  const activeTableAutoMode = state.tableAutoModes[String(activeTable)] === true;
  const activeTableLabel = cleanTableLabel(state.tableLabels[String(activeTable)] || "");
  const tableDisplayName = (tableNumber: number, label = "") => cleanTableLabel(label || state.tableLabels[String(tableNumber)] || "") || `Table ${tableNumber}`;
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

  const selectedTableOrders = state.orders.filter((order) => Number(order.table || activeTable) === activeTable);
  const selectedTableTotal = selectedTableOrders.reduce((sum, order) => sum + orderLineTotal(order), 0);
  const selectedTableOpenOrderCount = selectedTableOrders.filter((order) => order.status !== "Served").length;
  const selectedTableBillByGuest = selectedTableOrders.reduce<Record<string, Order[]>>((acc, order) => {
    acc[order.guest] = acc[order.guest] || [];
    acc[order.guest].push(order);
    return acc;
  }, {});
  const selectedPendingSession = tableSessions.find((session) => session.tableNumber === activeTable && session.status === "pending") || null;
  const selectedLiveSession = tableSessions.find((session) => session.tableNumber === activeTable && session.status === "active") || null;

  const tableDashboardRows = useMemo(() => {
    return Array.from({ length: state.profile.tableCount }, (_, index) => {
      const tableNumber = index + 1;
      const tableOrders = state.orders.filter((order) => Number(order.table || activeTable) === tableNumber);
      const tableOpenOrders = tableOrders.filter((order) => order.status !== "Served").length;
      const tableBillTotal = tableOrders.reduce((sum, order) => sum + orderLineTotal(order), 0);
      const tableGuestsFromOrders = uniqueGuestNames(tableOrders.map((order) => order.guest));
      const tableGuestCount = tableNumber === activeTable && state.guests.length
        ? uniqueGuestNames(state.guests).length
        : tableGuestsFromOrders.length;
      const needsHelp = waitingRequests.some((request) => Number(request.table || activeTable) === tableNumber);
      const pendingSession = tableSessions.find((session) => session.tableNumber === tableNumber && session.status === "pending") || null;
      const liveSession = tableSessions.find((session) => session.tableNumber === tableNumber && session.status === "active") || null;
      const active = Boolean(tableGuestCount > 0 || tableOpenOrders > 0 || tableBillTotal > 0 || pendingSession || liveSession);

      return {
        tableNumber,
        tableOrders,
        tableOpenOrders,
        tableBillTotal,
        tableGuestCount,
        pendingSession,
        liveSession,
        needsHelp,
        active,
      };
    }).sort((a, b) => {
      if (tableSortMode === "active") {
        if (Number(b.active) !== Number(a.active)) return Number(b.active) - Number(a.active);
        if (b.tableOpenOrders !== a.tableOpenOrders) return b.tableOpenOrders - a.tableOpenOrders;
        if (b.tableBillTotal !== a.tableBillTotal) return b.tableBillTotal - a.tableBillTotal;
        return a.tableNumber - b.tableNumber;
      }

      if (tableSortMode === "needsHelp") {
        if (Number(b.needsHelp) !== Number(a.needsHelp)) return Number(b.needsHelp) - Number(a.needsHelp);
        if (Number(b.active) !== Number(a.active)) return Number(b.active) - Number(a.active);
        return a.tableNumber - b.tableNumber;
      }

      if (tableSortMode === "openOrders") {
        if (b.tableOpenOrders !== a.tableOpenOrders) return b.tableOpenOrders - a.tableOpenOrders;
        if (Number(b.active) !== Number(a.active)) return Number(b.active) - Number(a.active);
        return a.tableNumber - b.tableNumber;
      }

      if (tableSortMode === "billHigh") {
        if (b.tableBillTotal !== a.tableBillTotal) return b.tableBillTotal - a.tableBillTotal;
        if (Number(b.active) !== Number(a.active)) return Number(b.active) - Number(a.active);
        return a.tableNumber - b.tableNumber;
      }

      if (tableSortMode === "empty") {
        if (Number(a.active) !== Number(b.active)) return Number(a.active) - Number(b.active);
        return a.tableNumber - b.tableNumber;
      }

      return a.tableNumber - b.tableNumber;
    });
  }, [activeTable, state.guests, state.orders, state.profile.tableCount, tableSortMode, waitingRequests, tableSessions]);

  const activeTableDashboardCount = tableDashboardRows.filter((row) => row.active).length;

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
      `Location: ${tableDisplayName(ticket.table, ticket.tableLabel)}`,
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

      const [savedMenu, savedCategories, savedServiceItems] = repairedProfile.businessId
        ? await Promise.all([
            fetchMenuItemsFromSupabase(repairedProfile.businessId),
            fetchMenuCategoriesFromSupabase(repairedProfile.businessId),
            fetchServiceItemsFromSupabase(repairedProfile.businessId, repairedProfile.username),
          ])
        : [[], [], defaultServiceItems];

      updateState((current) => ({
        ...current,
        profile: {
          ...current.profile,
          ...repairedProfile,
          logoDataUrl: repairedProfile.logoDataUrl || current.profile.logoDataUrl,
        },
        menu: savedMenu.length ? savedMenu : current.menu,
        categories: savedCategories,
        serviceItems: savedServiceItems.length ? savedServiceItems : current.serviceItems,
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
      const [savedMenu, savedCategories, savedServiceItems] = await Promise.all([
        fetchMenuItemsFromSupabase(managerProfile.businessId),
        fetchMenuCategoriesFromSupabase(managerProfile.businessId),
        fetchServiceItemsFromSupabase(managerProfile.businessId, managerProfile.username),
      ]);
      updateState((current) => ({
        ...current,
        menu: savedMenu,
        categories: savedCategories,
        serviceItems: savedServiceItems.length ? savedServiceItems : current.serviceItems,
      }));
      show("Menu, categories, and waiter buttons loaded from Supabase");
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

    const tableLabel = cleanTableLabel(state.tableLabels[String(tableNumber)] || "");
    if (tableLabel) params.set("tableLabel", tableLabel);

    if (state.tableAutoModes[String(tableNumber)] === true) {
      params.set("autoMode", "1");
    }

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

    if (!signupSource) {
      show("Choose whether you are signing up yourself or signing up through a salesperson");
      return;
    }

    if (signupSource === "salesperson" && !normalizeUsername(signupSalespersonUsername)) {
      show("Salesperson username is required");
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

    const cleanTableCount = Math.max(25, Math.min(999, Number(signupProfile.tableCount || 25)));
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
          signupSource,
          salespersonUsername: signupSource === "salesperson" ? normalizeUsername(signupSalespersonUsername) : "",
          restaurantName: cleanName,
          branchName: cleanBranch,
          businessType: signupProfile.businessType,
          businessPhone: cleanPhone,
          tableCount: cleanTableCount,
          serviceMonthlyFeeJod: monthlyTableFee(cleanTableCount),
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
        serviceStatus: result.business?.service_status || "trial",
        serviceExpiresAt: String(result.business?.service_expires_at || "").slice(0, 10),
        servicePaymentDueDate: String(result.business?.service_payment_due_date || "").slice(0, 10),
        serviceBalanceDueJod: Number(result.business?.service_balance_due_jod || 0),
        serviceMonthlyFeeJod: Number(result.business?.service_monthly_fee_jod || monthlyTableFee(cleanTableCount)),
        serviceSuspendedReason: result.business?.service_suspended_reason || "",
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

      const [savedMenu, savedServiceItems] = business.id
        ? await Promise.all([
            fetchMenuItemsFromSupabase(business.id),
            fetchServiceItemsFromSupabase(business.id, business.username || cleanUsername),
          ])
        : [[], defaultServiceItems];

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
        serviceStatus: business.service_status || "active",
        serviceExpiresAt: String(business.service_expires_at || "").slice(0, 10),
        servicePaymentDueDate: String(business.service_payment_due_date || "").slice(0, 10),
        serviceBalanceDueJod: Number(business.service_balance_due_jod || 0),
        serviceMonthlyFeeJod: Number(business.service_monthly_fee_jod || monthlyTableFee(Number(business.table_count || 25))),
        serviceSuspendedReason: business.service_suspended_reason || "",
      };

      updateState((current) => ({
        ...current,
        profileComplete: true,
        profile: nextProfile,
        menu: savedMenu,
        serviceItems: savedServiceItems.length ? savedServiceItems : defaultServiceItems,
      }));

      setManagerTab("kitchen");
      show(savedMenu.length ? "Logged in and menu loaded" : "Logged in with username");
    } catch {
      show("Login failed. Check Supabase setup.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function loadPlatformAdminBusinesses() {
    setPlatformAdminBusy(true);
    setPlatformAdminMessage("");

    try {
      const [businesses, payments, salespeople, reports] = await Promise.all([
        fetchPlatformBusinessesFromServer(),
        fetchCliqPaymentsForAdmin(),
        fetchPlatformSalespeopleForAdmin(),
        fetchPlatformReportsForAdmin(reportMonth),
      ]);
      setPlatformAdminBusinesses(businesses);
      setPlatformAdminPayments(payments);
      setPlatformSalespeople(salespeople);
      setPlatformReports(reports);
      setPlatformAdminLoggedIn(true);
      setPlatformAdminMessage(`${businesses.length} companies loaded • ${payments.length} CliQ payment notification${payments.length === 1 ? "" : "s"} • ${salespeople.length} salesperson${salespeople.length === 1 ? "" : "s"}`);
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Admin load failed: ${getErrorMessage(error)}`);
    } finally {
      setPlatformAdminBusy(false);
    }
  }

  async function platformAdminLogin(event: FormEvent) {
    event.preventDefault();

    if (!supabase) {
      setPlatformAdminMessage("Supabase is not configured");
      return;
    }

    if (!platformAdminEmail.trim() || !platformAdminPassword) {
      setPlatformAdminMessage("Enter admin email and password");
      return;
    }

    setPlatformAdminBusy(true);
    setPlatformAdminMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: platformAdminEmail.trim().toLowerCase(),
        password: platformAdminPassword,
      });

      if (error) throw error;

      const [businesses, payments, salespeople, reports] = await Promise.all([
        fetchPlatformBusinessesFromServer(),
        fetchCliqPaymentsForAdmin(),
        fetchPlatformSalespeopleForAdmin(),
        fetchPlatformReportsForAdmin(reportMonth),
      ]);
      setPlatformAdminBusinesses(businesses);
      setPlatformAdminPayments(payments);
      setPlatformSalespeople(salespeople);
      setPlatformReports(reports);
      setPlatformAdminLoggedIn(true);
      setPlatformAdminMessage(`${businesses.length} companies loaded • ${payments.length} CliQ payment notification${payments.length === 1 ? "" : "s"} • ${salespeople.length} salesperson${salespeople.length === 1 ? "" : "s"}`);
      show("Platform admin logged in");
    } catch (error) {
      setPlatformAdminLoggedIn(false);
      setPlatformAdminMessage(getErrorMessage(error));
    } finally {
      setPlatformAdminBusy(false);
    }
  }

  function updatePlatformBusinessLocal(businessId: string, patch: Partial<PlatformAdminBusiness>) {
    setPlatformAdminBusinesses((current) =>
      current.map((business) => (business.id === businessId ? { ...business, ...patch } : business))
    );
  }

  async function savePlatformBusiness(businessId: string) {
    const business = platformAdminBusinesses.find((item) => item.id === businessId);
    if (!business) return;

    setPlatformAdminBusy(true);
    setPlatformAdminMessage("");

    try {
      const saved = await updatePlatformBusinessInServer({
        ...business,
        serviceBalanceDueJod: Math.max(
          Number(business.serviceBalanceDueJod || 0),
          Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount))
        ),
      });

      setPlatformAdminBusinesses((current) =>
        current.map((item) => (item.id === saved.id ? saved : item))
      );

      setPlatformAdminMessage(`${saved.restaurantName} billing updated`);
      show(`${saved.restaurantName} billing updated`);
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Admin save failed: ${getErrorMessage(error)}`);
    } finally {
      setPlatformAdminBusy(false);
    }
  }

  async function markPlatformBusinessPaid(businessId: string) {
    const business = platformAdminBusinesses.find((item) => item.id === businessId);
    if (!business) return;

    const monthlyFee = Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount));
    const defaultAmount = Math.max(Number(business.serviceBalanceDueJod || 0), monthlyFee);
    const rawAmount = window.prompt(
      `How much did ${business.restaurantName} pay today?\n\nMonthly fee: ${money(monthlyFee)}\nCurrent due: ${money(defaultAmount)}\n\nExample: if due is 25 and they paid 50, enter 50 and Tawleh will set the account 60 days out.`,
      String(defaultAmount)
    );

    if (rawAmount === null) return;

    const paidAmountJod = Number(String(rawAmount).replace(/[^\d.]/g, ""));

    if (!Number.isFinite(paidAmountJod) || paidAmountJod <= 0) {
      setPlatformAdminMessage("Enter a valid paid amount.");
      show("Enter a valid paid amount");
      return;
    }

    setPlatformAdminBusy(true);
    setPlatformAdminMessage("");

    try {
      const result = await markPlatformBusinessPaidInServer({
        businessId,
        paidAmountJod,
      });

      setPlatformAdminBusinesses((current) =>
        current.map((item) => (item.id === result.business.id ? result.business : item))
      );

      if (result.payment) {
        setPlatformAdminPayments((current) => [result.payment!, ...current.filter((item) => item.id !== result.payment!.id)]);
      }

      await loadPlatformReports();

      const expiresText = result.expiresAt ? new Date(result.expiresAt).toLocaleDateString() : result.business.serviceExpiresAt;
      setPlatformAdminMessage(
        `${result.business.restaurantName} marked paid: ${money(paidAmountJod)} • ${result.monthsPaid} month${result.monthsPaid === 1 ? "" : "s"} • expires ${expiresText}`
      );
      show(`${result.business.restaurantName} marked paid`);
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Mark paid failed: ${getErrorMessage(error)}`);
    } finally {
      setPlatformAdminBusy(false);
    }
  }

  async function loadPlatformReports() {
    setPlatformReportBusy(true);
    setPlatformAdminMessage("");

    try {
      const reports = await fetchPlatformReportsForAdmin(reportMonth);
      setPlatformReports(reports);
      setPlatformAdminMessage(`Report center updated for ${reports.month}`);
      show(`Report center updated for ${reports.month}`);
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Report load failed: ${getErrorMessage(error)}`);
    } finally {
      setPlatformReportBusy(false);
    }
  }

  async function createSalesperson(event: FormEvent) {
    event.preventDefault();

    const cleanUsername = normalizeUsername(salespersonDraftUsername);
    const cleanName = salespersonDraftName.trim();
    const cleanPhone = normalizePhone(salespersonDraftPhone);

    if (!cleanUsername || cleanUsername.length < 3) {
      setPlatformAdminMessage("Salesperson username must be at least 3 characters");
      return;
    }

    setSalespersonBusy(true);
    setPlatformAdminMessage("");

    try {
      const salesperson = await createPlatformSalespersonInServer({
        username: cleanUsername,
        fullName: cleanName || cleanUsername,
        phone: cleanPhone,
      });

      setPlatformSalespeople((current) => [salesperson, ...current.filter((item) => item.id !== salesperson.id)]);
      setSalespersonDraftUsername("");
      setSalespersonDraftName("");
      setSalespersonDraftPhone("");
      setSalespersonModalOpen(false);
      setPlatformAdminMessage(`Salesperson @${salesperson.username} added`);
      show(`Salesperson @${salesperson.username} added`);
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Salesperson save failed: ${getErrorMessage(error)}`);
    } finally {
      setSalespersonBusy(false);
    }
  }

  function openPayByCliqModal() {
    setCliqMonths(1);
    setCliqReferenceNumber("");
    setCliqSenderName("");
    setCliqSenderPhone("");
    setCliqPayMessage("");
    setCliqPayOpen(true);
  }

  async function submitCliqPaymentRequest(event: FormEvent) {
    event.preventDefault();

    if (!state.profile.businessId) {
      setCliqPayMessage("Login again before submitting a CliQ payment");
      return;
    }

    const cleanReference = cliqReferenceNumber.trim();
    const cleanSenderName = cliqSenderName.trim();
    const cleanSenderPhone = normalizePhone(cliqSenderPhone);

    if (!cleanReference) {
      setCliqPayMessage("Enter the CliQ reference number");
      return;
    }

    if (!cleanSenderName) {
      setCliqPayMessage("Enter the CliQ name you sent from");
      return;
    }

    if (!cleanSenderPhone || cleanSenderPhone.length < 8) {
      setCliqPayMessage("Enter the CliQ phone number you sent from");
      return;
    }

    setCliqPayBusy(true);
    setCliqPayMessage("");

    try {
      await submitCliqPaymentToServer({
        businessId: state.profile.businessId,
        username: state.profile.username,
        months: cliqMonths,
        monthlyFeeJod: Number(state.profile.serviceMonthlyFeeJod || monthlyTableFee(state.profile.tableCount)),
        amountJod: cliqAmountForMonths(state.profile, cliqMonths),
        paymentDueDate: state.profile.servicePaymentDueDate || "",
        referenceNumber: cleanReference,
        senderCliqName: cleanSenderName,
        senderCliqPhone: cleanSenderPhone,
      });

      setCliqPayMessage("CliQ payment notification sent to Tawleh admin");
      show("CliQ payment notification sent");
      setCliqReferenceNumber("");
      setCliqSenderName("");
      setCliqSenderPhone("");
    } catch (error) {
      setCliqPayMessage(getErrorMessage(error));
      show(`CliQ payment notification failed: ${getErrorMessage(error)}`);
    } finally {
      setCliqPayBusy(false);
    }
  }

  async function changePlatformAdminPassword(event: FormEvent) {
    event.preventDefault();

    if (!supabase) {
      setPlatformAdminMessage("Supabase is not configured");
      return;
    }

    if (platformAdminNewPassword.length < 8) {
      setPlatformAdminMessage("New admin password must be at least 8 characters");
      return;
    }

    if (platformAdminNewPassword !== platformAdminConfirmPassword) {
      setPlatformAdminMessage("Passwords do not match");
      return;
    }

    setPlatformAdminPasswordBusy(true);
    setPlatformAdminMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: platformAdminNewPassword,
      });

      if (error) throw error;

      setPlatformAdminPassword("");
      setPlatformAdminNewPassword("");
      setPlatformAdminConfirmPassword("");
      setPlatformAdminMessage("Admin password changed");
      show("Admin password changed");
    } catch (error) {
      setPlatformAdminMessage(getErrorMessage(error));
      show(`Password change failed: ${getErrorMessage(error)}`);
    } finally {
      setPlatformAdminPasswordBusy(false);
    }
  }

  async function platformAdminLogout() {
    if (supabase) {
      await supabase.auth.signOut();
    }

    setPlatformAdminLoggedIn(false);
    setPlatformAdminBusinesses([]);
    setPlatformAdminPayments([]);
    setPlatformSalespeople([]);
    setPlatformReports(null);
    setSalespersonModalOpen(false);
    setPlatformAdminPassword("");
    setPlatformAdminNewPassword("");
    setPlatformAdminConfirmPassword("");
    setPlatformAdminMessage("Admin logged out");
  }

  async function restaurantLogout() {
    const ok = window.confirm("Log out of this restaurant dashboard on this device? This will not delete the restaurant account, menu, QR codes, or saved data in Supabase.");
    if (!ok) return;

    if (supabase) {
      await supabase.auth.signOut();
    }

    window.localStorage.removeItem(STORAGE_KEY);
    clearManagerAuthSession();
    setState(defaultState);
    setSignupProfile(defaultState.profile);
    setLoginUsername("");
    setLoginPassword("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setQrInput(String(DEMO_TABLE));
    setManagerTab("kitchen");
    setPhoneTab("menu");
    setAuthTab("login");
    document.documentElement.style.setProperty("--brand", defaultState.profile.brandColor);
    show("Restaurant dashboard logged out");
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

  function requireCustomerName() {
    setNamePromptError(true);

    if (publicCustomerMode) {
      setPhoneTab("menu");
      setActiveMenuCategory("__home");
    }

    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 80);

    show("Enter your name first");
  }

  async function ensurePublicTableSession(requireActive = false) {
    if (!publicCustomerMode) return tableSession;

    if (!state.profile.businessId || !state.profile.authUserId) {
      throw new Error("Missing table session restaurant details. Refresh this QR page.");
    }

    let session = tableSession;

    if (!session?.token || session.status === "closed" || session.status === "expired" || session.status === "blocked") {
      const qrToken = new URLSearchParams(window.location.search).get("token") || "";
      session = await startTableSessionInSupabase(
        state.profile.businessId,
        state.profile.authUserId,
        activeTable,
        state.profile.username,
        qrToken
      );
      setTableSession(session);
    }

    if (requireActive && session?.status !== "active") {
      const message = "This table session is no longer active. Please scan the table QR again or ask the waiter to reset the table.";
      setTableSessionMessage(message);
      throw new Error(message);
    }

    return session;
  }

  async function joinGuest(name: string) {
    const clean = name.trim().replace(/\s+/g, " ");

    if (!clean) {
      requireCustomerName();
      return;
    }

    setNamePromptError(false);

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
    setOrderCustomizations({});
    setOrderReviewOpen(false);

    if (publicCustomerMode) {
      setPhoneTab("menu");
      setActiveMenuCategory("__home");
    }

    if (publicCustomerMode && state.profile.businessId) {
      try {
        const session = await ensurePublicTableSession(false);

        const savedGuests = await joinTableGuestInSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          activeTable,
          clean,
          state.profile.username,
          session?.token || ""
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
    setOrderCustomizations({});
    setOrderReviewOpen(false);

    if (publicCustomerMode) {
      setPhoneTab("menu");
      setActiveMenuCategory("__home");
    }

    show(`Welcome back, ${clean}`);
  }

  function updateCartSpecialInstructions(itemId: string, text: string) {
    setOrderCustomizations((current) => ({
      ...current,
      [itemId]: {
        ...normalizeCartCustomization(current[itemId]),
        specialInstructions: text.slice(0, 240),
      },
    }));
  }

  function toggleCartOptionChoice(item: MenuItem, group: MenuOptionGroup, choice: MenuOptionChoice) {
    if (!state.currentGuest) {
      requireCustomerName();
      return;
    }

    setOrderCustomizations((current) => {
      const customization = normalizeCartCustomization(current[item.id]);
      const selectedChoices = cleanSelectedChoices(customization.selectedChoices);
      const currentChoices = selectedChoices[group.id] || [];
      const alreadySelected = currentChoices.includes(choice.id);
      let nextChoices: string[];

      if (group.multiple) {
        nextChoices = alreadySelected
          ? currentChoices.filter((choiceId) => choiceId !== choice.id)
          : [...currentChoices, choice.id];
      } else {
        nextChoices = alreadySelected ? [] : [choice.id];
      }

      const nextSelectedChoices = {
        ...selectedChoices,
        [group.id]: nextChoices,
      };

      if (!nextChoices.length) {
        delete nextSelectedChoices[group.id];
      }

      return {
        ...current,
        [item.id]: {
          ...customization,
          selectedChoices: nextSelectedChoices,
        },
      };
    });
  }

  function validateOrderCustomizations() {
    function validateGroups(line: CartLine, groups: MenuOptionGroup[], parentChoice?: MenuOptionChoice): boolean {
      for (const group of groups || []) {
        if (!group.choices.length) continue;

        const selectedIds = line.customization.selectedChoices[group.id] || [];

        if (group.required && !selectedIds.length) {
          show(`Choose ${parentChoice ? `${group.name} for ${parentChoice.name}` : group.name} for ${line.item.name}`);
          return false;
        }

        for (const choice of group.choices) {
          if (!selectedIds.includes(choice.id)) continue;

          if (choice.subOptionGroups?.length && !validateGroups(line, choice.subOptionGroups, choice)) {
            return false;
          }
        }
      }

      return true;
    }

    for (const line of orderCartLines) {
      if (!validateGroups(line, line.item.optionGroups || [])) return false;
    }

    return true;
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
        setOrderCustomizations((currentCustomizations) => {
          const nextCustomizations = { ...currentCustomizations };
          delete nextCustomizations[menuId];
          return nextCustomizations;
        });
      } else {
        next[menuId] = quantity;
      }

      return next;
    });
  }

  function addCartItem(menuId: string) {
    if (!state.currentGuest) {
      requireCustomerName();
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

    setOrderCustomizations((current) => {
      const next = { ...current };
      delete next[menuId];
      return next;
    });
  }

  function beginOrderReview() {
    if (!state.currentGuest) {
      requireCustomerName();
      return;
    }

    if (!orderCartLines.length) {
      show("Add at least one item first");
      return;
    }

    if (!validateOrderCustomizations()) return;

    setOrderSendError("");
    setOrderReviewOpen(true);
  }

  async function confirmOrderToKitchen() {
    if (!state.currentGuest) {
      requireCustomerName();
      return;
    }

    if (!orderCartLines.length) {
      show("Add at least one item first");
      return;
    }

    if (!validateOrderCustomizations()) return;

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
      const session = publicCustomerMode ? await ensurePublicTableSession(true) : tableSession;

      const savedOrders = await sendCartOrderToSupabase(
        state.profile.businessId,
        state.profile.authUserId,
        activeTable,
        activeTableLabel,
        state.currentGuest,
        orderCartLines,
        state.profile.username,
        session?.token || "",
        activeTableAutoMode
      );

      if (!activeTableAutoMode && !savedOrders.length) {
        throw new Error("Kitchen API returned zero orders");
      }

      if (activeTableAutoMode) {
        updateState((current) => ({
          ...current,
          currentGuest: "",
          guests: [],
          orders: current.orders.filter((order) => Number(order.table || activeTable) !== activeTable),
          requests: current.requests.filter((request) => Number(request.table || activeTable) !== activeTable),
        }));
        writeCachedTableGuests(state.profile.businessId, activeTable, []);
        setGuestName("");
        setOrderCart({});
        setOrderCustomizations({});
        setOrderReviewOpen(false);
        setPhoneTab("menu");
        show("Order sent successfully");
        return;
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
      setOrderCustomizations({});
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

  async function refreshServiceItemsNow() {
    if (!state.profile.businessId) {
      show("Login first, then refresh waiter buttons");
      return;
    }

    setServiceItemBusy(true);

    try {
      const savedServiceItems = await fetchServiceItemsFromSupabase(
        state.profile.businessId,
        state.profile.username
      );

      updateState((current) => ({
        ...current,
        serviceItems: savedServiceItems.length ? savedServiceItems : defaultServiceItems,
      }));

      show("Waiter buttons refreshed");
    } catch (error) {
      show(`Waiter button refresh failed: ${getErrorMessage(error)}`);
    } finally {
      setServiceItemBusy(false);
    }
  }



  async function refreshPrinterSettingsNow(showToast = true) {
    if (!state.profile.businessId) {
      if (showToast) show("Login first, then refresh printer settings");
      return;
    }

    setPrinterBusy(true);
    setPrinterMessage("");

    try {
      const savedPrinters = await fetchPrinterSettingsFromSupabase(
        state.profile.businessId,
        state.profile.username
      );

      setPrinterSettings(savedPrinters);
      if (showToast) show("Printer settings refreshed");
    } catch (error) {
      const message = `Printer settings refresh failed: ${getErrorMessage(error)}`;
      setPrinterMessage(message);
      if (showToast) show(message);
    } finally {
      setPrinterBusy(false);
    }
  }

  async function savePrinterFromDraft() {
    const cleanName = printerDraft.printerName.trim();
    const cleanIp = printerDraft.printerIp.trim();
    const cleanPort = Math.max(1, Math.min(65535, Number(printerDraft.printerPort || 9100)));

    if (!cleanName) {
      show("Printer name is required");
      return;
    }

    if (!isLikelyPrinterIp(cleanIp)) {
      show("Enter the printer IP from the self-test printout, example 192.168.1.45");
      return;
    }

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login first, then save printer settings");
        return;
      }
    }

    setPrinterBusy(true);
    setPrinterMessage("");

    try {
      const savedPrinter = await savePrinterSettingToSupabase(
        managerProfile.businessId,
        {
          ...printerDraft,
          printerName: cleanName,
          printerIp: cleanIp,
          printerPort: cleanPort,
          copies: Math.max(1, Math.min(10, Number(printerDraft.copies || 1))),
        },
        managerProfile.username
      );

      setPrinterSettings((current) => [
        savedPrinter,
        ...current.filter((printer) => printer.id !== savedPrinter.id),
      ]);

      setPrinterDraft(emptyPrinterDraft);
      printersLoadedKeyRef.current = managerProfile.businessId;
      setPrinterMessage(`${savedPrinter.printerName} saved. Tawleh print bridge will use ${savedPrinter.printerIp}:${savedPrinter.printerPort}.`);
      show("Printer settings saved");
    } catch (error) {
      const message = `Printer save failed: ${getErrorMessage(error)}`;
      setPrinterMessage(message);
      show(message);
    } finally {
      setPrinterBusy(false);
    }
  }

  function editPrinterSetting(printer: PrinterSetting) {
    setPrinterDraft(printer);
    setPrinterMessage("Editing saved printer. Make changes, then press Save printer.");
  }

  async function deletePrinterSetting(printer: PrinterSetting) {
    if (!state.profile.businessId || !printer.id) return;

    const ok = window.confirm(`Remove ${printer.printerName}?`);
    if (!ok) return;

    setPrinterBusy(true);
    setPrinterMessage("");

    try {
      await deletePrinterSettingFromSupabase(
        state.profile.businessId,
        printer.id,
        state.profile.username
      );

      setPrinterSettings((current) => current.filter((item) => item.id !== printer.id));
      if (printerDraft.id === printer.id) setPrinterDraft(emptyPrinterDraft);
      setPrinterMessage(`${printer.printerName} removed.`);
      show("Printer removed");
    } catch (error) {
      const message = `Printer remove failed: ${getErrorMessage(error)}`;
      setPrinterMessage(message);
      show(message);
    } finally {
      setPrinterBusy(false);
    }
  }

  function markPrinterReadyForBridge(printer: PrinterSetting) {
    setPrinterMessage(`Saved for local bridge: ${printer.printerName} at ${printer.printerIp}:${printer.printerPort}. Test print will work after the Tawleh local print bridge is installed on the restaurant tablet/PC.`);
    show("Printer is ready for bridge setup");
  }

  async function saveServiceItemFromDraft() {
    const cleanName = serviceItemDraft.name.trim();
    const cleanNameAr = serviceItemDraft.nameAr.trim();

    if (!cleanName && !cleanNameAr) {
      show("Service item name is required");
      return;
    }

    let managerProfile = state.profile;

    if (!managerProfile.businessId) {
      try {
        managerProfile = await ensureManagerBusinessProfile();
      } catch {
        show("Login first, then add waiter buttons");
        return;
      }
    }

    setServiceItemBusy(true);

    try {
      const nextItem: ServiceItem = {
        ...serviceItemDraft,
        id: serviceItemDraft.id || makeId("service_item"),
        name: cleanName || cleanNameAr,
        nameAr: cleanNameAr,
        icon: cleanServiceIcon(serviceItemDraft.icon, menuIconFromName(cleanName || cleanNameAr || "Service")),
        imageUrl: serviceItemDraft.imageUrl,
        active: serviceItemDraft.active !== false,
        sortOrder: serviceItemDraft.sortOrder || Date.now(),
      };

      const savedItem = await saveServiceItemToSupabase(
        managerProfile.businessId,
        nextItem,
        managerProfile.username
      );

      updateState((current) => {
        const existing = current.serviceItems.some((item) => item.id === savedItem.id);

        return {
          ...current,
          serviceItems: existing
            ? current.serviceItems.map((item) => item.id === savedItem.id ? savedItem : item)
            : [savedItem, ...current.serviceItems],
        };
      });

      setServiceItemDraft(emptyServiceItemDraft);
      show(`${savedItem.name} waiter button saved`);
    } catch (error) {
      show(`Waiter button save failed: ${getErrorMessage(error)}`);
    } finally {
      setServiceItemBusy(false);
    }
  }

  function editServiceItem(item: ServiceItem) {
    setServiceItemDraft({ ...item });
    show(`Editing ${item.name}`);
  }

  async function toggleServiceItem(item: ServiceItem) {
    await saveServiceItemFromValue({
      ...item,
      active: item.active === false,
    });
  }

  async function saveServiceItemFromValue(nextItem: ServiceItem) {
    if (!state.profile.businessId) {
      show("Login first, then edit waiter buttons");
      return;
    }

    setServiceItemBusy(true);

    try {
      const savedItem = await saveServiceItemToSupabase(
        state.profile.businessId,
        nextItem,
        state.profile.username
      );

      updateState((current) => ({
        ...current,
        serviceItems: current.serviceItems.map((item) => item.id === savedItem.id ? savedItem : item),
      }));

      show(`${savedItem.name} updated`);
    } catch (error) {
      show(`Waiter button update failed: ${getErrorMessage(error)}`);
    } finally {
      setServiceItemBusy(false);
    }
  }

  async function removeServiceItem(item: ServiceItem) {
    const ok = window.confirm(`Delete waiter button "${item.name}"?`);
    if (!ok) return;

    if (!state.profile.businessId || !isUuid(item.id)) {
      updateState((current) => ({
        ...current,
        serviceItems: current.serviceItems.filter((serviceItem) => serviceItem.id !== item.id),
      }));
      return;
    }

    setServiceItemBusy(true);

    try {
      await deleteServiceItemFromSupabase(state.profile.businessId, item.id, state.profile.username);

      updateState((current) => ({
        ...current,
        serviceItems: current.serviceItems.filter((serviceItem) => serviceItem.id !== item.id),
      }));

      if (serviceItemDraft.id === item.id) {
        setServiceItemDraft(emptyServiceItemDraft);
      }

      show(`${item.name} deleted`);
    } catch (error) {
      show(`Waiter button delete failed: ${getErrorMessage(error)}`);
    } finally {
      setServiceItemBusy(false);
    }
  }

  async function handleServiceItemImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      show("Please upload an image file");
      event.target.value = "";
      return;
    }

    try {
      const imageData = await compressMenuImage(file);

      setServiceItemDraft((current) => ({
        ...current,
        imageUrl: imageData.imageThumbUrl,
        icon: current.icon || menuIconFromName(current.name || file.name || "Service"),
      }));

      show("Waiter button picture added");
    } catch (error) {
      show(`Image failed: ${getErrorMessage(error)}`);
    } finally {
      event.target.value = "";
    }
  }

  function addRequest(type: string) {
    if (!state.currentGuest) {
      requireCustomerName();
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

  function addOptionGroupToDraft() {
    const groupId = makeId("option_group");

    setMenuDraft((current) => ({
      ...current,
      optionGroups: [
        ...draftMenuOptionGroups(current.optionGroups),
        {
          id: groupId,
          name: "Choice",
          nameAr: "",
          required: false,
          multiple: false,
          choices: [makeDefaultOptionChoice("Option 1")],
        },
      ],
    }));
  }

  function updateOptionGroupInDraft(groupId: string, patch: Partial<MenuOptionGroup>) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionGroupTree(draftMenuOptionGroups(current.optionGroups), groupId, (group) => ({ ...group, ...patch })),
    }));
  }

  function removeOptionGroupFromDraft(groupId: string) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionGroupTree(draftMenuOptionGroups(current.optionGroups), groupId, () => null),
    }));
  }

  function addOptionChoiceToDraft(groupId: string) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionGroupTree(draftMenuOptionGroups(current.optionGroups), groupId, (group) => ({
        ...group,
        choices: [...group.choices, makeDefaultOptionChoice("New choice")],
      })),
    }));
  }

  function updateOptionChoiceInDraft(groupId: string, choiceId: string, patch: Partial<MenuOptionChoice>) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionChoiceTree(draftMenuOptionGroups(current.optionGroups), choiceId, (choice) => ({
        ...choice,
        ...patch,
        price: patch.price === undefined ? choice.price : Math.max(0, Math.round(Number(patch.price || 0) * 1000) / 1000),
        subOptionGroups: patch.subOptionGroups === undefined ? (choice.subOptionGroups || []) : draftMenuOptionGroups(patch.subOptionGroups),
      })),
    }));
  }

  function removeOptionChoiceFromDraft(groupId: string, choiceId: string) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionChoiceTree(draftMenuOptionGroups(current.optionGroups), choiceId, () => null),
    }));
  }

  function addSubOptionGroupToChoice(choiceId: string) {
    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionChoiceTree(draftMenuOptionGroups(current.optionGroups), choiceId, (choice) => ({
        ...choice,
        subOptionGroups: [
          ...draftMenuOptionGroups(choice.subOptionGroups || []),
          {
            id: makeId("option_group"),
            name: "Choose topping",
            nameAr: "",
            required: false,
            multiple: false,
            choices: [makeDefaultOptionChoice("Option 1")],
          },
        ],
      })),
    }));
  }

  function applyReusableOptionGroupName(groupId: string, nextName: string, nested = false) {
    const templates = nested ? modifierMemory.subOptionGroups : modifierMemory.optionGroups;
    const template = findReusableOptionGroupTemplate(templates, nextName);

    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionGroupTree(draftMenuOptionGroups(current.optionGroups), groupId, (group) => {
        if (!template) {
          return { ...group, name: nextName };
        }

        return {
          ...group,
          name: nextName || template.name,
          nameAr: template.nameAr || group.nameAr,
          required: template.required,
          multiple: template.multiple,
          choices: cloneOptionGroupsForDraft([{ ...template, id: group.id }])[0]?.choices || group.choices,
        };
      }),
    }));
  }

  function applyReusableOptionGroupNameAr(groupId: string, nextNameAr: string, nested = false) {
    const templates = nested ? modifierMemory.subOptionGroups : modifierMemory.optionGroups;
    const template = findReusableOptionGroupTemplate(templates, nextNameAr);

    setMenuDraft((current) => ({
      ...current,
      optionGroups: updateOptionGroupTree(draftMenuOptionGroups(current.optionGroups), groupId, (group) => {
        if (!template) {
          return { ...group, nameAr: nextNameAr };
        }

        return {
          ...group,
          name: template.name || group.name,
          nameAr: nextNameAr || template.nameAr,
          required: template.required,
          multiple: template.multiple,
          choices: cloneOptionGroupsForDraft([{ ...template, id: group.id }])[0]?.choices || group.choices,
        };
      }),
    }));
  }

  function applyReusableOptionChoiceName(groupId: string, choiceId: string, nextName: string, nested = false) {
    const templates = nested ? modifierMemory.subOptionChoices : modifierMemory.optionChoices;
    const template = findReusableOptionChoiceTemplate(templates, nextName);

    if (!template) {
      updateOptionChoiceInDraft(groupId, choiceId, { name: nextName });
      return;
    }

    updateOptionChoiceInDraft(groupId, choiceId, {
      name: nextName || template.name,
      nameAr: template.nameAr,
      price: template.price,
      subOptionGroups: cloneOptionGroupsForDraft(template.subOptionGroups || []),
    });
  }

  function applyReusableOptionChoiceNameAr(groupId: string, choiceId: string, nextNameAr: string, nested = false) {
    const templates = nested ? modifierMemory.subOptionChoices : modifierMemory.optionChoices;
    const template = findReusableOptionChoiceTemplate(templates, nextNameAr);

    if (!template) {
      updateOptionChoiceInDraft(groupId, choiceId, { nameAr: nextNameAr });
      return;
    }

    updateOptionChoiceInDraft(groupId, choiceId, {
      name: template.name,
      nameAr: nextNameAr || template.nameAr,
      price: template.price,
      subOptionGroups: cloneOptionGroupsForDraft(template.subOptionGroups || []),
    });
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
      optionGroups: cleanMenuOptionGroups(menuDraft.optionGroups),
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

  function scrollToMenuBuilderForm() {
    window.setTimeout(() => {
      const target = menuBuilderFormRef.current || document.getElementById("menu-builder-form");

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);

    window.setTimeout(() => {
      const target = menuBuilderFormRef.current || document.getElementById("menu-builder-form");

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 260);
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
      optionGroups: cleanMenuOptionGroups(item.optionGroups),
    });
    setManagerTab("menuBuilder");
    scrollToMenuBuilderForm();
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

  async function closeTable(tableNumber = activeTable) {
    const cleanTableNumber = Math.max(1, Math.min(999, Number(tableNumber || activeTable || 1)));
    const ok = window.confirm(`Reset Table ${cleanTableNumber}? This clears seated names, bill totals, open orders, and waiter requests for this table.`);
    if (!ok) return;

    setResettingTable(cleanTableNumber);

    try {
      if (state.profile.businessId) {
        await resetTableInSupabase(
          state.profile.businessId,
          state.profile.authUserId,
          cleanTableNumber,
          state.profile.username
        );

        setTableSessions((current) => current.filter((session) => session.tableNumber !== cleanTableNumber));

        if (publicCustomerMode && cleanTableNumber === activeTable) {
          setTableSession(null);
          setTableSessionMessage("This table was reset. Please scan the table QR again to start a new ordering session.");
        }

        writeCachedTableGuests(state.profile.businessId, cleanTableNumber, []);
      }

      let latestOrders: Order[] | null = null;

      if (state.profile.businessId) {
        try {
          latestOrders = await fetchTableOrdersFromSupabase(
            state.profile.businessId,
            state.profile.authUserId,
            null,
            state.profile.username
          );
        } catch (error) {
          console.error("Post-reset order refresh failed", error);
        }
      }

      updateState((current) => ({
        ...current,
        currentGuest: cleanTableNumber === activeTable ? "" : current.currentGuest,
        guests: cleanTableNumber === activeTable ? [] : current.guests,
        orders: latestOrders || current.orders.filter((order) => Number(order.table || activeTable) !== cleanTableNumber),
        requests: current.requests.filter((request) => Number(request.table || activeTable) !== cleanTableNumber),
      }));

      if (cleanTableNumber === activeTable) {
        setGuestName("");
        setOrderCart({});
        setOrderCustomizations({});
        setOrderReviewOpen(false);
        setPhoneTab("menu");
        setActiveMenuCategory("__home");
      }

      show(`Table ${cleanTableNumber} reset`);
    } catch (error) {
      show(`Table reset failed: ${getErrorMessage(error)}`);
    } finally {
      setResettingTable(null);
    }
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
    const tableLabel = cleanTableLabel(qrLabelInput);
    const autoMode = qrAutoModeInput === true;
    const token = makeQrToken(businessName, branchName, tableNumber);

    updateState((current) => ({
      ...current,
      lastQrTable: tableNumber,
      qrTokens: {
        ...current.qrTokens,
        [String(tableNumber)]: token,
      },
      tableLabels: {
        ...current.tableLabels,
        [String(tableNumber)]: tableLabel,
      },
      tableAutoModes: {
        ...current.tableAutoModes,
        [String(tableNumber)]: autoMode,
      },
    }));

    show(`QR created for ${tableDisplayName(tableNumber, tableLabel)}`);
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
                  <span>Minimum 25 QR codes/month. 1 JOD per QR/table. 50 tables = 50 JOD/month.</span>
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
                <button
                  className={`auth-tab ${authTab === "platformAdmin" ? "active" : ""}`}
                  onClick={() => setAuthTab("platformAdmin")}
                  type="button"
                >
                  Admin
                </button>
              </div>

              <div className="auth-panels">
                {authTab === "platformAdmin" ? (
                  <div className="platform-admin-panel">
                    {!platformAdminLoggedIn ? (
                      <form className="login-panel platform-admin-login" onSubmit={platformAdminLogin}>
                        <div className="auth-heading">
                          <h2>Platform Admin</h2>
                          <p>Log in to see every company, set due dates, and suspend service when needed.</p>
                        </div>

                        <Field label="Admin email">
                          <input
                            value={platformAdminEmail}
                            onChange={(event) => setPlatformAdminEmail(event.target.value)}
                            placeholder="admin@example.com"
                            type="email"
                          />
                        </Field>

                        <Field label="Admin password">
                          <input
                            value={platformAdminPassword}
                            onChange={(event) => setPlatformAdminPassword(event.target.value)}
                            placeholder="Enter admin password"
                            type="password"
                          />
                        </Field>

                        {platformAdminMessage ? <div className="admin-message">{platformAdminMessage}</div> : null}

                        <button className="btn dark full" type="submit" disabled={platformAdminBusy}>
                          {platformAdminBusy ? "Logging in..." : "Open Admin Dashboard"}
                        </button>
                      </form>
                    ) : (
                      <div className="platform-admin-dashboard">
                        <div className="platform-admin-head">
                          <div>
                            <span>Tawleh owner dashboard</span>
                            <h2>Companies</h2>
                            <p>Mark paid, enter the amount collected, and Tawleh automatically extends expiration by the paid months. Reports count the full payment in the month you mark it paid.</p>
                          </div>

                          <div className="platform-admin-actions">
                            <button className="btn small" type="button" onClick={() => { setSalespersonDraftUsername(""); setSalespersonDraftName(""); setSalespersonDraftPhone(""); setSalespersonModalOpen(true); }}>
                              Add salesperson
                            </button>
                            <button className="btn dark small" type="button" onClick={() => { window.location.href = "/reports"; }}>
                              Reports
                            </button>
                            <button className="btn ghost small" type="button" onClick={loadPlatformAdminBusinesses} disabled={platformAdminBusy}>
                              Refresh
                            </button>
                            <button className="btn danger small" type="button" onClick={platformAdminLogout}>
                              Logout
                            </button>
                          </div>
                        </div>

                        <div className="platform-admin-stats">
                          <div>
                            <span>Total companies</span>
                            <strong>{platformAdminBusinesses.length}</strong>
                          </div>
                          <div>
                            <span>Suspended</span>
                            <strong>{platformAdminBusinesses.filter((business) => business.serviceStatus === "suspended").length}</strong>
                          </div>
                          <div>
                            <span>Total due</span>
                            <strong>{money(platformAdminBusinesses.reduce((sum, business) => sum + Number(business.serviceBalanceDueJod || 0), 0))}</strong>
                          </div>
                        </div>

                        <div className="report-launch-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 16, margin: "0 0 18px", borderRadius: 24, background: "rgba(255, 255, 255, 0.90)", border: "1px solid rgba(91, 71, 48, 0.10)", boxShadow: "0 16px 34px rgba(80, 52, 27, 0.08)" }}>
                          <div>
                            <span style={{ display: "block", color: "#bd5338", fontSize: 11, fontWeight: 1000, textTransform: "uppercase", letterSpacing: "0.10em" }}>Report center</span>
                            <h3 style={{ margin: "5px 0 4px", color: "#2f2a25", fontSize: 24, lineHeight: 1, letterSpacing: "-0.05em", fontWeight: 1000 }}>Reports moved to their own page</h3>
                            <p style={{ margin: 0, color: "#74685d", fontSize: 12, lineHeight: 1.4, fontWeight: 850 }}>Open a clean, full-page report center for company totals, salesperson reports, and commissions.</p>
                          </div>
                          <button className="btn dark small" type="button" onClick={() => { window.location.href = "/reports"; }}>
                            Open Reports
                          </button>
                        </div>

                        <div className="salespeople-admin-card">
                          <div className="salespeople-admin-head">
                            <div>
                              <span>Sales team</span>
                              <h3>Salespeople</h3>
                              <p>Create usernames for salespeople. A restaurant can only signup as a salesperson if this username exists.</p>
                            </div>
                            <button className="btn small" type="button" onClick={() => { setSalespersonDraftUsername(""); setSalespersonDraftName(""); setSalespersonDraftPhone(""); setSalespersonModalOpen(true); }}>Add salesperson</button>
                          </div>

                          {salespersonModalOpen ? (
                            <form className="salesperson-inline-form" onSubmit={createSalesperson}>
                              <Field label="Salesperson username">
                                <input
                                  value={salespersonDraftUsername}
                                  onChange={(event) => setSalespersonDraftUsername(normalizeUsername(event.target.value))}
                                  placeholder="example: mohammed_sales"
                                />
                              </Field>

                              <Field label="Salesperson name">
                                <input
                                  value={salespersonDraftName}
                                  onChange={(event) => setSalespersonDraftName(event.target.value)}
                                  placeholder="Full name"
                                />
                              </Field>

                              <Field label="Salesperson phone">
                                <input
                                  value={salespersonDraftPhone}
                                  onChange={(event) => setSalespersonDraftPhone(event.target.value)}
                                  placeholder="07XXXXXXXX"
                                />
                              </Field>

                              <div className="salesperson-inline-actions">
                                <button className="btn ghost small" type="button" onClick={() => setSalespersonModalOpen(false)}>
                                  Cancel
                                </button>
                                <button className="btn small dark" type="submit" disabled={salespersonBusy}>
                                  {salespersonBusy ? "Saving..." : "Save salesperson"}
                                </button>
                              </div>
                            </form>
                          ) : null}

                          <div className="salespeople-list">
                            {platformSalespeople.length ? (
                              platformSalespeople.map((person) => (
                                <div className={`salesperson-row ${person.active ? "" : "inactive"}`} key={person.id}>
                                  <div>
                                    <strong>@{person.username}</strong>
                                    <span>{person.fullName || "No name"} {person.phone ? `• ${person.phone}` : ""}</span>
                                  </div>
                                  <b>{person.active ? "Active" : "Inactive"}</b>
                                </div>
                              ))
                            ) : (
                              <Empty text="No salespeople yet. Press Add salesperson." />
                            )}
                          </div>
                        </div>

                        <form className="platform-admin-password-card" onSubmit={changePlatformAdminPassword}>
                          <div>
                            <span>Security</span>
                            <h3>Change admin password</h3>
                            <p>This updates the password for the admin account you are logged into.</p>
                          </div>

                          <div className="platform-admin-password-fields">
                            <Field label="New password">
                              <input
                                type="password"
                                value={platformAdminNewPassword}
                                onChange={(event) => setPlatformAdminNewPassword(event.target.value)}
                                placeholder="At least 8 characters"
                              />
                            </Field>

                            <Field label="Confirm password">
                              <input
                                type="password"
                                value={platformAdminConfirmPassword}
                                onChange={(event) => setPlatformAdminConfirmPassword(event.target.value)}
                                placeholder="Confirm new password"
                              />
                            </Field>

                            <button className="btn small dark" type="submit" disabled={platformAdminPasswordBusy}>
                              {platformAdminPasswordBusy ? "Changing..." : "Change password"}
                            </button>
                          </div>
                        </form>

                        {platformAdminMessage ? <div className="admin-message">{platformAdminMessage}</div> : null}

                        <div className="cliq-admin-notification-card">
                          <div className="cliq-admin-notification-head">
                            <div>
                              <span>CliQ payment notifications</span>
                              <h3>{pendingCliqPayments.length} pending</h3>
                              <p>Restaurants submit the reference number, sender name, sender phone, months, and amount after sending CliQ.</p>
                            </div>
                            <button className="btn ghost small" type="button" onClick={loadPlatformAdminBusinesses} disabled={platformAdminBusy}>
                              Refresh payments
                            </button>
                          </div>

                          <div className="cliq-admin-payment-list">
                            {platformAdminPayments.length ? (
                              platformAdminPayments.map((payment) => (
                                <div className={`cliq-admin-payment-row ${payment.status}`} key={payment.id}>
                                  <div>
                                    <strong>{payment.restaurantName}</strong>
                                    <span>
                                      @{payment.username || "no_username"} sent a {payment.months} month CliQ payment from {payment.senderCliqName} / {payment.senderCliqPhone}
                                    </span>
                                    <em>
                                      Reference: {payment.referenceNumber} • {new Date(payment.createdAt).toLocaleString()} • Due date: {payment.paymentDueDate || "not set"}
                                    </em>
                                  </div>
                                  <b>{money(payment.amountJod)}</b>
                                </div>
                              ))
                            ) : (
                              <Empty text="No CliQ payment notifications yet." />
                            )}
                          </div>
                        </div>

                        <div className="platform-business-list">
                          {platformAdminBusinesses.map((business) => (
                            <div className={`platform-business-card ${business.serviceStatus === "suspended" ? "suspended" : ""}`} key={business.id}>
                              <div className="platform-business-top">
                                <div>
                                  <span>@{business.username || "no_username"}</span>
                                  <h3>{business.restaurantName}</h3>
                                  <p>{business.branchName} • {business.tableCount} tables • {business.email}</p>
                                </div>
                                <b>{business.serviceStatus === "suspended" ? "Suspended" : business.serviceStatus === "trial" ? "Trial" : "Active"}</b>
                              </div>

                              <div className="platform-business-grid">
                                <Field label="Status">
                                  <select
                                    value={business.serviceStatus}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { serviceStatus: event.target.value })}
                                  >
                                    <option value="active">Active</option>
                                    <option value="trial">Trial</option>
                                    <option value="suspended">Suspended</option>
                                  </select>
                                </Field>

                                <Field label="Expires on">
                                  <input
                                    type="date"
                                    value={business.serviceExpiresAt}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { serviceExpiresAt: event.target.value })}
                                  />
                                </Field>

                                <Field label="Payment due date">
                                  <input
                                    type="date"
                                    value={business.servicePaymentDueDate}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { servicePaymentDueDate: event.target.value })}
                                  />
                                </Field>

                                <Field label="Auto balance due JOD">
                                  <input
                                    type="number"
                                    readOnly
                                    value={Math.max(Number(business.serviceBalanceDueJod || 0), Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount)))}
                                  />
                                  <div className="helper">Auto calculated from monthly QR fee. You only set the due dates.</div>
                                </Field>

                                <Field label="Monthly fee JOD">
                                  <input
                                    type="number"
                                    min={0}
                                    step="0.001"
                                    value={business.serviceMonthlyFeeJod}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { serviceMonthlyFeeJod: Number(event.target.value || 0) })}
                                  />
                                </Field>

                                <Field label="Suspension message">
                                  <input
                                    value={business.serviceSuspendedReason}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { serviceSuspendedReason: event.target.value })}
                                    placeholder="Service suspended. Please make a payment to restore service."
                                  />
                                </Field>

                                <Field label="Admin note">
                                  <textarea
                                    value={business.serviceAdminNote}
                                    onChange={(event) => updatePlatformBusinessLocal(business.id, { serviceAdminNote: event.target.value })}
                                    placeholder="Internal note only"
                                  />
                                </Field>
                              </div>

                              <div className="platform-business-footer">
                                <span>
                                  Example: {business.restaurantName} owes {money(Math.max(Number(business.serviceBalanceDueJod || 0), Number(business.serviceMonthlyFeeJod || monthlyTableFee(business.tableCount))))} by {business.servicePaymentDueDate || business.serviceExpiresAt || "date not set"}
                                </span>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                                  <button className="btn small" type="button" onClick={() => savePlatformBusiness(business.id)} disabled={platformAdminBusy}>
                                    Save billing
                                  </button>
                                  <button className="btn dark small" type="button" onClick={() => markPlatformBusinessPaid(business.id)} disabled={platformAdminBusy}>
                                    Mark Paid
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}

                          {!platformAdminBusinesses.length ? (
                            <Empty text="No companies loaded yet. Press Refresh." />
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                ) : authTab === "login" ? (
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
                    {!signupSource ? (
                      <div className="signup-source-gate">
                        <div className="auth-heading">
                          <h2>Who is creating this account?</h2>
                          <p>Choose one before the restaurant signup form opens.</p>
                        </div>

                        <div className="signup-source-options">
                          <button className="signup-source-option" type="button" onClick={() => setSignupSource("self")}>
                            <span>Business Owner</span>
                            <strong>I am a business wanting to signup myself</strong>
                            <em>Use this if the restaurant owner or manager is creating their own Tawleh account.</em>
                          </button>

                          <button className="signup-source-option" type="button" onClick={() => setSignupSource("salesperson")}>
                            <span>Sales Person</span>
                            <strong>I am a sales person</strong>
                            <em>Use this if Tawleh gave you a salesperson username.</em>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="signup-selected-source">
                          <div>
                            <span>Signup type</span>
                            <strong>{signupSource === "salesperson" ? "Sales person" : "Business self signup"}</strong>
                            <em>{signupSource === "salesperson" ? "Enter your Tawleh salesperson username before submitting." : "Restaurant is creating its own account."}</em>
                          </div>
                          <button className="btn ghost small" type="button" onClick={() => setSignupSource("")}>Change</button>
                        </div>

                        {signupSource === "salesperson" ? (
                          <Field label="Salesperson username">
                            <input
                              value={signupSalespersonUsername}
                              onChange={(event) => setSignupSalespersonUsername(normalizeUsername(event.target.value))}
                              placeholder="Enter the username Tawleh gave you"
                            />
                            <div className="helper">Admin must create this salesperson username first.</div>
                          </Field>
                        ) : null}

                    <div className="auth-heading">
                      <h2>Create your account</h2>
                      <p>Start your 30-day free trial. Minimum billing is 25 QR codes per month.</p>
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
                          min={25}
                          max={999}
                          value={signupProfile.tableCount}
                          onChange={(e) => setSignupProfile({ ...signupProfile, tableCount: Math.max(25, Number(e.target.value || 25)), serviceMonthlyFeeJod: monthlyTableFee(Number(e.target.value)) })}
                        />
                        <div className="helper price-preview-helper">
                          Monthly price: {money(monthlyTableFee(signupProfile.tableCount))} / month
                          <span>Minimum 25 QR codes/month. If they have fewer than 25 tables, they still pay 25 JOD/month.</span>
                        </div>
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
                      </>
                    )}
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
                <span className="pill"><span className="dot" />{tableDisplayName(activeTable, activeTableLabel)} live menu</span>
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
                <span className="pill">{tableDisplayName(activeTable, activeTableLabel)}</span>
              </div>

              <div className="panel-body">
                {publicTableError ? <div className="inline-error">{publicTableError}</div> : null}
                {publicCustomerMode && tableSessionMessage ? <div className="inline-error">{tableSessionMessage}</div> : null}
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

                    {publicCustomerMode && publicSuspension.suspended ? (
                      <div className="service-suspended-screen">
                        <div className="service-suspended-card">
                          <div className="service-suspended-logo">
                            <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                          </div>
                          <span>Subscription expired</span>
                          <h2 className="subscription-expired-title">Subscription expired</h2>
                          <p className="subscription-expired-copy">Please make payment to restore service</p>
                          <small className="subscription-expired-restaurant">{businessName}</small>

                          <div className="service-suspended-details">
                            {publicSuspension.balanceDueJod ? (
                              <div>
                                <small>Amount due</small>
                                <strong>{money(publicSuspension.balanceDueJod)}</strong>
                              </div>
                            ) : null}

                            {publicSuspension.paymentDueDate ? (
                              <div>
                                <small>Due date</small>
                                <strong>{publicSuspension.paymentDueDate}</strong>
                              </div>
                            ) : null}
                          </div>

                          <em>Please contact the restaurant or Tawleh support to restore service.</em>
                        </div>
                      </div>
                    ) : publicCustomerMode ? (
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
                            <strong>{tableDisplayName(activeTable, activeTableLabel)}</strong>
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
                        <div className="table-chip">{tableDisplayName(activeTable, activeTableLabel)}  {branchName}</div>
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
                                    <small>{tableDisplayName(activeTable, activeTableLabel)} • Current guest</small>
                                  </div>
                                </div>

                                {namePromptError ? (
                                  <div className="name-entry-error-text">Enter your name first to open the menu.</div>
                                ) : null}

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

                                <div className={`option-one-name-entry ${namePromptError ? "name-entry-error" : ""}`}>
                                  <span className="option-one-input-icon">♙</span>
                                  <input
                                    ref={nameInputRef}
                                    value={guestName}
                                    onChange={(e) => {
                                      setGuestName(e.target.value);
                                      if (namePromptError) setNamePromptError(false);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && joinGuest(guestName)}
                                    placeholder={namePromptError ? "Enter your name first" : "Enter your name"}
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
                                    requireCustomerName();
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
                                          requireCustomerName();
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
                                      requireCustomerName();
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
                                      requireCustomerName();
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
                                  requireCustomerName();
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
                                  requireCustomerName();
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
                          <div className="order-review-page tawleh-checkout-page">
                            <div className="checkout-top-card">
                              <div className="checkout-top-row">
                                <button className="checkout-back-button" type="button" onClick={() => setOrderReviewOpen(false)}>
                                  ← Menu
                                </button>
                                <span className="checkout-table-pill">{tableDisplayName(activeTable, activeTableLabel)}</span>
                              </div>

                              <div className="checkout-brand-row">
                                <div className="checkout-restaurant-mark">
                                  {state.profile.logoDataUrl ? (
                                    <img src={state.profile.logoDataUrl} alt={businessName} />
                                  ) : (
                                    <span>{logoFallback}</span>
                                  )}
                                </div>

                                <div className="checkout-title-copy">
                                  <p>Ready to send</p>
                                  <h4>Checkout</h4>
                                  <span>{state.currentGuest} • Pay at restaurant</span>
                                </div>
                              </div>

                              <div className="checkout-metrics">
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

                            <div className="checkout-section-title">
                              <div>
                                <span>Kitchen ticket</span>
                                <strong>Check everything before sending</strong>
                              </div>
                            </div>

                            <div className="checkout-items-list">
                              {orderCartLines.map((line) => {
                                const itemImage = line.item.imageThumbUrl || line.item.imageFullUrl;

                                return (
                                  <div className="checkout-item-card" key={line.item.id}>
                                    <div className="checkout-item-photo">
                                      {itemImage ? (
                                        <img src={itemImage} alt={line.item.name} />
                                      ) : (
                                        <span>{line.item.icon}</span>
                                      )}
                                    </div>

                                    <div className="checkout-item-main">
                                      <div className="checkout-item-title-row">
                                        <div>
                                          <strong>{line.item.name}</strong>
                                          {line.item.nameAr ? <span dir="rtl">{line.item.nameAr}</span> : null}
                                        </div>
                                        <b>{money(line.lineTotal)}</b>
                                      </div>

                                      <div className="checkout-item-subline">
                                        <span>{line.item.categoryName || "Menu item"}</span>
                                        <span>{money(line.unitTotal)} each</span>
                                      </div>

                                      {line.selectedModifiers.length ? (
                                        <div className="checkout-detail-box">
                                          <small>Options</small>
                                          <p>{formatOrderModifiers(line.selectedModifiers)}</p>
                                        </div>
                                      ) : null}

                                      {line.customization.specialInstructions ? (
                                        <div className="checkout-detail-box note">
                                          <small>Special instructions</small>
                                          <p>{line.customization.specialInstructions}</p>
                                        </div>
                                      ) : null}

                                      <div className="checkout-item-actions">
                                        <div className="checkout-qty-control">
                                          <button type="button" onClick={() => changeCartQuantity(line.item.id, line.quantity - 1)}>-</button>
                                          <strong>{line.quantity}</strong>
                                          <button type="button" onClick={() => changeCartQuantity(line.item.id, line.quantity + 1)}>+</button>
                                        </div>

                                        <button className="checkout-remove-button" type="button" onClick={() => removeCartItem(line.item.id)}>
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="checkout-summary-card">
                              <div className="checkout-summary-head">
                                <div>
                                  <span>Order total</span>
                                  <strong>{money(orderCartTotal)}</strong>
                                </div>
                                <em>{orderCartItemCount} item{orderCartItemCount === 1 ? "" : "s"}</em>
                              </div>

                              <div className="checkout-summary-lines">
                                <div>
                                  <span>Subtotal</span>
                                  <strong>{money(orderCartTotal)}</strong>
                                </div>
                                <div>
                                  <span>Payment</span>
                                  <strong>At restaurant</strong>
                                </div>
                              </div>

                              <p className="checkout-kitchen-note">This sends the order directly to the kitchen screen.</p>

                              {orderSendError ? (
                                <div className="order-send-error checkout-error">
                                  {orderSendError}
                                </div>
                              ) : null}

                              <button className="checkout-confirm-button" type="button" onClick={confirmOrderToKitchen} disabled={orderSendBusy || !orderCartLines.length}>
                                {orderSendBusy ? "Sending..." : "Send to kitchen"}
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
                                visibleCustomerMenu.map((item) => {
                                  const cartQuantity = Number(orderCart[item.id] || 0);
                                  const customization = normalizeCartCustomization(orderCustomizations[item.id]);
                                  const selectedModifiers = getSelectedModifiersForItem(item, customization);
                                  const addonsTotal = getModifiersTotal(selectedModifiers);
                                  const unitTotal = Math.round((item.price + addonsTotal) * 1000) / 1000;

                                  return (
                                  <div key={item.id} className={`menu-item ${cartQuantity > 0 ? "has-customization" : ""} ${isMenuItemCurrentlyAvailable(item) ? "" : "unavailable"}`}>
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
                                      {item.optionGroups.length ? <p className="availability-line">Options available</p> : null}
                                      <div className="price">{money(unitTotal)}{addonsTotal > 0 ? <span> with add-ons</span> : null}</div>
                                    </div>
                                    {cartQuantity > 0 ? (
                                      <div className="cart-quantity-control">
                                        <button type="button" onClick={() => changeCartQuantity(item.id, cartQuantity - 1)}>-</button>
                                        <strong>{cartQuantity}</strong>
                                        <button type="button" onClick={() => changeCartQuantity(item.id, cartQuantity + 1)}>+</button>
                                      </div>
                                    ) : (
                                      <button className="btn small" disabled={!isMenuItemCurrentlyAvailable(item)} onClick={() => addCartItem(item.id)}>
                                        {isMenuItemCurrentlyAvailable(item) ? "Add" : unavailableButtonText(item)}
                                      </button>
                                    )}

                                    {cartQuantity > 0 ? (
                                      <CustomerCustomizationPanel
                                        item={item}
                                        customization={customization}
                                        onInstructions={(text) => updateCartSpecialInstructions(item.id, text)}
                                        onToggleChoice={(group, choice) => toggleCartOptionChoice(item, group, choice)}
                                      />
                                    ) : null}
                                  </div>
                                  );
                                })
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
                              <div className="request-grid service-request-grid">
                                {getActiveServiceItems(state.serviceItems).map((item) => (
                                  <button key={item.id} className="request-btn service-request-btn" onClick={() => addRequest(item.name)}>
                                    {item.imageUrl ? (
                                      <img src={item.imageUrl} alt={item.name} />
                                    ) : (
                                      <span>{item.icon}</span>
                                    )}
                                    <strong>{item.name}</strong>
                                    {item.nameAr ? <small dir="rtl">{item.nameAr}</small> : null}
                                  </button>
                                ))}
                              </div>
                              <button className="btn ghost full" onClick={() => {
                                setOrderCart({});
    setOrderCustomizations({});
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
              <button
                type="button"
                onClick={restaurantLogout}
                style={{
                  position: "fixed",
                  right: 18,
                  bottom: 18,
                  zIndex: 9999,
                  border: 0,
                  borderRadius: 999,
                  padding: "12px 16px",
                  background: "#dc2626",
                  color: "#fff",
                  fontWeight: 900,
                  boxShadow: "0 16px 35px rgba(15, 23, 42, 0.25)",
                  cursor: "pointer",
                }}
                aria-label="Logout restaurant dashboard"
              >
                Logout
              </button>
              <aside className="manager-option2-sidebar">
                <div className="sidebar-logo-block restaurant-brand-logo-block">
                  <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                  <div>
                    <strong>{businessName}</strong>
                    <span>{branchName}</span>
                    <em className="license-active-until">License active until {licenseStatusText(state.profile)}</em>
                  </div>
                </div>

                <div className="sidebar-restaurant-card">
                  <LogoBox logoDataUrl={state.profile.logoDataUrl} fallback={logoFallback} customer />
                  <div>
                    <strong>{businessName}</strong>
                    <span>Restaurant logo for dashboard and QR</span>
                    <em className="license-active-until">License active until {licenseStatusText(state.profile)}</em>
                  </div>
                </div>

                <nav className="sidebar-nav">
                  <button className={`sidebar-nav-item ${managerTab === "kitchen" ? "active" : ""}`} type="button" onClick={() => setManagerTab("kitchen")}>Kitchen</button>
                  <button className={`sidebar-nav-item ${managerTab === "waiter" ? "active" : ""}`} type="button" onClick={() => setManagerTab("waiter")}>Waiter Calls</button>
                  <button className={`sidebar-nav-item ${managerTab === "tables" ? "active" : ""}`} type="button" onClick={() => setManagerTab("tables")}>Tables</button>
                  <button className={`sidebar-nav-item ${managerTab === "menu" ? "active" : ""}`} type="button" onClick={() => setManagerTab("menu")}>Menu</button>
                  <button className={`sidebar-nav-item ${managerTab === "menuBuilder" ? "active" : ""}`} type="button" onClick={() => setManagerTab("menuBuilder")}>Builder</button>
                  <button className={`sidebar-nav-item ${managerTab === "qr" ? "active" : ""}`} type="button" onClick={() => setManagerTab("qr")}>QR Tables</button>
                  <button className={`sidebar-nav-item ${managerTab === "profile" ? "active" : ""}`} type="button" onClick={() => setManagerTab("profile")}>Profile / Printers</button>
                </nav>

                <div className="sidebar-summary-card">
                  <span>Today’s Summary</span>
                  <div><strong>{openOrderCount}</strong><em>open orders</em></div>
                  <div><strong>{waitingRequests.length}</strong><em>waiter calls</em></div>
                  <div><strong>{tableTotal.toFixed(2)}</strong><em>table bill</em></div>
                </div>

                <button className="sidebar-primary-action" type="button" onClick={() => setManagerTab("qr")}>View QR Tables →</button>
                <button
                  className="sidebar-primary-action"
                  type="button"
                  onClick={restaurantLogout}
                  style={{
                    marginTop: 10,
                    background: "#dc2626",
                    borderColor: "#dc2626",
                    color: "#fff",
                  }}
                >
                  Logout
                </button>
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
                  <button className="btn danger small" type="button" onClick={restaurantLogout}>Logout</button>
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
                  <Tab label="Profile / Printers" active={managerTab === "profile"} onClick={() => setManagerTab("profile")} />
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
                                    <h4>{tableDisplayName(ticket.table, ticket.tableLabel)} - {ticket.guest}</h4>
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
                                      {order.modifiers.length ? <em>{formatOrderModifiers(order.modifiers)}</em> : null}
                                      {order.specialInstructions ? <em>Note: {order.specialInstructions}</em> : null}
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
                                  <span>{tableDisplayName(Number(tableNumber))}</span>
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
                              <span>{tableDisplayName(activeTable, activeTableLabel)}  "{order.itemName} for {order.guest}?"</span>
                            </div>
                            <button className="btn small ghost" onClick={() => setOrderStatus(order.id, "Served")}>Served</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {managerTab === "waiter" && (
                  <div className="two-col waiter-manager-grid">
                    <div className="manager-card">
                      <h3>Waiter Requests</h3>
                      <p className="sub">Customer calls from the table, with name included.</p>

                      {!waitingRequests.length ? (
                        <Empty text="No waiter requests. Try Call Waiter from the phone." />
                      ) : (
                        waitingRequests.map((request) => (
                          <div className="request-row" key={request.id}>
                            <div>
                              <strong>{tableDisplayName(request.table)}  {request.guest} requested {request.type}</strong>
                              <span>{new Date(request.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}  {request.status}</span>
                            </div>
                            <button className="btn small success" onClick={() => resolveRequest(request.id)}>Resolve</button>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="manager-card waiter-button-builder-card">
                      <div className="manager-card-heading-row">
                        <div>
                          <h3>Call Waiter Buttons</h3>
                          <p className="sub">Add the quick request buttons customers see. Example: napkins with a napkin picture.</p>
                        </div>
                        <button className="btn ghost small" type="button" onClick={refreshServiceItemsNow} disabled={serviceItemBusy}>
                          Refresh
                        </button>
                      </div>

                      <div className="service-item-form">
                        <Field label="Button name">
                          <input
                            value={serviceItemDraft.name}
                            onChange={(event) => setServiceItemDraft((current) => ({ ...current, name: event.target.value, icon: current.icon || menuIconFromName(event.target.value) }))}
                            placeholder="Napkins"
                          />
                        </Field>

                        <Field label="Arabic name">
                          <input
                            dir="rtl"
                            value={serviceItemDraft.nameAr}
                            onChange={(event) => setServiceItemDraft((current) => ({ ...current, nameAr: event.target.value }))}
                            placeholder="مناديل"
                          />
                        </Field>

                        <Field label="Short code">
                          <input
                            value={serviceItemDraft.icon}
                            onChange={(event) => setServiceItemDraft((current) => ({ ...current, icon: cleanServiceIcon(event.target.value, "") }))}
                            placeholder="NP"
                            maxLength={3}
                          />
                        </Field>

                        <Field label="Picture optional">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleServiceItemImageUpload}
                          />
                        </Field>

                        <label className="check-row service-active-row">
                          <input
                            type="checkbox"
                            checked={serviceItemDraft.active !== false}
                            onChange={(event) => setServiceItemDraft((current) => ({ ...current, active: event.target.checked }))}
                          />
                          Show on customer Call Waiter tab
                        </label>

                        {serviceItemDraft.imageUrl ? (
                          <div className="service-draft-preview">
                            <img src={serviceItemDraft.imageUrl} alt={serviceItemDraft.name || "Preview"} />
                            <button type="button" onClick={() => setServiceItemDraft((current) => ({ ...current, imageUrl: "" }))}>Remove picture</button>
                          </div>
                        ) : null}

                        <div className="row-actions">
                          <button className="btn" type="button" onClick={saveServiceItemFromDraft} disabled={serviceItemBusy}>
                            {serviceItemDraft.id ? "Save waiter button" : "Add waiter button"}
                          </button>
                          <button className="btn ghost" type="button" onClick={() => setServiceItemDraft(emptyServiceItemDraft)} disabled={serviceItemBusy}>
                            Clear
                          </button>
                        </div>
                      </div>

                      <div className="service-items-list">
                        {getActiveServiceItems(state.serviceItems).map((item) => (
                          <div className={`service-item-row ${item.active === false ? "inactive" : ""}`} key={item.id}>
                            <div className="service-item-avatar">
                              {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <span>{item.icon}</span>}
                            </div>

                            <div>
                              <strong>{item.name}</strong>
                              {item.nameAr ? <span dir="rtl">{item.nameAr}</span> : null}
                            </div>

                            <div className="service-item-actions">
                              <button className="btn small ghost" type="button" onClick={() => editServiceItem(item)}>Edit</button>
                              <button className="btn small secondary" type="button" onClick={() => toggleServiceItem(item)} disabled={serviceItemBusy}>
                                {item.active === false ? "Show" : "Hide"}
                              </button>
                              <button className="btn small danger" type="button" onClick={() => removeServiceItem(item)} disabled={serviceItemBusy}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {managerTab === "tables" && (
                  <div className="two-col">
                    <div className="manager-card">
                      <h3>Floor Tables</h3>
                      <p className="sub">Tap a table to view it. Reset clears names, bill totals, open orders, and waiter requests for that table.</p>

                      <div className="table-sort-toolbar">
                        <div>
                          <span>Active tables</span>
                          <strong>{activeTableDashboardCount} / {state.profile.tableCount}</strong>
                        </div>

                        <label>
                          Sort
                          <select value={tableSortMode} onChange={(e) => setTableSortMode(e.target.value as typeof tableSortMode)}>
                            <option value="number">Table number</option>
                            <option value="active">Active tables first</option>
                            <option value="needsHelp">Needs waiter first</option>
                            <option value="openOrders">Most open orders</option>
                            <option value="billHigh">Highest bill</option>
                            <option value="empty">Empty tables first</option>
                          </select>
                        </label>
                      </div>

                      <div className="table-map resettable-table-map">
                        {tableDashboardRows.map((row) => {
                          const tableNumber = row.tableNumber;
                          const active = row.active;
                          const needsHelp = row.needsHelp;
                          const tableOpenOrders = row.tableOpenOrders;
                          const tableBillTotal = row.tableBillTotal;
                          const tableGuestCount = row.tableGuestCount;
                          const pendingSession = row.pendingSession;
                          const liveSession = row.liveSession;
                          const isSelected = tableNumber === activeTable;

                          return (
                            <div key={tableNumber} className={`table-card resettable-table-card ${active ? "active-table" : ""} ${needsHelp ? "needs-help" : ""} ${isSelected ? "selected-table-card" : ""}`}>
                              <button
                                className="table-card-main"
                                type="button"
                                onClick={() => setActiveTable(tableNumber)}
                              >
                                <div>
                                  <h4>{tableDisplayName(Number(tableNumber))}</h4>
                                  <p>
                                    {active
                                      ? `${tableGuestCount} seated • ${tableOpenOrders} open • ${money(tableBillTotal)}`
                                      : "Available"}
                                  </p>
                                </div>
                                <span className={`status ${needsHelp ? "waiting" : active ? "ready" : "served"}`}>{needsHelp ? "Needs waiter" : (liveSession || pendingSession) ? "Session active" : active ? "Active" : "Empty"}</span>
                              </button>

                              <button
                                className="table-reset-button"
                                type="button"
                                onClick={() => closeTable(tableNumber)}
                                disabled={resettingTable === tableNumber || (!active && !needsHelp)}
                              >
                                {resettingTable === tableNumber ? "Resetting..." : "Reset table"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>{tableDisplayName(activeTable, activeTableLabel)} Bill</h3>
                      <p className="sub">This is the selected table only. Reset after guests leave to clear the next QR session.</p>
                      {(selectedLiveSession || selectedPendingSession) ? (
                        <div className="success-box" style={{ marginBottom: 12 }}>Live QR session active. Reset table when guests leave to kill this session.</div>
                      ) : null}
                      <GuestBillRows billByGuest={selectedTableBillByGuest} />
                      <div className="bill-total"><span>Total</span><span>{money(selectedTableTotal)}</span></div>
                      <div className="table-reset-summary">
                        <span>{selectedTableOpenOrderCount} open order{selectedTableOpenOrderCount === 1 ? "" : "s"}</span>
                        <span>{uniqueGuestNames(selectedTableOrders.map((order) => order.guest)).length || (activeTable === Number(activeTable) ? uniqueGuestNames(state.guests).length : 0)} guest{uniqueGuestNames(selectedTableOrders.map((order) => order.guest)).length === 1 ? "" : "s"}</span>
                      </div>
                      <button className="btn danger full" onClick={() => closeTable(activeTable)} disabled={resettingTable === activeTable}>
                        {resettingTable === activeTable ? "Resetting table..." : `Reset Table ${activeTable}`}
                      </button>
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

                      <div id="menu-builder-form" ref={menuBuilderFormRef} className="menu-builder-form">
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
                                  optionGroups: cleanMenuOptionGroups(menuDraft.optionGroups),
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

                        <datalist id="modifier-memory-option-groups">
                          {modifierMemory.optionGroups.map((group) => (
                            <option key={`group-${group.id}-${group.name}`} value={group.name}>
                              {group.choices.map((choice) => choice.name).filter(Boolean).join(", ")}
                            </option>
                          ))}
                        </datalist>

                        <datalist id="modifier-memory-option-groups-ar">
                          {modifierMemory.optionGroups.map((group) => group.nameAr ? (
                            <option key={`group-ar-${group.id}-${group.nameAr}`} value={group.nameAr}>
                              {group.name}
                            </option>
                          ) : null)}
                        </datalist>

                        <datalist id="modifier-memory-option-choices">
                          {modifierMemory.optionChoices.map((choice) => (
                            <option key={`choice-${choice.id}-${choice.name}`} value={choice.name}>
                              {choice.price > 0 ? `+${money(choice.price)}` : "Free"}
                            </option>
                          ))}
                        </datalist>

                        <datalist id="modifier-memory-option-choices-ar">
                          {modifierMemory.optionChoices.map((choice) => choice.nameAr ? (
                            <option key={`choice-ar-${choice.id}-${choice.nameAr}`} value={choice.nameAr}>
                              {choice.name}
                            </option>
                          ) : null)}
                        </datalist>

                        <datalist id="modifier-memory-sub-option-groups">
                          {modifierMemory.subOptionGroups.map((group) => (
                            <option key={`sub-group-${group.id}-${group.name}`} value={group.name}>
                              {group.choices.map((choice) => choice.name).filter(Boolean).join(", ")}
                            </option>
                          ))}
                        </datalist>

                        <datalist id="modifier-memory-sub-option-groups-ar">
                          {modifierMemory.subOptionGroups.map((group) => group.nameAr ? (
                            <option key={`sub-group-ar-${group.id}-${group.nameAr}`} value={group.nameAr}>
                              {group.name}
                            </option>
                          ) : null)}
                        </datalist>

                        <datalist id="modifier-memory-sub-option-choices">
                          {modifierMemory.subOptionChoices.map((choice) => (
                            <option key={`sub-choice-${choice.id}-${choice.name}`} value={choice.name}>
                              {choice.price > 0 ? `+${money(choice.price)}` : "Free"}
                            </option>
                          ))}
                        </datalist>

                        <datalist id="modifier-memory-sub-option-choices-ar">
                          {modifierMemory.subOptionChoices.map((choice) => choice.nameAr ? (
                            <option key={`sub-choice-ar-${choice.id}-${choice.nameAr}`} value={choice.nameAr}>
                              {choice.name}
                            </option>
                          ) : null)}
                        </datalist>

                        <div className="option-builder-card">
                          <div className="option-builder-head">
                            <div>
                              <h4>Customer choices / add-ons</h4>
                              <p>Use this for “choice of potato,” sauce options, doneness, extras, or paid add-ons. Saved options from other items appear as dropdown suggestions while typing.</p>
                            </div>
                            <button className="btn small secondary" type="button" onClick={addOptionGroupToDraft}>Add option group</button>
                          </div>

                          {menuDraft.optionGroups.length ? (
                            <div className="option-builder-stack">
                              {menuDraft.optionGroups.map((group) => (
                                <div className="option-group-editor" key={group.id}>
                                  <div className="option-group-grid">
                                    <Field label="Option group">
                                      <input
                                        list="modifier-memory-option-groups"
                                        value={group.name}
                                        onChange={(e) => applyReusableOptionGroupName(group.id, e.target.value)}
                                        placeholder="Example: Choice of potato"
                                      />
                                    </Field>
                                    <Field label="Arabic option group">
                                      <input
                                        list="modifier-memory-option-groups-ar"
                                        dir="rtl"
                                        value={group.nameAr}
                                        onChange={(e) => applyReusableOptionGroupNameAr(group.id, e.target.value)}
                                        placeholder="مثال: اختيار البطاطا"
                                      />
                                    </Field>
                                  </div>

                                  <div className="option-group-grid compact">
                                    <Field label="Required?">
                                      <select
                                        value={group.required ? "yes" : "no"}
                                        onChange={(e) => updateOptionGroupInDraft(group.id, { required: e.target.value === "yes" })}
                                      >
                                        <option value="no">Optional</option>
                                        <option value="yes">Required</option>
                                      </select>
                                    </Field>

                                    <Field label="Customer can choose">
                                      <select
                                        value={group.multiple ? "multiple" : "single"}
                                        onChange={(e) => updateOptionGroupInDraft(group.id, { multiple: e.target.value === "multiple" })}
                                      >
                                        <option value="single">One choice</option>
                                        <option value="multiple">Multiple choices</option>
                                      </select>
                                    </Field>
                                  </div>

                                  <div className="option-choice-editor-list">
                                    {group.choices.map((choice) => (
                                      <div className="option-choice-with-nesting" key={choice.id}>
                                        <div className="option-choice-editor">
                                          <input
                                            list="modifier-memory-option-choices"
                                            value={choice.name}
                                            onChange={(e) => applyReusableOptionChoiceName(group.id, choice.id, e.target.value)}
                                            placeholder="French fries"
                                          />
                                          <input
                                            list="modifier-memory-option-choices-ar"
                                            dir="rtl"
                                            value={choice.nameAr}
                                            onChange={(e) => applyReusableOptionChoiceNameAr(group.id, choice.id, e.target.value)}
                                            placeholder="بطاطا مقلية"
                                          />
                                          <input
                                            type="number"
                                            min={0}
                                            step="0.05"
                                            value={choice.price}
                                            onChange={(e) => updateOptionChoiceInDraft(group.id, choice.id, { price: Number(e.target.value || 0) })}
                                            placeholder="0.00"
                                          />
                                          <button className="btn small secondary" type="button" onClick={() => addSubOptionGroupToChoice(choice.id)}>Add sub-option</button>
                                          <button className="btn small ghost" type="button" onClick={() => removeOptionChoiceFromDraft(group.id, choice.id)}>Remove</button>
                                        </div>

                                        {choice.subOptionGroups?.length ? (
                                          <div className="nested-option-builder">
                                            <div className="nested-option-title">Options only shown when “{choice.name || choice.nameAr || "this choice"}” is selected</div>
                                            {choice.subOptionGroups.map((subGroup) => (
                                              <div className="nested-option-group-editor" key={subGroup.id}>
                                                <div className="option-group-grid">
                                                  <Field label="Sub-option group">
                                                    <input
                                                      list="modifier-memory-sub-option-groups"
                                                      value={subGroup.name}
                                                      onChange={(e) => applyReusableOptionGroupName(subGroup.id, e.target.value, true)}
                                                      placeholder="Example: Gravy type"
                                                    />
                                                  </Field>
                                                  <Field label="Arabic sub-option group">
                                                    <input
                                                      list="modifier-memory-sub-option-groups-ar"
                                                      dir="rtl"
                                                      value={subGroup.nameAr}
                                                      onChange={(e) => applyReusableOptionGroupNameAr(subGroup.id, e.target.value, true)}
                                                      placeholder="مثال: نوع الصوص"
                                                    />
                                                  </Field>
                                                </div>

                                                <div className="option-group-grid compact">
                                                  <Field label="Required?">
                                                    <select
                                                      value={subGroup.required ? "yes" : "no"}
                                                      onChange={(e) => updateOptionGroupInDraft(subGroup.id, { required: e.target.value === "yes" })}
                                                    >
                                                      <option value="no">Optional</option>
                                                      <option value="yes">Required</option>
                                                    </select>
                                                  </Field>

                                                  <Field label="Customer can choose">
                                                    <select
                                                      value={subGroup.multiple ? "multiple" : "single"}
                                                      onChange={(e) => updateOptionGroupInDraft(subGroup.id, { multiple: e.target.value === "multiple" })}
                                                    >
                                                      <option value="single">One choice</option>
                                                      <option value="multiple">Multiple choices</option>
                                                    </select>
                                                  </Field>
                                                </div>

                                                <div className="option-choice-editor-list nested-choice-list">
                                                  {subGroup.choices.map((subChoice) => (
                                                    <div className="option-choice-editor" key={subChoice.id}>
                                                      <input
                                                        list="modifier-memory-sub-option-choices"
                                                        value={subChoice.name}
                                                        onChange={(e) => applyReusableOptionChoiceName(subGroup.id, subChoice.id, e.target.value, true)}
                                                        placeholder="Brown gravy"
                                                      />
                                                      <input
                                                        list="modifier-memory-sub-option-choices-ar"
                                                        dir="rtl"
                                                        value={subChoice.nameAr}
                                                        onChange={(e) => applyReusableOptionChoiceNameAr(subGroup.id, subChoice.id, e.target.value, true)}
                                                        placeholder="صوص بني"
                                                      />
                                                      <input
                                                        type="number"
                                                        min={0}
                                                        step="0.05"
                                                        value={subChoice.price}
                                                        onChange={(e) => updateOptionChoiceInDraft(subGroup.id, subChoice.id, { price: Number(e.target.value || 0) })}
                                                        placeholder="0.00"
                                                      />
                                                      <button className="btn small ghost" type="button" onClick={() => removeOptionChoiceFromDraft(subGroup.id, subChoice.id)}>Remove</button>
                                                    </div>
                                                  ))}
                                                </div>

                                                <div className="row-actions option-actions nested-actions">
                                                  <button className="btn small secondary" type="button" onClick={() => addOptionChoiceToDraft(subGroup.id)}>Add gravy / topping choice</button>
                                                  <button className="btn small danger" type="button" onClick={() => removeOptionGroupFromDraft(subGroup.id)}>Remove sub-option group</button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : null}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="row-actions option-actions">
                                    <button className="btn small secondary" type="button" onClick={() => addOptionChoiceToDraft(group.id)}>Add choice</button>
                                    <button className="btn small danger" type="button" onClick={() => removeOptionGroupFromDraft(group.id)}>Remove group</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="option-empty-helper">
                              Example: Group “Choice of potato” with choices “French fries — Free,” “Mashed potato — Free,” “Loaded potato — +1.00 JOD.”
                            </div>
                          )}
                        </div>

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
                                        {item.optionGroups.length ? <span className="modifier-summary">{item.optionGroups.length} option group{item.optionGroups.length === 1 ? "" : "s"}</span> : null}
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
                      <p className="sub">The restaurant prints its own QR codes. Each QR is tied to this business, this branch, and one table/location. Use a name like Admin Office, ICU Nurses Station, Patio 1, or Table 7.</p>

                      <div className="qr-create-row">
                        <Field label="Table/location number">
                          <input
                            type="number"
                            min={1}
                            max={999}
                            value={qrInput}
                            onChange={(e) => {
                              const nextTable = e.target.value;
                              const normalizedTable = String(Math.max(1, Math.min(999, Number(nextTable || DEMO_TABLE))));
                              setQrInput(nextTable);
                              setQrLabelInput(cleanTableLabel(state.tableLabels[normalizedTable] || ""));
                              setQrAutoModeInput(state.tableAutoModes[normalizedTable] === true);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && createQr()}
                          />
                        </Field>
                        <Field label="Display name optional">
                          <input
                            value={qrLabelInput}
                            placeholder="Example: Admin Office"
                            onChange={(e) => setQrLabelInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && createQr()}
                          />
                        </Field>
                        <label className="check-row field">
                          <input
                            type="checkbox"
                            checked={qrAutoModeInput}
                            onChange={(e) => setQrAutoModeInput(e.target.checked)}
                          />
                          Auto mode: print order only, then reset this QR automatically
                        </label>
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
                          <div className="bill-row"><span>Location</span><strong>{tableDisplayName(selectedQrTable, selectedQrTableLabel)}</strong></div>
                          <div className="bill-row"><span>Internal number</span><strong>{selectedQrTable}</strong></div>
                          <div className="bill-row"><span>Mode</span><strong>{selectedQrAutoMode ? "Auto print + reset" : "Normal table bill"}</strong></div>
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
                        <div className="bill-row"><span>Table/location</span><strong>Locked</strong></div>
                        <div className="bill-row"><span>Customer name required</span><strong>Yes</strong></div>
                        <div className="bill-row"><span>Auto mode option</span><strong>Print only, then reset</strong></div>
                        <div className="bill-row"><span>Kitchen receives</span><strong>Location + name</strong></div>
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
                          <span className="profile-license-line">License active until {licenseStatusText(state.profile)}</span>
                        </div>
                      </div>

                      <div className="profile-payment-card">
                        <div>
                          <span>Account billing</span>
                          <strong>{money(autoBalanceDueJod)}</strong>
                          <p>Due by {displayDate(state.profile.servicePaymentDueDate)} • Expires {displayDate(state.profile.serviceExpiresAt)}</p>
                        </div>
                        <button className="btn dark" type="button" onClick={openPayByCliqModal}>Pay By Cliq</button>
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
                        <div className="bill-row"><span>License status</span><strong>{state.profile.serviceStatus || "active"}</strong></div>
                        <div className="bill-row"><span>Payment due date</span><strong>{displayDate(state.profile.servicePaymentDueDate)}</strong></div>
                        <div className="bill-row"><span>Expiration date</span><strong>{displayDate(state.profile.serviceExpiresAt)}</strong></div>
                        <div className="bill-row"><span>Balance due</span><strong>{money(autoBalanceDueJod)}</strong></div>
                        <div className="bill-row"><span>Pricing</span><strong>{money(state.profile.serviceMonthlyFeeJod || monthlyTableFee(state.profile.tableCount))}/month minimum</strong></div>
                        <div className="bill-row"><span>Trial</span><strong>30 days free</strong></div>
                      </div>
                    </div>

                    <div className="manager-card">
                      <h3>Menu Setup</h3>
                      <p className="sub">Add items, upload item pictures, and control what customers see on the QR menu.</p>
                      <button className="btn secondary full" onClick={openMenuBuilder}>Open Menu Builder</button>
                    </div>

                    <div className="manager-card printer-settings-card">
                      <div className="printer-settings-head">
                        <div>
                          <h3>Printer Settings</h3>
                          <p className="sub">Enter the IP address from the printer self-test printout. Most network POS printers use port 9100.</p>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                          <a
                            className="btn secondary small"
                            href="/downloads/tawleh-printer-bridge-windows.zip"
                            download
                          >
                            Download Printer App
                          </a>
                          <button className="btn ghost small" type="button" onClick={() => refreshPrinterSettingsNow()} disabled={printerBusy}>
                            {printerBusy ? "Loading..." : "Refresh"}
                          </button>
                        </div>
                      </div>

                      <div className="printer-ready-note">
                        Step 1: download and install the Tawleh Printer App on the restaurant Windows computer. Step 2: save the kitchen/cashier printer details here. The computer must be on the same network as the POS printer.
                      </div>

                      <div className="printer-form-grid">
                        <Field label="Printer name">
                          <input
                            value={printerDraft.printerName}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, printerName: event.target.value }))}
                            placeholder="Kitchen Printer"
                          />
                        </Field>

                        <Field label="Printer use">
                          <select
                            value={printerDraft.printerRole}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, printerRole: event.target.value }))}
                          >
                            <option value="kitchen">Kitchen</option>
                            <option value="cashier">Cashier / Bill</option>
                            <option value="bar">Bar</option>
                            <option value="expo">Expo / Runner</option>
                            <option value="backup">Backup</option>
                          </select>
                        </Field>

                        <Field label="Printer IP address">
                          <input
                            value={printerDraft.printerIp}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, printerIp: event.target.value.trim() }))}
                            placeholder="192.168.1.45"
                            inputMode="numeric"
                          />
                        </Field>

                        <Field label="Port">
                          <input
                            type="number"
                            min={1}
                            max={65535}
                            value={printerDraft.printerPort}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, printerPort: Number(event.target.value || 9100) }))}
                            placeholder="9100"
                          />
                        </Field>

                        <Field label="Paper width">
                          <select
                            value={printerDraft.paperWidth}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, paperWidth: event.target.value }))}
                          >
                            <option value="80mm">80mm</option>
                            <option value="58mm">58mm</option>
                          </select>
                        </Field>

                        <Field label="Copies">
                          <input
                            type="number"
                            min={1}
                            max={10}
                            value={printerDraft.copies}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, copies: Math.max(1, Math.min(10, Number(event.target.value || 1))) }))}
                          />
                        </Field>

                        <label className="check-row field full">
                          <input
                            type="checkbox"
                            checked={printerDraft.autoPrint !== false}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, autoPrint: event.target.checked }))}
                          />
                          Auto-print new orders for this printer role when the local print bridge is connected
                        </label>

                        <label className="check-row field full">
                          <input
                            type="checkbox"
                            checked={printerDraft.isActive !== false}
                            onChange={(event) => setPrinterDraft((current) => ({ ...current, isActive: event.target.checked }))}
                          />
                          Printer is active
                        </label>
                      </div>

                      <div className="row-actions">
                        <button className="btn" type="button" onClick={savePrinterFromDraft} disabled={printerBusy}>
                          {printerBusy ? "Saving..." : printerDraft.id ? "Save printer" : "Add printer"}
                        </button>
                        <button className="btn ghost" type="button" onClick={() => { setPrinterDraft(emptyPrinterDraft); setPrinterMessage(""); }} disabled={printerBusy}>
                          Clear
                        </button>
                      </div>

                      {printerMessage ? <div className="admin-message">{printerMessage}</div> : null}

                      <div className="printer-list">
                        {printerSettings.length ? (
                          printerSettings.map((printer) => (
                            <div className="printer-row" key={printer.id || `${printer.printerIp}-${printer.printerRole}`}>
                              <div>
                                <strong>{printer.printerName}</strong>
                                <span>{printer.printerRole.toUpperCase()} • {printer.printerIp}:{printer.printerPort} • {printer.paperWidth} • {printer.copies} cop{printer.copies === 1 ? "y" : "ies"}</span>
                                <em className={`printer-status-pill ${printer.isActive ? "" : "off"}`}>
                                  {printer.isActive ? "Active" : "Disabled"} {printer.autoPrint ? "• Auto print" : "• Manual"}
                                </em>
                              </div>
                              <div className="printer-row-actions">
                                <button className="btn small ghost" type="button" onClick={() => markPrinterReadyForBridge(printer)}>Bridge info</button>
                                <button className="btn small secondary" type="button" onClick={() => editPrinterSetting(printer)}>Edit</button>
                                <button className="btn small danger" type="button" onClick={() => deletePrinterSetting(printer)} disabled={printerBusy}>Remove</button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <Empty text="No printers saved yet. Print the POS printer self-test page, then enter the IP address here." />
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </section>
            )}
          </section>

          {salespersonModalOpen ? (
            <div className="modal-backdrop cliq-payment-backdrop">
              <form className="salesperson-modal" onSubmit={createSalesperson}>
                <div className="cliq-payment-modal-head">
                  <div>
                    <span>Sales team</span>
                    <h2>Add salesperson</h2>
                    <p>Create the username you will give to a salesperson. They must enter it before the signup page opens.</p>
                  </div>
                  <button className="modal-close" type="button" onClick={() => setSalespersonModalOpen(false)}>×</button>
                </div>

                <div className="cliq-payment-grid">
                  <Field label="Salesperson username">
                    <input
                      value={salespersonDraftUsername}
                      onChange={(event) => setSalespersonDraftUsername(normalizeUsername(event.target.value))}
                      placeholder="example: mohammed_sales"
                    />
                  </Field>

                  <Field label="Salesperson name">
                    <input
                      value={salespersonDraftName}
                      onChange={(event) => setSalespersonDraftName(event.target.value)}
                      placeholder="Full name"
                    />
                  </Field>

                  <Field label="Salesperson phone">
                    <input
                      value={salespersonDraftPhone}
                      onChange={(event) => setSalespersonDraftPhone(event.target.value)}
                      placeholder="07XXXXXXXX"
                    />
                  </Field>
                </div>

                <div className="cliq-payment-actions">
                  <button className="btn ghost" type="button" onClick={() => setSalespersonModalOpen(false)}>
                    Close
                  </button>
                  <button className="btn dark" type="submit" disabled={salespersonBusy}>
                    {salespersonBusy ? "Saving..." : "Add salesperson"}
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {cliqPayOpen ? (
            <div className="modal-backdrop cliq-payment-backdrop">
              <form className="cliq-payment-modal" onSubmit={submitCliqPaymentRequest}>
                <div className="cliq-payment-modal-head">
                  <div>
                    <span>Pay by CliQ</span>
                    <h2>{businessName} payment due</h2>
                    <p>Send CliQ first, then submit the reference details here so Tawleh admin can verify the payment.</p>
                  </div>
                  <button className="modal-close" type="button" onClick={() => setCliqPayOpen(false)}>×</button>
                </div>

                <div className="cliq-payment-due-box">
                  <div>
                    <span>Monthly fee</span>
                    <strong>{money(cliqMonthlyFeeJod)}</strong>
                  </div>
                  <div>
                    <span>Selected months</span>
                    <strong>{cliqMonths}</strong>
                  </div>
                  <div>
                    <span>Total to send</span>
                    <strong>{money(cliqPaymentAmountJod)}</strong>
                  </div>
                </div>

                <div className="cliq-send-to-box">
                  <span>Send CliQ to</span>
                  <strong>0793009420-Jihad Saleh</strong>
                  <p>Payment due date: {displayDate(state.profile.servicePaymentDueDate)}</p>
                </div>

                <div className="cliq-payment-grid">
                  <Field label="How many months are you paying?">
                    <select
                      value={cliqMonths}
                      onChange={(event) => setCliqMonths(Math.max(1, Math.min(24, Number(event.target.value || 1))))}
                    >
                      <option value={1}>1 month</option>
                      <option value={2}>2 months</option>
                      <option value={3}>3 months</option>
                      <option value={6}>6 months</option>
                      <option value={12}>1 year / 12 months</option>
                    </select>
                  </Field>

                  <Field label="CliQ reference number">
                    <input
                      value={cliqReferenceNumber}
                      onChange={(event) => setCliqReferenceNumber(event.target.value)}
                      placeholder="Enter bank reference number"
                    />
                  </Field>

                  <Field label="CliQ name sent from">
                    <input
                      value={cliqSenderName}
                      onChange={(event) => setCliqSenderName(event.target.value)}
                      placeholder="Name shown on CliQ transfer"
                    />
                  </Field>

                  <Field label="CliQ phone sent from">
                    <input
                      value={cliqSenderPhone}
                      onChange={(event) => setCliqSenderPhone(event.target.value)}
                      placeholder="07XXXXXXXX"
                    />
                  </Field>
                </div>

                {cliqPayMessage ? <div className="admin-message">{cliqPayMessage}</div> : null}

                <div className="cliq-payment-actions">
                  <button className="btn ghost" type="button" onClick={() => setCliqPayOpen(false)}>
                    Close
                  </button>
                  <button className="btn dark" type="submit" disabled={cliqPayBusy}>
                    {cliqPayBusy ? "Sending..." : "Send payment notification"}
                  </button>
                </div>
              </form>
            </div>
          ) : null}

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
                  <div className="print-table-badge">{tableDisplayName(selectedQrTable, selectedQrTableLabel)}</div>
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

function CustomerCustomizationPanel({
  item,
  customization,
  onInstructions,
  onToggleChoice,
}: {
  item: MenuItem;
  customization: CartCustomization;
  onInstructions: (text: string) => void;
  onToggleChoice: (group: MenuOptionGroup, choice: MenuOptionChoice) => void;
}) {
  const optionGroups = item.optionGroups || [];

  return (
    <div className="customer-customize-panel">
      {optionGroups.length ? (
        <div className="customer-option-groups">
          {optionGroups.map((group) => {
            const selected = new Set(customization.selectedChoices[group.id] || []);

            return (
              <div className="customer-option-group" key={group.id}>
                <div className="customer-option-group-head">
                  <strong>{group.name}</strong>
                  <span>{group.required ? "Required" : "Optional"} • {group.multiple ? "Choose more than one" : "Choose one"}</span>
                </div>

                <div className="customer-option-choice-grid">
                  {group.choices.map((choice) => {
                    const isSelected = selected.has(choice.id);

                    return (
                      <div className="customer-option-choice-wrap" key={choice.id}>
                        <button
                          className={`customer-option-choice ${isSelected ? "selected" : ""}`}
                          type="button"
                          onClick={() => onToggleChoice(group, choice)}
                        >
                          <span>{choice.name}</span>
                          <b>{choice.price > 0 ? `+${money(choice.price)}` : "Free"}</b>
                        </button>

                        {isSelected && choice.subOptionGroups?.length ? (
                          <div className="customer-nested-option-groups">
                            {choice.subOptionGroups.map((subGroup) => {
                              const nestedSelected = new Set(customization.selectedChoices[subGroup.id] || []);

                              return (
                                <div className="customer-option-group nested" key={subGroup.id}>
                                  <div className="customer-option-group-head">
                                    <strong>{subGroup.name}</strong>
                                    <span>{subGroup.required ? "Required" : "Optional"} • {subGroup.multiple ? "Choose more than one" : "Choose one"}</span>
                                  </div>

                                  <div className="customer-option-choice-grid">
                                    {subGroup.choices.map((subChoice) => {
                                      const nestedIsSelected = nestedSelected.has(subChoice.id);

                                      return (
                                        <button
                                          key={subChoice.id}
                                          className={`customer-option-choice nested-choice ${nestedIsSelected ? "selected" : ""}`}
                                          type="button"
                                          onClick={() => onToggleChoice(subGroup, subChoice)}
                                        >
                                          <span>{subChoice.name}</span>
                                          <b>{subChoice.price > 0 ? `+${money(subChoice.price)}` : "Free"}</b>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      <label className="customer-special-instructions">
        <span>Special instructions</span>
        <textarea
          value={customization.specialInstructions}
          onChange={(event) => onInstructions(event.target.value)}
          placeholder="Example: no onions, sauce on the side, extra lemon..."
          maxLength={240}
        />
      </label>
    </div>
  );
}

function BillRows({ orders }: { orders: Order[] }) {
  if (!orders.length) return <Empty text="No items under your name yet." />;

  return (
    <div className="bill-list">
      {orders.map((order) => (
        <div className="bill-row" key={order.id}>
          <span>
            {order.itemName} {Math.max(1, Number(order.quantity || 1)) > 1 ? `x${order.quantity}` : ""} <small> {order.status}</small>
            {order.modifiers.length ? <em>{formatOrderModifiers(order.modifiers)}</em> : null}
            {order.specialInstructions ? <em>Note: {order.specialInstructions}</em> : null}
          </span>
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
        <p>{order.tableLabel || `Table ${order.table}`}  {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
        {order.modifiers.length ? <p className="order-modifiers">{formatOrderModifiers(order.modifiers)}</p> : null}
        {order.specialInstructions ? <p className="order-special-instructions">Note: {order.specialInstructions}</p> : null}
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