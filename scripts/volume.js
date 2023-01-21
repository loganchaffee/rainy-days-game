document.getElementById('volumeOn').style.display = 'none';

function toggleVolume() {
    const volumeOn = document.getElementById('volumeOn');
    const volumeOff = document.getElementById('volumeOff');
    const audioElements = [
        document.getElementById('music'),
        document.getElementById('shoot'),
        document.getElementById('gameover'),
        document.getElementById('punch'),
        document.getElementById('jump'),
        document.getElementById('music'),
    ];

    if (volumeOn.style.display === 'none' || volumeOn.style.display === '') {
        // turn on
        if (music.paused) {
            music.play();
        }

        volumeOn.style.display = 'inline';
        volumeOff.style.display = 'none';

        audioElements.forEach((el) => {
            el.muted = false;
        });
    } else {
        // turn off
        volumeOff.style.display = 'inline';
        volumeOn.style.display = 'none';

        audioElements.forEach((el) => {
            el.muted = true;
        });
    }
}

document.getElementById('volumeOn').addEventListener('click', toggleVolume);
document.getElementById('volumeOff').addEventListener('click', toggleVolume);
