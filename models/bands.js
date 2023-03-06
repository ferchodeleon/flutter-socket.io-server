const Band = require("./band");

class Bands {
  constructor() {
    this.bands = [];
  }

  addBand(band = new Band()) {
    this.bands.push(band);
  }

  getBands() {
    return this.bands;
  }

  deletedBand(id = "") {
    this.bans = this.bans.filter((band) => band.id !== id);
    return this.bans;
  }

  voteBand(id = "") {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
        return band;
      } else {
        return band;
      }
    });
  }
}

module.exports = Bands;
