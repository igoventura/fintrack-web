# FinTrack Web - Development Guidelines

This document outlines the coding standards, best practices, and development workflow for the FinTrack Web application.

## Table of Contents

- [TypeScript Best Practices](#typescript-best-practices)
- [Angular Best Practices](#angular-best-practices)
- [Component Guidelines](#component-guidelines)
- [State Management](#state-management)
- [Templates & Control Flow](#templates--control-flow)
- [Services & Dependency Injection](#services--dependency-injection)
- [HTTP & API Integration](#http--api-integration)
- [Forms](#forms)
- [Styling Guidelines](#styling-guidelines)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Performance](#performance)
- [Git Workflow](#git-workflow)

---

## TypeScript Best Practices

### Type Safety

✅ **DO:**

```typescript
// Use strict type checking
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // Implementation
}

// Prefer type inference when obvious
const count = 5; // TypeScript infers number
const users = ['Alice', 'Bob']; // TypeScript infers string[]
```

❌ **DON'T:**

```typescript
// Avoid using 'any'
function processData(data: any) {
  return data.value; // Type safety lost
}

// Use 'unknown' when type is uncertain
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

### Configuration

Ensure strict type checking in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

---

## Angular Best Practices

### Standalone Components (Mandatory)

✅ **DO:**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  // Component logic
}
```

❌ **DON'T:**

```typescript
// Do NOT use NgModules
// Do NOT set standalone: true (it's default in Angular 21+)
@Component({
  standalone: true, // Redundant in Angular 21+
  // ...
})
```

### Change Detection

Always use OnPush change detection:

```typescript
@Component({
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Lazy Loading

Load features on demand:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'transactions',
    loadChildren: () =>
      import('./features/transactions/transactions.routes').then((m) => m.TRANSACTION_ROUTES),
  },
];
```

### Avoid Deprecated Decorators

❌ **DON'T:**

```typescript
// Don't use @HostBinding and @HostListener
@HostBinding('class.active') isActive = true;
@HostListener('click', ['$event']) onClick(event: MouseEvent) {}
```

✅ **DO:**

```typescript
// Use host object instead
@Component({
  host: {
    '[class.active]': 'isActive',
    '(click)': 'onClick($event)',
  },
})
export class MyComponent {
  isActive = true;
  onClick(event: MouseEvent) {}
}
```

### Optimized Images

✅ **DO:**

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: `
    <img ngSrc="assets/logo.png" alt="Logo" width="200" height="100" priority>
  `
})
```

❌ **DON'T:**

```typescript
// NgOptimizedImage does NOT work with inline base64 images
<img ngSrc="data:image/png;base64,..." alt="Icon">
```

---

## Component Guidelines

### Component Structure

Keep components small and focused:

```typescript
import { Component, OnInit, signal, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  imports: [CommonModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionItemComponent implements OnInit {
  // Use input() function instead of @Input decorator
  transaction = input.required<Transaction>();

  // Use output() function instead of @Output decorator
  edit = output<Transaction>();
  delete = output<string>();

  // Use signals for local state
  isExpanded = signal(false);

  // Use computed() for derived state
  formattedAmount = computed(() => this.formatCurrency(this.transaction().amount));

  ngOnInit() {
    // Initialization logic
  }

  toggleExpand() {
    this.isExpanded.update((v) => !v);
  }

  onEdit() {
    this.edit.emit(this.transaction());
  }

  onDelete() {
    this.delete.emit(this.transaction().id);
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }
}
```

### Inline vs External Templates

**Small components** (< 10 lines of HTML):

```typescript
@Component({
  selector: 'app-badge',
  template: `
    <span class="badge" [class.badge--success]="type() === 'success'">
      {{ label() }}
    </span>
  `,
  styles: [
    `
      .badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
      }
      .badge--success {
        background: green;
        color: white;
      }
    `,
  ],
})
export class BadgeComponent {
  type = input<'success' | 'error' | 'warning'>('success');
  label = input.required<string>();
}
```

**Larger components** - use external files with relative paths:

```typescript
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
```

### Custom Shared Components

#### App Icon Component

Use the `app-icon` component for displaying account and category icons:

```typescript
import { AppIconComponent } from 'src/app/shared/components/app-icon/app-icon.component';

@Component({
  imports: [AppIconComponent],
  template: `
    <app-icon
      [name]="'wallet'"
      [color]="'var(--color-bronze)'"
      [size]="32"
    />
  `
})
```

**Properties:**

- `name` (required): Icon name from `ACCOUNT_ICONS` or `CATEGORY_ICONS` constants
- `color` (optional): Background color (use CSS variables from constants)
- `size` (optional): Icon size in pixels (default: 24)

**Available Icons:**

- Account icons: `wallet`, `bank_traditional`, `bank_digital`, `credit_card`, `bitcoin`, `savings`, `investment`, `pix`, `money_cash`, `brand_mastercard`, `brand_visa`
- Category icons: `category_home`, `category_food`, `category_grocery`, `category_transport`, `category_fuel`, `category_health`, `category_fitness`, `category_shopping`, `category_travel`, `category_education`, `category_entertainment`, `category_pets`, `category_utilities`, `category_income`, `category_gift`

### Application Constants

Use predefined constants from `src/app/core/constants.ts`:

```typescript
import {
  ACCOUNT_COLORS,
  CATEGORY_COLORS,
  ACCOUNT_ICONS,
  CATEGORY_ICONS,
} from 'src/app/core/constants';

// Color palettes
const accountColors = ACCOUNT_COLORS; // Contains CSS variable references
const categoryColors = CATEGORY_COLORS;

// Icon definitions with default colors and descriptions
const accountIcons = ACCOUNT_ICONS;
const categoryIcons = CATEGORY_ICONS;
```

**Color Palettes:**

- `ACCOUNT_COLORS`: Fintech brands, traditional banks, premium cards, auxiliary colors
- `CATEGORY_COLORS`: Housing, food, transport, health, leisure, education, income themes

**Note:** All colors are CSS custom properties defined in global styles. Always use the CSS variable (e.g., `var(--color-nu-purple)`) rather than hardcoding hex values.

---

## State Management

### Signals (Primary Approach)

Use signals for reactive state management:

```typescript
export class TransactionService {
  private readonly http = inject(HttpClient);

  // Private writable signal
  private transactionsState = signal<Transaction[]>([]);

  // Public readonly signal
  transactions = this.transactionsState.asReadonly();

  // Computed signal for derived state
  total = computed(() => this.transactionsState().reduce((sum, t) => sum + t.amount, 0));

  income = computed(() =>
    this.transactionsState()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  // Use set() to replace entire state
  setTransactions(transactions: Transaction[]) {
    this.transactionsState.set(transactions);
  }

  // Use update() to modify based on current state
  addTransaction(transaction: Transaction) {
    this.transactionsState.update((current) => [...current, transaction]);
  }

  // ❌ DON'T use mutate() - use update() or set()
}
```

### Component State

```typescript
export class TransactionListComponent {
  private service = inject(TransactionService);

  // Component signals
  isLoading = signal(false);
  error = signal<string | null>(null);
  selectedId = signal<string | null>(null);

  // Reference service signals
  transactions = this.service.transactions;
  total = this.service.total;

  // Computed from multiple signals
  selectedTransaction = computed(() => {
    const id = this.selectedId();
    return this.transactions().find((t) => t.id === id);
  });

  async loadTransactions() {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const data = await firstValueFrom(this.service.fetchTransactions());
      this.service.setTransactions(data);
    } catch (err) {
      this.error.set('Failed to load transactions');
    } finally {
      this.isLoading.set(false);
    }
  }
}
```

### Keep State Transformations Pure

```typescript
// ✅ Good - pure function
function calculateTotal(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

// ❌ Bad - side effects
function calculateTotal(transactions: Transaction[]): number {
  console.log('Calculating...'); // Side effect
  updateLastCalculated(); // Side effect
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
```

---

## Templates & Control Flow

### Native Control Flow (Mandatory)

✅ **DO:**

```html
<!-- Use @if instead of *ngIf -->
@if (isLoading()) {
<app-loading-spinner />
} @if (error()) {
<app-error-message [message]="error()!" />
} @else if (transactions().length === 0) {
<app-empty-state message="No transactions found" />
} @else {
<app-transaction-list [transactions]="transactions()" />
}

<!-- Use @for instead of *ngFor -->
@for (transaction of transactions(); track transaction.id) {
<app-transaction-item
  [transaction]="transaction"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)"
/>
} @empty {
<p>No transactions to display</p>
}

<!-- Use @switch instead of *ngSwitch -->
@switch (status()) { @case ('pending') {
<span class="badge badge--warning">Pending</span>
} @case ('completed') {
<span class="badge badge--success">Completed</span>
} @default {
<span class="badge">Unknown</span>
} }
```

❌ **DON'T:**

```html
<!-- Don't use old structural directives -->
<div *ngIf="isLoading">Loading...</div>
<div *ngFor="let item of items">{{ item }}</div>
<div [ngSwitch]="status">
  <span *ngSwitchCase="'pending'">Pending</span>
</div>
```

### Template Best Practices

```html
<!-- ✅ Use class bindings instead of ngClass -->
<div [class.active]="isActive()" [class.disabled]="isDisabled()">Content</div>

<!-- ✅ Use style bindings instead of ngStyle -->
<div [style.color]="textColor()" [style.font-size.px]="fontSize()">Content</div>

<!-- ❌ Don't use ngClass or ngStyle -->
<div [ngClass]="{ active: isActive() }">Content</div>
<div [ngStyle]="{ color: textColor() }">Content</div>

<!-- ❌ Don't assume globals are available -->
<!-- Bad: -->
<p>Today: {{ new Date() }}</p>

<!-- Good: -->
<p>Today: {{ today() }}</p>

<!-- ❌ Don't write arrow functions in templates -->
<!-- Bad: -->
<button (click)="items().filter(i => i.active).forEach(i => process(i))">Process</button>

<!-- Good: -->
<button (click)="processActiveItems()">Process</button>
```

### Async Pipe

Use the async pipe for observables:

```html
@if (user$ | async; as user) {
<p>Welcome, {{ user.name }}!</p>
}
```

---

## Services & Dependency Injection

### Service Structure

```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Singleton service
})
export class TransactionService {
  // Use inject() function instead of constructor injection
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiConfiguration);

  private transactionsState = signal<Transaction[]>([]);
  transactions = this.transactionsState.asReadonly();

  fetchTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.api.baseUrl}/transactions`);
  }

  createTransaction(data: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.api.baseUrl}/transactions`, data);
  }
}
```

### Single Responsibility

Each service should have one clear purpose:

```typescript
// ✅ Good - focused service
@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: Credentials): Observable<AuthResponse> {}
  logout(): void {}
  isAuthenticated(): boolean {}
}

// ❌ Bad - too many responsibilities
@Injectable({ providedIn: 'root' })
export class DataService {
  getUsers() {}
  getTransactions() {}
  getAccounts() {}
  uploadFile() {}
  sendEmail() {}
}
```

---

## HTTP & API Integration

### Generated API Client (ng-openapi-gen)

The FinTrack Web application uses **ng-openapi-gen** to automatically generate a type-safe API client from the backend's OpenAPI specification.

#### Generated Structure

```
src/api/
└── providers/       # Generated API client (ng-openapi-gen output)
    ├── services/    # API service classes
    │   ├── accounts.service.ts
    │   ├── auth.service.ts
    │   ├── categories.service.ts
    │   ├── tags.service.ts
    │   ├── tenants.service.ts
    │   ├── transactions.service.ts
    │   └── users.service.ts
    ├── models/      # TypeScript interfaces for DTOs
    ├── tokens/      # Injection tokens (BASE_PATH, etc.)
    ├── utils/       # Helper utilities
    ├── resources/   # Resource definitions
    ├── providers.ts # Provider configuration
    └── index.ts     # Main export file
```

#### ⚠️ Critical Rules

1. **NEVER manually edit files in `src/api/providers/`** - They are auto-generated
2. **Always regenerate after OpenAPI spec changes**: `npm run generate:api`
3. **Import from `src/api`** (which re-exports from providers/index.ts), not from nested paths:

   ```typescript
   // ✅ Good
   import { AccountsService, Dto_AccountResponse } from 'src/api';

   // ❌ Bad
   import { AccountsService } from 'src/api/providers/services/accounts.service';
   ```

### Using Generated API Services

#### Direct Usage in Components

For simple use cases, inject generated services directly:

```typescript
import { Component, inject, signal } from '@angular/core';
import { AccountsService, Dto_CreateAccountRequest } from 'src/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-account-form',
  // ...
})
export class AccountFormComponent {
  private readonly accountsApi = inject(AccountsService);

  isSubmitting = signal(false);
  error = signal<string | null>(null);

  async createAccount(data: Dto_CreateAccountRequest) {
    this.isSubmitting.set(true);
    this.error.set(null);

    try {
      // Generated service returns Observable, convert to Promise
      const account = await firstValueFrom(this.accountsApi.accountsPost(data));

      console.log('Account created:', account);
      return account;
    } catch (err) {
      this.error.set('Failed to create account');
      throw err;
    } finally {
      this.isSubmitting.set(false);
    }
  }
  }
}
```

#### DTO Handling for Updates

When implementing update methods, ensure you use the correct DTO type (`Dto_Update*Request`) as it may differ from the Create DTO. Explicitly construct the object rather than casting if fields differ significantly.

```typescript
const updateData: Dto_UpdateAccountRequest = {
  name: formValue.name,
  // ... only include updatable fields
};
this.service.update(id, updateData);
```

#### Wrapping in Feature Services (Recommended)

For complex features, wrap generated services in feature-specific services with state management:

```typescript
// src/app/features/accounts/services/account.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { AccountsService, Dto_AccountResponse, Dto_CreateAccountRequest } from 'src/api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // Inject generated API service
  private readonly accountsApi = inject(AccountsService);

  // State management with signals
  private accountsState = signal<Dto_AccountResponse[]>([]);
  accounts = this.accountsState.asReadonly();

  // Computed signals for derived state
  totalBalance = computed(() =>
    this.accountsState().reduce((sum, acc) => sum + acc.initial_balance, 0),
  );

  bankAccounts = computed(() => this.accountsState().filter((acc) => acc.type === 'bank'));

  // Wrap API calls with state updates
  async loadAccounts(): Promise<void> {
    try {
      const accounts = await firstValueFrom(this.accountsApi.accountsGet());
      this.accountsState.set(accounts);
    } catch (err) {
      console.error('Failed to load accounts:', err);
      throw err;
    }
  }

  async createAccount(data: Dto_CreateAccountRequest): Promise<Dto_AccountResponse> {
    const account = await firstValueFrom(this.accountsApi.accountsPost(data));

    // Update local state
    this.accountsState.update((current) => [...current, account]);

    return account;
  }

  async deleteAccount(id: string): Promise<void> {
    await firstValueFrom(this.accountsApi.accountsIdDelete(id));

    // Update local state
    this.accountsState.update((current) => current.filter((acc) => acc.id !== id));
  }
}
```

### HTTP Interceptors

Add authentication and tenant headers globally:

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};

// tenant.interceptor.ts
export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantService = inject(TenantService);
  const tenantId = tenantService.getCurrentTenantId();

  if (tenantId && !req.headers.has('X-Tenant-ID')) {
    req = req.clone({
      setHeaders: { 'X-Tenant-ID': tenantId },
    });
  }

  return next(req);
};

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor, tenantInterceptor]))],
};
```

### Error Handling

Handle API errors consistently:

```typescript
// error.interceptor.ts
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle specific error codes
      switch (error.status) {
        case 401:
          // Unauthorized - redirect to login
          router.navigate(['/auth/login']);
          toastService.error('Session expired. Please login again.');
          break;

        case 403:
          // Forbidden
          toastService.error('You do not have permission to perform this action.');
          break;

        case 404:
          toastService.error('Resource not found.');
          break;

        case 500:
          toastService.error('Server error. Please try again later.');
          break;

        default:
          // Generic error message
          const message = error.error?.error || 'An error occurred';
          toastService.error(message);
      }

      return throwError(() => error);
    }),
  );
};
```

### API Configuration

Configure the base URL for generated services:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BASE_PATH_FINTRACK } from 'src/api';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Set API base URL
    {
      provide: BASE_PATH_FINTRACK,
      useValue: environment.apiUrl,
    },

    // Configure HTTP client with interceptors
    provideHttpClient(withInterceptors([authInterceptor, tenantInterceptor, errorInterceptor])),
  ],
};
```

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
};

// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.fintrack.app',
};
```

### Regenerating API Client

When the backend OpenAPI spec changes:

1. **Copy the updated spec**:

   ```bash
   cp ../fintrack-api/docs/swagger.yaml ./src/api/openapi.yaml
   ```

2. **Regenerate the client**:

   ```bash
   npm run generate:api
   ```

3. **Review changes**:
   - Check for new services/models
   - Update affected components/services
   - Fix TypeScript errors

4. **Test**:
   - Ensure existing functionality still works
   - Test new endpoints

### Best Practices

1. **Wrap in Feature Services**: Don't use generated services directly in components for complex features
2. **Use Signals for State**: Store API responses in signals for reactive updates
3. **Handle Errors Globally**: Use interceptors for common error scenarios
4. **Type Safety**: Leverage generated TypeScript types
5. **Convert Observables**: Use `firstValueFrom()` to convert to Promises in async functions
6. **Never Mutate**: Always use immutable updates when modifying state:

   ```typescript
   // ✅ Good
   this.accountsState.update((current) => [...current, newAccount]);

   // ❌ Bad
   this.accountsState.mutate((current) => current.push(newAccount));
   ```

---

## Forms

### Reactive Forms (Preferred)

```typescript
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, MaterialModules],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['expense', Validators.required],
    categoryId: ['', Validators.required],
    accountId: ['', Validators.required],
    date: [new Date(), Validators.required],
  });

  isSubmitting = signal(false);

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      const value = this.form.getRawValue();
      // Submit logic
    }
  }
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <mat-form-field>
    <mat-label>Description</mat-label>
    <input matInput formControlName="description" />
    @if (form.controls.description.hasError('required')) {
    <mat-error>Description is required</mat-error>
    }
  </mat-form-field>

  <mat-form-field>
    <mat-label>Amount</mat-label>
    <input matInput type="number" formControlName="amount" />
  </mat-form-field>

  <button
    mat-raised-button
    color="primary"
    type="submit"
    [disabled]="form.invalid || isSubmitting()"
  >
    @if (isSubmitting()) { Submitting... } @else { Submit }
  </button>
</form>
```

### Custom Validators

```typescript
export class CustomValidators {
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected > today ? { futureDate: true } : null;
    };
  }

  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value !== null && value > 0 ? null : { positiveNumber: true };
    };
  }
}
```

---

## Styling Guidelines

### Component Styles

Use BEM naming convention:

```scss
// transaction-item.component.scss
.transaction-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  &__icon {
    margin-right: 1rem;
  }

  &__content {
    flex: 1;
  }

  &__amount {
    font-weight: bold;

    &--income {
      color: green;
    }

    &--expense {
      color: red;
    }
  }

  &--selected {
    background-color: #f0f0f0;
  }
}
```

### Material Theme

Define custom theme in `src/styles/_material-theme.scss`:

```scss
@use '@angular/material' as mat;

$custom-primary: mat.define-palette(mat.$indigo-palette);
$custom-accent: mat.define-palette(mat.$pink-palette);
$custom-warn: mat.define-palette(mat.$red-palette);

$custom-theme: mat.define-light-theme(
  (
    color: (
      primary: $custom-primary,
      accent: $custom-accent,
      warn: $custom-warn,
    ),
    typography: mat.define-typography-config(),
    density: 0,
  )
);

@include mat.all-component-themes($custom-theme);
```

### Responsive Design

Use Material breakpoints:

```scss
@use '@angular/material' as mat;

.container {
  padding: 1rem;

  @media (min-width: mat.$breakpoint-tablet) {
    padding: 2rem;
  }

  @media (min-width: mat.$breakpoint-desktop) {
    padding: 3rem;
  }
}
```

---

## Accessibility

### WCAG AA Compliance (Mandatory)

All components MUST:

- Pass AXE accessibility checks
- Meet WCAG AA color contrast requirements (4.5:1 for normal text)
- Include proper ARIA attributes
- Support keyboard navigation
- Manage focus properly

### Semantic HTML

```html
<!-- ✅ Good -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/transactions">Transactions</a></li>
  </ul>
</nav>

<main>
  <h1>Transactions</h1>
  <section aria-labelledby="recent-heading">
    <h2 id="recent-heading">Recent Transactions</h2>
  </section>
</main>

<!-- ❌ Bad -->
<div class="nav">
  <div class="link">Transactions</div>
</div>
```

### ARIA Attributes

```html
<button
  aria-label="Delete transaction"
  [attr.aria-expanded]="isExpanded()"
  [attr.aria-pressed]="isActive()"
  (click)="toggle()"
>
  <mat-icon>delete</mat-icon>
</button>

<div role="alert" aria-live="polite">@if (error()) { {{ error() }} }</div>
```

### Focus Management

```typescript
export class DialogComponent implements AfterViewInit {
  @ViewChild('firstInput') firstInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    // Focus first input when dialog opens
    setTimeout(() => this.firstInput.nativeElement.focus());
  }
}
```

---

## Testing

### Component Tests

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionItemComponent } from './transaction-item.component';

describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format amount correctly', () => {
    fixture.componentRef.setInput('transaction', {
      id: '1',
      amount: 1000,
      description: 'Test',
    });

    expect(component.formattedAmount()).toBe('R$ 1.000,00');
  });

  it('should emit edit event', () => {
    const transaction = { id: '1', amount: 100 };
    fixture.componentRef.setInput('transaction', transaction);

    let emittedValue: any;
    component.edit.subscribe((value) => (emittedValue = value));

    component.onEdit();

    expect(emittedValue).toEqual(transaction);
  });
});
```

### Service Tests

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch transactions', (done) => {
    const mockTransactions = [
      { id: '1', amount: 100 },
      { id: '2', amount: 200 },
    ];

    service.fetchTransactions().subscribe((transactions) => {
      expect(transactions).toEqual(mockTransactions);
      done();
    });

    const req = httpMock.expectOne('/api/transactions');
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });
});
```

---

## Performance

### OnPush Change Detection

Always use OnPush for better performance:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### TrackBy Functions

Always provide trackBy for lists:

```html
@for (item of items(); track item.id) {
<app-item [data]="item" />
}
```

### Lazy Loading

Load features on demand to reduce initial bundle size.

### Image Optimization

Use NgOptimizedImage for all static images:

```html
<img ngSrc="assets/logo.png" alt="Logo" width="200" height="100" priority />
```

---

## Git Workflow

### Branch Naming

- `feature/transaction-list` - New features
- `fix/login-error` - Bug fixes
- `refactor/auth-service` - Code refactoring
- `docs/api-integration` - Documentation

### Commit Messages

Follow conventional commits:

```
feat: add transaction filtering by date range
fix: resolve login redirect issue
refactor: extract currency formatting to utility
docs: update API integration guide
test: add unit tests for transaction service
style: format code with Prettier
chore: update dependencies
```

### Pull Requests

- Keep PRs focused and small
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow code review feedback

---

## Additional Notes

### Code Generation

After modifying `openapi.yaml`, regenerate the API client:

```bash
npm run generate:api
```

### Linting & Formatting

Configure Prettier in `package.json`:

```json
{
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": { "parser": "angular" }
      }
    ]
  }
}
```

### Pre-commit Hooks

Consider adding pre-commit hooks for:

- Linting
- Formatting
- Running tests
- Type checking

---

## Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RxJS Documentation](https://rxjs.dev)

---

**Remember**: These guidelines are meant to ensure code quality, maintainability, and consistency across the project. When in doubt, refer to this document and the official Angular documentation.
