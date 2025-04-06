module.exports = {
  apps: [{
    name: 'health-art',
    script: 'pnpm',
    args: 'dev',
    interpreter: 'none',
    env: {
      NODE_ENV: 'production'
    },
    cwd: '/home/ubuntu/workspace/health-art',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
