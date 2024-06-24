import { createAction } from '@ngrx/store';

const prefix = '[Booking]';

export const startBookingResource = createAction(
  `${prefix} Start booking resource`
);

export const openBookingModal = createAction(`${prefix} Open booking modal`);

export const fetchLocationsFailure = createAction(
  `${prefix} Fetch locations failure`
);
