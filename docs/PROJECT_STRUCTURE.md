# FinTrack Web - Project Structure

This document outlines the recommended project structure for the FinTrack Web application, following Angular 21 best practices.

## Overview

The project follows a modular architecture with clear separation of concerns:

- **Standalone Components**: All components are standalone (no NgModules)
- **Feature-based Organization**: Code organized by business domain/feature
- **Shared Resources**: Common utilities, components, and services in dedicated folders
- **Auto-generated API**: Type-safe API client generated from OpenAPI spec

## Directory Structure

```
fintrack-web/
├── src/
│   ├── app/
│   │   ├── core/                      # Core module - singleton services & guards
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── tenant.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── tenant.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   └── tenant.model.ts
│   │   │   └── services/
│   │   │       ├── storage.service.ts
│   │   │       ├── toast.service.ts
│   │   │       └── user.service.ts
│   │   │
│   │   ├── features/                  # Feature modules
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   ├── login.component.ts
│   │   │   │   │   │   ├── login.component.html
│   │   │   │   │   │   └── login.component.scss
│   │   │   │   │   └── register/
│   │   │   │   │       ├── register.component.ts
│   │   │   │   │       ├── register.component.html
│   │   │   │   │       └── register.component.scss
│   │   │   │   ├── services/
│   │   │   │   │   └── auth-api.service.ts
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── components/
│   │   │   │   │   └── profile/
│   │   │   │   │       ├── profile.component.ts
│   │   │   │   │       ├── profile.component.html
│   │   │   │   │       └── profile.component.scss
│   │   │   │   └── profile.routes.ts
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── components/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── overview-card/
│   │   │   │   │   └── recent-transactions/
│   │   │   │   ├── services/
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   ├── transactions/
│   │   │   │   ├── components/
│   │   │   │   │   ├── transaction-list/
│   │   │   │   │   ├── transaction-form/
│   │   │   │   │   ├── transaction-detail/
│   │   │   │   │   └── transaction-filters/
│   │   │   │   ├── services/
│   │   │   │   │   └── transaction.service.ts
│   │   │   │   └── transactions.routes.ts
│   │   │   │
│   │   │   ├── accounts/
│   │   │   │   ├── components/
│   │   │   │   │   ├── account-list/
│   │   │   │   │   ├── account-form/
│   │   │   │   │   └── account-detail/
│   │   │   │   ├── services/
│   │   │   │   │   └── account.service.ts
│   │   │   │   └── accounts.routes.ts
│   │   │   │
│   │   │   ├── categories/
│   │   │   │   ├── components/
│   │   │   │   │   ├── category-list/
│   │   │   │   │   ├── category-form/
│   │   │   │   │   └── category-chip/
│   │   │   │   ├── services/
│   │   │   │   │   └── category.service.ts
│   │   │   │   └── categories.routes.ts
│   │   │   │
│   │   │   ├── tags/
│   │   │   │   ├── components/
│   │   │   │   │   ├── tag-list/
│   │   │   │   │   └── tag-selector/
│   │   │   │   ├── services/
│   │   │   │   │   └── tag.service.ts
│   │   │   │   └── tags.routes.ts
│   │   │   │
│   │   │   └── tenants/
│   │   │       ├── components/
│   │   │       │   ├── tenant-select/
│   │   │       │   └── create-tenant-dialog/
│   │   │       ├── services/
│   │   │       │   └── tenant.service.ts
│   │   │       └── tenants.routes.ts
│   │   │
│   │   ├── shared/                    # Shared resources
│   │   │   ├── components/
│   │   │   │   ├── page-header/
│   │   │   │   ├── loading-spinner/
│   │   │   │   ├── empty-state/
│   │   │   │   ├── confirmation-dialog/
│   │   │   │   └── error-message/
│   │   │   ├── directives/
│   │   │   │   ├── click-outside.directive.ts
│   │   │   │   └── auto-focus.directive.ts
│   │   │   ├── pipes/
│   │   │   │   ├── currency-format.pipe.ts
│   │   │   │   ├── date-format.pipe.ts
│   │   │   │   └── truncate.pipe.ts
│   │   │   └── utils/
│   │   │       ├── validators.ts
│   │   │       ├── date-helpers.ts
│   │   │       └── currency-helpers.ts
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── main-layout/
│   │   │   │   ├── main-layout.component.ts
│   │   │   │   ├── main-layout.component.html
│   │   │   │   └── main-layout.component.scss
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   └── footer/
│   │   │
│   │   ├── app.ts                     # Root component
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.config.ts              # App configuration & providers
│   │   └── app.routes.ts              # Root routing configuration
│   │
│   ├── api/                           # Auto-generated API client
│   │   ├── providers/                 # Generated services
│   │   │   ├── accounts.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── categories.service.ts
│   │   │   ├── tags.service.ts
│   │   │   ├── tenants.service.ts
│   │   │   ├── transactions.service.ts
│   │   │   └── users.service.ts
│   │   ├── models/                    # Generated TypeScript interfaces
│   │   ├── openapi.yaml               # OpenAPI specification
│   │   └── openapi.config.ts          # OpenAPI generator config
│   │
│   ├── assets/                        # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── environments/                  # Environment configurations
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── styles/                        # Global styles
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _material-theme.scss
│   │   └── _utilities.scss
│   │
│   ├── index.html                     # Main HTML file
│   ├── main.ts                        # Application entry point
│   └── styles.scss                    # Global styles entry
│
├── public/                            # Public static files
│   └── favicon.ico
│
├── .vscode/                           # VS Code configuration
├── .angular/                          # Angular cache
├── node_modules/                      # Dependencies
├── dist/                              # Build output
│
├── README.md                          # Project documentation
├── PROJECT_STRUCTURE.md               # This file
├── GUIDELINES.md                      # Development guidelines
├── angular.json                       # Angular workspace config
├── package.json                       # NPM dependencies & scripts
├── tsconfig.json                      # TypeScript configuration
└── .gitignore                         # Git ignore rules
```

## Module Breakdown

### Core Module (`src/app/core/`)

Contains singleton services, guards, interceptors, and models that are used throughout the application.

**Key Principles:**

- Services are provided at root level using `providedIn: 'root'`
- Single instance shared across the entire application
- No components should live here

**Contents:**

- **Guards**: Route protection (auth, tenant validation)
- **Interceptors**: HTTP request/response handling
- **Services**: Authentication, storage, notifications
- **Models**: Core domain models and interfaces

### Features Module (`src/app/features/`)

Feature-specific code organized by business domain. Each feature is self-contained with its own components, services, and routes.

**Structure Pattern:**

```
feature-name/
├── components/          # Feature-specific components
├── services/           # Feature-specific services
└── feature.routes.ts   # Feature routing
```

**Key Features:**

- **Auth**: Login, registration, password reset
- **Dashboard**: Overview, statistics, charts
- **Transactions**: CRUD operations for transactions
- **Accounts**: Financial account management
- **Categories**: Expense/income categorization
- **Tags**: Transaction tagging system
- **Tenants**: Multi-tenant workspace management
- **Profile**: User profile management

### Shared Module (`src/app/shared/`)

Reusable components, directives, pipes, and utilities used across multiple features.

**Contents:**

- **Components**: UI components like dialogs, loaders, empty states
- **Directives**: Click-outside, auto-focus, etc.
- **Pipes**: Data transformation (date, currency, truncate)
- **Utils**: Helper functions, validators, formatters

### Layout Module (`src/app/layout/`)

Application shell and layout components.

**Contents:**

- Main layout wrapper
- Navigation header
- Sidebar navigation
- Footer

### API Module (`src/api/`)

Auto-generated type-safe API client from OpenAPI specification using **ng-openapi-gen**.

**Actual Structure:**

```
src/api/
├── providers/       # Generated API client (ng-openapi-gen output)
│   ├── services/    # API service classes
│   │   ├── accounts.service.ts
│   │   ├── auth.service.ts
│   │   ├── categories.service.ts
│   │   ├── tags.service.ts
│   │   ├── tenants.service.ts
│   │   ├── transactions.service.ts
│   │   ├── users.service.ts
│   │   └── index.ts
│   ├── models/      # TypeScript interfaces (DTOs)
│   │   └── *.ts
│   ├── tokens/      # Angular injection tokens
│   │   └── *.ts     # BASE_PATH, CLIENT_CONTEXT_TOKEN, etc.
│   ├── utils/       # Generated helper utilities
│   │   ├── file-download.ts
│   │   ├── http-params-builder.ts
│   │   ├── date-transformer.ts
│   │   └── *.ts
│   ├── resources/   # Resource definitions
│   │   └── *.ts
│   ├── providers.ts # Provider configuration helpers
│   └── index.ts     # Main export (use this for imports!)
├── openapi.yaml     # OpenAPI spec (copied from backend)
└── openapi.config.ts # ng-openapi-gen configuration
```

**⚠️ Critical Rules:**

- **DO NOT** manually edit any files except `openapi.yaml` and `openapi.config.ts`
- **DO** regenerate after backend API changes: `npm run generate:api`
- **DO** import from `src/api` (root index.ts), not from nested paths
- **DO** commit `openapi.config.ts` to version control
- **DO NOT** commit generated files (add to .gitignore, regenerate on build)

**Usage Pattern:**

```typescript
// ✅ Correct - import from root api barrel
import { AccountsService, Dto_AccountResponse } from 'src/api';

// ❌ Wrong - don't import from nested paths
import { AccountsService } from 'src/api/providers/services/accounts.service';
```

**Regeneration Workflow:**

1. Copy updated `swagger.yaml` from backend: `cp ../fintrack-api/docs/swagger.yaml ./src/api/openapi.yaml`
2. Run generation: `npm run generate:api`
3. Review changes and fix TypeScript errors
4. Test affected features

## Component Structure

Each component should follow this pattern:

```
component-name/
├── component-name.component.ts      # Component logic
├── component-name.component.html    # Template
├── component-name.component.scss    # Styles
└── component-name.component.spec.ts # Unit tests
```

**For small components**, inline templates and styles are acceptable:

```typescript
@Component({
  selector: 'app-simple',
  template: `<div>Simple content</div>`,
  styles: [
    `
      div {
        padding: 1rem;
      }
    `,
  ],
})
export class SimpleComponent {}
```

## Routing Strategy

### Lazy Loading

Features are lazy-loaded for optimal performance:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./features/transactions/transactions.routes').then((m) => m.TRANSACTION_ROUTES),
    canActivate: [authGuard, tenantGuard],
  },
];
```

### Route Guards

- `authGuard`: Protects routes requiring authentication
- `tenantGuard`: Ensures valid tenant context

## State Management

### Signals (Primary)

Use Angular Signals for reactive state:

```typescript
export class TransactionService {
  private transactionsSignal = signal<Transaction[]>([]);
  transactions = this.transactionsSignal.asReadonly();

  private totalSignal = computed(() =>
    this.transactionsSignal().reduce((sum, t) => sum + t.amount, 0),
  );
}
```

### Observable Streams

Use RxJS for asynchronous operations and HTTP calls:

```typescript
loadTransactions(): Observable<Transaction[]> {
  return this.apiService.getTransactions().pipe(
    tap(transactions => this.transactionsSignal.set(transactions))
  );
}
```

## Styling Approach

### Angular Material Theme

Custom Material theme defined in `src/styles/_material-theme.scss`.

### Component Styles

- Use scoped SCSS for component-specific styles
- Follow BEM naming convention for CSS classes
- Leverage Material Design tokens for consistency

### Global Styles

- Variables and mixins in `src/styles/`
- Utility classes for common patterns
- Responsive breakpoints

## Best Practices

1. **Standalone Components**: All components use `standalone: true`
2. **Signals for State**: Prefer signals over observables for state management
3. **OnPush Change Detection**: Use `ChangeDetectionStrategy.OnPush` for all components
4. **Lazy Loading**: Load features on demand
5. **Type Safety**: Leverage TypeScript and auto-generated API types
6. **Accessibility**: Ensure WCAG AA compliance
7. **Responsive Design**: Mobile-first approach

## File Naming Conventions

- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Guards: `guard-name.guard.ts`
- Pipes: `pipe-name.pipe.ts`
- Directives: `directive-name.directive.ts`
- Models: `model-name.model.ts`
- Routes: `feature-name.routes.ts`

## Testing Structure

Tests should mirror the source structure:

```
component-name/
├── component-name.component.spec.ts
service-name.service.spec.ts
```

See [GUIDELINES.md](./GUIDELINES.md) for testing best practices.
