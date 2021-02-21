module.exports = {
    constants: {
        USERNAME_MIN_LENGTH: 4,
        PASSWORD_MIN_LENGTH: 4,
        DESCRIPTION_MIN_LENGTH: 3,
        DESCRIPTION_MAX_LENGTH: 30,
        MERCHANT_MIN_LENGTH: 4,
        USERNAME_REGEX: /^[A-Za-z0-9]+$/,
    },
    msg: {
        USERNAME_MIN_LENGTH: "Username must be at least 4 characters",
        PASSWORD_MIN_LENGTH: "Password must be at least 4 characters",
        DESCRIPTION_INVALID_LENGTH: "Description must be between 3 and 30 characters",
        MERCHANT_MIN_LENGTH: "Merchant must be at least 4 characters",
        USERNAME_ONLY_ALPHABETICAL: "Username must contains only digits and/or latin letters",
        CONFIRMATION_PASSWORD_ERROR: "Both passwords should be the same ...",
        AMOUNT_INVALID: "Amount must be a positive number or empty",
        TOTAL_INVALID: "Total must be a positive number",
        CATEGORY_INVALID: "Category must be selected",
        WRONG_CREDENTIALS: "Wrong username or password",
        USERNAME_IS_IN_USE: (username) => {
            return `Username "${username}" is already in use ...`
        },
        DB_CONNECTED: (host, name, port) => {
            return `Successfully connected to http://${host}:${port}  /database:${name}/`
        },
        DB_CONNECTION_ERROR: "Connection error: ",
        APPLICATION_RUNNING: (port) => {
            return `Application is up & listening on port ${port} ...`;
        },
    }
}
