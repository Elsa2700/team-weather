/*
【注意事項】
1.基本串接對象
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