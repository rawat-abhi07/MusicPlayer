const songList = document.getElementById("songList");
const genreSelect = document.getElementById("genreSelect");

showMusicFiles("all");
function musicSelect(song) {
  console.log("music select", song);
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
              songBox.style.backgroundColor = "#f0f0f0"; // Background color
              songBox.style.padding = "10px"; // Padding for spacing
              songBox.style.marginBottom = "5px"; // Margin bottom for spacing

              // Append the song box to the song list
              songList.appendChild(songBox);
              songBox.addEventListener("click", () => musicSelect(song));
            });
          }
        }
      }
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));
}

