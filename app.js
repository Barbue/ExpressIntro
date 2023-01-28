const express = require('express')

    const app = express()
    const port = 3000

    app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

    const favoriteMovieList = [{
      title: "Star Wars",
      starRating: 5,
      isRecommended: true,
      createdAt: new Date(),
      lastModified: new Date()
    }, {
      title: "The Avengers",
      starRating: 4,
      isRecommended: true,
      createdAt: new Date(),
      lastModified: new Date()
    }];

    app.get('/', (req, res) => {
      res.send('Hello World!')
      
    })

    app.get('/all-movies', (req, res) => {
        res.json({favoriteMovieList})
        
        
      })

    app.get('/single-movie/:titleToFind', (req, res) => {
        console.log(req.params)
        const foundMovie = favoriteMovieList.find((movie) => {
            return movie.titleToFind = req.params.titleToFind

            // if (movie.title === titleToFind) {
            //   return true
            // } else {
            //   return false
            // }
        })
        res.json({
            success: true,
            foundMovie: foundMovie

    })
    })

    app.post('/new-movie', (req, res) => {
       const newMovie = {}
        newMovie.title = req.body.title,
        newMovie.starRating = req.body.starRating,
        newMovie.isRecommended = req.body.isRecommended,
        newMovie.createdAt = new Date(),
        newMovie.lastModified = new Date()
    console.log(newMovie)
    favoriteMovieList.push(newMovie)

    res.json({
      success: true,
    })
    })


    app.put('/update-movie/:titleToUpdate',(req, res) => {
      const titleToUpdate = req.params.title
      
      const originalMovieIndex = favoriteMovieList.findIndex((movie)=> {
        return movie.title === titleToUpdate
      })

      const originalMovie = originalMovieIndex

      const updatedMovie = {}

      if (req.body.title !== undefined) {
        updatedMovie.title = req.body.title
      } else {updatedMovie.title = originalMovie.title}

      // if (req.body.starRating !== undefined) {
      //   updatedMovie.starRating = req.body.starRating
      // } else {updatedMovie.starRating = originalMovie.starRating}

      if (req.body.isRecommended !== undefined) {
        updatedMovie.isRecommended = req.body.isRecommended
      } else {updatedMovie.isRecommended = originalMovie.isRecommended}

      updatedMovie.createdAt = originalMovie.createdAt
      updatedMovie.lastModified = new Date()

      console.log(originalMovieIndex)

      favoriteMovieList[originalMovieIndex] = updatedMovie
      console.log(updatedMovie)

      res.json({
        success: true,
      })
      })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })