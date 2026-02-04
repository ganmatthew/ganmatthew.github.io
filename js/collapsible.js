window.addEventListener("load", () => {
    const arrows = document.querySelectorAll('span.collapse-arrow');
    
    arrows.forEach(arrow => {
        const section = arrow.closest('section');
        const div = arrow.closest('div');

        let collapsible;

        if (section) {
            collapsible = section.querySelector('.collapsible-section');
        } else if (div) {
            collapsible = div.querySelector('.collapsible-section');
        } else {
            return;
        }

        initialize(collapsible, arrow);
        
        arrow.addEventListener('click', () => {
            toggleState(collapsible, arrow);
        });
    });
    
    function initialize(element, arrow) {
        // Ensure smooth transitions are set first
        element.style.overflow = 'hidden';
        element.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';

        // Default behavior: expanded unless the element has the "collapsed" class
        const isCollapsed = element.classList.contains('collapsed');

        if (isCollapsed) {
            element.style.maxHeight = '0px';
            element.style.opacity = '0';
            if (arrow) {
                arrow.classList.add('closed');
                arrow.setAttribute('aria-expanded', 'false');
            }
        } else {
            element.style.maxHeight = element.scrollHeight + 'px';
            element.style.opacity = '1';
            if (arrow) {
                arrow.classList.remove('closed');
                arrow.setAttribute('aria-expanded', 'true');
            }
        }
    }
    
    function toggleState(element, arrow) {
        const isExpanded = element.style.maxHeight !== '0px';
        if (isExpanded) {
            element.style.maxHeight = '0px';
            element.style.opacity = '0';
            if (arrow) {
                arrow.classList.add('closed');
                arrow.setAttribute('aria-expanded', 'false');
            }
        } else {
            // Ensure that scrollHeight is recalculated in case the content changes
            const height = element.scrollHeight + 'px';
            element.style.maxHeight = height;
            element.style.opacity = '1';
            if (arrow) {
                arrow.classList.remove('closed');
                arrow.setAttribute('aria-expanded', 'true');
            }
        }
    }
});
