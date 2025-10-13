import vine from '@vinejs/vine'

export const createAnimalValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    species: vine.string().minLength(3).maxLength(255),
    age: vine.number().min(0).max(100),
    adopted: vine.boolean(),
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
