const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require("fs");

// Function to load data from JSON files
function loadData() {
  let data = {};
  const files = [
    "baotran.json",
    "hainam.json",
    "minhduc.json",
    "tranvan.json",
    "tuanthanh.json",
  ];
  files.forEach((file) => {
    try {
      let content = JSON.parse(fs.readFileSync(file, "utf8"));
      // Combine all files into one object, make sure the keys don't overlap
      Object.keys(content).forEach((key) => {
        if (data[key] === undefined) {
          data[key] = [];
        }
        data[key] = data[key].concat(content[key]);
      });
    } catch (error) {
      console.error(`Error loading or parsing file ${file}: ${error}`);
    }
  });
  return data;
}

const router = jsonServer.router(loadData()); // Use the loadData function to provide the data for the router

// Rewrite rules for the base path
const rules = jsonServer.rewriter({
  "/api/baotran/*": "/baotran/$1",
  "/api/hainam/*": "/hainam/$1",
  "/api/minhduc/*": "/minhduc/$1",
  "/api/tranvan/*": "/tranvan/$1",
  "/api/tuanthanh/*": "/tuanthanh/$1",
});

server.use(middlewares); // Use default middlewares (logger, static, cors and no-cache)
server.use(rules); // Apply rewrite rules
server.use(router); // Use the router

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
