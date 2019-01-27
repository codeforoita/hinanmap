$(document).ready(function() {

    
    /* ======= Fixed header when scrolled ======= */
    
    read_json();

    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 0) {
             $('#header').addClass('header-scrolled');
         }
         else {
             $('#header').removeClass('header-scrolled');
         }
    });
    
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 100});
    
    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
        
        //store hash
        var target = this.hash;
                
        e.preventDefault();
        
		$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('show')){
			$('.navbar-collapse').removeClass('show');
		}
		
	});

});

function getJson() {
     //var xmlhttp = createXMLHttpRequest(); //旧バージョンのIEなどに対応する場合
     var xmlhttp = new XMLHttpRequest();

     xmlhttp.onreadystatechange = function () {
       if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
           var data = JSON.parse(xmlhttp.responseText);

           var elem = document.getElementById("output_name");
           elem.innerText = data.name;
           var elem = document.getElementById("output_weight");
           elem.innerText = data.weight;
           var elem = document.getElementById("output_height");
           elem.innerText = data.height;
           var elem = document.getElementById("output_price");
           elem.innerText = data.price;
           var elem = document.getElementById("output_memo");
           elem.innerText = data.memo;
         } else {
         }
       }
     }
     xmlhttp.open("GET", "/assets/js/group.json");
     xmlhttp.send();
   }

   function createXMLHttpRequest() {
     if (window.XMLHttpRequest) { return new XMLHttpRequest() }
     if (window.ActiveXObject) {
       try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { }
       try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { }
       try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { }
     }
     return false;
   }
      
function leaflet_map() {
    // 現在地取得処理
    // 現在地を取得
    let promise = new Promise((resolve, reject) => { 
            navigator.geolocation.getCurrentPosition(
                // 取得成功した場合
                function(position) {
                    resolve([position.coords.latitude,position.coords.longitude]);
                }
                ,
                // 取得失敗した場合
                function(error) {
                  switch(error.code) {
                    case 1: //PERMISSION_DENIED
                      alert("位置情報の利用が許可されていません");
                      break;
                    case 2: //POSITION_UNAVAILABLE
                      alert("現在位置が取得できませんでした");
                      break;
                    case 3: //TIMEOUT
                      alert("タイムアウトになりました");
                      break;
                    default:
                      alert("その他のエラー(エラーコード:"+error.code+")");
                      break;
                  }
                }
            )
        })
    
    
    
    
    
    
    
    var var_location = new google.maps.LatLng(48.856847, 2.296832);

    var var_mapoptions = {
        center: var_location,
        zoom: 16,
        mapTypeId: 'satellite'
    };

    var var_map = new google.maps.Map(document.getElementById("map-container-3"),
        var_mapoptions);

    var var_marker = new google.maps.Marker({
        position: var_location,
        map: var_map,
        title: "Paris, France"
    });

}
