const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require("fs");

// Function to load data from a specific JSON file
function loadData(filename) {
  try {
    const content = JSON.parse(fs.readFileSync(filename, "utf8"));
    return content;
  } catch (error) {
    console.error(`Error loading or parsing file ${filename}: ${error}`);
    return {}; // Return an empty object if there's an error
  }
}

// Setting up separate routers for each file
const baotranRouter = jsonServer.router(loadData("baotran.json"));
const tuanthanhRouter = jsonServer.router(loadData("tuanthanh.json"));
const hainamRouter = jsonServer.router(loadData("hainam.json"));
const minhducRouter = jsonServer.router(loadData("minhduc.json"));
const tranvanRouter = jsonServer.router(loadData("tranvan.json"));

// Apply middlewares
server.use(middlewares);

// Route setup to serve the correct router for each path
server.use("/api/baotran", baotranRouter);
server.use("/api/tuanthanh", tuanthanhRouter);
server.use("/api/hainam", hainamRouter);
server.use("/api/minhduc", minhducRouter);
server.use("/api/tranvan", tranvanRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
