

function getParams() {

    var params = {},
        pairs = document.URL.split('?')
               .pop()
               .split('&');

    for (var i = 0, p; i < pairs.length; i++) {
           p = pairs[i].split('=');
           params[ p[0] ] =  p[1];
    }     

    return params;
}

function determine_language(){
      

    let x= document.getElementById('language_button')
    if (x.innerHTML === "English") {
        return 'en'
    } else {
        return 'fr'
    }

}

function toggleLangButton(){
 console.log("hello world")
    let x= document.getElementById('language_button')
    if (x.innerHTML === "English") {
        x.innerHTML="Francais"
    } else {
        x.innerHTML="English"
    }


}
function changeLang(){
   console.log("hello world")
    toggleLangButton()
     $(".lang_term").hide();
     $("." + determine_language()).show();
}; 
