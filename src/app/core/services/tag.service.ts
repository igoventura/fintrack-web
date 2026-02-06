import { inject, Injectable, signal } from '@angular/core';
import {
  TagsService,
  Dto_TagResponse,
  Dto_CreateTagRequest,
  Dto_UpdateTagRequest,
} from '../../../api/providers';
import { finalize, tap } from 'rxjs';
import { ToastService } from './toast.service';
import { TenantScopedServiceBase } from './base/tenant-scoped.service';

@Injectable({
  providedIn: 'root',
})
export class TagService extends TenantScopedServiceBase {
  private readonly apiService = inject(TagsService);
  private readonly toastService = inject(ToastService);

  private readonly _tags = signal<Dto_TagResponse[]>([]);
  private readonly _loading = signal<boolean>(false);

  readonly tags = this._tags.asReadonly();
  readonly loading = this._loading.asReadonly();

  constructor() {
    super();
  }

  protected loadData(): void {
    this.loadTags();
  }

  protected setEmptyData(): void {
    this._tags.set([]);
  }

  loadTags() {
    this._loading.set(true);
    this.apiService
      .tagsGet()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (tags) => this._tags.set(tags),
        error: (err) => {
          console.error('Failed to load tags', err);
          this.toastService.error('Failed to load tags');
        },
      });
  }

  createTag(dto: Dto_CreateTagRequest) {
    this._loading.set(true);
    return this.apiService.tagsPost(dto).pipe(
      tap((newTag) => {
        this._tags.update((tags) => [...tags, newTag]);
        this.toastService.success('Tag created successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  updateTag(id: string, dto: Dto_UpdateTagRequest) {
    this._loading.set(true);
    return this.apiService.tagsIdPut(id, dto).pipe(
      tap((updatedTag) => {
        this._tags.update((tags) => tags.map((tag) => (tag.id === id ? updatedTag : tag)));
        this.toastService.success('Tag updated successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }

  deleteTag(id: string) {
    this._loading.set(true);
    return this.apiService.tagsIdDelete(id).pipe(
      tap(() => {
        this._tags.update((tags) => tags.filter((tag) => tag.id !== id));
        this.toastService.success('Tag deleted successfully');
      }),
      finalize(() => this._loading.set(false)),
    );
  }
}
