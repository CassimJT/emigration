
export function formatCurrency(amount, currency = 'MWK') {
  return new Intl.NumberFormat('en-MW', { style: 'currency', currency }).format(amount)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
