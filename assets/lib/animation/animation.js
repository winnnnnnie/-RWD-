/*動態初始設定*/
emergence.init({
        container: window,
        reset: true,
        handheld: true,
        throttle: 250,
        elemCushion: 0.15,
        offsetTop: 0,
        offsetRight: 0,
        offsetBottom: 0,
        offsetLeft: 0,
        callback: function(element, state) {
            if (state === 'visible') {
                console.log('Element is visible.');
            } else if (state === 'reset') {
                console.log('Element is hidden with reset.');
            } else if (state === 'noreset') {
                console.log('Element is hidden with NO reset.');
            }
        }
    });