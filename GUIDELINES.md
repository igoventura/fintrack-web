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
  changeDetection: ChangeDetectionStrategy.OnPush
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
      import('./features/transactions/transactions.routes')
        .then(m => m.TRANSACTION_ROUTES)
  }
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
    '(click)': 'onClick($event)'
  }
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
  changeDetection: ChangeDetectionStrategy.OnPush
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
  formattedAmount = computed(() => 
    this.formatCurrency(this.transaction().amount)
  );
  
  ngOnInit() {
    // Initialization logic
  }
  
  toggleExpand() {
    this.isExpanded.update(v => !v);
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
      currency: 'BRL'
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
  styles: [`
    .badge { padding: 0.25rem 0.5rem; border-radius: 4px; }
    .badge--success { background: green; color: white; }
  `]
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
  total = computed(() => 
    this.transactionsState().reduce((sum, t) => sum + t.amount, 0)
  );
  
  income = computed(() =>
    this.transactionsState()
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  );
  
  // Use set() to replace entire state
  setTransactions(transactions: Transaction[]) {
    this.transactionsState.set(transactions);
  }
  
  // Use update() to modify based on current state
  addTransaction(transaction: Transaction) {
    this.transactionsState.update(current => [...current, transaction]);
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
    return this.transactions().find(t => t.id === id);
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
}

@if (error()) {
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
    (delete)="onDelete($event)" />
} @empty {
  <p>No transactions to display</p>
}

<!-- Use @switch instead of *ngSwitch -->
@switch (status()) {
  @case ('pending') {
    <span class="badge badge--warning">Pending</span>
  }
  @case ('completed') {
    <span class="badge badge--success">Completed</span>
  }
  @default {
    <span class="badge">Unknown</span>
  }
}
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
<div [class.active]="isActive()" [class.disabled]="isDisabled()">
  Content
</div>

<!-- ✅ Use style bindings instead of ngStyle -->
<div [style.color]="textColor()" [style.font-size.px]="fontSize()">
  Content
</div>

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
<button (click)="items().filter(i => i.active).forEach(i => process(i))">
  Process
</button>

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
  providedIn: 'root' // Singleton service
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
    return this.http.post<Transaction>(
      `${this.api.baseUrl}/transactions`,
      data
    );
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

### Using Generated API Services

```typescript
import { Component, inject, signal } from '@angular/core';
import { TransactionsService } from '@/api/providers/transactions.service';
import { CreateTransactionRequest } from '@/api/models';

export class TransactionFormComponent {
  private readonly transactionsApi = inject(TransactionsService);
  
  isSubmitting = signal(false);
  error = signal<string | null>(null);
  
  async onSubmit(data: CreateTransactionRequest) {
    this.isSubmitting.set(true);
    this.error.set(null);
    
    try {
      const result = await firstValueFrom(
        this.transactionsApi.createTransaction({
          'X-Tenant-ID': this.tenantId(),
          body: data
        })
      );
      
      this.success.emit(result);
    } catch (err) {
      this.error.set('Failed to create transaction');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
```

### HTTP Interceptors

Add authentication and tenant headers:

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
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
      setHeaders: { 'X-Tenant-ID': tenantId }
    });
  }
  
  return next(req);
};

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, tenantInterceptor])
    )
  ]
};
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
  templateUrl: './transaction-form.component.html'
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    type: ['expense', Validators.required],
    categoryId: ['', Validators.required],
    accountId: ['', Validators.required],
    date: [new Date(), Validators.required]
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
    [disabled]="form.invalid || isSubmitting()">
    @if (isSubmitting()) {
      Submitting...
    } @else {
      Submit
    }
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

$custom-theme: mat.define-light-theme((
  color: (
    primary: $custom-primary,
    accent: $custom-accent,
    warn: $custom-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

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
  (click)="toggle()">
  <mat-icon>delete</mat-icon>
</button>

<div role="alert" aria-live="polite">
  @if (error()) {
    {{ error() }}
  }
</div>
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
      imports: [TransactionItemComponent]
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
      description: 'Test'
    });
    
    expect(component.formattedAmount()).toBe('R$ 1.000,00');
  });
  
  it('should emit edit event', () => {
    const transaction = { id: '1', amount: 100 };
    fixture.componentRef.setInput('transaction', transaction);
    
    let emittedValue: any;
    component.edit.subscribe(value => emittedValue = value);
    
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
      providers: [TransactionService]
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
      { id: '2', amount: 200 }
    ];
    
    service.fetchTransactions().subscribe(transactions => {
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
<img 
  ngSrc="assets/logo.png" 
  alt="Logo" 
  width="200" 
  height="100"
  priority>
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
