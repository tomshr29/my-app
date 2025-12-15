import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { useAuth } from '@/auth'
import { getProfile, updateProfile } from '@/api/profile'

export const Route = createFileRoute('/_auth/dashboard/settings')({
  loader: () => getProfile(),
  component: RouteComponent,
})

function RouteComponent() {
  const profile = Route.useLoaderData()
  const { user } = useAuth()
  const mutation = useMutation({
    mutationFn: updateProfile,
  })

  const form = useForm({
    defaultValues: { fullName: profile?.fullName || '' },
    onSubmit: async ({ value }) => {
      await toast.promise(
        mutation.mutateAsync(value),
        {
          loading: 'Loading',
          success: 'Got the data',
          error: 'Error when fetching',
        },
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          success: {
            icon: '🔥',
            style: {
              background: '#999',
            },
          },
        },
      )
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <div className="border-b border-gray-900/10 pb-12 dark:border-white/10 flex flex-col md:flex-row gap-20">
        <div className="max-w-sm">
          <div className="mb-8 p-4">
            <h1 className="text-2xl font-medium text-stone-100 mb-1">
              Account Settings
            </h1>
            <p className="text-gray-400 text-sm">
              Change your identity informations
            </p>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs transition ${
                    canSubmit
                      ? 'bg-indigo-600 hover:bg-indigo-500'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? '...' : 'Submit'}
                </button>
              )}
            />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <form.Field
              name="fullName"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Profile name
                  </label>
                  <div className="mt-2">
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      type="text"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-gray-400 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
              )}
            />
          </div>

          <div className="sm:col-span-4">
            <form.Field
              name="email"
              children={(field) => (
                <div>
                  <label
                    htmlFor={field.name}
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id={field.name}
                      name={field.name}
                      value={user?.email}
                      type="text"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-gray-400 dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
