// Refrigerant PT Data (Example Values)
const ptCharts = {
  R410a: {
    "-40": 11.8,
    "-20": 31.1,
    "0": 57.7,
    "20": 93.3,
    "40": 139.1,
  },
  R32: {
    "-40": 14.7,
    "-20": 36.2,
    "0": 65.3,
    "20": 104.5,
    "40": 155.2,
  },
  R454b: {
    "-40": 10.5,
    "-20": 29.3,
    "0": 55.4,
    "20": 91.6,
    "40": 138.3,
  },
};

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

  // Example offsets for refrigerants
  const offset = refrigerant === "R410a" ? 1.5 : refrigerant === "R32" ? 1.8 : 2.0;
  const superheat = vaporTemp - vaporPressure * offset;
  const subcooling = liquidPressure * offset - liquidTemp;

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
  for (const temp in chartData) {
    output += `Temperature: ${temp}°F, Pressure: ${chartData[temp]} psi\n`;
  }
  document.getElementById("pt-chart").textContent = output;
}
