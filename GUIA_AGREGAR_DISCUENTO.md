# Guía: Agregar Columna discount_price en Supabase

## Pasos para ejecutar el script SQL:

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. En el menú lateral, ve a **SQL Editor**
4. Haz clic en **New Query** (Nueva Consulta)
5. Copia y pega el siguiente código SQL:

```sql
ALTER TABLE products
ADD COLUMN IF NOT EXISTS discount_price NUMERIC(10, 2) DEFAULT NULL;

COMMENT ON COLUMN products.discount_price IS 'Precio con descuento del producto en COP. Si es NULL, el producto no tiene descuento.';
```

6. Haz clic en **Run** (Ejecutar) o presiona `Ctrl + Enter`
7. Deberías ver un mensaje de éxito confirmando que la columna fue agregada

## Verificación:

Después de ejecutar el script, puedes verificar que la columna existe ejecutando:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' AND column_name = 'discount_price';
```

Si la columna existe, verás un resultado con la información de la columna.

## Nota importante:

- El script usa `IF NOT EXISTS` así que es seguro ejecutarlo varias veces
- La columna acepta números con hasta 2 decimales (ej: 50000.50)
- El valor por defecto es NULL (sin descuento)
- Una vez agregada la columna, la funcionalidad de descuentos funcionará inmediatamente

