const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
//middleware
const notFound = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
// service
const serviceRoutes = require("./api/service/service.routes");
//serviceType
const serviceTypeRoutes = require("./api/servicetype/ServiceType.routes");
//user
const userRoutes = require("./api/user/User.routes");
const config = require("./config/Keys");
const passport = require("passport");
// const path = require("path");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const path = require("path");
//Database
const connectDB = require("./database");

connectDB();

//declare var
const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
// app.use("/media", express.static(path.join(__dirname, "media")));
app.use(morgan("dev"));

//passport
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/user", userRoutes);
app.use("/servicetype", serviceTypeRoutes);
app.use("/service", serviceRoutes);

//errorhandlers:
app.use(notFound);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`The application is running on ${config.PORT}`);
});

//https://www.geeksforgeeks.org/express-js-req-params-property/
