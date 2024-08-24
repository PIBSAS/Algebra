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
    
    // Paso 2: Mostrar la expresión convertida a formato JavaScript
    steps.push(`Convertir a expresión evaluable: ${booleanExpr}`);
    
    // Paso 3: Evaluar la expresión
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
