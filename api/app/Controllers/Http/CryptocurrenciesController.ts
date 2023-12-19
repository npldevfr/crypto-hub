import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cryptocurrency from '../../Models/Cryptocurrency'

// import { schema, validator } from '@ioc:Adonis/Core/Validator'
export default class CryptocurrenciesController {

    //crud de la base de donnée des cryptocurrencies
    // list of Cryptocurrencies
    public async listCryptocurrencies() {
        return await Cryptocurrency.all()
    }
    //Add a new Cryptocurrency
    // public async newCryptocurrency({ request }: HttpContextContract): Promise<void> {
    //     const registerValidation = schema.create({
    //         slug: schema.string(),
    //         symbol: schema.string(),
    //         name: schema.string(),
    //         sequence: schema.number(),
    //         logo: schema.string()
    //     })
    //     const { slug, symbol, name, sequence, logo } = await validator.validate({
    //         schema: registerValidation,
    //         data: request.all(),
    //     })
    //     await Cryptocurrency.create({
    //         slug, symbol, name, sequence, logo
    //     })
    // }
    //Delete One Cryptocurrency

    // public async deleteCryptocurrency({ request }: HttpContextContract): Promise<void> {

    //     const cryptoToDelete = await Cryptocurrency.findBy('slug', request.slug)
    //     await cryptoToDelete.delete()
    // }

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
