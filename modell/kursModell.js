
class Kurs {
    constructor(kursId, trainer, datum, uhrzeit, kursname) {
      this.id = Date.now();  
      this.kursId = kursId;
      this.trainer = trainer;
      this.datum = datum;
      this.uhrzeit = uhrzeit;
      this.kursname = kursname;
    }
  }
  
  export default Kurs;
  