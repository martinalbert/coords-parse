export default {
    ENV: process.env.NODE_ENV || 'development',
    URL: process.env.BASE_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,
    CURRENT_DATABASE: process.env.CURRENT_DATABASE || 'mysql',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
}
