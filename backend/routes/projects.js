import e from "express";
import { Project } from "../models/projectModel.js";
import { FakeUser } from "../models/fakeUserModel.js";
import {
  getAllProjects,
  postNewProject,
  getProjectDetails,
  saveFavoriteProject,
  removeFavoriteProject,
  saveTakenProject,
  getTakenProjects,
  saveCompletedProject,
  getCompletedProjects,
} from "../controllers/projectsController.js";
import mongoose, { mongo } from "mongoose";
const router = e.Router();

// Router for '/projects' endpoints
// POST /projects - Dummy endpoint to save new projects to mongodb
router.post("/", postNewProject);

// GET /projects - Retrieves all projects from mongodb
router.get("/", getAllProjects);

// GET /projects/:projectId - Retrieves project details of projectId
router.get("/:projectId", getProjectDetails);

// POST /favorite-project - Saves projectId into current user's favoriteProjects
router.post("/favorite-project", saveFavoriteProject);

// POST /remove-favorite-project - Removes projectId into current user's favoriteProjects
router.post("/remove-favorite-project", removeFavoriteProject);

// POST /taken-project - Adds projectId into current user's takenProjects
router.post("/taken-project", saveTakenProject);

// GET /taken-project - Retrieves all taken projects of current user
router.get("/taken-project/:userId", getTakenProjects);

// POST /completed-project - Adds projectId into current user's completedProjects
router.post("/completed-project", saveCompletedProject);

// GET /taken-project - Retrieves all taken projects of current user
router.get("/completed-project/:userId", getCompletedProjects);
// ---------------------------------------------------------------
// These endpoints are for testing purposes, they use FakeUser
router.post("/user", async (req, res) => {
  try {
    const newUser = {
      userId: req.body.userId,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      favoriteProjects: [],
      takenProjects: [],
      completedProjects: [],
    };
    const user = await FakeUser.create(newUser).then((user) => {
      console.log("New User created: ", user);
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await FakeUser.findById(req.params.userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
