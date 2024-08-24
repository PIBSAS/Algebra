function simplifyExpression(expression) {
    // Postulado de Identidad
    let simplifiedExpr = expression
        .replace(/\b(\w+)\s*\+\s*0\b/g, '$1') // A + 0 = A
        .replace(/\b0\s*\+\s*(\w+)\b/g, '$1') // 0 + A = A
        .replace(/\b(\w+)\s*\*\s*1\b/g, '$1') // A * 1 = A
        .replace(/\b1\s*\*\s*(\w+)\b/g, '$1'); // 1 * A = A

    // Postulado de Dominación
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\*\s*0\b/g, '0') // A * 0 = 0
        .replace(/\b0\s*\*\s*(\w+)\b/g, '0') // 0 * A = 0
        .replace(/\b(\w+)\s*\+\s*1\b/g, '1') // A + 1 = 1
        .replace(/\b1\s*\+\s*(\w+)\b/g, '1'); // 1 + A = 1

    // Postulado de Idempotencia
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\+\s*\1\b/g, '$1') // A + A = A
        .replace(/\b(\w+)\s*\*\s*\1\b/g, '$1'); // A * A = A

    // Postulado de Complemento
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\+\s*!\1\b/g, '1') // A + !A = 1
        .replace(/\b!\w+\s*\+\s*\w+\b/g, '1') // !A + A = 1
        .replace(/\b(\w+)\s*\*\s*!\1\b/g, '0') // A * !A = 0
        .replace(/\b!\w+\s*\*\s*\w+\b/g, '0'); // !A * A = 0

    // Postulado de Involución
    simplifiedExpr = simplifiedExpr
        .replace(/!\(!(\w+)\)/g, '$1') // !!A = A
        .replace(/!\(!\(!(\w+)\)\)/g, '!$1'); // !!!A = !A

    // Propiedad Conmutativa
    // A + B = B + A y A * B = B * A no se necesitan cambios específicos en la evaluación, 
    // pero se debe permitir la reordenación si se quiere.
    // Aquí, simplificamos ejemplos sencillos:
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\+\s*(\w+)\b/g, '$2 + $1') // A + B = B + A
        .replace(/\b(\w+)\s*\*\s*(\w+)\b/g, '$2 * $1'); // A * B = B * A

    // Propiedad Asociativa
    // (A + B) + C = A + (B + C) y (A * B) * C = A * (B * C)
    simplifiedExpr = simplifiedExpr
        .replace(/\((\w+)\s*\+\s*(\w+)\)\s*\+\s*(\w+)/g, '$1 + ($2 + $3)') // (A + B) + C = A + (B + C)
        .replace(/\((\w+)\s*\*\s*(\w+)\)\s*\*\s*(\w+)/g, '$1 * ($2 * $3)'); // (A * B) * C = A * (B * C)

    // Propiedad Distributiva
    // A * (B + C) = (A * B) + (A * C)
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\*\s*\((\w+)\s*\+\s*(\w+)\)/g, '($1 * $2) + ($1 * $3)'); // A * (B + C) = (A * B) + (A * C)

    // Teoremas de De Morgan
    // !(A + B) = !A * !B y !(A * B) = !A + !B
    simplifiedExpr = simplifiedExpr
        .replace(/!\((\w+)\s*\+\s*(\w+)\)/g, '!$1 * !$2') // !(A + B) = !A * !B
        .replace(/!\((\w+)\s*\*\s*(\w+)\)/g, '!$1 + !$2'); // !(A * B) = !A + !B

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
    
    // Paso 2: Simplificar la expresión usando los postulados del Álgebra de Boole
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
