document.addEventListener('DOMContentLoaded', function () {
    // --- Subject Filtering Logic ---
    const classSelect = document.getElementById('class_id');
    const subjectSelect = document.getElementById('subject_id');

    if (classSelect && subjectSelect) {

        function filterSubjects() {
            const selectedClassId = classSelect.value;
            const subjectOptions = subjectSelect.querySelectorAll('option');

            let currentSelectedValid = false;

            subjectOptions.forEach(option => {
                const subjectClassId = option.getAttribute('data-class-id');

                // Always show the placeholder option
                if (option.value === "") {
                    option.style.display = "";
                    option.disabled = false;
                    return;
                }

                // Only show subjects if a class is selected AND the ID matches
                if (selectedClassId !== "" && subjectClassId === selectedClassId) {
                    option.style.display = "";
                    option.disabled = false;
                    if (option.selected) currentSelectedValid = true;
                } else {
                    option.style.display = "none";
                    option.disabled = true;
                }
            });

            // If the currently selected subject is now hidden (or if no class selected), reset selection
            if (!currentSelectedValid && subjectSelect.value !== "") {
                subjectSelect.value = "";
            }
        }

        // Run on load to set initial state
        filterSubjects();

        // Run on change
        classSelect.addEventListener('change', filterSubjects);
    }

    // --- Dark Mode Logic ---
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Only proceed if the toggle button exists (it might not be on every page if base.html isn't updated yet, but we will update it)
    if (toggleButton) {
        const icon = toggleButton.querySelector('i');

        // Check for saved user preference, if any, on load
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);

        toggleButton.addEventListener('click', () => {
            // Add rotation animation
            icon.classList.add('rotate');
            setTimeout(() => {
                icon.classList.remove('rotate');
            }, 500); // Matches CSS animation duration

            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });

        function updateIcon(theme) {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        }
    }
});
