(function () {

    class DogApi {
        constructor() {
            this.baseURL = 'https://dog.ceo/api/';
        }
        getBreeds(){
            return $.ajax(`${this.baseURL}breeds/list/all`).then(res => res.message);//.then(res=> console.log(api.baseURL));


        }
        getImage(breed){
            return $.ajax(`${this.baseURL}breed/${breed}/images/random`).then(res => res.message);
        }


    }
    const api = new DogApi();
    console.log(api.baseUrl);
    api.getBreeds().then(res => console.log(res));
    api.getImage('african').then(res=> console.log(res)
    );

})();
