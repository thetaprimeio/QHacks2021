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
  const computeBtn = document.getElementById('compute-button');
  const inputA = document.getElementById('inputA');
  const inputB = document.getElementById('inputB');
  const inputC = document.getElementById('inputC');
  const w1 = Number(inputA.value);
  const w2 = Number(inputB.value);
  const w3 = Number(inputC.value);
  setStatus('Performing Discrete Fourier Transform on the described sum of sines.');

  computeBtn.disabled = true;
  const job = window.dcp.compute.for(1, 100, function(p,w1,w2,w3){
    progress(0);
    var N = 500;
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
    console.log(results);
  });

  try {
    await job.localExec();
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