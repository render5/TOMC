var genere = new Array();

if(JSON.parse(window.localStorage.getItem('venditore'))== null){
    var venditori = []
}
if(JSON.parse(window.localStorage.getItem('cliente'))== null){
    var clienti = []
}
if(JSON.parse(window.localStorage.getItem('cliente')) != null){
    var clienti = JSON.parse(window.localStorage.getItem('cliente'));
}
if(JSON.parse(window.localStorage.getItem('venditore')) != null){
    var venditori = JSON.parse(window.localStorage.getItem('venditore'));
}

var posizione = 0

var preferenze = []
var film_venduti = []
var film_comprati = []
var film_noleggio = []
var tutte_le_vendite = []
var tutti_i_noleggi = []
var info_pagamento
    
    if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
        var shops = document.getElementsByClassName("shop")
        var clients = document.getElementsByClassName("client")
        shops[0].hidden = false
        shops[1].hidden = false
        clients[0].hidden = true
        document.getElementById("name_profile").required = false
        document.getElementById("surname_profile").required = false
        document.getElementById("partita_iva_profile").required = true
        document.getElementById("shop_name_profile").required = true
		document.getElementById("film_venduti_comprati").innerHTML = 'Film in Vendita <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16"><path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/><path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/><path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></svg>'
    }

    if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="cliente"){
        var shops = document.getElementsByClassName("shop")
        var clients = document.getElementsByClassName("client")
        shops[0].hidden = true
        shops[1].hidden = true
        clients[0].hidden = false
        document.getElementById("name_profile").required = true
        document.getElementById("surname_profile").required = true
        document.getElementById("partita_iva_profile").required = false
        document.getElementById("shop_name_profile").required = false
		document.getElementById("film_venduti_comprati").innerHTML = 'Film Posseduti <svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" fill="currentColor" class="bi bi-camera-reels" viewBox="0 0 16 16"><path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/><path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/><path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/></svg>'
    }


    function login(){
		seller_list = JSON.parse(window.localStorage.getItem('venditore'));
		client_list = JSON.parse(window.localStorage.getItem('cliente'));
		var flag = false
		if(client_list != null){
			for(i=0; i<client_list.length; i++){
				if(JSON.parse(window.localStorage.getItem('active_account')) == client_list[i].email){
					console.log("cliente trovato");
                    posizione = i;
                    document.getElementById("email_profile").value = client_list[i].email;
					document.getElementById("password_profile").value = client_list[i].password;
                    document.getElementById("name_profile").value = client_list[i].nome;
                    document.getElementById("surname_profile").value = client_list[i].cognome;
                    document.getElementById("address_profile").value = client_list[i].indirizzo;
                    document.getElementById("city_profile").value = client_list[i].citta;
                    document.getElementById("cap_profile").value = client_list[i].cap;
                    document.getElementById("phone_profile").value = client_list[i].numero_telefono;
					preferenze = client_list[i].preferenze;
					film_comprati = client_list[i].film_comprati
					film_noleggio = client_list[i].film_noleggio
					info_pagamento = client_list[i].info_pagamento
					document.getElementById("miei_film_posseduti").hidden = false


					var pref = document.getElementsByClassName("pref")
					if(preferenze.length > 0){ //controllo se prefererenze non é vuoto
						for(k=0; k<pref.length; k++){
							for(g=0; g<preferenze.length; g++){
								if(pref[k].id==preferenze[g]){
									pref[k].checked = true
								}
							}
						}
					}
				}else{
					for(aa=0; aa<client_list[i].film_comprati.length; aa++){
						tutte_le_vendite.push({"id": client_list[i].film_comprati[aa].id, "nome": client_list[i].film_comprati[aa].nome, "nome_venditore" : client_list[i].film_comprati[aa].nome_venditore, "prezzo": client_list[i].film_comprati[aa].prezzo });
					}
					for(bb=0; bb<client_list[i].film_noleggio.length; bb++){
						tutti_i_noleggi.push({"id": client_list[i].film_noleggio[bb].id, "nome": client_list[i].film_noleggio[bb].nome, "prezzo": client_list[i].film_noleggio[bb].prezzo, "nome_venditore" : client_list[i].film_noleggio[bb].nome_venditore, "inizio_noleggio" : client_list[i].film_noleggio[bb].giorni_noleggio, "giorni_noleggio" : client_list[i].film_noleggio[bb].inizio_noleggio  });
					}
					
				}
			}
		}
		
		if(seller_list != null){
			for(j=0; j<seller_list.length; j++){
				if(JSON.parse(window.localStorage.getItem('active_account')) == seller_list[j].email){
					console.log("venditore trovato");
                    posizione = j;
                    document.getElementById("email_profile").value = seller_list[j].email;
					document.getElementById("password_profile").value = seller_list[j].password;
                    document.getElementById("address_profile").value = seller_list[j].indirizzo;
                    document.getElementById("city_profile").value = seller_list[j].citta;
                    document.getElementById("cap_profile").value = seller_list[j].cap;
                    document.getElementById("phone_profile").value = seller_list[j].numero_telefono;
                    document.getElementById("partita_iva_profile").value = seller_list[j].partita_iva;
                    document.getElementById("shop_name_profile").value = seller_list[j].nome_negozio;
					preferenze = seller_list[j].preferenze;
					film_venduti = seller_list[j].film_venduti
					document.getElementById("miei_film_venduti").hidden = false

					var pref = document.getElementsByClassName("pref")
					if(preferenze.length > 1){ //controllo se prefererenze non é vuoto
						for(h=0; h<pref.length; h++){
							for(y=0; y<preferenze.length; y++){
								if(pref[h].id==preferenze[y]){
									pref[h].checked = true
								}
							}
						}
					}
				}
			}
		}
		document.getElementById("email_profile").disabled = true;
	}	

function modifica(){
	salva_preferenze()
        var cliente = 
	{
		"email" : document.getElementById("email_profile").value,
		"password" : document.getElementById("password_profile").value,
		"nome" : document.getElementById("name_profile").value,
		"cognome" : document.getElementById("surname_profile").value,
		"numero_telefono" : document.getElementById("phone_profile").value,
		"indirizzo" : document.getElementById("address_profile").value,
		"citta" : document.getElementById("city_profile").value,
		"cap" : document.getElementById("cap_profile").value,
		"preferenze" : preferenze,
		"film_noleggio" : film_noleggio,
		"film_comprati" : film_comprati,
		"info_pagamento" : info_pagamento,
	}
	
	var venditore =
	{
		"email" : document.getElementById("email_profile").value,
		"password" : document.getElementById("password_profile").value,
		"nome_negozio" : document.getElementById("shop_name_profile").value,
		"partita_iva" : document.getElementById("partita_iva_profile").value,
		"numero_telefono" : document.getElementById("phone_profile").value,
		"indirizzo" : document.getElementById("address_profile").value,
		"citta" : document.getElementById("city_profile").value,
		"cap" : document.getElementById("cap_profile").value,
		"preferenze" : preferenze,
		"film_venduti" : film_venduti,
	}

	if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="cliente"){
		if(!(/^[a-zA-Z]*$/.test(document.getElementById("name_profile").value))){
			alert("Formato Nome errato!");
			return false;
		}
		if(!(/^[a-zA-Z]*$/.test(document.getElementById("surname_profile").value))){
			alert("Formato Cognome errato!");
			return false;
		}
	}
	if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
		if(!((/^[0-9]*$/.test(document.getElementById("partita_iva_profile").value))&& ((document.getElementById("partita_iva_profile").value.length)==11)  )){
			alert("Formato Partita Iva errato!");
			return false;
		}
	}
	
	if(!(/^[a-zA-Z]*$/.test(document.getElementById("city_profile").value))){
			alert("Formato Città errato!");
			return false;
		}
	if(!((/^[0-9]*$/.test(document.getElementById("cap_profile").value))&& ((document.getElementById("cap_profile").value.length)==5)  )){
		alert("Formato CAP errato!");
		return false;
	}
	if(!(/^[0-9]*$/.test(document.getElementById("phone_profile").value))){
		alert("Formato Numero di Telefono errato!");
		return false;
	}
		
	if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
		venditori[posizione] = venditore;
		window.localStorage.setItem("venditore", JSON.stringify(venditori));
	}else if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="cliente"){
		clienti[posizione] = cliente;
		window.localStorage.setItem("cliente", JSON.stringify(clienti));
	}
}

function elimina_account(){
	var cliente = 
	{
		"email" : "eliminato",
		"password" : "eliminato",
		"nome" : "eliminato",
		"cognome" : "eliminato",
		"numero_telefono" : "eliminato",
		"indirizzo" : "eliminato",
		"citta" : "eliminato",
		"cap" : "eliminato",
		"preferenze" : preferenze,
		"film_noleggio" : film_noleggio,
		"film_comprati" : film_comprati,
		"info_pagamento" : "eliminato",
	}
	
	var venditore =
	{
		"email" : "eliminato",
		"password" : "eliminato",
		"nome_negozio" : document.getElementById("shop_name_profile").value,
		"partita_iva" : "eliminato",
		"numero_telefono" : "eliminato",
		"indirizzo" : "eliminato",
		"citta" : "eliminato",
		"cap" : "eliminato",
		"preferenze" : preferenze,
		"film_venduti" : film_venduti,
	}

	if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
		venditori[posizione] = venditore;
		window.localStorage.setItem("venditore", JSON.stringify(venditori));
	}else if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="cliente"){
		clienti[posizione] = cliente;
		window.localStorage.setItem("cliente", JSON.stringify(clienti));
	}
	window.open("login.html")
}

function salva_preferenze(){
	var pref = document.getElementsByClassName("pref")
	for(i=0; i<pref.length; i++){
		var flag = 0
		if(pref[i].checked == false){
			for(j=0; j<preferenze.length; j++){
				if(pref[i].id==preferenze[j]){
					preferenze.splice(j, 1)
				}
			}
		}else{
			for(k=0; k<preferenze.length; k++){
				if(preferenze[k] == pref[i].id){
					flag =1
				}
			}
			if(flag==0){
				preferenze.push(pref[i].id)
			}
		}
	}
	return false
}

function get_genres(callback){
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET', "https://api.themoviedb.org/3/genre/movie/list?api_key=08c915c07ed8390a81f3e61881f8ec4d&language=it-IT", true);
	xhr2.responseType = 'json';

	xhr2.onload = function(){
		let status = xhr2.status
		if(status== 200){
			callback(null, xhr2.response)
		}else{
			callback(status)
		}
	}
	xhr2.send();
}

get_genres(function(err, data2){
	if (err != null){
		console.error(err);
	}else{
		console.log(data2)
		
		var pref = document.getElementsByClassName("pref")
		var pref_label = document.getElementsByClassName("pref_label")
		for(i=0; i<data2.genres.length; i++){
			genere.push({"id": data2.genres[i].id, "name": data2.genres[i].name});
			pref[i].id = genere[i].id
			pref_label[i].innerHTML = genere[i].name
			pref_label[i].for = genere[i].name
		}
	}
	login()
	popola_film();
});

function popola_film(){
	if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
		for(f=0; f<film_venduti.length; f++){
			var film_venduto= document.createElement("h4")
			var prezzo_vendita= document.createElement("h4")
			var br = document.createElement("br")
			film_venduto.innerHTML = film_venduti[f].nome 
			var titolo_da_cancellare = film_venduti[f].nome 
			prezzo_vendita.innerHTML = film_venduti[f].prezzo +"&nbsp;€"
			element = document.getElementById("titolo_vendita")
			element.appendChild(film_venduto)
			element.appendChild(br)
			var br = document.createElement("br")
			element2 = document.getElementById("prezzo_vendita")
			element2.appendChild(prezzo_vendita)
			element2.appendChild(br)
			var num_vendite = document.createElement("h4")
			var br = document.createElement("br")
			var conta = 0
			for(rr=0; rr<tutte_le_vendite.length; rr++){
				if(tutte_le_vendite[rr].id == film_venduti[f].id){
					conta++
				}
			}
			num_vendite.innerHTML = conta
			element10 = document.getElementById("numero_vendite")
			element10.appendChild(num_vendite)
			element10.appendChild(br)

			var num_noleggi = document.createElement("h4")
			var br = document.createElement("br")
			var conta2 = 0
			for(rrr=0; rrr<tutti_i_noleggi.length; rrr++){
				if(tutti_i_noleggi[rrr].id == film_venduti[f].id){
					conta2++
				}
			}
			num_noleggi.innerHTML = conta2
			element10 = document.getElementById("numero_noleggi")
			element10.appendChild(num_noleggi)
			element10.appendChild(br)

			var pulasnte_elimina = document.createElement("div")
			var br6 = document.createElement("br")
			pulasnte_elimina.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-cart-x' viewBox='0 0 16 16'><path d='M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z'/><path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/></svg>"
			pulasnte_elimina.setAttribute('onclick','elimina_film("' + titolo_da_cancellare +  '")')
			pulasnte_elimina.classList.add("elimina_dal_carrello")
			element11 = document.getElementById("elimina_film")
			element11.appendChild(pulasnte_elimina)
			element11.appendChild(br6)

		}
	}else if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="cliente"){
		for(ff=0; ff<film_comprati.length; ff++){
			var film_comprato = document.createElement("h4")
			var prezzo_acquisto = document.createElement("h4")
			var venduto_da = document.createElement("h4")
			var noleggio_inf = document.createElement("h4")
			var br = document.createElement("br")
			film_comprato.innerHTML = film_comprati[ff].nome
			prezzo_acquisto.innerHTML = film_comprati[ff].prezzo +"&nbsp;€"
			venduto_da.innerHTML = film_comprati[ff].nome_venditore
			noleggio_inf.innerHTML = "Infinito"
			element3 = document.getElementById("titolo_acquisto")
			element3.appendChild(film_comprato)
			element3.appendChild(br)
			var br = document.createElement("br")
			element4 = document.getElementById("prezzo_acquisto")
			element4.appendChild(prezzo_acquisto)
			element4.appendChild(br)
			var br = document.createElement("br")
			element5 = document.getElementById("venditore_acquisto")
			element5.appendChild(venduto_da)
			element5.appendChild(br)
			var br = document.createElement("br")
			element6 = document.getElementById("tempo_rimanente")
			element6.appendChild(noleggio_inf)
			element6.appendChild(br)
		}
		for(fff=0; fff<film_noleggio.length; fff++){
			var film_comprato2 = document.createElement("h4")
			var prezzo_acquisto2 = document.createElement("h4")
			var venduto_da2 = document.createElement("h4")
			var noleggio2 = document.createElement("h4")
			var br = document.createElement("br")
			film_comprato2.innerHTML = film_noleggio[fff].nome
			prezzo_acquisto2.innerHTML = film_noleggio[fff].prezzo +"&nbsp;€"
			venduto_da2.innerHTML = film_noleggio[fff].nome_venditore
			const d = new Date()
			var tempo_restante = (((film_noleggio[fff].giorni_noleggio*24*60) - (((d.getTime() - film_noleggio[fff].inizio_noleggio)/1000)/60))/60).toFixed(3)
			noleggio2.innerHTML = tempo_restante + "&nbsp;ore"
			element7 = document.getElementById("titolo_acquisto")
			element7.appendChild(film_comprato2)
			element7.appendChild(br)
			var br = document.createElement("br")
			element8 = document.getElementById("prezzo_acquisto")
			element8.appendChild(prezzo_acquisto2)
			element8.appendChild(br)
			var br = document.createElement("br")
			element9 = document.getElementById("venditore_acquisto")
			element9.appendChild(venduto_da2)
			element9.appendChild(br)
			var br = document.createElement("br")
			element10 = document.getElementById("tempo_rimanente")
			if(tempo_restante>0){
				element10.appendChild(noleggio2)
			}else{
				noleggio2.innerHTML = "Scaduto"
				element10.appendChild(noleggio2)
			}
			
			element10.appendChild(br)
		}
	}
}

function elimina_film(titolo){
	for(a=0; a<film_venduti.length; a++){
		if(titolo == film_venduti[a].nome){
			film_venduti.splice(a,1)
		}
	}
	
	for(aa=0; aa<venditori.length; aa++){
		if(JSON.parse(window.localStorage.getItem('active_account')) == venditori[aa].email){
			pos = aa;
		}
	}
	var venditore =
	{
		"email" : venditori[pos].email,
		"password" : venditori[pos].password,
		"nome_negozio" : venditori[pos].nome_negozio,
		"partita_iva" : venditori[pos].partita_iva,
		"numero_telefono" : venditori[pos].numero_telefono,
		"indirizzo" : venditori[pos].indirizzo,
		"citta" : venditori[pos].citta,
		"cap" : venditori[pos].cap,
		"preferenze" : venditori[pos].preferenze,
		"film_venduti" : film_venduti,
	}

	venditori[pos] = venditore;
	window.localStorage.setItem("venditore", JSON.stringify(venditori));
	window.location.reload()
}



//document.getElementById("email_profile").value = JSON.parse(window.localStorage.getItem('active_account'));