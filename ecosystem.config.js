module.exports = {
  apps: [{
    name: 'health-art',
    script: '/usr/bin/pnpm',
    args: 'dev',
    cwd: '/home/ubuntu/workspace/health-art',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      VITE_HOST: '0.0.0.0',
      HOST: '0.0.0.0'
    }
  }]
}
