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
        .replace(/\b(\w+)\s*\*\s*!\1\b/g, '0'); // A * !A = 0

    // Postulado de Involución
    simplifiedExpr = simplifiedExpr
        .replace(/!\(!(\w+)\)/g, '$1') // !!A = A
        .replace(/!\(!\(!(\w+)\)\)/g, '!$1'); // !!!A = !A

    // Propiedad Conmutativa (se mantiene la estructura para que funcione con variables)
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\+\s*(\w+)\b/g, '$1 + $2') // A + B = A + B (ejemplo simple, sin reordenar)
        .replace(/\b(\w+)\s*\*\s*(\w+)\b/g, '$1 * $2'); // A * B = A * B (ejemplo simple, sin reordenar)

    // Propiedad Asociativa
    simplifiedExpr = simplifiedExpr
        .replace(/\((\w+)\s*\+\s*(\w+)\)\s*\+\s*(\w+)/g, '$1 + ($2 + $3)') // (A + B) + C = A + (B + C)
        .replace(/\((\w+)\s*\*\s*(\w+)\)\s*\*\s*(\w+)/g, '$1 * ($2 * $3)'); // (A * B) * C = A * (B * C)

    // Propiedad Distributiva
    simplifiedExpr = simplifiedExpr
        .replace(/\b(\w+)\s*\*\s*\((\w+)\s*\+\s*(\w+)\)/g, '($1 * $2) + ($1 * $3)'); // A * (B + C) = (A * B) + (A * C)

    // Teoremas de De Morgan
    simplifiedExpr = simplifiedExpr
        .replace(/!\((\w+)\s*\+\s*(\w+)\)/g, '!$1 * !$2') // !(A + B) = !A * !B
        .replace(/!\((\w+)\s*\*\s*(\w+)\)/g, '!$1 + !$2'); // !(A * B) = !A + !B

    return simplifiedExpr;
}

function calculate() {
    const expression = document.getElementById("expression").value.trim();
    const steps = [];
    
    // Paso 1: Mostrar la expresión original
    steps.push(`Expresión original: ${expression}`);
    
    // Reemplazar operadores por sus equivalentes en JavaScript
    let booleanExpr = expression
        .replace(/\bAND\b/g, '&&')
        .replace(/\band\b/g, '&&')
        .replace(/\bOR\b/g, '||')
        .replace(/\bor\b/g, '||')
        .replace(/\bNOT\b/g, '!')
        .replace(/\bnot\b/g, '!');
    
    // Paso 2: Simplificar la expresión usando los postulados del Álgebra de Boole
    let simplifiedExpr = simplifyExpression(booleanExpr);
    steps.push(`Expresión simplificada: ${simplifiedExpr}`);
    
    // Paso 3: Evaluar la expresión simplificada
    try {
        // Definir las variables encontradas
        const variables = [...new Set(simplifiedExpr.match(/\b\w+\b/g))];

        // Evaluar la expresión en el contexto de las variables definidas
        let result = new Function(...variables, `return (${simplifiedExpr});`)(...variables.map(v => undefined)); // Sin valores asignados
        
        // Manejar el resultado
        if (result === undefined) {
            // No se puede evaluar si hay variables sin valor
            result = variables.join(", "); // Mostrar variables no definidas
        } else if (result === 0 || result === 1) {
            result = result.toString(); // Convertir 0 o 1 a cadena
        } else {
            result = result ? 'Verdadero' : 'Falso'; // Para booleanos
        }

        document.getElementById("booleanResult").textContent = result;
        steps.push(`Evaluación: ${result}`);
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
