import { useAuth } from '@/auth'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password)
        navigate({ to: '/dashboard' })
      } catch (error) {
        console.error(error)
      }
    },
  })

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        <div>
          <form.Field
            name="email"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Enter your email"
                  />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type={field.name}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="Enter your password"
                  />
                </>
              )
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
