import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cryptocurrency from '../../Models/Cryptocurrency'

import { schema, validator } from '@ioc:Adonis/Core/Validator'
export default class CryptocurrenciesController {

    //crud de la base de donnée des cryptocurrencies
    // list of Cryptocurrencies
    public async listCryptocurrencies() {
        return await Cryptocurrency.all()
    }
    // Add a new Cryptocurrency
    public async newCryptocurrency({ request, response }: HttpContextContract): Promise<void> {
        const existingCryptoVersion = await Cryptocurrency.findBy('slug', request.input('slug'))
        if (!existingCryptoVersion) {
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
        else {
            return response.ok({
                message: 'A Cryptocurrency already exist with this slug'
            })

        }
    }
    //Delete One Cryptocurrency

    public async deleteCryptocurrency({ request }: HttpContextContract) {

        const cryptoToDelete = await Cryptocurrency.findBy('slug', request.input('slug'))
        if (cryptoToDelete) {
            await cryptoToDelete.delete()
            return { message: 'Profile successfully deleted' }
        }
        else {
            return { message: 'Profile deletion failed' }
        }
    }

    //Update one Cryptocurrency
    public async updateCryptocurrency({ request }: HttpContextContract) {
        const cryptocurrency = await Cryptocurrency.findBy('slug', request.input('slug'))
        if (cryptocurrency) {

            try {
                cryptocurrency.slug = request.input('newSlug') ?? cryptocurrency.slug
                cryptocurrency.symbol = request.input('symbol') ?? cryptocurrency.symbol
                cryptocurrency.name = request.input('name') ?? cryptocurrency.name
                cryptocurrency.sequence = request.input('sequence') ?? cryptocurrency.sequence
                cryptocurrency.logo = request.input('logo') ?? cryptocurrency.logo
                cryptocurrency.updatedAt = Date.now()

                await cryptocurrency?.save()
                return { message: 'Profile updated successfully', cryptocurrency }
            } catch (error) {
                console.error('Profile update error:', error.message)
                return { message: 'Profile update failed' }
            }
        }
        else {
            return { message: 'No profile find with this slug' }
        }

    }

}
