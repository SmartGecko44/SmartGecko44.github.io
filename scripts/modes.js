// JavaScript for dark mode toggle
const darkModeToggle = document.getElementById('dark-toggle');
const body = document.body;
const dialogueDarkMode = document.getElementById('darkModeDia');

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// Function to check if dark mode is preferred by the user
function prefersDarkMode() {
    // Check if dark mode setting is stored in a cookie
    if (getCookie('darkMode') !== null) {
        return getCookie('darkMode') === 'true';
    } else {
        // If not, check the user's system preference
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
}

// Function to show the dialog box
function showDialog() {
    dialogueDarkMode.showModal(); // Show the dialog box
    setCookie('dialogShown', true, 30);
}

// Function to close the dialog box
function closeDialog() {
    dialogueDarkMode.close(); // Close the dialog box
}

// Function to handle the user's response to the dialog box
function handleDialogResponse(response) {
    if (response === 'yes') {
        body.classList.toggle('dark'); // Apply dark mode styles
        darkModeToggle.classList.toggle('dark'); // Apply dark mode styles
        dialogueDarkMode.classList.toggle('dark'); // Apply dark mode styles
        // Store the dark mode setting in a cookie
        setCookie('darkMode', body.classList.contains('dark'), 30);
    }
    // Close the dialog box
    closeDialog();
}

// Function to check if the dialog has been shown before
function hasDialogBeenShown() {
    return !!getCookie('dialogShown');
}

darkModeToggle.addEventListener('click', () => showDialog())

// Event listener for the dialog buttons
dialogueDarkMode.addEventListener('click', (event) => {
    if (event.target.id === 'confirm') {
        handleDialogResponse('yes'); // User clicked "Yes"
    } else if (event.target.id === 'cancel') {
        closeDialog(); // User clicked "No"
    }
});

if (prefersDarkMode()) {
    body.classList.add('dark'); // Apply dark mode styles
    darkModeToggle.classList.add('dark'); // Apply dark mode styles
    dialogueDarkMode.classList.add('dark'); // Apply dark mode styles
}

if (!hasDialogBeenShown() && !prefersDarkMode()) {
    showDialog();
}