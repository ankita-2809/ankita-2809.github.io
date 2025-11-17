<script>
    function toggleExpand(element) {
        // Remove active class from all items
        document.querySelectorAll('.timeline-content').forEach(item => {
            if (item !== element) {
                item.classList.remove('active');
            }
        });
        
        // Toggle active class on clicked item
        element.classList.toggle('active');
    }

    // Optional: Scroll animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
</script>