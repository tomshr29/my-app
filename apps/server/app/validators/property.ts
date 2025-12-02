import vine from '@vinejs/vine'

export const createPropertyValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).maxLength(255),
    description: vine.string().optional(),
    price: vine.number().min(0),
    surface: vine.number().min(1),
    city: vine.string().minLength(2).maxLength(255),
    available: vine.boolean().optional(),
  })
)

export const updateAnimalValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    species: vine.string().minLength(3).maxLength(255),
    age: vine.number().min(0).max(100),
    adopted: vine.boolean(),
  })
)
