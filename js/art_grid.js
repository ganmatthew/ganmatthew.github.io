import { GridData } from "./art_data.js"

function createGridItem(data) {
    const { title, subtitle, project, year, desc, imgSrc } = data;

    const gridItem = document.createElement('div');
    gridItem.className = 'grid-item';

    Object.assign(gridItem.dataset, { title, subtitle, project, year, desc })

    const image = document.createElement('img');
    image.src = imgSrc;
    image.alt = title; // TODO: Using titles for now. Add actual alt text when i have time
    gridItem.appendChild(image);
    
    return gridItem;
}

function getGridObjects(ids) {
    return ids.map(id => ({
        id,
        grid: document.getElementById(id)
    }));
}

document.addEventListener("DOMContentLoaded", (e) => {
    // Create grid items from grid data
    const gridNames = ['art-grid-logos', 'art-grid-thumbnails', 'art-grid-pubs']

    const gridObjects = getGridObjects(gridNames);

    gridObjects.forEach(({id, grid}) => {
        if (grid && GridData[id]) {
            GridData[id].forEach(itemData => {
                const gridItem = createGridItem(itemData);
                grid.appendChild(gridItem);
            });
        }
    })

    // Use masonry for image grids
    let msnry;
    let masonryOptions = {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        resize: true,
        gutter: 8,
        stagger: 30
    };
    
    document.querySelectorAll('.grid').forEach(function(gridElement) {
        imagesLoaded(gridElement, function() {
        msnry = new Masonry(gridElement, masonryOptions);
        });
    });

    // Image modal functionality
    const modal = document.getElementsByClassName('image-modal')[0];
    const modalImage = modal.querySelector('img');
    // Modal elements
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalProject = document.getElementById('modal-project');
    const modalYear = document.getElementById('modal-year');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close')
    // Toggle scrolling when modal is open
    document.querySelectorAll('.grid-item').forEach(function(gridItem) {
        gridItem.addEventListener('contextmenu', (e) => e.preventDefault());
        gridItem.addEventListener('dragstart', (e) => e.preventDefault());
        gridItem.addEventListener('click', (event) => {
        const gridImage = gridItem.querySelector('img');    
        // Modal data attributes
        const { title, subtitle, project, year, desc } = gridItem.dataset;
        // Use data attributes if they exist
        modalTitle.innerHTML = title ? title : 'No title';
        modalSubtitle.innerHTML = subtitle ? subtitle : 'Image';
        modalProject.innerHTML = project ? project : '';
        modalYear.innerHTML = year ? year : '';
        modalDesc.innerHTML = desc ? desc : 'No description available';
        // Close modal by clicking the close button
        closeBtn.addEventListener('click', (event) => {
            if (!modal.hidden && modalImage.src) {
            modalImage.src = "";
            modal.hidden = true;
            if (modal.classList.contains('horizontal')) {
                modal.classList.remove('horizontal');
            }
            if (modal.classList.contains('vertical')) {
                modal.classList.remove('vertical');
            }
            document.documentElement.style.overflow = 'auto';
            modalTitle.innerHTML = 'No title';
            modalSubtitle.innerHTML = 'Image';
            modalProject.innerHTML = '';
            modalYear.innerHTML = '';
            modalDesc.innerHTML = 'No description available';
            }
        });
        // Get aspect ratio of image; horizontal > 1, vertical <= 1
        if (gridImage.naturalWidth / gridImage.naturalHeight > 1) {
            modal.classList.add('horizontal');
        } else {
            modal.classList.add('vertical');
        }
        modal.hidden = false;
        modalImage.src = gridImage.src;
        modalImage.alt = gridImage.alt;
        document.documentElement.style.overflow = 'hidden';
        })
    });
});