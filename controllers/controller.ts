let car: Car;

function submitCar() {
    let errores: string = ''; 
    
    let plateInput = <HTMLInputElement>document.getElementById("plateInput");
    let brandInput = <HTMLInputElement>document.getElementById("brandInput");
    let colorInput = <HTMLInputElement>document.getElementById("colorInput");

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
    const expregMatricula = /^[A-Z]{1,4}$/;
    const expregMarca = /^[A-Z]$/;
    const expregColor = /^[A-Z]$/;

    if (!expregMatricula.test(plateInput.value.toUpperCase())) errores += "La matrícula NO es correcta\n";
    if (!expregMarca.test(brandInput.value.toUpperCase())) errores += "La marca NO es correcta\n";
    if (!expregColor.test(colorInput.value.toUpperCase())) errores += "El color NO es correcto\n";

    if (errores.length) {
        alert(errores);
    } else {
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        showVehicle();
        showWheelForm();
    }

}

function showVehicle() {
    let carTitle = <HTMLInputElement>document.getElementById("carTitle");
    let plateOutput = <HTMLInputElement>document.getElementById("plateOutput");
    let brandOutput = <HTMLInputElement>document.getElementById("brandOutput");
    let colorOutput = <HTMLInputElement>document.getElementById("colorOutput");

    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;

}

function submitWheelForm() {
    let rueda: any = [0, 0, 0, 0];

    //EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
    //EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas

    for (let i = 1; i <= 4; i++) {
        let brandWheel = <HTMLInputElement>document.getElementById("brandWheel" + i);
        let diameterWheel = <HTMLInputElement>document.getElementById("diameterWheel" + i);

        rueda[i] = {
            marca: brandWheel.value,
            diametro: diameterWheel.value,
            posicion: i
        };

    }
    if (validaRueda(rueda)) {
        for (let i = 1; i <= 4; i++) {
            let wheel_generica = new Wheel(Number(rueda[i].diametro), rueda[i].marca);
            car.addWheel(wheel_generica);
        }
    }
    console.log(car)
    showWheels();

}

function validaRueda(rueda: any) {
    let valido: boolean = true;
    let diametro: number;

    for (let i = 1; i <= 4; i++) {
        diametro = parseInt(rueda[i].diametro);
        if (diametro < 1 || diametro > 2) {
            valido = false;
            alert(`Diametro${i} NO valido`);
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

    let wheelTitle = <HTMLInputElement>document.getElementById("wheelTitle");
    wheelTitle.innerText = "Wheels:";
    let wheelOutput = [];

    for (let i = 1; i <= 4; i++) {
        wheelOutput[i] = <HTMLInputElement>document.getElementById("wheelOutput" + i);
        wheelOutput[i].innerText = "Wheel " + i + ":  " + "Brand: " + car.wheels[i - 1].brand + "  Diameter: " + car.wheels[i - 1].diameter;
    }
}


function showWheelForm() {
    let carForm = <HTMLInputElement>document.getElementById("create-car-form");
    let carWheel = <HTMLInputElement>document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";

}