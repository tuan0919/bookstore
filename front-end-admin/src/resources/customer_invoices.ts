export type Invoice = {
  id: string
  status: 'Hoàn thành' | 'Hủy' | 'Đang xử lý'
  total: string
  dueDate: string
  paymentMethod: 'Mastercard' | 'Visa' | 'Paypal'
}

export const invoices: Invoice[] = [
  {
    id: '#INV2540',
    status: 'Hoàn thành',
    total: '421.000đ',
    dueDate: '07 Tháng 1, 2023',
    paymentMethod: 'Mastercard',
  },
  {
    id: '#INV3924',
    status: 'Hủy',
    total: '736.000đ',
    dueDate: '03 Tháng 12, 2023',
    paymentMethod: 'Visa',
  },
  {
    id: '#INV5032',
    status: 'Hoàn thành',
    total: '347.000đ',
    dueDate: '28 Tháng 9, 2023',
    paymentMethod: 'Paypal',
  },
  {
    id: '#INV1695',
    status: 'Đang xử lý',
    total: '457.000đ',
    dueDate: '10 Tháng 8, 2023',
    paymentMethod: 'Mastercard',
  },
  {
    id: '#INV8473',
    status: 'Hoàn thành',
    total: '414.000đ',
    dueDate: '22 Tháng 5, 2023',
    paymentMethod: 'Visa',
  },
]
