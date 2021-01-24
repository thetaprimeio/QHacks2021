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

  const job = window.dcp.compute.for(0, 101, function(p){
    progress(0);
    var N = 20000;
    var gp = math.complex(0,0);
    gp = math.complex(0,0);

    for(k = 0; k <= N; k++){
    var m1 = (math.sqrt(N)*(math.sin(w1*2*math.pi*k/N)
    +   math.sin(w2*2*math.pi*k/N)  +   math.sin(w3*2*math.pi*k/N)));
    var m2 = (math.exp(math.multiply(math.complex(0,1),(2*math.pi*k*p/N))))
    var t1 = math.multiply(m1, m2);
    gp = math.add(gp, t1);
    progress(k / N); // Progress factorial
    }
    if(math.abs(gp) > 1){
    return p;
    }
    return false;
  });

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
  if (!result.event){
    return;
  }
  results.push(event.result);

  //let resultsText;
  //document.getElementById('results').innerText = resultsText;
}

document.addEventListener('DOMContentLoaded', main);