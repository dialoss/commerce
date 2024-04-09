module.exports = {
    webpack: function (config) {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    "react/jsx-runtime.js": "react/jsx-runtime",
                    "react/jsx-dev-runtime.js": "react/jsx-dev-runtime"
                }
            }
        };
    },
    override: (config, env) => {
        console.log('override')
        let loaders = config.resolve
        loaders.fallback = {
            "fs": false,
            "tls": false,
            "net": false,
            "http": require.resolve("stream-http"),
            "https": false,
            "zlib": require.resolve("browserify-zlib"),
            "path": require.resolve("path-browserify"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "crypto": require.resolve("crypto-browserify")
        }

        return config
    }
};