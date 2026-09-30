// =====================================
// STORAGE
// =====================================


// Save theme
export function saveTheme(theme) {

    localStorage.setItem(
        "smartdesk-theme",
        theme
    );

}


// Get saved theme
export function getSavedTheme() {

    return localStorage.getItem(
        "smartdesk-theme"
    );

}