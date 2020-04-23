var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
    var losAnglelas = {lat: 34.063380, lng:-118.358080 };
    map = new google.maps.Map(document.getElementById('map'), {
      center: losAnglelas,
      zoom: 11,
      mapTypeId: 'roadmap',
    });

    infoWindow = new google.maps.InfoWindow();
    // displayStores();
    // setOnClick();
    // createStoreMarker();
    searchStore();
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}


function searchStore(){
  var foundStore=[];
  var zipcode=document.getElementById('zip-code-locator').value;

  if(zipcode){
    stores.forEach((store, index)=>{
      var postalcode=store.address.postalCode.substring(0,5);
      if(postalcode === zipcode){
          foundStore.push(store);
      }
    })
  }
  else{
    foundStore=stores;
  }


  if(foundStore.length!==0){
    console.log("inside")
    clearLocations();
    displayStores(foundStore)
    createStoreMarker(foundStore);
    setOnClick()
  }

  console.log(foundStore);
  

  // console.log(zipcode)


}


function setOnClick(){
  var storeElements=document.querySelectorAll('.store-container');  // retrieve all list container having list of data which shows on search box 
    storeElements.forEach(function(elem, index){   // looping through each elements
        elem.addEventListener('click',function(){   // adding click event listener to each elemnts of list  
          new google.maps.event.trigger(markers[index], 'click') // through call back function action occurs performs click to markers 
        })
    })

  console.log(storeElements) ; 
}

function displayStores(stores) {
  var storeHtml='';

  stores.forEach(function(store, index){
    storeHtml+=`<div class="store-container">
                      <div class="store-container-background">
                          <div  class="store-info-container">
                              <div class="store-address">
                                  <span>${store.addressLines[0]}</span>
                                  <span>${store.addressLines[1]}</span>
                              </div>

                              <div class="store-phone-number">${store.phoneNumber}</div>
                          </div>
                          <div class="store-number-container">
                              <div  class="store-number">${index+1}</div>
                          </div>

                      </div>
                </div>`
  })

  document.querySelector('.store-list').innerHTML=storeHtml;
}

function createStoreMarker(stores){
  console.log(stores)
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store, index){
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
     store.coordinates.longitude);

     name =store.name
     address=store.addressLines[0];
     bounds.extend(latlng);
     createMarker(latlng, name, address, index)
  })
  map.fitBounds(bounds);

}

function createMarker(latlng, name, address,index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index+1}`
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
   
  
  markers.push(marker);
}
    