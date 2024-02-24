// JavaScript for dark mode toggle
const darkModeToggle = document.getElementById('dark-toggle');
const body = document.body;
const dialogueDarkMode = document.getElementById('darkModeDia');
const cookiePopup = document.getElementById('cookiePopup');

if (prefersDarkMode()) {
    body.classList.add('dark'); // Apply dark mode styles
    darkModeToggle.classList.add('dark'); // Apply dark mode styles
    dialogueDarkMode.classList.add('dark'); // Apply dark mode styles
    cookiePopup.classList.add('dark'); // Apply dark mode styles
}

if (!hasDialogBeenShown() && !prefersDarkMode()) {
    showDialog();
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

// Function to check if the dialog has been shown before
function hasDialogBeenShown() {
    return !!getCookie('dialogShown');
}

// Function to show the dialog box
function showDialog() {
    dialogueDarkMode.showModal(); // Show the dialog box
    setTimeout(() => {
        dialogueDarkMode.classList.add('visible');
    }, 50);
    body.classList.add('inBackground');
    if (checkCookiesAccepted()) {
        setCookie('dialogShown', true, 30);
    } else {
        console.log('Cookies are not enabled');
    }
    checkCloseClick();
}

// Function to handle the user's response to the dialog box
function handleDialogResponse(response) {
    if (response === 'yes') {
        body.classList.toggle('dark'); // Apply dark mode styles
        darkModeToggle.classList.toggle('dark'); // Apply dark mode styles
        dialogueDarkMode.classList.toggle('dark'); // Apply dark mode styles
        cookiePopup.classList.toggle('dark'); // Apply dark mode styles
        // Store the dark mode setting in a cookie if the user has cookies enabled
        if (checkCookiesAccepted()) {
            setCookie('darkMode', body.classList.contains('dark'), 30);
        } else {
            console.log('Cookies are not enabled');
        }
    }
    // Close the dialog box
    closeDialog();
}

// Function to close the dialog box
function closeDialog() {
    dialogueDarkMode.classList.remove('visible');
    setTimeout(() => {
        dialogueDarkMode.close();
        body.classList.remove('inBackground')// Close the dialog box
    }, 1000); // Delay equal to the transition duration
}

document.getElementById('accept').addEventListener('click', function() {
    document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    document.getElementById('cookiePopup').classList.remove('show'); /* Hide the popup */
});

document.getElementById('decline').addEventListener('click', function() {
    document.getElementById('cookiePopup').classList.remove('show'); /* Hide the popup */
});

window.onload = function() {
    if (getCookie('cookiesAccepted')) {
        document.getElementById('cookiePopup').classList.remove('show');
    } else {
        document.getElementById('cookiePopup').classList.add('show'); /* Show the popup */
    }
};

function checkCookiesAccepted() {
    return getCookie('cookiesAccepted') === 'true';
}

function test() {
    document.getElementById('cookiePopup').classList.add('show');
}

function checkCloseClick() {
    document.addEventListener('click', function handler(event) {
        const isClickInside = dialogueDarkMode.contains(event.target);
        const isDarkToggle = darkModeToggle.contains(event.target);
        const isOpen = dialogueDarkMode.classList.contains('visible');

        if (isOpen && !isClickInside && !isDarkToggle) {
            closeDialog();
            document.removeEventListener('click', handler);
        }
    })
}