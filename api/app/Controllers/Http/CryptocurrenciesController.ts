import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cryptocurrency from '../../Models/Cryptocurrency'

import { schema, validator } from '@ioc:Adonis/Core/Validator'
export default class CryptocurrenciesController {

    //List of Cryptocurrencies
    public async index() {
        return await Cryptocurrency.all()
    }

    //Return one Cryptocurrency
    public async show({ response, request }: HttpContextContract) {
        try {
            return await Cryptocurrency.findByOrFail('slug', request.param('slug'));
        } catch (e) {
            response.notFound({ error: 'This slug is not affected to a Cryptocurrency' })
            return null
        }
    }

    //Add a new Cryptocurrency
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

    //Delete One Cryptocurrency
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
            response.notModified({ error: 'Cryptocurrency deletion failed' })
            return null
        }

    }

}
