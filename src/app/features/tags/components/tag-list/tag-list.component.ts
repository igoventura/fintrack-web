import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagService } from '../../../../core/services/tag.service';
import { Dto_TagResponse } from '../../../../../api/providers';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    EmptyStateComponent,
  ],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent implements OnInit {
  /* public for template access */
  public readonly tagService = inject(TagService);

  readonly tags = this.tagService.tags;
  readonly loading = this.tagService.loading;

  newTagName = signal('');
  editingTagId = signal<string | null>(null);
  editTagName = signal('');

  ngOnInit(): void {
    this.tagService.loadTags();
  }

  addTag() {
    const name = this.newTagName().trim();
    if (!name) return;

    this.tagService.createTag({ name }).subscribe({
      next: () => this.newTagName.set(''),
    });
  }

  startEdit(tag: Dto_TagResponse) {
    this.editingTagId.set(tag.id!);
    this.editTagName.set(tag.name!);
  }

  cancelEdit() {
    this.editingTagId.set(null);
    this.editTagName.set('');
  }

  saveEdit(tagId: string) {
    const name = this.editTagName().trim();
    if (!name) return;

    this.tagService.updateTag(tagId, { name }).subscribe({
      next: () => this.cancelEdit(),
    });
  }

  deleteTag(tag: Dto_TagResponse) {
    if (window.confirm(`Are you sure you want to delete tag "${tag.name}"?`)) {
      this.tagService.deleteTag(tag.id!).subscribe();
    }
  }
}
