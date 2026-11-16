document.addEventListener('DOMContentLoaded', () => {

    // 1. النافذة المنبثقة للكتب
    const bookModal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModalBtn = document.getElementById('close-modal');
    const openModalButtons = document.querySelectorAll('.open-popup-btn');

    if (openModalButtons.length > 0 && bookModal) {
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const title = button.getAttribute('data-title');
                const desc = button.getAttribute('data-desc');
                
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;
                bookModal.style.setProperty('display', 'flex', 'important');
            });
        });
    }

    if (closeModalBtn && bookModal) {
        closeModalBtn.addEventListener('click', () => {
            bookModal.style.setProperty('display', 'none', 'important');
        });
    }

    // 2. معرض الصور المتحرك
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active-slide');
                if (i === index) {
                    slide.classList.add('active-slide');
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }
    }

    // تصفية وفلترة الكتب
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.books-grid .book-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active-filter'));
                btn.classList.add('active-filter');

                const category = btn.getAttribute('data-category');

                bookCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // التحميل الخفي للصور
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.src;
                    observer.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    }

    // إغلاق نافذة الكتب المنبثقة عند النقر في الخارج
    window.addEventListener('click', (e) => {
        if (bookModal && e.target === bookModal) {
            bookModal.style.setProperty('display', 'none', 'important');
        }
    });

});