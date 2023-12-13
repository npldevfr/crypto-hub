import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cryptocurrency from '../../app/Models/Cryptocurrency'

export default class extends BaseSeeder {
  public async run () {
    await Cryptocurrency.createMany([
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        slug: 'bitcoin',
        sequence: 1,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        slug: 'ethereum',
        sequence: 2,
      },
      {
        symbol: 'XRP',
        name: 'Ripple',
        slug: 'ripple',
        sequence: 3,
      },
      {
        symbol: 'LTC',
        name: 'Litecoin',
        slug: 'litecoin',
        sequence: 4,
      },
      {
        symbol: 'BCH',
        name: 'Bitcoin Cash',
        slug: 'bitcoin-cash',
        sequence: 5,
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        slug: 'cardano',
        sequence: 6,
      },
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        slug: 'dogecoin',
        sequence: 7,
      },
      {
        symbol: 'DOT',
        name: 'Polkadot',
        slug: 'polkadot',
        sequence: 8,
      },
      {
        symbol: 'LINK',
        name: 'Chainlink',
        slug: 'chainlink',
        sequence: 9,
      },
      {
        symbol: 'XLM',
        name: 'Stellar',
        slug: 'stellar',
        sequence: 10,
      },
    ])
  }
}
