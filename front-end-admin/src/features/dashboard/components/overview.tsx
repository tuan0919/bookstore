import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: 'Jan',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Feb',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Mar',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Apr',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'May',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Jun',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Jul',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Aug',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Sep',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Oct',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Nov',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
  {
    name: 'Dec',
    total: Math.round((Math.random() * 9 + 1) * 10) / 10,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
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
          tickFormatter={(value) => `${value}tr`}
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
