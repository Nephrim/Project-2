const router = require('express').Router();
const { Movie } = require('../models');
const axios = require("axios")
// const withAuth = require('../utils/auth');
require("dotenv").config()

router.get("/", async (req, res) => {
  res.render("home")
})

router.post('/', async (req, res) => {

  try {
    let searchQuery = {
      ...req.body,
      apikey: process.env.APIKEY
    }
    let queryString = new URLSearchParams(searchQuery)
    let URL = `http://www.omdbapi.com/?${queryString}`

    let Moviedata = await axios.get(URL)
    const { data } = Moviedata
    const imdbTDArr = []

    // grabs first 5 movie imdb IDs
    for (let i = 0; i < 5; i++) {
      imdbTDArr.push(data.Search[i].imdbID)

    }
    const requests = imdbTDArr.map(
      (id) =>
      (
        axios.get(`http://www.omdbapi.com/?apikey=${searchQuery.apikey}&i=${id}`)
      )
    );
    // sends req to fetch all movies be id
    let MoviesList = await Promise.all(requests)
    MoviesList.forEach((data) => console.log(data.data))

  }
  catch (error) {
    res.json(error)

  }
})
module.exports = router;