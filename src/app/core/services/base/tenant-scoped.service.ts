import { TenantService } from '../tenant.service';
import { effect, inject } from '@angular/core';

export abstract class TenantScopedServiceBase {
  protected readonly tenantService = inject(TenantService);

  constructor() {
    effect(() => {
      const tenantId = this.tenantService.currentTenantId();
      if (tenantId) {
        this.loadData();
      } else {
        this.setEmptyData();
      }
    });
  }

  protected abstract loadData(): void;
  protected abstract setEmptyData(): void;
}
