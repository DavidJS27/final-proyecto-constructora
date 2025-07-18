function datos() {
    // Datos de prueba para usuarios.
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.length === 0) {
        const usuarios = [
            {
                idusuario: 1,
                cedula: "1234567",
                nombre: "Juan",
                apellido: 'Torres',
                celular: "0981123456",
                usuario: "admin",
                contrasena: "admin",
                rol: "administrador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 2,
                cedula: "2345678",
                nombre: "Gustavo",
                apellido: 'Benitez',
                celular: "0982234567",
                usuario: "jefe",
                contrasena: "jSqzB{Ue&~iJ{mp",
                rol: "jefe_obra",
                estado: "activo",
                permisos: ['dashboard', 'usuarios', 'cobros-clientes', 'registro-perdidas']
            },
            {
                idusuario: 3,
                cedula: "3456789",
                nombre: "Lourdes",
                apellido: 'Torres',
                celular: "0983345678",
                usuario: "gerente",
                contrasena: "LJ6zPh}n80W!+ZF",
                rol: "gerente",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 4,
                cedula: "4567890",
                nombre: "Nelson",
                apellido: 'Martinez',
                celular: "0984456789",
                usuario: "obrero",
                contrasena: "3J[DACX.S~oLGWm",
                rol: "obrero",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 5,
                cedula: "5678901",
                nombre: "Luana",
                apellido: 'Alarcón',
                celular: "0985567890",
                usuario: "contadora",
                contrasena: "n'7qx_qZ)wpL6oX",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 6,
                cedula: "6789012",
                nombre: "Thaiel",
                apellido: 'Duarte',
                celular: "0986678901",
                usuario: "codificador",
                contrasena: "SD.T7O3V7@mo;QY",
                rol: "codificador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 7,
                cedula: "7890123",
                nombre: "Tania",
                apellido: 'Sanabria',
                celular: "0987789012",
                usuario: "luisa",
                contrasena: "z6M+L^SD{]R-Mys",
                rol: "jefe_obra",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 8,
                cedula: "8901234",
                nombre: "Thiago",
                apellido: 'Bidondo',
                celular: "0988890123",
                usuario: "thiagod",
                contrasena: "i;Q1NKwN]}Ph6Ke",
                rol: "obrero",
                estado: "inactivo",
                permisos: []
            },
            {
                idusuario: 9,
                cedula: "9012345",
                nombre: "Derlis",
                apellido: 'Diaz',
                celular: "0989901234",
                usuario: "sofia",
                contrasena: "{'1wal5x1^6O9nB",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 10,
                cedula: "0123456",
                nombre: "Alan",
                apellido: 'Turing',
                celular: "0980012345",
                usuario: "miguel",
                contrasena: "KbvK#a-GzRvZQ=t",
                rol: "codificador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 11,
                cedula: "1230987",
                nombre: "Carmen",
                apellido: 'Velazquez',
                celular: "0981234567",
                usuario: "carmen",
                contrasena: "PqCH[AqLutx+XnN",
                rol: "administrador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 12,
                cedula: "2341098",
                nombre: "Ricardo",
                apellido: 'Mendoza',
                celular: "0982345678",
                usuario: "ricardo",
                contrasena: "ZZ(ONbGC=Fpf=;2",
                rol: "jefe_obra",
                estado: "activo",
                permisos: ['dashboard', 'materiales', 'obras']
            },
            {
                idusuario: 13,
                cedula: "3452109",
                nombre: "Patricia",
                apellido: 'Ramirez',
                celular: "0983456789",
                usuario: "patricia",
                contrasena: "~%;2TZ~EvI1ov.p",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 14,
                cedula: "4563210",
                nombre: "Fernando",
                apellido: 'Castillo',
                celular: "0984567890",
                usuario: "fernando",
                contrasena: "tj52&&uJZ8qzjD^",
                rol: "obrero",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 15,
                cedula: "5674321",
                nombre: "Natalia",
                apellido: 'Morales',
                celular: "0985678901",
                usuario: "natalia",
                contrasena: "#~t'xoz6+K.j#YP",
                rol: "gerente",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 16,
                cedula: "6785432",
                nombre: "Diego",
                apellido: 'Herrera',
                celular: "0986789012",
                usuario: "diego",
                contrasena: "^@K8)mb%wTul_(_",
                rol: "codificador",
                estado: "inactivo",
                permisos: []
            },
            {
                idusuario: 17,
                cedula: "7896543",
                nombre: "Lucia",
                apellido: 'Ortega',
                celular: "0987890123",
                usuario: "lucia",
                contrasena: "{m]P0j(B87Woy&J",
                rol: "obrero",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 18,
                cedula: "8907654",
                nombre: "Carlos",
                apellido: 'Jimenez',
                celular: "0988901234",
                usuario: "carlos",
                contrasena: "~NR.0mawAa%i@cf",
                rol: "jefe_obra",
                estado: "activo",
                permisos: ['dashboard', 'usuarios', 'materiales']
            },
            {
                idusuario: 19,
                cedula: "9018765",
                nombre: "Silvia",
                apellido: 'Gutierrez',
                celular: "0989012345",
                usuario: "silvia",
                contrasena: "pxG33$KP4''g'w_",
                rol: "contador",
                estado: "activo",
                permisos: []
            },
            {
                idusuario: 20,
                cedula: "0129876",
                nombre: "Rodrigo",
                apellido: 'Vargas',
                celular: "0980123456",
                usuario: "rodrigo",
                contrasena: "@Bf^N#NR}v9]]U}",
                rol: "administrador",
                estado: "activo",
                permisos: []
            }
        ];
        
        localStorage.setItem("usuarios", JSON.stringify(usuarios));                    
    }

    // Cargar datos de prueba clientes
    var clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    if (clientes.length === 0) {
        clientes = [
            {
                idCliente: 1,
                rucCi: "4598523-2",
                razonSocial: "Municipalidad de Concepción",
                direccion: "Av. Pdte. Franco c/ Brasil, Concepción",
                telefono: "0331 242209",
                celular: "0971 528623",
                email: "municipalidad.concepcion@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente institucional",
                estado: true
            },
            {
                idCliente: 2,
                rucCi: "8003258-8",
                razonSocial: "Santa Catalina S.A.",
                direccion: "Juan E. O'Leary 1234, Asunción",
                telefono: "021 456789",
                celular: "0981 234567",
                email: "santacatalina.sa@gmail.com",
                ciudad: "Concepción",
                observaciones: "Empresa contratista principal",
                estado: true
            },
            {
                idCliente: 3,
                rucCi: "3452987-5",
                razonSocial: "Juan Pérez",
                direccion: "Calle Mariscal López 234, Concepción",
                telefono: "",
                celular: "0972 345678",
                email: "juan.perez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: true
            },
            {
                idCliente: 4,
                rucCi: "8004578-9",
                razonSocial: "ANDE",
                direccion: "Avda. España 1268, Asunción",
                telefono: "021 248111",
                celular: "0981 123456",
                email: "contacto@ande.gov.py",
                ciudad: "Asunción",
                observaciones: "Empresa estatal de energía",
                estado: true
            },
            {
                idCliente: 5,
                rucCi: "1234567-8",
                razonSocial: "María González",
                direccion: "Calle Independencia 567, Concepción",
                telefono: "0331 123456",
                celular: "0975 987654",
                email: "maria.gonzalez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular - proyecto residencial",
                estado: false
            },
            {
                idCliente: 6,
                rucCi: "2345678-9",
                razonSocial: "Constructora Norteña",
                direccion: "Ruta 5 Km 10, Concepción",
                telefono: "0331 654321",
                celular: "0982 111222",
                email: "info@nortena.com.py",
                ciudad: "Concepción",
                observaciones: "Empresa constructora local",
                estado: true
            },
            {
                idCliente: 7,
                rucCi: "8001234-5",
                razonSocial: "Supermercado Central",
                direccion: "Av. Central 1000, Horqueta",
                telefono: "0332 123456",
                celular: "0983 333444",
                email: "contacto@supercentral.com.py",
                ciudad: "Horqueta",
                observaciones: "Cliente comercial",
                estado: true
            },
            {
                idCliente: 8,
                rucCi: "4321987-0",
                razonSocial: "Pedro López",
                direccion: "Calle Palma 789, Concepción",
                telefono: "",
                celular: "0976 555666",
                email: "pedro.lopez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: false
            },
            {
                idCliente: 9,
                rucCi: "8009876-5",
                razonSocial: "Hospital Regional",
                direccion: "Av. Médicos del Chaco 200, Concepción",
                telefono: "0331 222333",
                celular: "0984 777888",
                email: "hospitalregional@salud.gov.py",
                ciudad: "Concepción",
                observaciones: "Cliente institucional - salud",
                estado: true
            },
            {
                idCliente: 10,
                rucCi: "5678901-2",
                razonSocial: "Estancia La Esperanza",
                direccion: "Colonia San Juan, Concepción",
                telefono: "0331 987654",
                celular: "0977 999000",
                email: "contacto@laesperanza.com.py",
                ciudad: "Concepción",
                observaciones: "Cliente rural",
                estado: true
            },
            {
                idCliente: 11,
                rucCi: "6789012-3",
                razonSocial: "Ferretería El Martillo",
                direccion: "Av. Mcal. López 543, Concepción",
                telefono: "0331 345678",
                celular: "0978 123456",
                email: "elmartillo@gmail.com",
                ciudad: "Concepción",
                observaciones: "Ferretería local",
                estado: true
            },
            {
                idCliente: 12,
                rucCi: "7890123-4",
                razonSocial: "Construcciones Norte",
                direccion: "Ruta 3 Km 15, Horqueta",
                telefono: "0332 456789",
                celular: "0979 234567",
                email: "construcciones.norte@gmail.com",
                ciudad: "Horqueta",
                observaciones: "Empresa constructora",
                estado: true
            },
            {
                idCliente: 13,
                rucCi: "8901234-5",
                razonSocial: "Panadería San José",
                direccion: "Calle Ygatimi 123, Concepción",
                telefono: "0331 567890",
                celular: "0980 345678",
                email: "panaderia.sanjose@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente comercial",
                estado: true
            },
            {
                idCliente: 14,
                rucCi: "9012345-6",
                razonSocial: "Escuela Nacional",
                direccion: "Av. Estudiantes 456, Concepción",
                telefono: "0331 678901",
                celular: "0981 456789",
                email: "escuela.nacional@mec.gov.py",
                ciudad: "Concepción",
                observaciones: "Institución educativa",
                estado: true
            },
            {
                idCliente: 15,
                rucCi: "0123456-7",
                razonSocial: "Roberto Martínez",
                direccion: "Barrio San Luis, Concepción",
                telefono: "",
                celular: "0982 567890",
                email: "roberto.martinez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: false
            },
            {
                idCliente: 16,
                rucCi: "1234567-8",
                razonSocial: "Cooperativa Esperanza",
                direccion: "Av. Cooperativismo 789, Loreto",
                telefono: "0333 789012",
                celular: "0983 678901",
                email: "cooperativa.esperanza@gmail.com",
                ciudad: "Loreto",
                observaciones: "Cooperativa agropecuaria",
                estado: true
            },
            {
                idCliente: 17,
                rucCi: "2345678-9",
                razonSocial: "Almacén Central",
                direccion: "Calle Comercio 234, Concepción",
                telefono: "0331 890123",
                celular: "0984 789012",
                email: "almacen.central@gmail.com",
                ciudad: "Concepción",
                observaciones: "Comercio local",
                estado: true
            },
            {
                idCliente: 18,
                rucCi: "3456789-0",
                razonSocial: "Ana Rodríguez",
                direccion: "Calle Flores 567, Concepción",
                telefono: "0331 901234",
                celular: "0985 890123",
                email: "ana.rodriguez@gmail.com",
                ciudad: "Concepción",
                observaciones: "Cliente particular",
                estado: true
            },
            {
                idCliente: 19,
                rucCi: "4567890-1",
                razonSocial: "Transporte Norteño",
                direccion: "Terminal de Ómnibus, Concepción",
                telefono: "0331 012345",
                celular: "0986 901234",
                email: "transporte.norteno@gmail.com",
                ciudad: "Concepción",
                observaciones: "Empresa de transporte",
                estado: true
            },
            {
                idCliente: 20,
                rucCi: "5678901-2",
                razonSocial: "Hotel Plaza",
                direccion: "Plaza Central, Concepción",
                telefono: "0331 123456",
                celular: "0987 012345",
                email: "hotel.plaza@gmail.com",
                ciudad: "Concepción",
                observaciones: "Hotel céntrico",
                estado: true
            }
        ];
            
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    // Datos de prueba para categorias.
    const categorias = [
        {
            idcategoria: 1,
            categoria: 'cemento'
        },
        {
            idcategoria: 2,
            categoria: 'arena'
        },
        {
            idcategoria: 3,
            categoria: 'hierro'
        },
        {
            idcategoria: 4,
            categoria: 'pintura'
        },
        {
            idcategoria: 5,
            categoria: 'madera'
        },
        {
            idcategoria: 6,
            categoria: 'plomeria'
        },
        {
            idcategoria: 7,
            categoria: 'techo'
        },
        {
            idcategoria: 8,
            categoria: 'electricidad'
        },
        {
            idcategoria: 3,
            categoria: 'otro'
        }
    ]

    localStorage.setItem("categorias", JSON.stringify(categorias));  

    // Datos de prueba para materiales.
    var materiales = JSON.parse(localStorage.getItem("materiales")) || [];
    if (materiales.length === 0) {
        const materiales= [
            {
                idMaterial: 1,
                codbarra: "1020304050600",
                descripcion: "Cemento Vallemi",
                precio: 52000,
                stock: 150,
                unidad: "bolsa 50kg",
                categoria: "cemento",
                observaciones: "Bolsas de 50 kg, fabricado en Paraguay",
                stockMinimo: 50,
                tipoIVA: "10"
            },
            {
                idMaterial: 2,
                codbarra: "1122536585870",
                descripcion: "Cemento CECON",
                precio: 50000,
                stock: 800,
                unidad: "bolsa 50kg",
                categoria: "cemento",
                observaciones: "Bolsas de 50 kg, fabricado en Paraguay",
                stockMinimo: 50,
                tipoIVA: "10"
            },
            {
                idMaterial: 3,
                codbarra: "1234567890123",
                descripcion: "Arena lavada",
                precio: 180000,
                stock: 120,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Arena para mezclas, proveniente del río Paraguay",
                stockMinimo: 20,
                tipoIVA: "10"
            },
            {
                idMaterial: 4,
                codbarra: "2345678901234",
                descripcion: "Varilla conformada de 6mm",
                precio: 15000,
                stock: 50,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 5,
                codbarra: "3456789012345",
                descripcion: "Varilla conformada de 8mm",
                precio: 25000,
                stock: 55,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 6,
                codbarra: "4567890123456",
                descripcion: "Varilla conformada de 10mm",
                precio: 40000,
                stock: 40,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 7,
                codbarra: "5678901234567",
                descripcion: "Varilla conformada de 12mm",
                precio: 57000,
                stock: 35,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 8,
                codbarra: "8901234567670",
                descripcion: "Varilla conformada de 16mm",
                precio: 98000,
                stock: 20,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 9,
                codbarra: "9012345674158",
                descripcion: "Ladrillo hueco de 6 agujeros",
                precio: 3000,
                stock: 2500,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes internas",
                stockMinimo: 500,
                tipoIVA: "10"
            },
            {
                idMaterial: 21,
                codbarra: "9012345674789",
                descripcion: "Ladrillo hueco de 8 agujeros",
                precio: 3500,
                stock: 2000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes internas",
                stockMinimo: 500,
                tipoIVA: "10"
            },
            {
                idMaterial: 10,
                codbarra: "9012345674567",
                descripcion: "Ladrillo comun rojo",
                precio: 1600,
                stock: 6000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500,
                tipoIVA: "10"
            },
            {
                idMaterial: 11,
                codbarra: "9012345671465",
                descripcion: "Ladrillo comun blanco",
                precio: 1600,
                stock: 4000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500,
                tipoIVA: "10"
            },
            {
                idMaterial: 12,
                codbarra: "0158875236694",
                descripcion: "Ladrillo visto",
                precio: 4000,
                stock: 6000,
                unidad: "unidad",
                categoria: "otro",
                observaciones: "Ladrillos cerámicos para paredes externas",
                stockMinimo: 500,
                tipoIVA: "10"
            },
            {
                idMaterial: 13,
                codbarra: "0123669874551",
                descripcion: "Pintur Suvinil clasica 18l",
                precio: 623000,
                stock: 32,
                unidad: "litros",
                categoria: "pintura",
                observaciones: "Pintura lavable, 18 litros, color Arena",
                stockMinimo: 15,
                tipoIVA: "10"
            },
            {
                idMaterial: 14,
                codbarra: "4569987552001",
                descripcion: "Madera terciada 6mm",
                precio: 25000,
                stock: 30,
                unidad: "unidad",
                categoria: "madera",
                observaciones: "Tirantes de 3 metros, para encofrado",
                stockMinimo: 10,
                tipoIVA: "10"
            },
            {
                idMaterial: 15,
                codbarra: "1455966300257",
                descripcion: "Caño PVC para desagüe 150mm",
                precio: 85000,
                stock: 50,
                unidad: "unidad",
                categoria: "plomeria",
                observaciones: "Caños de 6 metros soldable, marca Tigre",
                stockMinimo: 20,
                tipoIVA: "10"
            },
            {
                idMaterial: 16,
                codbarra: "2300587400159",
                descripcion: "Porcelanato pulido 60x60cm",
                precio: 95000,
                stock: 200,
                unidad: "m2",
                categoria: "ceramica",
                observaciones: "Color beige, primera calidad, alto tránsito",
                stockMinimo: 50,
                tipoIVA: "10"
            },
            {
                idMaterial: 17,
                codbarra: "0289647233658",
                descripcion: "Chapa Térmoacústica galbalum",
                precio: 285000,
                stock: 12,
                unidad: "m",
                categoria: "techo",
                observaciones: "Chapas de 3.60 metros, 3cm de espesor",
                stockMinimo: 10,
                tipoIVA: "10"
            },
            {
                idMaterial: 18,
                codbarra: "4786953298402",
                descripcion: "Cable multifilar 2.5mm",
                precio: 145000,
                stock: 500,
                unidad: "m",
                categoria: "electricidad",
                observaciones: "Cable multifilar, color negro, normalizado",
                stockMinimo: 200,
                tipoIVA: "10"
            },
            {
                idMaterial: 19,
                codbarra: "1478523695246",
                descripcion: "Cieloraso pvc 8mm",
                precio: 60000,
                stock: 50,
                unidad: "m2",
                categoria: "techo",
                observaciones: "Color blanco, techo falso",
                stockMinimo: 2,
                tipoIVA: "10"
            },
            {
                idMaterial: 20,
                codbarra: "1249586235847",
                descripcion: "Piedra triturada 4ta",
                precio: 980000,
                stock: 45,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Para preparación de hormigón",
                stockMinimo: 15,
                tipoIVA: "10"
            },
            {
                idMaterial: 22,
                codbarra: "3216549870123",
                descripcion: "Cemento Itacamba",
                precio: 48000,
                stock: 200,
                unidad: "bolsa 50kg",
                categoria: "cemento",
                observaciones: "Cemento portland, bolsas de 50kg",
                stockMinimo: 50,
                tipoIVA: "10"
            },
            {
                idMaterial: 23,
                codbarra: "4327658901234",
                descripcion: "Arena gruesa",
                precio: 200000,
                stock: 80,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Arena gruesa para hormigón",
                stockMinimo: 20,
                tipoIVA: "10"
            },
            {
                idMaterial: 24,
                codbarra: "5438769012345",
                descripcion: "Varilla conformada de 20mm",
                precio: 150000,
                stock: 15,
                unidad: "unidad",
                categoria: "hierro",
                observaciones: "Barras de 12 metros de longitud",
                stockMinimo: 50,
                tipoIVA: "10"
            },
            {
                idMaterial: 25,
                codbarra: "6549870123456",
                descripcion: "Pintura Latex Interior",
                precio: 85000,
                stock: 40,
                unidad: "litros",
                categoria: "pintura",
                observaciones: "Pintura látex blanca, 4 litros",
                stockMinimo: 20,
                tipoIVA: "10"
            },
            {
                idMaterial: 26,
                codbarra: "7650981234567",
                descripcion: "Madera Pino 2x4",
                precio: 35000,
                stock: 100,
                unidad: "unidad",
                categoria: "madera",
                observaciones: "Tirantes de pino, 3 metros",
                stockMinimo: 30,
                tipoIVA: "10"
            },
            {
                idMaterial: 27,
                codbarra: "8761092345678",
                descripcion: "Caño PVC 110mm",
                precio: 65000,
                stock: 80,
                unidad: "unidad",
                categoria: "plomeria",
                observaciones: "Caños de 6 metros, clase 6",
                stockMinimo: 25,
                tipoIVA: "10"
            },
            {
                idMaterial: 28,
                codbarra: "9872103456789",
                descripcion: "Ceramica Esmaltada 30x30",
                precio: 45000,
                stock: 300,
                unidad: "m2",
                categoria: "ceramica",
                observaciones: "Cerámica esmaltada, color beige",
                stockMinimo: 80,
                tipoIVA: "10"
            },
            {
                idMaterial: 29,
                codbarra: "0983214567890",
                descripcion: "Chapa Galvanizada Ondulada",
                precio: 180000,
                stock: 25,
                unidad: "m",
                categoria: "techo",
                observaciones: "Chapas de 3 metros, galvanizada",
                stockMinimo: 15,
                tipoIVA: "10"
            },
            {
                idMaterial: 30,
                codbarra: "1094325678901",
                descripcion: "Cable Unifilar 4mm",
                precio: 95000,
                stock: 200,
                unidad: "m",
                categoria: "electricidad",
                observaciones: "Cable unifilar, color rojo",
                stockMinimo: 100,
                tipoIVA: "10"
            },
            {
                idMaterial: 31,
                codbarra: "2105436789012",
                descripcion: "Grava Fina",
                precio: 150000,
                stock: 60,
                unidad: "m3",
                categoria: "arena",
                observaciones: "Grava fina para mezclas",
                stockMinimo: 25,
                tipoIVA: "10"
            }
        ];
        
        localStorage.setItem("materiales", JSON.stringify(materiales));
    }
    
    // Datos de prueba para proveedores.
    let proveedores = [
        {
            idProveedor: 1,
            ruc: "12345670-9",
            razonsocial: "CONCRENORTE S.A.",
            direccion: "AV. PTE. FRANCO C/ VIRGEN DEL ROSARIO",
            telefono: "0331123456",
            correo_electronico: 'concrenor@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Proveedor principal de cemento",
            estado: true
        },
        {
            idProveedor: 2,
            ruc: "54003001-8",
            razonsocial: "FERRETERIA R. CARRILLO",
            direccion: "AV. MARISCAL LOPEZ",
            telefono: "0971102030",
            correo_electronico: 'rcarrillo@gmail.com',
            ciudad: "HORQUETA",
            observaciones: "Ferretería con gran variedad de productos",
            estado: true
        },
        {
            idProveedor: 3,
            ruc: "80123451-7",
            razonsocial: "TECHO S.R.L",
            direccion: "AV. RODRIGUEZ DE FRANCIA 1050",
            telefono: "0981302010",
            correo_electronico: 'techo@gmail.com',
            ciudad: "PEDRO JUAN CABALLERO",
            observaciones: "Especialista en materiales para techos",
            estado: true
        },
        {
            idProveedor: 4,
            ruc: "23456789-6",
            razonsocial: "DISTRIBUIDORA NORTE",
            direccion: "RUTA 5 KM 20",
            telefono: "0331456789",
            correo_electronico: 'distribuidora.norte@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Distribuidor de materiales de construcción",
            estado: true
        },
        {
            idProveedor: 5,
            ruc: "34567890-5",
            razonsocial: "HIERROS DEL NORTE",
            direccion: "AV. INDUSTRIAL 234",
            telefono: "0331567890",
            correo_electronico: 'hierros.norte@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Especialista en hierros y estructuras",
            estado: true
        },
        {
            idProveedor: 6,
            ruc: "45678901-4",
            razonsocial: "PINTURAS COLORMAX",
            direccion: "CALLE COMERCIO 456",
            telefono: "0331678901",
            correo_electronico: 'colormax@gmail.com',
            ciudad: "HORQUETA",
            observaciones: "Proveedor de pinturas y barnices",
            estado: true
        },
        {
            idProveedor: 7,
            ruc: "56789012-3",
            razonsocial: "MADERAS SELECCIONADAS",
            direccion: "ZONA INDUSTRIAL, LOTE 15",
            telefono: "0331789012",
            correo_electronico: 'maderas.seleccionadas@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Especialista en maderas de construcción",
            estado: true
        },
        {
            idProveedor: 8,
            ruc: "67890123-2",
            razonsocial: "PLOMERÍA EXPERT",
            direccion: "AV. SANITARISTA 789",
            telefono: "0331890123",
            correo_electronico: 'plomeria.expert@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Proveedor de materiales sanitarios",
            estado: true
        },
        {
            idProveedor: 9,
            ruc: "78901234-1",
            razonsocial: "CERAMICAS DEL SUR",
            direccion: "RUTA 3 KM 8",
            telefono: "0332901234",
            correo_electronico: 'ceramicas.sur@gmail.com',
            ciudad: "LORETO",
            observaciones: "Especialista en cerámicas y porcelanatos",
            estado: true
        },
        {
            idProveedor: 10,
            ruc: "89012345-0",
            razonsocial: "ELÉCTRICA PARAGUAYA",
            direccion: "AV. ELECTRICISTA 012",
            telefono: "0331012345",
            correo_electronico: 'electrica.paraguaya@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Proveedor de materiales eléctricos",
            estado: true
        },
        {
            idProveedor: 11,
            ruc: "90123456-9",
            razonsocial: "ARENA Y GRAVA LTDA",
            direccion: "PUERTO FLUVIAL",
            telefono: "0331123456",
            correo_electronico: 'arena.grava@gmail.com',
            ciudad: "CONCEPCIÓN",
            observaciones: "Proveedor de áridos y agregados",
            estado: true
        },
        {
            idProveedor: 12,
            ruc: "01234567-8",
            razonsocial: "TECHOS MODERNOS",
            direccion: "AV. CONSTRUCCIÓN 345",
            telefono: "0331234567",
            correo_electronico: 'techos.modernos@gmail.com',
            ciudad: "HORQUETA",
            observaciones: "Especialista en sistemas de techado",
            estado: false
        }
    ];

    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    // Datos de prueba para compras a proveedores.
    var comprascabecera = [
        {
            idcompra: 1,
            idproveedor: 1,
            numfactura: "001-001-0000001",
            feccompra: "2025-05-05",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 900000,
            totcompra: 900000,
            liqiva5: 0,
            liqiva10: 81818,
            totiva: 81818,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 2,
            idproveedor: 2,
            numfactura: "001-001-0000002",
            feccompra: "2025-05-10",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 500000,
            stiva10: 0,
            totcompra: 500000,
            liqiva5: 23810,
            liqiva10: 0,
            totiva: 23810,
            saldo: 500000,
            anulado: "NO"
        },
        {
            idcompra: 3,
            idproveedor: 3,
            numfactura: "001-001-0000003",
            feccompra: "2025-05-15",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 300000,
            totcompra: 300000,
            liqiva5: 0,
            liqiva10: 27272,
            totiva: 27272,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 4,
            idproveedor: 1,
            numfactura: "001-001-0000004",
            feccompra: "2025-05-20",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 200000,
            stiva10: 0,
            totcompra: 200000,
            liqiva5: 9524,
            liqiva10: 0,
            totiva: 9524,
            saldo: 200000,
            anulado: "NO"
        },
        {
            idcompra: 5,
            idproveedor: 2,
            numfactura: "001-001-0000005",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 6,
            idproveedor: 2,
            numfactura: "001-001-0000010",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 7,
            idproveedor: 2,
            numfactura: "001-001-0000022",
            feccompra: "2025-05-25",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 150000,
            totcompra: 150000,
            liqiva5: 0,
            liqiva10: 13636,
            totiva: 13636,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 8,
            idproveedor: 4,
            numfactura: "001-001-0000023",
            feccompra: "2025-06-01",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 800000,
            totcompra: 800000,
            liqiva5: 0,
            liqiva10: 72727,
            totiva: 72727,
            saldo: 800000,
            anulado: "NO"
        },
        {
            idcompra: 9,
            idproveedor: 5,
            numfactura: "001-001-0000024",
            feccompra: "2025-06-05",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 450000,
            totcompra: 450000,
            liqiva5: 0,
            liqiva10: 40909,
            totiva: 40909,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 10,
            idproveedor: 6,
            numfactura: "001-001-0000025",
            feccompra: "2025-06-08",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 300000,
            stiva10: 0,
            totcompra: 300000,
            liqiva5: 14286,
            liqiva10: 0,
            totiva: 14286,
            saldo: 300000,
            anulado: "NO"
        },
        {
            idcompra: 11,
            idproveedor: 7,
            numfactura: "001-001-0000026",
            feccompra: "2025-06-10",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 250000,
            totcompra: 250000,
            liqiva5: 0,
            liqiva10: 22727,
            totiva: 22727,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 12,
            idproveedor: 8,
            numfactura: "001-001-0000027",
            feccompra: "2025-06-12",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 600000,
            totcompra: 600000,
            liqiva5: 0,
            liqiva10: 54545,
            totiva: 54545,
            saldo: 600000,
            anulado: "NO"
        },
        {
            idcompra: 13,
            idproveedor: 9,
            numfactura: "001-001-0000028",
            feccompra: "2025-06-15",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 750000,
            totcompra: 750000,
            liqiva5: 0,
            liqiva10: 68182,
            totiva: 68182,
            saldo: 0,
            anulado: "NO"
        },
        {
            idcompra: 14,
            idproveedor: 10,
            numfactura: "001-001-0000029",
            feccompra: "2025-06-18",
            condicion: "CRÉDITO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 350000,
            totcompra: 350000,
            liqiva5: 0,
            liqiva10: 31818,
            totiva: 31818,
            saldo: 350000,
            anulado: "NO"
        },
        {
            idcompra: 15,
            idproveedor: 11,
            numfactura: "001-001-0000030",
            feccompra: "2025-06-20",
            condicion: "CONTADO",
            stexenta: 0,
            stiva5: 0,
            stiva10: 900000,
            totcompra: 900000,
            liqiva5: 0,
            liqiva10: 81818,
            totiva: 81818,
            saldo: 0,
            anulado: "NO"
        }
    ];

    var comprasdetalle = [
        {
            idcompradet: 1,
            idcompra: 1,
            item: 1,
            idmaterial: 2,
            cantidad: 10,
            preuni: 50000,
            tiva: 10,
            subtotal: 500000
        },
        {
            idcompradet: 2,
            idcompra: 1,
            item: 2,
            idmaterial: 1,
            cantidad: 8,
            preuni: 52000,
            tiva: 10,
            subtotal: 416000
        },
        {
            idcompradet: 3,
            idcompra: 2,
            item: 1,
            idmaterial: 3,
            cantidad: 5,
            preuni: 100000,
            tiva: 5,
            subtotal: 500000
        },
        {
            idcompradet: 4,
            idcompra: 3,
            item: 1,
            idmaterial: 4,
            cantidad: 10,
            preuni: 30000,
            tiva: 10,
            subtotal: 300000
        },
        {
            idcompradet: 5,
            idcompra: 4,
            item: 1,
            idmaterial: 5,
            cantidad: 4,
            preuni: 50000,
            tiva: 5,
            subtotal: 200000
        },
        {
            idcompradet: 6,
            idcompra: 5,
            item: 1,
            idmaterial: 6,
            cantidad: 3,
            preuni: 50000,
            tiva: 10,
            subtotal: 150000
        },
        {
            idcompradet: 7,
            idcompra: 8,
            item: 1,
            idmaterial: 22,
            cantidad: 15,
            preuni: 48000,
            tiva: 10,
            subtotal: 720000
        },
        {
            idcompradet: 8,
            idcompra: 9,
            item: 1,
            idmaterial: 24,
            cantidad: 3,
            preuni: 150000,
            tiva: 10,
            subtotal: 450000
        },
        {
            idcompradet: 9,
            idcompra: 10,
            item: 1,
            idmaterial: 25,
            cantidad: 3,
            preuni: 85000,
            tiva: 5,
            subtotal: 255000
        },
        {
            idcompradet: 10,
            idcompra: 11,
            item: 1,
            idmaterial: 26,
            cantidad: 7,
            preuni: 35000,
            tiva: 10,
            subtotal: 245000
        },
        {
            idcompradet: 11,
            idcompra: 12,
            item: 1,
            idmaterial: 27,
            cantidad: 7,
            preuni: 65000,
            tiva: 10,
            subtotal: 455000
        },
        {
            idcompradet: 12,
            idcompra: 13,
            item: 1,
            idmaterial: 28,
            cantidad: 15,
            preuni: 45000,
            tiva: 10,
            subtotal: 675000
        },
        {
            idcompradet: 13,
            idcompra: 14,
            item: 1,
            idmaterial: 30,
            cantidad: 3,
            preuni: 95000,
            tiva: 10,
            subtotal: 285000
        },
        {
            idcompradet: 14,
            idcompra: 15,
            item: 1,
            idmaterial: 31,
            cantidad: 5,
            preuni: 150000,
            tiva: 10,
            subtotal: 750000
        },
        {
            idcompradet: 15,
            idcompra: 15,
            item: 2,
            idmaterial: 23,
            cantidad: 1,
            preuni: 200000,
            tiva: 10,
            subtotal: 200000
        }
    ];

    localStorage.setItem("comprascabecera", JSON.stringify(comprascabecera));
    localStorage.setItem("comprasdetalle", JSON.stringify(comprasdetalle));

    // Datos de prueba para obras
    var obras = JSON.parse(localStorage.getItem("obras")) || [];
    if (obras.length === 0) {
        const obras = [
            {
                idObra: 1,
                nombre: "Casa Familiar López",
                direccion: "Avda. Brasil 123, Concepción",
                dimensiones: 180,
                fechaInicio: "2024-01-15",
                fechaFin: "2024-06-30",
                observaciones: 'En esta casa ocurrió el asesinato de John F. Kennedy',
                total: 1500000,
                pagos: [],
                estado: 'activo',
                idCliente: 8
            },
            {
                idObra: 2,
                nombre: "Edificio Rivas",
                direccion: "Calle Palma 456, Concepción",
                dimensiones: 950,
                fechaInicio: "2023-11-10",
                fechaFin: "2024-12-20",
                observaciones: '',
                total: 4500000,
                pagos: [],
                estado: 'activo',
                idCliente: 6
            },
            {
                idObra: 3,
                nombre: "Refacción Vivienda González",
                direccion: "Ruta 5 km 8, Horqueta",
                dimensiones: 320,
                fechaInicio: "2024-03-01",
                fechaFin: "",
                observaciones: '',
                total: 7450000,
                pagos: [],
                estado: 'activo',
                idCliente: 5
            },
            {
                idObra: 4,
                nombre: "Vivienda Social López",
                direccion: "Barrio San Luis, Concepción",
                dimensiones: 100,
                fechaInicio: "2024-04-05",
                fechaFin: "",
                observaciones: '',
                total: 2300000,
                pagos: [],
                estado: 'activo',
                idCliente: 8
            },
            {
                idObra: 5,
                nombre: "Estancia La Esperanza Vivienda",
                direccion: "Paso Barreto",
                dimensiones: 600,
                fechaInicio: "2023-09-18",
                fechaFin: "2024-05-10",
                observaciones: '',
                total: 1450000,
                pagos: [],
                estado: 'activo',
                idCliente: 10
            },
            {
                idObra: 6,
                nombre: "Refacción Hospital Regional",
                direccion: "Avda. Pinedo 1010, Concepción",
                dimensiones: 450,
                fechaInicio: "2024-02-20",
                fechaFin: "",
                observaciones: '',
                total: 450000,
                pagos: [],
                estado: 'activo',
                idCliente: 9
            },
            {
                idObra: 7,
                nombre: "Locales Comerciales El Trebol",
                direccion: "Ruta 5 y calle 12, Concepción",
                dimensiones: 780,
                fechaInicio: "2023-10-25",
                fechaFin: "2024-08-15",
                observaciones: '',
                total: 5000000,
                pagos: [],
                estado: 'activo',
                idCliente: 6
            },
            {
                idObra: 8,
                nombre: "Casa Moderna García",
                direccion: "Callejón Guaraní 234, Loreto",
                dimensiones: 210,
                fechaInicio: "2024-05-10",
                fechaFin: "",
                observaciones: '',
                total: 8100000,
                pagos: [],
                estado: 'activo',
                idCliente: 11
            },
            {
                idObra: 9,
                nombre: "Ampliación Deposito A - Fortificados",
                direccion: "B° San Antonio, Concepción",
                dimensiones: 160,
                fechaInicio: "2024-01-08",
                fechaFin: "2024-04-22",
                observaciones: '',
                total: 17899400,
                pagos: [],
                estado: 'activo',
                idCliente: 2
            },
            {
                idObra: 10,
                nombre: "Complejo Deportivo Juventud",
                direccion: "Barrio Itacurubí, Concepción",
                dimensiones: 1200,
                fechaInicio: "2023-12-01",
                fechaFin: "",
                observaciones: '',
                total: 1500000,
                pagos: [],
                estado: 'activo',
                idCliente: 1
            },
            {
                idObra: 11,
                nombre: "Vivienda Familiar Rodríguez",
                direccion: "Barrio San Pedro, Concepción",
                dimensiones: 220,
                fechaInicio: "2024-06-01",
                fechaFin: "",
                observaciones: 'Vivienda de dos plantas con garaje',
                total: 3200000,
                pagos: [],
                estado: 'activo',
                idCliente: 18
            },
            {
                idObra: 12,
                nombre: "Oficinas Comerciales Centro",
                direccion: "Av. Mcal. López 789, Concepción",
                dimensiones: 400,
                fechaInicio: "2024-04-15",
                fechaFin: "2024-10-30",
                observaciones: 'Edificio comercial de 3 plantas',
                total: 6500000,
                pagos: [],
                estado: 'activo',
                idCliente: 11
            },
            {
                idObra: 13,
                nombre: "Ampliación Cooperativa",
                direccion: "Av. Cooperativismo 456, Loreto",
                dimensiones: 300,
                fechaInicio: "2024-03-20",
                fechaFin: "",
                observaciones: 'Ampliación del salón principal',
                total: 2800000,
                pagos: [],
                estado: 'activo',
                idCliente: 16
            },
            {
                idObra: 14,
                nombre: "Refacción Panadería",
                direccion: "Calle Ygatimi 123, Concepción",
                dimensiones: 150,
                fechaInicio: "2024-05-01",
                fechaFin: "2024-07-15",
                observaciones: 'Modernización completa del local',
                total: 1800000,
                pagos: [],
                estado: 'activo',
                idCliente: 13
            },
            {
                idObra: 15,
                nombre: "Aulas Nuevas Escuela",
                direccion: "Av. Estudiantes 456, Concepción",
                dimensiones: 500,
                fechaInicio: "2024-02-10",
                fechaFin: "",
                observaciones: 'Construcción de 4 aulas nuevas',
                total: 4200000,
                pagos: [],
                estado: 'activo',
                idCliente: 14
            },
            {
                idObra: 16,
                nombre: "Galpón Almacén Central",
                direccion: "Calle Comercio 234, Concepción",
                dimensiones: 800,
                fechaInicio: "2024-01-05",
                fechaFin: "2024-08-20",
                observaciones: 'Galpón para depósito de mercadería',
                total: 3500000,
                pagos: [],
                estado: 'activo',
                idCliente: 17
            },
            {
                idObra: 17,
                nombre: "Terminales Transporte",
                direccion: "Terminal de Ómnibus, Concepción",
                dimensiones: 600,
                fechaInicio: "2024-07-01",
                fechaFin: "",
                observaciones: 'Modernización de terminales',
                total: 5500000,
                pagos: [],
                estado: 'activo',
                idCliente: 19
            },
            {
                idObra: 18,
                nombre: "Renovación Hotel Plaza",
                direccion: "Plaza Central, Concepción",
                dimensiones: 350,
                fechaInicio: "2024-03-15",
                fechaFin: "2024-09-30",
                observaciones: 'Renovación completa de habitaciones',
                total: 4800000,
                pagos: [],
                estado: 'activo',
                idCliente: 20
            },
            {
                idObra: 19,
                nombre: "Casa Moderna Velázquez",
                direccion: "Barrio Residencial, Concepción",
                dimensiones: 280,
                fechaInicio: "2024-04-01",
                fechaFin: "",
                observaciones: 'Casa con diseño moderno y piscina',
                total: 7200000,
                pagos: [],
                estado: 'activo',
                idCliente: 11
            },
            {
                idObra: 20,
                nombre: "Taller Mecánico Norte",
                direccion: "Ruta 5 Km 25, Concepción",
                dimensiones: 400,
                fechaInicio: "2024-05-15",
                fechaFin: "",
                observaciones: 'Taller especializado en vehículos pesados',
                total: 3800000,
                pagos: [],
                estado: 'activo',
                idCliente: 12
            }
        ];

        localStorage.setItem("obras", JSON.stringify(obras));
    }

    // Datos de prueba para asignación de materiales a obras
    var asignacionMaterialCabecera = JSON.parse(localStorage.getItem("asignacionMaterialCabecera")) || [];
    if (asignacionMaterialCabecera.length === 0) {
        const asignacionMaterialCabecera = [
            {
                idAsignacion: 1,
                idObra: 1,
                fechaAsignacion: '2025-05-25',
                totalPresupuesto: 3795000,
                usuario: 1,
                observaciones: 'Asignaciones correspondientes al presupuesto inicial proporcionado'
            },
            {
                idAsignacion: 2,
                idObra: 4,
                fechaAsignacion: '2024-04-05',
                totalPresupuesto: 2300000,
                usuario: 1,
                observaciones: 'Asignaciones para Vivienda Social López'
            },
            {
                idAsignacion: 3,
                idObra: 2,
                fechaAsignacion: '2023-11-10',
                totalPresupuesto: 4500000,
                usuario: 1,
                observaciones: 'Asignaciones para Edificio Rivas'
            },
            {
                idAsignacion: 4,
                idObra: 3,
                fechaAsignacion: '2024-03-01',
                totalPresupuesto: 7450000,
                usuario: 1,
                observaciones: 'Asignaciones para Refacción Vivienda González'
            },
            {
                idAsignacion: 5,
                idObra: 5,
                fechaAsignacion: '2023-09-18',
                totalPresupuesto: 1450000,
                usuario: 1,
                observaciones: 'Asignaciones para Estancia La Esperanza Vivienda'
            },
            {
                idAsignacion: 6,
                idObra: 6,
                fechaAsignacion: '2024-02-20',
                totalPresupuesto: 450000,
                usuario: 1,
                observaciones: 'Asignaciones para Refacción Hospital Regional'
            },
            {
                idAsignacion: 7,
                idObra: 7,
                fechaAsignacion: '2023-10-25',
                totalPresupuesto: 5000000,
                usuario: 1,
                observaciones: 'Asignaciones para Locales Comerciales El Trebol'
            },
            {
                idAsignacion: 8,
                idObra: 8,
                fechaAsignacion: '2024-05-10',
                totalPresupuesto: 8100000,
                usuario: 1,
                observaciones: 'Asignaciones para Casa Moderna García'
            },
            {
                idAsignacion: 9,
                idObra: 9,
                fechaAsignacion: '2024-01-08',
                totalPresupuesto: 17899400,
                usuario: 1,
                observaciones: 'Asignaciones para Ampliación Deposito A - Fortificados'
            },
            {
                idAsignacion: 10,
                idObra: 10,
                fechaAsignacion: '2023-12-01',
                totalPresupuesto: 1500000,
                usuario: 1,
                observaciones: 'Asignaciones para Complejo Deportivo Juventud'
            },
            {
                idAsignacion: 11,
                idObra: 11,
                fechaAsignacion: '2024-06-01',
                totalPresupuesto: 3200000,
                usuario: 1,
                observaciones: 'Asignaciones para Vivienda Familiar Rodríguez'
            },
            {
                idAsignacion: 12,
                idObra: 12,
                fechaAsignacion: '2024-04-15',
                totalPresupuesto: 6500000,
                usuario: 1,
                observaciones: 'Asignaciones para Oficinas Comerciales Centro'
            },
            {
                idAsignacion: 13,
                idObra: 13,
                fechaAsignacion: '2024-03-20',
                totalPresupuesto: 2800000,
                usuario: 1,
                observaciones: 'Asignaciones para Ampliación Cooperativa'
            },
            {
                idAsignacion: 14,
                idObra: 14,
                fechaAsignacion: '2024-05-01',
                totalPresupuesto: 1800000,
                usuario: 1,
                observaciones: 'Asignaciones para Refacción Panadería'
            },
            {
                idAsignacion: 15,
                idObra: 15,
                fechaAsignacion: '2024-02-10',
                totalPresupuesto: 4200000,
                usuario: 1,
                observaciones: 'Asignaciones para Aulas Nuevas Escuela'
            },
            {
                idAsignacion: 16,
                idObra: 16,
                fechaAsignacion: '2024-01-05',
                totalPresupuesto: 3500000,
                usuario: 1,
                observaciones: 'Asignaciones para Galpón Almacén Central'
            },
            {
                idAsignacion: 17,
                idObra: 17,
                fechaAsignacion: '2024-07-01',
                totalPresupuesto: 5500000,
                usuario: 1,
                observaciones: 'Asignaciones para Terminales Transporte'
            },
            {
                idAsignacion: 18,
                idObra: 18,
                fechaAsignacion: '2024-03-15',
                totalPresupuesto: 4800000,
                usuario: 1,
                observaciones: 'Asignaciones para Renovación Hotel Plaza'
            },
            {
                idAsignacion: 19,
                idObra: 19,
                fechaAsignacion: '2024-04-01',
                totalPresupuesto: 7200000,
                usuario: 1,
                observaciones: 'Asignaciones para Casa Moderna Velázquez'
            },
            {
                idAsignacion: 20,
                idObra: 20,
                fechaAsignacion: '2024-05-15',
                totalPresupuesto: 3800000,
                usuario: 1,
                observaciones: 'Asignaciones para Taller Mecánico Norte'
            },
        ]

        localStorage.setItem("asignacionMaterialCabecera", JSON.stringify(asignacionMaterialCabecera));
    }

    var asignacionMaterialDetalle = JSON.parse(localStorage.getItem("asignacionMaterialDetalle")) || [];
    if (asignacionMaterialDetalle.length === 0) {
        const asignacionMaterialDetalle = [
            // Detalles para Casa Familiar López (idAsignacion: 1)
            {
                idDetalle: 1,
                idAsignacion: 1,
                idMaterial: 9,
                cantidad: 500,
                subtotal: 1500000
            },
            {
                idDetalle: 2,
                idAsignacion: 1,
                idMaterial: 1, 
                cantidad: 10,
                subtotal: 520000
            },
            {
                idDetalle: 3,
                idAsignacion: 1,
                idMaterial: 3,
                cantidad: 5,
                subtotal: 900000
            },
            {
                idDetalle: 4,
                idAsignacion: 1,
                idMaterial: 5,
                cantidad: 35,
                subtotal: 875000
            },
            // Detalles para Vivienda Social López (idAsignacion: 2)
            {
                idDetalle: 5,
                idAsignacion: 2,
                idMaterial: 1,
                cantidad: 8,
                subtotal: 416000
            },
            {
                idDetalle: 6,
                idAsignacion: 2,
                idMaterial: 2,
                cantidad: 25,
                subtotal: 375000
            },
            {
                idDetalle: 7,
                idAsignacion: 2,
                idMaterial: 4,
                cantidad: 20,
                subtotal: 300000
            },
            {
                idDetalle: 8,
                idAsignacion: 2,
                idMaterial: 6,
                cantidad: 15,
                subtotal: 600000
            },
            // Detalles para Edificio Rivas (idAsignacion: 3)
            {
                idDetalle: 9,
                idAsignacion: 3,
                idMaterial: 1,
                cantidad: 50,
                subtotal: 2600000
            },
            {
                idDetalle: 10,
                idAsignacion: 3,
                idMaterial: 4,
                cantidad: 100,
                subtotal: 1500000
            },
            {
                idDetalle: 11,
                idAsignacion: 3,
                idMaterial: 7,
                cantidad: 25,
                subtotal: 1425000
            },
            {
                idDetalle: 12,
                idAsignacion: 3,
                idMaterial: 16,
                cantidad: 80,
                subtotal: 7600000
            },
            // Detalles para Refacción Vivienda González (idAsignacion: 4)
            {
                idDetalle: 13,
                idAsignacion: 4,
                idMaterial: 1,
                cantidad: 60,
                subtotal: 3120000
            },
            {
                idDetalle: 14,
                idAsignacion: 4,
                idMaterial: 5,
                cantidad: 80,
                subtotal: 2000000
            },
            {
                idDetalle: 15,
                idAsignacion: 4,
                idMaterial: 13,
                cantidad: 4,
                subtotal: 2492000
            },
            {
                idDetalle: 16,
                idAsignacion: 4,
                idMaterial: 18,
                cantidad: 200,
                subtotal: 29000000
            },
            // Detalles para Estancia La Esperanza Vivienda (idAsignacion: 5)
            {
                idDetalle: 17,
                idAsignacion: 5,
                idMaterial: 1,
                cantidad: 20,
                subtotal: 1040000
            },
            {
                idDetalle: 18,
                idAsignacion: 5,
                idMaterial: 10,
                cantidad: 600,
                subtotal: 960000
            },
            {
                idDetalle: 19,
                idAsignacion: 5,
                idMaterial: 26,
                cantidad: 30,
                subtotal: 1050000
            },
            // Detalles para Refacción Hospital Regional (idAsignacion: 6)
            {
                idDetalle: 20,
                idAsignacion: 6,
                idMaterial: 16,
                cantidad: 20,
                subtotal: 1900000
            },
            {
                idDetalle: 21,
                idAsignacion: 6,
                idMaterial: 25,
                cantidad: 15,
                subtotal: 1275000
            },
            // Detalles para Locales Comerciales El Trebol (idAsignacion: 7)
            {
                idDetalle: 22,
                idAsignacion: 7,
                idMaterial: 1,
                cantidad: 80,
                subtotal: 4160000
            },
            {
                idDetalle: 23,
                idAsignacion: 7,
                idMaterial: 8,
                cantidad: 40,
                subtotal: 3920000
            },
            {
                idDetalle: 24,
                idAsignacion: 7,
                idMaterial: 17,
                cantidad: 20,
                subtotal: 5700000
            },
            // Detalles para Casa Moderna García (idAsignacion: 8)
            {
                idDetalle: 25,
                idAsignacion: 8,
                idMaterial: 1,
                cantidad: 100,
                subtotal: 5200000
            },
            {
                idDetalle: 26,
                idAsignacion: 8,
                idMaterial: 16,
                cantidad: 150,
                subtotal: 14250000
            },
            {
                idDetalle: 27,
                idAsignacion: 8,
                idMaterial: 13,
                cantidad: 8,
                subtotal: 4984000
            },
            // Detalles para Ampliación Deposito A - Fortificados (idAsignacion: 9)
            {
                idDetalle: 28,
                idAsignacion: 9,
                idMaterial: 1,
                cantidad: 200,
                subtotal: 10400000
            },
            {
                idDetalle: 29,
                idAsignacion: 9,
                idMaterial: 8,
                cantidad: 80,
                subtotal: 7840000
            },
            {
                idDetalle: 30,
                idAsignacion: 9,
                idMaterial: 17,
                cantidad: 50,
                subtotal: 14250000
            },
            // Detalles para Complejo Deportivo Juventud (idAsignacion: 10)
            // Detalles para Complejo Deportivo Juventud (idAsignacion: 10)
            {
                idDetalle: 31,
                idAsignacion: 10,
                idMaterial: 1,
                cantidad: 25,
                subtotal: 1300000
            },
            {
                idDetalle: 32,
                idAsignacion: 10,
                idMaterial: 3,
                cantidad: 8,
                subtotal: 1440000
            },
            {
                idDetalle: 33,
                idAsignacion: 10,
                idMaterial: 25,
                cantidad: 20,
                subtotal: 1700000
            },
            // Detalles para Vivienda Familiar Rodríguez (idAsignacion: 11)
            {
                idDetalle: 34,
                idAsignacion: 11,
                idMaterial: 1,
                cantidad: 40,
                subtotal: 2080000
            },
            {
                idDetalle: 35,
                idAsignacion: 11,
                idMaterial: 16,
                cantidad: 50,
                subtotal: 4750000
            },
            {
                idDetalle: 36,
                idAsignacion: 11,
                idMaterial: 26,
                cantidad: 25,
                subtotal: 875000
            },
            // Detalles para Oficinas Comerciales Centro (idAsignacion: 12)
            {
                idDetalle: 37,
                idAsignacion: 12,
                idMaterial: 1,
                cantidad: 80,
                subtotal: 4160000
            },
            {
                idDetalle: 38,
                idAsignacion: 12,
                idMaterial: 28,
                cantidad: 100,
                subtotal: 4500000
            },
            {
                idDetalle: 39,
                idAsignacion: 12,
                idMaterial: 18,
                cantidad: 150,
                subtotal: 21750000
            },
            // Detalles para Ampliación Cooperativa (idAsignacion: 13)
            {
                idDetalle: 40,
                idAsignacion: 13,
                idMaterial: 1,
                cantidad: 30,
                subtotal: 1560000
            },
            {
                idDetalle: 41,
                idAsignacion: 13,
                idMaterial: 10,
                cantidad: 800,
                subtotal: 1280000
            },
            {
                idDetalle: 42,
                idAsignacion: 13,
                idMaterial: 29,
                cantidad: 15,
                subtotal: 2700000
            },
            // Detalles para Refacción Panadería (idAsignacion: 14)
            {
                idDetalle: 43,
                idAsignacion: 14,
                idMaterial: 28,
                cantidad: 40,
                subtotal: 1800000
            },
            {
                idDetalle: 44,
                idAsignacion: 14,
                idMaterial: 25,
                cantidad: 12,
                subtotal: 1020000
            },
            // Detalles para Aulas Nuevas Escuela (idAsignacion: 15)
            {
                idDetalle: 45,
                idAsignacion: 15,
                idMaterial: 1,
                cantidad: 60,
                subtotal: 3120000
            },
            {
                idDetalle: 46,
                idAsignacion: 15,
                idMaterial: 12,
                cantidad: 1000,
                subtotal: 4000000
            },
            {
                idDetalle: 47,
                idAsignacion: 15,
                idMaterial: 18,
                cantidad: 100,
                subtotal: 14500000
            },
            // Detalles para Galpón Almacén Central (idAsignacion: 16)
            {
                idDetalle: 48,
                idAsignacion: 16,
                idMaterial: 1,
                cantidad: 45,
                subtotal: 2340000
            },
            {
                idDetalle: 49,
                idAsignacion: 16,
                idMaterial: 8,
                cantidad: 30,
                subtotal: 2940000
            },
            {
                idDetalle: 50,
                idAsignacion: 16,
                idMaterial: 29,
                cantidad: 25,
                subtotal: 4500000
            },
            // Detalles para Terminales Transporte (idAsignacion: 17)
            {
                idDetalle: 51,
                idAsignacion: 17,
                idMaterial: 1,
                cantidad: 70,
                subtotal: 3640000
            },
            {
                idDetalle: 52,
                idAsignacion: 17,
                idMaterial: 16,
                cantidad: 120,
                subtotal: 11400000
            },
            {
                idDetalle: 53,
                idAsignacion: 17,
                idMaterial: 18,
                cantidad: 80,
                subtotal: 11600000
            },
            // Detalles para Renovación Hotel Plaza (idAsignacion: 18)
            {
                idDetalle: 54,
                idAsignacion: 18,
                idMaterial: 16,
                cantidad: 90,
                subtotal: 8550000
            },
            {
                idDetalle: 55,
                idAsignacion: 18,
                idMaterial: 25,
                cantidad: 30,
                subtotal: 2550000
            },
            {
                idDetalle: 56,
                idAsignacion: 18,
                idMaterial: 26,
                cantidad: 40,
                subtotal: 1400000
            },
            // Detalles para Casa Moderna Velázquez (idAsignacion: 19)
            {
                idDetalle: 57,
                idAsignacion: 19,
                idMaterial: 1,
                cantidad: 90,
                subtotal: 4680000
            },
            {
                idDetalle: 58,
                idAsignacion: 19,
                idMaterial: 16,
                cantidad: 180,
                subtotal: 17100000
            },
            {
                idDetalle: 59,
                idAsignacion: 19,
                idMaterial: 13,
                cantidad: 10,
                subtotal: 6230000
            },
            // Detalles para Taller Mecánico Norte (idAsignacion: 20)
            {
                idDetalle: 60,
                idAsignacion: 20,
                idMaterial: 1,
                cantidad: 50,
                subtotal: 2600000
            },
            {
                idDetalle: 61,
                idAsignacion: 20,
                idMaterial: 8,
                cantidad: 25,
                subtotal: 2450000
            },
            {
                idDetalle: 62,
                idAsignacion: 20,
                idMaterial: 18,
                cantidad: 60,
                subtotal: 8700000
            },
        ]

        localStorage.setItem("asignacionMaterialDetalle", JSON.stringify(asignacionMaterialDetalle));
    }

    // Datos de prueba para el movimiento de materiales
    var movimientoMaterialCabecera = JSON.parse(localStorage.getItem("movimientoMaterialCabecera")) || [];
    if (movimientoMaterialCabecera.length === 0) {
        const movimientoMaterialCabecera = [
            {
                idMovimiento: 1,
                fecha: "2025-05-24",
                tipoMovimiento:'EGRESO',
                origenObraId: '',   
                destinoObraId: 1,
                observaciones: '',
                usuario: 1
            },
            // Ejemplo de traslado de un material de la obra A a B
            // {
            //     idMovimiento: 2,
            //     fecha: "2025-05-24",
            //     tipoMovimiento: 'TRASLADO',
            //     origenObraId: A,
            //     destinoObraId: B,
            //     observaciones: 'Traslado de materiales sobrantes de A a B',
            //     usuario: 1
            // }
        ]

        localStorage.setItem('movimientoMaterialCabecera', JSON.stringify(movimientoMaterialCabecera));
    }

    var movimientoMaterialDetalle = JSON.parse(localStorage.getItem("movimientoMaterialDetalle")) || [];
    if (movimientoMaterialDetalle.length === 0) {
        const movimientoMaterialDetalle = [
            {
                idDetalle: 1,
                idMovimiento: 1,
                idMaterial: 9,
                cantidad: 500
            },
            {
                idDetalle: 2,
                idMovimiento: 1,
                idMaterial: 1,
                cantidad: 10
            },
            {
                idDetalle: 3,
                idMovimiento: 1,
                idMaterial: 3,
                cantidad: 5
            },
            {
                idDetalle: 4,
                idMovimiento: 1,
                idMaterial: 5,
                cantidad: 35
            },
        ]

        localStorage.setItem('movimientoMaterialDetalle', JSON.stringify(movimientoMaterialDetalle));
    }

    // Datos de prueba para facturas de clientes
    var facturasclientes = JSON.parse(localStorage.getItem("facturasclientes")) || [];
    if (facturasclientes.length === 0) {
        const facturasclientes = [
            {
                idfactura: 1,
                fecha: "2025-05-10",
                numfactura: "001-001-0000001",
                idCliente: 2,
                condicion: "CONTADO",
                total: 1500000,
                iva: 150000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 2,
                fecha: "2025-05-12",
                numfactura: "001-001-0000002",
                idCliente: 4,
                condicion: "CRÉDITO",
                total: 2500000,
                iva: 250000,
                saldo: 2500000,
                anulado: "NO",
                fechaVencimiento: "2025-06-11"
            },
            {
                idfactura: 3,
                fecha: "2025-05-15",
                numfactura: "001-001-0000003",
                idCliente: 1,
                condicion: "CONTADO",
                total: 900000,
                iva: 90000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 4,
                fecha: "2025-05-18",
                numfactura: "001-001-0000004",
                idCliente: 5,
                condicion: "CRÉDITO",
                total: 1800000,
                iva: 180000,
                saldo: 1800000,
                anulado: "NO",
                fechaVencimiento: "2025-06-17"
            },
            {
                idfactura: 5,
                fecha: "2025-05-20",
                numfactura: "001-001-0000005",
                idCliente: 3,
                condicion: "CONTADO",
                total: 1200000,
                iva: 120000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 6,
                fecha: "2025-05-22",
                numfactura: "001-001-0000006",
                idCliente: 6,
                condicion: "CRÉDITO",
                total: 3500000,
                iva: 350000,
                saldo: 3500000,
                anulado: "NO",
                fechaVencimiento: "2025-06-21"
            },
            {
                idfactura: 7,
                fecha: "2025-05-25",
                numfactura: "001-001-0000007",
                idCliente: 7,
                condicion: "CONTADO",
                total: 850000,
                iva: 85000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 8,
                fecha: "2025-05-28",
                numfactura: "001-001-0000008",
                idCliente: 9,
                condicion: "CRÉDITO",
                total: 2800000,
                iva: 280000,
                saldo: 2800000,
                anulado: "NO",
                fechaVencimiento: "2025-06-27"
            },
            {
                idfactura: 9,
                fecha: "2025-06-01",
                numfactura: "001-001-0000009",
                idCliente: 10,
                condicion: "CONTADO",
                total: 1650000,
                iva: 165000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 10,
                fecha: "2025-06-03",
                numfactura: "001-001-0000010",
                idCliente: 11,
                condicion: "CRÉDITO",
                total: 4200000,
                iva: 420000,
                saldo: 4200000,
                anulado: "NO",
                fechaVencimiento: "2025-07-02"
            },
            {
                idfactura: 11,
                fecha: "2025-06-05",
                numfactura: "001-001-0000011",
                idCliente: 12,
                condicion: "CONTADO",
                total: 2100000,
                iva: 210000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 12,
                fecha: "2025-06-08",
                numfactura: "001-001-0000012",
                idCliente: 13,
                condicion: "CRÉDITO",
                total: 1750000,
                iva: 175000,
                saldo: 1750000,
                anulado: "NO",
                fechaVencimiento: "2025-07-07"
            },
            {
                idfactura: 13,
                fecha: "2025-06-10",
                numfactura: "001-001-0000013",
                idCliente: 14,
                condicion: "CONTADO",
                total: 3200000,
                iva: 320000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 14,
                fecha: "2025-06-12",
                numfactura: "001-001-0000014",
                idCliente: 16,
                condicion: "CRÉDITO",
                total: 2900000,
                iva: 290000,
                saldo: 2900000,
                anulado: "NO",
                fechaVencimiento: "2025-07-11"
            },
            {
                idfactura: 15,
                fecha: "2025-06-15",
                numfactura: "001-001-0000015",
                idCliente: 17,
                condicion: "CONTADO",
                total: 1400000,
                iva: 140000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            }
        ];
        localStorage.setItem("facturasclientes", JSON.stringify(facturasclientes));
    }

    // Datos de prueba para detalle de facturas de clientes
    var detallefacturacliente = JSON.parse(localStorage.getItem("detallefacturacliente")) || [];
    if (detallefacturacliente.length === 0) {
        const detallefacturacliente = [
            // Factura 1
            {
                idfacturadet: 1,
                idfactura: 1,
                item: 1,
                idMaterial: 1,
                cantidad: 10,
                preuni: 52000,
                tiva: 10,
                subtotal: 520000
            },
            {
                idfacturadet: 2,
                idfactura: 1,
                item: 2,
                idMaterial: 3,
                cantidad: 5,
                preuni: 196000,
                tiva: 10,
                subtotal: 980000
            },
            // Factura 2
            {
                idfacturadet: 3,
                idfactura: 2,
                item: 1,
                idMaterial: 2,
                cantidad: 20,
                preuni: 50000,
                tiva: 10,
                subtotal: 1000000
            },
            {
                idfacturadet: 4,
                idfactura: 2,
                item: 2,
                idMaterial: 5,
                cantidad: 30,
                preuni: 50000,
                tiva: 10,
                subtotal: 1500000
            },
            // Factura 3
            {
                idfacturadet: 5,
                idfactura: 3,
                item: 1,
                idMaterial: 10,
                cantidad: 500,
                preuni: 1800,
                tiva: 5,
                subtotal: 900000
            },
            // Factura 4
            {
                idfacturadet: 6,
                idfactura: 4,
                item: 1,
                idMaterial: 6,
                cantidad: 20,
                preuni: 90000,
                tiva: 10,
                subtotal: 1800000
            },
            // Factura 5
            {
                idfacturadet: 7,
                idfactura: 5,
                item: 1,
                idMaterial: 12,
                cantidad: 300,
                preuni: 4000,
                tiva: 10,
                subtotal: 1200000
            },
            // Factura 6
            {
                idfacturadet: 8,
                idfactura: 6,
                item: 1,
                idMaterial: 13,
                cantidad: 2,
                preuni: 623000,
                tiva: 10,
                subtotal: 1246000
            },
            {
                idfacturadet: 9,
                idfactura: 6,
                item: 2,
                idMaterial: 14,
                cantidad: 50,
                preuni: 25000,
                tiva: 10,
                subtotal: 1250000
            },
            // Factura 7
            {
                idfacturadet: 10,
                idfactura: 7,
                item: 1,
                idMaterial: 15,
                cantidad: 10,
                preuni: 85000,
                tiva: 10,
                subtotal: 850000
            },
            // Factura 8
            {
                idfacturadet: 11,
                idfactura: 8,
                item: 1,
                idMaterial: 16,
                cantidad: 20,
                preuni: 95000,
                tiva: 10,
                subtotal: 1900000
            },
            {
                idfacturadet: 12,
                idfactura: 8,
                item: 2,
                idMaterial: 17,
                cantidad: 3,
                preuni: 285000,
                tiva: 10,
                subtotal: 855000
            },
            // Factura 9
            {
                idfacturadet: 13,
                idfactura: 9,
                item: 1,
                idMaterial: 18,
                cantidad: 100,
                preuni: 145000,
                tiva: 10,
                subtotal: 1450000
            },
            // Factura 10
            {
                idfacturadet: 14,
                idfactura: 10,
                item: 1,
                idMaterial: 19,
                cantidad: 50,
                preuni: 60000,
                tiva: 10,
                subtotal: 3000000
            },
            {
                idfacturadet: 15,
                idfactura: 10,
                item: 2,
                idMaterial: 20,
                cantidad: 1,
                preuni: 980000,
                tiva: 10,
                subtotal: 980000
            },
            // Factura 11
            {
                idfacturadet: 16,
                idfactura: 11,
                item: 1,
                idMaterial: 22,
                cantidad: 40,
                preuni: 48000,
                tiva: 10,
                subtotal: 1920000
            },
            // Factura 12
            {
                idfacturadet: 17,
                idfactura: 12,
                item: 1,
                idMaterial: 23,
                cantidad: 8,
                preuni: 200000,
                tiva: 10,
                subtotal: 1600000
            },
            // Factura 13
            {
                idfacturadet: 18,
                idfactura: 13,
                item: 1,
                idMaterial: 24,
                cantidad: 20,
                preuni: 150000,
                tiva: 10,
                subtotal: 3000000
            },
            // Factura 14
            {
                idfacturadet: 19,
                idfactura: 14,
                item: 1,
                idMaterial: 25,
                cantidad: 30,
                preuni: 85000,
                tiva: 10,
                subtotal: 2550000
            },
            // Factura 15
            {
                idfacturadet: 20,
                idfactura: 15,
                item: 1,
                idMaterial: 26,
                cantidad: 35,
                preuni: 35000,
                tiva: 10,
                subtotal: 1225000
            }
        ];
        localStorage.setItem("detallefacturacliente", JSON.stringify(detallefacturacliente));
    }

       // Datos de prueba para facturas de clientes
    var facturasclientes = JSON.parse(localStorage.getItem("facturasclientes")) || [];
    if (facturasclientes.length === 0) {
        facturasclientes = [
            {
                idfactura: 1,
                fecha: "2025-05-05",
                numfactura: "001-001-0000001",
                idCliente: 1,
                condicion: "CONTADO",
                total: 900000,
                iva: 81818,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 2,
                fecha: "2025-05-12",
                numfactura: "001-001-0000002",
                idCliente: 4,
                condicion: "CRÉDITO",
                total: 2500000,
                iva: 250000,
                saldo: 2500000,
                anulado: "NO",
                fechaVencimiento: "2025-06-11"
            },
            {
                idfactura: 3,
                fecha: "2025-05-15",
                numfactura: "001-001-0000003",
                idCliente: 1,
                condicion: "CONTADO",
                total: 900000,
                iva: 90000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 4,
                fecha: "2025-05-18",
                numfactura: "001-001-0000004",
                idCliente: 5,
                condicion: "CRÉDITO",
                total: 1800000,
                iva: 180000,
                saldo: 1800000,
                anulado: "NO",
                fechaVencimiento: "2025-06-17"
            },
            {
                idfactura: 5,
                fecha: "2025-05-20",
                numfactura: "001-001-0000005",
                idCliente: 3,
                condicion: "CONTADO",
                total: 1200000,
                iva: 120000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 6,
                fecha: "2025-05-22",
                numfactura: "001-001-0000006",
                idCliente: 6,
                condicion: "CRÉDITO",
                total: 3500000,
                iva: 350000,
                saldo: 3500000,
                anulado: "NO",
                fechaVencimiento: "2025-06-21"
            },
            {
                idfactura: 7,
                fecha: "2025-05-25",
                numfactura: "001-001-0000007",
                idCliente: 7,
                condicion: "CONTADO",
                total: 850000,
                iva: 85000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 8,
                fecha: "2025-05-28",
                numfactura: "001-001-0000008",
                idCliente: 9,
                condicion: "CRÉDITO",
                total: 2800000,
                iva: 280000,
                saldo: 2800000,
                anulado: "NO",
                fechaVencimiento: "2025-06-27"
            },
            {
                idfactura: 9,
                fecha: "2025-06-01",
                numfactura: "001-001-0000009",
                idCliente: 10,
                condicion: "CONTADO",
                total: 1650000,
                iva: 165000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 10,
                fecha: "2025-06-03",
                numfactura: "001-001-0000010",
                idCliente: 11,
                condicion: "CRÉDITO",
                total: 4200000,
                iva: 420000,
                saldo: 4200000,
                anulado: "NO",
                fechaVencimiento: "2025-07-02"
            },
            {
                idfactura: 11,
                fecha: "2025-06-05",
                numfactura: "001-001-0000011",
                idCliente: 12,
                condicion: "CONTADO",
                total: 2100000,
                iva: 210000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 12,
                fecha: "2025-06-08",
                numfactura: "001-001-0000012",
                idCliente: 13,
                condicion: "CRÉDITO",
                total: 1750000,
                iva: 175000,
                saldo: 1750000,
                anulado: "NO",
                fechaVencimiento: "2025-07-07"
            },
            {
                idfactura: 13,
                fecha: "2025-06-10",
                numfactura: "001-001-0000013",
                idCliente: 14,
                condicion: "CONTADO",
                total: 3200000,
                iva: 320000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            },
            {
                idfactura: 14,
                fecha: "2025-06-12",
                numfactura: "001-001-0000014",
                idCliente: 16,
                condicion: "CRÉDITO",
                total: 2900000,
                iva: 290000,
                saldo: 2900000,
                anulado: "NO",
                fechaVencimiento: "2025-07-11"
            },
            {
                idfactura: 15,
                fecha: "2025-06-15",
                numfactura: "001-001-0000015",
                idCliente: 17,
                condicion: "CONTADO",
                total: 1400000,
                iva: 140000,
                saldo: 0,
                anulado: "NO",
                fechaVencimiento: ""
            }
        ];
        localStorage.setItem("facturasclientes", JSON.stringify(facturasclientes));
    }

    // Datos de prueba para detalle de facturas de clientes
    var detallefacturacliente = JSON.parse(localStorage.getItem("detallefacturacliente")) || [];
    if (detallefacturacliente.length === 0) {
        const detallefacturacliente = [
            // Factura 1
            {
                idfacturadet: 1,
                idfactura: 1,
                item: 1,
                idMaterial: 2,
                cantidad: 10,
                preuni: 65000, 
                tiva: 10,
                subtotal: 650000
            },
            {
                idfacturadet: 2,
                idfactura: 1,
                item: 2,
                idMaterial: 3,
                cantidad: 5,
                preuni: 196000,
                tiva: 10,
                subtotal: 980000
            },
            {
                idfacturadet: 3,
                idfactura: 2,
                item: 1,
                idMaterial: 2,
                cantidad: 20,
                preuni: 50000,
                tiva: 10,
                subtotal: 1000000
            },
            {
                idfacturadet: 4,
                idfactura: 2,
                item: 2,
                idMaterial: 5,
                cantidad: 30,
                preuni: 50000,
                tiva: 10,
                subtotal: 1500000
            },
            {
                idfacturadet: 5,
                idfactura: 3,
                item: 1,
                idMaterial: 10,
                cantidad: 500,
                preuni: 1800,
                tiva: 5,
                subtotal: 900000
            },
            {
                idfacturadet: 6,
                idfactura: 4,
                item: 1,
                idMaterial: 6,
                cantidad: 20,
                preuni: 90000,
                tiva: 10,
                subtotal: 1800000
            },
            {
                idfacturadet: 7,
                idfactura: 5,
                item: 1,
                idMaterial: 12,
                cantidad: 300,
                preuni: 4000,
                tiva: 10,
                subtotal: 1200000
            }
        ];
        localStorage.setItem("detallefacturacliente", JSON.stringify(detallefacturacliente));
    }

    // Datos de prueba para pagos de mano de obra
    var pagoManoObra = JSON.parse(localStorage.getItem("pagoManoObra")) || [];
    if (pagoManoObra.length === 0) {
        const pagoManoObra = [
            // Mano de obra para Casa Familiar López (idObra: 1)
            {
                idPago: 1,
                idObra: 1,
                descripcion: "Albañilería estructura principal",
                monto: 1500000,
                fecha: "2025-05-25",
                trabajador: "Juan Pérez"
            },
            {
                idPago: 2,
                idObra: 1,
                descripcion: "Instalación eléctrica",
                monto: 800000,
                fecha: "2025-05-26",
                trabajador: "Carlos Rodríguez"
            },
            {
                idPago: 3,
                idObra: 1,
                descripcion: "Plomería",
                monto: 600000,
                fecha: "2025-05-27",
                trabajador: "Pedro Martínez"
            },
            // Mano de obra para Edificio Rivas (idObra: 2)
            {
                idPago: 4,
                idObra: 2,
                descripcion: "Estructura y columnas",
                monto: 2500000,
                fecha: "2023-11-15",
                trabajador: "Roberto Silva"
            },
            {
                idPago: 5,
                idObra: 2,
                descripcion: "Instalación eléctrica completa",
                monto: 1800000,
                fecha: "2024-02-10",
                trabajador: "Ana López"
            },
            {
                idPago: 6,
                idObra: 2,
                descripcion: "Acabados y terminaciones",
                monto: 1200000,
                fecha: "2024-05-20",
                trabajador: "Luis Fernández"
            },
            // Mano de obra para Refacción Vivienda González (idObra: 3)
            {
                idPago: 7,
                idObra: 3,
                descripcion: "Demolición y preparación",
                monto: 800000,
                fecha: "2024-03-05",
                trabajador: "Mario Gómez"
            },
            {
                idPago: 8,
                idObra: 3,
                descripcion: "Albañilería y refacciones",
                monto: 1500000,
                fecha: "2024-04-15",
                trabajador: "Carlos Benítez"
            },
            {
                idPago: 9,
                idObra: 3,
                descripcion: "Instalaciones nuevas",
                monto: 1100000,
                fecha: "2024-05-10",
                trabajador: "Diego Ramírez"
            },
            // Mano de obra para Vivienda Social López (idObra: 4)
            {
                idPago: 10,
                idObra: 4,
                descripcion: "Albañilería y terminaciones",
                monto: 900000,
                fecha: "2024-04-10",
                trabajador: "Miguel González"
            },
            {
                idPago: 11,
                idObra: 4,
                descripcion: "Instalación sanitaria",
                monto: 600000,
                fecha: "2024-04-15",
                trabajador: "Ana López"
            },
            {
                idPago: 12,
                idObra: 4,
                descripcion: "Techos y cubiertas",
                monto: 500000,
                fecha: "2024-04-20",
                trabajador: "José Medina"
            },
            // Mano de obra para Estancia La Esperanza Vivienda (idObra: 5)
            {
                idPago: 13,
                idObra: 5,
                descripcion: "Construcción básica",
                monto: 800000,
                fecha: "2023-10-01",
                trabajador: "Fernando Castro"
            },
            {
                idPago: 14,
                idObra: 5,
                descripcion: "Instalaciones rurales",
                monto: 400000,
                fecha: "2023-12-15",
                trabajador: "Raúl Vega"
            },
            // Mano de obra para Refacción Hospital Regional (idObra: 6)
            {
                idPago: 15,
                idObra: 6,
                descripcion: "Refacciones menores",
                monto: 300000,
                fecha: "2024-03-01",
                trabajador: "Pablo Núñez"
            },
            {
                idPago: 16,
                idObra: 6,
                descripcion: "Instalaciones especiales",
                monto: 400000,
                fecha: "2024-03-15",
                trabajador: "Sergio Ortega"
            },
            // Mano de obra para Locales Comerciales El Trebol (idObra: 7)
            {
                idPago: 17,
                idObra: 7,
                descripcion: "Estructura comercial",
                monto: 2000000,
                fecha: "2023-11-10",
                trabajador: "Alejandro Ruiz"
            },
            {
                idPago: 18,
                idObra: 7,
                descripcion: "Instalaciones comerciales",
                monto: 1500000,
                fecha: "2024-01-20",
                trabajador: "Gustavo Paredes"
            },
            {
                idPago: 19,
                idObra: 7,
                descripcion: "Terminaciones comerciales",
                monto: 1000000,
                fecha: "2024-04-10",
                trabajador: "Ricardo Molina"
            },
            // Mano de obra para Casa Moderna García (idObra: 8)
            {
                idPago: 20,
                idObra: 8,
                descripcion: "Estructura moderna",
                monto: 3000000,
                fecha: "2024-05-20",
                trabajador: "Fabián Torres"
            },
            {
                idPago: 21,
                idObra: 8,
                descripcion: "Instalaciones de lujo",
                monto: 2500000,
                fecha: "2024-06-15",
                trabajador: "Andrés Villamayor"
            },
            {
                idPago: 22,
                idObra: 8,
                descripcion: "Terminaciones premium",
                monto: 2000000,
                fecha: "2024-07-10",
                trabajador: "Marcelo Aquino"
            },
            // Mano de obra para Ampliación Deposito A - Fortificados (idObra: 9)
            {
                idPago: 23,
                idObra: 9,
                descripcion: "Estructura industrial",
                monto: 5000000,
                fecha: "2024-01-20",
                trabajador: "Hugo Britez"
            },
            {
                idPago: 24,
                idObra: 9,
                descripcion: "Instalaciones industriales",
                monto: 3500000,
                fecha: "2024-02-15",
                trabajador: "Esteban Morales"
            },
            {
                idPago: 25,
                idObra: 9,
                descripcion: "Sistemas especiales",
                monto: 2800000,
                fecha: "2024-03-10",
                trabajador: "Julio Centurión"
            },
            // Mano de obra para Complejo Deportivo Juventud (idObra: 10)
            {
                idPago: 26,
                idObra: 10,
                descripcion: "Construcción deportiva",
                monto: 1200000,
                fecha: "2023-12-15",
                trabajador: "Víctor Escobar"
            },
            {
                idPago: 27,
                idObra: 10,
                descripcion: "Instalaciones deportivas",
                monto: 800000,
                fecha: "2024-01-10",
                trabajador: "Néstor Cabrera"
            },
            {
                idPago: 28,
                idObra: 10,
                descripcion: "Terminaciones deportivas",
                monto: 600000,
                fecha: "2024-02-05",
                trabajador: "Oscar Villalba"
            },
            // Mano de obra para Vivienda Familiar Rodríguez (idObra: 11)
            {
                idPago: 29,
                idObra: 11,
                descripcion: "Construcción de dos plantas",
                monto: 1800000,
                fecha: "2024-06-10",
                trabajador: "Carlos Sánchez"
            },
            {
                idPago: 30,
                idObra: 11,
                descripcion: "Instalaciones completas",
                monto: 1200000,
                fecha: "2024-07-05",
                trabajador: "María Fernández"
            },
            // Mano de obra para Oficinas Comerciales Centro (idObra: 12)
            {
                idPago: 31,
                idObra: 12,
                descripcion: "Estructura comercial de 3 plantas",
                monto: 3000000,
                fecha: "2024-05-01",
                trabajador: "Roberto Acosta"
            },
            {
                idPago: 32,
                idObra: 12,
                descripcion: "Instalaciones especializadas",
                monto: 2200000,
                fecha: "2024-06-15",
                trabajador: "Elena Vargas"
            },
            // Mano de obra para Ampliación Cooperativa (idObra: 13)
            {
                idPago: 33,
                idObra: 13,
                descripcion: "Ampliación del salón",
                monto: 1400000,
                fecha: "2024-04-01",
                trabajador: "Javier Morales"
            },
            {
                idPago: 34,
                idObra: 13,
                descripcion: "Terminaciones cooperativa",
                monto: 800000,
                fecha: "2024-05-10",
                trabajador: "Patricia Luna"
            },
            // Mano de obra para Refacción Panadería (idObra: 14)
            {
                idPago: 35,
                idObra: 14,
                descripcion: "Modernización completa",
                monto: 900000,
                fecha: "2024-05-15",
                trabajador: "Manuel Torres"
            },
            {
                idPago: 36,
                idObra: 14,
                descripcion: "Instalaciones modernas",
                monto: 600000,
                fecha: "2024-06-01",
                trabajador: "Sofía Ramírez"
            },
            // Mano de obra para Aulas Nuevas Escuela (idObra: 15)
            {
                idPago: 37,
                idObra: 15,
                descripcion: "Construcción de 4 aulas",
                monto: 2500000,
                fecha: "2024-03-01",
                trabajador: "Daniel Prieto"
            },
            {
                idPago: 38,
                idObra: 15,
                descripcion: "Instalaciones educativas",
                monto: 1800000,
                fecha: "2024-04-15",
                trabajador: "Carmen Delgado"
            },
            // Mano de obra para Galpón Almacén Central (idObra: 16)
            {
                idPago: 39,
                idObra: 16,
                descripcion: "Estructura de galpón",
                monto: 1500000,
                fecha: "2024-02-01",
                trabajador: "Antonio Silva"
            },
            {
                idPago: 40,
                idObra: 16,
                descripcion: "Instalaciones de almacén",
                monto: 1000000,
                fecha: "2024-03-15",
                trabajador: "Isabel García"
            },
            // Mano de obra para Terminales Transporte (idObra: 17)
            {
                idPago: 41,
                idObra: 17,
                descripcion: "Modernización terminales",
                monto: 2800000,
                fecha: "2024-07-15",
                trabajador: "Federico López"
            },
            {
                idPago: 42,
                idObra: 17,
                descripcion: "Sistemas de transporte",
                monto: 2000000,
                fecha: "2024-08-10",
                trabajador: "Valeria Mendoza"
            },
            // Mano de obra para Renovación Hotel Plaza (idObra: 18)
            {
                idPago: 43,
                idObra: 18,
                descripcion: "Renovación habitaciones",
                monto: 2200000,
                fecha: "2024-04-01",
                trabajador: "Gustavo Pereira"
            },
            {
                idPago: 44,
                idObra: 18,
                descripcion: "Instalaciones hoteleras",
                monto: 1600000,
                fecha: "2024-05-20",
                trabajador: "Lorena Castro"
            },
            // Mano de obra para Casa Moderna Velázquez (idObra: 19)
            {
                idPago: 45,
                idObra: 19,
                descripcion: "Construcción moderna con piscina",
                monto: 3500000,
                fecha: "2024-04-15",
                trabajador: "Rodrigo Benítez"
            },
            {
                idPago: 46,
                idObra: 19,
                descripcion: "Terminaciones de lujo",
                monto: 2800000,
                fecha: "2024-06-01",
                trabajador: "Natalia Vera"
            },
            // Mano de obra para Taller Mecánico Norte (idObra: 20)
            {
                idPago: 47,
                idObra: 20,
                descripcion: "Construcción especializada",
                monto: 1800000,
                fecha: "2024-05-25",
                trabajador: "Héctor Romero"
            },
            {
                idPago: 48,
                idObra: 20,
                descripcion: "Instalaciones mecánicas",
                monto: 1400000,
                fecha: "2024-06-20",
                trabajador: "Claudia Espinoza"
            }
        ];
        localStorage.setItem("pagoManoObra", JSON.stringify(pagoManoObra));
    }

    var adelantosProveedores = JSON.parse(localStorage.getItem("adelantosProveedores")) || [];
    if (adelantosProveedores.length === 0) {
        const adelantosProveedores = [
            {
                idAdelanto: 1,
                idProveedor: 1,
                monto: 500000,
                fecha: "2024-01-15",
                concepto: "Adelanto para compra de cemento",
                formaPago: "transferencia",
                referencia: "TRF-001-2024",
                observaciones: "Adelanto para garantizar stock de cemento",
                estado: "activo",
                idusuario: 1,
                fechaRegistro: "2024-01-15T10:30:00"
            },
            {
                idAdelanto: 2,
                idProveedor: 2,
                monto: 750000,
                fecha: "2024-02-10",
                concepto: "Adelanto para materiales ferretería",
                formaPago: "efectivo",
                referencia: "",
                observaciones: "Adelanto para asegurar disponibilidad de herramientas",
                estado: "activo",
                idusuario: 5,
                fechaRegistro: "2024-02-10T14:15:00"
            },
            {
                idAdelanto: 3,
                idProveedor: 3,
                monto: 1200000,
                fecha: "2024-03-05",
                concepto: "Adelanto para materiales de techo",
                formaPago: "cheque",
                referencia: "CHQ-15678",
                observaciones: "Adelanto para proyecto casa moderna",
                estado: "aplicado",
                idusuario: 1,
                fechaRegistro: "2024-03-05T09:45:00"
            },
            {
                idAdelanto: 4,
                idProveedor: 5,
                monto: 900000,
                fecha: "2024-04-12",
                concepto: "Adelanto para hierros estructurales",
                formaPago: "transferencia",
                referencia: "TRF-045-2024",
                observaciones: "Adelanto para obra centro comercial",
                estado: "activo",
                idusuario: 3,
                fechaRegistro: "2024-04-12T11:20:00"
            },
            {
                idAdelanto: 5,
                idProveedor: 7,
                monto: 650000,
                fecha: "2024-05-08",
                concepto: "Adelanto para maderas especiales",
                formaPago: "deposito",
                referencia: "DEP-7890",
                observaciones: "Adelanto para terminaciones de lujo",
                estado: "activo",
                idusuario: 5,
                fechaRegistro: "2024-05-08T16:30:00"
            }
        ];
        localStorage.setItem("adelantosProveedores", JSON.stringify(adelantosProveedores));
    }

    
    var anticiposClientes = JSON.parse(localStorage.getItem("anticiposClientes")) || [];
    if (anticiposClientes.length === 0) {
        const anticiposClientes = [
            {
                idAnticipo: 1,
                idCliente: 1,
                monto: 2500000,
                fecha: "2024-01-20",
                concepto: "Anticipo para construcción casa familiar",
                formaPago: "transferencia",
                referencia: "TRF-CLI-001",
                observaciones: "Anticipo del 30% para iniciar obra",
                estado: "activo",
                idusuario: 1,
                fechaRegistro: "2024-01-20T08:30:00"
            },
            {
                idAnticipo: 2,
                idCliente: 3,
                monto: 5000000,
                fecha: "2024-02-15",
                concepto: "Anticipo para centro comercial",
                formaPago: "cheque",
                referencia: "CHQ-CLI-4567",
                observaciones: "Anticipo del 25% del total del proyecto",
                estado: "activo",
                idusuario: 3,
                fechaRegistro: "2024-02-15T10:15:00"
            },
            {
                idAnticipo: 3,
                idCliente: 5,
                monto: 1800000,
                fecha: "2024-03-10",
                concepto: "Anticipo para oficinas modernas",
                formaPago: "efectivo",
                referencia: "",
                observaciones: "Anticipo para gastos iniciales del proyecto",
                estado: "aplicado",
                idusuario: 5,
                fechaRegistro: "2024-03-10T14:45:00"
            },
            {
                idAnticipo: 4,
                idCliente: 7,
                monto: 3200000,
                fecha: "2024-04-05",
                concepto: "Anticipo para complejo residencial",
                formaPago: "transferencia",
                referencia: "TRF-CLI-789",
                observaciones: "Anticipo del 20% para iniciar trabajos",
                estado: "activo",
                idusuario: 1,
                fechaRegistro: "2024-04-05T09:20:00"
            },
            {
                idAnticipo: 5,
                idCliente: 2,
                monto: 1500000,
                fecha: "2024-05-12",
                concepto: "Anticipo para ampliación fábrica",
                formaPago: "deposito",
                referencia: "DEP-CLI-123",
                observaciones: "Anticipo para compra de materiales especiales",
                estado: "activo",
                idusuario: 3,
                fechaRegistro: "2024-05-12T13:10:00"
            },
            {
                idAnticipo: 6,
                idCliente: 4,
                monto: 2800000,
                fecha: "2024-06-18",
                concepto: "Anticipo para hospital regional",
                formaPago: "transferencia",
                referencia: "TRF-CLI-456",
                observaciones: "Anticipo del 35% del proyecto médico",
                estado: "activo",
                idusuario: 5,
                fechaRegistro: "2024-06-18T11:30:00"
            }
        ];
        localStorage.setItem("anticiposClientes", JSON.stringify(anticiposClientes));
    }

    
    var pagosProveedores = JSON.parse(localStorage.getItem("pagosProveedores")) || [];
    if (pagosProveedores.length === 0) {
        const pagosProveedores = [
            {
                idpago: 1,
                idproveedor: 1,
                fechapago: "2024-01-25",
                montopago: 2500000,
                formapago: "transferencia",
                referencia: "TRF-PAG-001",
                observaciones: "Pago de facturas pendientes de cemento",
                idusuario: 5,
                fechaRegistro: "2024-01-25T09:30:00"
            },
            {
                idpago: 2,
                idproveedor: 2,
                fechapago: "2024-02-15",
                montopago: 1800000,
                formapago: "cheque",
                referencia: "CHQ-7890",
                observaciones: "Pago por materiales de ferretería",
                idusuario: 1,
                fechaRegistro: "2024-02-15T14:20:00"
            },
            {
                idpago: 3,
                idproveedor: 5,
                fechapago: "2024-03-20",
                montopago: 3200000,
                formapago: "efectivo",
                referencia: "",
                observaciones: "Pago en efectivo por hierros estructurales",
                idusuario: 5,
                fechaRegistro: "2024-03-20T11:45:00"
            }
        ];
        localStorage.setItem("pagosProveedores", JSON.stringify(pagosProveedores));
    }

    
    var pagoDetalles = JSON.parse(localStorage.getItem("pagoDetalles")) || [];
    if (pagoDetalles.length === 0) {
        const pagoDetalles = [
            {
                iddetalle: 1,
                idpago: 1,
                numfactura: "001-001-0000123",
                montopagado: 1500000
            },
            {
                iddetalle: 2,
                idpago: 1,
                numfactura: "001-001-0000124",
                montopagado: 1000000
            },
            {
                iddetalle: 3,
                idpago: 2,
                numfactura: "002-002-0000056",
                montopagado: 1800000
            },
            {
                iddetalle: 4,
                idpago: 3,
                numfactura: "005-001-0000078",
                montopagado: 3200000
            }
        ];
        localStorage.setItem("pagoDetalles", JSON.stringify(pagoDetalles));
    }

    
    var cobrosClientes = JSON.parse(localStorage.getItem("cobrosClientes")) || [];
    if (cobrosClientes.length === 0) {
        const cobrosClientes = [
            {
                idcobro: 1,
                idcliente: 1,
                fechacobro: "2024-02-10",
                montocobro: 5000000,
                formacobro: "transferencia",
                referencia: "TRF-COB-001",
                observaciones: "Cobro por construcción casa familiar",
                idusuario: 1,
                fechaRegistro: "2024-02-10T10:15:00"
            },
            {
                idcobro: 2,
                idcliente: 3,
                fechacobro: "2024-03-15",
                montocobro: 8500000,
                formacobro: "cheque",
                referencia: "CHQ-CLI-9876",
                observaciones: "Cobro por avance centro comercial",
                idusuario: 5,
                fechaRegistro: "2024-03-15T13:30:00"
            },
            {
                idcobro: 3,
                idcliente: 5,
                fechacobro: "2024-04-20",
                montocobro: 3200000,
                formacobro: "efectivo",
                referencia: "",
                observaciones: "Cobro en efectivo por oficinas",
                idusuario: 3,
                fechaRegistro: "2024-04-20T16:45:00"
            }
        ];
        localStorage.setItem("cobrosClientes", JSON.stringify(cobrosClientes));
    }

    
    var cobroDetalles = JSON.parse(localStorage.getItem("cobroDetalles")) || [];
    if (cobroDetalles.length === 0) {
        const cobroDetalles = [
            {
                iddetalle: 1,
                idcobro: 1,
                idfactura: 1,
                numfactura: "001-001-0000001",
                montocobrado: 5000000
            },
            {
                iddetalle: 2,
                idcobro: 2,
                idfactura: 3,
                numfactura: "001-001-0000003",
                montocobrado: 8500000
            },
            {
                iddetalle: 3,
                idcobro: 3,
                idfactura: 5,
                numfactura: "001-001-0000005",
                montocobrado: 3200000
            }
        ];
        localStorage.setItem("cobroDetalles", JSON.stringify(cobroDetalles));
    }
}