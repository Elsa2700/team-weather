



// models
let models = {
    tmpTable: [['時間','溫度']],
    locTable: [['縣市代碼', '縣市名', '緯度', '經度']],
    location: 1, //填入縣市代碼
    record: null,
    time: null,
    tmp: null,

    //溫度折線圖
    querytmp: function () {
        let url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=" + CWB_API_KEY;
        return fetch(url)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(result => {
                this.record = result.records.locations[0];
                //建立縣市基本資料
                for (let i = 0; i < this.record.location.length; i++) {
                    // console.log(i,this.record.location[i].locationName);
                    let loc = this.record.location[i]
                    this.locTable.push([i, loc.locationName, loc.lat, loc.lon])
                }
                console.log(this.locTable);

                // 建立溫度折線圖資料
                this.time = this.record.location[this.location].weatherElement[1].time;
                for (let ii = 0; ii < this.time.length; ii++) {
                    console.log(this.time[ii].startTime)
                    this.tmpTable.push([new Date(this.time[ii].startTime),parseInt(this.time[ii].elementValue[0].value)])
                }

                console.log("溫度折線圖:", this.tmpTable);

            }).catch(error => {
                console.log("error")
            })
    }
    //地圖

}

let views = {
    renderTmplinechart: function drawChart() {
        var data = google.visualization.arrayToDataTable(models.tmpTable);
        data.addColumn({type:'string', role:'annotationText'});
        var options = {
            title: '未來兩日溫度預報',
            curveType: 'function',
            legend: { position: 'top'},
            width: 1300,
            height: 600,
            colors: ['#e0440e'],
            fontSize:22,
            backgroundColor:'#f7f9fa',
            pointSize: 15,
            displayAnnotations: true,
        }
        var chart = new google.visualization.LineChart(document.getElementById('graph-frame'));
          
        chart.draw(data, options);
    }

}

// controllers
let controller = {
    //初始化
    getData: function () {
        models.querytmp().then(() => {
            views.renderTmplinechart();
        })
    }
}

controller.getData();
