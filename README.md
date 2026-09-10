# Compás

Prototipo mobile-first de orientación financiera para negocios, presentado como una
capacidad de Compás integrada visualmente en Comerza. El caso de demostración acompaña
a Ernesto Matos desde la lectura de su barbería hasta la preparación simulada de una
evaluación de financiamiento.

## Ejecutar el proyecto

Requiere Node.js y Corepack. Desde la raíz del repositorio:

```bash
corepack pnpm install
corepack pnpm dev
```

Luego abre [http://localhost:3000](http://localhost:3000). En escritorio, la interfaz se
mantiene dentro de un lienzo móvil de 430 px; en un teléfono ocupa todo el ancho.

## Recorrido de la demostración

`Observar → Predecir → Evaluar → Elegir y configurar → Probar → Recomendar → Solicitar`

Desde `Simular`, el usuario puede evaluar cuatro necesidades con cifras y escenarios
demostrativos: abrir un local, comprar equipos, fortalecer capital de trabajo o convertir
facturas por cobrar en liquidez. Los casos que no aplican se detienen antes del stress test
y cualquier escenario con flujo negativo bloquea el paso de solicitud.

La aplicación usa datos y respuestas determinísticas en una sola ruta. No incluye APIs,
backend, persistencia, autenticación, scoring bancario ni envío de solicitudes. Todas las
precalificaciones, conexiones del ecosistema y confirmaciones se identifican como
simuladas y sujetas a evaluación de Banco Popular.

## Validar

```bash
corepack pnpm exec tsc --noEmit --incremental false
corepack pnpm build
git diff --check
```

Las descripciones generales de productos se basan en el
[catálogo empresarial de Banco Popular](https://popularenlinea.com/empresarial/Paginas/financiamiento/Default.aspx).
AVANCE se conserva únicamente como referencia contextual cuya vigencia debe validarse
antes de cualquier uso real.
