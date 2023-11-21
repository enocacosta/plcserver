document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('timeChart').getContext('2d');
    var ctx1 = document.getElementById('Disponibilidad').getContext('2d');
    var ctx2 = document.getElementById('Rendimiento').getContext('2d');
    var ctx3 = document.getElementById('Calidad').getContext('2d');
    var ctx4 = document.getElementById('OEE').getContext('2d');
    var maquina1 = document.getElementById('maq1');
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    const messagehist = document.getElementById("messagehist");

    let exe = true;

    document.getElementById('consultar').addEventListener ("click", consultarhistoricos);
    document.getElementById('fechahist').addEventListener ("change", comparedates);
    document.getElementById('fechahistfin').addEventListener ("change", comparedates);

    function setdates() {
        var startDate = new Date('2023-09-30');
        var endDate = new Date('2023-10-11');
    
        var startYYYY = startDate.getFullYear();
        var startMM = String(startDate.getMonth() + 1).padStart(2, '0');
        var startDD = String(startDate.getDate()).padStart(2, '0');
        var formattedStartDate = startYYYY + '-' + startMM + '-' + startDD;
    
        var endYYYY = endDate.getFullYear();
        var endMM = String(endDate.getMonth() + 1).padStart(2, '0');
        var endDD = String(endDate.getDate()).padStart(2, '0');
        var formattedEndDate = endYYYY + '-' + endMM + '-' + endDD;
    
        document.getElementById('fechahist').min = formattedStartDate;
        document.getElementById('fechahist').max = formattedEndDate;
        document.getElementById('fechahist').value = formattedStartDate;
        document.getElementById('fechahistfin').min = formattedStartDate;
        document.getElementById('fechahistfin').max = formattedEndDate;
        document.getElementById('fechahistfin').value = formattedEndDate;
    }setdates();
    

    function comparedates (){
        var fecha1 = new Date(document.getElementById('fechahist').value);
        var fecha2 = new Date(document.getElementById('fechahistfin').value);

        if (fecha1 > fecha2) {
            document.getElementById('fechahist').value = document.getElementById('fechahistfin').value;
        }
    }


    // Add an event listener to each radio input to detect changes
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', function () {
            if (radioButton.checked) {
                // Verifica cuál de los botones está seleccionado
                if (radioButton.id === "option1") {
                    maquina1.className  = "btn btn-sm btn-success"
                    maquina1.innerHTML = "RUN"
                    exe = true;
                } else if (radioButton.id === "option2") {
                    maquina1.className  = "btn btn-sm btn-primary"
                    maquina1.innerHTML = "STAND BY"
                    exe = false;
                } else if (radioButton.id === "option3") {
                    maquina1.className = "btn btn-sm btn-danger"
                    maquina1.innerHTML = "STOP"
                    exe = true;
                }
            }
        });
    });

    const generateRandomNumber = (base, rangeSize, lowerLimit, upperLimit) => {
        // Calculate the valid range respecting the lower and upper limits
        const validRange = Math.min(upperLimit - base, rangeSize, base - lowerLimit);
        // Generate a random number within the specified range around the base
        return base + Math.floor(Math.random() * (2 * rangeSize + 1)) - rangeSize;
    }


    var timeChartval = 0;
    var valrendimiento = 0;
    var valdisponibilidad = 0;
    var valcalidad = 0;
    var valoee = 0;
    var tparada = 0;
    var tproductivo = 0;
    var ultimaparada;
    var velvar;

    let baseNumber1= 75;
    let baseNumber2= 75;
    let baseNumber3= 75;
    let baseNumber4= 1.5;
    const rangeSize = 3; // The range size is 3 numbers above and below the base

    const paradaMap = {
        1: "Proceso",
        2: "Servicios industriales",
        3: "Calidad / Medio ambiente / SST",
        4: "Mant. Mecánico",
        5: "Mant. Eléctrico",
        6: "Metrología / Instrumentación",
        7: "Otros"
    };

    ultimaparada = Math.floor((Math.random() * (7 - 1) + 1));

     if (paradaMap.hasOwnProperty(ultimaparada)) {
            document.getElementById('tbultimaparada').innerHTML = paradaMap[ultimaparada];
        }



    function Realtime() {

        timeChartval = Math.floor(Math.random() * 100) + 1;

        if(exe == true){
            valrendimiento = generateRandomNumber(baseNumber1, rangeSize,10,100);
            valdisponibilidad = generateRandomNumber(baseNumber2, rangeSize,10,100);
            valcalidad = generateRandomNumber(baseNumber3, rangeSize,10,100);
            velvar = (Math.random() * (2 - 1) + 1).toFixed(2); 
        }

        baseNumber1 = valrendimiento;
        baseNumber2 = valdisponibilidad;
        baseNumber3 = valcalidad;
        baseNumber4 = velvar;

        valoee = parseInt(((valcalidad/100)*(valdisponibilidad/100)*(valrendimiento/100))*100);

        // Generate random numbers for tiempoStop, tiempoProductivo, and tiempoProgramada
        const totalSum = 100;
        const maxVariation = 2;
        tiempoStop = generateRandomNumber(10, 1);
        tiempoProductivo = generateRandomNumber(40, 1);
        tiempoProgramada = generateRandomNumber(20, 1);

        document.getElementById('parada').innerHTML = ((parseInt(tiempoStop))/60).toFixed(2);
        tparada  = (parseInt(tiempoStop))/60;
        tproductivo = (parseInt(tiempoProductivo))/60;
        tprogramada = (parseInt(tiempoProgramada))/60;


        
        timeChart.data.datasets[0].data = [tparada, tproductivo, tprogramada];
        Disponibilidad.data.datasets[0].data = [valdisponibilidad, 100-valdisponibilidad];
        Rendimiento.data.datasets[0].data = [valrendimiento, 100-valrendimiento];
        Calidad.data.datasets[0].data = [valcalidad, 100-valcalidad];
        OEE.data.datasets[0].data = [valoee, 100-valoee];

        if (valdisponibilidad<=40) {
            Disponibilidad.data.datasets[0].backgroundColor = ['#fd0100', '#e5e5e5'];
        } else if (valdisponibilidad>40 && valdisponibilidad<75) {
            Disponibilidad.data.datasets[0].backgroundColor = ['#fffe06', '#e5e5e5'];            
        }else {
            Disponibilidad.data.datasets[0].backgroundColor = ['#05fc03', '#e5e5e5'];
        }

        if (valrendimiento<=40) {
            Rendimiento.data.datasets[0].backgroundColor = ['#fd0100', '#e5e5e5'];
        } else if (valrendimiento>40 && valrendimiento<75) {
            Rendimiento.data.datasets[0].backgroundColor = ['#fffe06', '#e5e5e5'];            
        }else {
            Rendimiento.data.datasets[0].backgroundColor = ['#05fc03', '#e5e5e5'];
        }

        if (valcalidad<=40) {
            Calidad.data.datasets[0].backgroundColor = ['#fd0100', '#e5e5e5'];
        } else if (valcalidad>40 && valcalidad<75) {
            Calidad.data.datasets[0].backgroundColor = ['#fffe06', '#e5e5e5'];            
        }else {
            Calidad.data.datasets[0].backgroundColor = ['#05fc03', '#e5e5e5'];
        }

        if (valoee<=40) {
            OEE.data.datasets[0].backgroundColor = ['#fd0100', '#e5e5e5'];
        } else if (valoee>40 && valoee<75) {
            OEE.data.datasets[0].backgroundColor = ['#fffe06', '#e5e5e5'];            
        }else {
            OEE.data.datasets[0].backgroundColor = ['#05fc03', '#e5e5e5'];
        }

        timeChart.update();
        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();

    }setInterval(Realtime, 3000);
    


    // Función para dibujar el porcentaje en el centro del circulo


    function drawPercentage(chart, val) {
        var ctx = chart.chart.ctx;
        var width = (chart.chart.width);
        var height = (chart.chart.height)+35;
        var radius = Math.min(width, height) / 2; 
        var centerX = width / 2;
        var centerY = (height / 2);
        var fontSize = ((radius / 2).toFixed(0))-10; 
    
        var text = val + "%";
    
        ctx.font = fontSize + "px sans-serif";
        ctx.fillStyle = "#000"; // Color del texto
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
    
        // posición del texto en el centro del circulo
        var textX = centerX;
        var textY = centerY;
    
        ctx.fillText(text, textX, textY);
    }
    
    

    // Crear los gráficos


    var timeChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['P. No Programada', 'T. Productivo', 'P. Programada'],
            datasets: [{
            data: [timeChartval, 0, 0], // Porcentajes de tiempo de operación e inactividad
            backgroundColor: ['#ffd20d', '#949fb1', '#3a98e8'], // Colores para cada segmento
            
        }],
        },
        options: {
            
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
                enabled: false,
                },

            plugins: {
                title: {
                    display: true,
                    text: 'Tiempos operación (min)',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },

            legend: {
                position: 'bottom',

            }
                
            },

            
        },
    });



    var Disponibilidad = new Chart(ctx1, {

        type: 'doughnut',

        data: {
            labels: ['Disponibilidad'],
            datasets: [{
            data: [valdisponibilidad, 100-valdisponibilidad],
            backgroundColor: ['#01fe05', '#e5e5e5'],
            }],
        },

        options: {

            events: [],
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentage(chart, valdisponibilidad);;
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
            cutout: '85%',


            },
            
    });



    var Rendimiento = new Chart(ctx2, {
        type: 'doughnut',

        data: {
            labels: ['Rendimiento'],
            datasets: [{
            data: [valrendimiento, 100-valrendimiento],
            backgroundColor: ['#fdff01', '#e5e5e5'],
            }],
        },

        options: {
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentage(chart, valrendimiento);
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
            cutout: '85%',
            },
    });



    var Calidad = new Chart(ctx3, {
        type: 'doughnut',

        data: {labels: ['Calidad'],

        datasets: [{
            data: [valcalidad, 100-valcalidad], 
            backgroundColor: ['#46283B', '#e5e5e5'],
            }],
        },

        options: {
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentage(chart, valcalidad);
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
            cutout: '85%',

            },
    });



    var OEE = new Chart(ctx4, {
        type: 'doughnut',
        data: {
            labels: ['OEE'],
            datasets: [{
            data: [valoee, 100-valoee],
            backgroundColor: ['#36A42B', '#e5e5e5'],
            }],
        },
        options: {
            events: [],
            responsive: true,
            maintainAspectRatio: true,
            tooltips: {
                enabled: false,
                },
            animation: {
                onComplete: function (chart) {
                    drawPercentage(chart, valoee);
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
            cutout: '85%',
            
            },
    });


        
    Realtime();

    function consultarhistoricos(){

        if (document.getElementById('fechahist').value == "" || document.getElementById('fechahistfin').value == "") {
            messagehist.textContent = "Ingrese una fecha";
            messagehist.className = "text-danger";
            return;
        }else if (document.getElementById('fechahist').value > document.getElementById('fechahistfin').value) {
            messagehist.textContent = "Fecha final no puede ser menor a la inicial";
            messagehist.className = "text-danger";
            return;
        }else if(document.getElementById('fechahistfin').value > document.getElementById('fechahistfin').max) {

            messagehist.textContent = "Fecha final no puede se mayor al dia de hoy";
            messagehist.className = "text-danger";
            return;
        }else {
            var confecha1 = document.getElementById('fechahist').value;
            var confecha2 = document.getElementById('fechahistfin').value;
            var conturno = document.getElementById('turno').value;

            var url = '../Historicos/reporte.html?valor1=' + encodeURIComponent(confecha1) +
                        '&valor2=' + encodeURIComponent(confecha2) +
                        '&valor3=' + encodeURIComponent(conturno);

            window.location.href = url;
        }


        

    }



});
