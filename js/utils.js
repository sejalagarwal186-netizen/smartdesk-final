export function showNotification(message) {
    const toast = document.querySelector("#toast");

    toast.textContent = message;
    toast.hidden = false;

    setTimeout(() => {
        toast.hidden = true;
    }, 3000);
}