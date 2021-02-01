const mongoose = require('mongoose');
const riksdagenbildochelo = require('../models/bildurlschema');
const fetch = require('node-fetch');
const urltofetch = "https://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&rdlstatus=&org=&utformat=json&sort=sorteringsnamn&sortorder=asc&termlista="
const { body,validationResult } = require('express-validator');



// Display detail page for a specific Author.
exports.riksdagen_bilder = function(req, res, next) {
  fetch(`${urltofetch}`,{
    method: 'get',
  })
  .then(function(response) {
    return response.json(); // pass the data as promise to next then block
  }).then(function(data) {
    info = []
    for(let i = 0; i < Object.keys(data.personlista.person).length; i++){
        id = data.personlista.person[i].sourceid
        poster =  data.personlista.person[i].bild_url_192
        elo_rating = 1000
        info.push({'id': id, 'bild_url': poster, 'elo_rating': elo_rating})
    }  
    res.json(info)
  })
  .catch(function(error) {
    console.log('Request failed', error)
  })

};


exports.riskdagen_elorating = (req, res) => {   
  var riksdagen = new riksdagenbildochelo(
    {
      id: req.body.id,
      bild_url: req.body.bild_url,
      elo_rating: req.body.elo_rating
    });
  riksdagen.save(function (err) {
  if (err) { return next(err); }
  res.sendStatus(200);
});
}



exports.getDATA = (req, res) => {
  riksdagenbildochelo.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
    });
  };



exports.updateELO = (req,res) => {
  riksdagenbildochelo.findOneAndUpdate({_id: req.body._id}, {$set: { elo_rating: req.body.newELO}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    res.sendStatus(200);
});
}

exports.findtop10elo = async(req,res) => {
   let post = await callQuery();

  async function callQuery() {
      return riksdagenbildochelo.find().limit(5).sort({elo_rating: -1}).exec();
  }
  res.send(post)
}

          




