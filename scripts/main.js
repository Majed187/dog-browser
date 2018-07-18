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
    }


    class DogBrowserView {
        // create construtor method function with selector pram to make object inside the class
        constructor(selector){
            // add proprty to the retrned object and make it equll the selctor in the html  page
            this.root = document.body.querySelector(selector);
        }
        // set method that have parm on the class
        render(htmlString){
            // take the proprty from the construtor and use the  inner html to maek it apper on the page
            this.root.innerHTML = htmlString;
        }
        // on method that contain three pram 1: is the name of the event 2:
        // is the element in the html page 3: is normal  callback function
        on(eventName,selector ,callback){
            // in this line we take every element from the construtor and add the event on it
            this.root.addEventListener(eventName, event => {
                // if element dose't match the selector don't do   any thing
                if(!event.target.matches(selector)) return;
                // we call the function with the name of the event
                callback(event);
            });
        }

        breedListTemplate(templetes){
            const templete =templetes.map(templet =>
                `
               <button type="button" data-dog=${templet} class="list-group-item list-group-item-action mt-4 breed-button">${templet}</button>`).join('');

            return`<div class="list-group">${templete}</div>`;
        }

        dogImageTemplate(img){
            return `
           <header>
               <button type="button" id="submit-button" class="btn btn-primary back-button">Go Back</button>
           </header>
   <section>
      <img class="img-fluid" src="${img}">
   </section>`;
        }
    }



    // creat an a instance of the class DogBrowserView and set the id on it
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
})();
