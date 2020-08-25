const { format_date, format_time } = require('../utils/helpers');

// test('format_date() returns a date string', () => {
// 	const date = new Date('2020-08-20 16:12:03');

// 	expect(format_date(date)).toBe('Sunday, 8/20/2020');
// });

test('format_time() returns a time string', () => {
	const time = '15:10:00';
	const time2 = '7:15:00';

	expect(format_time(time)).toBe('3:10 PM');
	expect(format_time(time2)).toBe('7:15 AM');
});
