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
- 🔐 Sistema de autenticación completo (Supabase)
- 👤 Login con Email/Contraseña y Google
- ✉️ Verificación de email automática
- 🔒 Protección de rutas
- 👥 Perfil de usuario

## 🔐 Configuración de Autenticación

Este proyecto usa **Supabase** para autenticación. Sigue la guía completa en [`SUPABASE.md`](./SUPABASE.md).

### Resumen Rápido:

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia las claves API
4. Crea el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

5. Configura Google OAuth (opcional, ver guía completa)
6. ¡Listo para usar!

**Características incluidas:**
- ✅ Registro con email y contraseña
- ✅ Login con Google
- ✅ Verificación de email automática con código
- ✅ Reenvío de email de verificación
- ✅ Perfil de usuario
- ✅ Protección de rutas
- ✅ Sesiones persistentes

📖 **Guía completa:** [`SUPABASE.md`](./SUPABASE.md)

---

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
│   ├── layout.tsx          # Layout con todos los providers
│   ├── page.tsx            # Página de inicio
│   ├── tienda/             # Página de tienda
│   ├── perfil/             # Página de perfil de usuario
│   ├── mis-compras/        # Página de historial de compras
│   ├── auth/
│   │   └── callback/       # Callback de autenticación
│   └── globals.css         # Estilos globales con animaciones
├── components/
│   ├── Header.tsx          # Encabezado con scroll compacto
│   ├── Hero.tsx            # Sección hero con búsqueda
│   ├── CategorySidebar.tsx # Sidebar de categorías
│   ├── ProductCard.tsx     # Tarjeta de producto con modal
│   ├── ProductGrid.tsx     # Grid de productos con filtrado
│   ├── ProductModal.tsx    # Modal de detalles de producto
│   ├── CartDropdown.tsx    # Dropdown del carrito
│   ├── SearchPopup.tsx     # Popup de búsqueda
│   ├── AuthModal.tsx       # Modal de login/registro
│   └── UserMenu.tsx        # Menú de usuario
├── context/
│   ├── AuthContext.tsx     # Estado global de autenticación
│   ├── CartContext.tsx     # Estado global del carrito
│   └── SearchContext.tsx   # Estado global de búsqueda
├── lib/
│   └── supabase.ts         # Cliente de Supabase
├── public/                 # Archivos estáticos
├── tailwind.config.ts      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias
```

## 🔧 Tecnologías

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Supabase** - Base de datos PostgreSQL + Autenticación
- **Lucide React** - Iconos modernos
- **React 18** - Biblioteca UI

## 📝 Notas de Desarrollo

- La aplicación usa el App Router de Next.js 14
- Todos los componentes son "use client" para interactividad
- El diseño es completamente responsivo
- Optimizado para SEO con metadata

## 🌐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase (REQUERIDO para autenticación)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (Opcional, para pagos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Ver [`SUPABASE.md`](./SUPABASE.md) para obtener las claves.

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

### 🛍️ E-Commerce
- [x] Carrito de compras funcional
- [x] Modal de detalles de producto con animaciones
- [x] Sistema de categorías y filtros
- [x] Agregar/remover productos del carrito
- [x] Buscador funcional con filtrado en tiempo real

### 🎨 UI/UX
- [x] Navbar con scroll compacto
- [x] Hero con imagen de fondo decorativa
- [x] Indicador visual de página activa en navbar
- [x] Animaciones sutiles y profesionales
- [x] Diseño monocromático elegante

### 🔐 Autenticación
- [x] Sistema completo de autenticación con Supabase
- [x] Registro con email y contraseña
- [x] Login con Google OAuth
- [x] Verificación de email con código
- [x] Reenvío de email de verificación
- [x] Perfil de usuario
- [x] Protección de rutas
- [x] Sistema de sesiones persistente

## 🚧 Próximas Funcionalidades

- [ ] Sistema de pagos (Stripe) - Ver [`PAGOS.md`](./PAGOS.md)
- [ ] Panel de administración para artistas
- [ ] Wishlist/Lista de deseos
- [ ] Filtros dinámicos activos (precio, categoría)
- [ ] Galería de imágenes con zoom
- [ ] Sistema de reseñas y comentarios
- [ ] Historial de compras real
- [ ] Notificaciones por email
- [ ] Reset de contraseña
- [ ] Edición de perfil

---

Desarrollado con ❤️ para artistas digitales

