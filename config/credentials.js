const credentials = {
    development: {
        username: "",
        password: "",
        db: "expenses",
        server: "127.0.0.1",
        privateKey: "very-secret-private-key",
    },
    production: {
        username: "admin",
        password: "admin",
        db: "expenses",
        server: "cluster0.rexr9.mongodb.net",
        privateKey: "very-secret-private-key",
    }
}

module.exports = credentials[process.env.NODE_ENV.trim()];