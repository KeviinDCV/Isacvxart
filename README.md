# 🎨 Isacvxart - Galería de Arte Digital

Una tienda web moderna y elegante para vender arte digital y dibujos, con un diseño monocromático profesional.

## ✨ Características

- 🎨 Diseño monocromático elegante (negro, blanco, grises)
- 📱 Totalmente responsivo
- ⚡ Construido con Next.js 14 y TypeScript
- 🎯 Optimizado para Vercel
- 💅 Estilizado con Tailwind CSS
- 🛍️ Sistema de carrito de compras funcional
- 🛒 Agregar/remover productos del carrito
- 📦 Modal de producto con detalles completos
- 📊 Sistema de categorías y filtros
- ⭐ Calificaciones y reseñas de productos
- 🔍 Barra de búsqueda integrada
- 🎭 Navbar que se compacta al hacer scroll
- 📄 Páginas: Inicio, Tienda
- ✨ Animaciones sutiles en modales
- 🖼️ Hero con imagen de fondo decorativa

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Automático

1. Sube tu código a GitHub
2. Visita [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Vercel detectará automáticamente Next.js y configurará todo
5. ¡Haz clic en "Deploy"!

### Opción 2: Vercel CLI

```bash
# Instala Vercel CLI globalmente
npm i -g vercel

# Despliega desde la carpeta del proyecto
vercel

# Para producción
vercel --prod
```

## 🛠️ Instalación Local

1. **Instala las dependencias:**
```bash
npm install
```

2. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
```

3. **Abre tu navegador en:**
```
http://localhost:3000
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de código

## 🎨 Personalización

### Colores

Los colores están definidos en `tailwind.config.ts`. Para mantener el esquema monocromático, usa las escalas de grises definidas.

### Productos

Edita el array de productos en `components/ProductGrid.tsx` para añadir tus propias obras de arte.

### Categorías

Modifica las categorías en `components/CategorySidebar.tsx` según tus necesidades.

## 📁 Estructura del Proyecto

```
Isacvxart/
├── app/
│   ├── layout.tsx          # Layout principal con CartProvider
│   ├── page.tsx            # Página de inicio
│   ├── tienda/             # Página de tienda
│   └── globals.css         # Estilos globales con animaciones
├── components/
│   ├── Header.tsx          # Encabezado con scroll compacto
│   ├── Hero.tsx            # Sección hero
│   ├── CategorySidebar.tsx # Sidebar de categorías
│   ├── ProductCard.tsx     # Tarjeta de producto con modal
│   ├── ProductGrid.tsx     # Grid de productos
│   ├── ProductModal.tsx    # Modal de detalles de producto
│   └── CartDropdown.tsx    # Dropdown del carrito
├── context/
│   └── CartContext.tsx     # Estado global del carrito
├── public/                 # Archivos estáticos
├── tailwind.config.ts      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias
```

## 🔧 Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **React 18** - Biblioteca UI

## 📝 Notas de Desarrollo

- La aplicación usa el App Router de Next.js 14
- Todos los componentes son "use client" para interactividad
- El diseño es completamente responsivo
- Optimizado para SEO con metadata

## 🌐 Variables de Entorno

Si necesitas configurar variables de entorno, crea un archivo `.env.local`:

```env
# Ejemplo
NEXT_PUBLIC_API_URL=https://tu-api.com
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 💡 Funcionalidades Implementadas

- [x] Carrito de compras funcional
- [x] Modal de detalles de producto con animaciones
- [x] Navbar con scroll compacto
- [x] Páginas de navegación (Inicio, Tienda)
- [x] Sistema de categorías y filtros
- [x] Agregar/remover productos del carrito
- [x] Hero con imagen de fondo decorativa
- [x] Indicador visual de página activa en navbar

## 🚧 Próximas Funcionalidades

- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Autenticación de usuarios
- [ ] Panel de administración para artistas
- [ ] Wishlist/Lista de deseos
- [ ] Sistema de búsqueda funcional
- [ ] Filtros dinámicos activos
- [ ] Galería de imágenes con zoom
- [ ] Sistema de reseñas y comentarios
- [ ] Perfil de usuario editable

---

Desarrollado con ❤️ para artistas digitales

