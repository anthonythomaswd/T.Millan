document.getElementById('loginForm').addEventListener('submit', function(e)  {
    e.preventDefault(); 
    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 


    if (username === 'admin' && password === 'admin123') { 
        document.getElementById('loginForm').style.display = 'none'; 
        document.getElementById('productForm').style.display = 'block'; 
        document.getElementById('loginForm').addEventListener('submit', function(e) { 
            e.preventDefault(); 
            const username = document.getElementById('username').value; 
            const password = document.getElementById('password').value; 
         
            if (username === 'admin' && password === 'admin123') { 
                document.getElementById('loginForm').style.display = 'none'; 
                document.getElementById('productForm').style.display = 'block'; 
            } else { 

                alert('Usuario o contraseña incorrectos'); 
            } 
        } )}; }); 
         
        document.getElementById('formProducto').addEventListener('submit', function(e) { 
            e.preventDefault(); 
            const id = document.getElementById('id').value; 
            const nombre_producto = document.getElementById('nombre_producto').value; 
            const cantidad = document.getElementById('cantidad').value; 
            const precio_entrada = document.getElementById('precio_entrada').value; 
            const precio_venta = document.getElementById('precio_venta').value; 
         
            const producto = { 
                nombre_producto, 
                cantidad, 
                precio_entrada, 
                precio_venta, 
                iva: 0.20 
            }; 
         
            if (id) { 
                // Actualizar producto 
                fetch(`/productos/${id}`, { 
                    method: 'PUT', 
                    headers: { 
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify(producto) 
                }) 
                .then(response => response.text()) 
                .then(data => alert(data)); 
            } else { 
                // Crear nuevo producto 
                fetch('/productos', { 
                    method: 'POST', 
                    headers: { 
                        'Content-Type': 'application/json' 
                    }, 
                    body: JSON.stringify(producto) 
                }) 
                .then(response => response.text()) 
                .then(data => alert(data)); 
            } 
        }); 
         
        document.getElementById('eliminar').addEventListener('click', function() { 
            const id = document.getElementById('id').value; 
            if (id) { 
                fetch(`/productos/${id}`, { 
                    method: 'DELETE' 
                }) 
                .then(response => response.text()) 
                .then(data => alert(data)); 
            } else { 
                alert('Por favor, ingrese un ID para eliminar.'); 
            } 
        }); 
         
        document.getElementById('consultar').addEventListener('click', function() { 
            fetch('/productos') 
            .then(response => response.json()) 
            .then(data => { 
                const productosTextArea = document.getElementById('productos'); 
        productosTextArea.value = ''; 
        data.forEach(producto => { 
        productosTextArea.value += `ID: ${producto.id}, Producto: ${producto.nombre_producto}, 
        Cantidad: ${producto.cantidad}, Precio Venta: ${producto.precio_venta}, Total con IVA: 
        ${producto.total_valor_con_iva}\n`;
        }); 


        }); 

        });