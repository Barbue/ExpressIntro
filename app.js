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
            //return movie.titleToFind = req.params.titleToFind

            if (movie.title === titleToFind) {
              return true
            } else {
              return false
            }
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


    app.put('/update-movie',(req, res) => {





    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })