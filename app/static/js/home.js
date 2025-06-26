
document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.getElementById('profile-button');
    const sidebar = document.getElementById('profile-sidebar');
    const closeButton = document.getElementById('close-sidebar-button');
    const overlay = document.getElementById('sidebar-overlay');

    // Function to open the sidebar
    function openSidebar() {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Event listeners
    profileButton.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !sidebar.classList.contains('translate-x-full')) {
            closeSidebar();
        }
    });
});
