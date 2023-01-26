const config = {
    production: {
        PORT: 5000,
        URI: 'mongodb://localhost:27017/cubes'
    },
    development: {
        PORT: 3000,
        URI: 'mongodb://localhost:27017/cubes'
    }
};

module.exports = config[process.env.node_env || 'development'];