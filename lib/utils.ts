/**
 * Formatea un número como precio en pesos colombianos (COP)
 * @param price - Precio a formatear
 * @param options - Opciones de formateo
 * @returns String formateado (ej: "$ 50.000")
 */
export function formatPriceCOP(price: number | null | undefined, options?: {
  showCurrency?: boolean
  decimals?: number
}): string {
  if (price === null || price === undefined || isNaN(price)) {
    return options?.showCurrency !== false ? '$ 0' : '0'
  }

  const showCurrency = options?.showCurrency !== false
  const decimals = options?.decimals ?? 0

  // Formatear con separadores de miles y decimales (formato colombiano)
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price)

  return showCurrency ? `$ ${formatted}` : formatted
}

