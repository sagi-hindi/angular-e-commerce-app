class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public connectionString = "mongodb://localhost:27017/snap-buy"; // <-- Replace Database with correct name.
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public connectionString = "mongodb+srv://35320515:35320515@snap-shop.jayljef.mongodb.net/?retryWrites=true&w=majority"; // <-- Replace Database with correct name.
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
