// Refrigerant PT Data (Sample Values)
const ptCharts = {
  R410a: {
    100: 32,  // Example: Pressure (psi): Saturation Temp (°F)
    150: 45,
    200: 55,
    250: 65,
    300: 75,
  },
  R32: {
    100: 30,
    150: 44,
    200: 56,
    250: 68,
    300: 80,
  },
  R454b: {
    100: 28,
    150: 42,
    200: 54,
    250: 66,
    300: 78,
  },
};

// Function to calculate saturation temperature from PT chart
function getSaturationTemperature(refrigerant, pressure) {
  const chart = ptCharts[refrigerant];
  const pressures = Object.keys(chart).map(Number);
  
  // Find the closest matching pressures
  const lowerPressure = Math.max(...pressures.filter((p) => p <= pressure));
  const upperPressure = Math.min(...pressures.filter((p) => p >= pressure));
  
  if (lowerPressure === upperPressure) {
    return chart[lowerPressure];
  }
  
  // Linear interpolation for pressures not directly in the chart
  const lowerTemp = chart[lowerPressure];
  const upperTemp = chart[upperPressure];
  const interpolatedTemp =
    lowerTemp + ((pressure - lowerPressure) * (upperTemp - lowerTemp)) / (upperPressure - lowerPressure);
  return interpolatedTemp;
}

// HVAC Calculator
function calculateHVAC() {
  const refrigerant = document.getElementById("refrigerant").value;
  const vaporPressure = parseFloat(document.getElementById("vapor-pressure").value);
  const vaporTemp = parseFloat(document.getElementById("vapor-temperature").value);
  const liquidPressure = parseFloat(document.getElementById("liquid-pressure").value);
  const liquidTemp = parseFloat(document.getElementById("liquid-temperature").value);

  if (!vaporPressure || !vaporTemp || !liquidPressure || !liquidTemp) {
    document.getElementById("hvac-result").textContent = "Please enter all values.";
    return;
  }

  // Get saturation temperatures
  const vaporSaturationTemp = getSaturationTemperature(refrigerant, vaporPressure);
  const liquidSaturationTemp = getSaturationTemperature(refrigerant, liquidPressure);

  // Calculate superheat and subcooling
  const superheat = vaporTemp - vaporSaturationTemp;
  const subcooling = liquidSaturationTemp - liquidTemp;

  document.getElementById("hvac-result").textContent = 
    `Superheat: ${superheat.toFixed(2)}°F, Subcooling: ${subcooling.toFixed(2)}°F`;
}

// Capacitor Value Calculator
function calculateCapacitor() {
  const amps = parseFloat(document.getElementById("amps").value);
  const voltage = parseFloat(document.getElementById("voltage").value);

  if (!amps || !voltage) {
    document.getElementById("capacitor-result").textContent = "Please enter valid inputs.";
    return;
  }

  const microfarads = (amps * 2652) / voltage;
  document.getElementById("capacitor-result").textContent = 
    `Capacitor Value: ${microfarads.toFixed(2)} µF`;
}

// PT Chart Display
function showPTChart() {
  const refrigerant = document.getElementById("pt-refrigerant").value;
  const chartData = ptCharts[refrigerant];
  let output = `PT Chart for ${refrigerant}:\n`;
  for (const [pressure, temp] of Object.entries(chartData)) {
    output += `Pressure: ${pressure} psi, Temperature: ${temp}°F\n`;
  }
  document.getElementById("pt-chart").textContent = output;
}
