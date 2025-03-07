document.addEventListener('DOMContentLoaded', function() {
    const templatesGrid = document.getElementById('templatesGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
    const previewFrame = document.getElementById('previewFrame');

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
                    <button class="btn btn-preview" data-preview="${template.preview}">
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
                                const matchesCategory = !selectedCategory || template.category.includes(selectedCategory);
            return matchesSearch && matchesCategory;
        });

        renderTemplates(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterTemplates);
    categoryFilter.addEventListener('change', filterTemplates);

    // Preview handling
    templatesGrid.addEventListener('click', (e) => {
        const previewButton = e.target.closest('.btn-preview');
        if (previewButton) {
            const previewUrl = previewButton.dataset.preview;
            previewFrame.src = previewUrl;
            previewModal.show();
        }
    });

    // Clear iframe when modal is closed
    document.getElementById('previewModal').addEventListener('hidden.bs.modal', () => {
        previewFrame.src = '';
    });

    // Initial render
    renderTemplates(templates);
});
