
// controllers
let controller = {
    //初始化
    getData: function () {
        views.render();
        models.querytmpdata()
            .then(() => { views.rendertmp(); })
        models.queryloctmp()
        let btndata1 = document.getElementById("1")
        let btndata2 = document.getElementById("2")
        btndata1.addEventListener("click", () => {
            models.querytmpdata()
                .then(() => { views.rendertmp(); })
            models.queryloctmp()

        })
        btndata2.addEventListener("click", () => {
            models.queryraindata()
                .then(() => { views.renderrain(); })
            models.querylocrain()

        })

    }
}

// models
let models = {
    tmpTable: [['時間', '平均溫度(°C)']],
    rainTable: [['時間', '降雨機率(%)']],
    locTable: [['縣市代碼', '縣市名', '緯度', '經度']],
    location: 0, //填入縣市代碼
    locationname:"",
    record: null,
    time: null,
    tmp: null,

    //選單地點
    queryloctmp: function () {
        let selectCity = document.querySelector("#describe-frame > div.mascot > select")
        selectCity.addEventListener('change', () => {
            this.location = selectCity.selectedIndex;
            console.log(this.location)
            this.locationname=selectCity.value
            this.querytmpdata()
            views.rendertmp();

        })


    },
    //選單地點
    querylocrain: function () {
        let selectCity = document.querySelector("#describe-frame > div.mascot > select")
        selectCity.addEventListener('change', () => {
            this.location = selectCity.selectedIndex;
            console.log(this.location,selectCity)
            this.queryraindata()
            views.renderrain();


        })


    },
    querytmpdata: function () {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY;

        return fetch(url)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(result => {
                // 預設--------------------------------------------
                this.record = result.records.locations[0];
                console.log(this.record)
                this.time = this.record.location[this.location].weatherElement[1].time;
                this.tmpTable = [['時間', '平均溫度(°C)']]
                for (let ii = 0; ii < this.time.length; ii++) {
                    this.tmpTable.push([new Date(this.time[ii].startTime), parseInt(this.time[ii].elementValue[0].value)])
                }
                console.log("溫度折線圖:", this.tmpTable, this.record.location[this.location].locationName);
                this.locationname=this.record.location[this.location].locationName
            })

            .catch(error => {
                console.log("error")
            })

        //地圖

    },
    queryraindata: function () {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY;

        return fetch(url)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(result => {
                // 預設--------------------------------------------
                this.record = result.records.locations[0];
                console.log(this.record)
                this.time = this.record.location[this.location].weatherElement[0].time;
                this.rainTable = [['時間', '降雨機率(%)']]
                for (let ii = 0; ii < this.time.length; ii++) {
                    this.rainTable.push([new Date(this.time[ii].startTime), parseInt(this.time[ii].elementValue[0].value)])
                }
                console.log("雨量機率圖:", this.rainTable);

            })

            .catch(error => {
                console.log("error")
            })

        //地圖

    }
}


let views = {
    render: function draw() {
        let btn = document.createElement("div");
        document.querySelector(".graph").firstElementChild.innerHTML = '<div class="frame"><div class="frame-btn" id="1">平均溫度</div><div class="frame-btn" id="2">降雨機率</div></div>'
    },

    rendertmp: function drawChart() {
        var data = google.visualization.arrayToDataTable(models.tmpTable);
        var options = {
            title: '未來溫度預報'+"【"+models.locationname+"】",
            curveType: 'function',
            legend: { position: 'top' },
            width: 900,
            height: 380,
            colors: ['#e0440e'],
            fontSize: 22,
            backgroundColor: '#F8F7F0',
            pointSize: 15,
            displayAnnotations: true,
        }

        var chart = new google.visualization.LineChart(document.getElementById('graph-frame'));
        chart.draw(data, options);

    },
    renderrain: function drawChart() {
        var data = google.visualization.arrayToDataTable(models.rainTable);
        var options = {
            title: '降雨機率預報'+"【"+models.locationname+"】",
            legend: { position: 'top' },
            width: 900,
            height: 380,
            colors: ['#58c6f5'],
            fontSize: 22,
            backgroundColor: '#F8F7F0',
            pointSize: 15,
            displayAnnotations: true,
        }

        var chart = new google.visualization.SteppedAreaChart(document.getElementById('graph-frame'));
        chart.draw(data, options);
    }


}


controller.getData();
