module.exports = {
  apps: [
    {
      name: "app",
      script: "./build/server.cjs",
      instances: "max",
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
