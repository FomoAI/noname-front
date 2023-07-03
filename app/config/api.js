export const url = 'https://no-name.io/'
// export const url = 'http://localhost:5000/'

const uri = 'https://noname-backend-production.up.railway.app'
// const uri = 'http://localhost:5000'

export const config = {
    createUrl: (path) => `${uri}/api/${path}`
}


