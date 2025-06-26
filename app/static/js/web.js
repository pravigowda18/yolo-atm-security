
document.addEventListener('DOMContentLoaded', function () {
    const profileButton = document.getElementById('profile-button');
    const sidebar = document.getElementById('profile-sidebar');
    const closeButton = document.getElementById('close-sidebar-button');
    const overlay = document.getElementById('sidebar-overlay');
    const container = document.getElementById('video-container');
    const start = document.getElementById('start-btn')
    const stop = document.getElementById('stop-btn')
    const Placeholder = document.getElementById('video-placeholder')
    const livedot = document.getElementById('live-dot')
    const vid = document.getElementById('vid')
    const pr = document.getElementById('prmn')


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

    function startStream() {
        Placeholder.classList.add('hidden');
        stop.disabled = false;
        livedot.classList.remove('hidden');
        fetch('/start_stream', { method: 'POST' })
            .then(() => {
                if (!document.getElementById('video-feed')) {
                    const img = document.createElement('img');
                    img.src = "/video_feed";
                    img.id = "video-feed";
                    img.width = 640;
                    img.height = 480;
                    container.appendChild(img);
                }
            });
    }

    function stopStream() {
        Placeholder.classList.remove('hidden')
        fetch('/stop_stream', { method: 'POST' })
            .then(() => {
                const img = document.getElementById('video-feed');
                if (img) {
                    img.remove();
                }
            });
        livedot.classList.add('hidden');
        stop.disabled = Ture;

    }


    function fetchClass() {
        fetch('/get_class')
            .then(response => response.json())
            .then(data => {
                if (!data || typeof data.class_id !== 'number') return;

                // Remove both classes before adding the new one
                vid.classList.remove('bg-red-600', 'bg-green-600');

                if (data.class_id === 1 || data.class_id === 2) {
                    vid.classList.add('bg-red-600');
                    prmn.textContent = "premission not allowed"
                } else {
                    vid.classList.add('bg-green-600');
                    prmn.textContent = "premission allowed"
                }
            })
            .catch(error => {
                console.error('Error fetching class:', error);
            });
    }


    setInterval(fetchClass, 500); // Poll every 1 second



    // Event listeners
    profileButton.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    start.addEventListener('click', startStream)
    stop.addEventListener('click', stopStream)


    // Close sidebar with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !sidebar.classList.contains('translate-x-full')) {
            closeSidebar();
        }
    });

});
