document.addEventListener('DOMContentLoaded', function () {
    window.jsPDF = window.jspdf.jsPDF;
    var ctx = document.getElementById('timeChartp3').getContext('2d');
    var ctx1 = document.getElementById('Disponibilidadp3').getContext('2d');
    var ctx2 = document.getElementById('Rendimientop3').getContext('2d');
    var ctx3 = document.getElementById('Calidadp3').getContext('2d');
    var ctx4 = document.getElementById('OEEp3').getContext('2d');
    var maquina1 = document.getElementById('maq1p3');

    document.getElementById('consultarp3').addEventListener ("click", consultarhistoricos);
    document.getElementById('fechahistp3').addEventListener ("change", comparedates);
    document.getElementById('fechahistfinp3').addEventListener ("change", comparedates);

    function setdates (){
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yyyy = yesterday.getFullYear();
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // Enero es 0
        var dd = String(yesterday.getDate()).padStart(2, '0');
        var formattedDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('fechahistp3').max = formattedDate;
        document.getElementById('fechahistp3').value = formattedDate;
        document.getElementById('fechahistfinp3').value = formattedDate;
        document.getElementById('fechahistfinp3').max = formattedDate;
    }setdates ();

    function comparedates (){
        var fecha1 = new Date(document.getElementById('fechahistp3').value);
        var fecha2 = new Date(document.getElementById('fechahistfinp3').value);

        if (fecha1 > fecha2) {
            document.getElementById('fechahistp3').value = document.getElementById('fechahistfinp3').value;
        }
    }


    var timeChartval = 0;
    var valrendimiento = 0;
    var valdisponibilidad = 0;
    var valcalidad = 0;
    var valoee = 0;
    var valmaq1 = 1;
    var tparada = 0;
    var tproductivo = 0;


    function Realtime() {

        fetch('http://localhost:3000')
        .then(res =>{
        return res.json();
        })
        .then(data =>{
            


            timeChartval = Math.floor(Math.random() * 100) + 1;

            valrendimiento = parseInt(data.rendimiento);
            valdisponibilidad = parseInt(data.disponibilidad);
            valcalidad = parseInt(data.calidad);
            valoee = parseInt((valrendimiento*valdisponibilidad*valcalidad)/10000);

            document.getElementById('paradap3').value = ((parseInt(data.tiempoStop))/60).toFixed(2);
            tparada  = (parseInt(data.tiempoStop))/60;
            tproductivo = (parseInt(data.tiempoProductivo))/60;
            
            valmaq1 = data.estadoMaquina;


        }).catch(error => console.log(error));
        
        timeChart.data.datasets[0].data = [tparada, tproductivo, 0];
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
        


        timeChart.update();
        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();

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


        
    Realtime();

    function consultarhistoricos(){
        var confecha1 = document.getElementById('fechahistp3').value;
        var confecha2 = document.getElementById('fechahistfinp3').value;
        var conturno = document.getElementById('turnop3').value;

        var url = 'reporte.html?valor1=' + encodeURIComponent(confecha1) +
                      '&valor2=' + encodeURIComponent(confecha2) +
                      '&valor3=' + encodeURIComponent(conturno);

        window.location.href = url;

    }



});
