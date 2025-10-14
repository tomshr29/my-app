import { tuyau } from '@/tuyau'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/create/animal')({
  component: RouteComponent,
})

interface Animal {
  name: string
  species: string
  age: number
  adopted: boolean
}

const defaultAnimal: Animal = {
  name: '',
  species: '',
  age: 0,
  adopted: false,
}

function RouteComponent() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: defaultAnimal,
    onSubmit: async ({ value }) => {
      try {
        const data = await tuyau.animals.$post(value).unwrap()
        navigate({
          to: '/demo/show/animal/$animalId',
          params: { animalId: data.id },
          replace: true,
        })
        form.reset()
      } catch (err) {
        console.error('Erreur:', err)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="mx-auto max-w-md space-y-4 p-4"
    >
      <div>
        <label htmlFor="name" className="block font-semibold">
          Nom:
        </label>
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? 'Required' : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="species" className="block font-semibold">
          Espèce:
        </label>
        <form.Field
          name="species"
          validators={{
            onChange: ({ value }) => (!value ? 'Required' : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="age" className="block font-semibold">
          Âge:
        </label>
        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) => (value < 0 ? 'Must be ≥ 0' : undefined),
          }}
          children={(field) => (
            <input
              id={field.name}
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
              className="w-full rounded border px-2 py-1"
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2">
        <form.Field
          name="adopted"
          children={(field) => (
            <>
              <input
                id={field.name}
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              <label htmlFor={field.name} className="font-semibold">
                Adopté
              </label>
            </>
          )}
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Créer
      </button>
    </form>
  )
}
