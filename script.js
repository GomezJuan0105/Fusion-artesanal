// Datos de productos (array local) - MANTENER ESTE
const productos = [
  {
    id: 1,
    nombre: "Bandeja en cemento",
    descripcion: "Bandejas en cemento de diferentes tamaños y de diferentes colores",
    precio: 15,
    imagen: "assets/images/IMG_2244.jpg",
    categoria: "velas"
  },
  {
    id: 2,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 2,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 2,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 2,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  }
  // Añade más productos aquí...
];

// Función para mostrar productos - MANTENER ESTA
function mostrarProductos() {
  const contenedor = document.getElementById('product-scroll');
  contenedor.innerHTML = ''; // Limpiar contenedor primero
  
  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div class="product-card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="price">$${producto.precio.toFixed(2)}</p>
      </div>
    `;
  });
}

// Ejecutar al cargar la página - MANTENER
document.addEventListener('DOMContentLoaded', mostrarProductos);

// MANTENER el código del menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});