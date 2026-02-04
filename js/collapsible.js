window.addEventListener("load", () => {
    const arrows = document.querySelectorAll('span.collapse-arrow');
    
    arrows.forEach(arrow => {
        const obj = arrow.closest('section') || arrow.closest('div');
        const collapsible = obj.querySelector('.collapsible-section');
        
        initialize(collapsible);
        
        arrow.addEventListener('click', () => {
            toggleState(collapsible, arrow);
        });
    });
    
    function initialize(element) {
        element.style.overflow = 'hidden';
        element.style.opacity = '1';
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
    }
    
    function toggleState(element, arrow) {
        const isExpanded = element.style.maxHeight !== '0px';
        if (isExpanded) {
            element.style.maxHeight = '0px';
            element.style.opacity = '0';
            arrow.classList.add('closed');
        } else {
            // Ensure that scrollHeight is recalculated in case the content changes
            const height = element.scrollHeight + 'px';
            element.style.maxHeight = height;
            element.style.opacity = '1';
            arrow.classList.remove('closed');
        }
    }
});
