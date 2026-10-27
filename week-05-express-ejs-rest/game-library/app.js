// imported Express and created an application instance
const express = require('express');
const app = express();
// importing method override
const methodOverride = require('method-override');

// configure ejs for rendering with express
app.set('view engine', 'ejs');
// parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// register method override middleware
app.use(methodOverride('_method'));

// data
const games = [
    { id: 1, title: "Rocket League", genre: "Sports" },
    { id: 2, title: "League of Legends", genre: "MOBA" },
    { id: 3, title: "Modern Warfare 4", genre: "FPS" }
];
// READ
app.get('/', (req, res) => {
    res.send('This is HOME for Game Library');
});
// READ
app.get('/games', (req, res) => {
    res.render('index', { games });
});
// READ
app.get('/games/new', (req, res) => {
    res.render('new');
});
// READ
app.get('/games/:id', (req, res) => {
    const gameId = Number(req.params.id);
    const game = games.find(g => g.id === gameId);

    if (game) {
        res.render('show', { game });
    } else {
        return res.status(404).send('Game ID not found');
    }
});
// EDIT
app.get('/games/:id/edit', (req, res) => {
    const gameId = Number(req.params.id);
    const game = games.find(g => g.id === gameId);
    if (game) {
        res.render('edit', { game });
    } else {
        return res.status(404).send('Game ID not found');
    }
});
// NEW
app.post('/games', (req, res) => {
    const { title, genre } = req.body;
    const newId = Math.max(...games.map(g => g.id), 0) + 1;

    const newGame = {
        id: newId,
        title,
        genre
    };
    games.push(newGame);

    res.redirect('/games');
});
// UPDATE
app.patch('/games/:id', (req, res) => {
    const gameId = Number(req.params.id);
    const game = games.find(g => g.id === gameId);
    const { title, genre } = req.body;
    
    if (game) {
        game.title = title;
        game.genre = genre;

        res.redirect(`/games/${gameId}`);
    } else {
        return res.status(404).send('Game ID not found');
    }
});
// DELETE
app.delete('/games/:id', (req, res) => {
    const gameId = Number(req.params.id);
    const index = games.findIndex(g => g.id === gameId);

    if (index >= 0) {
        games.splice(index, 1);
    } else {
        return res.status(404).send('Game not found');
    }
    res.redirect('/games');
});


// LISTEN(Activate Server)
app.listen(3000, () => {
    console.log("Server is running!!");
});