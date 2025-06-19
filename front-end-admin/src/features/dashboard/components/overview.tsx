import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useDashboardContext } from '@/context/DashboardContext'

export function Overview() {
  const { monthlySales } = useDashboardContext()
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={monthlySales?.sales}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `${Number(value).toLocaleString('vi')} đồng`
          }
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
