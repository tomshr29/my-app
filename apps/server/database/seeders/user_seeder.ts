import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      id: 1,
      fullName: 'Tom Scherer',
      email: 'tomscherer29@gmail.com',
      password: '12345678',
    })
  }
}
