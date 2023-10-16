let myFavorites = [];

const postFav = (req, res) => {
    myFavorites.push(req.body);
    console.log(myFavorites)
    return res.json(myFavorites);
};

const deleteFav = (req, res) => {
    const { id } = req.params;
    console.log("ID", id);

    const favsFiltered = myFavorites.filter((char) => {
        return char.id !== Number(id);
    });

    myFavorites = favsFiltered;
    console.log(myFavorites)
    return res.json(myFavorites);
};




module.exports = { postFav, deleteFav };