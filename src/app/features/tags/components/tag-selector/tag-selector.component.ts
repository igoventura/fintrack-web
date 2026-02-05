import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagService } from '../../../../core/services/tag.service';
import { Dto_TagResponse } from '../../../../../api/providers';
import { map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './tag-selector.component.html',
  styleUrl: './tag-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSelectorComponent implements OnInit {
  private readonly tagService = inject(TagService);

  // Two-way binding for selected tag IDs using Signal Model (Angular 17.2+)
  // Using model<string[]> for 'selectedTags'
  // If we want to use it as <app-tag-selector [(selectedTagIds)]="ids" />
  readonly selectedTagIds = model<string[]>([]);

  readonly allTags = this.tagService.tags;
  readonly loading = this.tagService.loading;

  readonly inputControl = new FormControl('');
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly filteredTags = signal<Dto_TagResponse[]>([]);

  // Computed selected tag objects based on IDs
  readonly selectedTags = computed(() => {
    const ids = this.selectedTagIds();
    return this.allTags().filter((tag) => ids.includes(tag.id!));
  });

  ngOnInit(): void {
    // Ensure tags are loaded
    this.tagService.loadTags();

    // Setup filter
    this.inputControl.valueChanges.pipe(startWith(null)).subscribe((value) => {
      this.filterTags(value);
    });
  }

  private filterTags(value: string | null) {
    const filterValue = value ? value.toLowerCase() : '';
    const all = this.allTags();
    const selected = this.selectedTagIds();

    // Filter out already selected tags and match name
    const filtered = all.filter(
      (tag) => !selected.includes(tag.id!) && tag.name?.toLowerCase().includes(filterValue),
    );

    this.filteredTags.set(filtered);
  }

  remove(tagId: string): void {
    this.selectedTagIds.update((ids) => ids.filter((id) => id !== tagId));
    // Re-filter so the removed tag appears back in suggestions
    this.filterTags(this.inputControl.value);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const tag = event.option.value as Dto_TagResponse;

    // If it's a "Create New" dummy object
    if (tag.id === 'NEW') {
      this.createTag(tag.name!);
    } else {
      this.selectedTagIds.update((ids) => [...ids, tag.id!]);
    }

    this.inputControl.setValue(null);
    event.option.deselect();
  }

  createTag(name: string) {
    this.tagService.createTag({ name }).subscribe({
      next: (newTag) => {
        this.selectedTagIds.update((ids) => [...ids, newTag.id!]);
        this.inputControl.setValue(null);
      },
    });
  }
}
