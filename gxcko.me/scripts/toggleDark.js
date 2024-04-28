function forceDarkMode() {
    body.classList.add('dark'); // Apply dark mode styles
    darkModeToggle.classList.add('dark'); // Apply dark mode styles
    dialogueDarkMode.classList.add('dark'); // Apply dark mode styles
    cookiePopup.classList.add('dark'); // Apply dark mode styles
    link.classList.add('dark');
    bottomBanner.classList.add('dark');
    Array.from(bubble).forEach(element => {
        element.classList.add('dark');
    });
}

function toggleDarkMode() {
    body.classList.toggle('dark'); // Apply dark mode styles
    darkModeToggle.classList.toggle('dark'); // Apply dark mode styles
    dialogueDarkMode.classList.toggle('dark'); // Apply dark mode styles
    cookiePopup.classList.toggle('dark'); // Apply dark mode styles
    link.classList.toggle('dark')
    bottomBanner.classList.toggle('dark');
    Array.from(bubble).forEach(element => {
        element.classList.toggle('dark');
    });
}