const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlowTrack API",
      version: "1.0.0",
      description: "Документація API для FlowTrack",
    },
    servers: [
      {
        url: "https://flow-track-api.duckdns.org",
      },
    ],
  },
  apis: ["./swagger.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
