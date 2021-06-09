/*
【注意事項】
1.基本串接對象
API: https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089臺灣各鄉鎮市區預報資料-臺灣各鄉鎮市區未來2天(逐3小時)
項目: 
a. "elementValue": [{"value": "晴",...}..],(天氣狀況，建議用陰、晴兩種圖片來顯示)
b. "elementName": "T", "description": "溫度",(這好像要抓取來取最大值、最小值)
c. "elementValue": [{"value": "多雲。降雨機率 10%。...}] (我找到概況的降雨機率，好像還有其他的降雨機率，可以再找找看)

2.請在id="menu-frame"的容器中執行你的專案
*/


/*
範例
*/
// let records=null;
// fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization="+CWB_API_KEY).then((response)=>{
// 	return response.json();
// }).then((data)=>{
// 	records=data.records;
// 	renderRaining(0);
// });
// function renderRaining(page){
// 	let startIndex=page*10;
// 	let endIndex=(page+1)*10;
// 	const container=document.querySelector("#raining");
// 	for(let i=startIndex;i<endIndex;i++){
// 		const location=records.location[i];
// 		const item=document.createElement("div");
// 		item.className="location";
// 		const town=document.createElement("div");
// 		town.className="town";
// 		town.textContent=location.parameter[0].parameterValue+"、"+location.parameter[2].parameterValue;
// 		const amount=document.createElement("amount");
// 		amount.className="amount";
// 		amount.textContent=location.weatherElement[6].elementValue+" mm";
// 		item.appendChild(town);
// 		item.appendChild(amount);
// 		container.appendChild(item);
// 	}
// }


menuFrameController()
function menuFrameController(){
    renderHTML()
	getData()
}


function renderHTML(){
    // let description = document.createElement('div')
    // description.textContent = "各地近12小時天氣預報"
    // let class_menu = document.querySelector('.menu')
    // class_menu.append(description)
    document.getElementsByClassName('menu')[0].innerHTML = 
    '<div class="description">各地近3小時天氣預報</div><div id="menu-frame"></div>';
    let id_menu_frame = document.querySelector('#menu-frame');
    
    
    
    for (let i = 1; i <= 21; i++){
        let box_location = document.createElement('div');
        box_location.setAttribute('id', 'box_no_' +i);
        box_location.setAttribute('class', 'administrative_district');
        let location_name = document.createElement('div')
        location_name.setAttribute('class', 'location_name')
        let location_whether = document.createElement('img')
        location_whether.setAttribute('class', 'location_whether')
        
        let raining_rate = document.createElement('div');
        raining_rate.setAttribute('class', 'location_raining_rate');
        
        box_location.append(location_name, location_whether, raining_rate)

        id_menu_frame.append(box_location);
    }
}


function getData(){
    api_url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=" + CWB_API_KEY

    fetch(api_url).then( res => {
        return res.json()
    }).then( data => {
        // 圖在這裡
		// https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/01.svg
		let svgurl = 'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/'
        location_records = data.records.locations[0] //全台資料
        let all_laptitude ={};
        for (let i = 1; i <= 21; i++){
            let location_name = location_records['location'][i]['locationName'];
            let id_box_no = '#box_no_'+i;
            let box_location_no = document.querySelector(id_box_no)
            let class_location_name = box_location_no.querySelector('.location_name')
            class_location_name.append(location_name)
            

            let location_whether_code = location_records['location'][i]['weatherElement'][1]['time'][0]['elementValue'][1]['value']
            
            let class_location_whether = box_location_no.querySelector('.location_whether')
            
            class_location_whether.setAttribute('src', svgurl + location_whether_code + '.svg')
            
            
            let location_raining_rate = location_records['location'][i]['weatherElement'][7]['time'][1]['elementValue'][0]['value']
            let class_location_raining_rate = box_location_no.querySelector('.location_raining_rate')
            class_location_raining_rate.append('降雨率 ' + location_raining_rate +'%')
            
            let location_temp = location_records['location'][i]['weatherElement'][3]['time'][0]['elementValue'][0]['value']
            let location_temp_body = location_records['location'][i]['weatherElement'][2]['time'][0]['elementValue'][0]['value']
            // console.log("🚀 ~ file: menu.js ~ line 114 ~ fetch ~ location_temp_body", location_temp_body)
            // console.log("🚀 ~ file: menu.js ~ line 92 ~ fetch ~ location_whether", location_temp)

            let laptitude = location_records['location'][i]['lat']
            all_laptitude[location_name] = parseFloat(laptitude)
            
        }

        location_sorted_by_laptitude = Object.keys(all_laptitude).sort(function(a,b){return all_laptitude[b]-all_laptitude[a]})
        console.log("🚀 ~ file: menu.js ~ line 124 ~ fetch ~ location_sorted_by_laptitude", location_sorted_by_laptitude)
        


    })

}