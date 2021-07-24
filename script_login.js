
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

	var preferenze = []
	var film_noleggio = new Array();
	var film_comprati = new Array();
	var film_venduti = new Array();
	var info_pagamento

	function prova(){
		if(document.getElementById("venditore").checked == true){
			var shops = document.getElementsByClassName("shop")
			var clients = document.getElementsByClassName("client")
			shops[0].hidden = false
			shops[1].hidden = false
			clients[0].hidden = true
			document.getElementById("name_register").required = false
			document.getElementById("surname_register").required = false
			document.getElementById("partita_iva_register").required = true
			document.getElementById("shop_name_register").required = true

		} else if(document.getElementById("venditore").checked == false){
			var shops = document.getElementsByClassName("shop")
			var clients = document.getElementsByClassName("client")
			shops[0].hidden = true
			shops[1].hidden = true
			clients[0].hidden = false
			document.getElementById("name_register").required = true
			document.getElementById("surname_register").required = true
			document.getElementById("partita_iva_register").required = false
			document.getElementById("shop_name_register").required = false


		}
	}
	
	function registra(){
	seller_list = JSON.parse(window.localStorage.getItem('venditore'));
	client_list = JSON.parse(window.localStorage.getItem('cliente'));
	
	if(client_list != null){
		for(i=0; i<client_list.length; i++){
			if(document.getElementById("email_register").value == client_list[i].email){
				console.log("client giá registrato");
				alert("Cliente giá registrato");
				return false;
			}
		}
	}
	
	if(seller_list != null){
		for(j=0; j<seller_list.length; j++){
			if(document.getElementById("email_register").value == seller_list[j].email){
				console.log("seller giá registrato");
				alert("Venditore giá registrato");
				return false;
			}
		}
	}

	if(document.getElementById("venditore").checked == false){
		if(!(/^[a-zA-Z]*$/.test(document.getElementById("name_register").value))){
			alert("Formato Nome errato!");
			return false;
		}
		if(!(/^[a-zA-Z]*$/.test(document.getElementById("surname_register").value))){
			alert("Formato Cognome errato!");
			return false;
		}
	}
	if(document.getElementById("venditore").checked == true){
		if(!((/^[0-9]*$/.test(document.getElementById("partita_iva_register").value))&& ((document.getElementById("partita_iva_register").value.length)==11)  )){
			alert("Formato Partita Iva errato!");
			return false;
		}
	}
	
	if(!(/^[a-zA-Z]*$/.test(document.getElementById("city_register").value))){
			alert("Formato Città errato!");
			return false;
		}
	if(!((/^[0-9]*$/.test(document.getElementById("cap_register").value))&& ((document.getElementById("cap_register").value.length)==5)  )){
		alert("Formato CAP errato!");
		return false;
	}
	if(!(/^[0-9]*$/.test(document.getElementById("phone_register").value))){
		alert("Formato Numero di Telefono errato!");
		return false;
	}

	var cliente = 
	{
		"email" : document.getElementById("email_register").value,
		"password" : document.getElementById("password_register").value,
		"nome" : document.getElementById("name_register").value,
		"cognome" : document.getElementById("surname_register").value,
		"numero_telefono" : document.getElementById("phone_register").value,
		"indirizzo" : document.getElementById("address_register").value,
		"citta" : document.getElementById("city_register").value,
		"cap" : document.getElementById("cap_register").value,
		"preferenze" : preferenze,
		"film_noleggio" : film_noleggio,
		"film_comprati" : film_comprati,
		"info_pagamento" : info_pagamento,
	}
	
	var venditore =
	{
		"email" : document.getElementById("email_register").value,
		"password" : document.getElementById("password_register").value,
		"nome_negozio" : document.getElementById("shop_name_register").value,
		"partita_iva" : document.getElementById("partita_iva_register").value,
		"numero_telefono" : document.getElementById("phone_register").value,
		"indirizzo" : document.getElementById("address_register").value,
		"citta" : document.getElementById("city_register").value,
		"cap" : document.getElementById("cap_register").value,
		"preferenze" : preferenze,
		"film_venduti" : film_venduti,
	}
		
	if(document.getElementById("venditore").checked == true){
		venditori.push(venditore);
		window.localStorage.setItem("venditore", JSON.stringify(venditori));
	}else if(document.getElementById("venditore").checked == false){
		clienti.push(cliente);
		window.localStorage.setItem("cliente", JSON.stringify(clienti));
	}
		console.log(localStorage.length)
		alert("Utente Registrato")
		return false;
	}
	

	function login(){
		seller_list = JSON.parse(window.localStorage.getItem('venditore'));
		client_list = JSON.parse(window.localStorage.getItem('cliente'));
		var flag = 0  //flag values 0=error, 1=first access go to profile, 2 normal access go to home
		if(client_list != null){
			for(i=0; i<client_list.length; i++){
				if((document.getElementById("email_login").value == client_list[i].email) && (document.getElementById("password_login").value == client_list[i].password)&&(client_list[i].email != "eliminato")){
					console.log("client login success");
					window.localStorage.setItem("tipo_utente", JSON.stringify("cliente"));
					window.localStorage.setItem("active_account", JSON.stringify(client_list[i].email));
					flag=1;
					if(client_list[i].preferenze.length != 0){
						flag=2
					}
				}
			}
		}
		
		if(seller_list != null){
			for(j=0; j<seller_list.length; j++){
				if((document.getElementById("email_login").value == seller_list[j].email) && (document.getElementById("password_login").value == seller_list[j].password)&&(seller_list[j].email != "eliminato")){
					console.log("seller login success");
					flag=1;
					window.localStorage.setItem("tipo_utente", JSON.stringify("venditore"));
					window.localStorage.setItem("active_account", JSON.stringify(seller_list[j].email));
					if(seller_list[j].preferenze.length != 0){
						flag=2
					}
				}
			}
		}
		
		if(flag==2){
			document.getElementById("success_login").hidden = false;
			document.getElementById("error_login").hidden = true;
			console.log("success");
			window.location = "home.html";
		}else if(flag==1){
			document.getElementById("success_login").hidden = false;
			document.getElementById("error_login").hidden = true;
			console.log("success");
			window.location = "profile.html";
		}else if(flag==0){
			document.getElementById("success_login").hidden = true;
			document.getElementById("error_login").hidden = false;
			console.log("fail");
		}
		return false;
	}	
	