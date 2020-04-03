//On attends que le DOM soit chargé
window.onload = () => { //window.onload = function(){}
    //Ici on est sûrs que le DOM est chargé

    //Sélectionner un élément par rapport à son ID
    let baliseLi = document.getElementById("option2");
    console.log(baliseLi);

    //Sélectionner un élément par rapport à une classe
    let rouge = document.getElementsByClassName("rouge");
    console.log(rouge);

    //Sélectionner toutes les balise h1
    let h1 = document.getElementsByTagName("h1");
    console.log(h1);

    //Sélectionner la première occurence à un selecteur css particulier
    let balise = document.querySelector(".rouge");
    console.log(balise);

    //Sélectionner toutes les occurences qui correspondent à un selecteur css
    let balises = document.querySelectorAll("li:not(.rouge)");
    console.log(balises);
    let liP = document.querySelectorAll("li,p");
    console.log(liP);


    //Modifier balise
    let pRouge = document.querySelector("p.rouge");
    console.log(pRouge);
    pRouge.innerText = "Ceci est le nouveau texte de mon paragraphe";
    pRouge.style.backgroundColor = "red";

    //Modifier le CSS du parent

    pRouge.parentElement.style.color = "blue";
    // pRouge.parentElement.children[0].style.backgroundColor = "green";

    




} // fin window.onload