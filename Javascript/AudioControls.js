/**
 AudioControls.js
 description:    Initializes audios and link control from settings page.
 authors:        Kabir Cahill, Kent Huang, Luke Lee, Eric Lin, Roger Zhang
 Referenced from https://www.developphp.com/video/JavaScript/Audio-Seek-and-Volume-Range-Slider-Tutorial
 **/

/**
 * Initializes the sound audio and background music.
 */
function initAudio() {
    soundEffect = new Audio();

    //bgMusic = document.getElementById('bgmusic')
    bgMusic = new Audio();
    bgMusic.src = "bgm/bg.mp3";
    bgMusic.loop = true;
    bgMusic.play();

	//set range input reference
	soundSlider = document.getElementById('settingSounds');
	musicSlider = document.getElementById('settingMusic');

    //set button reference in gameplay
	soundMuteBtn = document.getElementById('soundMuteBtn');
	musicMuteBtn = document.getElementById('musicMuteBtn');

    //add event connecting range control to music
	soundSlider.addEventListener("mousemove", setSoundVolume);
    musicSlider.addEventListener("mousemove", setBgmVolume);

    //add event to mute buttons in gameplay
    soundMuteBtn.addEventListener("click", soundMute);
    musicMuteBtn.addEventListener("click", musicMute);
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


/**
 * Turn mute on and off for sound effect during gameplay.
 */
function soundMute() {
    if (soundEffect.muted) {
        soundEffect.muted = false;
        soundMuteBtn.style.background = "url(images/speaker_on.png)"
    } else {
        soundEffect.muted = true;
        soundMuteBtn.style.background = "url(images/speaker_off.png)"
    }
}

/**
 * Turn mute on and off for background music during gameplay.
 */
function musicMute() {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        musicMuteBtn.style.background = "url(images/speaker_on.png)"
    } else {
        bgMusic.muted = true;
        musicMuteBtn.style.background = "url(images/speaker_off.png)"
    }
}