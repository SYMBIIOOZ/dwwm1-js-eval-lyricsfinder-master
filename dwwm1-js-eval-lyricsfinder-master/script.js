'use strict'
const formSearchSong = document.getElementById('search-form');


const loader = document.getElementById('loader');
const search = document.getElementById('search');
const result = document.getElementById('result');

const lyrics = document.getElementById('lyrics');
const submit = document.querySelector('input[type="submit"]');




  

loader.style.display = 'none';



formSearchSong.addEventListener("submit", function(event){
  
  event.preventDefault()
  const artistValue = formSearchSong.artist.value;
  const lyricsValue = formSearchSong.title.value;
  result.innerHTML = '';
  if (artistValue === '' &&  lyricsValue === '') {
    lyrics.style.display = 'none';
    result.innerHTML = "Veuillez donner un nom et un titre !"
    loader.style.display = 'none';
  }else {
    submit.disabled = true;
    loader.style.display = 'initial';
    getLyrics(artistValue, lyricsValue);

  }
  //disable input submit 
  
  
});


const SongRequest = 'https://api.lyrics.ovh'


    async function getLyrics(artist, songTitle) {
      const response = await fetch(`${SongRequest}/v1/${artist}/${songTitle}`);
      const data = await response.json();
      
      lyrics.style.display= "none";
      console.log(response.status);
      
      if(response.status === 404) {
        result.innerHTML = "The music you are looking for can't be found...";
        loader.style.display ='none';
      
      }else{

        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
        result.innerHTML = `<h2>${artist} - ${songTitle}</h2>
        <span>${lyrics}</span>`;
      }
      loader.style.display ='none';
      submit.disabled = false;

  
  
  
}

