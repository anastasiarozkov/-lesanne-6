(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            let elpl = (h < 12 ? "EL" : "PL");
            if(h > 12){
                h -= 12;
            }
            c.innerHTML = h + ":" + m + ":" + s +" "+elpl;
            
        };
        
    });
    
    // forms
    
document.getElementById("btn-delivery").addEventListener("click", estimateDelivery);

function estimateDelivery(event) {
    event.preventDefault();
   let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    
    if (fname.value === "" || lname.value === "") {
        alert("Palun täitke kõik tekstiväljad.");
        return;
    }

     if (/\d/.test(fname.value) || /\d/.test(lname.value)) {
         alert("Ees- ja perekonnanimi ei tohi sisaldada numbreid.")
         return;
     }
     
      var radios=document.getElementsByName('radio');
      var isChecked=false;

          for(var i=0;i<radios.length;i++){
                if(radios[i].checked){
                    isChecked=true;
                    break;
                }
          }

       if(!isChecked){
            alert('Palun valige tarne tüüp.');
            return false; 
       }

    let linn = document.getElementById("linn");
    let deliveryFee = 0;

    if (linn.value === "") {
        alert("Palun valige linn nimekirjast");
        linn.focus();
        return;
    } else {
        if (linn.value === "tln") { // Tallinn -0
            deliveryFee = 0;
        } else if (linn.value === "trt" || linn.value === "nrv") { // Tartu  Narva - 2.5€ 
            deliveryFee = 2.5;
        } else if (linn.value === "prn") { // Pärnu - 3€ 
            deliveryFee = 3;
        }

        if (document.getElementById("v1").checked) { // +5
            deliveryFee += 5; 
        }
        
         if (document.getElementById("v2").checked) {// +1
            deliveryFee += 1; 
         }

         var radios=document.getElementsByName('radio');
          for(var i=0;i<radios.length;i++){
                if(radios[i].checked){
                    var selectedRadioValue=radios[i].nextElementSibling.innerText.match(/\d+/)[0];
                     console.log(selectedRadioValue);
                     break;
                }
          }
          
          //radio 0 /+5.
          deliveryFee+=parseInt(selectedRadioValue);


    }

     e.innerHTML = parseFloat(deliveryFee).toFixed(2) + "&euro;";
    
     console.log("Tarne hind on arvutatud");
}
    
})();


// map

let mapAPIKey = "AnN2OtFB5F0DnbNoPWhNObGBGhyatQ9e5cTRWN2U0H6ngTwmC4iuBM_L9dc0ja0p";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.3223, 
            26.0724
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let tartuLocation = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );        
    let newLocation = new Microsoft.Maps.Location(
            58.3849, 
            24.4884
        );
    
     let tartuPin = new Microsoft.Maps.Pushpin(tartuLocation, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });
        
        let newPin = new Microsoft.Maps.Pushpin(newLocation, {
            title: 'Tartu Ülikooli Pärnu kolledž ',
            subTitle: 'Arendab akadeemilisi traditsioone Lääne-Eestis',
            text: 'Pärnu UT'
        });

                let tartuInfobox = new Microsoft.Maps.Infobox(tartuLocation, {
            title: 'Tartu Ülikool',
            description: 'Hea koht'
        });
        
        let newInfobox = new Microsoft.Maps.Infobox(newLocation, {
            title: 'Tartu Ülikooli Pärnu kolledž',
            description: 'Arendab akadeemilisi traditsioone Lääne-Eestis'
        });

        Microsoft.Maps.Events.addHandler(tartuPin, 'click', function () {
            map.setCenter(tartuLocation);
            tartuInfobox.setOptions({ visible: true });
        });
        
        Microsoft.Maps.Events.addHandler(newPin, 'click', function () {
            map.setCenter(newLocation);
            newInfobox.setOptions({ visible: true });
        });

        map.entities.push(tartuPin);
        map.entities.push(newPin);
        map.entities.push(tartuInfobox);
        map.entities.push(newInfobox);
    }
    
// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE



