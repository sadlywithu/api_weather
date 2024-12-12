'use strict'

document.getElementById('themeToggle').addEventListener('click', function() {
    let currenTheme = document.body.className;

    if (currenTheme === 'light-theme') {
        document.body.className = 'dark-theme'
    } else {
        document.body.className = 'light-theme';
    }
})