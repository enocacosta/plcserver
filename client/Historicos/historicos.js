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
    var extractedData2;

    var labels1 = [];
    var turno1Data = [];
    var turno2Data = [];
    var turno3Data = [];

    document.getElementById("consultar").addEventListener("click", getinfort);
    document.getElementById("turno").addEventListener("change", detailedOEE);
    document.getElementById("dateRange").addEventListener("change", detailedOEE);
    document.getElementById('fechahist').addEventListener ("change", comparedates);
    document.getElementById('fechahistfin').addEventListener ("change", comparedates);

    //SETEAR FECHAS
    function setdates (){
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        var yyyy = yesterday.getFullYear();
        var mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // Enero es 0
        var dd = String(yesterday.getDate()).padStart(2, '0');
        var formattedDate = yyyy + '-' + mm + '-' + dd;
        document.getElementById('fechahist').max = formattedDate;
        document.getElementById('fechahist').value = formattedDate;
        document.getElementById('fechahistfin').value = formattedDate;
        document.getElementById('fechahistfin').max = formattedDate;
    }setdates ();

    function comparedates (){
        var fecha1 = new Date(document.getElementById('fechahist').value);
        var fecha2 = new Date(document.getElementById('fechahistfin').value);

        if (fecha1 > fecha2) {
            document.getElementById('fechahist').value = document.getElementById('fechahistfin').value;
        }
    }
    
    //OBTENER INFORMACIÓN

    function getinfort(){

        fecha1 = document.getElementById("fechahist").value;
        fecha2 = document.getElementById("fechahistfin").value;

        fetch(`http://localhost:3000/reporte?fechaI=${fecha1}&fechaF=${fecha2}`)
        .then(res =>{
        return res.json();
        })
        .then(data =>{

            console.log(data);

            // 1. Convertir las variables rendimiento, calidad y disponibilidad a enteros
            data.datosOEE.forEach((item) => {
                item.rendimiento = Math.round(item.rendimiento);
                item.totalTurno = Math.round(item.totalTurno);
                item.disponibilidad = Math.round(item.disponibilidad);
            });

            // 2. acortar la fecha
            data.datosOEE.forEach((item) => {
                item.createdAt = item.createdAt.slice(0, 10);
            });

            //para calidad
            data.datosRechazos.forEach((item) => {
                item.fecha = item.fecha.slice(0, 10);
            });

            // Primero, vamos a agrupar los datosRechazos por fecha y turno
            const groupedRechazos = {};
            data.datosRechazos.forEach(rechazo => {
            if (!groupedRechazos[rechazo.fecha]) {
                groupedRechazos[rechazo.fecha] = {};
            }
            groupedRechazos[rechazo.fecha][rechazo.turno] = rechazo.cantidad;
            });

            // Luego, calculamos calidad y lo agregamos a cada objeto en datosOEE
            data.datosOEE.forEach(oee => {
            const rechazos = groupedRechazos[oee.createdAt] && groupedRechazos[oee.createdAt][oee.turno];
            if (rechazos !== undefined) {
                oee.calidad = Math.round(((oee.totalTurno - rechazos) / oee.totalTurno) * 100);
            }else{
                oee.calidad = Math.round(((oee.totalTurno) / oee.totalTurno) * 100)
            }
            });

            

            //calculamos oee
            data.datosOEE.forEach((item) => {
                item.oee = Math.round((item.calidad * item.rendimiento * item.disponibilidad) / 10000);
            });            
            



            const groupedData = {};
            data.datosOEE.forEach((item) => {
            const date = `${item.createdAt} T${item.turno}`;
            if (!groupedData[date]) {
                groupedData[date] = item.oee;
            }
            });
           


            // Obtén las fechas únicas y ordénalas
            const dates = Object.keys(groupedData).sort();
            const values1 = Object.values(groupedData);


            // Configura las etiquetas (labels) del eje X
            labels1 = dates;

            OEETotal.data.labels = labels1;
            OEETotal.data.datasets[0].data = values1;
            OEETotal.update();

           document.getElementsByClassName("informe")[0].style.display = "block";
           document.getElementsByClassName("informe")[1].style.display = "block";
           document.getElementsByClassName("informe")[2].style.display = "block";

           setslider();

           extractedData = data.datosOEE;

           

           //Datos para las paradas

            data.datosTipoParada.forEach((item) => {
            item.createdAt = item.createdAt.slice(0, 10);
            });

            const groupedData2 = {};
            data.datosTipoParada.forEach(item => {
                const tipoParada = item.tipoParada;
                if (!groupedData2[tipoParada]) {
                    groupedData2[tipoParada] = 0;
                }
                groupedData2[tipoParada] += item.tiempo;
            });


            const totalDuration = Object.values(groupedData2).reduce((acc, duration) => acc + duration, 0);

            const pieData = [];
            for (const tipoParada in groupedData2) {
                const tiempo = groupedData2[tipoParada];
                const porcentaje = (tiempo / totalDuration) * 100;
                pieData.push({ tipoParada, porcentaje });
            }

            const labelspiegen = pieData.map(item => `Error ${item.tipoParada}`);
            const datapiegen = pieData.map(item => item.porcentaje);

            graficapareto.data.labels = labelspiegen;
            graficapareto.data.datasets[0].data = datapiegen;
            graficapareto.update();

            extractedData2 = data.datosTipoParada;

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
        
        

        if (filteredData[0] === undefined) {
            Disponibilidad.data.datasets[0].data = [0, 0];
            Rendimiento.data.datasets[0].data = [0, 0];
            Calidad.data.datasets[0].data = [0, 0];
            OEE.data.datasets[0].data = [0, 0];
            document.getElementById("nodata").innerHTML = "No hay datos OEE para el dia/turno seleccionados"
            document.getElementById("nodata").style.display = "block";
        } else {
            Disponibilidad.data.datasets[0].data = [filteredData[0].disponibilidad, 100-filteredData[0].disponibilidad];
            Rendimiento.data.datasets[0].data = [filteredData[0].rendimiento, 100-filteredData[0].rendimiento];
            Calidad.data.datasets[0].data = [filteredData[0].calidad, 100-filteredData[0].calidad];
            OEE.data.datasets[0].data = [filteredData[0].oee, 100-filteredData[0].oee];
            document.getElementById("nodata").style.display = "none";
        }

        setcolor();

        Disponibilidad.update();
        Rendimiento.update();
        Calidad.update();
        OEE.update();



        filteredData2 = extractedData2.filter(item => {
            return item.createdAt == datetocompare && item.turno == document.getElementById("turno").value;
        });

        if (filteredData2[0] === undefined) {
            paradaespecifica.data.datasets[0].data = [0];
            paradaespecifica.data.labels = ["none"];
            document.getElementById("nodata").innerHTML = "No hay datos de paradas para el dia/turno seleccionados"
            document.getElementById("nodata").style.display = "block";
        } else {

            const tempdata = {};
            filteredData2.forEach(item => {
                const tipoParada = item.tipoParada;
                if (!tempdata[tipoParada]) {
                    tempdata[tipoParada] = 0;
                }
                tempdata[tipoParada] += item.tiempo;
            });


            const temptotalDuration = Object.values(tempdata).reduce((acc, duration) => acc + duration, 0);

            const temppieData = [];
            for (const tipoParada in tempdata) {
                const tiempo = tempdata[tipoParada];
                const porcentaje = (tiempo / temptotalDuration) * 100;
                temppieData.push({ tipoParada, porcentaje });
            }


            const templabelspiegen = temppieData.map(item => `Error ${item.tipoParada}`);
            const tempdatapiegen = temppieData.map(item => item.porcentaje);

            paradaespecifica.data.labels = templabelspiegen;
            paradaespecifica.data.datasets[0].data = tempdatapiegen;

            document.getElementById("nodata").style.display = "none";
        }

        if (filteredData2[0] === undefined && filteredData[0] === undefined) {
            document.getElementById("nodata").innerHTML = "No hay datos para el dia/turno seleccionados"
            document.getElementById("nodata").style.display = "block";
        }
        

        paradaespecifica.update();

        console.log(filteredData2);

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
              label: 'OEE',
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

    var ctx6 = document.getElementById('graficapareto').getContext('2d');
    var graficapareto = new Chart(ctx6, {
        type: 'pie',
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow'
              ],
              datasets: [{
                label: 'Pareto paradas',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(31, 119, 180)',
                    'rgb(255, 127, 14)',
                    'rgb(44, 160, 44)',
                    'rgb(214, 39, 40)',
                    'rgb(148, 103, 189)',
                    'rgb(140, 86, 75)',
                    'rgb(227, 119, 194)',
                    'rgb(127, 127, 127)',
                    'rgb(188, 189, 34)',
                    'rgb(23, 190, 207)',
                    'rgb(108, 75, 32)',
                    'rgb(222, 223, 60)'
                ],
                hoverOffset: 4
              }]
          
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            
        }
        
    });


    var ctx7 = document.getElementById('paradaespecifica').getContext('2d');
    var paradaespecifica = new Chart(ctx7, {
        type: 'pie',
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow'
              ],
              datasets: [{
                label: 'Pareto paradas',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(31, 119, 180)',
                    'rgb(255, 127, 14)',
                    'rgb(44, 160, 44)',
                    'rgb(214, 39, 40)',
                    'rgb(148, 103, 189)',
                    'rgb(140, 86, 75)',
                    'rgb(227, 119, 194)',
                    'rgb(127, 127, 127)',
                    'rgb(188, 189, 34)',
                    'rgb(23, 190, 207)',
                    'rgb(108, 75, 32)',
                    'rgb(222, 223, 60)'
                ],
                hoverOffset: 4
              }]
          
        },

        options: {
            responsive: false,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Paradas%',
                    font: {weight: 'bold', size: 14},
                    color: '#2c4f63',
                },
            },
        }
        
    });

    var tempparams = new URLSearchParams(window.location.search);
    var temp1 = tempparams.get('valor1');
    var temp2 = tempparams.get('valor2');
    var temp3 = tempparams.get('valor3');

    if (temp1 !== null && temp2 !== null && temp3 !== null) {

        document.getElementById("fechahist").value = temp1;
        document.getElementById("fechahistfin").value = temp2;
        document.getElementById("turno").value = temp3;

        getinfort();


    }

});