

let selectCity = document.querySelector("#describe-frame > div.mascot > select")

console.log(selectCity.selectedIndex)

// models
let models = {
    tmpTable: [['時間', '溫度']],
    locTable: [['縣市代碼', '縣市名', '緯度', '經度']],
    location: 1, //填入縣市代碼
    record: null,
    time: null,
    tmp: null,

    queryloc: function () {
        let selectCity = document.querySelector("#describe-frame > div.mascot > select")
        selectCity.addEventListener('change', () => {
            console.log(selectCity.value)
            console.log(selectCity.selectedIndex)
            this.location = selectCity.selectedIndex
            console.log("目前的地點", this.location)

            this.querytmp()
        })

    },

    //溫度折線圖
    querytmp: function () {

        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY;

        return fetch(url)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(result => {
                console.log("目前的地點", this.location)

                this.record = result.records.locations[0];
                console.log(this.record)
                //建立縣市基本資料
                // for (let i = 0; i < this.record.location.length; i++) {
                //     // console.log(i,this.record.location[i].locationName);
                //     let loc = this.record.location[i]
                //     // console.log(loc)
                //     this.locTable.push([i, loc.locationName, loc.lat, loc.lon])
                // }
                // console.log(this.locTable)
                // console.log(this.locTable[1][0],this.locTable[1][1])



                // 建立溫度折線圖資料
                this.time = this.record.location[this.location].weatherElement[1].time;
                this.tmpTable = [['時間', '溫度']]
                for (let ii = 0; ii < this.time.length; ii++) {
                    // console.log(this.time[ii].startTime)
                    this.tmpTable.push([new Date(this.time[ii].startTime), parseInt(this.time[ii].elementValue[0].value)])
                }

                console.log("溫度折線圖:", this.tmpTable);

            }).catch(error => {
                console.log("error")
            })
    }
    //地圖

}

let views = {
    renderbottom: function btnchart() {
        document.querySelector(".graph").firstElementChild.innerHTML = '<div></div>'
        // document.querySelector("#line").innerHTML = ''
        // text.style.display="none";
        let frame = document.getElementById("graph-frame");
        let btn = document.createElement("div");
        btn.textContent = "溫度";
        btn.className = "btnchart"
        frame.appendChild(btn)
        let line = document.createElement("div");
        line.id = "line";
        frame.appendChild(line);
        btn.addEventListener("click", drawChart)

        function drawChart() {
            console.log('options')
            btn.style.display = "none";
            line.style.display = "block";
            var data = google.visualization.arrayToDataTable(models.tmpTable);
            var options = {
                title: '未來溫度預報',
                curveType: 'function',
                legend: { position: 'top' },
                width: 950,
                height: 380,
                colors: ['#e0440e'],
                fontSize: 22,
                backgroundColor: '#f7f9fa',
                pointSize: 15,
                displayAnnotations: true,
            }

            var chart = new google.visualization.LineChart(document.getElementById('line'));
            chart.draw(data, options);

        }

    }

    // function drawChartout() {
    //     line.style.display = "none";
    //     btn.style.display = "block";
    //     // btn.textContent="點我";
    //     // btn.className="btnchart"
    //     // frame.appendChild(btn)

    // }


}

// controllers
let controller = {
    //初始化
    getData: function () {
        models.queryloc()
        models.querytmp().then(() => {
            views.renderbottom();
        })
    }
}

controller.getData();
