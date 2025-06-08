# TechnovaApp

**TechnovaApp** es una aplicación web desarrollada con Angular que permite a los usuarios gestionar tareas personales y visualizar estadísticas a través de un panel gráfico moderno.

## Características principales

- **Gestión de tareas:** Crea, edita y elimina tareas de manera sencilla.
- **Filtros dinámicos:** Filtra tus tareas por estado y prioridad.
- **Panel de estadísticas:** Visualiza el progreso de tus tareas con gráficos interactivos.
- **Autenticación:** Acceso seguro para cada usuario.
- **Interfaz amigable:** Diseño responsivo y atractivo.

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/technova-project.git
   cd technova-project
   ```

2. **Instala las dependencias principales:**
   ```bash
   npm install
   ```

3. **Instala las dependencias para gráficos (OBLIGATORIO):**
   > ⚠️ **IMPORTANTE:** Para que los gráficos funcionen correctamente, ejecuta:
   ```bash
   npm install ng2-charts@4.0.1 chart.js@3.9.1 --legacy-peer-deps
   ```

---

## Servidor de desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```bash
ng serve
```

Luego abre tu navegador en [http://localhost:4200/](http://localhost:4200/).  
La aplicación se recargará automáticamente al guardar los archivos.

---

## Generación de componentes

Angular CLI permite crear componentes fácilmente. Por ejemplo:

```bash
ng generate component nombre-componente
```

Para ver todos los esquemas disponibles:

```bash
ng generate --help
```

---

## Compilar el proyecto

Para compilar la aplicación para producción:

```bash
ng build
```

Los archivos generados estarán en la carpeta `dist/`.

---

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Karma](https://karma-runner.github.io):

```bash
ng test
```

---

## Pruebas end-to-end

Para pruebas end-to-end (e2e):

```bash
ng e2e
```

---

## Recursos adicionales

- [Documentación Angular CLI](https://angular.dev/tools/cli)
- [ng2-charts](https://valor-software.com/ng2-charts/)
- [Chart.js](https://www.chartjs.org/)

---
Nota: No está integrado a una base de datos, por lo que solo se guardan localmente las acciones realizadas en la página web.



## Créditos

Gracias a los integrantes del grupo por llevar a cabo con exito este trabajo, Nicolás Campos, Ignacio Santamaría y Marcelo Muñoz

**¡Gracias por usar TechnovaApp! Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue o pull request.**
