export default {
    ENV: process.env.NODE_ENV || 'development',
    URL: process.env.BASE_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,
    CURRENT_DATABASE: process.env.CURRENT_DATABASE || 'postgres',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
    POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
    POSTGRES_URL: process.env.POSTGRES_URL || 'localhost',
    POSTGRES_SOCKET: process.env.POSTGRES_SOCKET || '/tmp/.s.PGSQL.5432',
    POSTGRES_USER: process.env.POSTGRES_USER || 'martinalbert',
    POSTGRES_DB: process.env.POSTGRES_DB || 'martinalbert',
}
