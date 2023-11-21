import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CryptocurrencyProvider from "../../app/Models/CryptocurrencyProvider";

export default class extends BaseSeeder {
  public async run () {
    await CryptocurrencyProvider.createMany([
      { name: 'CoinMarketCap' },
      { name: 'CoinGecko' },
    ])
  }
}
