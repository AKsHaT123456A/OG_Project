const surveyData = [
    { MD: 100.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 200.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 300.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 400.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 500.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 600.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 700.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 800.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 900.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1000.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1100.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1200.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1300.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1400.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1500.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1600.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1700.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1765.42, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1800.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 1900.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2000.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2100.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2200.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2300.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2400.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2500.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 2600.00, Inclination: 0.79, Azimuth: 330.00 },
    { MD: 2700.00, Inclination: 1.59, Azimuth: 330.00 },
    { MD: 2790.50, Inclination: 2.31, Azimuth: 330.00 },
    { MD: 2800.00, Inclination: 2.38, Azimuth: 330.00 },
    { MD: 2818.52, Inclination: 2.53, Azimuth: 330.00 },
    { MD: 2900.00, Inclination: 3.18, Azimuth: 330.00 },
    { MD: 3000.00, Inclination: 3.97, Azimuth: 330.00 },
    { MD: 3100.00, Inclination: 4.76, Azimuth: 330.00 },
    { MD: 3130.00, Inclination: 5.00, Azimuth: 330.00 },
    { MD: 3200.00, Inclination: 6.40, Azimuth: 330.00 },
    { MD: 3230.00, Inclination: 7.00, Azimuth: 330.00 },
    { MD: 3300.00, Inclination: 7.00, Azimuth: 330.00 },
    { MD: 3355.71, Inclination: 7.00, Azimuth: 330.00 },
    { MD: 3380.00, Inclination: 7.00, Azimuth: 330.00 },
    { MD: 3400.00, Inclination: 6.62, Azimuth: 330.00 },
    { MD: 3500.00, Inclination: 4.70, Azimuth: 330.00 },
    { MD: 3600.00, Inclination: 2.78, Azimuth: 330.00 },
    { MD: 3700.00, Inclination: 0.86, Azimuth: 330.00 },
    { MD: 3745.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 3800.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 3900.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4000.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4100.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4200.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4300.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4400.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4500.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4600.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4700.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4800.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 4900.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5000.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5100.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5126.80, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5185.80, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5200.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5300.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5400.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5500.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5588.80, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5600.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5688.38, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5700.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5800.00, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5835.80, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5888.38, Inclination: 0.00, Azimuth: 330.00 },
    { MD: 5889.80, Inclination: 0.04, Azimuth: 330.00 },
    { MD: 5900.00, Inclination: 0.33, Azimuth: 330.00 },
    { MD: 5917.80, Inclination: 0.82, Azimuth: 330.00 },
    { MD: 5927.80, Inclination: 1.10, Azimuth: 330.00 },
    { MD: 5991.84, Inclination: 2.90, Azimuth: 330.00 },
    { MD: 6000.00, Inclination: 3.13, Azimuth: 330.00 },
    { MD: 6100.00, Inclination: 5.93, Azimuth: 330.00 },
    { MD: 6200.00, Inclination: 8.73, Azimuth: 330.00 },
    { MD: 6300.00, Inclination: 11.53, Azimuth: 330.00 },
    { MD: 6316.95, Inclination: 12.00, Azimuth: 330.00 },
    { MD: 6400.00, Inclination: 12.00, Azimuth: 330.00 },
    { MD: 6498.47, Inclination: 12.00, Azimuth: 330.00 },
    { MD: 6500.00, Inclination: 12.00, Azimuth: 330.00 },
    { MD: 6548.47, Inclination: 12.00, Azimuth: 330.00 },
    { MD: 6600.00, Inclination: 14.45, Azimuth: 330.00 },
    { MD: 6700.00, Inclination: 19.20, Azimuth: 330.00 },
    { MD: 6800.00, Inclination: 23.95, Azimuth: 330.00 },
    { MD: 6834.91, Inclination: 25.61, Azimuth: 330.00 },
    { MD: 6900.00, Inclination: 28.71, Azimuth: 330.00 },
    { MD: 6934.59, Inclination: 30.35, Azimuth: 330.00 },
    { MD: 7000.00, Inclination: 33.46, Azimuth: 330.00 },
    { MD: 7100.00, Inclination: 38.21, Azimuth: 330.00 },
    { MD: 7116.64, Inclination: 39.00, Azimuth: 330.00 },
    { MD: 7200.00, Inclination: 40.88, Azimuth: 330.73 },
    { MD: 7300.00, Inclination: 43.14, Azimuth: 331.53 },
    { MD: 7400.00, Inclination: 45.40, Azimuth: 332.27 },
    { MD: 7500.00, Inclination: 47.67, Azimuth: 332.95 },
    { MD: 7600.00, Inclination: 49.94, Azimuth: 333.59 },
    { MD: 7668.75, Inclination: 51.50, Azimuth: 334.00 },
    { MD: 7700.00, Inclination: 53.01, Azimuth: 334.45 },
    { MD: 7800.00, Inclination: 57.83, Azimuth: 335.78 },
    { MD: 7900.00, Inclination: 62.67, Azimuth: 336.97 },
    { MD: 7957.03, Inclination: 65.44, Azimuth: 337.60 },
    { MD: 8000.00, Inclination: 67.52, Azimuth: 338.06 },
    { MD: 8100.00, Inclination: 72.38, Azimuth: 339.08 },
    { MD: 8200.00, Inclination: 77.24, Azimuth: 340.05 },
    { MD: 8300.00, Inclination: 82.11, Azimuth: 340.97 },
    { MD: 8362.75, Inclination: 85.16, Azimuth: 341.55 },
    { MD: 8400.00, Inclination: 85.21, Azimuth: 342.53 },
    { MD: 8500.00, Inclination: 85.35, Azimuth: 345.18 },
    { MD: 8600.00, Inclination: 85.50, Azimuth: 347.83 },
    { MD: 8700.00, Inclination: 85.65, Azimuth: 350.48 },
    { MD: 8800.00, Inclination: 85.82, Azimuth: 353.12 },
    { MD: 8900.00, Inclination: 85.99, Azimuth: 355.77 },
    { MD: 9000.00, Inclination: 86.18, Azimuth: 358.41 },
    { MD: 9100.00, Inclination: 86.37, Azimuth: 1.05 },
    { MD: 9200.00, Inclination: 86.57, Azimuth: 3.69 },
    { MD: 9300.00, Inclination: 86.78, Azimuth: 6.33 },
    { MD: 9400.00, Inclination: 86.99, Azimuth: 8.97 },
    { MD: 9500.00, Inclination: 87.21, Azimuth: 11.61 },
    { MD: 9600.00, Inclination: 87.44, Azimuth: 14.25 },
    { MD: 9700.00, Inclination: 87.67, Azimuth: 16.88 },
    { MD: 9800.00, Inclination: 87.90, Azimuth: 19.52 },
    { MD: 9900.00, Inclination: 88.14, Azimuth: 22.15 },
    { MD: 10000.00, Inclination: 88.39, Azimuth: 24.79 },
    { MD: 10100.00, Inclination: 88.64, Azimuth: 27.42 },
    { MD: 10200.00, Inclination: 88.89, Azimuth: 30.05 },
    { MD: 10300.00, Inclination: 89.14, Azimuth: 32.68 },
    { MD: 10320.62, Inclination: 89.19, Azimuth: 33.23 },
    { MD: 10381.29, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10400.00, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10500.00, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10600.00, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10700.00, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10800.00, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10816.79, Inclination: 89.56, Azimuth: 33.71 },
    { MD: 10900.00, Inclination: 89.95, Azimuth: 32.97 },
    { MD: 10927.34, Inclination: 90.07, Azimuth: 32.73 },
    { MD: 11000.00, Inclination: 90.07, Azimuth: 32.73 },
    { MD: 11100.00, Inclination: 90.07, Azimuth: 32.73 },
    { MD: 11200.00, Inclination: 90.07, Azimuth: 32.73 },
    { MD: 11247.51, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11300.00, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11400.00, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11500.00, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11600.00, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11690.58, Inclination: 90.00, Azimuth: 33.20 },
    { MD: 11700.00, Inclination: 89.91, Azimuth: 33.22 },
    { MD: 11800.00, Inclination: 88.94, Azimuth: 33.50 },
    { MD: 11831.56, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 11900.00, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 12000.00, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 12100.00, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 12200.00, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 12224.70, Inclination: 88.64, Azimuth: 33.59 },
    { MD: 12300.00, Inclination: 88.58, Azimuth: 34.34 },
    { MD: 12326.16, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12400.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12500.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12600.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12700.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12800.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 12900.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13000.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13100.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13200.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13300.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13400.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13500.00, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13539.39, Inclination: 88.56, Azimuth: 34.60 },
    { MD: 13600.00, Inclination: 88.67, Azimuth: 35.19 },
    { MD: 13623.57, Inclination: 88.72, Azimuth: 35.42 },
    { MD: 13700.00, Inclination: 88.86, Azimuth: 36.18 },
    { MD: 13800.00, Inclination: 89.06, Azimuth: 37.16 },
    { MD: 13857.79, Inclination: 89.17, Azimuth: 37.72 },
    { MD: 13900.00, Inclination: 89.17, Azimuth: 37.72 },
    { MD: 14000.00, Inclination: 89.17, Azimuth: 37.72 },
    { MD: 14041.31, Inclination: 89.17, Azimuth: 37.72 },
    { MD: 14100.00, Inclination: 89.27, Azimuth: 38.30 },
    { MD: 14200.00, Inclination: 89.46, Azimuth: 39.28 },
    { MD: 14219.38, Inclination: 89.49, Azimuth: 39.47 },
    { MD: 14300.00, Inclination: 89.49, Azimuth: 39.47 },
    { MD: 14400.00, Inclination: 89.49, Azimuth: 39.47 },
    { MD: 14435.87, Inclination: 89.49, Azimuth: 39.47 },
    { MD: 14500.00, Inclination: 90.12, Azimuth: 39.35 },
    { MD: 14523.91, Inclination: 90.36, Azimuth: 39.30 },
    { MD: 14600.00, Inclination: 90.36, Azimuth: 39.30 },
    { MD: 14700.00, Inclination: 90.36, Azimuth: 39.30 },
    { MD: 14703.51, Inclination: 90.36, Azimuth: 39.30 }];


module.exports = surveyData;