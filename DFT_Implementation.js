function computeDFT(w1, w2, w3){
    let returnArr = [-1, -1, -1];
    var pmax = 300;
    var N = 1000;
    var gp = math.complex(0,0);
    var arrCounter = 0;
    for(p = 0; p <= pmax; p++){
        gp = math.complex(0,0);

        for(k = 0; k <= N; k++){
            // gp += Math.sqrt(N)*(Math.sin(w1*2*Math.pi*k/N)  +   Math.sin(w2*2*Math.pi*k/N)+Math.sin(w3*2*Math.pi*k/N))* (Math.exp(2*Math.pi*math.complex(0,1)*k*p/N));
            // gp += math.multiply((Math.sqrt(N)*(Math.sin(w1*2*Math.pi*k/N)  +   Math.sin(w2*2*Math.pi*k/N)  +   Math.sin(w3*2*Math.pi*k/N))) , (Math.exp(math.multiply(math.complex(0,1),(2*Math.pi*k*p/N)))));
            gp = math.add(gp, math.multiply((Math.sqrt(N)*(Math.sin(w1*2*Math.pi*k/N)  +   Math.sin(w2*2*Math.pi*k/N)  +   Math.sin(w3*2*Math.pi*k/N))) , (Math.exp(math.multiply(math.complex(0,1),(2*Math.pi*k*p/N))))));
        }

        

        if(Math.abs(gp) > 1){
            returnArr[counter] = gp;
            counter++;
        }
    }
    console.log(returnArr);
    return returnArr;
}
