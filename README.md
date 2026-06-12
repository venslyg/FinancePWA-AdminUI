# Multi-Tenant Church Finance Management System

Production-grade Angular admin frontend for a multi-tenant church finance platform.

## Purpose

This application is the administrative shell for managing branch-scoped finance data, including:

- Branch workspace records
- Chart of accounts
- Income and donation tracking
- Dynamic expense management
- Bank and petty cash ledgers
- Asset register and depreciation history
- Inventory bin card tracking
- Liability and debt management
- Budget plans and threshold warnings
- Church staff and salary payouts

The system is designed around soft multi-tenancy, offline-first queueing, and audit-aware data capture.

## Development Plan

1. Stabilize the shell
   - Keep the router aligned with only the modules that exist in the repository.
   - Keep the main dashboard, navigation, and resolver layer free of stale references.

2. Establish branch context
   - Implement branch records as the primary operational scope.
   - Ensure every transactional list is filtered by `branchCode` where applicable.

3. Build the chart of accounts layer
   - Maintain account sets for assets, income, expenses, and liabilities.
   - Use account codes as the reference backbone for downstream postings.

4. Deliver income tracking
   - Support receipts, donations, offerings, and event income.
   - Enforce sequential income code generation and sync status handling.

5. Deliver dynamic expense workflows
   - Keep expense categories and subcategories editable without rigid enum lock-in.
   - Connect expense entries to approval states and vendor references.

6. Complete ledger operations
   - Implement bank and petty cash ledgers with sequential running balances.
   - Keep reference mapping symmetrical between ledger movements and source transactions.

7. Finish asset lifecycle management
   - Manage asset registers, categories, and subcategories.
   - Record depreciation history chronologically and keep current value updates consistent.

8. Add inventory and bin card tracking
   - Track consumables through inventory items and bin card lines.
   - Update running stock counts from every quantity in/out movement.

9. Add liability and debt handling
   - Track loan balances, interest, payment schedules, and outstanding amounts.
   - Automatically reflect expense-driven liability reductions.

10. Add budget controls
    - Track planned allocations, spending, remaining balances, and usage percentages.
    - Block overspend states and surface warnings at 80 percent and 100 percent thresholds.

11. Add staff and payout modules
    - Track church staff, roles, and employment type.
    - Manage salary payouts and contract labor references.

12. Implement auditing and offline resilience
    - Capture `createdBy`, `createdDate`, `lastModifiedBy`, and `lastModifiedDate` on every entity.
    - Queue submissions locally when offline and sync them back when connectivity returns.

13. Harden validation and reporting
    - Add entity-level validation, duplicate-code checks, and dashboard summaries.
    - Keep reporting filters consistent across lists and detail forms.

## Current Navigation Scope

The sidebar should expose the active finance modules that exist in this codebase:

- Dashboard
- Branches
- Chart of Accounts
- Income Entries
- Expense Categories
- Expense Subcategories
- Expense Entries
- Bank Ledger
- Petty Cash Ledger
- Asset Categories
- Asset Subcategories
- Asset Register
- Asset Depreciation History
- Inventory Items
- Bin Card Lines
- Liability Log
- Budget Plans
- Maintenance Log
- Church Staff
- Salary Payouts
- Donation Tracker

## Getting Started

1. Install dependencies with `npm install`.
2. Start the app with `npm start`.
3. Open the local development server and verify the router, dashboard, and navigation links.

## Build and Test

- Build: `npm run build`
- Watch mode: `npm run watch`
- Unit tests: `npm test`

## Notes

- The current codebase uses Angular standalone components and lazy-loaded routes.
- The long-term goal is to keep the frontend aligned with the finance domain model and avoid stale HR-only module references.
