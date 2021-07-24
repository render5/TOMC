var posizione = 0
var film_id = []
var preferenze = []
var film_venduti = []
var film_comprati = []
var film_comprati_temp = []
var film_noleggio = []
var film_noleggio_temp = []
var info_pagamento
var genere = new Array();
var actual_id
var pos =0
var totale = 0
//var film_id = new Array();

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

	function get_film(opzioni, callback, utilita){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://api.themoviedb.org/3/discover/movie?api_key=08c915c07ed8390a81f3e61881f8ec4d&language=en-US&sort_by=popularity.desc&page=1&with_watch_monetization_types=flatrate" + opzioni, true);
		xhr.responseType = 'json';

		xhr.onload = function(){
			let status = xhr.status
			if(status== 200){
				callback(null, xhr.response, utilita)
			}else{
				callback(status)
			}
		}
		xhr.send();
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

	get_film( null , function(err, data){
		if (err != null){
			console.error(err);
		}else{
			//console.log(data)
			var tendenze = document.getElementsByClassName("tendenze")
			for(i=0; i<15; i++){
				tendenze[i].src = "https://www.themoviedb.org/t/p/w500/" + data.results[i].poster_path;
				tendenze[i].setAttribute('onclick','ingrandisci('+data.results[i].id+')')
				film_id[i] = data.results[i].id;
			}	
		}
	});

	function crea_cards(sezione_id){
		crea_titolo(sezione_id)

		crea_sezione(sezione_id)

		for(i=0;i<6;i++){
			crea_card(sezione_id)
		}
	}

	function crea_card(sezione_id){
		var immagine = document.createElement("img")
		immagine.id = sezione_id + posizione;
		immagine.src=("prova.jpg")
		immagine.classList.add("carta")
		let str = sezione_id
		immagine.classList.add(str.replace(/\s+/g, '_') +"_classe")
		//var elem = document.querySelector('#img'+(posizione-1));
		document.getElementById(sezione_id).appendChild(immagine)
		//elem.after(immagine)
		posizione++
	}
	
	function crea_sezione(sezione_id){
		var sezione = document.createElement("div")
		sezione.id = sezione_id;
		sezione.classList.add("sezione")
		var nodes2 = document.querySelectorAll("*")
		var ultimo2 = nodes2[nodes2.length- 1]
		ultimo2.after(sezione)
	}

	function crea_titolo(sezione_id){
		var titolo = document.createElement("h2")
		var br1 = document.createElement("br")

		titolo.id = "titolo_" + sezione_id
		titolo.classList.add("centra")
		titolo.innerHTML = sezione_id

		var nodes = document.querySelectorAll("div")
		var ultimo = nodes[nodes.length- 1]
		//console.log(ultimo)
		ultimo.after(br1)
		var nodes = document.querySelectorAll("*")
		var ultimo = nodes[nodes.length- 1]
		ultimo.after(titolo)
	}

	function popola_sezione(){
		ottieni_preferenze();
		for(e=0; e<preferenze.length; e++){
			for(v=0; v<genere.length;v++){
				if(genere[v].id == preferenze[e]){
					crea_cards(genere[v].name)
					get_film( ("&with_genres="+preferenze[e]) ,  function(err, data, util) {
						if (err != null){
							console.error(err);
						}else{
							let str = util
							var sei_immagini = document.getElementsByClassName(str.replace(/\s+/g, '_') +"_classe")
							for(t=0; t<sei_immagini.length; t++){
								sei_immagini[t].src = "https://www.themoviedb.org/t/p/w500/" + data.results[t].poster_path;
								sei_immagini[t].setAttribute('onclick','ingrandisci('+data.results[t].id+')')
								//film_id.push(data.results[t].id);
							}
							//console.log(sei_immagini)
						}
					}, genere[v].name);
				}
			}
		}
	}

	get_genres(function(err, data2){
		if (err != null){
			console.error(err);
		}else{
			console.log(data2)
			for(i=0; i<data2.genres.length; i++){
				genere.push({"id": data2.genres[i].id, "name": data2.genres[i].name});
			}
		}
		popola_sezione()
	});

	function ottieni_preferenze(){
		seller_list = JSON.parse(window.localStorage.getItem('venditore'));
		client_list = JSON.parse(window.localStorage.getItem('cliente'));

		if(client_list != null){
			for(i=0; i<client_list.length; i++){
				if(JSON.parse(window.localStorage.getItem('active_account')) == client_list[i].email){
					preferenze = client_list[i].preferenze;
					film_comprati = client_list[i].film_comprati
					film_noleggio = client_list[i].film_noleggio
				}
			}
		}

		if(seller_list != null){
			for(j=0; j<seller_list.length; j++){
				if(JSON.parse(window.localStorage.getItem('active_account')) == seller_list[j].email){
					preferenze = seller_list[j].preferenze;
					film_venduti = seller_list[j].film_venduti
				}
			}
		}
	}
	
	function ingrandisci(id){
		actual_id = id
		if(JSON.parse(window.localStorage.getItem('tipo_utente'))=="venditore"){
			document.getElementById("pulsante_vendi").hidden =false
		}else{
			document.getElementById("pulasnte_compra").hidden =false
			document.getElementById("pulsante_noleggia").hidden =false
		}
		window.localStorage.setItem("film_id", JSON.stringify(id));
		document.getElementById("ingrandimento").hidden = false
		document.getElementById("ingrandimento_sfondo").hidden = false
		document.getElementById("ricerca_film").hidden = true

		get_film_by_id( id , function(err, data){
			if (err != null){
				console.error(err);
			}else{
				console.log(data)
				document.getElementById("immagine_ingrandita").src = "https://www.themoviedb.org/t/p/w500/" + data.poster_path;
				document.getElementById("titolo_ingrandito").innerHTML = data.title;
				document.getElementById("relase_date").innerHTML = "Relase Date: " +  data.release_date;
				document.getElementById("overview").innerHTML = data.overview;
				var generi = new Array()
				for(cc=0; cc<data.genres.length; cc++){
					generi.push("&nbsp;" + data.genres[cc].name)
				}
				document.getElementById("generi").innerHTML = "<b>Generi: </b>" + generi;
			}
		});
		get_credits( id , function(err, data5){
			if (err != null){
				console.error(err);
			}else{
				console.log(data5)
				document.getElementById("regista").innerHTML = "<b>Regista:</b> "
				for(ccc=0; ccc<data5.crew.length; ccc++){
					if(data5.crew[ccc].known_for_department == "Directing"){
						document.getElementById("regista").innerHTML = "<b>Regista:</b> " + data5.crew[ccc].name;
					}
				}
				
				var attori = new Array()
				var massimo_attori = 20
				for(cccc=0; cccc<data5.cast.length; cccc++){
					if(data5.cast[cccc].known_for_department == "Acting" && massimo_attori >= 0){
						attori.push("&nbsp;" + data5.cast[cccc].name)
					}
					massimo_attori--
				}
				document.getElementById("attori").innerHTML = "<b>Attori: </b>" + attori;
			}
		});

	}

	function get_film_by_id(opzioni, callback){
		var xhr4 = new XMLHttpRequest();
		xhr4.open('GET', "https://api.themoviedb.org/3/movie/"+ opzioni + "?api_key=08c915c07ed8390a81f3e61881f8ec4d&language=it-IT", true);
		xhr4.responseType = 'json';

		xhr4.onload = function(){
			let status = xhr4.status
			if(status== 200){
				callback(null, xhr4.response)
			}else{
				callback(status)
			}
		}
		xhr4.send();
	}

	function get_credits(opzioni, callback){
		var xhr7 = new XMLHttpRequest();
		xhr7.open('GET', "https://api.themoviedb.org/3/movie/"+ opzioni + "/credits?api_key=08c915c07ed8390a81f3e61881f8ec4d&language=it-IT", true);
		xhr7.responseType = 'json';

		xhr7.onload = function(){
			let status = xhr7.status
			if(status== 200){
				callback(null, xhr7.response)
			}else{
				callback(status)
			}
		}
		xhr7.send();
	}

	function get_film_by_keyword(opzioni, callback){
		var xhr5 = new XMLHttpRequest();
		xhr5.open('GET', "https://api.themoviedb.org/3/search/movie?api_key=08c915c07ed8390a81f3e61881f8ec4d&language=it-IT&query=" + opzioni + "&page=1&include_adult=false", true);
		xhr5.responseType = 'json';

		xhr5.onload = function(){
			let status = xhr5.status
			if(status== 200){
				callback(null, xhr5.response)
			}else{
				callback(status)
			}
		}
		xhr5.send();
	}

	function nascondi(){
		document.getElementById("ingrandimento").hidden = true
		document.getElementById("ingrandimento_sfondo").hidden = true
		document.getElementById("immagine_ingrandita").src = "prova.jpg"
		document.getElementById("ricerca_film").hidden = true
		document.getElementById("vendi_compra").hidden = true
		document.getElementById("modulo_pagamento").hidden =true
		document.getElementById("contenuto_carrello").hidden =true
		document.getElementById('ingrandimento_sfondo2').hidden = true
	}

	function cerca_film(stringa){
		get_film_by_keyword(stringa , function(err, data3){
			if (err != null){
				console.error(err);
			}else{
				console.log(data3)
				document.getElementById("ricerca_film").hidden = false
				document.getElementById("ingrandimento").hidden = true
				document.getElementById("ingrandimento_sfondo").hidden = false
				for(q=0; q<1000; q++){
					element = document.getElementById("ricerca_film")
					if(element.children.length > 0){
						element.removeChild(element.lastElementChild);
					}
				}
				for(w=0; w<data3.results.length; w++){
					var film_cercato = document.createElement("h2")
					var br6 = document.createElement("br")
					film_cercato.innerHTML = data3.results[w].title
					film_cercato.classList.add("risultato_ricerca")
					film_cercato.setAttribute('onclick','ingrandisci('+data3.results[w].id+')')
					element = document.getElementById("ricerca_film")
					element.appendChild(film_cercato)
					element.appendChild(br6)
				}
			}
		});
		return false;
	}

	function vendi_compra(modalita){
		nascondi()
		document.getElementById("ingrandimento_sfondo").hidden = false
		document.getElementById("vendi_compra").hidden = false
		get_film_by_id( actual_id , function(err, data7){
			if (err != null){
				console.error(err);
			}else{
				console.log(data7)
				document.getElementById("immagine_vendi_compra").src = "https://www.themoviedb.org/t/p/w500/" + data7.poster_path;
				document.getElementById("titolo_vendi_compra").innerHTML = data7.title;
			}
		});
		var chi_lo_vende_variabile = chi_lo_vende(actual_id)
		if(modalita == "vendi"){
			document.getElementById("pulsante_vendi2").hidden = false
			document.getElementById("compra2").hidden = true
			document.getElementById("pulsante_noleggia2").hidden = true
			document.getElementById("sezione_venditore").hidden = false
			document.getElementById("sezione_cliente").hidden = true
		}else if(modalita == "compra"){
			pulisci_tutto();
			document.getElementById("sezione_compra").hidden = false
			document.getElementById("sezione_noleggia").hidden = true
			document.getElementById("pulsante_vendi2").hidden = true
			document.getElementById("compra2").hidden = false
			document.getElementById("pulsante_noleggia2").hidden = true
			document.getElementById("sezione_venditore").hidden = true
			document.getElementById("sezione_cliente").hidden = false
			for(ss=0; ss<chi_lo_vende_variabile.length; ss++){
				//console.log(chi_lo_vende_variabile)
				var selettore = document.createElement("input");
				var nome_negozio = document.createElement("h5")
				var prezzo_shop = document.createElement("h5")
				var br7 = document.createElement("br")
				var br8 = document.createElement("br")
				var br9 = document.createElement("br")
				var br15 = document.createElement("br")
				selettore.setAttribute('type',"radio");
				selettore.setAttribute('name', "venditore")
				selettore.id = chi_lo_vende_variabile[ss].nome_shop
				selettore.classList.add("big")
				selettore.classList.add("selettore")
				nome_negozio.innerHTML = chi_lo_vende_variabile[ss].nome_shop
				prezzo_shop.innerHTML = chi_lo_vende_variabile[ss].prezzo
				prezzo_shop.classList.add("prezzo_selettore")
				elem1 = document.getElementById("selettore_compra")
				elem2 = document.getElementById("venditore_compra")
				elem3 = document.getElementById("prezzo_compra")
				elem1.appendChild(selettore)
				elem1.appendChild(br7)
				elem1.appendChild(br15)
				elem2.appendChild(nome_negozio)
				elem2.appendChild(br8)
				elem3.appendChild(prezzo_shop)
				elem3.appendChild(br9)
			}
			
		}else if(modalita == "noleggia"){
			pulisci_tutto();
			document.getElementById("sezione_compra").hidden = true
			document.getElementById("sezione_noleggia").hidden = false
			document.getElementById("pulsante_vendi2").hidden = true
			document.getElementById("compra2").hidden = true
			document.getElementById("pulsante_noleggia2").hidden = false
			document.getElementById("sezione_venditore").hidden = true
			document.getElementById("sezione_cliente").hidden = false
			for(jj=0; jj<chi_lo_vende_variabile.length; jj++){
				var selettore2 = document.createElement("input");
				var nome_negozio2 = document.createElement("h5")
				var prezzo_shop2 = document.createElement("h5")
				var prezzo_shop_totale = document.createElement("h5")
				var br10 = document.createElement("br")
				var br11 = document.createElement("br")
				var br12 = document.createElement("br")
				var br13 = document.createElement("br")
				var br14 = document.createElement("br")
				selettore2.setAttribute('type',"radio");
				selettore2.setAttribute('name', "venditore")
				selettore2.id = chi_lo_vende_variabile[jj].nome_shop
				selettore2.classList.add("big")
				selettore2.classList.add("selettore2")
				nome_negozio2.innerHTML = chi_lo_vende_variabile[jj].nome_shop
				prezzo_shop_totale.innerHTML = chi_lo_vende_variabile[jj].prezzo
				prezzo_shop2.classList.add("prezzo_selettore2")
				prezzo_shop_totale.classList.add("disabled")
				prezzo_shop_totale.classList.add("prezzo_noleggio_acquisto")
				elem4 = document.getElementById("selettore_noleggia")
				elem5 = document.getElementById("venditore_noleggia")
				elem6 = document.getElementById("prezzo_noleggia")
				elem7 = document.getElementById("prezzo_noleggia_vendita")
				elem4.appendChild(selettore2)
				elem4.appendChild(br10)
				elem4.appendChild(br14)
				elem5.appendChild(nome_negozio2)
				elem5.appendChild(br11)
				elem6.appendChild(prezzo_shop2)
				elem6.appendChild(br12)
				elem7.appendChild(prezzo_shop_totale)
				elem7.appendChild(br13)
			}
			calcola_noleggio_generica(document.getElementById('contatore_giorni').value)
		}
	}

	function calcola_noleggio(prezzo){
		document.getElementById('prezzo_vendita').value = prezzo
		document.getElementById('slider_prezzo').value = prezzo
		document.getElementById('prezzo_giorno1').value = ((prezzo)*0.5 * (Math.log(1+12)-1.5)).toFixed(2)
		document.getElementById('prezzo_giorno3').value = ((prezzo)*0.5 * (Math.log(3+12)-1.5)).toFixed(2)
		document.getElementById('prezzo_giorno7').value = ((prezzo)*0.5 * (Math.log(7+12)-1.5)).toFixed(2)
	}

	function calcola_noleggio_generica(giorni){
		var display_prezzi = document.getElementsByClassName("prezzo_selettore2")
		var prezzi_acquisto = document.getElementsByClassName("prezzo_noleggio_acquisto")
		for(m=0; m<display_prezzi.length; m++){
			var mezzo_prezzo = prezzi_acquisto[m].innerHTML*0.5
			var prezzo_giorni = (Math.log(parseInt(giorni)+12)-1.5)
			display_prezzi[m].innerHTML = (mezzo_prezzo * prezzo_giorni).toFixed(2)
			console.log(parseInt(giorni))
		}
		 
	}

	function vendi(prezzo, nome){
		console.log(prezzo)
		for(ll=0; ll<film_venduti.length; ll++){
			if(film_venduti[ll].id == actual_id){
				film_venduti.splice(ll, 1)
			}
		}
		film_venduti.push({"id": actual_id, "prezzo": prezzo, "nome" : nome});
			
			if(venditori != null){
				for(j=0; j<venditori.length; j++){
					if(JSON.parse(window.localStorage.getItem('active_account')) == venditori[j].email){
						console.log("venditore trovato");
						pos = j;
					}
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
				"preferenze" : preferenze,
				"film_venduti" : film_venduti,
			}
			
		venditori[pos] = venditore;
		window.localStorage.setItem("venditore", JSON.stringify(venditori));
		nascondi()
		alert("Film Venduto")
		return false
	}

	function compra(){
		var sel = document.getElementsByClassName("selettore")
		var prz = document.getElementsByClassName("prezzo_selettore")
		for(gg=0; gg<sel.length; gg++){
			if(sel[gg].checked == true){
				console.log("Acquisto effettuato")
				film_comprati_temp.push({"id": actual_id, "prezzo": prz[gg].innerHTML, "nome_venditore" : sel[gg].id, "nome" : document.getElementById("titolo_vendi_compra").innerHTML});
				var titolo2 = document.createElement("h5")
				var br4 = document.createElement("br")
				titolo2.innerHTML = document.getElementById("titolo_vendi_compra").innerHTML
				titolo2.classList.add("titolo_carrello_compra")
				var element4 = document.getElementById("titolo_carrello")
				element4.appendChild(titolo2)
				element4.appendChild(br4)

				var prezzo2 = document.createElement("h5")
				var br5 = document.createElement("br")
				prezzo2.innerHTML = prz[gg].innerHTML + "&nbsp;€"
				prezzo2.classList.add("prezzo_carrello_compra")
				var element5 = document.getElementById("prezzo_carrello")
				element5.appendChild(prezzo2)
				element5.appendChild(br5)

				var pulsante2 = document.createElement("div")
				var br6 = document.createElement("br")
				var titolo_da_rimuovere = document.getElementById("titolo_vendi_compra").innerHTML
				pulsante2.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-cart-x' viewBox='0 0 16 16'><path d='M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z'/><path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/></svg>"
				pulsante2.setAttribute('onclick','elimina_carrello2("' + titolo_da_rimuovere +  '")')
				pulsante2.classList.add("elimina_dal_carrello")
				pulsante2.classList.add("elimina_dal_carrello_compra")
				var element6 = document.getElementById("elimina_carrello")
				element6.appendChild(pulsante2)
				element6.appendChild(br6)
				var pallino = document.getElementById("animazione_carrello")
				reset_animation()
				pallino.style.animationPlayState = 'running';
			}
		}
		nascondi()
		return false
	}

	function chi_lo_vende(id){
		var chi_lo_vende_variabile = []
		for(zz=0; zz<venditori.length ; zz++){
			for(yy=0; yy<venditori[zz].film_venduti.length ; yy++){
				if(venditori[zz].email != "eliminato"){
					if(venditori[zz].film_venduti[yy].id == id){
						chi_lo_vende_variabile.push({"nome_shop" : venditori[zz].nome_negozio, "prezzo" : venditori[zz].film_venduti[yy].prezzo })
					}
				}
			}
		}
		return chi_lo_vende_variabile
	}

	function noleggia(){
		var sel2 = document.getElementsByClassName("selettore2")
		var prz2 = document.getElementsByClassName("prezzo_selettore2")
		for(hh=0; hh<sel2.length; hh++){
			if(sel2[hh].checked == true){
				console.log("Noleggio effettuato")
				const d = new Date()
				film_noleggio_temp.push({"id": actual_id, "prezzo": prz2[hh].innerHTML, "nome_venditore" : sel2[hh].id, "nome" : document.getElementById("titolo_vendi_compra").innerHTML, "giorni_noleggio": parseInt(document.getElementById('contatore_giorni').value), "inizio_noleggio": d.getTime()});
				var titolo1 = document.createElement("h5")
				var br1 = document.createElement("br")
				titolo1.innerHTML = document.getElementById("titolo_vendi_compra").innerHTML
				titolo1.classList.add("titolo_carrello_noleggio")
				var element1 = document.getElementById("titolo_carrello")
				element1.appendChild(titolo1)
				element1.appendChild(br1)
				var prezzo1 = document.createElement("h5")
				var br2 = document.createElement("br")
				prezzo1.innerHTML = prz2[hh].innerHTML + "&nbsp;€"
				prezzo1.classList.add("prezzo_carrello_noleggio")
				var element2 = document.getElementById("prezzo_carrello")
				element2.appendChild(prezzo1)
				element2.appendChild(br2)
				var pulsante = document.createElement("div")
				var br3 = document.createElement("br")
				var titolo_da_rimuovere = document.getElementById("titolo_vendi_compra").innerHTML
				pulsante.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-cart-x' viewBox='0 0 16 16'><path d='M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z'/><path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'/></svg>"
				pulsante.setAttribute('onclick','elimina_carrello("' + titolo_da_rimuovere +  '")')
				pulsante.classList.add("elimina_dal_carrello")
				pulsante.classList.add("elimina_dal_carrello_noleggio")
				var element3 = document.getElementById("elimina_carrello")
				element3.appendChild(pulsante)
				element3.appendChild(br3)
				var pallino = document.getElementById("animazione_carrello")
				reset_animation()
				pallino.style.animationPlayState = 'running';
			}
		}
		nascondi()
		return false
	}

	function calcola_totale(){
		for(p=0; p<film_noleggio_temp.length; p++){
			totale = parseFloat(totale) + parseFloat(film_noleggio_temp[p].prezzo)
		}
		for(pp=0; pp<film_comprati_temp.length; pp++){
			totale = parseFloat(totale) + parseFloat(film_comprati_temp[pp].prezzo)
		}
		document.getElementById("totale_da_pagare").innerHTML = (totale).toFixed(2) + "&nbsp;€"
		var pos = 0
		if(clienti != null){
			for(kk=0; kk<clienti.length; kk++){
				if(JSON.parse(window.localStorage.getItem('active_account')) == clienti[kk].email){
					pos = kk;
				}
			}
			if(clienti[pos].info_pagamento != null){
				document.getElementById("numero_carta1").value = clienti[pos].info_pagamento.crd1
				console.log(clienti[pos].info_pagamento.crd1)
				document.getElementById("numero_carta2").value = clienti[pos].info_pagamento.crd2
				document.getElementById("numero_carta3").value = clienti[pos].info_pagamento.crd3
				document.getElementById("numero_carta4").value = clienti[pos].info_pagamento.crd4
				document.getElementById("scadenza_carta_mese").value = clienti[pos].info_pagamento.scd1
				document.getElementById("scadenza_carta_anno").value = clienti[pos].info_pagamento.scd2
			}
		}
	}

	function paga(){
		info_pagamento = {
			"crd1": document.getElementById("numero_carta1").value,
			"crd2": document.getElementById("numero_carta2").value,
			"crd3": document.getElementById("numero_carta3").value,
			"crd4": document.getElementById("numero_carta4").value,
			"scd1": document.getElementById("scadenza_carta_mese").value,
			"scd2": document.getElementById("scadenza_carta_anno").value,
			}
			if(clienti != null){
				for(k=0; k<clienti.length; k++){
					if(JSON.parse(window.localStorage.getItem('active_account')) == clienti[k].email){
						console.log("cliente trovato");
						pos = k;
					}
				}
			}
			for(n=0; n<film_noleggio_temp.length; n++){
				film_noleggio.push(film_noleggio_temp[n])
			}
			for(nn=0; nn<film_comprati_temp.length; nn++){
				film_comprati.push(film_comprati_temp[nn])
			}
			var cliente =
			{
				"email" : clienti[pos].email,
				"password" : clienti[pos].password,
				"nome" : clienti[pos].nome,
				"cognome" : clienti[pos].cognome,
				"numero_telefono" : clienti[pos].numero_telefono,
				"indirizzo" : clienti[pos].indirizzo,
				"citta" : clienti[pos].citta,
				"cap" : clienti[pos].cap,
				"preferenze" : preferenze,
				"film_comprati" : film_comprati,
				"film_noleggio" : film_noleggio,
				"info_pagamento" : info_pagamento
			}
			
		clienti[pos] = cliente;
		window.localStorage.setItem("cliente", JSON.stringify(clienti));
		nascondi();


		return false
	}

	function elimina_carrello(titolo){
		var flag = 0
		var titoli = document.getElementsByClassName("titolo_carrello_noleggio")
		var prezzi = document.getElementsByClassName("prezzo_carrello_noleggio")
		var pulsanti = document.getElementsByClassName("elimina_dal_carrello_noleggio")
		for(u=0; u<titoli.length; u++){
			if(titoli[u].innerHTML == "Eliminato"){
				flag++
			}else if(titoli[u].innerHTML == titolo){
				film_noleggio_temp.splice(u-flag, 1)
				titoli[u].innerHTML = "Eliminato"
				prezzi[u].innerHTML = "0&nbsp;€"
				pulsanti[u].classList.add("disabled")
			}
		}
	}

	function elimina_carrello2(titolo){
		var flag = 0
		var titoli = document.getElementsByClassName("titolo_carrello_compra")
		var prezzi = document.getElementsByClassName("prezzo_carrello_compra")
		var pulsanti = document.getElementsByClassName("elimina_dal_carrello_compra")
		for(uu=0; uu<titoli.length; uu++){
			if(titoli[uu].innerHTML == "Eliminato"){
				flag++
			}else if(titoli[uu].innerHTML == titolo){
				film_comprati_temp.splice(uu-flag, 1)
				titoli[uu].innerHTML = "Eliminato"
				prezzi[uu].innerHTML = "0&nbsp;€"
				pulsanti[uu].classList.add("disabled")
			}
		}
	}

	function pulisci(elemento_da_pulire){
		for(qq=0; qq<100; qq++){
			elemento1 = document.getElementById(elemento_da_pulire)
			if(elemento1.children.length > 0){
				elemento1.removeChild(elemento1.lastElementChild);
			}
		}
	}
	function pulisci_tutto(){
		pulisci("selettore_compra")
		pulisci("venditore_compra")
		pulisci("prezzo_compra")
		pulisci("selettore_noleggia")
		pulisci("venditore_noleggia")
		pulisci("prezzo_noleggia")
		pulisci("prezzo_noleggia_vendita")
	}

	function reset_animation() {
		var el = document.getElementById('animazione_carrello');
		el.style.animation = 'none';
		el.offsetHeight; /* trigger reflow */
		el.style.animation = null; 
	  }