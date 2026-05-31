---
description: "Use when reviewing Vipas Energy TypeScript or React changes for architecture compliance, type safety, performance, security, bundle impact, and responsive behavior."
applyTo: "**/*.{ts,tsx}"
---

# Review Checklist

Prioritize findings that can cause bugs, regressions, architectural drift, or maintenance cost.

## Architecture Compliance

- Confirm the change fits the App Router structure and current route-group boundaries.
- Confirm frontend code stays within frontend responsibilities and does not reimplement backend staging logic.
- Confirm state goes through Redux slices or RTK Query instead of scattered local workarounds when shared behavior is intended.

## Type Safety

- Reject `any`, unsafe casts, or weakened typings without a strong reason.
- Check that props, selectors, and RTK Query contracts remain explicit and narrow.
- Check that new code respects the repo’s strict TypeScript settings.

## Performance

- Watch for unnecessary `"use client"` expansion.
- Watch for large dependencies or repeated heavy logic in route/page components.
- For future chart work, require lazy loading and shared wrappers instead of repeated initialization logic.

## Security

- No secrets or third-party keys in client code.
- Auth headers should continue flowing through `baseApi` rather than duplicated request logic.
- Reject `dangerouslySetInnerHTML` for API or AI text unless explicitly reviewed and sanitized.

## Bundle Impact

- Prefer extending existing libraries already in the repo.
- Avoid adding a second library for a solved problem.
- Keep shared abstractions small so route bundles stay focused.

## Responsive And Tablet Behavior

- Check for fixed widths or layout assumptions that break tablet targets.
- Prefer token-based spacing and semantic layout utilities.
- Flag any component that is clearly desktop-only without an explicit product decision.
