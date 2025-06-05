function generateRandomString() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(7);
    return `GoodToSave-${timestamp}-${random}`;
}

function generateQR() {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = ''; // Limpiar contenedor

    new QRCode(qrContainer, {
        text: generateRandomString(),
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'GoodToSave-QR.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Generar QR al cargar la página
window.onload = generateQR; 