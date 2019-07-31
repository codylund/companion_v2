import { Component, OnInit, Input } from '@angular/core';
import { ActivityType } from '../../../../shared/model';

@Component({
  selector: 'app-activity-badge',
  templateUrl: './activity-badge.component.html',
  styleUrls: ['./activity-badge.component.scss']
})
export class ActivityBadgeComponent implements OnInit {

  @Input()
  activityType?: ActivityType;

  activityTypeEnum = ActivityType;

  constructor() { }

  ngOnInit() {
  }

}
