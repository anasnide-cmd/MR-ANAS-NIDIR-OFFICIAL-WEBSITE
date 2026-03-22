const COLS = 26;
const getCellId = (r, c) => `${String.fromCharCode(65 + c)}${r + 1}`;

const evaluateFormula = (val, currentData) => {
    if (typeof val !== 'string' || !val.startsWith('=')) return val;
    
    try {
      let formula = val.substring(1).toUpperCase().trim();
      
      const getVal = (ref) => {
        const v = currentData[ref];
        if (!v) return 0;
        if (typeof v === 'string' && v.startsWith('=')) return evaluateFormula(v, currentData);
        return isNaN(v) ? 0 : Number(v);
      };

      const resolveArg = (arg) => {
        arg = arg.trim();
        if (arg.includes(':')) {
          const [start, end] = arg.split(':');
          const startCol = start.match(/[A-Z]+/)[0].charCodeAt(0) - 65;
          const startRow = parseInt(start.match(/\d+/)[0]) - 1;
          const endCol = end.match(/[A-Z]+/)[0].charCodeAt(0) - 65;
          const endRow = parseInt(end.match(/\d+/)[0]) - 1;
          
          const values = [];
          for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
            for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
              values.push(getVal(getCellId(r, c)));
            }
          }
          return values;
        } else if (arg.match(/^[A-Z]\d+$/)) {
          return [getVal(arg)];
        } else {
          const num = Number(arg);
          return isNaN(num) ? [0] : [num];
        }
      };

      const functions = {
        SUM: (args) => args.flat().reduce((a, b) => a + b, 0),
        AVG: (args) => {
            const vals = args.flat();
            return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
        },
        MIN: (args) => Math.min(...args.flat()),
        MAX: (args) => Math.max(...args.flat()),
        COUNT: (args) => args.flat().filter(v => v !== 0).length,
      };

      for (const [fn, handler] of Object.entries(functions)) {
        const regex = new RegExp(`${fn}\\(([^)]+)\\)`, 'g');
        formula = formula.replace(regex, (_, argsStr) => {
          const args = argsStr.split(',').map(resolveArg);
          return handler(args);
        });
      }

      let expression = formula;
      const cellRefs = formula.match(/[A-Z]\d+/g);
      if (cellRefs) {
        const sortedRefs = [...new Set(cellRefs)].sort((a, b) => b.length - a.length);
        sortedRefs.forEach(ref => {
          const numericVal = getVal(ref);
          expression = expression.replace(new RegExp(ref, 'g'), numericVal);
        });
      }

      if (/[^0-9+\-*/().\s]/.test(expression)) {
          return "#ERROR!";
      }

      const result = eval(expression);
      return typeof result === 'number' ? Math.round(result * 100) / 100 : result;
    } catch (e) {
      return "#ERROR!";
    }
};

const testData = {
    'A1': 10,
    'A2': 20,
    'A3': 30,
    'B1': 5,
    'B2': 15,
};

console.log("Testing SUM(A1, B1):", evaluateFormula("=SUM(A1, B1)", testData)); // 15
console.log("Testing SUM(A1:A2, B1:B2):", evaluateFormula("=SUM(A1:A2, B1:B2)", testData)); // 30 + 20 = 50
console.log("Testing Error Case (Misspelled):", evaluateFormula("=SM(A1:A5)", testData)); // #ERROR!
console.log("Testing Error Case (Invalid text):", evaluateFormula("=A1 + S", testData)); // #ERROR!
console.log("Testing Valid Expression:", evaluateFormula("=A1 + 10", testData)); // 20
console.log("Testing AVG(A1, 40):", evaluateFormula("=AVG(A1, 40)", testData)); // 25
