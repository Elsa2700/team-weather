/*
【注意事項】
1.基本串接對象
無

2.請在id="nav-frame"的容器中執行你的專案
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
        let UV_area = document.querySelector("#describe-frame > div.UV");
        UV_area.style.opacity = "1";
        let text = document.createTextNode(UV);
        let UV_text_area = document.querySelector("#describe-frame > div.UV > div");

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

        //事件註冊，將點擊show出紫外線數值的功能取消(不然紫外線會過強XD)
        let skyChi = document.querySelector("#teacher");
        skyChi.removeEventListener("click", getUV);
    };

    request.open("GET" , requestURL , true);
    request.send();
};


/*
        此函數為取得當日平均溫度
*/
function getTemp(){
    let requestURL = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-2EF6C203-2256-404D-AD80-5E9DE0982C6A&format=JSON&locationName=&elementName=T";
    let request = new XMLHttpRequest();
    request.onload = function(){

        //提取各地平均溫度
        let json = JSON.parse(request.responseText);
        data = json.records.locations[0].location; 
        let temp = 0;
        data.forEach( ele => {
            for(let i =0; i < 2 ; i++){
                temp = temp + parseInt(ele.weatherElement[0].time[i].elementValue[0].value);
            };
        });
        temp = temp / (data.length * 2);
        temp = temp.toFixed(1);
        
        //將溫度放到對應框中
        let temp_area = document.querySelector("#describe-frame > div.temp > div");
        let text = document.createTextNode(temp);
        temp_area.appendChild(text);
        let temp_whole = document.querySelector("#describe-frame > div.temp");
        temp_whole.style.opacity = "1";

        //將取得溫度的事件取消，不然一直點擊的會過熱XD
        let skyChi = document.querySelector("#teacher");
        skyChi.removeEventListener("click", getTemp);
        
        //註冊取得紫外線功能
        skyChi.addEventListener("click" , getUV );
    };

    request.open("GET" , requestURL , true);
    request.send();
};

//一開始先將取得溫度事件註冊到圖片上
let skyChi = document.querySelector("#teacher");
skyChi.addEventListener("click" , getTemp );