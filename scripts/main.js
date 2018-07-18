(function () {
    class DogApi {
        constructor() {
            this.baseURL = 'https://dog.ceo/api/';
        }
        getBreeds(){
            return $.ajax(`${this.baseURL}breeds/list/all`).then(res => Object.keys(res.message)).catch(err => console.log(err));
        }
        getImage(breed){
            return $.ajax(`${this.baseURL}breed/${breed}/images/random`).then(res => res.message
            ).catch(err => console.log(err));
        }
        getImages(breed){
            return $.ajax(`${this.baseURL}breed/${breed}/images`).then(res => res.message
            ).catch(err => console.log(err));
        }
    }


    class DogBrowserView {
        constructor(selector){
            this.root = document.body.querySelector(selector);
        }
        render(htmlString){
            this.root.innerHTML = htmlString;
        }
        on(eventName,selector ,callback){
            this.root.addEventListener(eventName, event => {
                if(!event.target.matches(selector)) return;
                callback(event);
            });
        }
        breedListTemplate(templetes){
            const templete =templetes.map(templet =>
                `
               <button type="button" data-dog="${templet}" class="list-group-item list-group-item-action mt-4 breed-button">${templet}</button>`).join('');

            return`<div class="list-group">${templete}</div>`;
        }
        dogImageTemplate(img){
            return `
         <header>
            <button type="button" id="submit-button" class="btn btn-primary back-button mb-3 mt-4">Go Back!!</button>
         </header>

            <section class="carousel-inner">
               <img class="img-fluid w-80" src="${img}">
               </section>`;
        }
        dogImagesTemplate(images){
            const carousel = images.map((img , i) => `
               <div class="carousel-item ${i===0? 'active':''}">
               <img class="img-fluid w-100" src="${img}">
               </div>`).join('');
            return `
            <header>
               <button type="button" id="submit-button" class="btn btn-primary back-button btn-lg btn-block mb-3 mt-4">Go Back!!</button>
            </header>
               <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                  ${carousel}
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                  </a>
               </div> `
        }
    }

    const view = new DogBrowserView('#view');
    const api = new  DogApi ();

    api.getBreeds().then(words =>{
        view.render(view.breedListTemplate(words));
    });



    view.on('click', '.breed-button' , event => {
        event.preventDefault();
        const breed = event.target.dataset.dog;
        api.getImage(breed).then(image =>{
            view.render(view.dogImageTemplate(image));
        });
    });

    view.on('click', '.breed-button' , event => {
        event.preventDefault();
        const breed = event.target.dataset.dog;
        api.getImages(breed).then(image =>{
            view.render(view.dogImagesTemplate(image));
        });
    });


    view.on('click','#submit-button',(event) => {
        event.preventDefault();
        const button = event.target;
        api.getBreeds().then(words =>{
            view.render(view.breedListTemplate(words));
        });
    });


    //api.getImages('african').then(console.log)
})();
