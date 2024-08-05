document.addEventListener('DOMContentLoaded', function() {
    const clockElement = document.getElementById('clock');
    const settingsToggle = document.getElementById('settings-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const settingsPopup = document.getElementById('settings-popup');
    const secondsToggle = document.getElementById('seconds-toggle');
    const hourToggle = document.getElementById('hour-toggle');
    const orientationToggle = document.getElementById('orientation-toggle');
    
    let darkTheme = true;
    let showSeconds = false;
    let showAMPM = false;
    let isRotated = false;
    let fadeTimeout;

    function resetFade() {
        settingsToggle.classList.remove('fade-out');
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
            settingsToggle.classList.add('fade-out');
        }, 5000); // 5 seconds
    }

    settingsToggle.addEventListener('click', function() {
        resetFade(); // Reset the fade-out timer on click
    });

    // Initialize the fade-out timer
    resetFade();

    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        let formattedHours = hours;
        let ampm = '';

        if (showAMPM) {
            ampm = hours >= 12 ? ' PM' : ' AM';
        } else {
            ampm = '';
        }
        
        formattedHours = hours % 12 || 12;

        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        let timeString = `${formattedHours}:${formattedMinutes}`;
        if (showSeconds) {
            timeString += `:${formattedSeconds}`;
        }

        clockElement.textContent = timeString + ampm;
    }

    function toggleSettings() {
        document.body.classList.toggle('show-settings');
        document.getElementById('settings-toggle').classList.toggle('chevron-rotate')
    }

    function toggleSeconds() {
        showSeconds = !showSeconds;
        updateClock();
    }

    function toggleHourFormat() {
        showAMPM = !showAMPM;
        updateClock();
    }

    function toggleTheme() {
        if (darkTheme) {
            document.body.style.setProperty('--bg-color', '#fff');
            document.body.style.setProperty('--txt-color', '#000');
            document.body.style.setProperty('--popup-bg-color', '#eee');
        } else {
            document.body.style.setProperty('--bg-color', '#000');
            document.body.style.setProperty('--txt-color', '#fff');
            document.body.style.setProperty('--popup-bg-color', '#111');
        }

        darkTheme = !darkTheme;
    }

    function toggleOrientation() {
        isRotated = !isRotated;
        document.getElementById('clock').classList.toggle('text-rotate');
    }

    settingsToggle.addEventListener('click', toggleSettings);
    secondsToggle.addEventListener('click', toggleSeconds);
    hourToggle.addEventListener('click', toggleHourFormat);
    themeToggle.addEventListener('click', toggleTheme);
    orientationToggle.addEventListener('click', toggleOrientation);

    setInterval(updateClock, 1000);
    updateClock();
});