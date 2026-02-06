import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../core/services/category.service';
import { Dto_CreateCategoryRequest } from '../../../../../api/providers';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../../core/constants';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    AppIconComponent,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  public readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  // Inputs/Signals
  readonly categoryId = signal<string | null>(null);
  readonly isEditMode = computed(() => !!this.categoryId());

  // Expose categories for parent selection
  readonly categories = this.categoryService.categories;

  readonly typeOptions = [
    { value: 'expense', label: 'Expense' },
    { value: 'income', label: 'Income' },
    { value: 'transfer', label: 'Transfer' },
  ];

  readonly colorPalette = CATEGORY_COLORS;

  readonly icons = CATEGORY_ICONS;

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    parent_category_id: [''],
    color: ['var(--color-housing-dark-blue)'],
    icon: ['category_home'],
    type: ['expense', [Validators.required]],
  });

  ngOnInit(): void {
    // Check for ID param
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        take(1),
      )
      .subscribe((id) => {
        if (id) {
          this.categoryId.set(id);
          this.loadCategoryData(id);
        }
      });

    // Ensure categories are loaded for the parent selector
    this.categoryService.loadCategories();

    // Listen for parent category selection changes
    this.form.controls.parent_category_id.valueChanges.subscribe((parentId) => {
      if (parentId) {
        const parent = this.categoryService.categories().find((c) => c.id === parentId);
        if (parent) {
          this.form.patchValue({
            color: parent.color,
            icon: parent.icon,
            type: parent.type,
          });
          this.form.controls.type.disable();
        }
      } else {
        this.form.controls.type.enable();
      }
    });
  }

  private loadCategoryData(id: string) {
    this.categoryService.loadCategories(); // Ensure loaded
    // Subscribe to categories to find the current one
    // In a real app we might fetch by ID specifically if list isn't full,
    // but here we have all categories loaded in service usually.
    // However, the service also has getById method if we wanted to use that.
    // For now, let's grab from the list or fetch if needed.

    // Simplification: Rely on the service state or fetch single
    this.categoryService.getCategoryById(id).subscribe({
      next: (cat) => {
        this.form.patchValue({
          name: cat.name,
          parent_category_id: cat.parent_category_id,
          color: cat.color,
          icon: cat.icon,
          type: cat.type,
        });
        // If parent exists, disable type
        if (cat.parent_category_id) {
          this.form.controls.type.disable();
        }
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.getRawValue(); // use getRawValue to include disabled fields
    const categoryData: Dto_CreateCategoryRequest = {
      name: formValue.name!,
      parent_category_id: formValue.parent_category_id || undefined,
      color: formValue.color || undefined,
      icon: formValue.icon || undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (formValue.type as any) || 'expense',
    };

    if (this.isEditMode() && this.categoryId()) {
      this.categoryService.updateCategory(this.categoryId()!, categoryData).subscribe({
        next: () => this.router.navigate(['/categories']),
      });
    } else {
      this.categoryService.createCategory(categoryData).subscribe({
        next: () => this.router.navigate(['/categories']),
      });
    }
  }

  selectColor(color: string) {
    this.form.patchValue({ color });
    this.form.markAsDirty();
  }

  selectIcon(icon: (typeof CATEGORY_ICONS)[0]) {
    this.form.patchValue({
      icon: icon.name,
      color: icon.defaultColor,
    });
    this.form.markAsDirty();
  }
}
