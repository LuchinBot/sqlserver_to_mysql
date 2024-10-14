// Imports
import { Router } from 'express'
import { CrontabController } from '../controllers/crontab.js'

// Routes
export const crontabRouter = Router()

/**
 * @swagger
 * /truncate:
 *   get:
 *     summary: Truncar tablas
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Tablas truncadas
 */
//crontabRouter.get('/truncate', CrontabController.truncateTables)

/**
 * @swagger
 * /centrocosto:
 *   get:
 *     summary: Obtener centro de costo
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de centros de costo
 */
crontabRouter.get('/centrocosto', CrontabController.getCentroCosto)

/**
 * @swagger
 * /centrocosto/{fecth}/{limit}:
 *   get:
 *     summary: Obtener centro de costo con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de centros de costo
 */
crontabRouter.get(
  '/centrocosto/:fecth/:limit',
  CrontabController.getCentroCosto
)

/**
 * @swagger
 * /ubicacionfisica:
 *   get:
 *     summary: Obtener ubicación física
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de ubicaciones físicas
 */
crontabRouter.get('/ubicacionfisica', CrontabController.getUbicacionFisica)

/**
 * @swagger
 * /ubicacionfisica/{fecth}/{limit}:
 *   get:
 *     summary: Obtener ubicación física con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de ubicaciones físicas
 */
crontabRouter.get(
  '/ubicacionfisica/:fecth/:limit',
  CrontabController.getUbicacionFisica
)

/**
 * @swagger
 * /personal:
 *   get:
 *     summary: Obtener personal
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de personal
 */
crontabRouter.get('/personal', CrontabController.getPersonal)

/**
 * @swagger
 * /personal/{fecth}/{limit}:
 *   get:
 *     summary: Obtener personal con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de personal
 */
crontabRouter.get('/personal/:fecth/:limit', CrontabController.getPersonal)

/**
 * @swagger
 * /tipopatrimonio:
 *   get:
 *     summary: Obtener tipo de patrimonio
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de tipos de patrimonio
 */
crontabRouter.get('/tipopatrimonio', CrontabController.getTipoPatrimonio)

/**
 * @swagger
 * /tipopatrimonio/{fecth}/{limit}:
 *   get:
 *     summary: Obtener tipo de patrimonio con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de tipos de patrimonio
 */
crontabRouter.get(
  '/tipopatrimonio/:fecth/:limit',
  CrontabController.getTipoPatrimonio
)

/**
 * @swagger
 * /marca:
 *   get:
 *     summary: Obtener marcas
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de marcas
 */
crontabRouter.get('/marca', CrontabController.getMarca)

/**
 * @swagger
 * /marca/{fecth}/{limit}:
 *   get:
 *     summary: Obtener marcas con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de marcas
 */
crontabRouter.get('/marca/:fecth/:limit', CrontabController.getMarca)

/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Obtener grupos
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de grupos
 */
crontabRouter.get('/grupo', CrontabController.getGrupo)

/**
 * @swagger
 * /grupo/{fecth}/{limit}:
 *   get:
 *     summary: Obtener grupos con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de grupos
 */
crontabRouter.get('/grupo/:fecth/:limit', CrontabController.getGrupo)

/**
 * @swagger
 * /clase:
 *   get:
 *     summary: Obtener clases
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de clases
 */
crontabRouter.get('/clase', CrontabController.getClase)

/**
 * @swagger
 * /clase/{fecth}/{limit}:
 *   get:
 *     summary: Obtener clases con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de clases
 */
crontabRouter.get('/clase/:fecth/:limit', CrontabController.getClase)

/**
 * @swagger
 * /familia:
 *   get:
 *     summary: Obtener familias
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de familias
 */
crontabRouter.get('/familia', CrontabController.getFamilia)

/**
 * @swagger
 * /familia/{fecth}/{limit}:
 *   get:
 *     summary: Obtener familias con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de familias
 */
crontabRouter.get('/familia/:fecth/:limit', CrontabController.getFamilia)

/**
 * @swagger
 * /catalogo:
 *   get:
 *     summary: Obtener catálogo
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de elementos del catálogo
 */
crontabRouter.get('/catalogo', CrontabController.getCatalogo)

/**
 * @swagger
 * /catalogo/{fecth}/{limit}:
 *   get:
 *     summary: Obtener catálogo con paginación
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *     responses:
 *       200:
 *         description: Lista paginada de elementos del catálogo
 */
crontabRouter.get('/catalogo/:fecth/:limit', CrontabController.getCatalogo)

/**
 * @swagger
 * /asignar:
 *   get:
 *     summary: Obtener asignaciones
 *     tags:
 *        - Crontab
 *     responses:
 *       200:
 *         description: Lista de asignaciones
 */
crontabRouter.get('/asignar', CrontabController.getAsignar)

/**
 * @swagger
 * /asignar/{fecth}/{limit}/{dni}:
 *   get:
 *     summary: Obtener asignaciones con paginación y filtro por DNI
 *     tags:
 *        - Crontab
 *     parameters:
 *       - in: path
 *         name: fecth
 *         required: true
 *         schema:
 *           type: integer
 *         description: Índice inicial
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *         description: DNI del personal
 *     responses:
 *       200:
 *         description: Lista paginada de asignaciones filtradas por DNI
 */
crontabRouter.get('/asignar/:fecth/:limit/:dni', CrontabController.getAsignar)
