import Animal from '#models/animal'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Animal.createMany([
      { name: 'Buddy', species: 'Dog', age: 3, adopted: false },
      { name: 'Mittens', species: 'Cat', age: 2, adopted: true },
      { name: 'Charlie', species: 'Dog', age: 5, adopted: false },
      { name: 'Luna', species: 'Cat', age: 1, adopted: true },
      { name: 'Max', species: 'Dog', age: 4, adopted: false },
    ])
  }
}
