
  //let
  let favoriteCityId = "rome";
  console.log(favoriteCityId);
  favoriteCityId ="paris";
  console.log(favoriteCityId);
  //const
  const citiesId =["paris", "nyc", "rome", "rio-de-janeiro"];
  console.log(citiesId);
  //citiesId = [];//TypeError: Attempted to assign to readonly property.
  citiesId[4]= "tokyo";
  console.log(citiesId);

  //Création d'objet
  function getWeather(cityId){
    let city = cityId;
    let temperature = 20;
    return{city, temperature};
  }

  const objWeather = getWeather(favoriteCityId);
  console.log(objWeather);
  //Affectation destructurée
  let{city, temperature} = objWeather;
  console.log(city);
  console.log(temperature);
  //Rest operator
  const [parisId, nycId, ...othersCitiesId] = citiesId;
  console.log(parisId);
  console.log(nycId);
  console.log(othersCitiesId.length);

  //Classe
  class Trip{
    constructor(id, name, imageUrl){
      this.id = id;
      this.name = name;
      this.imageUrl = imageUrl;
    }
    toString(){
      return "Trip ["+ this.id + ", "+ this.name +", " + this.imageUrl + ", " + this._price + "]";
    }

    get price(){
      return this._price;
    }

    set price(newPrice){
      this._price = newPrice;
    }

    static getDefaultTrip(){
      return new Trip("rio-de-janeiro", "Rio de Janeiro", "img/rio-de-janeiro.jpg");
    }
  }

  class FreeTrip extends Trip{
    constructor(id, name, imageUrl){
      super(id, name, imageUrl);
      this._price = 0;
    }
    // redéfinition de méthode
    toString(){
      return "Free" + super.toString();
    }
  }
  let  parisTrip = new Trip("paris", "Paris", "img/paris.jpg");

  console.log(parisTrip);
  console.log(parisTrip.name);
  console.log(parisTrip.toString());

  parisTrip._price = 100;
  console.log(parisTrip.toString());

  const defaultTrip = Trip.getDefaultTrip();
  console.log(defaultTrip.toString());


  const freeTrip = new FreeTrip("nantes", "Nantes", " img/nantes.jpg");
  console.log(freeTrip.toString());

//Promise, Set, Map, Arrow Function
  class TripService {
    constructor() {
      this.setOfTrips = new Set();
        // TODO Set of 3 trips
        //
        this.setOfTrips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.setOfTrips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.setOfTrips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => { setTimeout( () => {
                // ici l'exécution du code est asynchrone
                // TODO utiliser resolve et reject en fonction du résultat de la recherche
                let tripTrouve = null;
                this.setOfTrips.forEach((val) => {
                  if(val.name == tripName)
                    tripTrouve = val;
                });
                if(tripTrouve){
                    resolve("Trip Found: " + tripTrouve.toString());
                }
                else {
                  reject("No trip with name " + tripName);
                }
              }, 2000) });
    }
}
class PriceService {
    constructor() {
      this.mapOfTrips = new Map();
        // TODO Map of 2
      this.mapOfTrips.set('paris', 100);
      this.mapOfTrips.set('rio-de-janeiro', 800);
      this.mapOfTrips.set('nantes', null);
        // 'paris' --> price == 100
        // 'rio-de-janeiro' --> price == 800)
        // no price for 'nantes'
       }
   findPriceByTripId(tripId) {
      return new Promise((resolve, reject) => { setTimeout( () => {
        // ici l'exécution du code est asynchrone
         // TODO utiliser resolve et reject en fonction du résultat de la recherche
         let priceTrouve = null;
         for(const [key, val] of this.mapOfTrips.entries()){
           if(key == tripId){
             priceTrouve = val;
           }
         };
         if(priceTrouve != null){
             resolve("Price Found: " + priceTrouve);
         }
         else {
           reject("No price for trip id "+ tripId);
         }
       }, 2000) });

    }
}
let tripService = new TripService();
tripService.findByName("Paris").then((val) => console.log(val));
tripService.findByName("Toulouse").catch((val) => console.log(val));

let priceService = new PriceService();
priceService.findPriceByTripId("paris").then((value) => console.log(value));
priceService.findPriceByTripId("nantes").catch((val) => console.log(val));
