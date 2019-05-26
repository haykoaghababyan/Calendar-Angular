import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {CalendarDate} from '../calendar.date'
import { _ } from 'underscore'
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    this.dataObject = moment();
    this.generateCalendar();
   
  }
  generateCalendar(){
     this.mounthArray = this.fillDates(this.dataObject);
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.dataObject, 'month');
  }

  goMounth () {
   
  this.dataObject = this.dataObject.add(1,'M');
  this.generateCalendar();
  
  }
  
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }
  isRedDay(date:moment.Moment){
    return  date.day() == 0 || date.day() == 6;
  
  }
  
  backMounth() {

  this.dataObject = this.dataObject.subtract(1,'M');
  this.generateCalendar();
  }
  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();

    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                mDate: d
              };
            });
  }

  dataObject:moment.Moment;
  mounthArray:CalendarDate[];
  dayNames:Array<string> = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
}
