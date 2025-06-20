import { Link } from '@tanstack/react-router'

export function CustomerCell({
  customerId,
  customerName,
}: {
  customerId: number
  customerName: string
}) {
  return (
    <div className='flex flex-col gap-1'>
      <Link to={'/orders/overview?id=' + customerId}>
        <span className='font-light'>{customerName}</span>
      </Link>
    </div>
  )
}
