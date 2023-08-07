import * as usersDao from "./users-dao.js";



  const register = (req, res) => {
    const username = req.body.username;
    const user = usersDao.findUserByUsername(username);
    if (user) {
      res.sendStatus(409);
      return;
    }
    const newUser = usersDao.createUser(req.body);
    req.session["currentUser"] = newUser;
    res.json(newUser);
  };

  const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = usersDao.findUserByCredentials(username, password);
    if (user) {
      req.session["currentUser"] = user;
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  };

  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    res.json(currentUser);
  };


  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const update   =async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(404);
      return;
    }
    const userId = currentUser._id;
    const updates = req.body;
    usersDao.updateUser(userId, updates);
    const currentUserUpdated = usersDao.findUserById(userId);
    req.session["currentUser"] = currentUserUpdated;

    res.json(currentUserUpdated);
    res.sendStatus(200);
  };
const AuthController = (app) => {
  app.post("/api/users-dao/register", register);
  app.post("/api/users-dao/login",    login);
  app.post("/api/users-dao/profile",  profile);
  app.post("/api/users-dao/logout",   logout);
  app.put ("/api/users-dao",          update);}
export default AuthController;

