-- =========================================
-- ARREGLAR POLÍTICA DE UPDATE
-- =========================================
-- El problema es que UPDATE necesita USING y WITH CHECK
-- =========================================

-- Eliminar la política de UPDATE antigua
DROP POLICY IF EXISTS "Only admins can update products" ON products;

-- Crear la política correcta con USING y WITH CHECK
CREATE POLICY "Only admins can update products"
  ON products
  FOR UPDATE
  USING (is_admin())        -- Puede leer la fila
  WITH CHECK (is_admin());   -- Puede actualizar la fila

-- =========================================
-- ✅ LISTO! 
-- =========================================
-- Recarga la página e intenta actualizar de nuevo
-- =========================================

