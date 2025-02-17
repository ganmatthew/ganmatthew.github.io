const GridData = {
    "art-grid-logos": [
        { 
            "title": "JubiFries Logo", "subtitle": "Icon/Logo", "project": "JubiFries", "year": "2018", 
            "desc": "A logo made for our food booth at my high school's student-run bazaar, which sold different flavors of French fries and some homemade brownies. The logo takes inspiration from the name of the school and is a subtle take on the school's branding and colors, as well as its core values insignia.", "imgSrc": "images\\artworks\\Jubifries_V2_Background.png" 
        },
        { 
            "title": "CVRF Logo", 
            "subtitle": "Icon/Logo", "project": "Cobalt Valley Research Facility", "year": "2018 (original)<br/>2020 (current)", 
            "desc": "Logo of the Cobalt Valley Research Facility (CVRF), the setting of the namesake Roblox sci-fi facility roleplay game that I worked on. The logo was originally made in 2018 for its predecessor, the Hyptek Tyonek Research Facility (HTRF). After that project was cancelled and relaunched as CVRF in 2020, the HTRF logo was reused and improved on with the CVRF name.", "imgSrc": "images\\artworks\\CVRF.png"
        },
        { 
            "title": "Tetris Logo", "subtitle": "Icon/Logo", "project": "Tetris", "year": "2021", 
            "desc": "Logo that I made for an Android port of Tetris written in Java that me and a friend made as part of our final project for Mobile App Development (MOBDEVE) at DLSU.", "imgSrc": "images\\artworks\\TetrisIconForeground.png"
        },
        { 
            "title": "HYBB Logo", "subtitle": "Icon/Logo", "project": "How's Your Byahe Bes", "year": "2023", 
            "desc": "Made a logo inspired by Philippine jeepney signage art for the mobility advocacy group and community &quot;How's Your Byahe, Bes&quot; on Facebook, where I currently am a moderator of.", "imgSrc": "images\\artworks\\HYBB_logo.png"
        }
    ],
    "art-grid-thumbnails": [
        { 
            "title": "Discover Hidden Secrets", "subtitle": "Game Thumbnail", "project": "Cobalt Valley Research Facility", "year": "2020", 
            "desc": "", "imgSrc": "images\\artworks\\CVRFIntegratedThumbHidden.png"
        },
        { 
            "title": "New Prop Placement System", "subtitle": "Game Thumbnail", "project": "Cobalt Valley Research Facility", "year": "2020", 
            "desc": "", "imgSrc": "images\\artworks\\CVRFIntegratedThumbProps.png"
        },
        { 
            "title": "Attack Of The Clones!", "subtitle": "Game Thumbnail", "project": "Cobalt Valley Research Facility", "year": "2022", 
            "desc": "", "imgSrc": "images\\artworks\\CVRF015Thumb1.png"
        },
        { 
            "title": "Mingle With Head-Hopping Crabs", "subtitle": "Game Thumbnail", "project": "Cobalt Valley Research Facility", "year": "2020", 
            "desc": "", "imgSrc": "images\\artworks\\CVRFIntegratedThumbHeadcrabs.png"
        }
    ],
    "art-grid-pubs": [
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCS3rdGAMain_Edited.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSCreativeProblemSolvingOriginal.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2020", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSDesignThinkingPub_Revised.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSFigmaWorkshop.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSFinalsGroupStudy2021C.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSFirebaseFlutterDartPub.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSJavaThreadingPub.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSLaTexWorkshopPub.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSLetsGitReady.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSLifestreamPub.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "La Salle Computer Society", "year": "2021", 
            "desc": "", "imgSrc": "images\\artworks\\LSCSNodeJSMiddlewares.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "The Initiative PH", "year": "2019", 
            "desc": "", "imgSrc": "images\\artworks\\project hiraya de espana-compressed.jpg"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "The Initiative PH", "year": "2019", 
            "desc": "", "imgSrc": "images\\artworks\\061219-1.jpg"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "The Initiative PH", "year": "2019", 
            "desc": "", "imgSrc": "images\\artworks\\060419-1.jpeg"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "The Initiative PH", "year": "2019", 
            "desc": "", "imgSrc": "images\\artworks\\project tanaw.png"
        },
        { 
            "title": "", "subtitle": "Poster", "project": "Press Start by Hudson Taylor", "year": "2019", 
            "desc": "", "imgSrc": "images\\artworks\\PressStartPoster.png"
        }
    ]
}

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
    const navbar = document.getElementsByClassName('nav-bg')[0];
    // Modal elements
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalProject = document.getElementById('modal-project');
    const modalYear = document.getElementById('modal-year');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('modal-close')
    // Toggle scrolling when modal is open
    document.querySelectorAll('.grid-item').forEach(function(gridItem) {
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
            if (navbar.classList.contains('dark')) {
                navbar.classList.remove('dark');
            }
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
        navbar.classList.add('dark');
        document.documentElement.style.overflow = 'hidden';
        })
    });
});