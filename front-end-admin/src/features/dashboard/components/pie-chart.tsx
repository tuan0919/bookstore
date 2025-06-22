/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useDashboardContext } from '@/context/DashboardContext'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#444444']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize={14}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const renderCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    if (data.name === 'Others') {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minWidth: 120,
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: 14 }}>
            {data.name}
          </p>
          <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
            {`Số lượng: ${data.value}`}
          </p>
        </div>
      )
    }

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minWidth: 240,
        }}
      >
        {data.product?.thumbnail && (
          <img
            src={data.product.thumbnail}
            alt={data.name}
            style={{
              width: 72,
              height: 72,
              objectFit: 'cover',
              marginRight: 12,
              borderRadius: 4,
              background: '#f5f5f5',
              flexShrink: 0,
            }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              fontWeight: 'bold',
              fontSize: 14,
              maxWidth: 140,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={data.name}
          >
            {data.name}
          </p>
          <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
            {`Số lượng: ${data.value}`}
          </p>
          {data.product?.lastOrderId && (
            <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
              {`Đơn gần nhất: #${data.product.lastOrderId}`}
            </p>
          )}
          {data.product?.lastSellDate && (
            <p style={{ margin: 0, color: '#666', fontSize: 13 }}>
              {`Ngày bán gần nhất: ${data.product.lastSellDate}`}
            </p>
          )}
        </div>
      </div>
    )
  }
  return null
}

export function Piechart() {
  const { topSell } = useDashboardContext()

  const chartData =
    topSell?.elements?.map((el) => ({
      name: el.showName,
      value: el.product ? (el.product.quantity ?? 1) : 1,
      product: el.product ?? null,
    })) ?? []

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '70%', height: 300 }}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Tooltip content={renderCustomTooltip} />
            <Pie
              data={chartData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill='#8884d8'
              dataKey='value'
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '30%', paddingLeft: 20, fontSize: 14 }}>
        {chartData.map((item, index) => (
          <div
            key={index}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: 8,
                borderRadius: 2,
                flexShrink: 0,
              }}
            ></div>
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 170,
                display: 'inline-block',
              }}
            >
              {`top ${index + 1}: ${item.name}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
