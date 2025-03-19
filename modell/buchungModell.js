
class Buchung {
    constructor(buchungId, kursId, mitgliederId, buchungsdatum) {
      this.id = Date.now();  
      this.buchungId = buchungId;
      this.kursId = kursId;
      this.mitgliederId = mitgliederId;
      this.buchungsdatum = buchungsdatum;
    }
  }
  
  export default Buchung;
  