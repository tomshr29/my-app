import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * @index
   * @summary Welcome message
   * @responseBody 200 - { "message": "Welcome to the AdonisJS application!" }
   */
  public async index({ response }: HttpContext) {
    return response.json({
      message: 'Welcome to the AdonisJS application!',
    })
  }
}
