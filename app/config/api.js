export const url = 'https://no-name.io/'

const uri = 'https://noname-backend-production.up.railway.app'
// const uri = 'https://noname-api.up.railway.app'
export const config = {
    createUrl: (path) => `${uri}/api/${path}`
}