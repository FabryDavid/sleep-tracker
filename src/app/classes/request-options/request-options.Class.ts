import {HttpParams} from "@angular/common/http";

export class RequestOptions {
  constructor(public sort: string, public order: string, public page: number, public limit: number) {
  }

  getOptions() {
    return new HttpParams()
      .set('_sort', this.sort)
      .set('_order', this.order)
      .set('_page', this.page)
      .set('_limit', this.limit)
  }
}
