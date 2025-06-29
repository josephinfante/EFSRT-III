# Employee Management System 🧑‍💼📊

Este proyecto es un sistema de gestión de empleados construido con Node.js, Express, Sequelize y MySQL. Permite registrar, listar, editar, eliminar y generar reportes de empleados con funcionalidades de exportación a Excel y PDF.

---

## 🧱 Requisitos Previos

Antes de levantar el proyecto asegúrate de tener instalado:

- Node.js (>= 16)
- MySQL Server
- npm o yarn
- Sequelize CLI (`npm install -g sequelize-cli`)

---

## ⚙️ Configuración de la Base de Datos

### 1. Crear la base de datos

Primero crea una base de datos en MySQL con el siguiente nombre:

```sql
CREATE DATABASE employee-management;
```

### 2. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con la siguiente configuración:

```env
# DATABASE VARIABLES
DB_NAME=employee-management
DB_USERNAME=root
DB_PASSWORD=12345678
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_POOL_SIZE_MIN=0
DB_POOL_SIZE_MAX=5
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
DB_POOL_LOGGING=false
```

---

## 🧪 Migrations y Seeders con Sequelize

### ⚠️ Consideraciones

- Para **generar** archivos (`migrations` o `seeders`), debes tener:

  - `NODE_ENV=development`
  - Así se crean en `src/` en lugar de `dist/`.

- Para **ejecutarlos**, debes primero **compilar** el proyecto (`npm run build`) y luego usar:
  - `NODE_ENV=production`
  - Sequelize CLI no soporta TypeScript directamente, por eso ejecuta sobre `dist`.

---

### 🛠️ Generar Migrations o Seeders

> Cambia el nombre entre `<>` por el nombre deseado.

```bash
# Crear una nueva migration
npm run migrate:generate --name <migration_name>

# Crear un nuevo seeder
npm run seed:generate --name <seed_name>
```

Después de generar los archivos `.js`, cambia la extensión a `.ts` y ajusta el código a TypeScript.

---

### 🔧 Ejecutar Migrations y Seeders

```bash
# Compilar el proyecto
npm run build
```

#### Ejecutar Migrations

```bash
npm run migrate:up               # Ejecuta todas las migrations
npm run migrate:up:to <name>     # Ejecuta hasta una migration específica

npm run migrate:undo:recent      # Revierte la última migration
npm run migrate:undo:to <name>   # Revierte hasta una migration específica
npm run migrate:undo             # Revierte todas las migrations
```

#### Ejecutar Seeders

```bash
npm run seed:up                  # Ejecuta todos los seeders
npm run seed:up:to <name>        # Ejecuta hasta un seeder específico

npm run seed:undo:recent         # Revierte el último seeder
npm run seed:undo:to <name>      # Revierte hasta un seeder específico
npm run seed:undo                # Revierte todos los seeders
```

---

## 🚀 Levantar el Servidor

### En desarrollo

```bash
npm run dev
```

### En producción

```bash
npm run build
NODE_ENV=production node dist/index.js
```

---

## 📁 Estructura del Proyecto

```
├── app.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── README.md
├── scripts
│   ├── create-migrations.ts
│   └── create-models.ts
├── src
│   ├── config
│   │   ├── environment.ts
│   │   └── sequelize-cli.ts
│   ├── connections
│   │   ├── redis.ts
│   │   └── sequelize.ts
│   ├── errors
│   │   ├── app-error.ts
│   │   ├── auth-error.ts
│   │   └── validation-error.ts
│   ├── interface
│   │   ├── departments.interface.ts
│   │   ├── employees.interface.ts
│   │   └── users.interface.ts
│   ├── middlewares
│   │   ├── auth-middleware.ts
│   │   ├── check-auth-middleware.ts
│   │   └── error-middleware.ts
│   ├── migrations
│   │   ├── 20250607034253-roles-model.ts
│   │   ├── 20250607034254-users-model.ts
│   │   ├── 20250607034255-departments-model.ts
│   │   ├── 20250607034256-employees-model.ts
│   │   └── 20250607034257-employee_history-model.ts
│   ├── models
│   │   ├── departments-model.ts
│   │   ├── employee_history-model.ts
│   │   ├── employees-model.ts
│   │   ├── roles-model.ts
│   │   └── users-model.ts
│   ├── modules
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.router.ts
│   │   │   └── auth.service.ts
│   │   ├── departments
│   │   │   ├── departments.controller.ts
│   │   │   ├── departments.router.ts
│   │   │   └── departments.service.ts
│   │   ├── employees
│   │   │   ├── employees.controller.ts
│   │   │   ├── employees.router.ts
│   │   │   └── employees.service.ts
│   │   └── users
│   │       ├── users.controller.ts
│   │       ├── users.router.ts
│   │       └── users.service.ts
│   ├── public
│   │   └── js
│   │       └── login.js
│   ├── router.ts
│   ├── server.ts
│   ├── types
│   │   ├── error-messages.e.ts
│   │   └── http-status.e.ts
│   ├── utils
│   │   ├── bcrypt.ts
│   │   ├── data-generator.ts
│   │   ├── jwt.ts
│   │   └── try-catch.ts
│   └── views
│       ├── add-new-department.ejs
│       ├── add-new-employee.ejs
│       ├── employees.ejs
│       ├── home.ejs
│       ├── login.ejs
│       ├── partials
│       │   ├── header.ejs
│       │   └── layout.ejs
│       └── users
│           ├── create.ejs
│           ├── detail.ejs
│           ├── edit.ejs
│           └── list.ejs
└── tsconfig.json
```

---

## 🧾 Funcionalidades

- CRUD de empleados
- Relación con departamentos
- Dashboard con métricas
- Exportar a Excel y PDF
- Gráficos de estadísticas

---

## 📬 Contacto

Si tienes dudas o sugerencias, no dudes en abrir un issue o contactarme.

---
