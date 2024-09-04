import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: [path.join(process.cwd(), "src/app/api/**/*.ts")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
