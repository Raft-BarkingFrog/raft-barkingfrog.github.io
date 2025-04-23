// Matrix Digital Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px Source Code Pro';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

// Collapsible Layer Cards
document.querySelectorAll('.layer-title').forEach(title => {
    title.addEventListener('click', () => {
        const content = title.nextElementSibling;
        content.classList.toggle('active');
        title.classList.toggle('active');
    });
});

// Infinite Scroll and Lazy Loading
const layerContainer = document.getElementById('layer-container');
const layers = [
    // Layers 3 to 200 as objects
    { title: 'Layer 3: Hybrid Instruments', content: `
        <ul>
            <li><strong>Convertible Bonds:</strong> Bonds that can be converted into a predetermined number of the issuer's equity shares.</li>
            <li><strong>Preferred Stocks:</strong> Equity shares that pay dividends at a specified rate and have priority over common stock in dividend payment and liquidation.</li>
            <li><strong>Exchangeable Bonds:</strong> Bonds that can be exchanged for a predetermined number of shares of a different company.</li>
            <li><strong>Warrants:</strong> Securities that entitle the holder to buy the underlying stock of the issuing company at a fixed exercise price until the expiry date.</li>
        </ul>
    `},
    // Add more layers here (manually or via a script to parse codex.txt)
    // Example for Layer 200
    { title: 'Layer 200: Global Autocracy', content: `
        <ul>
            <li><strong>Unified World Governance:</strong> Establishing a unified world governance structure where decisions are made centrally by a select group of elites.</li>
            <li><strong>Totalitarian Control:</strong> Implementing totalitarian control measures to ensure compliance and eliminate dissent.</li>
            <li><strong>Global Peace Enforcement:</strong> Using military and technological means to enforce global peace, ensuring stability and control over all regions.</li>
        </ul>
    `}
    // In a real implementation, you'd parse all 200 layers from codex.txt
];

let currentLayerIndex = 2; // Start after the initial two layers

function loadMoreLayers() {
    const fragment = document.createDocumentFragment();
    const endIndex = Math.min(currentLayerIndex + 5, layers.length);
    
    for (let i = currentLayerIndex; i < endIndex; i++) {
        const layer = layers[i];
        const div = document.createElement('div');
        div.className = 'layer-card';
        div.innerHTML = `
            <h3 class="layer-title">${layer.title}</h3>
            <div class="layer-content">${layer.content}</div>
        `;
        fragment.appendChild(div);
    }
    
    layerContainer.appendChild(fragment);
    
    // Re-attach event listeners to new layer titles
    document.querySelectorAll('.layer-title').forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            content.classList.toggle('active');
            title.classList.toggle('active');
        });
    });
    
    currentLayerIndex = endIndex;
}

// Load initial batch
loadMoreLayers();

// Infinite scroll detection
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && currentLayerIndex < layers.length) {
        loadMoreLayers();
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
