import Property from '#models/property'
import { createPropertyValidator, updateAnimalValidator } from '#validators/property'
import type { HttpContext } from '@adonisjs/core/http'

export default class PropertiesController {
  /**
   * @list
   * @summary List all animals
   * @responseBody 200 - <Animal[]>
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async list({ response }: HttpContext) {
    const properties = await Property.query().preload('user')
    return response.json(properties)
  }

  /**
   * @show
   * @summary Show a single animal by ID
   * @paramPath id - Describe the id param - @type(number) - @required
   * @responseBody 200 - <Animal>
   * @responseBody 404 - { "message": "Row not found" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async show({ params, response }: HttpContext) {
    const property = await Property.findOrFail(params.id)
    return response.json(property)
  }

  /**
   * @create
   * @summary Create a new animal
   * @requestBody <createAnimalValidator>
   * @responseBody 201 - <Animal>
   * @responseBody 422 - { "errors": [{ "message": "The age field must be defined.", "rule": "required", "field": "age"}]}
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async create({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(createPropertyValidator)
    const property = await Property.create({ ...payload, userId: auth.user?.id })
    return response.status(201).json(property)
  }

  /**
   * @update
   * @summary Update an existing animal by ID
   * @paramPath id - Describe the id param - @type(number) - @required
   * @requestBody <updateAnimalValidator>
   * @responseBody 200 - <Animal>
   * @responseBody 404 - { "message": "Row not found" }
   * @responseBody 422 - { "errors": [{ "message": "The age field must be defined.", "rule": "required", "field": "age"}]}
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateAnimalValidator)
    const animal = await Animal.findOrFail(params.id)
    animal.merge(payload)
    await animal.save()
    return response.json(animal)
  }

  /**
   * @delete
   * @summary Delete an animal by ID
   * @paramPath id - Describe the id param - @type(number) - @required
   * @responseBody 204 - No Content
   * @responseBody 404 - { "message": "Row not found" }
   * @responseBody 500 - { "message": "Internal server error" }
   */
  public async delete({ params, response }: HttpContext) {
    const animal = await Animal.findOrFail(params.id)
    await animal.delete()
    return response.status(204).noContent()
  }

  public async mine({ auth, response }: HttpContext) {
    if (!auth.user) {
      return response.unauthorized({ message: 'User not logged in' })
    }
    const animals = await Property.query().where('user_id', auth.user.id)
    return response.ok(animals)
  }
}
