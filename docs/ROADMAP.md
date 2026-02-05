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

## Phase 0: Project Setup & Infrastructure (0%)

Foundation for the frontend application.

### Project Initialization
- [ ] Create Angular 21 project with standalone components
- [ ] Configure TypeScript with strict mode
- [ ] Set up project structure following [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md)
- [ ] Configure Angular Material with custom theme
- [ ] Set up SCSS architecture (variables, mixins, utilities)
- [ ] Configure ESLint and Prettier
- [ ] Create `.gitignore` for Angular projects

### API Integration
- [x] Install `ng-openapi-gen` package
- [x] Copy `docs/swagger.yaml` to `src/api/openapi.yaml`
- [x] Create `openapi.config.ts` for code generation
- [x] Add NPM script: `generate:api`
- [x] Generate initial API client (`npm run generate:api`)
- [x] Verify generated services in `src/api/providers/`
- [x] Verify generated models in `src/api/models/`

### Development Environment
- [ ] Configure environments (`environment.ts`, `environment.prod.ts`)
- [ ] Set up proxy configuration for local API (`proxy.conf.json`)
- [ ] Create VS Code workspace settings
- [ ] Configure launch configurations for debugging
- [ ] Set up Angular DevTools

### Documentation
- [x] Create `README.md` with setup instructions
- [ ] Link to [WEB_GUIDELINES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_GUIDELINES.md)
- [ ] Link to [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md)
- [ ] Document API generation workflow

---

## Phase 1: Core Infrastructure (0%)

Essential services, interceptors, and guards.

### Core Services
- [ ] **Storage Service** (`src/app/core/services/storage.service.ts`)
  - LocalStorage wrapper with type safety
  - Methods: `set()`, `get()`, `remove()`, `clear()`
  - Store JWT tokens, tenant ID, user preferences

- [ ] **Toast/Notification Service** (`src/app/core/services/toast.service.ts`)
  - Success, error, warning, info notifications
  - Integration with Angular Material Snackbar
  - Global notification management with signals

- [ ] **Theme Service** (`src/app/core/services/theme.service.ts`)
  - Light/dark mode toggle
  - Persist theme preference in local storage
  - Signal-based theme state

### HTTP Interceptors
- [ ] **Auth Interceptor** (`src/app/core/interceptors/auth.interceptor.ts`)
  - Automatically add `Authorization: Bearer <token>` header
  - Get token from StorageService
  - Skip for public endpoints (login, register)

- [ ] **Tenant Interceptor** (`src/app/core/interceptors/tenant.interceptor.ts`)
  - Automatically add `X-Tenant-ID` header
  - Get tenant ID from TenantService
  - Skip for auth and tenant selection endpoints

- [ ] **Error Interceptor** (`src/app/core/interceptors/error.interceptor.ts`)
  - Global error handling
  - Show toast notifications for errors
  - Handle 401 (redirect to login), 403 (show forbidden message)
  - Log errors to console in development

### Guards
- [ ] **Auth Guard** (`src/app/core/guards/auth.guard.ts`)
  - Check if user is authenticated
  - Redirect to login if not authenticated
  - Allow access if valid token exists

- [ ] **Tenant Guard** (`src/app/core/guards/tenant.guard.ts`)
  - Check if tenant context is set
  - Redirect to tenant selection if no tenant
  - Allow access if tenant ID exists

- [ ] **Guest Guard** (`src/app/core/guards/guest.guard.ts`)
  - Prevent authenticated users from accessing auth pages
  - Redirect to dashboard if already logged in

### Application Configuration
- [ ] **App Config** (`src/app/app.config.ts`)
  - Configure HTTP client with interceptors
  - Set up Angular Material providers
  - Configure routing with guards
  - Set up default error handler

---

## Phase 2: Authentication (0%)

User authentication and registration flows.

### Auth Service
- [ ] **Auth Service** (`src/app/features/auth/services/auth-api.service.ts`)
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
- [ ] **Login Component** (`src/app/features/auth/components/login/`)
  - Reactive form with email and password fields
  - Form validation (required, email format, min length)
  - Show/hide password toggle
  - Loading state during submission
  - Error messages from API
  - "Remember me" checkbox (optional)
  - Link to registration page
  - Use Material components: `mat-card`, `mat-form-field`, `mat-button`

### Register Component
- [ ] **Register Component** (`src/app/features/auth/components/register/`)
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
- [ ] **Auth Routing** (`src/app/features/auth/auth.routes.ts`)
  - `/auth/login` - Login page (guest guard)
  - `/auth/register` - Register page (guest guard)
  - Default redirect to login

---

## Phase 3: Multi-Tenancy (0%)

Tenant selection and management.

### Tenant Service
- [ ] **Tenant Service** (`src/app/core/services/tenant.service.ts`)
  - State management with signals:
    - `currentTenantId` signal (string | null)
    - `currentTenant` signal (Tenant | null)
    - `userTenants` signal (Tenant[])
  - Methods:
    - `loadUserTenants()` - Fetch user's tenants from API
    - `setCurrentTenant(tenantId)` - Set active tenant, store in local storage
    - `createTenant(name)` - Create new tenant
    - `getCurrentTenantId()` - Get current tenant ID for interceptor

### Tenant Selection Component
- [ ] **Tenant Selector** (`src/app/features/tenants/components/tenant-selector/`)
  - List user's tenants as Material cards
  - Show tenant name and creation date
  - Click to select tenant
  - Button to create new tenant
  - Empty state if no tenants
  - Store selection and redirect to dashboard

### Create Tenant Dialog
- [ ] **Create Tenant Dialog** (`src/app/features/tenants/components/create-tenant-dialog/`)
  - Material dialog with form
  - Single field: tenant name
  - Validation: required, min 3 characters
  - Submit to create tenant
  - Auto-select newly created tenant
  - Close dialog on success

### Tenant Routes
- [ ] **Tenant Routing** (`src/app/features/tenants/tenants.routes.ts`)
  - `/tenants/select` - Tenant selection page (auth guard only)
  - Redirect after login if no tenant set

---

## Phase 4: User Profile (0%)

User profile viewing and editing.

### User Service
- [ ] **User Service** (`src/app/core/services/user.service.ts`)
  - State management:
    - `userProfile` signal (UserProfile | null)
  - Methods:
    - `loadProfile()` - Fetch user profile
    - `updateProfile(data)` - Update user name/email

### Profile Component
- [ ] **Profile Page** (`src/app/features/profile/components/profile/`)
  - Display user information (name, email, created date)
  - Edit mode toggle
  - Reactive form for editing
  - Save/Cancel buttons
  - Show success message on update
  - Material card layout

### Profile Routes
- [ ] **Profile Routing** (`src/app/features/profile/profile.routes.ts`)
  - `/profile` - User profile page (auth + tenant guards)

---

## Phase 5: Layout & Navigation (0%)

Application shell and navigation structure.

### Main Layout
- [ ] **Main Layout Component** (`src/app/layout/main-layout/`)
  - Material toolbar with app title
  - Sidebar navigation (drawer on mobile)
  - Router outlet for content
  - Responsive design (collapsible sidebar on mobile)

### Header Component
- [ ] **Header** (`src/app/layout/header/`)
  - App logo and title
  - Tenant selector dropdown
  - User menu dropdown (profile, logout)
  - Theme toggle button
  - Mobile menu button

### Sidebar Component
- [ ] **Sidebar Navigation** (`src/app/layout/sidebar/`)
  - Navigation links:
    - Dashboard
    - Transactions
    - Accounts
    - Categories
    - Tags
  - Active route highlighting
  - Icons for each menu item
  - Collapsible on mobile

### Footer Component
- [ ] **Footer** (`src/app/layout/footer/`)
  - Copyright information
  - Version number
  - Links (optional: Privacy Policy, Terms)

---

## Phase 6: Dashboard (0%)

Overview and statistics.

### Dashboard Service
- [ ] **Dashboard Service** (`src/app/features/dashboard/services/dashboard.service.ts`)
  - Aggregate data from multiple sources
  - State management for dashboard metrics
  - Methods to fetch summary statistics

### Dashboard Page
- [ ] **Dashboard Component** (`src/app/features/dashboard/components/dashboard/`)
  - Overview cards:
    - Total balance across all accounts
    - Monthly income
    - Monthly expenses
    - Number of pending transactions
  - Material card grid layout
  - Loading skeletons
  - Error handling

### Overview Card Component
- [ ] **Overview Card** (`src/app/features/dashboard/components/overview-card/`)
  - Reusable card for metrics
  - Inputs: title, value, icon, trend
  - Color coding (green for income, red for expenses)
  - Material card design

### Recent Transactions Component
- [ ] **Recent Transactions** (`src/app/features/dashboard/components/recent-transactions/`)
  - List last 10 transactions
  - Show amount, category, account, date
  - Link to full transaction list
  - Empty state if no transactions

### Dashboard Routes
- [ ] **Dashboard Routing** (`src/app/features/dashboard/dashboard.routes.ts`)
  - `/dashboard` - Dashboard page (auth + tenant guards)
  - Default route after login

---

## Phase 7: Accounts Management (0%)

Financial account CRUD operations.

### Account Service
- [ ] **Account Service** (`src/app/features/accounts/services/account.service.ts`)
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
- [ ] **Account List** (`src/app/features/accounts/components/account-list/`)
  - Display accounts as Material cards
  - Show: name, type, balance, currency, icon, color
  - Filter by account type
  - Search by name
  - Sort options (name, balance, type)
  - Floating action button for creating new account
  - Empty state if no accounts
  - Click card to view details

### Account Form Component
- [ ] **Account Form** (`src/app/features/accounts/components/account-form/`)
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
- [ ] **Account Detail** (`src/app/features/accounts/components/account-detail/`)
  - Display full account information
  - Edit button (navigate to form)
  - Delete button (with confirmation dialog)
  - Transaction history for this account
  - Balance summary
  - Material card layout

### Accounts Routes
- [ ] **Accounts Routing** (`src/app/features/accounts/accounts.routes.ts`)
  - `/accounts` - List all accounts (auth + tenant guards)
  - `/accounts/new` - Create account form
  - `/accounts/:id` - Account detail view
  - `/accounts/:id/edit` - Edit account form

---

## Phase 8: Categories Management (0%)

Income/expense categorization system.

### Category Service
- [ ] **Category Service** (`src/app/features/categories/services/category.service.ts`)
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
- [ ] **Category List** (`src/app/features/categories/components/category-list/`)
  - Display categories with visual hierarchy
  - Show parent-child relationships (tree view or grouped list)
  - Filter by parent category
  - Search by name
  - Floating action button for new category
  - Edit/Delete actions for each category
  - Color and icon display

### Category Form Component
- [ ] **Category Form** (`src/app/features/categories/components/category-form/`)
  - Reactive form:
    - Name (required)
    - Parent category (dropdown, optional)
    - Color (color picker)
    - Icon (emoji/icon picker)
  - Validation
  - Submit to create or update
  - Material form fields

### Category Chip Component
- [ ] **Category Chip** (`src/app/features/categories/components/category-chip/`)
  - Reusable component for displaying category as chip
  - Show icon, name, color
  - Inputs: category object
  - Used in transaction lists and forms
  - Material chip component

### Categories Routes
- [ ] **Categories Routing** (`src/app/features/categories/categories.routes.ts`)
  - `/categories` - List all categories (auth + tenant guards)
  - `/categories/new` - Create category form
  - `/categories/:id/edit` - Edit category form

---

## Phase 9: Tags Management (0%)

Flexible transaction labeling system.

### Tag Service
- [ ] **Tag Service** (`src/app/features/tags/services/tag.service.ts`)
  - Wrap generated `TagsService`
  - State management:
    - `tags` signal (Tag[])
  - Methods:
    - `loadTags()` - Fetch all tags
    - `createTag(name)` - Create new tag
    - `updateTag(id, name)` - Update tag
    - `deleteTag(id)` - Soft delete tag

### Tag List Component
- [ ] **Tag List** (`src/app/features/tags/components/tag-list/`)
  - Display tags as Material chips
  - Search/filter tags
  - Add new tag inline
  - Edit tag name inline
  - Delete with confirmation
  - Compact list view

### Tag Selector Component
- [ ] **Tag Selector** (`src/app/features/tags/components/tag-selector/`)
  - Multi-select component for forms
  - Autocomplete with chip list
  - Create new tag on the fly
  - Used in transaction forms
  - Material chip autocomplete

### Tags Routes
- [ ] **Tags Routing** (`src/app/features/tags/tags.routes.ts`)
  - `/tags` - List and manage tags (auth + tenant guards)

---

## Phase 10: Transactions Management (0%)

Core financial transaction operations.

### Transaction Service
- [ ] **Transaction Service** (`src/app/features/transactions/services/transaction.service.ts`)
  - Wrap generated `TransactionsService`
  - State management:
    - `transactions` signal (Transaction[])
    - `totalIncome` computed signal
    - `totalExpenses` computed signal
    - `balance` computed signal
    - `filters` signal (date range, account, category, type)
  - Methods:
    - `loadTransactions()` - Fetch all transactions
    - `createTransaction(data)` - Create new transaction
    - `updateTransaction(id, data)` - Update transaction
    - `deleteTransaction(id)` - Soft delete transaction
    - `applyFilters()` - Filter transactions
    - `calculateInstallments(amount, count, accrualMonth)` - Preview installments

### Transaction List Component
- [ ] **Transaction List** (`src/app/features/transactions/components/transaction-list/`)
  - Display transactions in Material table or list
  - Columns: Date, Description, Category, Account, Tags, Amount, Status
  - Row actions: Edit, Delete
  - Pagination
  - Sortable columns
  - Click row to view details
  - Empty state
  - Loading skeleton

### Transaction Form Component
- [ ] **Transaction Form** (`src/app/features/transactions/components/transaction-form/`)
  - Reactive form with fields:
    - **Type** (radio: credit, debit, transfer, payment)
    - **Amount** (required, positive number)
    - **From Account** (required, dropdown)
    - **To Account** (optional for transfer/payment, dropdown)
    - **Category** (required, dropdown with hierarchy)
    - **Tags** (multi-select with autocomplete)
    - **Currency** (auto-filled from account)
    - **Due Date** (date picker, required)
    - **Payment Date** (date picker, optional, null = unpaid)
    - **Accrual Month** (YYYYMM, defaults to due date month, editable)
    - **Comments** (textarea, optional)
    - **Installments** (number field, for credit card purchases)
    - **Is Recurring** (checkbox, for subscriptions)
  - Dynamic field visibility based on type
  - Installment preview (if installments > 1)
  - Total calculation display
  - Validation
  - Submit to create or update
  - Material form fields and date pickers

### Transaction Detail Component
- [ ] **Transaction Detail** (`src/app/features/transactions/components/transaction-detail/`)
  - Full transaction information display
  - Related transactions (if part of installment series)
  - Edit/Delete buttons
  - Payment status badge
  - Category and tag chips
  - Material card layout

### Transaction Filters Component
- [ ] **Transaction Filters** (`src/app/features/transactions/components/transaction-filters/`)
  - Filter panel with:
    - Date range picker
    - Account selector
    - Category selector
    - Transaction type checkboxes
    - Payment status (paid, unpaid, all)
    - Tag multi-select
  - Apply/Reset buttons
  - Collapsible panel
  - Material expansion panel

### Transactions Routes
- [ ] **Transactions Routing** (`src/app/features/transactions/transactions.routes.ts`)
  - `/transactions` - List all transactions (auth + tenant guards)
  - `/transactions/new` - Create transaction form
  - `/transactions/:id` - Transaction detail view
  - `/transactions/:id/edit` - Edit transaction form

---

## Phase 11: Shared Components (0%)

Reusable UI components used across features.

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

## Phase 15: Future Enhancements (Future)

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
| Phase | Status | Completion |
|-------|--------|------------|
| Phase 0: Project Setup | ⏳ Not Started | 0% |
| Phase 1: Core Infrastructure | ⏳ Not Started | 0% |
| Phase 2: Authentication | ⏳ Not Started | 0% |
| Phase 3: Multi-Tenancy | ⏳ Not Started | 0% |
| Phase 4: User Profile | ⏳ Not Started | 0% |
| Phase 5: Layout & Navigation | ⏳ Not Started | 0% |
| Phase 6: Dashboard | ⏳ Not Started | 0% |
| Phase 7: Accounts | ⏳ Not Started | 0% |
| Phase 8: Categories | ⏳ Not Started | 0% |
| Phase 9: Tags | ⏳ Not Started | 0% |
| Phase 10: Transactions | ⏳ Not Started | 0% |
| Phase 11: Shared Components | ⏳ Not Started | 0% |
| Phase 12: Shared Utilities | ⏳ Not Started | 0% |
| Phase 13: Testing | ⏳ Not Started | 0% |
| Phase 14: Polish & Optimization | ⏳ Not Started | 0% |
| Phase 15: Future Enhancements | ⏳ Planned | 0% |

**Overall Progress**: 0% (MVP Target: Phases 0-14)

---

## Related Documentation

- [API FEATURES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/FEATURES.md) - Backend API features
- [API ROADMAP.md](file:///Users/igoventura/Developer/Personal/fintrack-api/ROADMAP.md) - Backend development status
- [WEB_GUIDELINES.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_GUIDELINES.md) - Frontend coding standards
- [WEB_PROJECT_STRUCTURE.md](file:///Users/igoventura/Developer/Personal/fintrack-api/WEB_PROJECT_STRUCTURE.md) - Frontend architecture
