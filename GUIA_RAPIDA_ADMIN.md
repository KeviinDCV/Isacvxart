# 🎯 Guía Rápida - Sistema de Administración

## ✅ ¿Qué se implementó?

1. **✅ Sistema de Roles** - Usuarios admin vs usuarios normales
2. **✅ Panel de Administración** - Página en `/admin` para gestionar productos
3. **✅ CRUD Completo** - Crear, editar, eliminar y activar/desactivar productos
4. **✅ Integración con Supabase** - Todos los productos se almacenan en la base de datos
5. **✅ Protección de Rutas** - Solo admins pueden acceder al panel
6. **✅ Menú de Admin** - Enlace especial en el menú de usuario para admins

---

## 🚀 Pasos para Activar el Sistema

### **1️⃣ Configurar la Base de Datos en Supabase**

Ve a tu Supabase Dashboard → **SQL Editor** y ejecuta el siguiente código:

```sql
-- Crear tabla de productos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(active);

-- Habilitar RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver productos activos
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (active = true);

-- Política: Solo admins pueden modificar
CREATE POLICY "Only admins can modify products"
  ON products
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
```

### **2️⃣ Convertir tu Usuario en Administrador**

En el **SQL Editor** de Supabase, ejecuta (reemplaza con tu email):

```sql
UPDATE auth.users
SET raw_user_meta_data = 
  COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'keviindavid00@gmail.com';
```

### **3️⃣ (Opcional) Agregar Productos de Prueba**

Si quieres empezar con algunos productos:

```sql
INSERT INTO products (name, price, category, rating, reviews, description, stock) VALUES
('Paisaje Abstracto Digital', 29.90, 'Digital', 5.0, 12, 'Obra digital de paisaje abstracto con colores vibrantes', 10),
('Retrato Minimalista', 12.00, 'Ilustración', 5.0, 8, 'Retrato minimalista en blanco y negro', 15),
('Arte Conceptual Moderno', 29.90, 'Digital', 4.4, 10, 'Pieza de arte conceptual con elementos modernos', 8),
('Ilustración Botánica', 50.00, 'Ilustración', 4.8, 15, 'Ilustración detallada de elementos botánicos', 5);
```

---

## 🎨 Cómo Usar el Panel de Administración

### **Acceder al Panel**

1. **Inicia sesión** con tu cuenta de administrador
2. Haz clic en tu **avatar de usuario** (arriba a la derecha)
3. Verás un nuevo botón: **"Panel de Admin"** ⚡
4. Haz clic para acceder a `/admin`

### **Gestionar Productos**

#### **Crear un Producto:**
1. Haz clic en **"Nuevo Producto"**
2. Completa el formulario:
   - **Nombre**: Título del producto
   - **Precio**: En dólares (ej: 29.90)
   - **Stock**: Unidades disponibles
   - **Categoría**: Digital, Ilustración, Abstracto, etc.
   - **Descripción**: (Opcional) Describe el producto
   - **URL de Imagen**: (Opcional) Deja en blanco para usar emoji 🎨
3. Haz clic en **"Crear Producto"**

#### **Editar un Producto:**
1. En la tabla, haz clic en el ícono de **lápiz** ✏️
2. Modifica los campos que necesites
3. Haz clic en **"Actualizar"**

#### **Activar/Desactivar:**
1. Haz clic en el badge de **Estado** (Activo/Inactivo)
2. Los productos inactivos no se muestran en la tienda
3. Perfecto para ocultar productos sin eliminarlos

#### **Eliminar un Producto:**
1. Haz clic en el ícono de **basura** 🗑️
2. Confirma la eliminación
3. ⚠️ Esta acción **no se puede deshacer**

---

## 🔐 Seguridad Implementada

- ✅ **Row Level Security (RLS)** activado en Supabase
- ✅ Solo usuarios con rol `admin` pueden crear/editar/eliminar
- ✅ Usuarios normales solo pueden **ver** productos activos
- ✅ Protección de rutas en el frontend
- ✅ El panel `/admin` redirige a inicio si no eres admin

---

## 📊 Estructura de Roles

| Rol | Permisos |
|-----|----------|
| **Usuario Normal** | Ver productos activos, comprar, agregar al carrito |
| **Administrador** | Todo lo anterior + crear/editar/eliminar productos |

---

## 🌐 Despliegue en Vercel

Después de configurar Supabase:

1. Haz commit de los cambios:
   ```bash
   git add .
   git commit -m "feat: sistema de administración de productos"
   git push
   ```

2. Vercel se desplegará automáticamente

3. **Verifica las variables de entorno en Vercel:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🐛 Solución de Problemas

### "No puedo crear productos"
- ✅ Verifica que tu usuario tenga el rol `admin` en Supabase
- ✅ Ejecuta el SQL del paso 2 con tu email

### "No veo el botón Panel de Admin"
- ✅ Cierra sesión y vuelve a iniciar
- ✅ Verifica en Supabase que tu usuario tenga `role: admin` en `raw_user_meta_data`

### "Error al crear productos"
- ✅ Verifica que las políticas RLS estén creadas correctamente
- ✅ Revisa la consola del navegador (F12) para ver errores específicos

---

## 📝 Notas Importantes

1. **El primer producto que crees** reemplazará los productos de prueba
2. Los productos **sin imagen** usarán el emoji 🎨 por defecto
3. Los productos **inactivos** no se mostrarán en la tienda pública
4. El **rating y reviews** se establecen automáticamente al crear un producto

---

## 🎉 ¡Listo!

Ahora tienes control total sobre tu tienda. Puedes:
- ✅ Agregar nuevos productos en tiempo real
- ✅ Editar precios, stock y descripciones
- ✅ Ocultar productos sin eliminarlos
- ✅ Gestionar categorías

**¿Necesitas más ayuda?** Consulta el archivo `ADMIN_SETUP.md` para detalles técnicos.

