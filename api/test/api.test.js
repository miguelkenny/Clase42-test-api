import supertest from "supertest";
import { expect } from "chai";

let request;

describe("Test sobre API REST FULl", () => {
  before(() => {
    request = supertest("http://localhost:5000");
  });

  //Elimina por ID
  describe("- DELETE /api/products/:id", () => {
    it("Deberia devolver status 200", async () => {
        const id = '63476921a6e23414eeb5a783'
        const response = await request.delete(`/api/products/${id}`);

      expect(response.status).to.eql(200);
    });
  });

  // Incorporar Productos
  describe("- POST api/products", () => {
    it("Deberia devolver status 200", async () => {
      const productCreate = {
        "title": "Remera Mangas Largas Verde",
        "desc": "Remera mangas largas de algodón con cuello redondo aplicado. Largo por debajo de la cintura. Estampa centrada en frente. Largo a la primer cadera.",
        "img": "https://www.losvestidos.com/2653/blusa-mostaza-cuello-tortuga.jpg",
        "categories": ["remeras"],
        "size": ["M","L"],
        "color": ["green"],
        "price": 550
    }
      const response = await request.post("/api/products").send(productCreate);

      expect(response.status).to.eql(200);
    });
  });

  // Obtener todos los productos
  describe("- GET /api/products", () => {
    it("Deberia devolver status 200", async () => {
      const response = await request.get("/api/products");

      expect(response.status).to.eql(200);
    });
  });

  // Obtener producto por ID
  describe("- GET by ID /api/products/find/:id", () => {
    it("Deberia devolver status 200", async () => {
        const id = '63082e71ac28e77e0b65cbfb'
        const response = await request.get(`/api/products/find/${id}`);

      expect(response.status).to.eql(200);
    });
  });

  // Error de EndPoint
  describe("- GET Unkown", () => {
    it("Deberia devolver status 404", async () => {
      const response = await request.get("/asdasds");

      expect(response.status).to.eql(404);
    });
  });
});