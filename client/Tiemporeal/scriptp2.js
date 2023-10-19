document.addEventListener('DOMContentLoaded', function () {
    window.jsPDF = window.jspdf.jsPDF;
    var ctx = document.getElementById('timeChartp2').getContext('2d');
    var ctx1 = document.getElementById('Disponibilidadp2').getContext('2d');
    var ctx2 = document.getElementById('Rendimientop2').getContext('2d');
    var ctx3 = document.getElementById('Calidadp2').getContext('2d');
    var ctx4 = document.getElementById('OEEp2').getContext('2d');
    var ctx5 = document.getElementById('velocidadp2').getContext('2d');
    var ctx6 = document.getElementById('esperadooeep2').getContext('2d');
    var esperadooeetb = document.getElementById('esperadooeetbp2').value;
    var maquina1 = document.getElementById('maq1p2');
    var maquina2 = document.getElementById('maq2p2');
    var maquina3 = document.getElementById('maq3p2');
    var maquina4 = document.getElementById('maq4p2');

    document.getElementById('esperadooeebtp2').addEventListener ("click", oeeesperadoupdt);
    document.getElementById('consultarp2').addEventListener ("click", consultarhistoricos);
    document.getElementById('fechahistp2').addEventListener ("change", comparedates);
    document.getElementById('fechahistfinp2').addEventListener ("change", comparedates);

    function setdates (){
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yyyy = yesterday.getFullYear();
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // Enero es 0
        var dd = String(yesterday.getDate()).padStart(2, '0');
        var formattedDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('fechahistp2').max = formattedDate;
        document.getElementById('fechahistp2').value = formattedDate;
        document.getElementById('fechahistfinp2').value = formattedDate;
        document.getElementById('fechahistfinp2').max = formattedDate;
    }setdates ();

    function comparedates (){
        var fecha1 = new Date(document.getElementById('fechahistp2').value);
        var fecha2 = new Date(document.getElementById('fechahistfinp2').value);

        if (fecha1 > fecha2) {
            document.getElementById('fechahistp2').value = document.getElementById('fechahistfinp2').value;
        }
    }

    function oeeesperadoupdt(){
        esperadooeetb = document.getElementById('esperadooeetbp2').value;
        esperadooee.data.datasets[0].data = [valoee, esperadooeetb];
        esperadooee.update();
    }


    var timeChartval = 0;
    var valrendimiento = 0;
    var valdisponibilidad = 0;
    var valcalidad = 0;
    var valoee = 0;
    var velvar = 0;
    var valmaq1 = 1;
    var valmaq2 = 1;
    var valmaq3 = 1;
    var valmaq4 = 1;
    var tparada = 0;
    var tproductivo = 0;


    function Realtime() {

        fetch('http://localhost:3000')
        .then(res =>{
        return res.json();
        })
        .then(data =>{
            


            timeChartval = Math.floor(Math.random() * 100) + 1;
            velvar = (data.velocidad*60).toFixed(2);

            valrendimiento = parseInt(data.rendimiento);
            valdisponibilidad = parseInt(data.disponibilidad);
            valcalidad = parseInt(data.calidad);
            valoee = parseInt((valrendimiento*valdisponibilidad*valcalidad)/10000);

            document.getElementById('producciondiariap2').value = parseInt(data.totalDia);
            document.getElementById('produccionturnop2').value = parseInt(data.produccionTurno);
            document.getElementById('paradap2').value = ((parseInt(data.tiempoStop))/60).toFixed(2);
            tparada  = (parseInt(data.tiempoStop))/60;
            tproductivo = (parseInt(data.tiempoProductivo))/60;
            
            valmaq1 = valmaq2 = valmaq3 = valmaq4 = data.estadoMaquina;


        }).catch(error => console.log(error));
        
        timeChart.data.datasets[0].data = [tparada, tproductivo, 0];
        Disponibilidad.data.datasets[0].data = [valdisponibilidad, 100-valdisponibilidad];
        Rendimiento.data.datasets[0].data = [valrendimiento, 100-valrendimiento];
        Calidad.data.datasets[0].data = [valcalidad, 100-valcalidad];
        OEE.data.datasets[0].data = [valoee, 100-valoee];
        esperadooee.data.datasets[0].data = [valoee, esperadooeetb];

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


        var fechaActual = new Date();
        var horas = fechaActual.getHours();
        var minutos = fechaActual.getMinutes();
        var segundos = fechaActual.getSeconds();

        if (minutos < 10) {
            minutos = '0' + minutos;
        }
          
        if (segundos < 10) {
            segundos = '0' + segundos;
        }


        var horaActual = horas + ':' + minutos + ':' + segundos;
        velocidad.data.labels.push(horaActual);
        velocidad.data.datasets[0].data.push(velvar);
        document.getElementById('velocidadtbp2').value= velvar;


        if (valmaq1 == 1) {
            maquina1.style.backgroundColor = "green"
            maquina1.innerHTML = "RUN"
        }else if(valmaq1== 2){
            maquina1.style.backgroundColor = "blue"
            maquina1.innerHTML = "STAND BY"
        }else if (valmaq1== 3){
            maquina1.style.backgroundColor = "#9a0501"
            maquina1.innerHTML = "STOP"
        }

        if (valmaq2 == 1) {
            maquina2.style.backgroundColor = "green"
            maquina2.innerHTML = "RUN"
        }else if(valmaq2== 2){
            maquina2.style.backgroundColor = "blue"
            maquina2.innerHTML = "STAND BY"
        }else if (valmaq2== 3){
            maquina2.style.backgroundColor = "#9a0501"
            maquina2.innerHTML = "STOP"
        }

        if (valmaq3 == 1) {
            maquina3.style.backgroundColor = "green"
            maquina3.innerHTML = "RUN"
        }else if(valmaq3== 2){
            maquina3.style.backgroundColor = "blue"
            maquina3.innerHTML = "STAND BY"
        }else if (valmaq3== 3){
            maquina3.style.backgroundColor = "#9a0501"
            maquina3.innerHTML = "STOP"
        }

        if (valmaq4 == 1) {
            maquina4.style.backgroundColor = "green"
            maquina4.innerHTML = "RUN"
        }else if(valmaq4== 2){
            maquina4.style.backgroundColor = "blue"
            maquina4.innerHTML = "STAND BY"
        }else if (valmaq4== 3){
            maquina4.style.backgroundColor = "#9a0501"
            maquina4.innerHTML = "STOP"
        }
        


        timeChart.update();
        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();
        velocidad.update();
        esperadooee.update();

    }setInterval(Realtime, 3000);
    


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
            
            responsive: false,
            maintainAspectRatio: false,
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
            cutout: 80,
            
            },
    });


    var velocidad = new Chart(ctx5, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{  
                data: [],
                backgroundColor: ['#36A42B'],
                borderColor: ['#36A42B'],
                radius: 0,

            }],
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },

            plugins: {
                legend: {
                display: false
                }
            },

            scales: {
                y: {
                    max: 3,
                    min: 0,
                    ticks: {
                        stepSize: 1
                    }
                }
            }

            
            },
    });


    var esperadooee = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: ['R', 'E'],
            datasets: [{
            data: [valoee, 80],
            backgroundColor: ['#fffe06', '#389743'],
            }],
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
                },

            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'OEE%',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
            },

            scales: {
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 10,
                        color: '#2c4f63',
                        font: {weight: 'bold', size: 12},
                    }
                },
                x: {
                    position: 'top',
                    ticks: { 
                        color: '#2c4f63', 
                        font: {weight: 'bold', size: 12},
                    }
                    
                }
            }
            
            },
    });

        
    Realtime();

    function consultarhistoricos(){
        var confecha1 = document.getElementById('fechahistp2').value;
        var confecha2 = document.getElementById('fechahistfinp2').value;
        var conturno = document.getElementById('turnop2').value;

        var url = 'reporte.html?valor1=' + encodeURIComponent(confecha1) +
                      '&valor2=' + encodeURIComponent(confecha2) +
                      '&valor3=' + encodeURIComponent(conturno);

        window.location.href = url;

    }



});
