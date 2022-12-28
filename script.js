let tables = ["epic", "steam", "autonomo", "emu", "ps4", "ps3"];//lista di tabelle in cui cercare
let ordine = "data";//priorità primo elemento schedule
let listofgames = [];//array con i giochi chiesti

//ciclo controlla le tabelle ed estrae i giochi richiesti
for (a = 0; a < tables.length; a++) {//in ogni tabella
  var table, tr, td, title, quant, data, nome, voti, fatto, segno;//crea variabili,
  table = document.getElementById(tables[a]);//prende la tabella,
  tr = table.getElementsByTagName("tr");//prende tutte le righe.
  for (i = 0; i < tr.length; i++) {//su ogni riga
    td = tr[i].getElementsByTagName("td")[3];//prende la data,
    title = tr[i].getElementsByTagName("td")[0];//prende il titolo.
    if (td) {//se la data c'è (richiesta fatta),
      data = td.textContent || td.innerText;//la memorizza,
      nome = title.textContent || title.innerText;//memorizza il titolo,
      fatto = tr[i].getElementsByTagName("td")[4];//verifica la colonna fatto
      segno = fatto.textContent || fatto.innerText;//e ne prende il simbolo.
      if (data != "" && segno != "/" && nome.length > 1) {//se non è una riga vuota (che ho inserito per fare interruzioni) e non è un gioco in pausa,
        quant = tr[i].getElementsByTagName("td")[2];//prende i voti
        voti = quant.textContent || quant.innerText;//e memorizza anche quelli
        listofgames.push({"nome": nome, "voti": voti, "data": data});//e mette nell'array questo gioco con i suoi dati.
      }
    }
  }
}
//funzione ordina array per data crescente
function perdata(){
  listofgames.sort((a,b) => {
    if (a["data"] > b["data"]){
      return +1;
    }
    else if (a["data"] < b["data"]){
      return -1;
    }
    else{
      return 0;
    }
  });
}
//funzione ordina array per voto decrescente
function pervoti(){
  listofgames.sort((a,b) => {
    if (a["voti"] < b["voti"]){
      return +1;
    }
    else if (a["voti"] > b["voti"]){
      return -1;
    }
    else{
      return 0;
    }
  });
}
//funzione crea nuova riga di tabella
function nuovariga(nome, voti, data) {
    var riga = document.createElement("tr");
    riga.id = "schedule" + nome;
    var cella1 = document.createElement("td");
    cella1.id = riga.id + nome;
    cella1.innerHTML = nome;
    var cella2 = document.createElement("td");
    cella1.id = riga.id + voti;
    cella2.innerHTML = voti;
    var cella3 = document.createElement("td");
    cella1.id = riga.id + data;
    cella3.innerHTML = data;
    riga.append(cella1);
    riga.append(cella2);
    riga.append(cella3);
    return riga;
  }

let sorteggio = ordine;
let conto;
let parità = false;

function compila(){
  if (listofgames.length == 0) {//se non ci sono elementi nell'array (da inserire in tabella)
    document.getElementById("schedule").innerHTML = "Al momento la schedule è sospesa.";//nasconde la tabella
  }
  if (sorteggio == "data") {//se sorteggio è data
    perdata();//ordina per data
    let base = listofgames[0]["data"];//prendi data[0]
    conto = 0;
    for (i = 0; i < listofgames.length; i++) {//ciclo i++ esamina tutto l'array
      if (listofgames[0]["data"] == base) {//se data = data[0]
        document.getElementById("schedule").appendChild(nuovariga(listofgames[0]["nome"], listofgames[0]["voti"], listofgames[0]["data"]));//riga va in tabella
        conto += 1;//se diventa 2, manderà parità a true e a priori avviso che la schedule è temporanea per parità tra giochi
        listofgames.shift();//rimuove prima voce (questa) dall'array
      }
      else {
        if (conto > 1){
          parità = true;
        }
        break;//altrimenti break
      }
      i--;
    }
    sorteggio = "voti";//sorteggio è ora per voti
  }
  else if (sorteggio == "voti") {//altrimenti se sorteggio è voti
    pervoti();//ordina per voti
    let base = listofgames[0]["voti"];//prendi voti[0]
    conto = 0;
    for (i = 0; i < listofgames.length; i++) {//ciclo i++ esamina tutto l'array
      if (listofgames[0]["voti"] == base) {//se voti = voti[0]
        document.getElementById("schedule").appendChild(nuovariga(listofgames[0]["nome"], listofgames[0]["voti"], listofgames[0]["data"]));//riga va in tabella
        conto += 1;//se diventa 2, manderà parità a true e a priori avviso che la schedule è temporanea per parità tra giochi
        listofgames.shift();//rimuove prima voce (questa) dall'array
      }
      else {
        if (conto > 1){
          parità = true;
        }
        break;//altrimenti break
      }
      i--;
    }
    sorteggio = "data";//sorteggio è ora per data
  }
  if (listofgames.length > 0) {//se ci sono ancora elementi nell'array (da inserire in tabella)
    compila();//ripete la funzione per prendere il prossimo;
  }
  else{//se invece non ce ne sono più,
    var riga = document.createElement("tr");//crea il bordo chiusura della tabella
    document.getElementById("schedule").append(riga);//e lo piazza
    if (parità) {
      var avviso = document.createElement("div");//crea il bordo chiusura della tabella
      avviso.innerHTML = "La schedule qui sopra è temporanea. Questo accade molto probabilmente per via di giochi con ugual richiesta che, poco prima del loro arrivo, andranno a uno spareggio per decidere quale portare.";
      document.getElementById("schedule").after(avviso);//e lo piazza
    }
  }
}


//  hai l'array e devi esaminarlo tutto per compilare la schedule
document.addEventListener("DOMContentLoaded", function(){
  compila();
});
