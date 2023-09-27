document.addEventListener('DOMContentLoaded', function () {
    window.jsPDF = window.jspdf.jsPDF;
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
    document.getElementById('consultar').addEventListener ("click", consultarhistoricos);

    function setdates (){
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yyyy = yesterday.getFullYear();
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // Enero es 0
        var dd = String(yesterday.getDate()).padStart(2, '0');
        var formattedDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('fechahist').max = formattedDate;
        document.getElementById('fechahist').value = formattedDate;
    }setdates ();

    function oeeesperadoupdt(){
        esperadooeetb = document.getElementById('esperadooeetb').value;
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


    function generarNumeroAleatorio() {

        fetch('http://localhost:3000')
        .then(res =>{
        return res.json();
        })
        .then(data =>{
            console.log(data)


            timeChartval = Math.floor(Math.random() * 100) + 1;

            valrendimiento = parseInt(data.rendimiento);
            valdisponibilidad = parseInt(data.disponibilidad);
            valcalidad = parseInt(data.calidad);

            valoee = parseInt((valrendimiento*valdisponibilidad*valcalidad)/10000);

            
            velvar = Math.floor(Math.random() * 8) + 23;
            valmaq1 = data.estadoMaquina;
            valmaq2 = data.estadoMaquina;
            valmaq3 = data.estadoMaquina;
            valmaq4 = data.estadoMaquina;


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

    function consultarhistoricos(){
        confecha = document.getElementById('fechahist').value;
        conturno = document.getElementById('turno').value;

        // Construct the URL with query parameters
        const url = `http://localhost:3000/reporte?date=${confecha}&turno=${conturno}`;

        // Make the GET request
        fetch(url)
        .then((response) => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {

            console.log(data[0].disponibilidad);
            var reportedisponibbilidad = parseInt(data[0].disponibilidad);
            var reporterendimiento = parseInt(data[0].rendimiento);
            var reportecalidad = parseInt(data[0].calidad);
            var reporteturno = parseInt(data[0].turno);
            var reportefecha = stringify(data[0].fecha);

            const reportHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Reporte Mensual</title>
                <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }

                    h1 {
                        text-align: center;
                    }

                    .informe {
                        border: 1px solid #000;
                        padding: 10px;
                        margin: 20px 0;
                        text-align: center;
                    }

                    .informe h2 {
                        margin: 0;
                    }

                    .canvas-container {
                        display: flex;
                        justify-content: center; /* Centrar horizontalmente */
                        align-items: center;
                    }

                    canvas {
                        margin-right: 10px; /* Espacio entre los canvas */
                    }

                    @media print {
                        body {
                            margin: 0;
                            padding: 0;
                        }

                        h1 {
                            page-break-before: always;
                        }

                        .informe {
                            page-break-inside: avoid;
                        }
                    }
                </style>
                <script>
                    document.addEventListener('DOMContentLoaded', function () {

                        var valdisponibilidad = ${reportedisponibbilidad};
                        var valrendimiento = ${reporterendimiento};
                        var valcalidad = ${reportecalidad};
                        var valoee =parseInt((valrendimiento*valdisponibilidad*valcalidad)/10000);

                        document.getElementById("titlereporte").innerHTML = "Reporte Mensual: " + ${reportefecha};
                        document.getElementById("titleturno").innerHTML = "Turno: " + ${reporteturno};

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
                        
                        if (valdisponibilidad<=40) {
                            var Disponibilidadcolor = ['#fd0100', '#e5e5e5'];
                        } else if (valdisponibilidad>40 && valdisponibilidad<75) {
                            var Disponibilidadcolor = ['#fffe06', '#e5e5e5'];            
                        }else {
                            var Disponibilidadcolor = ['#05fc03', '#e5e5e5'];
                        }
                
                        if (valrendimiento<=40) {
                            var Rendimientocolor = ['#fd0100', '#e5e5e5'];
                        } else if (valrendimiento>40 && valrendimiento<75) {
                            var Rendimientocolor = ['#fffe06', '#e5e5e5'];            
                        }else {
                            var Rendimientocolor = ['#05fc03', '#e5e5e5'];
                        }
                
                        if (valcalidad<=40) {
                            var Calidadcolor = ['#fd0100', '#e5e5e5'];
                        } else if (valcalidad>40 && valcalidad<75) {
                            var Calidadcolor = ['#fffe06', '#e5e5e5'];            
                        }else {
                            var Calidadcolor = ['#05fc03', '#e5e5e5'];
                        }
                
                        if (valoee<=40) {
                            var OEEcolor = ['#fd0100', '#e5e5e5'];
                        } else if (valoee>40 && valoee<75) {
                            var OEEcolor = ['#fffe06', '#e5e5e5'];            
                        }else {
                            var OEEcolor = ['#05fc03', '#e5e5e5'];
                        }


                        var ctx1 = document.getElementById('Disponibilidad').getContext('2d');
                        var myChart = new Chart(ctx1, {
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
                        var myChart = new Chart(ctx2, {
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
                        var myChart = new Chart(ctx3, {
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
                        var myChart = new Chart(ctx4, {
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
                                cutout: 60,
                            }
                        });
                    
                    });
                </script>
            </head>
            <body>
                <h1 id="titlereporte"></h1> 
                <h2 id="titleturno" style="text-align: center;"></h2>

                <div class="informe">
                    <h2>PARAMETROS</h2>
                    <div class="canvas-container">
                        <canvas id="Disponibilidad" width="200" height="200"></canvas>
                        <canvas id="Rendimiento" width="200" height="200"></canvas>
                        <canvas id="Calidad" width="200" height="200"></canvas>
                    </div>
                </div>

                <div class="informe">
                    <h2>OEE</h2>
                        <div class="canvas-container">
                            <canvas id="OEE" width="200" height="200"></canvas>
                        </div>
                </div>

            </body>
            </html>
        `;

        const blob = new Blob([reportHTML], { type: "text/html" });

        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");
        
        window.addEventListener("beforeunload", function () {
            URL.revokeObjectURL(url);
        });

        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }



});
