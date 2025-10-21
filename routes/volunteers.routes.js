const express = require("express");
const router = express.Router();
const {
  listVolunteers,
  getVolunteerPoints,
  getVolunteerByID,
  addVolunteer,
  deleteVolunteer,
  editeVolunteer,
  listVolunteersByCity,
  listVolunteersByName,
  listVolunteersByNameAndCity,
} = require("../services/volunteerServices");
const { verifyToken } = require("../services/tokenServices");
const {
  verifyTokenVolunteer,
  verifyTokenAdmin,
} = require("../middlewares/auth");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", verifyTokenAdmin, (req, res) => {
  const name = listVolunteers();
  res.status(200).json(name);
});

router.get("/city/:city", verifyTokenAdmin, (req, res) => {
  const name = listVolunteersByCity(req.params.city);
  res.status(200).json(name);
});

router.get("/city/:city/name/:name/", verifyTokenAdmin, (req, res) => {
  const name = listVolunteersByNameAndCity(req.params.name, req.params.city);
  res.status(200).json(name);
});

router.get("/name/:name", verifyTokenAdmin, (req, res) => {
  const name = listVolunteersByName(req.params.name);
  res.status(200).json(name);
});

router.get("/point", verifyTokenVolunteer, async (req, res) => {
  const row = getVolunteerPoints(req.volunteerId);
  res.status(200).json(row);
});

router.get("/id/:id", verifyTokenAdmin, (req, res) => {
  const volunteerId = Number(req.params.id);
  const row = getVolunteerByID(volunteerId);
  res.status(200).json(row);
});

router.get("/token", verifyTokenVolunteer, async (req, res) => {
  const volunteerId = Number(req.volunteerId);
  const row = getVolunteerByID(volunteerId);
  res.status(200).json(row);
});

router.post("/", verifyTokenAdmin, async (req, res) => {
  let response = await addVolunteer(req.body);
  res.status(201).json(response);
});

router.delete("/:id", verifyTokenAdmin, (req, res) => {
  const volunteerId = Number(req.params.id);
  deleteVolunteer(volunteerId);
  res.status(200).send("Volunteer deleted");
});

router.put("/id/:id", verifyTokenAdmin, async (req, res) => {
  const volunteerId = Number(req.params.id);
  let response = await editeVolunteer(volunteerId, req.body);
  res.status(200).json(response);
});

router.put("/token", verifyTokenVolunteer, async (req, res) => {
  const volunteerId = Number(req.volunteerId);
  let response = await editeVolunteer(volunteerId, req.body);
  res.status(200).json(response);
});

module.exports = router;
