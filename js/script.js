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
        .replace(/\bnot\b/g, '!')
        .replace(/\s+/g, ' '); // Asegúrate de limpiar espacios extra

    
    // Paso 2: Simplificar la expresión usando los postulados del Álgebra de Boole
    let simplifiedExpr = simplifyExpression(booleanExpr);
    steps.push(`Expresión simplificada: ${simplifiedExpr}`);
    
    // Paso 3: Evaluar la expresión simplificada para A=0 y A=1
    try {
        const variables = [...new Set(simplifiedExpr.match(/\b\w+\b/g))];
        let results = {};

        // Evaluar para cada combinación de valores posibles
        const combinations = 2 ** variables.length;
        for (let i = 0; i < combinations; i++) {
            const values = [];
            for (let j = 0; j < variables.length; j++) {
                values[j] = (i >> j) & 1; // 0 o 1
            }
            let result = new Function(...variables, `return (${simplifiedExpr.replace(/\b0\b/g, 'false').replace(/\b1\b/g, 'true')});`)(...values);
            results[values.join(',')] = result ? '1' : '0'; // Almacenar el resultado
        }

        // Mostrar resultados
        Object.entries(results).forEach(([key, value]) => {
            steps.push(`Para A=${key.split(',').join(', A=')}: Resultado=${value}`);
        });
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
