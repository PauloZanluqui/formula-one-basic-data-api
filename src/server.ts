import fastify from "fastify";
import cors from "@fastify/cors"

const server = fastify({ logger: true });

server.register(cors, { origin: "*" });

const teams = [
  { id: 1, name: "Ferrari" },
  { id: 2, name: "Mercedes" },
  { id: 3, name: "Red Bull Racing" },
];

const drivers = [
  { id: 1, name: "Alonso", team: "Ferrari" },
  { id: 2, name: "Vettel", team: "Mercedes" },
  { id: 3, name: "Sebastian Vettel", team: "Red Bull Racing" },
  { id: 4, name: "Kimi Rudd", team: "Ferrari" },
  { id: 5, name: "Max Verstappen", team: "Mercedes" },
];

server.get("/teams", async (req, res) => {
  res.type("application/json").code(200);
  return { teams }
});

server.get("/drivers", async (req, res) => {
  res.type("application/json").code(200);
  return { drivers }
})

interface DriverParams {
  id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const driver = drivers.find((d) => d.id === id);

  if(!driver){
    res.type("application/json").code(404);
    return { message: "Driver not found" };
  }

  return { driver };
})

server.listen({ port: 3333 }, () => {
  console.log(`Server is running on http://localhost:3333`);
});
