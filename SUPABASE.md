# 🔐 Guía Completa de Configuración de Supabase

## 📋 ¿Qué incluye esta implementación?

✅ **Autenticación con Email/Contraseña**
✅ **Autenticación con Google**
✅ **Verificación de email automática**
✅ **Protección de rutas**
✅ **Perfil de usuario**
✅ **Sistema de sesiones**
✅ **Reenvío de código de verificación**

---

## 🚀 Paso 1: Crear Proyecto en Supabase

### 1.1 Crear Cuenta
1. Ve a https://supabase.com
2. Haz clic en "Start your project"
3. Inicia sesión con GitHub (recomendado)

### 1.2 Crear Nuevo Proyecto
1. Crea una nueva organización (o usa una existente)
2. Haz clic en "New Project"
3. Completa los datos:
   - **Name**: `isacvxart` (o el nombre que prefieras)
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Elige el más cercano a tu ubicación
   - **Pricing Plan**: Free (500MB de DB, 50k usuarios)
4. Haz clic en "Create new project"
5. Espera 1-2 minutos mientras se crea el proyecto

---

## 🔑 Paso 2: Obtener las Claves API

### 2.1 Ir a Project Settings
1. En el dashboard, haz clic en el ícono de ⚙️ (Settings)
2. Ve a **API** en el menú lateral

### 2.2 Copiar las Claves
Necesitas copiar estas dos claves:

1. **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
2. **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.3 Crear archivo .env.local
En la raíz del proyecto, crea el archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE**: Reemplaza los valores con TUS claves reales.

---

## 📧 Paso 3: Configurar Email Templates

### 3.1 Ir a Authentication
1. En el dashboard, ve a **Authentication** (🔐 en el menú lateral)
2. Haz clic en **Email Templates**

### 3.2 Personalizar Template de Confirmación
Edita el template "Confirm signup":

```html
<h2>¡Bienvenido a Isacvxart! 🎨</h2>

<p>Hola,</p>

<p>Gracias por unirte a nuestra comunidad de arte digital.</p>

<p>Para completar tu registro y verificar tu email, haz clic en el siguiente enlace:</p>

<p><a href="{{ .ConfirmationURL }}">Verificar mi email</a></p>

<p>Este enlace expira en 24 horas.</p>

<p>Si no creaste esta cuenta, puedes ignorar este email.</p>

<p>¡Bienvenido!<br>
El equipo de Isacvxart</p>
```

### 3.3 Configurar URL de Redirección
En **Authentication → URL Configuration**:

- **Site URL**: `http://localhost:3000` (para desarrollo)
- **Redirect URLs**: Agrega:
  - `http://localhost:3000/auth/callback`
  - `https://tu-dominio.vercel.app/auth/callback` (para producción)

---

## 🔐 Paso 4: Configurar Autenticación con Google

### 4.1 Ir a Providers
1. **Authentication** → **Providers**
2. Busca **Google** y haz clic en él

### 4.2 Crear Proyecto en Google Cloud

#### a) Crear Proyecto
1. Ve a https://console.cloud.google.com
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre sugerido: "Isacvxart Auth"

#### b) Habilitar Google+ API
1. Ve a "APIs & Services" → "Library"
2. Busca "Google+ API"
3. Haz clic en "Enable"

#### c) Configurar OAuth Consent Screen
1. Ve a "APIs & Services" → "OAuth consent screen"
2. Selecciona **External**
3. Completa:
   - **App name**: Isacvxart
   - **User support email**: tu email
   - **Developer contact**: tu email
4. Guarda y continúa

#### d) Crear Credenciales OAuth
1. Ve a "APIs & Services" → "Credentials"
2. Haz clic en "Create Credentials" → "OAuth 2.0 Client ID"
3. Tipo: **Web application**
4. Nombre: "Isacvxart Web"
5. **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://tu-dominio.vercel.app`
6. **Authorized redirect URIs**:
   - `https://xxxxx.supabase.co/auth/v1/callback`
   
   ⚠️ Reemplaza `xxxxx` con tu Project ID de Supabase

7. Crea y **copia el Client ID y Client Secret**

### 4.3 Configurar en Supabase
1. Vuelve a Supabase → **Authentication** → **Providers** → **Google**
2. Activa el toggle "Enable Sign in with Google"
3. Pega:
   - **Client ID (for OAuth)**: El Client ID de Google
   - **Client Secret (for OAuth)**: El Client Secret de Google
4. Guarda

---

## ⚙️ Paso 5: Configurar Settings de Auth

### 5.1 General Settings
En **Authentication → Settings**:

#### Email Auth
- ✅ **Enable email signup** - Activado
- ✅ **Enable email confirmations** - Activado
- ⏱️ **Confirm email timeout**: 86400 (24 horas)

#### Password Requirements (opcional pero recomendado)
- Minimum password length: 6
- ✅ Require lowercase characters
- ✅ Require uppercase characters
- ✅ Require numbers

### 5.2 Rate Limiting (Seguridad)
- Email signups per hour: 50
- Password recovery per hour: 10
- Email confirmation per hour: 10

---

## 💻 Paso 6: Instalar Dependencias

```bash
npm install
```

Las dependencias ya están en el `package.json`:
- `@supabase/supabase-js`
- `@supabase/ssr`

---

## 🧪 Paso 7: Probar Localmente

### 7.1 Iniciar el Servidor
```bash
npm run dev
```

### 7.2 Probar Registro con Email
1. Ve a http://localhost:3000
2. Haz clic en "Registrarse"
3. Ingresa un email válido y contraseña
4. Revisa tu email (puede tardar 1-2 minutos)
5. Haz clic en el link de verificación

### 7.3 Probar Login con Google
1. Haz clic en "Continuar con Google"
2. Selecciona tu cuenta de Google
3. Deberías ser redirigido de vuelta autenticado

### 7.4 Verificar en Supabase
1. Ve a **Authentication** → **Users**
2. Deberías ver tu usuario registrado
3. Verifica que el email esté confirmado

---

## 🌐 Paso 8: Desplegar en Vercel

### 8.1 Agregar Variables de Entorno
En el dashboard de Vercel:

1. Ve a tu proyecto
2. **Settings** → **Environment Variables**
3. Agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`: Tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Tu anon key

### 8.2 Actualizar URLs en Supabase
1. **Authentication** → **URL Configuration**
2. Cambia/agrega:
   - **Site URL**: `https://tu-dominio.vercel.app`
   - **Redirect URLs**: `https://tu-dominio.vercel.app/auth/callback`

### 8.3 Actualizar Google OAuth
En Google Cloud Console:
1. Agrega tu dominio de Vercel a:
   - Authorized JavaScript origins
   - Authorized redirect URIs (la de Supabase NO cambia)

### 8.4 Desplegar
```bash
git add .
git commit -m "feat: add authentication with Supabase"
git push
```

Vercel desplegará automáticamente.

---

## 🔒 Seguridad

### ¿Es seguro?
✅ **SÍ**, porque:
- Las contraseñas se almacenan hasheadas
- Las claves anon son seguras para el frontend
- Supabase maneja la seguridad con Row Level Security (RLS)
- Las sesiones son JWT firmados

### ¿Qué NO hacer?
❌ **NUNCA** expongas la **service_role** key en el frontend
❌ **NUNCA** subas el archivo `.env.local` a Git
❌ **NUNCA** uses la misma contraseña de database en producción que en desarrollo

---

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Verifica que copiaste bien las claves
- Asegúrate de usar la **anon public** key, no la service_role

### No llega el email de verificación
- Revisa la carpeta de spam
- Verifica que el email template esté configurado
- Espera 2-3 minutos (puede tardar)
- Intenta con otro proveedor de email (Gmail suele funcionar mejor)

### Error con Google OAuth
- Verifica que la redirect URI en Google coincida EXACTAMENTE
- Asegúrate de habilitar Google+ API
- Espera 5-10 minutos después de configurar (Google puede tardar)

### "Email not confirmed"
- Es normal, el usuario debe verificar su email primero
- Usa el botón "Reenviar email de verificación" en el perfil

### Error en producción pero funciona en local
- Verifica las variables de entorno en Vercel
- Actualiza las URLs permitidas en Supabase
- Limpia el caché de Vercel (Deployments → ... → Redeploy)

---

## 📊 Base de Datos (Futuro)

### Crear Tablas Personalizadas
Si necesitas guardar más información:

```sql
-- Tabla de perfiles extendidos
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now()
);

-- Habilitar RLS
alter table profiles enable row level security;

-- Política: usuarios solo pueden ver/editar su propio perfil
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);
```

---

## 🎯 Siguientes Pasos

Una vez configurado:

1. ✅ **Personaliza los emails** con tu marca
2. ✅ **Crea tablas para tus productos** (si quieres almacenarlos en DB)
3. ✅ **Integra Stripe** para pagos
4. ✅ **Añade más providers** (GitHub, Facebook, etc.)
5. ✅ **Crea un panel de admin** usando Supabase Dashboard

---

## 🔗 Recursos Útiles

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] Variables de entorno configuradas en Vercel
- [ ] URLs de producción agregadas en Supabase
- [ ] Google OAuth configurado con dominio de producción
- [ ] Email templates personalizados
- [ ] Probado registro con email
- [ ] Probado login con Google
- [ ] Verificación de email funciona
- [ ] .env.local en .gitignore
- [ ] Rate limiting configurado

---

**¿Necesitas ayuda?** Consulta la documentación o contacta al soporte de Supabase.

¡Tu sistema de autenticación está listo! 🚀

