// --- Typewriter Effect ---
const txt = 'Mythraiser';
let i = 0;
function type() {
    if (i < txt.length) {
        const typingElement = document.getElementById('typing');
        if (typingElement) {
            typingElement.textContent += txt[i++];
        }
        setTimeout(type, 120);
    }
}
type();

// --- Dark/Light Mode Theme Toggle ---
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
    themeBtn.onclick = () => document.body.classList.toggle('light');
}

// --- Image Lightbox Modal Zoom Engine ---
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close-modal');
const galleryContainers = document.querySelectorAll('.fav-img-wrapper');

galleryContainers.forEach(wrapper => {
    wrapper.onclick = function() {
        const clickedImg = this.querySelector('.fav-gallery-img');
        const badge = this.querySelector('.img-badge');
        
        if (modal && modalImg && clickedImg) {
            modal.style.display = "block";
            modalImg.src = clickedImg.src;
            
            if (badge) {
                captionText.textContent = badge.textContent;
            } else {
                captionText.textContent = clickedImg.alt;
            }
        }
    }
});

if (closeModal) {
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
}

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});


// --- Interactive Weather (Lightning & Light Snow-Rain) Simulation Engine ---
const canvas = document.getElementById('atmosphereCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    // Particle Array Configuration (Mix of fine snow crystals and rain speed)
    const particleCount = 75; 
    const particles = [];
    for (let k = 0; k < particleCount; k++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: Math.random() * 1.6 + 0.6,
            speedY: Math.random() * 2.2 + 0.8, // Fluid downward trajectory
            speedX: Math.random() * 0.4 - 0.1,  // Slight organic drift skew
            opacity: Math.random() * 0.4 + 0.2
        });
    }

    // Lightning Flash Parameters
    let surfaceFlashOpacity = 0;
    let lightningBranches = [];

    function generateLightningDischarge() {
        surfaceFlashOpacity = Math.random() * 0.22 + 0.08; // Base background glow
        lightningBranches = [];
        
        let rootX = Math.random() * w;
        let rootY = 0;
        let nodes = Math.floor(Math.random() * 4) + 4;
        let segmentHeight = h / nodes;

        lightningBranches.push({ x: rootX, y: rootY });
        for (let step = 1; step <= nodes; step++) {
            rootX += (Math.random() * 70 - 35); // Horizontal branch zig-zag jaggedness
            rootY += segmentHeight * (Math.random() * 0.3 + 0.85);
            lightningBranches.push({ x: rootX, y: rootY });
        }
    }

    function renderAtmosphericLoop() {
        ctx.clearRect(0, 0, w, h);

        const isLightMode = document.body.classList.contains('light');

        // Render Lightning Discharge Framework
        if (surfaceFlashOpacity > 0) {
            // Screen Flash Impact
            ctx.fillStyle = isLightMode 
                ? `rgba(200, 225, 255, ${surfaceFlashOpacity * 0.6})` 
                : `rgba(255, 255, 255, ${surfaceFlashOpacity})`;
            ctx.fillRect(0, 0, w, h);
            surfaceFlashOpacity -= 0.025; // Decay rate

            // Draw Core Fractured Line Bolt
            ctx.beginPath();
            ctx.strokeStyle = isLightMode 
                ? `rgba(100, 150, 255, ${surfaceFlashOpacity + 0.4})` 
                : `rgba(190, 235, 255, ${surfaceFlashOpacity + 0.6})`;
            ctx.lineWidth = Math.random() * 2.5 + 1.2;
            
            if (lightningBranches.length > 0) {
                ctx.moveTo(lightningBranches[0].x, lightningBranches[0].y);
                for (let b = 1; b < lightningBranches.length; b++) {
                    ctx.lineTo(lightningBranches[b].x, lightningBranches[b].y);
                }
            }
            ctx.stroke();
        }

        // Periodic Random Discharge Catalyst
        if (Math.random() < 0.0025) { 
            generateLightningDischarge();
        }

        // Draw and Update Weather Droplets/Flakes
        ctx.fillStyle = isLightMode ? 'rgba(70, 85, 105, 0.45)' : 'rgba(235, 245, 255, 0.65)';
        for (let k = 0; k < particleCount; k++) {
            let p = particles[k];
            ctx.beginPath();
            
            // Render elongated particles to seamlessly look like mixed precipitation
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
            ctx.fill();

            // Coordinate shifting
            p.y += p.speedY;
            p.x += p.speedX;

            // Recirculate once particle hits screen limits
            if (p.y > h) {
                particles[k] = {
                    x: Math.random() * w,
                    y: -10,
                    radius: p.radius,
                    speedY: p.speedY,
                    speedX: p.speedX,
                    opacity: p.opacity
                };
            }
        }

        requestAnimationFrame(renderAtmosphericLoop);
    }
    
    renderAtmosphericLoop();
}