import * as moment from 'moment';
export interface CalendarDate {
    mDate: moment.Moment;
    today?: boolean;
  }