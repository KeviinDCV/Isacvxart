-- =========================================
-- SOLUCIÓN DEFINITIVA - RLS POLICIES
-- =========================================
-- Este SQL arregla el error "permission denied for table users"
-- creando una función con permisos especiales
-- =========================================

-- PASO 1: Eliminar políticas antiguas
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Only admins can modify products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

-- PASO 2: Crear función helper con permisos especiales
-- Esta función PUEDE leer auth.users porque tiene SECURITY DEFINER
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

-- PASO 3: Crear políticas usando la función helper

-- Política 1: TODOS pueden VER productos activos (incluso sin login)
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (active = true);

-- Política 2: Solo ADMINS pueden INSERTAR productos
CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  WITH CHECK (is_admin());

-- Política 3: Solo ADMINS pueden ACTUALIZAR productos
CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- Política 4: Solo ADMINS pueden ELIMINAR productos
CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  USING (is_admin());

-- =========================================
-- ✅ LISTO! 
-- =========================================
-- Ahora CIERRA SESIÓN y vuelve a entrar
-- Después intenta crear un producto
-- =========================================

