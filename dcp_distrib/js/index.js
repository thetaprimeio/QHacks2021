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
  const a = Number(inputA.value);
  const b = Number(inputB.value);
  const c = Number(inputC.value);

  setStatus('Performing Discrete Fourier Transform on the described sum of sines.');

  computeBtn.disabled = true;

  const job = window.dcp.compute.for(0, 101, computeDFT(a,b,c,p));

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
  results.push(event.result);

  let resultsText;
  document.getElementById('results').innerText = resultsText;
}

document.addEventListener('DOMContentLoaded', main);