

document.addEventListener('DOMContentLoaded', function () {
    // --- Sidebar Logic ---
    const profileButton = document.getElementById('profile-button');
    const sidebar = document.getElementById('profile-sidebar');
    const closeButton = document.getElementById('close-sidebar-button');
    const overlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    profileButton.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // --- File Upload Logic ---
    const uploadArea = document.getElementById('upload-area');
    const videoInput = document.getElementById('video-input');
    const fileInfo = document.getElementById('file-info');
    const fileName = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file');
    const uploadForm = document.getElementById('upload-form');
    const submitBtn = document.getElementById('submit-btn');

    let selectedFile = null;

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    uploadArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
    videoInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleFiles(files) {
        if (files.length > 0) {
            selectedFile = files[0];
            // Update the file input element's files property for form submission
            videoInput.files = files;
            fileName.textContent = selectedFile.name;
            fileInfo.classList.remove('hidden');
            uploadArea.classList.add('hidden');
            submitBtn.disabled = false;
        }
    }

    removeFileBtn.addEventListener('click', () => {
        selectedFile = null;
        videoInput.value = ''; // Reset file input
        fileInfo.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        submitBtn.disabled = true;
    });

    // This listener just updates the UI before the form submits traditionally.
    uploadForm.addEventListener('submit', function (e) {
        if (!selectedFile) {
            e.preventDefault(); // Prevent submission if no file is selected
            alert('Please select a video file before submitting.');
        } else {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin w-6 h-6 mr-3"></i> Uploading & Processing...';
        }
    });
});
