# PruebaIntegra
Prueba de app en angular

1.	Versión que utilizo para la creación del proyecto en Angular 13
2.	Creo el proyecto con: ng new ProyectoIntegra
3.	Ingreso a la carpeta. cd ProyectoIntegra
4.	Creo los módulos necesarios a utilizar: ng generate component Inicio y ng generate component Acercade
5.	Agrego lo que mostrare en src/app/about/about.component.html
6.	Agrego las rutas que se utilizaran en src/app/app-routing.module.ts
7.	Agrego angular material que se utilizará para el estilo ng add @angular/material para este proyecto utilizare Pink-bluegray
8.	Agrego el tema en src/styles.css
9.	Importo los módulos y componentes necesarios a utilizar en el proyecto en: src/app/app.module.ts
10.	Modifico el archivo que está en: src/app/app.component.html Borro todo su contenido que esta por defecto y coloco el código que utilizare para las vistas.
11.	Ahora genero un servicio para interactuar con la api rest: ng generate service data
12.	Modifico el archivo: src/app/data.service.ts para importar e inyectar httpclient
13.	Ahora puedo manipular el servicio desde los módulos. Agrego la inyección httpclien en: src/app/inicio/inicio.component.ts
14.	Empiezo a modificar la plantilla en: src/app/inicio/inicio.component.html para mostrar los datos gráficos solicitados.
15.	Ahora instalare las librerías necesarias para mostrar los gráficos con: 
npm install --save ng2-charts
npm install --save chart.js 
16.	Agrego la gráfica a la plantilla en: src/app/inicio/inicio.component.html 
17.	Le cargo los datos desde src/app/inicio/inicio.component.ts.
18.	Realizo la validación para que el historial tenga un rango de 1 hora.
