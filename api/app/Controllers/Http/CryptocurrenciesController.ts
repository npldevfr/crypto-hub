import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import Cryptocurrency from '../../Models/Cryptocurrency'

export default class CryptocurrenciesController {
    // crud de la base de donnée des cryptocurrencies

    /**
   * @swagger
   * /api/cryptocurrencies:
   *   get:
   *     tags:
   *       - Cryptocurrencies
   *     description: Get all Cryptocurrencies
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Cryptocurrency'
   */
    public async index() {
        return await Cryptocurrency.all()
    }

    /**
   * @swagger
   * /api/cryptocurrencies/{slug}:
   *   get:
   *     tags:
   *       - Cryptocurrencies
   *     description: Get details of a specific cryptocurrency
   *     parameters:
   *       - name: slug
   *         slug: path
   *         required: true
   *         schema:
   *           type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'This slug is not affected to a Cryptocurrency'
   */
    public async show({ response, request }: HttpContextContract) {
        try {
            return await Cryptocurrency.findByOrFail('slug', request.param('slug'));
        } catch (e) {
            response.notFound({ error: 'This slug is not affected to a Cryptocurrency' })
            return null
        }
    }

    /**
   * @swagger
   * /api/cryptocurrencies/create:
   *   post:
   *     tags:
   *       - Cryptocurrencies
   *     description: Create a cryptocurrency
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'A Cryptocurrency already exist with this slug'
   */
    public async create({ request, response }: HttpContextContract) {
        try {
            const registerValidation = schema.create({
                slug: schema.string(),
                symbol: schema.string(),
                name: schema.string(),
                sequence: schema.number(),
                logo: schema.string()
            })
            const { slug, symbol, name, sequence, logo } = await validator.validate({
                schema: registerValidation,
                data: request.all(),
            })
            const crypto = await Cryptocurrency.create({
                slug, symbol, name, sequence, logo
            })
            return response.ok({
                message: 'Cryptocurrency successfully created ',
                crypto,
            })
        }
        catch (e) {
            return response.notAcceptable({
                message: 'A Cryptocurrency already exist with this slug'
            })
        }
    }
    /**
   * @swagger
   * /api/cryptocurrencies/{slug}:
   *   delete:
   *     tags:
   *       - Cryptocurrencies
   *     description: Delete a specific cryptocurrency
   *     parameters:
   *       - name: slug
   *         slug: path
   *         required: true
   *         schema:
   *           type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *       406:
   *         description: Not Acceptable
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'Cryptocurrency deletion failed'
   */
    public async destroy({ request, response }: HttpContextContract) {
        try {
            const cryptoToDelete = await Cryptocurrency.findByOrFail('slug', request.param('slug'))
            await cryptoToDelete.delete()
            return response.ok({
                message: 'Cryptocurrency successfully deleted'
            })
        } catch (e) {
            response.notAcceptable({ error: 'Cryptocurrency deletion failed' })
            return null
        }
    }

    /**
   * @swagger
   * /api/cryptocurrencies/{slug}:
   *   put:
   *     tags:
   *       - Cryptocurrencies
   *     description: Create a cryptocurrency
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Cryptocurrency'
   *       304:
   *         description: Not Modified
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: 'Cryptocurrency updating failed'
   */
    //Update one Cryptocurrency
    public async update({ request, response }: HttpContextContract) {
        try {
            const cryptocurrency = await Cryptocurrency.findByOrFail('slug', request.param('slug'))
            cryptocurrency.slug = request.input('slug') ?? cryptocurrency.slug
            cryptocurrency.symbol = request.input('symbol') ?? cryptocurrency.symbol
            cryptocurrency.name = request.input('name') ?? cryptocurrency.name
            cryptocurrency.sequence = request.input('sequence') ?? cryptocurrency.sequence
            cryptocurrency.logo = request.input('logo') ?? cryptocurrency.logo
            cryptocurrency.updatedAt = Date.now()
            await cryptocurrency.save()
            return { message: 'Profile updated successfully', cryptocurrency }

        } catch (e) {
            response.notModified({ error: 'Cryptocurrency updating failed' })
            return null
        }

    }
}
