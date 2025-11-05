const os = require('os');

// Función para obtener todas las IPs de red
function getNetworkIPs() {
    const interfaces = os.networkInterfaces();
    const ips = [];
    
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                ips.push({
                    name: name,
                    ip: interface.address
                });
            }
        }
    }
    return ips;
}

// Mostrar información de red
console.log('🌐 INFORMACIÓN DE RED PARA EL CHAT DISTRIBUIDO');
console.log('='.repeat(50));

const networkIPs = getNetworkIPs();

if (networkIPs.length > 0) {
    console.log('\n📡 URLs para compartir con otros usuarios en la red:');
    networkIPs.forEach((network, index) => {
        console.log(`\n${index + 1}. ${network.name}:`);
        console.log(`   Frontend: http://${network.ip}:3000`);
        console.log(`   Backend:  ws://${network.ip}:8080`);
    });
    
    console.log('\n📋 INSTRUCCIONES:');
    console.log('1. Ejecutar el backend: npm run start:backend');
    console.log('2. Ejecutar el frontend: npm run start:frontend');
    console.log('3. Compartir la URL del frontend con otros usuarios');
    console.log('4. Todos pueden acceder desde cualquier dispositivo en la red');
    
} else {
    console.log('\n⚠️  No se encontraron interfaces de red disponibles.');
    console.log('   Solo funcionará en localhost.');
}

console.log('\n🔒 CONFIGURACIÓN DE FIREWALL:');
console.log('   - Asegurar que los puertos 3000 y 8080 estén abiertos');
console.log('   - En Windows: Configuración > Red > Firewall de Windows Defender');
console.log('   - Permitir aplicaciones a través del firewall');

console.log('\n✅ El sistema está configurado para red local');
console.log('='.repeat(50));