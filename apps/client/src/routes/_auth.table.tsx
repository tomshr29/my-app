import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { tuyau } from '@/tuyau'

export const Route = createFileRoute('/_auth/table')({
  component: RouteComponent,
})

function RouteComponent() {
  const [animals, setAnimals] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  // Colonnes : adapte-les à ta structure Property
  const columns = React.useMemo(
    () => [
      { accessorKey: 'title', header: 'Titre' },
      { accessorKey: 'description', header: 'Description' },
      { accessorKey: 'price', header: 'Prix' },
      { accessorKey: 'surface', header: 'Surface (m²)' },
      { accessorKey: 'city', header: 'Ville' },
      {
        accessorKey: 'available',
        header: 'Disponible',
        cell: (info) => (info.getValue() ? 'Oui' : 'Non'),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: animals,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  React.useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('auth-token')
        const response = await fetch('http://localhost:3333/properties/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`Erreur ${response.status} : ${response.statusText}`)
        }
        const data = await response.json()
        setAnimals(data)
      } catch (err) {
        setError(err)
        console.error('Failed to fetch animals', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  if (isLoading) return <div>Chargement des propriétés...</div>
  if (error) return <div>Erreur : {error.message}</div>
  if (animals.length === 0) return <div>Aucune propriété trouvée.</div>

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Mes propriétés
      </h1>
      <table className="min-w-full border border-gray-300 border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
