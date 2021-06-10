/*
【注意事項】
1.基本串接對象
API: https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089臺灣各鄉鎮市區預報資料-臺灣各鄉鎮市區未來2天(逐3小時)
項目: "elementName": "WeatherDescription","description": "天氣預報綜合描述",

2.請在id="describe-frame"的容器中執行你的專案
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


// var city = "";
// var menu = document.querySelector("#describe-frame > select");
// menu.addEventListener("change" , getCity);
/*
    此函數為取得全台平均紫外線數值
*/
function getUV(){
    let requestURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A&format=JSON";
    let request = new XMLHttpRequest();
    request.onload = function(){

        //處理數據，提取出個觀測站紫外線數值
        let json = JSON.parse(request.responseText);
        data = json.records.weatherElement.location;
        let UV = 0;
        data.forEach( ele  => {
            UV = UV + ele.value;
        });
        UV = UV / data.length;
        console.log(UV);    
        UV = UV.toFixed(1);

        //將紫外線數值放到對應框中
		let UV_text_area = document.querySelector("#describe-frame > div.board > div.uv > div");
		let text = document.createTextNode(UV);
		
        //以顏色區分紫外線強度
        if( UV > 0 && UV < 2){
            UV_text_area.style.color = "rgb(155, 224, 51)";
        }else if( UV >= 2 && UV < 6){
            UV_text_area.style.color = "rgb(248, 244, 7)";
        }else if( UV >= 2 && UV < 6){
            UV_text_area.style.color = "rgb(172, 190, 4)";
        }else if( UV >= 6 && UV < 8){
            UV_text_area.style.color = "rgb(236, 156, 5)";
        }else if( UV >= 8 && UV < 11){
            UV_text_area.style.color = "rgb(238, 2, 2)";
        }else{
            UV_text_area.style.color = "rgb(87, 4, 87)";
        };

        UV_text_area.appendChild(text);
    
    };

    request.open("GET" , requestURL , true);
    request.send();
};

function makeMenu(city){
	let menu = document.querySelector("#describe-frame > div.mascot > select");
    let option = document.createElement("option");
	option.value=city;
    let text = document.createTextNode(city);
    option.appendChild(text);
    menu.appendChild(option);
};

function getCity(){
    let menu = document.querySelector("#describe-frame > select");
    let index = menu.selectedIndex;
    let select_city = menu.options[index].value;
    city = select_city;
};

function makeMascot(){
	let mascot_site = document.createElement("div");
	mascot_site.className = "mascot";
	let mascot_img = document.createElement("img");
	mascot_img.src = "img/雞不可濕.png";
	let describe_frame = document.querySelector("#describe-frame");
	mascot_site.appendChild(mascot_img);
	describe_frame.appendChild(mascot_site);
	let select = document.createElement("select");
	let select_site = document.querySelector("#describe-frame > div.mascot");
	select_site.appendChild(select);
};

function makeBoard(){
	let describe_frame = document.querySelector("#describe-frame");
	let board_site = document.createElement("div");
	board_site.className = "board";
	let board_img = document.createElement("img");
	board_img.src = "img/blackboard.png";
	board_img.id = "board";
	let teacher_img = document.createElement("img");
	teacher_img.src = "img/天機不可洩漏.png";
	teacher_img.id = "teacher";
	board_site.appendChild(board_img);
	board_site.appendChild(teacher_img);
	describe_frame.appendChild(board_site);	

	let Temp_site = document.createElement("div");
	Temp_site.className = "temp";
	let Temp_site_text = document.createTextNode("本日全台平均氣溫");
	Temp_site.appendChild(Temp_site_text);
	let Temp = document.createElement("div");
	Temp.className = "data";
	Temp_site.appendChild(Temp);
	board_site.appendChild(Temp_site);

	let UV_site = document.createElement("div");
	UV_site.className = "uv";
	let UV_site_text = document.createTextNode("本日全台平均紫外線強度");
	UV_site.appendChild(UV_site_text);
	let UV = document.createElement("div");
	UV.className = "data";
	UV_site.appendChild(UV);
	board_site.appendChild(UV_site);
};

function getTemp(){
    let requestURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A&format=JSON&locationName=&elementName=T";
    let request = new XMLHttpRequest();
    request.onload = function(){

        //提取各地平均溫度
        let json = JSON.parse(request.responseText);
        data = json.records.locations[0].location; 
        let temp = 0;
        data.forEach( ele => {
			makeMenu(ele.locationName);
            for(let i =0; i < 2 ; i++){
                temp = temp + parseInt(ele.weatherElement[0].time[i].elementValue[0].value);
            };
        });
        temp = temp / (data.length * 2);
        temp = temp.toFixed(1);
        
        //將溫度放到對應框中
        let temp_area = document.querySelector("#describe-frame > div.board > div.temp > div");
        let text = document.createTextNode(temp);
        temp_area.appendChild(text);

    };

    request.open("GET" , requestURL , true);
    request.send();
};

makeMascot();
makeBoard();
getTemp();
getUV();