/**
 AudioControls.js
 description:    Initializes audios and link control from settings page.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 **/

 /**
  * Initializes the sound audio and background music.
  */
function initAudio() {
	soundEffect = new Audio();

	bgMusic = document.getElementById('bgmusic')
	//bgMusic = new Audio();
	//bgMusic.src = "bgm/bg.mp3";
	bgMusic.loop = true;
	bgMusic.play();

	//set range input reference
	soundSlider = document.getElementById('settingSounds');
	musicSlider = document.getElementById('settingMusic');

	//add event connecting range control to music
	soundSlider.addEventListener("mousemove", setSoundVolume);
	musicSlider.addEventListener("mousemove", setBgmVolume);

}

/**
 * Controls the sound effect volume
 */
function setSoundVolume() {
	soundEffect.volume = soundSlider.value / 100;
}

/**
 * Controls the background music volume
 */
function setBgmVolume() {
	bgMusic.volume = musicSlider.value / 100;
}