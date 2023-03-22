export const cities = [
  { latitude: '-9.97', longitude: '-67.80', name: 'Rio Branco' },
  { latitude: '-9.67', longitude: '-35.74', name: 'Maceió' },
  { latitude: '0.03', longitude: '-51.07', name: 'Macapá' },
  { latitude: '-3.11', longitude: '-60.03', name: 'Manaus' },
  { latitude: '-12.97', longitude: '-38.51', name: 'Salvador' },
  { latitude: '-3.72', longitude: '-38.54', name: 'Fortaleza' },
  { latitude: '-15.78', longitude: '-47.93', name: 'Brasília' },
  { latitude: '-20.32', longitude: '-40.34', name: 'Vitória' },
  { latitude: '-16.68', longitude: '-49.26', name: 'Goiânia' },
  { latitude: '-2.53', longitude: '-44.31', name: 'São Luis' },
  { latitude: '-15.60', longitude: '-56.09', name: 'Cuiabá' },
  { latitude: '-20.44', longitude: '-54.65', name: 'Campo Grande' },
  { latitude: '-19.82', longitude: '-43.95', name: 'Belo Horizonte' },
  { latitude: '-1.46', longitude: '-48.50', name: 'Belém' },
  { latitude: '-7.12', longitude: '-34.86', name: 'João Pessoa' },
  { latitude: '-25.43', longitude: '-49.27', name: 'Curitiba' },
  { latitude: '-8.05', longitude: '-34.88', name: 'Recife' },
  { latitude: '-5.09', longitude: '-42.80', name: 'Teresina' },
  { latitude: '-22.90', longitude: '-43.21', name: 'Rio de Janeiro' },
  { latitude: '-5.79', longitude: '-35.21', name: 'Natal' },
  { latitude: '-30.03', longitude: '-51.23', name: 'Porto Alegre' },
  { latitude: '-8.76', longitude: '-63.90', name: 'Porto Velho' },
  { latitude: '2.82', longitude: '-60.67', name: 'Boa Vista' },
  { latitude: '-27.60', longitude: '-48.55', name: 'Florianópolis' },
  { latitude: '-23.55', longitude: '-46.64', name: 'São Paulo' },
  { latitude: '-10.91', longitude: '-37.07', name: 'Aracaju' },
  { latitude: '-10.17', longitude: '-48.33', name: 'Palmas' },
]

export function dayName(dayReference) {
  const day = new Date().getDay()
  let dayIndex = day + dayReference
  
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(0, 0, index)

    return date.toLocaleString('pt-BR', { weekday: 'long' })
  })

  if(dayIndex > 6) dayIndex -= 7

  const dayName = days[dayIndex].slice(0, 1).toLocaleUpperCase().concat(days[dayIndex].slice(1))
  return dayName.replace('-feira', '')
}
