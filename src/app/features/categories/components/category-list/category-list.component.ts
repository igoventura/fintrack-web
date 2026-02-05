import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryNode, CategoryService } from '../../../../core/services/category.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  data: CategoryNode;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTreeModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly loading = this.categoryService.loading;

  private _transformer = (node: CategoryNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name || '',
      level: level,
      data: node,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Helper because we need to update dataSource.data
  // Ideally this component uses an effect to track loading state and update tree
  constructor() {
    effect(() => {
      this.dataSource.data = this.categoryService.categoryTree();
    });
  }

  ngOnInit(): void {
    this.categoryService.loadCategories();
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  deleteCategory(node: CategoryNode) {
    if (window.confirm(`Are you sure you want to delete ${node.name}?`)) {
      this.categoryService.deleteCategory(node.id!).subscribe();
    }
  }
}
