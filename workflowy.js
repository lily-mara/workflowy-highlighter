const style = document.createElement('style');
style.type = 'text/css';

document.getElementsByTagName('head')[0].appendChild(style);

window.addEventListener('focus', updateStyle, false);

function updateStyle(color) {
	style.innerText = `
	${ selector() } {
		background-color: red;
		color: white;
	}`;
}

function pad(n) {
	return n < 10 ? '0' + n : n
}

function dateString() {
	const today = new Date();
	return `${ today.getFullYear() }-${ pad(today.getMonth() + 1) }-${ pad(today.getDate()) }`;
}

function selector() {
	return `.contentTag[title*="d-${ dateString() }"]`;
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

updateStyleAtMidnight();
