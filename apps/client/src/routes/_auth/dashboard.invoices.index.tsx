import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/invoices/')({
  component: InvoicesIndex,
})

function InvoicesIndex() {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
      Select an invoice
    </div>
  )
}
