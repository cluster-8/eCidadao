function formatDate(dateString: any) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const dia = date.getDate().toString()
  const diaF = dia.length == 1 ? '0' + dia : dia
  const mes = (date.getMonth() + 1).toString() // +1 pois no getMonth Janeiro começa com zero.
  const mesF = mes.length == 1 ? '0' + mes : mes
  const anoF = date.getFullYear()

  const hora = date.getHours()
  let minutos = date.getMinutes().toString()
  minutos = String(minutos).length === 1 ? (minutos = '0' + minutos) : minutos

  return diaF + '/' + mesF + '/' + anoF + ' - ' + hora + ':' + minutos
}

export default formatDate
