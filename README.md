# 🎫 Sistema de Verificación de Tickets con QR - Business IT

Sistema completo de generación y verificación de códigos QR para eventos, desarrollado con **Power Apps**, **Power Automate** y **aplicación web pública**.

<img width="212" height="390" alt="image" src="https://github.com/user-attachments/assets/bb1360fb-9a1e-439e-9099-49896512f529" />
<img width="212" height="580" alt="image" src="https://github.com/user-attachments/assets/db920960-d0ff-454c-af9f-e6c8a3f88825" />
<img width="212" height="580" alt="image" src="https://github.com/user-attachments/assets/55609950-c27f-4e2b-8448-73c0749b9326" />
<img width="212" height="580" alt="image" src="https://github.com/user-attachments/assets/7edbc79c-fa6c-4084-9576-6f1416edc277" />

---

## 📋 Descripción

Sistema integral para la gestión de tickets con códigos QR que permite:
- ✅ Generar códigos QR únicos por usuario
- ✅ Controlar límites de generación por evento
- ✅ Verificar tickets mediante escaneo de QR
- ✅ Acceso público al escáner (sin necesidad de login)
- ✅ Panel administrativo para configuración

---

## 🚀 Características

### **Para Usuarios:**
- Generación de tickets QR personalizados
- Límite configurable por usuario
- Historial de tickets generados
- Descarga de códigos QR
- Visualización del estado (disponible/usado)

### **Para Administradores:**
- Configuración de límites globales
- Restablecimiento de contadores
- Gestión de usuarios autorizados al admin

### **Escáner Público:**
- Acceso sin autenticación
- Escaneo en tiempo real con cámara
- Verificación instantánea
- Marcado automático como usado
- Responsive (móvil y desktop)

---

## 🛠️ Tecnologías

- **Power Apps** - Aplicación móvil para generación de QR
- **Power Automate** - API para verificación y actualización
- **SharePoint** - Almacenamiento de datos
- **HTML5/CSS3/JavaScript** - Escáner web público
- **Html5-QRCode** - Librería de escaneo QR

---

## 📊 Arquitectura

```
┌─────────────────┐
│   Power Apps    │
│  (Generación)   │ ──────► SharePoint Lists
└─────────────────┘
                              │
                              ▼
┌─────────────────┐      ┌──────────────┐
│  Escáner Web    │ ───► │Power Automate│ ──► Verificación
│   (Público)     │      │    (API)     │     y actualización
└─────────────────┘      └──────────────┘
```

---

## 📁 Estructura del Proyecto

```
escanerTikectsBit/
├── index.html              # Página principal del escáner
├── estyles                 # Estilos (colores Business IT)
├── js                      # Lógica de escaneo y verificación
├── img/                    # Recursos visuales
│   ├── scanGif.gif        # Animación de escaneo
│   ├── entradas.png       # Icono de tickets
│   └── logo-business-it.png # Logo de la empresa
└── README.md              # Este archivo
```

---

## 🎨 Paleta de Colores Business IT

- **Verde Principal:** `#A3C243`
- **Gris Corporativo:** `#606161`
- **Fondo:** `#f0f0f0`
- **Blanco:** `#FFFFFF`

---

## ⚙️ Configuración

### **1. Configurar Power Automate Flow**

1. Crea un Flow con trigger "When an HTTP request is received"
2. Copia la URL generada
3. Edita `escaner.js` línea 9:

```javascript
const FLOW_URL = "TU_URL_DEL_FLOW_AQUI";
```

Reemplaza con tu URL:

```javascript
const FLOW_URL = "https://prod-XX.eastus.logic.azure.com:443/workflows/xxxxx...";
```
