/*
 * MIT License
 *
 * Copyright(c) 2023 Ricardo do Canto
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files(the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Returns the translation of the given value
 *
 * @param originalValue the value to be translated
 */
function getDisplayValue(originalValue) {
  const ptLabels = {
    athleteID: 'ID do Atleta',
    ageGroup: 'Escalão',
    bib: 'Dorsal',
    bike: 'Ciclismo',
    country: 'País',
    date: 'Data',
    error: 'Erro',
    firstRun: 'Corrida',
    gap: 'Delta',
    gender: 'Género',
    licence: 'Licença',
    location: 'Local',
    name: 'Nome',
    overall: 'Absolutos',
    paraClass: 'Classe',
    points: 'Pontos',
    rank: '#',
    results: 'Resultados',
    resultsPlaceholder: 'Escolher uma prova',
    run: 'Corrida',
    secondRun: 'Corrida',
    swim: 'Natação',
    team: 'Clube',
    t1: 'T1',
    t2: 'T2',
    time: 'Hora',
    total: 'Total',
  };

  return ptLabels[originalValue];
}
