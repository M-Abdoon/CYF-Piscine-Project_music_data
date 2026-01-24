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
	const answer3El = document.getElementById("answer-2");
	const answer4El = document.getElementById("answer-2");
	const answer5El = document.getElementById("answer-2");
	const answer6El = document.getElementById("answer-2");
	const answer7El = document.getElementById("answer-2");

	const usersIds = getUserIDs();

	usersIds.forEach(id => {
		userSelectEl.innerHTML += `<option value=${id}>User Number ${id}</option>`;
	});

	userSelectEl.addEventListener("change", () => {
		const selectedUser = userSelectEl.value;

		answer1El.textContent = getMostListenedSong(selectedUser);
		answer2El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		answer3El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		answer4El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		answer5El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		answer6El.textContent = getSong(getMostListenedSong(selectedUser)).title;
		answer7El.textContent = getSong(getMostListenedSong(selectedUser)).title;


	});
}

function getMostListenedSong(userId) {
	const allUserSongs = getListenEvents(userId);
	let counts = [];

	allUserSongs.forEach(song => {
		counts[song.song_id] = (counts[song.song_id] || 0) + 1;
	})

	let max = 0;
	let maxSong = null;

	for ( const id in counts) {
		if(counts[id] > max) {
			max = counts[id];
			maxSong = id;
		}
	}
	return maxSong;
}

window.onload = setup ();