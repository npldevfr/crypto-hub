import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from '../../app/Models/Tag'

export default class extends BaseSeeder {
  public async run () {
    await Tag.createMany([
      {name: 'Bitcoin' },
      {name: 'Ethereum' },
      {name: 'Tutoriel' },
      {name: 'Actualité' },
      {name: 'NFT' },
      {name: 'DeFi' },
      {name: 'Crypto' },
      {name: 'Blockchain' },
      {name: 'Altcoin' },
      {name: 'Trading' },
      {name: 'Analyse' },
      {name: 'Finance' },
      {name: 'Binance' },
      {name: 'Coinbase' },
      {name: 'Kraken' },
    ])
  }
}
