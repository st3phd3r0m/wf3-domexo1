//On attend que le DOM soit chargé
window.onload = () => {
    // Désactivation du boutton------------------------------------------------------
    let button = document.querySelector("button");
    button.disabled = true;

    let form = document.querySelector("form");
    form.addEventListener("input", checkForm);

    //Option mots de passe visibles/non-visibles
    let openedEye1 = document.querySelector(".la-eye");
    openedEye1.addEventListener("click", togglePasswordVisibility);
    let openedEye2 = document.querySelectorAll(".la-eye")[1];
    openedEye2.addEventListener("click", togglePasswordVisibility);

    //Vérification saisies utilisateur--------------------------------------------------
    //Le pseudo doit faire au moins 5 caractères et prevenir l'utilisateur----------
    let premInput = document.querySelector("input");
    //Création message d'erreur
    let p1 = document.createElement("p");
    p1.textContent = "Le pseudo doit faire au moins 5 caractères";
    p1.style.color = "red";
    p1.style.fontSize = "10px";
    premInput.parentElement.appendChild(p1);
    p1.style.display = "none";
    //Ecouteur evenement
    premInput.addEventListener("change", verifLongueurMot);

    //Vérifier que les emails soient identiques-------------------------------------
    let troisInput = document.querySelector("[name='email2']");
    let p2 = document.createElement("p");
    p2.style.color = "red";
    p2.style.fontSize = "10px";
    troisInput.parentElement.appendChild(p2);
    p2.style.display = "none";
    //Ecouteur evenement
    troisInput.addEventListener("blur", verifMotsDoublons);

    //Vérifier que les mots de passe soient identiques
    let cinqInput = document.querySelector("[name='motDePasse2']");
    let p3 = document.createElement("p");
    p3.style.color = "red";
    p3.style.fontSize = "10px";
    cinqInput.parentElement.appendChild(p3);
    p3.style.display = "none";
    //Ecouteur evenement
    cinqInput.addEventListener("blur", verifMotsDoublons);

} // fin window.onload


/**
 * Cette fonction vérifie si le pseudo fait au moins 5 caractères
 * @param {*} event 
 */
function verifLongueurMot(event) {
    let mot = event.target.value;

    if (mot.length < 5) {
        event.target.style.boxShadow = "0 0 1px 1px red";
        this.nextElementSibling.style.display = "initial";
        //this.after(par); //préférer appendChild (en encapsulant le input avec div)
        //la méthode .after est encore expérimentale
    } else if (mot.length >= 5) {
        event.target.style.boxShadow = "0 0 1px 1px green";
        this.nextElementSibling.style.display = "none";
    }
}


/**
 * Fonction qui permet de vérifier que les 2 inputs des mails ou des mots de passe soient identiques
 */
function verifMotsDoublons() {
    let mot2 = String(this.value);
    let eltAvant;
    let p;
    let text;

    switch (this.name) {
        case "email2":
            text = "adresses courriels";
            eltAvant = document.querySelector("[name='email1']");
            p = document.querySelectorAll("div>p")[1];
            break;
        case "motDePasse2":
            text = "mots de passe";
            eltAvant = document.querySelector("[name='motDePasse1']");
            p = document.querySelectorAll("div>p")[2];
            break;
    }

    let mot1 = String(eltAvant.value);

    if (mot1 != mot2) {
        this.style.boxShadow = "0 0 1px 1px red";
        eltAvant.style.boxShadow = "0 0 1px 1px red";
        p.style.display = "initial";
        p.textContent = "Les " + text + " doivent être identiques";

    } else if (mot1 == mot2) {
        this.style.boxShadow = "0 0 1px 1px green";
        eltAvant.style.boxShadow = "0 0 1px 1px green";
        p.style.display = "none";
    }
}


/**
 * Fonction qui permet de rendre visible/non-visible le mot de passe de l'utilisateur
 */
function togglePasswordVisibility() {
    if (this.classList.contains("la-eye")) {
        this.previousElementSibling.type = "text";
        this.classList.remove("la-eye");
        this.classList.add("la-eye-slash");
    } else if (this.classList.contains("la-eye-slash")) {
        this.previousElementSibling.type = "password";
        this.classList.remove("la-eye-slash");
        this.classList.add("la-eye");
    }
}


/**
 * Fontion verifiant la validité du formulaire et active/désactive le bouton de soumission selon
 */
function checkForm() {
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
    let longueurPassword = password2.length != 0;

    //Initialisation compteur (points de validité du formulaire)
    var compt = 0;

    //Expressions ternaires
    //Si longueurPseudo >=5, le compteur s'incrémente
    longueurPseudo ? compt++ : 0;
    (courriel1 == courriel2) && (courrielValide) ? compt++ : 0;
    (password1 == password2) && (longueurPassword) ? compt++ : 0;
    compt >= 3 ? button.disabled = false : button.disabled = true;
}