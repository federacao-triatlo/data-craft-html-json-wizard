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
 * Creates the HTML code to display the live results tabs.
 *
 * @param {String} tableLiveResults the given live results tabular data
 *
 * @returns the HTML code to display the live results tabs
 */
function createLiveResultsHtml(tableLiveResults) {
  const liveRaces = getLiveRaces(tableLiveResults);

  let html = '<h2>Resultados Provisórios</h2>' + '\n';
  html +=
    '<p>Os resultados abaixo apresentados são provisórios e serão actualizados à medida que forem sendo ' +
    'processados na linha de meta. Para obter os resultados mais recentes, é necessário forçar a actualização ' +
    'desta página.</p>';

  html += '<div class="tabs is-toggle is-small is-fullwidth">' + '\n';
  html += '\t' + '<ul class="tabs-menu" style="margin-left: 0;">' + '\n';
  liveRaces.forEach((liveRace, index) => {
    const tabNumber = index + 1;
    if (index === 0) {
      html +=
        '\t\t' +
        '<li data-target="table' +
        tabNumber.toString().padStart(3, '0') +
        '" class="is-active"><a>' +
        liveRace.label +
        '</a></li>' +
        '\n';
    } else {
      html +=
        '\t\t' +
        '<li data-target="table' +
        tabNumber.toString().padStart(3, '0') +
        '"><a>' +
        liveRace.label +
        '</a></li>' +
        '\n';
    }
  });
  html += '\t' + '</ul>' + '\n';
  html += '</div>' + '\n';

  html += '<div>' + '\n';
  liveRaces.forEach((liveRace, index) => {
    const tabNumber = index + 1;
    html += '\t' + '<section id="table' + tabNumber.toString().padStart(3, '0') + '" class="tab-content">' + '\n';
    html += '\t\t' + '<h3>' + liveRace.title + '</h3>' + '\n';
    html +=
      '\t\t' + '<live-results range-name="table' + tabNumber.toString().padStart(3, '0') + '"></live-results>' + '\n';
    html += '\t' + '</section>' + '\n';
  });
  html += '</div>' + '\n';

  return html.replace(/\t/gi, '\x20\x20');
}
