const refrigerantData = {
    R410a: { offset: 1.5 },
    R32: { offset: 1.8 },
    R54b: { offset: 2.0 },
};

function calculateHVAC() {
    const refrigerant = document.getElementById('refrigerant').value;
    const temperature = parseFloat(document.getElementById('temperature').value);
    const pressure = parseFloat(document.getElementById('pressure').value);

    if (!temperature || !pressure) {
        document.getElementById('hvac-result').textContent = "Please enter valid inputs.";
        return;
    }

    const offset = refrigerantData[refrigerant].offset;
    const superheat = temperature - pressure * offset;
    const subcooling = pressure * offset - temperature;

    document.getElementById('hvac-result').textContent = 
        `Superheat: ${superheat.toFixed(2)}°F, Subcooling: ${subcooling.toFixed(2)}°F`;
}

function calculateCapacitor() {
    const amps = parseFloat(document.getElementById('amps').value);
    const voltage = parseFloat(document.getElementById('voltage').value);

    if (!amps || !voltage) {
        document.getElementById('capacitor-result').textContent = "Please enter valid inputs.";
        return;
    }

    const microfarads = (amps * 2652) / voltage;
    document.getElementById('capacitor-result').textContent = 
        `Capacitor Value: ${microfarads.toFixed(2)} µF`;
}
