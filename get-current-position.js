// ユーザーの端末がGeoLocation APIに対応しているかの判定

// 対応している場合
if( navigator.geolocation )
{
	// 現在地を取得
	navigator.geolocation.getCurrentPosition(

		// [第1引数] 取得に成功した場合の関数
		function( position )
		{
			// 取得したデータの整理
			var data = position.coords ;

			// データの整理
			var lat = data.latitude ;
			var lng = data.longitude ;
			var alt = data.altitude ;
			var accLatlng = data.accuracy ;
			var accAlt = data.altitudeAccuracy ;
			var heading = data.heading ;			//0=北,90=東,180=南,270=西
			var speed = data.speed ;

			// アラート表示
//			alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

			// HTMLへの書き出し
			document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd></dl>' ;
			
			//避難ビルJSONファイル読み込み
			//var dataj = readjson ();
			var hinanbld = [{ "type": "Point", "coordinates": [33.231, 131.606], "title": "J：COMホルトホール大分" },
				{ "type": "Point", "coordinates": [33.228, 131.612], "title": "上野ヶ丘中学校" },
				{ "type": "Point", "coordinates": [33.221, 131.611], "title": "大分上野丘高等学校" },
				{ "type": "Point", "coordinates": [33.235, 131.611], "title": "コンパルホール" },
				{ "type": "Point", "coordinates": [33.241, 131.608], "title": "（旧）荷揚町小学校体育館" },
				{ "type": "Point", "coordinates": [33.236, 131.619], "title": "長浜小学校" },
				{ "type": "Point", "coordinates": [33.244, 131.608], "title": "（旧）中島小学校" },
				{ "type": "Point", "coordinates": [33.246, 131.613], "title": "碩田ハイツ" },
				{ "type": "Point", "coordinates": [33.239, 131.612], "title": "大分県庁舎" },
				{ "type": "Point", "coordinates": [33.238, 131.611], "title": "大分県庁舎" },
			];
			
			//現在位置との距離を算出する
			document.getElementById( 'output_dist1' ).innerHTML = '<a class="btn btn-cta btn-primary btn-block" href="#features" onclick="getroute(' + lat + ',' + lng + ',' + ',' + hinanbld[2].coordinates[0] + ',' + hinanbld[2].coordinates[1] + ');">' + hinanbld[2].title + '（' + String(google_distance(lat, lng, hinanbld[2].coordinates[0], hinanbld[2].coordinates[1])).split(".")[0] + 'm）</a>';
			document.getElementById( 'output_dist2' ).innerHTML = '<a class="btn btn-cta btn-primary btn-block" href="#features" onclick="getroute(' + lat + ',' + lng + ',' + ',' + hinanbld[3].coordinates[0] + ',' + hinanbld[3].coordinates[1] + ');">' + hinanbld[3].title + '（' + String(google_distance(lat, lng, hinanbld[3].coordinates[0], hinanbld[3].coordinates[1])).split(".")[0] + 'm）</a>';
			document.getElementById( 'output_dist3' ).innerHTML = '<a class="btn btn-cta btn-primary btn-block" href="#features" onclick="getroute(' + lat + ',' + lng + ',' + ',' + hinanbld[4].coordinates[0] + ',' + hinanbld[4].coordinates[1] + ');">' + hinanbld[4].title + '（' + String(google_distance(lat, lng, hinanbld[4].coordinates[0], hinanbld[4].coordinates[1])).split(".")[0] + 'm）</a>';
			//new google_distance(lat, lng, hinanbld[0].coordinates[0], hinanbld[0].coordinates[1]);

	var mymap = L.map('mapid').setView([lat, lng], 17);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

for (var i = 0; i < 10; i++) {
	L.marker([hinanbld[i].coordinates[0], hinanbld[i].coordinates[1]])
		.setIcon(L.icon({
        	iconUrl: "tunamihinannbiru.png", 
        	iconAnchor: [8, 8], 
        	popupAnchor: [0,-8]
        })).addTo(mymap)
		.bindPopup(hinanbld[i].title);
}

            // L.Routing.Localizationに日本語リソースを追加
            L.Routing.Localization['ja'] = {
                directions: {
                    N: '北',
                    NE: '北東',
                    E: '東',
                    SE: '南東',
                    S: '南',
                    SW: '南西',
                    W: '西',
                    NW: '北西'
                },
                instructions: {
                    // instruction, postfix if the road is named
                    'Head':
                        ['{road} {dir}方向', ''],
                    'Continue':
                        ['{road} {dir}方向道なり', ''],
                    'SlightRight':
                        ['{road} 右方向', ''],
                    'Right':
                        ['{road} 右折',''],
                    'SharpRight':
                        ['{road} 右急カーブ', ''],
                    'TurnAround':
                        ['Uターン', ''],
                    'SharpLeft':
                        ['{road} 左急カーブ', ''],
                    'Left':
                        ['{road} 左折', ''],
                    'SlightLeft':
                        ['{road} 左方向', ''],
                    'WaypointReached':
                        ['分岐点到着'],
                    'Roundabout':
                        ['Take the {exitStr} exit in the roundabout', ' onto {road}'],
                    'DestinationReached':
                        ['目的地到着'],
                },
                formatOrder: function(n) {
                    return n;
                }
            };


        mymap.on( 'moveend', function( event ) {
        } );
        
        var pulsingIcon = L.icon.pulse({iconSize:[14,14],color:'red'});
        L.marker([lat, lng],{icon: pulsingIcon,title: 'This is pulsing icon'}).addTo(mymap);

        L.Routing.control({
    waypoints: [
        L.latLng(lat,lng),
        L.latLng(hinanbld[3].coordinates[0], hinanbld[3].coordinates[1])
    ],
}).addTo(mymap)

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}

	mymap.on('click', onMapClick);

/**
 * getroute
 **/
function getroute($lat1, $lon1, $lat2, $lon2) {
//	var map = L.map('mapid');

L.Routing.control({
    waypoints: [
        L.latLng($lat1, $lat1),
        L.latLng($lat2, $lat1)
    ],
    routeWhileDragging: true
}).addTo(mymap);
}

		},

		// [第2引数] 取得に失敗した場合の関数
		function( error )
		{
			// エラーコード(error.code)の番号
			// 0:UNKNOWN_ERROR				原因不明のエラー
			// 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
			// 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
			// 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

			// エラー番号に対応したメッセージ
			var errorInfo = [
				"原因不明のエラーが発生しました…。" ,
				"位置情報の取得が許可されませんでした…。" ,
				"電波状況などで位置情報が取得できませんでした…。" ,
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			] ;

			// エラー番号
			var errorNo = error.code ;

			// エラーメッセージ
			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

			// アラート表示
			alert( errorMessage ) ;

			// HTMLに書き出し
			document.getElementById("result").innerHTML = errorMessage;
		} ,

		// [第3引数] オプション
		{
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 2000,
		}

	) ;
}

// 対応していない場合
else
{
	// エラーメッセージ
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

	// アラート表示
	alert( errorMessage ) ;

	// HTMLに書き出し
	document.getElementById( 'result' ).innerHTML = errorMessage ;
}

/**
 * 避難ビルデータ読み込み
 **/
function readjson () {
     var xmlhttp = new XMLHttpRequest();
     var dataj = [];

     xmlhttp.onreadystatechange = function () {
       if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
           dataj = JSON.parse(xmlhttp.responseText);
           
           var elem = document.getElementById("output_name");
           elem.innerText = dataj[0].title;
           var elem = document.getElementById("output_weight");
           elem.innerText = dataj[0].coordinates[0];
           var elem = document.getElementById("output_height");
           elem.innerText = dataj[0].coordinates[1];
//           var elem = document.getElementById("output_price");
//           elem.innerText = data.price;
//           var elem = document.getElementById("output_memo");
//           elem.innerText = data.memo;
           return dataj;
         } else {
         }
       }
     }
     xmlhttp.open("GET", "assets/js/group.json");
     xmlhttp.send();
   }

/**
 * createXMLHttpRequest
 **/
function createXMLHttpRequest() {
	if (window.XMLHttpRequest) { return new XMLHttpRequest() }
	if (window.ActiveXObject) {
		try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { }
		try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { }
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { }
	}
	return false;
}

/**
 * ２地点間の距離を求める
 *   GoogleMapAPIのgeometory.computeDistanceBetweenのロジック
 *   浮動小数点の精度が足りないためGoogleより桁数が少ないかもしれません
 *
 * @param float $lat1 緯度１
 * @param float $lon1 経度１
 * @param float $lat2 緯度２
 * @param float $lon2 経度２
 * @return float 距離(m)
 **/
function google_distance($lat1, $lon1, $lat2, $lon2) {
    // 緯度経度をラジアンに変換
    $radLat1 = deg2rad($lat1); // 緯度１
    $radLon1 = deg2rad($lon1); // 経度１
    $radLat2 = deg2rad($lat2); // 緯度２
    $radLon2 = deg2rad($lon2); // 経度２

    $r = 6378137.0; // 赤道半径

    $averageLat = ($radLat1 - $radLat2) / 2;
    $averageLon = ($radLon1 - $radLon2) / 2;
    return $r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin($averageLat), 2) + Math.cos($radLat1) * Math.cos($radLat2) * Math.pow(Math.sin($averageLon), 2)));
}

/**
 * createXMLHttpRequest
 **/
function deg2rad(d) {
	return d/180*Math.PI;
}

