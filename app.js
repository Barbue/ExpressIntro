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
        const movieFound = favoriteMovieList.find((movie) => {
            return movie.titleToFind = req.params.titleToFind
        })
        res.json({
            success: true,
            movieFound: movieFound
    })
    })

    app.get('/new-movie', (req, res) => {
        console.log(req.params)
        
        
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })