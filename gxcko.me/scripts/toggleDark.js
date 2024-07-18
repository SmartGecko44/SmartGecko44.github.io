function forceDarkMode() {
    body.classList.add('dark'); // Apply dark mode styles
    link.classList.add('dark');
    Array.from(bubble).forEach(element => {
        element.classList.add('dark');
    });
}

function toggleDarkMode() {
    link.classList.toggle('dark')
    Array.from(bubble).forEach(element => {
        element.classList.toggle('dark');
    });
}