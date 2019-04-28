export const {
  APP_PORT = 80,
  NODE_ENV = 'development',
  DB_USERNAME = 'Admin001',
  DB_PASSWORD = 'Admin001',
  DB_HOST = 'ferreto0-jva9y.gcp.mongodb.net',
  DB_PORT = 17027,
  DB_NAME = 'vif'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
