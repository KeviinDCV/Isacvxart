import { supabase } from './supabase'

export interface Product {
  id: string
  name: string
  price: number
  category: string
  rating: number
  reviews: number
  description?: string
  image_url?: string
  stock: number
  active: boolean
  created_at?: string
  updated_at?: string
}

export interface ProductFormData {
  name: string
  price: number
  category: string
  description?: string
  image_url?: string
  stock: number
  active?: boolean
}

// Obtener todos los productos activos (público)
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

// Obtener todos los productos (admin)
export async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all products:', error)
    return []
  }

  return data as Product[]
}

// Obtener un producto por ID
export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

// Crear un nuevo producto (admin)
export async function createProduct(product: ProductFormData) {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        ...product,
        rating: 5.0,
        reviews: 0,
        active: product.active ?? true,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating product:', error)
    throw error
  }

  return data as Product
}

// Actualizar un producto (admin)
export async function updateProduct(id: string, product: Partial<ProductFormData>) {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...product,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw error
  }

  return data as Product
}

// Eliminar un producto (admin)
export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }

  return true
}

// Alternar estado activo/inactivo (admin)
export async function toggleProductActive(id: string, active: boolean) {
  const { data, error } = await supabase
    .from('products')
    .update({ active, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error toggling product active:', error)
    throw error
  }

  return data as Product
}

