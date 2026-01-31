// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getListenEvents, getUserIDs , getSong} from "./data.mjs";

function setup () {
	const userSelectEl = document.getElementById("UserSelect");
	const answer1El = document.getElementById("answer-1");
	const answer2El = document.getElementById("answer-2");
	const answer3El = document.getElementById("answer-3");
	const answer4El = document.getElementById("answer-4");
	const answer5El = document.getElementById("answer-5");
	const answer6El = document.getElementById("answer-6");
	const answer7El = document.getElementById("answer-7");

	const usersIds = getUserIDs();

	usersIds.forEach(id => {
		userSelectEl.innerHTML += `<option value=${id}>User Number ${id}</option>`;
	});

	userSelectEl.addEventListener("change", () => {
		const selectedUser = userSelectEl.value;

		answer1El.textContent = getSong(getMostListenedSong(selectedUser)).artist;
		answer1El.textContent += ` - ${getSong(getMostListenedSong(selectedUser)).title}`;

		answer2El.textContent = getSong(getMostListenedSong(selectedUser)).artist;
		answer2El.textContent = `${getSong(getMostListenedSong(selectedUser)).title}`;
		
		answer3El.textContent = getSong(getMostListenedSong(selectedUser, "Friday", "17-04")).artist;
		answer3El.textContent += ` - ${getSong(getMostListenedSong(selectedUser, "Friday", "17-04")).title}`;
	
		// answer4El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		// answer5El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		// answer6El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		// answer7El.textContent = getSong(getMostListenedSong(selectedUser)).title;

		
		//console.log(timestampToDayName("2024-08-01T00:20:07"));
		//console.log(new Date("2024-08-01T00:21:07").getHours());
		//console.log(getListenEvents(1));

	});
}


function timestampToDayName(timestamp) {
	return new Date(timestamp).toLocaleDateString("en-UK", { weekday: "long"});
}

function timestampToHour(timestamp) {
	return new Date(timestamp).getHours();
}

function nextDay(currentDay) {
	const days = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"];
	return days[(days.indexOf(currentDay) + 1) % days.length];
}
function getMostListenedSong(userId, dayWeek, hours) {
	let allUserSongs = getListenEvents(userId);
	let counts = {};
	let i = 0;

	if (dayWeek && hours) {
	hours = hours.split("-").map(Number);

	allUserSongs = allUserSongs.filter(song => {
		const date = new Date(song.timestamp);
		const hour = date.getHours();
		const minute = date.getMinutes();
		const totalMinutes = hour * 60 + minute;
		const start = hours[0] * 60;
		const end = hours[1] * 60;
		const day = timestampToDayName(song.timestamp);

		return (day === dayWeek && totalMinutes >= start) ||
		       (day === nextDay(dayWeek) && totalMinutes < end); 
		});
	}
	
	allUserSongs.forEach(song => {
		counts[song.song_id] = (counts[song.song_id] || 0) + 1;
	})

	let max = 0;
	let maxSong = null;

	console.log(Object.keys(counts));
	console.log(counts);
	for ( const id in counts) {
		if(counts[id] > max) {
			max = counts[id];
			maxSong = id;
		}
	}
	
	console.log(maxSong)
	return maxSong;
}

window.onload = setup;