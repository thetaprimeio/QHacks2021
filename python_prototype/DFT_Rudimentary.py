import math as m
import cmath as c
import csv

# Open data set to match frequency valuations to musical notes
# in the Western scale, format into a list
file_freq = open("frequency_notes.csv")
freq_data = csv.reader(file_freq)
freq_list = list(freq_data)

# Define the frequencies of the constitutent sinusoids of f(x)
# The frequency of every sinusoid is f = omega/2pi
omega_1 = 1643
omega_2 = 2070
omega_3 = 2460

# Define a sinusoid function f(x), it is assumed that x
# is a time unit in seconds
def sint(x):
    return m.sin(omega_1*x) + m.sin(omega_2*x) + m.sin(omega_3*x)

# We will evaluate this sint function at discrete points
# We propose a change of variables x_k = 2pi*k/N
# Where N is the number of sample points and k is an integer
# from 0 to N-1 to enforce function valuations over one period
# for any N and integer k
def sintk(k,N):
    return sint(2*m.pi*k/N)

# Compute the DFT of the sintk function, valuations of p correspdond
# to the previously defined omega values
# [N] = number of sample points
# [pmax] = upper bound on p valuations for DFT function
def dft(N, pmax):
    gp = 0 + 0j
    for p in range(1000,pmax):
        gp = 0 + 0j
        for k in range(0,N):
            gp += m.sqrt(N)*sintk(k,N)*(c.exp(2*m.pi*1j*k*p/N))
        if abs(gp) > 1:
            print("------------")
            # Convert identified omega value to frequency in Hz
            print(str.format('{0:.2f}', p/(2*m.pi)) + " Hz")
            # Look for a match with a note in the Western scale
            for i in range(0,len(freq_list)):
                if abs(float(freq_list[i][2])-p/(2*m.pi)) < 1:
                    print("Note identified: " + freq_list[i][0] + freq_list[i][1])
            print("------------")
    print("DONE")
    return gp
    
# Expected to see greater DFT magnitude around 2pi frequency
dft(20_000, 3_000)
