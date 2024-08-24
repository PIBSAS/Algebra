function simplifyExpression(expression) {
    // Simplificación de Identidad A + 0 = A y A * 1 = A
    let simplifiedExpr = expression
        .replace(/\b(\w+)\s*\+\s*0\b/g, '$1') // A + 0 = A
        .replace(/\b0\s*\+\s*(\w+)\b/g, '$1') // 0 + A = A
        .replace(/\b(\w+)\s*\*\s*1\b/g, '$1') // A * 1 = A
        .replace(/\b1\s*\*\s*(\w+)\b/g, '$1'); // 1 * A = A

    return simplifiedExpr;
}

function calculate() {
    let expression = document.getElementById("expression").value.trim();
    const steps = [];
    
    // Reemplazar operadores por sus equivalentes en JavaScript
    let booleanExpr = expression
        .replace(/AND/g, '&&')
        .replace(/OR/g, '||')
        .replace(/NOT/g, '!');
    
    // Paso 1: Mostrar la expresión original
    steps.push(`Expresión original: ${expression}`);
    
    // Paso 2: Simplificar la expresión
    let simplifiedExpr = simplifyExpression(booleanExpr);
    steps.push(`Expresión simplificada: ${simplifiedExpr}`);
    
    // Paso 3: Evaluar la expresión simplificada
    try {
        let result = eval(simplifiedExpr);
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
