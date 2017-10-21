let style;
window.focus(updateStyle);

function updateStyle() {
	const dates = Array.from($('.contentTag'))
		.map(x => x.textContent)
		.filter(x => x.match(/^#d-\d{4}-\d{2}-\d{2}$/))
		.map(x => x.substring(3))
		.filter((v, i, a) => a.indexOf(v) === i)
		.map(x => new Date(x));

	style.innerText = `
	${ todaySelector() } {
		background-color: blue;
		color: white;
	}

	${ pastDueSelector(dates) } {
		background-color: red;
		color: white;
	}`;
}

function pad(n) {
	return n < 10 ? '0' + n : n
}

function pastDueSelector(dates) {
	const now = new Date();
	const nowString = dateString(now);
	const notTodayDates = dates
		.filter(x => x < now)
		.map(dateString)
		.filter(x => x != nowString)
		.map(selector)
		.join();

	return notTodayDates;
}

function dateString(date) {
	return `${ date.getUTCFullYear() }-${ pad(date.getUTCMonth() + 1) }-${ pad(date.getUTCDate()) }`;
}

function todaySelector() {
	const today = new Date();
	return selector(dateString(today))
}

function selector(date) {
	return `.contentTag[title*="d-${ date }"]`;
}

function midnightTimeout(fn) {
    const now = new Date();
    const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
		0,
		0
    );
    const msToMidnight = night.getTime() - now.getTime();
	console.log(msToMidnight);

    return setTimeout(fn, msToMidnight);
}

function updateStyleAtMidnight() {
	updateStyle();
	midnightTimeout(() => {
		updateStyleAtMidnight();
	});
}

$(document).ready(() => {
	style = document.createElement('style');
	style.type = 'text/css';

	document.getElementsByTagName('head')[0].appendChild(style);
	updateStyleAtMidnight()
});
