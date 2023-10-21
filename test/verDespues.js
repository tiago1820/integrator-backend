const app = require("../src/app");
const session = require("supertest");
const agent = session(app);

describe("Test de rutas", () => {
    // Describe 1
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            await agent.get("/rickandmorty/character/1").expect(200);
        });


        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = (await agent.get("/rickandmorty/character/1")).body;
            expect(response).toHaveProperty("id");
            expect(response).toHaveProperty("name");
            expect(response).toHaveProperty("species");
            expect(response).toHaveProperty("gender");
            expect(response).toHaveProperty("status");
            expect(response).toHaveProperty("origin");
            expect(response).toHaveProperty("image");
        });

        it("Si hay un error responde con status: 500", async () => {
            await agent.get("/rickandmorty/character/999999").expect(500);
        });
    });

    // Describe 2
    describe("GET /rickandmorty/login", () => {
        it("La información del login es correcta", async () => {
            const response = (await agent.get(
                `/rickandmorty/login?email=tiago.zdo@gmail.com&password=123456`
            )).body;
            expect(response.access).toEqual(true);
        });

        it("La información del login es incorrecta", async () => {
            const response = (await agent.get(
                `/rickandmorty/login?email='asdasd'&password='asdasd'`
            )).body;
            expect(response.access).toEqual(false);
        });
    });

    // Describe 3
    describe("POST /rickandmorty/fav", () => {
        const character1 = { id: "1", name: "Tiago" };
        const character2 = { id: "2", name: "Josue" };

        it("Devuelve un personaje en primer llamado", async () => {
            const response = (await agent.post("/rickandmorty/fav").send(character1)).body;
            expect(response).toContainEqual(character1);
        });

        it("Devuelve dos personajes en el segundo llamado", async () => {
            const response = (await agent.post("/rickandmorty/fav").send(character2)).body;
            expect(response).toContainEqual(character1);
            expect(response).toContainEqual(character2);
        });
    });

    // Describe 4
    describe("DELETE /rickandmorty/fav/:id", () => {
        const character1 = { id: "1", name: "Tiago" };
        const character2 = { id: "2", name: "Josue" };

        it("Devuelve un arreglo con los elementos previos", async () => {
            const response = (await agent.delete("/rickandmorty/fav/3")).body;
            expect(response).toContainEqual(character1);
            expect(response).toContainEqual(character2);
        });

        it("Elimina correctamente un personaje pasado por ID", async () => {
            const response = (await agent.delete("/rickandmorty/fav/1")).body;
            expect(response).not.toContainEqual(character1);
            expect(response).toContainEqual(character2);
        });
    });

    // Describe 5
    const CharacterController = require('../src/controllers/characterController');

    // describe('CharacterController', () => {
    //     describe('getTotalCharacters', () => {
    //         it('Debería devolver un número mayor que cero', async () => {
    //             const req = {};
    //             const res = {
    //                 json: jest.fn(),
    //                 status: jest.fn().mockReturnThis(),
    //                 send: jest.fn()
    //             };

    //             await CharacterController.getTotalCharacters(req, res);

    //             expect(res.status).toHaveBeenCalledWith(200);
    //             expect(res.json).toHaveBeenCalledWith(expect.any(Number));
    //             expect(res.json.mock.calls[0][0]).toBeGreaterThan(0);
    //         });

    //         it('Debería devolver un error si la solicitud falla', async () => {
    //             const req = {};
    //             const res = {
    //                 status: jest.fn().mockReturnThis(),
    //                 send: jest.fn()
    //             };

    //             await CharacterController.getTotalCharacters(req, res);

    //             expect(res.status).toHaveBeenCalledWith(500);
    //             expect(res.send).toHaveBeenCalledWith(expect.any(String));
    //         });
    //     });

        describe("GET /rickandmorty/character/total", () => {
            it("Devuelve un número mayor que cero", async () => {
                const response = await agent.get("/rickandmorty/character/total").expect(200);

                // Aquí asumimos que el controlador devuelve un número
                const totalCharacters = response.body;

                expect(totalCharacters).toBeGreaterThan(0);
            });

            it("Devuelve un error si la solicitud falla", async () => {
                // Mock para req y res
                const req = {};
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn()
                };

                await CharacterController.getTotalCharacters(req, res);

                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith(expect.any(String));
            });
        });

      

        describe("GET /rickandmorty/character/total", () => {
            it("Devuelve un número mayor que cero", async () => {
                const response = await agent.get("/rickandmorty/character/total").expect(200);

                const totalCharacters = response.body;

                expect(totalCharacters).toBeGreaterThan(0);
            });
        });








    });


});
