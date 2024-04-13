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
 * @fileOverview
 * This script contains functions that retrieve the values stored in named ranges
 * defined in the referenced Google Sheet.
 */

/**
 * Gets the Year selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the year selected on the "Dashboard" sheet of the current Spreadsheet
 */
function getSelectedEventYear() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_EVENT_YEAR).getDisplayValues()[0][0];
}

/**
 * Gets the Google Sheet ID of the Year's Database file selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the Google Sheet ID of the selected Year's Database file
 */
function getSelectedYearDatabaseGoogleSheetId() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_DATABASE_SHEET_ID).getDisplayValues()[0][0];
}

/**
 * Gets the Event's ID selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the Event's ID selected on the "Dashboard" sheet
 */
function getSelectedEventId() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_EVENT_ID).getDisplayValues()[0][0];
}

/**
 * Gets the Event's reference selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the Event's reference selected on the "Dashboard" sheet
 */
function getSelectedEventReference() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_EVENT_REFERENCE).getDisplayValues()[0][0];
}

/**
 * Gets the Race's reference selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the Race's reference selected on the "Dashboard" sheet
 */
function getSelectedRaceReference() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_RACE_REFERENCE).getDisplayValues()[0][0];
}

/**
 * Gets the Google Sheet ID of the Event's results file selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the the Google Sheet ID of the Event's results file selected on the "Dashboard" sheet
 */
function getSelectedResultsGoogleSheetId() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_RESULTS_SHEET_ID).getDisplayValues()[0][0];
}

/**
 * Gets the Range Name of the Races's results selected on the "Dashboard" sheet of the current Spreadsheet.
 *
 * @returns the Range Name of the Races's results selected on the "Dashboard" sheet
 */
function getSelectedRaceResultsRangeName() {
  return SpreadsheetApp.getActive().getRangeByName(RANGE_VALUE_RESULTS_RANGE_NAME).getDisplayValues()[0][0];
}

/**
 * Gets the tabular data stored on the "TableLiveResults" named range of the current Spreadsheet.
 *
 * @returns the tabular data stored on the "TableLiveResults" named range of the current Spreadsheet
 */
function getLiveRacesTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName(RANGE_TABLE_LIVE_RESULTS)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}

/**
 * Gets the tabular data stored on the "TableEventOn" named range of the current Spreadsheet.
 *
 * @returns the tabular data stored on the "TableEventOn" named range of the current Spreadsheet
 */
function getEventOnTable() {
  return SpreadsheetApp.getActive()
    .getRangeByName(RANGE_TABLE_EVENT_ON)
    .getDisplayValues()
    .filter((record) => {
      return record[0];
    });
}
