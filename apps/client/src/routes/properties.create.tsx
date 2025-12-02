import { tuyau } from '@/tuyau'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/properties/create')({
  component: RouteComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

interface Property {
  title: string
  description?: string
  price: number
  surface: number
  city: string
  available: boolean
}

const defaultProperty: Property = {
  title: '',
  description: '',
  price: 0,
  surface: 0,
  city: '',
  available: true,
}

function RouteComponent() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: defaultProperty,
    onSubmit: async ({ value }) => {
      try {
        const token = localStorage.getItem('auth-token')
        const data = await tuyau.properties
          .$post(value, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .unwrap()
        navigate({
          to: '/animals/$animalId',
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
        <form.Field
          name="title"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Title:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="description"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Description:</label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="price"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Price:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="surface"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Surface:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="city"
          children={(field) => (
            <>
              <label htmlFor={field.name}>City:</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </>
          )}
        />
      </div>
      <div>
        <form.Field
          name="available"
          children={(field) => (
            <>
              <label htmlFor={field.name}>Available:</label>
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
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
