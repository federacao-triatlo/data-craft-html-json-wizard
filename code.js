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
 * Adds a custom menu to the Google Sheets file
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Gerar Ficheiros')
    .addItem('JSON : Lista de Eventos do Ano', 'saveEventsListJsonFile')
    .addItem('JSON : Evento & Provas', 'saveEventAndRacesJsonFiles')
    .addItem('JSON : Evento', 'saveEventJsonFile')
    .addItem('JSON : Prova', 'saveRaceJsonFile')
    .addItem('HTML : Lista de recursos EventON', 'saveEventOnResourcesListHtmlFile')
    .addItem('HTML : Live Results', 'saveLiveResultsHtmlFile')
    .addItem('HTML : Resultados de Evento', 'saveEventResultsHtmlFile')
    .addToUi();
}

/**
 * The event handler triggered when editing the spreadsheet.
 *
 * Checks if the Event year changes and when it does, it clears the values of the Event reference,
 * the Race reference and the Live Results area. It also checks if the Event reference changes
 * and if does, it clears the values of the Race reference and the Live Results area.
 *
 * @param {Event} event The onEdit event.
 *
 * @see https://developers.google.com/apps-script/guides/triggers#onedite
 */
function onEdit(event) {
  const range = event.range;
  const spreadSheet = event.source;

  if (spreadSheet.getRangeByName(RANGE_VALUE_EVENT_YEAR).getA1Notation() === range.getA1Notation()) {
    spreadSheet.getRangeByName(RANGE_VALUE_EVENT_REFERENCE).clearContent();
    spreadSheet.getRangeByName(RANGE_VALUE_RACE_REFERENCE).clearContent();
    spreadSheet.getRangeByName(RANGE_AREA_LIVE_RESULTS).clearContent();
  }

  if (spreadSheet.getRangeByName(RANGE_VALUE_EVENT_REFERENCE).getA1Notation() === range.getA1Notation()) {
    spreadSheet.getRangeByName(RANGE_VALUE_RACE_REFERENCE).clearContent();
    spreadSheet.getRangeByName(RANGE_AREA_LIVE_RESULTS).clearContent();
  }
}
