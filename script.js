window.addEventListener('load', () => {
	let long  ;
	let lat ;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	const temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if(navigator.geolocation){

		navigator.geolocation.getCurrentPosition(position =>{
			lat = position.coords.latitude;
			long = position.coords.longitude;

		const proxy = 'https://cors-anywhere.herokuapp.com/';	
		const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=6450498818484b008e70dc92cde21971`;
		
		fetch(api)
		.then(res => res.json())
		.then(data => {

			const temp = data.data[0].temp;
			const description = data.data[0].weather.description;
			const location = data.data[0].city_name;
			const icon = data.data[0].weather.description;
			var result = icon.substr(icon.indexOf(" ") + 1);

			//FORMULA for Farentheit
			let farent = (temp*( 5 / 9))+32;		

			//Set DOM Elements
			temperatureDegree.textContent = temp;
			temperatureDescription.textContent = description;
			locationTimezone.textContent = location;
			
			var iconcode = data.data[0].weather.icon;

		   var iconurl = `https://www.weatherbit.io/static/img/icons/${iconcode}.png`;
		   document.getElementById('wicon').setAttribute('src', iconurl);

		 //Change the background depending on daytime
		var time = new Date();
        time = time.getHours();
        var color =  "";
        if (time >= 19 || time <= 4) {
            color = "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)";
        } else if (time >= 17) {
            color = "linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)";
        } else if (time >= 7) {
            color = "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)";
        } else {
            color = "linear-gradient(to top, #09203f 0%, #537895 100%);";
        };
        
        document.querySelector('body').style.background = color;

		     //Change to Celcius
		temperatureSection.addEventListener('click', ()=>{
			
			
			if(temperatureSpan.textContent ==="C"){
				temperatureSpan.textContent ="F";
				temperatureDegree.textContent = Math.floor(farent);

			} else {
				temperatureSpan.textContent = "C";
				temperatureDegree.textContent = temp;
			}
		});

		  // function setIcons(icon, iconID){
		  	const skycons = new Skycons({color: "white"});
		  	
		  	const docID = document.getElementById("icon2");
		  	
		
		  switch (result) {
		  	//If clouds
		  	case 'clouds':
		  	if (time >=19 || time <=4) {
		  		skycons.add(docID, Skycons.PARTLY_CLOUDY_NIGHT);
		  	} else {
		  		skycons.add(docID, Skycons.PARTLY_CLOUDY_DAY);
		  	}
		  	break;
		  	//If rain
		  	case 'rain':
		  	skycons.add(docID, Skycons.RAIN);
		  	break;
		  	//If snow
		  	case 'snow':
		  	skycons.add(docID, Skycons.SNOW);
		  	break;
		  	//If clear
		  	case 'sky':
		  	if (time >=19 || time <=4) {
		  		skycons.add(docID, Skycons.CLEAR_NIGHT);
		  	} else {
		  		skycons.add(docID, Skycons.CLEAR_DAY);
		  	}
		  	break;
		  	//If fog
		  	case 'fog':
		  	skycons.add(docID, Skycons.FOG);
		  	break;

		  	default:
		  	skycons.add(docID, Skycons.CLOUDY);
		  }

  	skycons.play();

		});
		
	})};

});
