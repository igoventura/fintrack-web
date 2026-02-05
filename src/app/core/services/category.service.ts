import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CategoriesService,
  Dto_CategoryResponse,
  Dto_CreateCategoryRequest,
  Dto_UpdateCategoryRequest,
} from '../../../api/providers';
import { finalize, tap } from 'rxjs';
import { ToastService } from './toast.service';

export interface CategoryNode extends Dto_CategoryResponse {
  children?: CategoryNode[];
  level?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiService = inject(CategoriesService);
  private readonly toastService = inject(ToastService);

  private readonly _categories = signal<Dto_CategoryResponse[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();

  // Computed tree structure for display
  readonly categoryTree = computed(() => {
    return this.buildCategoryTree(this.categories());
  });

  loadCategories() {
    this._loading.set(true);
    this.apiService
      .categoriesGet()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (categories) => this._categories.set(categories),
        error: (err) => {
          console.error('Failed to load categories', err);
          this.toastService.error('Failed to load categories');
        },
      });
  }

  createCategory(dto: Dto_CreateCategoryRequest) {
    this._loading.set(true);
    return this.apiService.categoriesPost(dto).pipe(
      tap((newCategory) => {
        this._categories.update((categories) => [...categories, newCategory]);
        this.toastService.success('Category created successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  updateCategory(id: string, dto: Dto_UpdateCategoryRequest) {
    this._loading.set(true);
    return this.apiService.categoriesIdPut(id, dto).pipe(
      tap((updatedCategory) => {
        this._categories.update((categories) =>
          categories.map((cat) => (cat.id === id ? updatedCategory : cat)),
        );
        this.toastService.success('Category updated successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  deleteCategory(id: string) {
    this._loading.set(true);
    return this.apiService.categoriesIdDelete(id).pipe(
      tap(() => {
        this._categories.update((categories) => categories.filter((cat) => cat.id !== id));
        this.toastService.success('Category deleted successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  getCategoryById(id: string) {
    return this.apiService.categoriesIdGet(id);
  }

  private buildCategoryTree(categories: Dto_CategoryResponse[]): CategoryNode[] {
    const map = new Map<string, CategoryNode>();
    const roots: CategoryNode[] = [];

    // First pass: create nodes
    categories.forEach((cat) => {
      map.set(cat.id!, { ...cat, children: [] });
    });

    // Second pass: link parent/children
    categories.forEach((cat) => {
      const node = map.get(cat.id!);
      if (cat.parent_category_id) {
        const parent = map.get(cat.parent_category_id);
        if (parent) {
          parent.children?.push(node!);
        } else {
          // Handle orphan or missing parent case, treat as root?
          roots.push(node!);
        }
      } else {
        roots.push(node!);
      }
    });

    return roots;
  }
}
