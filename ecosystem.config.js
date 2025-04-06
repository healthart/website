module.exports = {
  apps: [{
    name: 'health-art',
    script: 'pnpm',
    args: 'dev',
    interpreter: 'none',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
