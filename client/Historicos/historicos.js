document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("titlereporte").innerHTML = "Reporte histórico";
    document.getElementById("titleturno").innerHTML = "Turno: " + 1;
    document.getElementById("fechahist").value = "2023-09-20";
    document.getElementById("fechahistfin").value = "2023-09-26";
    document.getElementById("turno").value = 1;
    const dateRange = document.getElementById('dateRange');
    const selectedDate = document.getElementById('selectedDate');
    var datetocompare = "";
    var filteredData;
    var extractedData;

    var labels1 = [];
    var turno1Data = [];
    var turno2Data = [];
    var turno3Data = [];

    document.getElementById("consultar").addEventListener("click", getinfort);
    document.getElementById("turno").addEventListener("change", detailedOEE);
    document.getElementById("dateRange").addEventListener("change", detailedOEE);
    

    function getinfort(){

        fecha1 = document.getElementById("fechahist").value;
        fecha2 = document.getElementById("fechahistfin").value;

        fetch(`http://localhost:3000/reporte?fechaI=${fecha1}&fechaF=${fecha2}`)
        .then(res =>{
        return res.json();
        })
        .then(data =>{

            // 1. Convertir las variables rendimiento, calidad y disponibilidad a enteros
            data.forEach((item) => {
                item.rendimiento = Math.round(item.rendimiento);
                item.calidad = Math.round(item.calidad);
                item.disponibilidad = Math.round(item.disponibilidad);
            });

            // 2. Calcular el valor de oee para cada objeto y acortar la fecha
            data.forEach((item) => {
                item.oee = Math.round((item.disponibilidad * item.rendimiento * item.calidad) / 10000);
                item.createdAt = item.createdAt.slice(0, 10);
            });


            const groupedData = data.reduce((acc, item) => {
                const date = item.createdAt;
                const turno = item.turno;
                if (!acc[date]) {
                  acc[date] = {};
                }
                acc[date][`turno${turno}`] = item.oee;
                return acc;
            }, {});
            console.log(groupedData);


            // Obtén las fechas únicas y ordénalas
            const dates = Object.keys(groupedData).sort();

            // Inicializa arreglos para cada turno

            // Llena los arreglos con los valores de OEE correspondientes a cada fecha y turno
            dates.forEach(date => {
            const dataForDate = groupedData[date];
            turno1Data.push(dataForDate.turno1 || null);
            turno2Data.push(dataForDate.turno2 || null);
            turno3Data.push(dataForDate.turno3 || null);
            });

            // Configura las etiquetas (labels) del eje X
            labels1 = dates;

            OEETotal.data.labels = labels1;
            OEETotal.data.datasets[0].data = turno1Data;
            OEETotal.data.datasets[1].data = turno2Data;
            OEETotal.data.datasets[2].data = turno3Data;
            OEETotal.update();

           document.getElementsByClassName("informe")[0].style.display = "block";
           document.getElementsByClassName("informe")[1].style.display = "block";

           setslider();

           extractedData = data;

           detailedOEE();
             

        }).catch(error => console.log(error));

    }

    

    function setslider(){
        // Fecha inicial y final
        var startDate = new Date(Date.parse(document.getElementById("fechahist").value + "T00:00:00"));
        var endDate = new Date(Date.parse(document.getElementById("fechahistfin").value + "T00:00:00"));

        


        const dateDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Configura las opciones del control deslizante como fechas
        for (let i = 0; i <= dateDiff; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const option = document.createElement('option');
            option.value = i;
            option.textContent = currentDate.toLocaleDateString();
            dateRange.appendChild(option);
        }

        // Actualiza el texto con la fecha seleccionada
        function actualizarFechaslider() {
            const index = parseInt(dateRange.value);
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + index);
            selectedDate.textContent = 'Fecha seleccionada: ' + currentDate.toLocaleDateString();
            datetocompare = currentDate.toISOString().split('T')[0];
            document.getElementById("titlereporte").innerHTML = "Reporte: " + currentDate.toLocaleDateString();
        }
        
        dateRange.addEventListener('input', actualizarFechaslider);
        
        actualizarFechaslider();

        // Establece los valores mínimo y máximo del rango
        dateRange.min = 0;
        dateRange.max = dateDiff;

    }setslider();



    function detailedOEE(){

        document.getElementById("titleturno").innerHTML = "Turno: " + document.getElementById("turno").value;

        filteredData = extractedData.filter(item => {
            return item.createdAt == datetocompare && item.turno == document.getElementById("turno").value;
        });
        
        console.log(filteredData[0]);

        Disponibilidad.data.datasets[0].data = [filteredData[0].disponibilidad, 100-filteredData[0].disponibilidad];
        console.log(Disponibilidad.data.datasets[0].data[0]);
        Rendimiento.data.datasets[0].data = [filteredData[0].rendimiento, 100-filteredData[0].rendimiento];
        Calidad.data.datasets[0].data = [filteredData[0].calidad, 100-filteredData[0].calidad];
        OEE.data.datasets[0].data = [filteredData[0].oee, 100-filteredData[0].oee];

        setcolor();

        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();

    }


    //Charts
    
    function drawPercentagedisponibilidad(chart) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = Disponibilidad.data.datasets[0].data[0] + "%";
    
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000"; // Color del texto
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // posición del texto en el centro del circulo
        var textX = centerX;
        var textY = centerY;
    
        ctx.fillText(text, textX, textY);
    }

    function drawPercentagerendimiento(chart) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = Rendimiento.data.datasets[0].data[0] + "%";
    
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000"; // Color del texto
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // posición del texto en el centro del circulo
        var textX = centerX;
        var textY = centerY;
    
        ctx.fillText(text, textX, textY);
    }
        
    function drawPercentagecalidad(chart) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = Calidad.data.datasets[0].data[0] + "%";
    
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000"; // Color del texto
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // posición del texto en el centro del circulo
        var textX = centerX;
        var textY = centerY;
    
        ctx.fillText(text, textX, textY);
    }

    function drawPercentageoee(chart) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = OEE.data.datasets[0].data[0] + "%";
    
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000"; // Color del texto
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // posición del texto en el centro del circulo
        var textX = centerX;
        var textY = centerY;
    
        ctx.fillText(text, textX, textY);
    }

    function setcolor(){
        if (Disponibilidad.data.datasets[0].data[0]<=40) {
            Disponibilidadcolor = ['#fd0100', '#e5e5e5'];
        } else if (Disponibilidad.data.datasets[0].data[0]>40 && Disponibilidad.data.datasets[0].data[0]<75) {
            Disponibilidadcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Disponibilidadcolor = ['#05fc03', '#e5e5e5'];
        }

        if (Rendimiento.data.datasets[0].data[0]<=40) {
            Rendimientocolor = ['#fd0100', '#e5e5e5'];
        } else if (Rendimiento.data.datasets[0].data[0]>40 && Rendimiento.data.datasets[0].data[0]<75) {
            Rendimientocolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Rendimientocolor = ['#05fc03', '#e5e5e5'];
        }

        if (Calidad.data.datasets[0].data[0]<=40) {
            Calidadcolor = ['#fd0100', '#e5e5e5'];
        } else if (Calidad.data.datasets[0].data[0]>40 && Calidad.data.datasets[0].data[0]<75) {
            Calidadcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Calidadcolor = ['#05fc03', '#e5e5e5'];
        }

        if (OEE.data.datasets[0].data[0]<=40) {
            OEEcolor = ['#fd0100', '#e5e5e5'];
        } else if (OEE.data.datasets[0].data[0]>40 && OEE.data.datasets[0].data[0]<75) {
            OEEcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            OEEcolor = ['#05fc03', '#e5e5e5'];
        }

        Disponibilidad.data.datasets[0].backgroundColor = Disponibilidadcolor;
        Rendimiento.data.datasets[0].backgroundColor = Rendimientocolor;
        Calidad.data.datasets[0].backgroundColor = Calidadcolor;
        OEE.data.datasets[0].backgroundColor = OEEcolor;

    }


    var ctx1 = document.getElementById('Disponibilidad').getContext('2d');
    var Disponibilidad = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Disponibilidad'],
            datasets: [{
            data: [80, 100-80],
            backgroundColor: '#9BD0F5',
            }],
        },
        options: {
            events: [],
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentagedisponibilidad(chart);
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Disponibilidad',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
                legend: {
                display: false
                }
            },

            borderWidth: 0,
            cutout: 60,
        }
    });

    var ctx2 = document.getElementById('Rendimiento').getContext('2d');
    var Rendimiento = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Rendimiento'],
            datasets: [{
            data: [80, 100-80],
            backgroundColor: '#9BD0F5',
            }],
        },
        options: {
            events: [],
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentagerendimiento(chart);
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Rendimiento',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
                legend: {
                display: false
                }
            },

            borderWidth: 0,
            cutout: 60,
        }
    });

    var ctx3 = document.getElementById('Calidad').getContext('2d');
    var Calidad = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Calidad'],
            datasets: [{
            data: [80, 100-80],
            backgroundColor: '#9BD0F5',
            }],
        },
        options: {
            events: [],
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentagecalidad(chart);
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Calidad',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
                legend: {
                display: false
                }
            },

            borderWidth: 0,
            cutout: 60,
        }
    });

    var ctx4 = document.getElementById('OEE').getContext('2d');
    var OEE = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['OEE'],
            datasets: [{
            data: [80, 100-80],
            backgroundColor: '#9BD0F5',
            }],
        },
        options: {
            events: [],
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentageoee(chart);
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'OEE',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
                legend: {
                display: false
                }
            },

            borderWidth: 0,
            cutout: 70,
        }
    });

    
    var ctx5 = document.getElementById('OEETotal').getContext('2d');
    var OEETotal = new Chart(ctx5, {
        type: 'line',
        data: {
          labels: [
            "2023-09-28",
            "2023-09-29",
            "2023-09-30",
            "2023-10-01"
          ],
          datasets: [
            {
              label: 'Turno 1',
              data: [
                20,
                20,
                67,
                null
              ],
              borderColor: '#00833c',
              backgroundColor: '#00833c',
              fill: false
            },
            {
              label: 'Turno 2',
              data: [
                40,
                50,
                90,
                60
              ],
              borderColor: '#76bd1d',
              backgroundColor: '#76bd1d',
              fill: false
            },
            {
              label: 'Turno 3',
              data: [
                70,
                80,
                25,
                40
              ],
              borderColor: '#fec524',
              backgroundColor: '#fec524',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
                title: {
                display: true,
                text: 'Fecha'
              }
            },
            y: {
                title: {
                display: true,
                text: 'OEE'
              },
              min: 0, // Puedes ajustar el mínimo según tus datos
              max: 100 // Puedes ajustar el máximo según tus datos
            }
          }
        }
      });

});