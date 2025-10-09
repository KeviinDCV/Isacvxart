-- =========================================
-- ARREGLAR POLÍTICAS RLS DE PRODUCTOS
-- =========================================
-- Este script corrige el error de permisos
-- Ejecuta TODO este código en el SQL Editor de Supabase
-- =========================================

-- Paso 1: ELIMINAR políticas anteriores (si existen)
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Only admins can modify products" ON products;
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
DROP POLICY IF EXISTS "Only admins can update products" ON products;
DROP POLICY IF EXISTS "Only admins can delete products" ON products;

-- Paso 2: Crear política de LECTURA (SELECT) - para TODOS
-- Esta permite que cualquier persona (incluso sin login) vea productos activos
CREATE POLICY "Anyone can view active products"
  ON products
  FOR SELECT
  USING (active = true);

-- Paso 3: Crear política de INSERCIÓN (INSERT) - solo ADMINS
CREATE POLICY "Only admins can insert products"
  ON products
  FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Paso 4: Crear política de ACTUALIZACIÓN (UPDATE) - solo ADMINS
CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Paso 5: Crear política de ELIMINACIÓN (DELETE) - solo ADMINS
CREATE POLICY "Only admins can delete products"
  ON products
  FOR DELETE
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users
      WHERE raw_user_meta_data->>'role' = 'admin'
    )
  );

-- =========================================
-- ✅ LISTO! Las políticas están corregidas
-- =========================================
-- Ahora recarga tu app y debería funcionar

