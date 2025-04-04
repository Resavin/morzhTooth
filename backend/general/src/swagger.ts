const PORT = process.env.PORT || 3000;
export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "General Service API",
    version: "1.0.0",
    description: "This is the API documentation for the General microservice.",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server",
    },
  ],
};

export const swaggerOptions = {
  swaggerDefinition,
  // Path to the API docs. You can point to all files that contain Swagger annotations.
  apis: ["./src/*.ts"],
};
