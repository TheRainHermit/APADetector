module.exports = {
  apps: [{
    name: 'apadetector-server',
    script: 'server.js',
    cwd: __dirname,
    node_args: '--experimental-modules',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 4000,
      PM2_HOME: 'C:\\Users\\migue\\.pm2'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
      PM2_HOME: 'C:\\Users\\migue\\.pm2'
    },
    error_file: 'C:\\Users\\migue\\.pm2\\logs\\apadetector-error.log',
    out_file: 'C:\\Users\\migue\\.pm2\\logs\\apadetector-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm Z'
  }]
};