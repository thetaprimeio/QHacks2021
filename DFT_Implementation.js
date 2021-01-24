function computeDFT(w1, w2, w3){
    let returnArr = [-1, -1, -1];
    var pmax = 100;
    var N = 20000;
    var gp = math.complex(0,0);
    var arrCounter = 0;
    for(p = 0; p <= pmax; p++){
        gp = math.complex(0,0);

        for(k = 0; k <= N; k++){
            var m1 = (math.sqrt(N)*(math.sin(w1*2*math.pi*k/N)
            +   math.sin(w2*2*math.pi*k/N)  +   math.sin(w3*2*math.pi*k/N)));
            var m2 = (math.exp(math.multiply(math.complex(0,1),(2*math.pi*k*p/N))))
            var t1 = math.multiply(m1, m2);
            gp = math.add(gp, t1);
        }
        console.log(gp);
        if(math.abs(gp) > 1){
            returnArr[counter] = gp;
            counter++;
        }
    }
    console.log(returnArr);
    return returnArr;
}
