import moment from 'moment';

export const DATETIME_VALUE_FROM_DB = 'YYYY-MM-DDTHH:mm:ss';
export const DATE_VALUE_FROM_DB = 'YYYY-MM-DD';


export default class DateFormatter {

    static createMomentDate(dateStr, format='YYYY-MM-DD') {
        return moment(dateStr, format);
    }

    static getLocalDate(dateStr, format=null) {
        const _format = format ? format : DATETIME_VALUE_FROM_DB;

        const dateUTC = moment.utc(dateStr);

        return moment(dateUTC, _format).local();
    }

    static getDateAgo(dateStr, format=null) {
        const localDate = DateFormatter.getLocalDate(dateStr, format);
        return localDate.fromNow();
    }

    static getHumanReadableDate(dateStr, format='LL') {
        const localDate = DateFormatter.getLocalDate(dateStr);
        return localDate.format(format);
    }

    static getDaysLeftFromToday(endsAtStr, format) {
        const currentDate = moment();
        const endsAtLocal = DateFormatter.getLocalDate(endsAtStr, format);
        return endsAtLocal.diff(currentDate, 'days');
    }

    static getDaysLeftAndPercentage(startsAtStr, endsAtStr) {
        const startsAtLocal = DateFormatter.getLocalDate(startsAtStr),
              endsAtLocal = DateFormatter.getLocalDate(endsAtStr);

        const currentDate = moment();
        const accumulatedDays = currentDate.diff(startsAtLocal, 'days');
        const totalDays = endsAtLocal.diff(startsAtLocal, 'days');

        const daysLeft = totalDays - accumulatedDays;
        const percentage = Math.floor((accumulatedDays / totalDays) * 100);

        return {
            'daysLeft': daysLeft,
            'percentage': percentage,
        };
    }
}