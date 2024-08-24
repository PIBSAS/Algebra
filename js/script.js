function calculate() {
    const expression = document.getElementById("expression").value.trim();
    const steps = [];
    
    // Reemplazar operadores por sus equivalentes en JavaScript
    let booleanExpr = expression
        .replace(/AND/g, '&&')
        .replace(/OR/g, '||')
        .replace(/NOT/g, '!');
    
    // Paso 1: Mostrar la expresión original
    steps.push(`Expresión original: ${expression}`);
    
    // Paso 2: Convertir la expresión a formato JavaScript
    steps.push(`Convertir a expresión evaluable: ${booleanExpr}`);
    
    // Paso 3: Definir los valores de las variables
    const variables = {
        A: true,  // Puedes cambiar estos valores a true o false según lo que necesites
        B: false,
        C: true,
        D: false  // Se agrega la variable D
    };

    // Reemplazar variables en la expresión con sus valores
    for (let [key, value] of Object.entries(variables)) {
        let regExp = new RegExp(`\\b${key}\\b`, 'g'); // Solo reemplazar variables completas
        booleanExpr = booleanExpr.replace(regExp, value);
        steps.push(`Reemplazar ${key} con ${value ? 'Verdadero' : 'Falso'}`);
    }
    
    // Paso 4: Evaluar la expresión
    try {
        let result = eval(booleanExpr);
        document.getElementById("booleanResult").textContent = result ? 'Verdadero' : 'Falso';
        steps.push(`Evaluación: ${result ? 'Verdadero' : 'Falso'}`);
    } catch (error) {
        document.getElementById("booleanResult").textContent = 'Error en la expresión';
        steps.push(`Error al evaluar la expresión`);
    }
    
    // Mostrar los pasos
    const stepsList = document.getElementById("steps");
    stepsList.innerHTML = '';
    steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        stepsList.appendChild(li);
    });
}
