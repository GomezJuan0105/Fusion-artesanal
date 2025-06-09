// Datos de productos (array local) - MANTENER ESTE
const productos = [
  {
    id: 1,
    nombre: "Bandeja en cemento",
    descripcion: "Bandejas en cemento de diferentes tamaños y de diferentes colores",
    precio: 15000,
    imagen: "assets/images/IMG_2244.jpg",
    categoria: "velas"
  },
  {
    id: 2,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 25000,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 3,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 4,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  },
  {
    id: 5,
    nombre: "Portavelas Geométrico",
    descripcion: "Base de cemento con diseño minimalista",
    precio: 35.50,
    imagen: "assets/images/portavelas.jpg",
    categoria: "accesorios"
  }
  // Añade más productos aquí...
];

// Función para mostrar productos - MANTENER ESTA
// function mostrarProductos() {
//   const contenedor = document.getElementById('product-scroll');
//   contenedor.innerHTML = ''; // Limpiar contenedor primero
  
//   productos.forEach(producto => {
//     contenedor.innerHTML += `
//       <div class="product-card">
//         <img src="${producto.imagen}" alt="${producto.nombre}">
//         <h3>${producto.nombre}</h3>
//         <p>${producto.descripcion}</p>
//         <p class="price">$${producto.precio.toFixed(2)}</p>
//       </div>
//     `;
//   });
// }
const productosWrapper = document.getElementById('productos-dinamicos');

if (productosWrapper) {
    // Instancia de Intl.NumberFormat para formatear el precio como moneda colombiana (COP)
    const formatterConMoneda = new Intl.NumberFormat('es-CO', {
        style: 'currency',         // Indica que es formato de moneda
        currency: 'COP',           // Código de moneda para el peso colombiano
        minimumFractionDigits: 0,  // No mostrar decimales si son .00
        maximumFractionDigits: 0   // No mostrar más de 0 decimales
    });

    // Limpiar el contenedor antes de añadir nuevos productos (útil si recargas la lista)
    productosWrapper.innerHTML = '';

    // Itera sobre tus productos y genera el HTML
    productos.forEach(producto => {
        // Formatear el precio usando la instancia de Intl.NumberFormat
        const precioFormateado = formatterConMoneda.format(producto.precio);
        
        const cardHTML = `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="price">${precioFormateado}</p>
                <button class="add-to-cart" data-product-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
        // Inserta la tarjeta en el contenedor
        productosWrapper.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// function mostrarProductos() {
//   const contenedor = document.getElementById('product-scroll');
//   contenedor.innerHTML = '';
  
//   productos.forEach(producto => {
//     // Formatear precio con separador de miles
//     const precioFormateado = new Intl.NumberFormat('es-CO', {
//       style: 'currency',
//       currency: 'COP',
//       minimumFractionDigits: 0
//     }).format(producto.precio);

//     contenedor.innerHTML += `
//       <div class="product-card">
//         <img src="${productos.imagen}" alt="${productos.nombre}">
//         <h3>${productos.nombre}</h3>
//         <p>${productos.descripcion}</p>
//         <p class="price">${precioFormateado}</p>
//       </div>
//     `;
//   });
// }

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

// Carrito de compras
let carrito = [];

function mostrarProductos() {
    const contenedor = document.getElementById('product-scroll');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const precioFormateado = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(producto.precio);

        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="price">${precioFormateado}</p>
                <button class="add-to-cart" data-product-id="${producto.id}">Añadir al Carrito</button>
            </div>
        `;
    });

    // Añadir event listeners a los botones "Añadir al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            agregarAlCarrito(productId);
        });
    });
}

function agregarAlCarrito(productId) {
    const productoExistente = carrito.find(item => item.id === productId);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos.find(p => p.id === productId);
        if (producto) {
            carrito.push({ ...producto, cantidad: 1 });
        }
    }
    actualizarVistaCarrito();
    alert(`"${productos.find(p => p.id === productId).nombre}" ha sido añadido al carrito.`);
}

function actualizarVistaCarrito() {
    const carritoContainer = document.getElementById('carrito-items'); // Necesitarás un div con este ID en tu HTML
    const totalCarritoSpan = document.getElementById('total-carrito'); // Necesitarás un span con este ID

    if (!carritoContainer || !totalCarritoSpan) return; // Asegúrate de que estos elementos existan

    carritoContainer.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            const itemTotal = item.precio * item.cantidad;
            total += itemTotal;
            const precioItemFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(item.precio);
            const itemTotalFormateado = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(itemTotal);

            carritoContainer.innerHTML += `
                <div class="carrito-item">
                    <span>${item.nombre} x ${item.cantidad}</span>
                    <span>${precioItemFormateado} c/u</span>
                    <span>Total: ${itemTotalFormateado}</span>
                    <button class="quitar-item" data-product-id="${item.id}">Quitar</button>
                </div>
            `;
        });
    }

    const totalFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(total);
    totalCarritoSpan.textContent = totalFormateado;

    // Añadir event listeners para quitar ítems del carrito
    document.querySelectorAll('.quitar-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = parseInt(event.target.dataset.productId);
            quitarDelCarrito(productId);
        });
    });
}

function quitarDelCarrito(productId) {
    const itemIndex = carrito.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad--;
        } else {
            carrito.splice(itemIndex, 1);
        }
    }
    actualizarVistaCarrito();
}

// Función para simular el proceso de pago (antes de la pasarela real)
function iniciarPago() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Por favor, añade productos antes de proceder al pago.');
        return;
    }

    // Aquí podrías redirigir a una página de checkout o mostrar un modal
    // Por ahora, solo mostraremos el carrito y el formulario de contacto.
    document.getElementById('products').style.display = 'none'; // Oculta la sección de productos
    document.getElementById('checkout-section').style.display = 'block'; // Muestra la sección de checkout
    actualizarVistaCarrito(); // Asegura que el carrito esté actualizado al ir al checkout
}

// Lógica para enviar el formulario de contacto (simulado)
document.getElementById('checkout-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;

    if (!nombre || !email || !direccion || !telefono) {
        alert('Por favor, completa todos los campos del formulario de contacto.');
        return;
    }

    // Aquí es donde se integrarían con la pasarela de pagos
    // Por ahora, solo mostraremos la información y un mensaje
    alert(`Gracias por tu compra, ${nombre}!\n\nHemos recibido tu pedido y nos pondremos en contacto contigo.\nTotal a pagar: ${document.getElementById('total-carrito').textContent}`);

    // Limpiar carrito y formulario después de "pagar"
    carrito = [];
    document.getElementById('checkout-form').reset();
    actualizarVistaCarrito();
    document.getElementById('products').style.display = 'block'; // Vuelve a mostrar productos
    document.getElementById('checkout-section').style.display = 'none'; // Oculta el checkout
});

// Ejecutar al cargar la página - MANTENER
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    actualizarVistaCarrito(); // Inicializa la vista del carrito
});


// Dentro de tu función para manejar el envío del formulario de checkout
document.getElementById('checkout-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    // ... (Validación de campos de contacto) ...

    const orden = {
        productos: carrito.map(item => ({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            cantidad: item.cantidad
        })),
        total: carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        cliente: {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            direccion: document.getElementById('direccion').value,
            telefono: document.getElementById('telefono').value
        }
    };

    try {
        // PASO CRÍTICO: Envía los datos de la orden a tu propio servidor (backend)
        const response = await fetch('/api/create-payment', { // Esta es una URL de tu backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orden),
        });

        const data = await response.json();

        if (response.ok && data.redirectUrl) {
            // Si tu backend te devuelve una URL de redirección de la pasarela
            window.location.href = data.redirectUrl; // Redirige al usuario a la pasarela
        } else {
            alert('Hubo un error al iniciar el proceso de pago. Por favor, intenta de nuevo.');
            console.error('Error del backend:', data.error);
        }
    } catch (error) {
        console.error('Error de red al procesar el pago:', error);
        alert('No se pudo conectar con el servidor para iniciar el pago. Intenta más tarde.');
    }
});