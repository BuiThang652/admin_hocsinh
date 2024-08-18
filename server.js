const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require("path");

// Sử dụng middlewares mặc định của json-server
server.use(middlewares);

// Định nghĩa route cho "baotran"
server.use("/baotran", (req, res, next) => {
  const router = jsonServer.router(
    path.join(__dirname, "data", "baotran.json")
  );
  router(req, res, next);
});

// Định nghĩa route cho "tuanthanh"
server.use("/tuanthanh", (req, res, next) => {
  const router = jsonServer.router(
    path.join(__dirname, "data", "tuanthanh.json")
  );
  router(req, res, next);
});

// Định nghĩa route cho "hainam"
server.use("/hainam", (req, res, next) => {
  const router = jsonServer.router(
    path.join(__dirname, "data", "hainam.json")
  );
  router(req, res, next);
});

// Định nghĩa route cho "minhduc"
server.use("/minhduc", (req, res, next) => {
  const router = jsonServer.router(
    path.join(__dirname, "data", "minhduc.json")
  );
  router(req, res, next);
});

// Định nghĩa route cho "tranvan"
server.use("/tranvan", (req, res, next) => {
  const router = jsonServer.router(
    path.join(__dirname, "data", "tranvan.json")
  );
  router(req, res, next);
});


// Lắng nghe server trên port 3000
server.listen(3000, () => {
  console.log("JSON Server is running");
});
