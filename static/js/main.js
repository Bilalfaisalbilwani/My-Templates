document.addEventListener('DOMContentLoaded', function() {
    const templatesGrid = document.getElementById('templatesGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const modal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    const closeModal = document.querySelector('.close-modal');

    // Render templates
    function renderTemplates(templatesArray) {
        templatesGrid.innerHTML = '';
        templatesArray.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.innerHTML = `
                <img src="${template.image}" alt="${template.title}" class="template-image">
                <div class="template-info">
                    <h3 class="template-title">${template.title}</h3>
                    <span class="template-category">${template.category}</span>
                    <p>${template.description}</p>
                    <button class="preview-button" data-preview="${template.preview}">
                        <i class="fas fa-eye"></i> Live Preview
                    </button>
                </div>
            `;
            templatesGrid.appendChild(templateCard);
        });
    }

    // Filter templates
    function filterTemplates() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();

        const filtered = templates.filter(template => {
            const matchesSearch = template.title.toLowerCase().includes(searchTerm) ||
                                template.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || template.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderTemplates(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterTemplates);
    categoryFilter.addEventListener('change', filterTemplates);

    // Modal handling
    templatesGrid.addEventListener('click', (e) => {
        if (e.target.closest('.preview-button')) {
            const previewUrl = e.target.closest('.preview-button').dataset.preview;
            previewFrame.src = previewUrl;
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        previewFrame.src = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            previewFrame.src = '';
        }
    });

    // Initial render
    renderTemplates(templates);
});
