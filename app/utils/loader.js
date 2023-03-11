const API = 'https://noname-backend-production.up.railway.app/api/static'
// const API = 'https://noname-api.up.railway.app/api/static'
export default (src) => {
    return `${API}${src}`
}