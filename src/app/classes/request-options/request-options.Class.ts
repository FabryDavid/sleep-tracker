import {HttpParams} from "@angular/common/http";

export class RequestOptions {
  constructor(public sort: string, public order: string, public page: number | null, public limit: number | null) {
  }

  getOptions() {
    let params = new HttpParams()
      .set('_sort', this.sort)
      .set('_order', this.order)

    if (this.page) {
      params = params
        .set('_page', this.page)
    }

    if (this.limit) {
      params = params
        .set('_limit', this.limit)
    }

    return params
  }
}
