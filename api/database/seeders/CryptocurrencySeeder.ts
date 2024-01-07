import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cryptocurrency from '../../app/Models/Cryptocurrency'

export default class extends BaseSeeder {
  public async run() {
    await Cryptocurrency.createMany([
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        slug: 'bitcoin',
        sequence: 1,
        logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        slug: 'ethereum',
        sequence: 2,
        logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      },
      {
        symbol: 'XRP',
        name: 'Ripple',
        slug: 'ripple',
        sequence: 3,
        logo: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      },
      {
        symbol: 'LTC',
        name: 'Litecoin',
        slug: 'litecoin',
        sequence: 4,
        logo: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
      },
      {
        symbol: 'BCH',
        name: 'Bitcoin Cash',
        slug: 'bitcoin-cash',
        sequence: 5,
        logo: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png',
      },
      {
        symbol: 'ADA',
        name: 'Cardano',
        slug: 'cardano',
        sequence: 6,
        logo: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      },
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        slug: 'dogecoin',
        sequence: 7,
        logo: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      },
      {
        symbol: 'DOT',
        name: 'Polkadot',
        slug: 'polkadot',
        sequence: 8,
        logo: 'https://assets.coingecko.com/coins/images/12171/large/aJGBjJFU_400x400.jpg',
      },
      {
        symbol: 'LINK',
        name: 'Chainlink',
        slug: 'chainlink',
        sequence: 9,
        logo: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      },
      {
        symbol: 'XLM',
        name: 'Stellar',
        slug: 'stellar',
        sequence: 10,
        logo: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
      },
    ])
  }
}
