# 🔐 Configuración de Sistema de Administración

## Paso 1: Crear Tabla de Productos en Supabase

Ve a tu Supabase Dashboard → SQL Editor y ejecuta este SQL:

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

-- Crear índices para mejor rendimiento
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(active);

-- Habilitar RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Crear función helper para verificar si el usuario es admin
-- SECURITY DEFINER permite que la función lea auth.users
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (raw_user_meta_data->>'role') = 'admin',
      false
    )
    FROM auth.users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Política: Todos pueden VER productos activos (incluso usuarios anónimos)
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (active = true);

-- Política: Solo admins pueden INSERTAR productos
CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  WITH CHECK (is_admin());

-- Política: Solo admins pueden ACTUALIZAR productos
CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Política: Solo admins pueden ELIMINAR productos
CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  USING (is_admin());
```

## Paso 2: Agregar Campo de Rol a tu Usuario

Ejecuta este SQL para convertir tu usuario en administrador:

```sql
-- Reemplaza 'TU_EMAIL_AQUI' con tu email
UPDATE auth.users
SET raw_user_meta_data = 
  COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'TU_EMAIL_AQUI';
```

**Ejemplo:**
```sql
UPDATE auth.users
SET raw_user_meta_data = 
  COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'keviindavid00@gmail.com';
```

## Paso 3: Verificar tu Rol

```sql
SELECT email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE email = 'TU_EMAIL_AQUI';
```

Deberías ver algo como:
```
email                    | role
-------------------------|-------
keviindavid00@gmail.com | admin
```

## Paso 4: Insertar Productos de Prueba (Opcional)

```sql
INSERT INTO products (name, price, category, rating, reviews, description, stock) VALUES
('Paisaje Abstracto Digital', 29.90, 'Digital', 5.0, 12, 'Obra digital de paisaje abstracto con colores vibrantes', 10),
('Retrato Minimalista', 12.00, 'Ilustración', 5.0, 8, 'Retrato minimalista en blanco y negro', 15),
('Arte Conceptual Moderno', 29.90, 'Digital', 4.4, 10, 'Pieza de arte conceptual con elementos modernos', 8),
('Ilustración Botánica', 50.00, 'Ilustración', 4.8, 15, 'Ilustración detallada de elementos botánicos', 5),
('Composición Geométrica', 9.90, 'Abstracto', 5.0, 20, 'Composición con formas geométricas', 25),
('Arte Digital Premium', 34.10, 'Digital', 4.8, 18, 'Arte digital de alta calidad', 12),
('Ilustración Narrativa', 45.00, 'Ilustración', 4.9, 9, 'Ilustración que cuenta una historia', 7),
('Serie Abstracta Vol. 1', 19.90, 'Abstracto', 4.7, 14, 'Primera pieza de serie abstracta', 20),
('Retrato Expresivo', 39.00, 'Retrato', 5.0, 22, 'Retrato con alto contenido expresivo', 6);
```

## ✅ Listo!

Después de ejecutar estos pasos:
- ✅ Tendrás una tabla de productos en Supabase
- ✅ Tu usuario será administrador
- ✅ Podrás acceder al panel de administración en `/admin`
- ✅ Podrás crear, editar y eliminar productos

## 🔒 Seguridad

- Los usuarios normales **solo pueden ver** productos
- Solo los administradores pueden **crear, editar o eliminar** productos
- Las rutas de admin están protegidas en el frontend y backend

