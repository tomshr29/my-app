import { tuyau } from '@/tuyau'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from '@tanstack/react-router'

export const Route = createFileRoute('/demo/show/animal/$animalId')({
  component: RouteComponent,
})

const queryClient = new QueryClient()

function RouteComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { animalId } = Route.useParams()
  const router = useRouter()
  const canGoBack = useCanGoBack()
  const { isPending, error, data } = useQuery({
    queryKey: ['animal', animalId],
    queryFn: () => tuyau.animals({ id: animalId }).$get().unwrap(),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurrend: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Espèce: {data.species}</p>
      <p>
        Âge: {data.age} an{data.age > 1 ? 's' : ''}
      </p>
      <p>{data.adopted ? 'Adopté' : 'Non adopté'}</p>
      {canGoBack ? (
        <button onClick={() => router.history.back()}>Go back</button>
      ) : null}
    </div>
  )
}
