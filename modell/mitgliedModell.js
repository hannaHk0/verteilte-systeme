class Mitglied {
    constructor(mitgliedId, name, email, telefonnummer) {
      this.id = Date.now();
      this.mitgliedId = mitgliedId;
      this.name = name;
      this.email = email;
      this.telefonnummer = telefonnummer;
    }
  }
  
  export default Mitglied;
  