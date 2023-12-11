import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cryptocurrency from '../../app/Models/Cryptocurrency'

export default class extends BaseSeeder {
  public async run () {
    await Cryptocurrency.createMany([
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        slug: 'bitcoin',
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        slug: 'ethereum',
      },
      {
        symbol: 'XRP',
        name: 'Ripple',
        slug: 'ripple',
      },
      {
        symbol: 'LTC',
        name: 'Litecoin',
        slug: 'litecoin',
      },
      {
        symbol: 'BCH',
        name: 'Bitcoin Cash',
        slug: 'bitcoin-cash',
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        slug: 'cardano',
      },
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        slug: 'dogecoin',
      },
      {
        symbol: 'DOT',
        name: 'Polkadot',
        slug: 'polkadot',
      },
      {
        symbol: 'LINK',
        name: 'Chainlink',
        slug: 'chainlink',
      },
      {
        symbol: 'XLM',
        name: 'Stellar',
        slug: 'stellar',
      },
    ])
  }
}
