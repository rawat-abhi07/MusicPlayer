const songList = document.getElementById("songList");
const genreSelect = document.getElementById("genreSelect");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addPlaylist = document.getElementById("addPlaylist");
const songImg = document.getElementById("songImage");
const songName = document.getElementById("songName");
const artistName = document.getElementById("artistName");
const songPlay = document.getElementById("songPlay");
const addPlaylistName = document.getElementById("addButton");
const playlistSong = document.getElementById("playlistSong");
const playlistName = document.getElementById("playList");
const playListAdd = document.getElementById("playlistInput");
const showPlaylistName = document.getElementById("playListNameShow");
const toggleSwitch = document.getElementById("toggleSwitch");
const toggleBall = toggleSwitch.querySelector(".toggle-ball");

let songUpdateData = true;
let songDataArray = [];
let index = 0;
let totalSong = 0;
let firstSong = true;
let lastSong = false;
const body = document.body;

toggleSwitch.addEventListener("click", function () {
  if (toggleBall.style.left === "0px") {
    toggleBall.style.left = "60px";
    body.classList.add("dark-mode");
  } else {
    toggleBall.style.left = "0px";
    body.classList.remove("dark-mode");
  }
});
showMusicFiles("all");
function musicSelect(song) {
  // console.log("music select", song);
  updateSongCard(song);
}
function updateSongCard(song) {
  songImg.src = song.songCoverPhoto;
  songName.innerHTML = song.songName;
  artistName.innerHTML = song.artistName;
  songPlay.src = song.songSrc;
}
genreSelect.addEventListener("change", function () {
  const selectedValue = genreSelect.value;
  console.log("Selected genre:", selectedValue);
  showMusicFiles(selectedValue);
});
function showMusicFiles(genreSelected) {
  while (songList.firstChild) {
    songList.removeChild(songList.firstChild);
  }
  fetch("songData.json")
    .then((response) => response.json())
    .then((songData) => {
      const genres = songData.genres;

      for (const genre in genres) {
        if (genre == genreSelected || genreSelected == "all") {
          if (genres.hasOwnProperty(genre)) {
            const songs = genres[genre];
            songs.forEach((song) => {
              const songBox = document.createElement("div");
              songBox.textContent = song.songName;
              songBox.style.backgroundColor = "#f0f0f0";
              songBox.style.padding = "10px";
              songBox.style.marginBottom = "5px";
              songList.appendChild(songBox);
              if (songUpdateData == true) {
                songUpdateData = false;
                updateSongCard(song);
              }
              songDataArray.push(song);
              totalSong++;
              songBox.addEventListener("click", () => musicSelect(song));
            });
          }
        }
      }
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));
}

nextBtn.addEventListener("click", () => {
  index++;
  if (index > totalSong - 1) {
    index = 0;
    console.log("change color");
  }
  console.log("upddate song call ", index);
  updateSongCard(songDataArray[index]);
});

prevBtn.addEventListener("click", () => {
  if (index != 0) {
    index--;
  }
  if (index == 0) {
    console.log("index is at 0 change it to toal song");
    index = totalSong - 1;
  }
  updateSongCard(songDataArray[index]);
});

addPlaylistName.addEventListener("click", () => {
  console.log(playListAdd.value);
  if (playListAdd.value == undefined) {
    window.alert("Enter Plaaylist Name");
  } else {
    const newListItem = document.createElement("li");
    const playlistNameValue = playListAdd.value;
    newListItem.textContent = playListAdd.value;
    playlistName.appendChild(newListItem);
    playListAdd.value = "";
    newListItem.addEventListener("click", () =>
      showPlaylistSong(playlistNameValue)
    );
  }
});
let playlists = {};
let currentPlaylist = null;

function showPlaylistSong(playListName) {
  while (playlistSong.firstChild) {
    playlistSong.removeChild(playlistSong.firstChild);
  }
  console.log("playlist name ", playListName);
  currentPlaylist = playListName;
  showPlaylistName.innerHTML = "Current Playlist" + ` : ${currentPlaylist}`;
  const songs = getSongsFromPlaylist(currentPlaylist);
  console.log(songs);
  if (songs.length > 0) {
    songs.forEach((song, index) => {
      const songData = document.createElement("li");
      songData.textContent = song;
      playlistSong.append(songData);
    });
  }
}
function getSongsFromPlaylist(playlistNameSearch) {
  console.log(playlistNameSearch, playlists);
  return playlists[playlistNameSearch] || [];
}
addPlaylist.addEventListener("click", () => {
  console.log("add to playlist ");
  if (currentPlaylist != null) {
    console.log("inside if ");
    addSongToPlaylist(currentPlaylist, songName.innerHTML);
  } else {
    console.log("select playlist ");
  }
});
function addSongToPlaylist(playlistName, songName) {
  if (!playlists[playlistName]) {
    console.log("add to song inside if");
    playlists[playlistName] = [];
  }
  if (!playlists[playlistName].includes(songName)) {
    playlists[playlistName].push(songName);
    console.log(playlists);
    const songData = document.createElement("li");
    const songSelected = songName;
    songData.textContent = songName;
    playlistSong.append(songData);
    songData.addEventListener("click", () =>
      selectSongFromPlaylist(songSelected)
    );
  }
}

function selectSongFromPlaylist(songSelected) {
  console.log("songNameSelected", songSelected);
  for (let i = 0; i < songDataArray.length; i++) {
    if (songSelected == songDataArray[i].songName) {
      console.log("song found ", songDataArray[i]);
      musicSelect(songDataArray[i]);
    }
  }
}
