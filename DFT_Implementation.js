function computeDFT(w1, w2, w3, p){
    progress(0);
    var pmax = 100;
    var N = 20000;
    var gp = math.complex(0,0);
    var arrCounter = 0;
    gp = math.complex(0,0);

    for(k = 0; k <= N; k++){
        var m1 = (Math.sqrt(N)*(Math.sin(w1*2*Math.pi*k/N)
        +   Math.sin(w2*2*Math.pi*k/N)  +   Math.sin(w3*2*Math.pi*k/N)));

        var m2 = (math.exp(math.multiply(math.complex(0,1),(2*Math.pi*k*p/N))))

        var t1 = Math.multiply(m1, m2);
        gp = math.add(gp, t1);
        progress(k / N); // Progress factorial
    }
    if(Math.abs(gp) > 1){
        return p;
    }
    return false;
}