const results = [];

function main() {
  const inputA = document.getElementById('inputA');
  const inputB = document.getElementById('inputB');
  const inputC = document.getElementById('inputC');

  inputA.addEventListener('input', () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    const c = Number(inputC.value);
  });

  inputB.addEventListener('input', () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    const c = Number(inputC.value);
  });

  inputC.addEventListener('input', () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);
    const c = Number(inputC.value);
  });

  document
    .getElementById('compute-button')
    .addEventListener('click', deployJob);
}

async function deployJob() {
  console.log(document.getElementById('inputA').value);
  const computeBtn = document.getElementById('compute-button');
  const w1 = Number(document.getElementById('inputA').value);
  const w2 = Number(document.getElementById('inputB').value);
  const w3 = Number(document.getElementById('inputC').value);
  setStatus('Performing Discrete Fourier Transform on the described sum of sines.');
//w1=10
//w2=12
//w3=14
  computeBtn.disabled = true;       //0 to 100
  const job = window.dcp.compute.for(0, 41, function(p,w1,w2,w3){
    progress(0);
    var N = 300;//500
    var gp_re = 0;
    var gp_im = 0;
    for(k = 0; k <= N; k++){
      var m1 = Math.sqrt(N)*(Math.sin(w1*2*Math.PI*k/N) +
      Math.sin(w2*2*Math.PI*k/N) + Math.sin(w3*2*Math.PI*k/N));
      var m2_re = Math.cos(2*Math.PI*k*p/N);
      var m2_im = Math.sin(2*Math.PI*k*p/N);
      var t1_re = m1*m2_re;
      var t1_im = m1*m2_im;
      gp_re = gp_re + t1_re;
      gp_im = gp_im + t1_im;
      progress(k / N); // Progress factorial
    }
    if(Math.sqrt(Math.pow(gp_re, 2) + Math.pow(gp_im, 2)) > 1){
      return p;
    }
    return false;
  }, [w1, w2, w3]);

  job.public.name = 'Discrete Fourier Transform';
  job.work.on('uncaughtException', (e) => alert(e));
  job.on('accepted', () => {
    setStatus('Job accepted; distributing slices.');
    document.getElementById('resultsMsg').hidden = false;
    document.getElementById('progress-container').hidden = false;
  });
  job.on('status', (status) => {
    setStatus(
      `${status.computed} out of ${status.total} results computed. ${status.distributed} distributed.`,
    );
    document.getElementById('progressbar').style.width = `${
      (status.computed / status.total) * 100
    }%`;
  });

  job.on('result', logResult);
  job.on('complete', () => {
    computeBtn.disabled = false;
    drawOutputChart(results[0], results[1], results[2]);
    console.log(results);
  });

  try {
    await job.localExec();//exec
    // OR
    // await job.localExec();
  } catch (error) {
    alert(error);
  }
}

function setStatus(newStatus) {
  document.getElementById('status').innerText = newStatus;
}

function logResult(event) {
  console.log(event.result);
  if (!event.result){
    return;
  }
  results.push(event.result);
  //let resultsText;
  //document.getElementById('results').innerText = resultsText;
}

document.addEventListener('DOMContentLoaded', main);


function drawOutputChart(w1, w2, w3){
  var ctx = document.getElementById("outputChart");
  var data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
      datasets: [{
          label: "Transformed DFT function",
          function: function(x) { 
              if(x == w1 || x == w2 || x == w3){
                  return 1
              }    
              
              return 0 
          },
          borderColor: "rgba(247,0,0,1.00)",
          data: [],
          fill: false
      }]
  };

  Chart.pluginService.register({
      beforeInit: function(chart) {
          var data = chart.config.data;
          for (var i = 0; i < data.datasets.length; i++) {
              for (var j = 0; j < data.labels.length; j++) {
                  var fct = data.datasets[i].function,
                      x = data.labels[j],
                      y = fct(x);
                  data.datasets[i].data.push(y);
              }
          }
      }
  });

  var myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}