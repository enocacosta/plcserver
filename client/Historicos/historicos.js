document.addEventListener('DOMContentLoaded', function () {

    
    var labels1 = [];
    var turno1Data = [];
    var turno2Data = [];
    var turno3Data = [];

    document.getElementById("consultar").addEventListener("click", getinfort);
    
    

    function getinfort(){

        fecha1 = document.getElementById("fechahist").value;
        fecha2 = document.getElementById("fechahistfin").value;
        console.log(fecha1);
        console.log(fecha2);

        fetch(`http://localhost:3000/reporte?fechaI=${"2023-09-21"}&fechaF=${"2023-09-21"}&turno=${1}`)
        .then(res =>{
        return res.json();
        })
        .then(data =>{
            console.log(data);

            // 1. Convertir las variables rendimiento, calidad y disponibilidad a enteros
            data.forEach((item) => {
                item.rendimiento = Math.round(item.rendimiento);
                item.calidad = Math.round(item.calidad);
                item.disponibilidad = Math.round(item.disponibilidad);
            });

            // 2. Calcular el valor de oee para cada objeto y acortar la fecha
            data.forEach((item) => {
                item.oee = (item.disponibilidad * item.rendimiento * item.calidad) / 10000;
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
            console.log(turno1Data);
            console.log(turno2Data);
            console.log(turno3Data);

           
            


            

        }).catch(error => console.log(error));

    }

    var valdisponibilidad = 20;
    var valrendimiento = 50;
    var valcalidad = 30;
    var valoee =parseInt((valrendimiento*valdisponibilidad*valcalidad)/10000);
    var Disponibilidadcolor =0;
    var Rendimientocolor =0;
    var Calidadcolor =0;
    var OEEcolor =0;

    document.getElementById("titlereporte").innerHTML = "Reporte: " + "2023-09-25";
    document.getElementById("titleturno").innerHTML = "Turno: " + 1;

    document.getElementById("fechahist").value = "2023-09-15";
    document.getElementById("fechahistfin").value = "2023-09-26";
    document.getElementById("turno").value = 1;

    const dateRange = document.getElementById('dateRange');
    const selectedDate = document.getElementById('selectedDate');

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
    dateRange.addEventListener('input', function () {
        const index = parseInt(dateRange.value);
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + index);
        selectedDate.textContent = 'Fecha seleccionada: ' + currentDate.toLocaleDateString();
        document.getElementById("titlereporte").innerHTML = "Reporte: " + currentDate.toLocaleDateString();
    });

    // Establece los valores mínimo y máximo del rango
    dateRange.min = 0;
    dateRange.max = dateDiff;

    function drawPercentagedisponibilidad(chart) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = valdisponibilidad + "%";
    
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
    
        var text = valrendimiento + "%";
    
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
    
        var text = valcalidad + "%";
    
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
    
        var text = valoee + "%";
    
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
        if (valdisponibilidad<=40) {
            Disponibilidadcolor = ['#fd0100', '#e5e5e5'];
        } else if (valdisponibilidad>40 && valdisponibilidad<75) {
            Disponibilidadcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Disponibilidadcolor = ['#05fc03', '#e5e5e5'];
        }

        if (valrendimiento<=40) {
            Rendimientocolor = ['#fd0100', '#e5e5e5'];
        } else if (valrendimiento>40 && valrendimiento<75) {
            Rendimientocolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Rendimientocolor = ['#05fc03', '#e5e5e5'];
        }

        if (valcalidad<=40) {
            Calidadcolor = ['#fd0100', '#e5e5e5'];
        } else if (valcalidad>40 && valcalidad<75) {
            Calidadcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            Calidadcolor = ['#05fc03', '#e5e5e5'];
        }

        if (valoee<=40) {
            OEEcolor = ['#fd0100', '#e5e5e5'];
        } else if (valoee>40 && valoee<75) {
            OEEcolor = ['#fffe06', '#e5e5e5'];            
        }else {
            OEEcolor = ['#05fc03', '#e5e5e5'];
        }

    }setcolor();


    var ctx1 = document.getElementById('Disponibilidad').getContext('2d');
    var Disponibilidad = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Disponibilidad'],
            datasets: [{
            data: [valdisponibilidad, 100-valdisponibilidad],
            backgroundColor: Disponibilidadcolor,
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
            data: [valrendimiento, 100-valrendimiento],
            backgroundColor: Rendimientocolor,
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
            data: [valcalidad, 100-valcalidad],
            backgroundColor: Calidadcolor,
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
            data: [valoee, 100-valoee],
            backgroundColor: OEEcolor,
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