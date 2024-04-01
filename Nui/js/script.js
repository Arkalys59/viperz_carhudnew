window.addEventListener('message', function(event) {
    let showUI = event.data.showUI;
    document.getElementById('carhud-container').style.display = showUI ? 'flex' : 'none';

    if (showUI) {
        let speed = event.data.speed.toString().padStart(3, '0');
        document.getElementById('speed').innerText = speed;
        document.getElementById('gear').innerText = event.data.gear;

        let fuel = event.data.fuel;
        let fuelClass = getFuelClass(fuel);
        document.getElementById('fuel').innerHTML = `<span class="percentage">${fuel}</span> <i class="fas fa-gas-pump ${fuelClass}"></i>`;

        let health = event.data.health;
        let healthClass = getHealthClass(health);
        document.getElementById('health').innerHTML = `<span class="percentage">${health}</span> <i class="fas fa-cogs ${healthClass}"></i>`;

        let gear = event.data.gear;
        let speedInGear = speed % (gear * 20); 
        let progressSpeed = document.getElementById('progress-speed');
        let progressColor = getProgressColor(speedInGear);
        progressSpeed.style.setProperty('--progress-width', (speedInGear / (gear * 20)) * 100 + '%');
        progressSpeed.style.setProperty('--progress-color', progressColor); 
    }
});

function getFuelClass(fuel) {
    if (fuel > 50) {
        return 'fuel-green';
    } else if (fuel > 20) {
        return 'fuel-orange';
    } else {
        return 'fuel-red';
    }
}

function getHealthClass(health) {
    if (health > 50) {
        return 'health-green';
    } else if (health > 20) {
        return 'health-orange';
    } else {
        return 'health-red';
    }
}

function getProgressColor(speedInGear) {
    if (speedInGear > 15) {
        return 'red';
    } else if (speedInGear > 10) {
        return 'orange';
    } else {
        return 'green';
    }
}