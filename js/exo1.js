//On attend que le DOM soit chargé
window.onload = () => {
    // Désactivation du boutton------------------------------------------------------
    let button = document.querySelector("button");
    button.disabled = true;


    let form = document.querySelector("form");
    form.addEventListener("input", checkForm);

    // input.addEventListener('input', updateValue);

    //Option mots de passe visibles/non-visibles
    let openedEye1 = document.querySelector(".la-eye");
    openedEye1.addEventListener("click", tooglePasswordVisibility);
    let openedEye2 = document.querySelectorAll(".la-eye")[1];
    openedEye2.addEventListener("click", tooglePasswordVisibility);

    //Vérification saisies utilisateur--------------------------------------------------
    //Le pseudo doit faire au moins 5 caractères et prevenir l'utilisateur
    let premInput = document.querySelector("input");
    premInput.addEventListener("change", verifLongueurMot);

    //Vérifier que les emails soient identiques
    let troisInput = document.querySelectorAll("input")[2];
    troisInput.addEventListener("blur", verifMotsDoublons);

    //Vérifier que les mots de passe soient identiques
    let cinqInput = document.querySelectorAll("input")[4];
    cinqInput.addEventListener("blur", verifMotsDoublons);

} // fin window.onload


/**
 * Cette fonction vérifie si le pseudo fait au moins 5 caractères
 * @param {*} event 
 */
function verifLongueurMot(event){
    let mot = event.target.value;
    if (mot.length < 5) {
        event.target.style.boxShadow = "0 0 1px 1px red";
        event.target.title = "Le pseudo doit faire au moins 5 caractères !";
    } else if (mot.length >= 5) {
        event.target.style.boxShadow = "0 0 1px 1px green";
    }
}

/**
 * Fonction qui permet de vérifier que les 2 inputs des mails ou des mots de passe soient identiques
 */
function verifMotsDoublons(){
    let mot2 = String(this.value);
    let eltAvant= this.previousElementSibling;
    let text;

    switch(this.name){
        case "email2": 
            text = "adresses courriels";
            eltAvant 
            break;
        case "motDePasse2": 
            text = "mots de passe";
            eltAvant = document.querySelector("[name='motDePasse1']");
            break;
    }

    let mot1 = String(eltAvant.value);

    if(mot1 != mot2){
        this.style.boxShadow = "0 0 1px 1px red";
        eltAvant.style.boxShadow = "0 0 1px 1px red";
        this.title = "Les "+text+" doivent être identiques";
        eltAvant.title = "Les "+text+" doivent être identiques";
    }else if(mot1 == mot2){
        this.style.boxShadow = "0 0 1px 1px green";
        eltAvant.style.boxShadow = "0 0 1px 1px green";
    }
}

/**
 * Fonction qui permet de rendre visible/non-visible le mot de passe de l'utilisateur
 */
function tooglePasswordVisibility(){
    if(this.classList[1] == "la-eye"){
        this.previousElementSibling.type ="text";
        this.classList.remove("la-eye");
        this.classList.add("la-eye-slash");
    }else if(this.classList[1] == "la-eye-slash"){
        this.previousElementSibling.type ="password";
        this.classList.remove("la-eye-slash");
        this.classList.add("la-eye");
    }
}


/**
 * Fontion verifiant la validité du formulaire et active/désactive le bouton de soumission selon
 */
function checkForm(){
    // objet bouton
    let button = document.querySelector("button");
    
    //Longueur du pseudo >= 5 (renvoie true ou false)
    let longueurPseudo = document.querySelector('input').value.length >= 5;

    //Extraction chaine de caractère dans l'input email
    let courriel1 = document.querySelectorAll('input')[1].value;
    let courriel2 = document.querySelectorAll('input')[2].value;

    //Verification email valide via un regexp (xx@xx.xx)
    let regex = /[\w]{2,10}@[a-zA-Z]{2,10}\.[a-zA-Z]{2,3}/;
    let courrielValide = regex.test(courriel2);

    //Extraction chaine de caractère dans l'input password
    let password1 = document.querySelectorAll('input')[3].value;
    let password2 = document.querySelectorAll('input')[4].value;
    //Longueur du password > 0 (renvoie true ou false)
    let longueurPassword = password2.length !=0;

    //Initialisation compteur (points de validité du formulaire)
    var compt=0;

    //Expressions ternaires
    //Si longueurPseudo >=5, le compteur s'incrémente
    longueurPseudo ? compt++ : 0 ;
    (courriel1 == courriel2) && (courrielValide) ? compt++ : 0 ;
    (password1 == password2) && (longueurPassword) ? compt++ : 0 ;
    compt >= 3 ? button.disabled = false : button.disabled = true;
}