/*
【注意事項】
1.基本串接對象
url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A'
API: https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089臺灣各鄉鎮市區預報資料-臺灣各鄉鎮市區未來2天(逐3小時)
項目:
a. "elementValue": [{"value": "晴",...}..],(天氣狀況，建議用陰、晴兩種圖片來顯示，可跟menu中顯示圖片統一表示或其他呈現)
b. "elementName": "T", "description": "溫度",
c. "elementName": "PoP12h","description": "12小時降雨機率",
d.  紫外線指數
e.  其他

2.請在id="menu-frame"的容器中執行你的專案
*/


/*
範例
let records=null;
fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization="+CWB_API_KEY).then((response)=>{
	return response.json();
}).then((data)=>{
	records=data.records;
	renderRaining(0);
});
function renderRaining(page){
	let startIndex=page*10;
	let endIndex=(page+1)*10;
	const container=document.querySelector("#raining");
	for(let i=startIndex;i<endIndex;i++){
		const location=records.location[i];
		const item=document.createElement("div");
		item.className="location";
		const town=document.createElement("div");
		town.className="town";
		town.textContent=location.parameter[0].parameterValue+"、"+location.parameter[2].parameterValue;
		const amount=document.createElement("amount");
		amount.className="amount";
		amount.textContent=location.weatherElement[6].elementValue+" mm";
		item.appendChild(town);
		item.appendChild(amount);
		container.appendChild(item);
	}
}
*/



weatherFrameController()
function weatherFrameController() {
	renderHTML()
	getData()
}

function renderHTML() {
	document.getElementsByClassName('weather')[0].innerHTML = '<div id="weather-frame"></div>'
	let weatherFrameHTML = `
        <div class="fourBox">
          <div class="box">
            <div class="startTime"></div>
            <div class="boxHead"></div>
            <!-- <div class="boxBody"> -->
            <div class="WXimg"></div>
            <div class="WXtxt"></div>
            <!-- </div> -->
          </div>
          <div class="box">
            <div class="startTime"></div>
            <div class="boxHead"></div>
            <!-- <div class="boxBody"> -->
            <div class="WXimg"></div>
            <div class="WXtxt"></div>
            <!-- </div> -->
          </div>
          <div class="box">
            <div class="startTime"></div>
            <div class="boxHead"></div>
            <!-- <div class="boxBody"> -->
            <div class="WXimg"></div>
            <div class="WXtxt"></div>
            <!-- </div> -->
          </div>
          <div class="box">
            <div class="startTime"></div>
            <div class="boxHead"></div>
            <!-- <div class="boxBody"> -->
            <div class="WXimg"></div>
            <div class="WXtxt"></div>
            <!-- </div> -->
          </div>
        </div>
	`
	document.getElementById('weather-frame').innerHTML = (weatherFrameHTML)
}

let records = null
let locationName = '臺北市'

function getData() {
	fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY).then((response) => {
		return response.json()
	}).then((data) => {
		records = data.records
		taipeiLocation = records.locations[0].location
		// 圖在這裡
		// https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/01.svg
		let svgurl = 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/'
		for (let cityIndex = 0; cityIndex < taipeiLocation.length; cityIndex++) {
			if (taipeiLocation[cityIndex].locationName === locationName) {
				console.log(taipeiLocation[cityIndex].weatherElement)
				let weatherWX = taipeiLocation[cityIndex].weatherElement[6]
				let weatherPoP = taipeiLocation[cityIndex].weatherElement[0]
				let startTime, endTime, WXtxt, svgNumber, WXimg, PoPtxt
				for (let boxIndex = 0; boxIndex < 4; boxIndex++) {
					// 顯示 start time
					startTime = weatherWX.time[boxIndex].startTime
					endTime = weatherWX.time[boxIndex].endTime
					document.getElementsByClassName('startTime')[boxIndex].innerHTML = startTime.split(' ')[0].substring(5, 10).replace('-', '/')
					document.getElementsByClassName('boxHead')[boxIndex].innerHTML = String(startTime.split(' ')[1].substring(0, 2)) + '-' + (endTime.split(' ')[1].substring(0, 2))

					// 白天or晚上

					if (String(startTime.substring(11, 13)) === '18') {
						document.getElementsByClassName('boxHead')[boxIndex].innerHTML = '晚上'
						document.getElementsByClassName('box')[boxIndex].setAttribute('class', 'box night')
					} else if (String(startTime.substring(11, 13)) === '12') {
						document.getElementsByClassName('boxHead')[boxIndex].innerHTML = '下午'
						document.getElementsByClassName('box')[boxIndex].setAttribute('class', 'box afternoon')
					} else if (String(startTime.substring(11, 13)) === '00') {
						document.getElementsByClassName('boxHead')[boxIndex].innerHTML = '凌晨'
						document.getElementsByClassName('box')[boxIndex].setAttribute('class', 'box dawn')
					} else {
						document.getElementsByClassName('boxHead')[boxIndex].innerHTML = '白天'
						document.getElementsByClassName('box')[boxIndex].setAttribute('class', 'box day')
					}
					// WX:天氣現象
					WXtxt = weatherWX.time[boxIndex].elementValue[0].value
					svgNumber = weatherWX.time[boxIndex].elementValue[1].value
					WXimg = document.createElement('img')
					WXimg.setAttribute('src', svgurl + svgNumber + '.svg')
					document.getElementsByClassName('WXimg')[boxIndex].appendChild(WXimg)
					document.getElementsByClassName('WXtxt')[boxIndex].innerHTML = WXtxt

					// PoP12h: 降雨機率
					let PoP = document.createElement('div')
					PoP.setAttribute('class', 'PoPdiv')
					document.getElementsByClassName('box')[boxIndex].appendChild(PoP)

					let PoPumbrella = document.createElement('img')
					PoPumbrella.setAttribute('class', 'umbrella')
					PoPumbrella.setAttribute('src', './img/umbrella.png')
					document.getElementsByClassName('PoPdiv')[boxIndex].appendChild(PoPumbrella)

					PoPtxt = weatherPoP.time[boxIndex].elementValue[0].value
					let PoPdiv = document.createElement('div')
					PoPdiv.appendChild(document.createTextNode(PoPtxt + '%'))
					PoPdiv.setAttribute('class', 'PoPtxt')
					document.getElementsByClassName('PoPdiv')[boxIndex].appendChild(PoPdiv)



				}
			}
		}
	})
}








