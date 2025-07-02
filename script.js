document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const heroBtn = document.querySelector('.hero__button');
    const floatingBtn = document.getElementById('floatingContactBtn');
    const closeBtn = document.querySelector('.modal__close');
    const form = document.querySelector('.modal__form');
    const heroSection = document.querySelector('.hero');
    const featuresSection = document.querySelector('.features');

    // Общая функция для открытия модального окна
    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Общая функция для закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Обработчики для основной кнопки
    heroBtn.addEventListener('click', openModal);

    // Обработчики для плавающей кнопки
    floatingBtn.addEventListener('click', openModal);

    // Обработчики закрытия
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        fetch('https://formspree.io/f/xvgrygay', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                form.reset();
                closeModal();
            } else {
                throw new Error('Ошибка отправки формы');
            }
        })
        .catch(error => {
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
            console.error(error);
        });
    });

    // Логика появления/исчезновения плавающей кнопки
    function handleScroll() {
        const heroRect = heroSection.getBoundingClientRect();
        const featuresRect = featuresSection.getBoundingClientRect();
        
        
        if (heroRect.bottom < 0) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    }

    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
});