(function () {

    class DogApi {
        constructor() {
            this.baseURL = 'https://dog.ceo/api/';
        }
        getBreeds(){
            return $.ajax(`${this.baseURL}breeds/list/all`).then(res => Object.keys(res.message)).catch(err => console.log(err));
        }
        getImage(breed){
            return $.ajax(`${this.baseURL}breed/${breed}/images/random`).then(res => Object.keys(res.message)).catch(err => console.log(err));
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


    }
    const view = new DogBrowserView('#view');

    console.log(view.root); // --> An html element for the root of our view
    view.render('<p>test</p>');
    console.log(view.root.innerHTML === '<p>test</p>');

     view.on('click', 'p', event => console.log(event.target))


})();
