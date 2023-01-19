const config = {
    production: {
        PORT: 5000
    },
    development: {
        PORT: 3000
    }
};

module.exports = config[process.env.node_env || 'development'];