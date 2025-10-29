-- Agregar columna discount_price a la tabla products
-- Ejecuta este script en el SQL Editor de Supabase

ALTER TABLE products
ADD COLUMN IF NOT EXISTS discount_price NUMERIC(10, 2) DEFAULT NULL;

-- Comentario opcional para documentar la columna
COMMENT ON COLUMN products.discount_price IS 'Precio con descuento del producto en COP. Si es NULL, el producto no tiene descuento.';

