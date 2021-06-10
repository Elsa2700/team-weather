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

function MakeNav(){
    let nav_site = document.querySelector("body > div.nav");
    let nav = document.createElement("div");
    nav.id = "nav-frame";
    nav_site.appendChild(nav);
    let run = document.createElement("marquee");
    run.className = "run";
    let run_text = document.createTextNode("你知道，禮拜天哪裡最多越南人嗎?");
    run.appendChild(run_text);
    nav.appendChild(run);

	run.addEventListener("mouseover" , () => {
		let run = document.querySelector("#nav-frame > marquee");
		run.innerHTML="越南";
		run.stop();

	})
	run.addEventListener("mouseleave" , () => {
		let run = document.querySelector("#nav-frame > marquee");
		run.innerHTML = "你知道，禮拜天哪裡最多越南人嗎?"
		run.start();

	})

};


MakeNav();
