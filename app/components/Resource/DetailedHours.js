import React from 'react';
import { timeToString, sortScheduleDays } from '../../utils/index';

export default function DetailedHours() {
  let { schedule } = this.props;
  schedule = sortScheduleDays(schedule);
  const hoursList = schedule.map((item) => {
    const key = `${item.day}-${item.opens_at}-${item.closes_at}`;
    if (item.opens_at === 0 && item.closes_at >= 2359) {
      return (
        <div key={key} className="weekly-hours-list--item">
          <span className="weekly-hours-list--item--day">{`${item.day}`}</span>
          <span className="weekly-hours-list--item--hours">24 Hours</span>
        </div>
      );
    }
    return (
      <div key={key} className="weekly-hours-list--item">
        <span className="weekly-hours-list--item--day">{`${item.day}`}</span>
        <span className="weekly-hours-list--item--hours">{`${timeToString(item.opens_at)} - ${timeToString(item.closes_at)}`}
        </span>
      </div>
    );
  });
  return (
    <span className="weekly-hours-list">
      {hoursList}
    </span>
  );
}
