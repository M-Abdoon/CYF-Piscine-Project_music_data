// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getListenEvents, getUserIDs , getSong} from "./data.mjs";

function setup () {
	const userSelectEl = document.getElementById("UserSelect");
	const usersIds = getUserIDs();

	//console.log(getUserIDs);
	//console.log(getSong("song-1"));
	//console.log(getListenEvents(1));

	usersIds.forEach(id => {
		userSelectEl.innerHTML += `<option value=${id}>User Number ${id}</option>`;
	});

	userSelectEl.addEventListener("change", () => {
		const selectedUser = userSelectEl.value;

		// user's most often listened to song
		console.log(userMostListen(selectedUser));


	});
}

function userMostListen(userId) {
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
	console.log(counts);
	return maxSong;
}

window.onload = setup ();