import {RequestOptions} from "../request-options/request-options.Class";
import {RequestFilterOption} from "../request-filter-option/request-filter-option.Class";
import {HttpParams} from "@angular/common/http";

export class RequestFilter extends RequestOptions {
  constructor(public sort: string, public order: string, public page: number|null, public limit: number|null, public filterOptions: Array<RequestFilterOption>) {
    super(sort, order, page, limit);
  }

  getOptions(): HttpParams {
    let options = super.getOptions();

    this.filterOptions.forEach((filter) => {
      options = options.set(filter.filterName, filter.filterValue)
    })

    return options
  }
}
