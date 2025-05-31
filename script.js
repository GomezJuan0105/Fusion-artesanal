// Scroll horizontal de productos (ejemplo dinámico)
const products = [
    { name: "Producto 1", description: "Descripción breve", image: "assets/images/product1.jpg" },
    { name: "Producto 2", description: "Descripción breve", image: "assets/images/product2.jpg" },
    // Añade más productos aquí...
];

const productScroll = document.querySelector('.product-scroll');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
    `;
    productScroll.appendChild(productCard);
});

// Toggle del menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (opcional)
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});