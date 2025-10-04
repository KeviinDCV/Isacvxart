# 💳 Guía de Integración de Pagos - Isacvxart

## 🎯 Opciones de Pago Recomendadas

### 1. ⭐ Stripe (MÁS RECOMENDADO)

**Ventajas:**
- ✅ Muy fácil de integrar con Next.js
- ✅ Funciona perfectamente en Vercel
- ✅ Acepta tarjetas de crédito/débito
- ✅ Google Pay y Apple Pay integrados
- ✅ Gestión de suscripciones
- ✅ Dashboard completo para gestionar pagos
- ✅ Excelente documentación
- 💰 Costos: 2.9% + $0.30 por transacción

**Instalación:**
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

**Configuración Básica:**

1. **Variables de entorno** (`.env.local`):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

2. **Ejemplo de implementación**:

```typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const { items } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // en centavos
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get('origin')}/tienda`,
  })

  return NextResponse.json({ sessionId: session.id })
}
```

```typescript
// components/CheckoutButton.tsx
'use client'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutButton({ items }: { items: any[] }) {
  const handleCheckout = async () => {
    const stripe = await stripePromise
    
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    })
    
    const { sessionId } = await response.json()
    
    await stripe?.redirectToCheckout({ sessionId })
  }

  return (
    <button onClick={handleCheckout} className="w-full py-3 bg-black text-white rounded-xl">
      Pagar con Stripe
    </button>
  )
}
```

**Tutorial oficial:**
- https://stripe.com/docs/checkout/quickstart
- https://stripe.com/docs/payments/accept-a-payment

---

### 2. 💰 PayPal

**Ventajas:**
- ✅ Reconocido mundialmente
- ✅ Los usuarios pueden pagar sin tarjeta
- ✅ Buena integración con Next.js
- 💰 Costos: ~3.49% + tarifa fija

**Instalación:**
```bash
npm install @paypal/react-paypal-js
```

**Configuración:**

```typescript
// app/layout.tsx (añadir)
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

<PayPalScriptProvider options={{ 
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD"
}}>
  {children}
</PayPalScriptProvider>
```

```typescript
// components/PayPalButton.tsx
'use client'

import { PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPalButton({ amount }: { amount: number }) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toString(),
            },
          }],
        })
      }}
      onApprove={(data, actions) => {
        return actions.order!.capture().then((details) => {
          alert('Pago completado por ' + details.payer.name!.given_name)
        })
      }}
    />
  )
}
```

---

### 3. 🌎 Mercado Pago (Latinoamérica)

**Ventajas:**
- ✅ Popular en América Latina
- ✅ Múltiples métodos de pago locales
- ✅ Pagos en cuotas
- 💰 Costos: Varían por país

**Instalación:**
```bash
npm install @mercadopago/sdk-react
```

**Documentación:**
- https://www.mercadopago.com.mx/developers/es/docs

---

## 🚀 Pasos para Implementar Stripe (Recomendado)

### Paso 1: Crear cuenta en Stripe
1. Ir a https://stripe.com
2. Crear cuenta gratuita
3. Obtener claves API (modo test)

### Paso 2: Instalar dependencias
```bash
npm install stripe @stripe/stripe-js
```

### Paso 3: Configurar variables de entorno
```env
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
```

### Paso 4: Crear API route
```bash
# Crear carpeta
mkdir -p app/api/checkout
# Crear archivo
touch app/api/checkout/route.ts
```

### Paso 5: Integrar botón de pago
Añadir el componente CheckoutButton al CartDropdown.tsx

### Paso 6: Crear página de éxito
```typescript
// app/success/page.tsx
export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">¡Pago Exitoso! 🎉</h1>
        <p>Tu compra ha sido procesada correctamente</p>
      </div>
    </div>
  )
}
```

### Paso 7: Testing
- Usar tarjeta de prueba: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura
- CVC: Cualquier 3 dígitos

### Paso 8: Producción
1. Activar cuenta de Stripe (verificación de identidad)
2. Cambiar claves de test por claves de producción
3. Desplegar en Vercel

---

## 📝 Notas Importantes

### Seguridad
- ✅ NUNCA expongas la clave secreta de Stripe en el frontend
- ✅ Usa variables de entorno
- ✅ Las claves secretas solo deben estar en API routes (backend)
- ✅ Valida los pagos en el servidor

### Vercel
- ✅ Añade las variables de entorno en el dashboard de Vercel
- ✅ Settings → Environment Variables
- ✅ Añade para Production, Preview y Development

### Webhook (Avanzado)
Para confirmar pagos de forma segura:
```typescript
// app/api/webhook/route.ts
import { headers } from 'next/headers'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  if (event.type === 'checkout.session.completed') {
    // Guardar pedido en base de datos
    const session = event.data.object
    console.log('Pago completado:', session)
  }

  return new Response(JSON.stringify({ received: true }))
}
```

---

## 💡 Recomendación Final

**Para Isacvxart, recomiendo empezar con Stripe porque:**

1. ✅ Integración más simple y rápida
2. ✅ Mejor documentación y soporte
3. ✅ Funciona globalmente
4. ✅ UI/UX profesional
5. ✅ Test mode muy completo
6. ✅ Dashboard completo para gestión

**Tiempo estimado de implementación:** 2-3 horas

---

## 🔗 Recursos Útiles

- [Stripe Next.js Guide](https://stripe.com/docs/development/quickstart?lang=node)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [PayPal Developer](https://developer.paypal.com/)
- [Mercado Pago Docs](https://www.mercadopago.com.mx/developers)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**¿Necesitas ayuda con la implementación?**
Puedo ayudarte a integrar Stripe paso a paso en tu proyecto! 🚀

