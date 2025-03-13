class SoundManager {
    constructor(_soundNodes) {             
        for (let i = 0; i < _soundNodes.length; i++) {
            this[_soundNodes[i].getAttribute(`name`)] = _soundNodes[i];
        }
    }

    play(_sound, _start = 0, _loop = false) {
        try {
            let audio = this[_sound];
            if (!audio) throw new Error(`Sound "${_sound}" is not found`);

            audio.currentTime = _start;
            audio.loop = _loop;
            
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Autoplay prevented. Waiting for user interaction.");
                    document.addEventListener("click", () => this.play(_sound, _start, _loop), { once: true });
                });
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}

let soundNodes = document.querySelectorAll(`audio`);
if (soundNodes.length > 0) var sounds = new SoundManager(soundNodes);
soundNodes = null;


//document.addEventListener(`click`, ()=>  sounds.play(`splode`,.5))