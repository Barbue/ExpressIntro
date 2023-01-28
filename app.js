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

        const starRating = Number(req.query.starRating)

        const filteredMovies = favoriteMovieList.filter((movie) => {
          return movie.starRating < starRating 
        })
        res.json({
          success: true,
          favoriteMovieList: filteredMovies })
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

      if (req.body.title === undefined || typeof(req.body.title) !== "string") {
        res.json({
          success: false,
          message: "A title is required and it must be a string"
        })
        return   
      }
      if (req.body.starRating === undefined || req.body.starRating < 0 || req.body.starRating >= 5 ){
        res.json({
          success: false,
          message: "A starRating is required and must be greater than 0 and less than 5"
        })
        return
      }
      if (req.body.isRecommended === undefined || typeof(req.body.isRecommended) !== "boolean"){
        res.json({
          success: false,
          message: "An isRecommended is required and must be a boolean"
        })
        return
      }
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


    app.put('/update-movie/:title',(req, res) => {
      const titleToUpdate = req.params.title
      
      const originalMovie = favoriteMovieList.find((movie)=> {
        return movie.title === titleToUpdate
      })

      const originalMovieIndex = favoriteMovieList.findIndex((movie)=> {
        return movie.title === titleToUpdate
      })
      //const originalMovie = originalMovieIndex
      const updatedMovie = {}

      if (req.body.title !== undefined) {
        updatedMovie.title = req.body.title
      } else {updatedMovie.title = originalMovie.title}

      if (req.body.starRating !== undefined) {
        updatedMovie.starRating = req.body.starRating
      } else {updatedMovie.starRating = originalMovie.starRating}

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


      app.delete('/delete-movie/:title', (req, res) => {
       
        const titleToDelete = req.params.title

       const deleteMovieIndex = favoriteMovieList.findIndex((movie) => {
        return movie.title === titleToDelete
      })

      favoriteMovieList.splice(deleteMovieIndex,1)


      res.json({
          success: true,
      })
      })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })