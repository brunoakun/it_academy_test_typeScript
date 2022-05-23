"use strict";
var car;
function submitCar() {
    var errores = 0;
    var plateInput = document.getElementById("plateInput");
    var brandInput = document.getElementById("brandInput");
    var colorInput = document.getElementById("colorInput");
    //EX1. Validar los campos de matricula, marca y color, antes de hacer el new Car
    /*
            NOTAS Expresiones regulares:
    ^: el emparejamiento se debe realizar desde el principio de la cadena.
    [A-Z]: cualquier carácter entre la A mayúscula y la Z mayúscula.
    {1,2}: uno o dos caracteres.
    \s: un espacio en blanco.
    \d: un dígito.
    {4}: cuatro dígitos.
    \s: un espacio en blanco.
    ([B-D]|[F-H]|[J-N]|[P-T]|[V-Z]): cualquier carácter entre la B mayúscula y la Z mayúscula, excepto las vocales.
    {3}: tres caracteres.
    $: el emparejamiento se debe realizar hasta el final de la cadena.
    */
    var expregMatricula = /^[A-Z]{1,4}$/;
    var expregMarca = /^[A-Z]$/;
    var expregColor = /^[A-Z]$/;
    var valido = true;
    if (!expregMatricula.test(plateInput.value.toUpperCase())) {
        alert("La matrícula NO es correcta");
        valido = false;
    }
    if (!expregMarca.test(brandInput.value.toUpperCase())) {
        alert("La marca NO es correcta");
        valido = false;
    }
    if (!expregColor.test(colorInput.value.toUpperCase())) {
        alert("El color NO es correcto");
        valido = false;
    }
    if (valido) {
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        showVehicle();
        showWheelForm();
    }
}
function showVehicle() {
    var carTitle = document.getElementById("carTitle");
    var plateOutput = document.getElementById("plateOutput");
    var brandOutput = document.getElementById("brandOutput");
    var colorOutput = document.getElementById("colorOutput");
    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;
}
function submitWheelForm() {
    var rueda = [0, 0, 0, 0];
    //EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
    //EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas
    for (var i = 1; i <= 4; i++) {
        var brandWheel = document.getElementById("brandWheel" + i);
        var diameterWheel = document.getElementById("diameterWheel" + i);
        rueda[i] = {
            marca: brandWheel.value,
            diametro: diameterWheel.value,
            posicion: i
        };
    }
    if (validaRueda(rueda)) {
        for (var i = 1; i <= 4; i++) {
            var wheel_generica = new Wheel(Number(rueda[i].diametro), rueda[i].marca);
            car.addWheel(wheel_generica);
        }
    }
    console.log(car);
    showWheels();
}
function validaRueda(rueda) {
    var valido = true;
    var diametro;
    for (var i = 1; i <= 4; i++) {
        diametro = parseInt(rueda[i].diametro);
        if (diametro < 1 || diametro > 2) {
            valido = false;
            alert("Diametro".concat(i, " NO valido"));
        }
    }
    return valido;
}
function showWheels() {
    //EX4. Optimizar la función showWheels
    /*
    let wheelTitle = <HTMLInputElement>document.getElementById("wheelTitle");
    let wheelOutput1 = <HTMLInputElement>document.getElementById("wheelOutput1");
    let wheelOutput2 = <HTMLInputElement>document.getElementById("wheelOutput2");
    let wheelOutput3 = <HTMLInputElement>document.getElementById("wheelOutput3");
    let wheelOutput4 = <HTMLInputElement>document.getElementById("wheelOutput4");

    wheelTitle.innerText = "Wheels:";
    wheelOutput1.innerText = "Wheel 1:  " + "Brand: " + car.wheels[0].brand + "  Diameter: " + car.wheels[0].diameter;
    wheelOutput2.innerText = "Wheel 2:  " + "Brand: " + car.wheels[1].brand + "  Diameter: " + car.wheels[1].diameter;
    wheelOutput3.innerText = "Wheel 3:  " + "Brand: " + car.wheels[2].brand + "  Diameter: " + car.wheels[2].diameter;
    wheelOutput4.innerText = "Wheel 4:  " + "Brand: " + car.wheels[3].brand + "  Diameter: " + car.wheels[3].diameter;
    */
    var wheelTitle = document.getElementById("wheelTitle");
    wheelTitle.innerText = "Wheels:";
    var wheelOutput = [];
    for (var i = 1; i <= 4; i++) {
        wheelOutput[i] = document.getElementById("wheelOutput" + i);
        wheelOutput[i].innerText = "Wheel " + i + ":  " + "Brand: " + car.wheels[i - 1].brand + "  Diameter: " + car.wheels[i - 1].diameter;
    }
}
function showWheelForm() {
    var carForm = document.getElementById("create-car-form");
    var carWheel = document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";
}
