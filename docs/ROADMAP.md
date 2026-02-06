# FinTrack Web - Feature Roadmap

This document tracks the implementation status of FinTrack Web features for the Angular 21 frontend application.

---

## Technology Stack

- **Framework**: Angular 21 (Client-side rendering only)
- **UI Library**: Angular Material
- **API Client**: Auto-generated using `ng-openapi-gen` from [docs/swagger.yaml](file:///Users/igoventura/Developer/Personal/fintrack-api/docs/swagger.yaml)
- **State Management**: Angular Signals (primary) + RxJS (for HTTP)
- **Styling**: SCSS with BEM methodology + Material Design theming
- **Accessibility**: WCAG AA compliance mandatory

---

## Phase 0: Project Setup & Infrastructure (100%)

Foundation for the frontend application.

### Project Initialization

- [x] Create Angular 21 project with standalone components
- [x] Configure TypeScript with strict mode
- [x] Set up project structure following [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md)
- [x] Configure Angular Material with custom theme
- [x] Set up SCSS architecture (variables, mixins, utilities)
- [x] Configure ESLint and Prettier
- [x] Create `.gitignore` for Angular projects
- [x] Create `Dockerfile` for containerization

### API Integration

- [x] Install `ng-openapi-gen` package
- [x] Copy `docs/swagger.yaml` to `src/api/openapi.yaml`
- [x] Create `openapi.config.ts` for code generation
- [x] Add NPM script: `generate:api`
- [x] Generate initial API client (`npm run generate:api`)
- [x] Verify generated services in `src/api/providers/`
- [x] Verify generated models in `src/api/models/`

### Development Environment

- [x] Configure environments (`environment.ts`, `environment.prod.ts`)
- [x] Configure direct API access (CORS) - `proxy.conf.json` removed
- [x] Create VS Code workspace settings
- [x] Configure launch configurations for debugging
- [x] Set up Angular DevTools

### Documentation

- [x] Create `README.md` with setup instructions
- [x] Link to GUIDELINES.md
- [x] Link to PROJECT_STRUCTURE.md
- [x] Document API generation workflow

---

## Phase 1: Core Infrastructure (100%)

Essential services, interceptors, and guards.

### Core Services

- [x] **Storage Service** (`src/app/core/services/storage.service.ts`)
  - LocalStorage wrapper with type safety
  - Methods: `set()`, `get()`, `remove()`, `clear()`
  - Store JWT tokens, tenant ID, user preferences

- [x] **Toast/Notification Service** (`src/app/core/services/toast.service.ts`)
  - Success, error, warning, info notifications
  - Integration with Angular Material Snackbar
  - Global notification management with signals

- [x] **Theme Service** (`src/app/core/services/theme.service.ts`)
  - Light/dark mode toggle
  - Persist theme preference in local storage
  - Signal-based theme state

### HTTP Interceptors

- [x] **Auth Interceptor** (`src/app/core/interceptors/auth.interceptor.ts`)
  - Automatically add `Authorization: Bearer <token>` header
  - Get token from StorageService
  - Skip for public endpoints (login, register)

- [x] **Tenant Interceptor** (`src/app/core/interceptors/tenant.interceptor.ts`)
  - Automatically add `X-Tenant-ID` header
  - Get tenant ID from TenantService
  - Skip for auth and tenant selection endpoints

- [x] **Error Interceptor** (`src/app/core/interceptors/error.interceptor.ts`)
  - Global error handling
  - Show toast notifications for errors
  - Handle 401 (redirect to login), 403 (show forbidden message)
  - Log errors to console in development

### Guards

- [x] **Auth Guard** (`src/app/core/guards/auth.guard.ts`)
  - Check if user is authenticated
  - Redirect to login if not authenticated
  - Allow access if valid token exists

- [x] **Tenant Guard** (`src/app/core/guards/tenant.guard.ts`)
  - Check if tenant context is set
  - Redirect to tenant selection if no tenant
  - Allow access if tenant ID exists

- [x] **Guest Guard** (`src/app/core/guards/guest.guard.ts`)
  - Prevent authenticated users from accessing auth pages
  - Redirect to dashboard if already logged in

### Application Configuration

- [x] **App Config** (`src/app/app.config.ts`)
  - Configure HTTP client with interceptors
  - Set up Angular Material providers
  - Configure routing with guards
  - Set up default error handler
  - [x] Internationalization (i18n) setup (`ngx-translate`)

---

## Phase 2: Authentication (100%)

User authentication and registration flows.

### Auth Service

- [x] **Auth Service** (`src/app/features/auth/services/auth-api.service.ts`)
  - Wrap generated `AuthService` from API
  - State management with signals:
    - `currentUser` signal (User | null)
    - `isAuthenticated` computed signal
    - `authToken` signal
  - Methods:
    - `login(username, password)` - Call API, store token
    - `register(data)` - Call API, auto-login
    - `logout()` - Clear storage, reset state
    - `checkAuth()` - Validate stored token on app init

### Login Component

- [x] **Login Component** (`src/app/features/auth/components/login/`)
  - Reactive form with email and password fields
  - Form validation (required, email format, min length)
  - Show/hide password toggle
  - Loading state during submission
  - Error messages from API
  - "Remember me" checkbox (optional)
  - Link to registration page
  - Use Material components: `mat-card`, `mat-form-field`, `mat-button`

### Register Component

- [x] **Register Component** (`src/app/features/auth/components/register/`)
  - Reactive form with full name, email, password, confirm password
  - Form validation:
    - Full name required
    - Valid email format
    - Password min 6 characters
    - Passwords match
  - Show/hide password toggle
  - Loading state during submission
  - Error messages from API
  - Link to login page
  - Use Material components

### Auth Routes

- [x] **Auth Routing** (`src/app/features/auth/auth.routes.ts`)
  - `/auth/login` - Login page (guest guard)
  - `/auth/register` - Register page (guest guard)
  - Default redirect to login

---

## Phase 3: Multi-Tenancy (100%)

Tenant selection and management.

### Tenant Service

- [x] **Tenant Service** (`src/app/core/services/tenant.service.ts`)
  - State management with signals:
    - `currentTenantId` signal (string | null)
    - `currentTenant` signal (Tenant | null)
    - `userTenants` signal (Tenant[])
  - Methods:
    - `loadUserTenants()` - Fetch user's tenants from API
    - `setCurrentTenant(tenantId)` - Set active tenant, store in local storage
    - `createTenant(name)` - Create new tenant
    - `getCurrentTenantId()` - Get current tenant ID for interceptor
    - [x] Reactive data reloading on tenant switch (`TenantScopedServiceBase`)

### Tenant Selection Component

- [x] **Tenant Selector** (`src/app/features/tenants/components/tenant-selector/`)
  - List user's tenants as Material cards
  - Show tenant name and creation date
  - Click to select tenant
  - Button to create new tenant
  - Empty state if no tenants
  - Store selection and redirect to dashboard

### Create Tenant Dialog

- [x] **Create Tenant Dialog** (`src/app/features/tenants/components/create-tenant-dialog/`)
  - Material dialog with form
  - Single field: tenant name
  - Validation: required, min 3 characters
  - Submit to create tenant
  - Auto-select newly created tenant
  - Close dialog on success

### Tenant Routes

- [x] **Tenant Routing** (`src/app/features/tenants/tenants.routes.ts`)
  - `/tenants/select` - Tenant selection page (auth guard only)
  - Redirect after login if no tenant set

---

## Phase 4: Layout & Navigation (100%)

Main application shell and navigation structure.

### Main Layout

- [x] **Main Layout Component** (`src/app/core/layout/main-layout/`)
  - Toolbar (Top bar)
  - Sidenav (Sidebar navigation)
  - Content area
  - Responsive design (mobile/desktop)

### Navigation Components

- [x] **Sidenav** (`src/app/core/layout/sidenav/`)
  - Navigation links
  - Active route highlighting
  - Responsive behavior

- [x] **Toolbar** (`src/app/core/layout/toolbar/`)
  - App branding
  - Mobile menu toggle
  - Tenant name display
  - User menu (Profile, Logout)

---

## Phase 5: Dashboard & Statistics (100%)

Overview and statistics.

### Dashboard Service

- [x] **Dashboard Service** (`src/app/features/dashboard/services/dashboard.service.ts`)
  - Aggregate data from multiple sources
  - State management for dashboard metrics
  - Methods to fetch summary statistics
  - **Note**: Currently uses mock data. Real API integration planned for **Phase 7 (Accounts)** and **Phase 10 (Transactions)**.

### Dashboard Page

- [x] **Dashboard Component** (`src/app/features/dashboard/components/dashboard/`)
  - Overview cards:
    - Total balance across all accounts
    - Monthly income
    - Monthly expenses
    - Number of pending transactions
  - Material card grid layout
  - Loading skeletons
  - Error handling

### Overview Card Component

- [x] **Overview Card** (`src/app/features/dashboard/components/overview-card/`)
  - Reusable card for metrics
  - Inputs: title, value, icon, trend
  - Color coding (green for income, red for expenses)
  - Material card design

### Recent Transactions Component

- [x] **Recent Transactions** (`src/app/features/dashboard/components/recent-transactions/`)
  - List last 10 transactions
  - Show amount, category, account, date
  - Link to full transaction list
  - Empty state if no transactions

### Dashboard Routes

- [x] **Dashboard Routing** (`src/app/features/dashboard/dashboard.routes.ts`)
  - `/dashboard` - Dashboard page (auth + tenant guards)
  - Default route after login

---

## Phase 6: User Profile (100%)

User profile viewing and editing.

### User Service

### User Service

- [x] **User Service** (`src/app/core/services/user.service.ts`)
  - State management:
    - `userProfile` signal (UserProfile | null)
  - Methods:
    - `loadProfile()` - Fetch user profile
    - `updateProfile(data)` - Update user name/email

### Profile Component

- [x] **Profile Page** (`src/app/features/profile/components/profile/`)
  - Display user information (name, email, created date)
  - Edit mode toggle
  - Reactive form for editing
  - Save/Cancel buttons
  - Show success message on update
  - Material card layout

### Profile Routes

- [x] **Profile Routing** (`src/app/features/profile/profile.routes.ts`)
  - `/profile` - User profile page (auth + tenant guards)

---

## Phase 7: Accounts Management (100%)

Financial account CRUD operations.

### Account Service

- [x] **Account Service** (`src/app/features/accounts/services/account.service.ts`)
  - Wrap generated `AccountsService`
  - State management:
    - `accounts` signal (Account[])
    - `selectedAccount` signal (Account | null)
  - Methods:
    - `loadAccounts()` - Fetch all accounts
    - `createAccount(data)` - Create new account
    - `updateAccount(id, data)` - Update account
    - `deleteAccount(id)` - Soft delete account
    - `getAccountById(id)` - Get single account

### Account List Component

- [x] **Account List** (`src/app/features/accounts/components/account-list/`)
  - Display accounts as Material cards
  - Show: name, type, balance, currency, icon, color
  - Filter by account type
  - Search by name
  - Sort options (name, balance, type)
  - Floating action button for creating new account
  - Empty state if no accounts
  - Click card to view details

### Account Form Component

- [x] **Account Form** (`src/app/features/accounts/components/account-form/`)
  - Reactive form with fields:
    - Name (required)
    - Type (dropdown: bank, cash, credit_card, investment, other)
    - Initial balance (number, default 0)
    - Currency (dropdown or autocomplete: BRL, USD, EUR, etc.)
    - Color (color picker, default value)
    - Icon (emoji picker or icon selector)
  - Form validation
  - Submit to create or update
  - Cancel button
  - Use Material form fields

### Account Detail Component

- [x] **Account Detail** (`src/app/features/accounts/components/account-detail/`)
  - Display full account information
  - Edit button (navigate to form)
  - Delete button (with confirmation dialog)
  - Transaction history for this account
  - Balance summary
  - Material card layout

### Accounts Routes

- [x] **Accounts Routing** (`src/app/features/accounts/accounts.routes.ts`)
  - `/accounts` - List all accounts (auth + tenant guards)
  - `/accounts/new` - Create account form
  - `/accounts/:id` - Account detail view
  - `/accounts/:id/edit` - Edit account form

---

## Phase 8: Categories Management (100%)

Income/expense categorization system.

### Category Service

- [x] **Category Service** (`src/app/features/categories/services/category.service.ts`)
  - Wrap generated `CategoriesService`
  - State management:
    - `categories` signal (Category[])
    - `categoryTree` computed signal (hierarchical structure)
  - Methods:
    - `loadCategories()` - Fetch all categories
    - `createCategory(data)` - Create new category
    - `updateCategory(id, data)` - Update category
    - `deleteCategory(id)` - Soft delete category
    - `buildCategoryTree()` - Build hierarchical structure

### Category List Component

- [x] **Category List** (`src/app/features/categories/components/category-list/`)
  - Display categories with visual hierarchy
  - Show parent-child relationships (tree view or grouped list)
  - Filter by parent category
  - Search by name
  - Floating action button for new category
  - Edit/Delete actions for each category
  - Color and icon display

### Category Form Component

- [x] **Category Form** (`src/app/features/categories/components/category-form/`)
  - Reactive form:
    - Name (required)
    - Parent category (dropdown, optional)
    - Color (color picker)
    - Icon (emoji/icon picker)
  - Validation
  - Submit to create or update
  - Material form fields

### Category Chip Component

- [x] **Category Chip** (`src/app/features/categories/components/category-chip/`)
  - Reusable component for displaying category as chip
  - Show icon, name, color
  - Inputs: category object
  - Used in transaction lists and forms
  - Material chip component

### Categories Routes

- [x] **Categories Routing** (`src/app/features/categories/categories.routes.ts`)
  - `/categories` - List all categories (auth + tenant guards)
  - `/categories/new` - Create category form
  - `/categories/:id/edit` - Edit category form

---

## Phase 9: Tags Management (100%)

Flexible transaction labeling system.

### Tag Service

- [x] **Tag Service** (`src/app/features/tags/services/tag.service.ts`)
  - Wrap generated `TagsService`
  - State management:
    - `tags` signal (Tag[])
  - Methods:
    - `loadTags()` - Fetch all tags
    - `createTag(name)` - Create new tag
    - `updateTag(id, name)` - Update tag
    - `deleteTag(id)` - Soft delete tag

### Tag List Component

- [x] **Tag List** (`src/app/features/tags/components/tag-list/`)
  - Display tags as Material chips
  - Search/filter tags
  - Add new tag inline
  - Edit tag name inline
  - Delete with confirmation
  - Compact list view

### Tag Selector Component

- [x] **Tag Selector** (`src/app/features/tags/components/tag-selector/`)
  - Multi-select component for forms
  - Autocomplete with chip list
  - Create new tag on the fly
    - Show "Add [tag text]" when filtering returns no results
    - On click: call create API -> reload tags -> auto-select new tag
  - Used in transaction forms
  - Material chip autocomplete

### Tags Routes

- [x] **Tags Routing** (`src/app/features/tags/tags.routes.ts`)
  - `/tags` - List and manage tags (auth + tenant guards)

---

## Phase 10: Transactions Management (75%)

Core financial transaction operations.

### Transaction Service

- [x] **Transaction Service** (`src/app/core/services/transaction.service.ts`)

  **✅ Currently Implemented:**
  - Wraps generated `TransactionsService`
  - State management with signals:
    - `transactions` signal (Transaction[])
    - `filteredTransactions` computed signal (applies filters)
    - `loading` signal
    - `filters` signal (accrual month, account, category, type, payment status, tags, date range)
  - CRUD Methods:
    - `loadTransactions()` - Fetch all transactions with optional filters
    - `createTransaction(data)` - Create new transaction
    - `updateTransaction(id, data)` - Update transaction
    - `deleteTransaction(id)` - Soft delete transaction
    - `getTransactionById(id)` - Get single transaction
  - Filter Methods:
    - `setFilters()` - Apply filters
    - `resetFilters()` - Clear all filters

  **⏳ Planned Enhancements:**
  - Additional computed signals:
    - `totalIncome` - Sum of all income transactions
    - `totalExpenses` - Sum of all expense transactions
    - `balance` - Net balance (income - expenses)
  - Advanced methods:
    - `calculateInstallments(amount, count, accrualMonth)` - Preview installment breakdown
    - Bulk operations support
    - Transaction import/export helpers

### Transaction List Component

- [x] **Transaction List** (`src/app/features/transactions/components/transaction-list/`)

  **✅ Currently Implemented:**
  - Display transactions in Material table or list
  - Show transaction details: Date, Description, Amount
  - **Visual display**: Account and Category shown with icons and names (not just IDs)
  - Row actions: Edit, Delete
  - Click row to view details
  - Empty state
  - Loading skeleton
  - Integration with AccountService and CategoryService for data lookup

  **⏳ Planned Enhancements:**
  - Pagination for large transaction sets
  - Sortable columns (by date, amount, category, etc.)
  - Column visibility toggles
  - Bulk selection and actions
  - Export to CSV/Excel

### Transaction Form Component

- [x] **Transaction Form** (`src/app/features/transactions/components/transaction-form/`)

  **✅ Currently Implemented:**
  - Reactive form with comprehensive fields:
    - **Type** (dropdown: credit, debit, transfer, payment)
    - **Amount** (required, positive number)
    - **From Account** (required, dropdown)
    - **To Account** (optional for transfer/payment, dropdown)
    - **Category** (required, dropdown with hierarchy)
    - **Tags** (multi-select with autocomplete)
    - **Due Date** (date picker, required)
    - **Payment Date** (date picker, optional)
    - **Accrual Month** (YYYYMM format)
    - **Comments** (textarea, optional)
    - **Installments** (number field, for credit card purchases)
    - **Is Recurring** (checkbox, for subscriptions)
  - Form validation
  - Submit to create or update
  - Material form fields and date pickers

  **⏳ Planned Enhancements:**
  - Dynamic field visibility based on transaction type
  - Installment preview panel (show breakdown when installments > 1)
  - Total calculation display with currency conversion
  - Recurring transaction schedule preview
  - Auto-fill from recent similar transactions
  - Attachment upload (receipts, invoices)

### Transaction Detail Component

- [x] **Transaction Detail** (`src/app/features/transactions/components/transaction-detail/`)

  **✅ Currently Implemented:**
  - Full transaction information display
  - Edit/Delete buttons
  - Payment status display
  - Category and tag chips
  - Material card layout

  **⏳ Planned Enhancements:**
  - Related transactions display (for installment series)
  - Transaction history/audit trail
  - Attached receipts/documents viewer
  - Quick actions (mark as paid, duplicate, split)
  - Share transaction details

### Transaction Filters Component

- [ ] **Transaction Filters** (`src/app/features/transactions/components/transaction-filters/`)

  **⏳ Planned Implementation:**
  - **Note**: Filtering logic already exists in TransactionService, this component will provide the UI
  - Filter panel with:
    - Date range picker
    - Account selector
    - Category selector
    - Transaction type checkboxes
    - Payment status (paid, unpaid, all)
    - Tag multi-select
  - Apply/Reset buttons
  - Save filter presets
  - Collapsible panel
  - Material expansion panel

### Transactions Routes

- [x] **Transactions Routing** (`src/app/features/transactions/transactions.routes.ts`)
  - `/transactions` - List all transactions (auth + tenant guards)
  - `/transactions/new` - Create transaction form
  - `/transactions/:id` - Transaction detail view
  - `/transactions/:id/edit` - Edit transaction form

---

## Phase 11: Shared Components (20%)

Reusable UI components used across features.

### App Icon Component

- [x] **App Icon Component** (`src/app/shared/components/app-icon/`)
  - Displays SVG icons or emoji for accounts and categories
  - Inputs: name (icon identifier), color, size, description
  - Renders icons from constants (ACCOUNT_ICONS, CATEGORY_ICONS)
  - Supports custom sizing and coloring
  - Material tooltip integration
  - Used in account and category displays

### Page Header Component

- [ ] **Page Header** (`src/app/shared/components/page-header/`)
  - Display page title and breadcrumbs
  - Optional action buttons
  - Inputs: title, breadcrumbs, actions
  - Material toolbar styling

### Loading Spinner Component

- [ ] **Loading Spinner** (`src/app/shared/components/loading-spinner/`)
  - Global loading indicator
  - Centered Material spinner
  - Optional message
  - Used during data fetching

### Empty State Component

- [ ] **Empty State** (`src/app/shared/components/empty-state/`)
  - Display when no data available
  - Inputs: icon, title, message, action button
  - Material card design
  - Customizable appearance

### Confirmation Dialog Component

- [ ] **Confirmation Dialog** (`src/app/shared/components/confirmation-dialog/`)
  - Reusable Material dialog for confirmations
  - Inputs: title, message, confirmText, cancelText
  - Returns boolean result
  - Used for delete confirmations

### Error Message Component

- [ ] **Error Message** (`src/app/shared/components/error-message/`)
  - Display error messages
  - Inputs: error message or error object
  - Material alert design
  - Optional retry action

---

## Phase 12: Shared Utilities (0%)

Helper functions, pipes, and directives.

### Pipes

- [ ] **Currency Format Pipe** (`src/app/shared/pipes/currency-format.pipe.ts`)
  - Format numbers as currency with locale
  - Input amount and currency code
  - Output formatted string (e.g., "R$ 1.234,56")

- [ ] **Date Format Pipe** (`src/app/shared/pipes/date-format.pipe.ts`)
  - Format dates with locale
  - Support different formats (short, long, relative)
  - Handle YYYYMM accrual month format

- [ ] **Truncate Pipe** (`src/app/shared/pipes/truncate.pipe.ts`)
  - Truncate long text with ellipsis
  - Configurable max length

### Directives

- [ ] **Click Outside Directive** (`src/app/shared/directives/click-outside.directive.ts`)
  - Detect clicks outside element
  - Used for closing dropdowns/menus

- [ ] **Auto Focus Directive** (`src/app/shared/directives/auto-focus.directive.ts`)
  - Automatically focus input on component render
  - Used in forms and dialogs

### Validators

- [ ] **Custom Validators** (`src/app/shared/utils/validators.ts`)
  - `positiveNumber()` - Validate positive numbers
  - `futureDate()` - Validate date is in future (optional)
  - `currencyCode()` - Validate ISO currency code
  - `accrualMonth()` - Validate YYYYMM format

### Helper Functions

- [ ] **Date Helpers** (`src/app/shared/utils/date-helpers.ts`)
  - `parseAccrualMonth(yyyymm)` - Convert YYYYMM to Date
  - `formatAccrualMonth(date)` - Convert Date to YYYYMM
  - `addMonths(date, count)` - Add months to date

- [ ] **Currency Helpers** (`src/app/shared/utils/currency-helpers.ts`)
  - `formatCurrency(amount, currency, locale)` - Format currency string
  - `parseCurrency(formatted)` - Parse string to number

---

## Phase 13: Testing (0%)

Unit and integration tests.

### Core Tests

- [ ] Auth service unit tests
- [ ] Tenant service unit tests
- [ ] User service unit tests
- [ ] HTTP interceptors tests
- [ ] Guards tests

### Component Tests

- [ ] Login component tests
- [ ] Register component tests
- [ ] Account form tests
- [ ] Transaction form tests
- [ ] Category form tests

### Service Tests

- [ ] Account service tests
- [ ] Transaction service tests
- [ ] Category service tests
- [ ] Tag service tests

### Pipe Tests

- [ ] Currency format pipe tests
- [ ] Date format pipe tests
- [ ] Truncate pipe tests

### E2E Tests (Optional)

- [ ] Authentication flow
- [ ] Create transaction flow
- [ ] Account management flow

---

## Phase 14: Polish & Optimization (0%)

Performance, accessibility, and user experience improvements.

### Performance

- [ ] Implement lazy loading for all feature modules
- [ ] Use OnPush change detection everywhere
- [ ] Optimize bundle size
- [ ] Add loading skeletons for better perceived performance
- [ ] Implement virtual scrolling for long lists
- [ ] Add service worker for offline support (optional)

### Accessibility

- [ ] Run AXE accessibility audits on all pages
- [ ] Ensure WCAG AA compliance
- [ ] Add ARIA labels and attributes
- [ ] Keyboard navigation support
- [ ] Focus management in dialogs and forms
- [ ] Screen reader testing

### User Experience

---

## Phase 15: Deployment (100%)

Application deployment and containerization.

- [x] **Docker Containerization**
  - Create `Dockerfile`
  - Create `docker-compose.yml` (optional)
  - Configure Nginx for serving Angular app

- [ ] Add animations and transitions (Angular animations)
- [ ] Improve error messages with clear actions
- [ ] Add help tooltips and onboarding hints
- [ ] Implement responsive design for mobile
- [ ] Add confirmation dialogs for destructive actions
- [ ] Show success messages for all mutations

### PWA Features (Optional)

- [ ] Add web app manifest
- [ ] Configure service worker
- [ ] Add app icons
- [ ] Enable install prompt
- [ ] Offline functionality

---

## Phase 16: Internationalization (50%)

Runtime internationalization for the application.

### Core i18n

- [x] Install and configure `@ngx-translate/core`
- [x] Create language service
- [ ] Extract existing text to JSON files
- [ ] Implement language switcher

---

## Phase 17: Future Enhancements (Future)

Features for consideration after MVP.

### Advanced Features

- [ ] **Budgets**: Set and track monthly budgets per category
- [ ] **Reports**: Visual charts and graphs (income vs expenses, trends)
- [ ] **Recurring Transactions**: Manage subscriptions and recurring bills
- [ ] **Split Transactions**: Split a transaction across multiple categories
- [ ] **Attachments**: Upload and view transaction receipts
- [ ] **Export**: Export transactions to CSV/Excel
- [ ] **Import**: Import transactions from bank statements
- [ ] **Multi-Currency**: Support transactions in multiple currencies with conversion
- [ ] **Notifications**: Email/push notifications for due payments
- [ ] **Search**: Advanced search with filters across all entities
- [ ] **Bulk Operations**: Select and perform actions on multiple transactions

### Collaboration Features

- [ ] **Invitations**: Invite other users to tenant
- [ ] **Permissions**: Role-based access control within tenant
- [ ] **Activity Log**: Audit trail of changes
- [ ] **Comments**: Add comments to transactions
- [ ] **Approval Workflow**: Request approval for transactions (optional)

---

## Development Guidelines

All development must follow:

- [WEB_GUIDELINES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_GUIDELINES.md) - Coding standards and best practices
- [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md) - Project organization

**Key Principles:**

- ✅ All components MUST be standalone
- ✅ Use `input()` and `output()` instead of decorators
- ✅ Use native control flow (`@if`, `@for`, `@switch`)
- ✅ Use signals for state management
- ✅ Use `inject()` for dependency injection
- ✅ OnPush change detection for all components
- ✅ WCAG AA accessibility compliance mandatory
- ✅ Responsive design (mobile-first)
- ✅ Type safety with strict TypeScript

---

## API Regeneration Workflow

Whenever the backend API changes:

1. **Copy updated `docs/swagger.yaml` to `fintrack-web/src/api/openapi.yaml`**

   ```bash
   cp ../fintrack-api/docs/swagger.yaml ./src/api/openapi.yaml
   ```

2. **Regenerate the client**:

   ```bash
   npm run generate:api
   ```

3. **Review generated structure**:
   The generator creates the following in `src/api/providers/`:
   - `services/` - Type-safe service classes (AccountsService, TransactionsService, etc.)
   - `models/` - TypeScript interfaces for all DTOs
   - `tokens/` - Injection tokens (BASE_PATH_FINTRACK, CLIENT_CONTEXT_TOKEN_FINTRACK)
   - `utils/` - Helper utilities (file-download, http-params-builder, date-transformer)
   - `resources/` - Resource definitions
   - `providers.ts` - Provider configuration
   - `index.ts` - Main export file (use this for imports!)

4. **Update affected components/services**:
   - Check for new endpoints or changed request/response models
   - Update feature services that wrap generated services
   - Fix TypeScript compilation errors

5. **Test thoroughly**:
   - Ensure existing functionality still works
   - Test new endpoints
   - Run unit tests: `npm test`

6. **Best Practices**:
   - ⚠️ **NEVER edit generated files** - they will be overwritten
   - ✅ **Import from `src/api`**, not nested paths
   - ✅ **Wrap generated services** in feature-specific services for state management
   - ✅ Use the generated **TypeScript models** for type safety
   - ✅ **Handle errors globally** with HTTP interceptors

For detailed usage patterns, see: [WEB_GUIDELINES.md - HTTP & API Integration](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_GUIDELINES.md#http--api-integration)

---

## Progress Tracking

### Summary

| Phase                           | Status         | Completion |
| ------------------------------- | -------------- | ---------- |
| Phase 0: Project Setup          | ✅ Complete    | 100%       |
| Phase 1: Core Infrastructure    | ✅ Complete    | 100%       |
| Phase 2: Authentication         | ✅ Complete    | 100%       |
| Phase 3: Multi-Tenancy          | ✅ Complete    | 100%       |
| Phase 4: Layout & Navigation    | ✅ Complete    | 100%       |
| Phase 5: Dashboard & Statistics | ✅ Complete    | 100%       |
| Phase 6: User Profile           | ✅ Complete    | 100%       |
| Phase 7: Accounts               | ✅ Complete    | 100%       |
| Phase 8: Categories             | ✅ Complete    | 100%       |
| Phase 9: Tags                   | ✅ Complete    | 100%       |
| Phase 10: Transactions          | ⏳ Planned     | 0%         |
| Phase 11: Shared Components     | ⏳ Planned     | 0%         |
| Phase 12: Shared Utilities      | ⏳ Planned     | 0%         |
| Phase 13: Testing               | ⏳ Planned     | 0%         |
| Phase 14: Polish & Optimization | ⏳ Planned     | 0%         |
| Phase 15: Deployment            | ✅ Complete    | 100%       |
| Phase 16: Internationalization  | 🏗️ In Progress | 50%        |
| Phase 17: Future Enhancements   | ⏳ Planned     | 0%         |

**Overall Progress**: 62.5% (10/16 phases complete) | **MVP Status**: 71.4% (10/14 phases, excluding Phase 15)

---

## Related Documentation

- [API FEATURES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/FEATURES.md) - Backend API features
- [API ROADMAP.md](file:///Users/igoventura/Developer/Personal/fintrack-api/ROADMAP.md) - Backend development status
- [WEB_GUIDELINES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_GUIDELINES.md) - Frontend coding standards
- [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md) - Frontend architecture
