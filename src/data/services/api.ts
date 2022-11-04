import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-ecidadao.herokuapp.com/v1/',
})

// if (!api.defaults.headers.common.Authorization) {
//   api
//     .post('auth/sign-in', {
//       email: 'admin@admin.com',
//       password: 'admin',
//     })
//     .then(({ data }) => {
//       console.log('api.ts')
//       console.log('token mock: ', data.token)

//       api.defaults.headers.common.Authorization = `Bearer ${data.token}`
//     })
//     .catch((err) => {
//       console.log('api.ts error ')
//       console.log(err)
//     })
// }
