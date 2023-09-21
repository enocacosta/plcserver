
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('timeChart').getContext('2d');
    var ctx1 = document.getElementById('Disponibilidad').getContext('2d');
    var ctx2 = document.getElementById('Rendimiento').getContext('2d');
    var ctx3 = document.getElementById('Calidad').getContext('2d');
    var ctx4 = document.getElementById('OEE').getContext('2d');
    var ctx5 = document.getElementById('velocidad').getContext('2d');
    var ctx6 = document.getElementById('esperadooee').getContext('2d');
    var esperadooeetb = document.getElementById('esperadooeetb').value;
    var maquina1 = document.getElementById('maq1');
    var maquina2 = document.getElementById('maq2');
    var maquina3 = document.getElementById('maq3');
    var maquina4 = document.getElementById('maq4');

    document.getElementById('esperadooeebt').addEventListener ("click", oeeesperadoupdt);

    function oeeesperadoupdt(){
        esperadooeetb = document.getElementById('esperadooeetb').value;
        esperadooee.data.datasets[0].data = [valoee, esperadooeetb];
        esperadooee.update();
    }


    var timeChartval = 92;
    var valrendimiento = 42;
    var valdisponibilidad = 70;
    var valcalidad = 30;
    var valoee = 25;
    var velvar = 24;
    var valmaq1 = 1;
    var valmaq2 = 1;
    var valmaq3 = 1;
    var valmaq4 = 1;


    function generarNumeroAleatorio() {

        fetch('http://localhost:3000')
        .then(res =>{
        return res.json();
        })
        .then(data =>{
            console.log(data)


            timeChartval = Math.floor(Math.random() * 100) + 1;

            valrendimiento = data.oeeCalculado.rendimiento;
            valdisponibilidad = data.oeeCalculado.disponibilidad;
            valcalidad = data.oeeCalculado.calidad;

            valoee = valrendimiento*valdisponibilidad*valcalidad;

            
            velvar = Math.floor(Math.random() * 8) + 23;
            valmaq1 = Math.floor(Math.random() * 2);
            valmaq2 = Math.floor(Math.random() * 2);
            valmaq3 = Math.floor(Math.random() * 2);
            valmaq4 = Math.floor(Math.random() * 2);


        }).catch(error => console.log(error));
        
        timeChart.data.datasets[0].data = [timeChartval, 100-timeChartval, (100-timeChartval)*1.45];
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
        document.getElementById('velocidadtb').value= velvar;


        if (valmaq1 == 0) {
            maquina1.style.backgroundColor = "#9a0501"
            maquina1.innerHTML = "STOP"
        }else{
            maquina1.style.backgroundColor = "green"
            maquina1.innerHTML = "RUN"
        }

        if (valmaq2 == 0) {
            maquina2.style.backgroundColor = "#9a0501"
            maquina2.innerHTML = "STOP"
        }else{
            maquina2.style.backgroundColor = "green"
            maquina2.innerHTML = "RUN"
        }

        if (valmaq3 == 0) {
            maquina3.style.backgroundColor = "#9a0501"
            maquina3.innerHTML = "STOP"
        }else{
            maquina3.style.backgroundColor = "green"
            maquina3.innerHTML = "RUN"
        }

        if (valmaq4 == 0) {
            maquina4.style.backgroundColor = "#9a0501"
            maquina4.innerHTML = "STOP"
        }else{
            maquina4.style.backgroundColor = "green"
            maquina4.innerHTML = "RUN"
        }
        


        timeChart.update();
        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();
        velocidad.update();
        esperadooee.update();

    }setInterval(generarNumeroAleatorio, 10000);
    


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
            data: [timeChartval, 100-timeChartval, (100-timeChartval)*1.45], // Porcentajes de tiempo de operación e inactividad
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
                    max: 40,
                    min: 0,
                    ticks: {
                        stepSize: 5
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

        
    generarNumeroAleatorio();



});
