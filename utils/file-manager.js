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
 * The ID of the "files" folder in the "api-files" repository that is stored in the Script Properties
 *
 * @see https://developers.google.com/apps-script/reference/properties
 */
const API_FILES_START_FOLDER_ID = PropertiesService.getScriptProperties().getProperty('API_FILES_START_FOLDER');

/**
 * The ID of the "html" folder in the "api-files" repository that is stored in the Script Properties
 *
 * @see https://developers.google.com/apps-script/reference/properties
 */
const API_FILES_HTML_FOLDER_ID = PropertiesService.getScriptProperties().getProperty('API_FILES_HTML_FOLDER');

/**
 * The ID of the "index.html" file in the "api-files" repository that is stored in the Script Properties
 *
 * @see https://developers.google.com/apps-script/reference/properties
 */
const INDEX_HTML_ID = PropertiesService.getScriptProperties().getProperty('INDEX_HTML_ID');

/**
 * Gets the start folder of the "api-files" repository stored in the Google Drive.
 *
 * @returns the start folder of the "api-files" repository stored in the Google Drive
 */
function getApiFilesStartFolder() {
  return DriveApp.getFolderById(API_FILES_START_FOLDER_ID);
}

/**
 * Gets the html folder of the "api-files" repository stored in the Google Drive used to store HTML code.
 *
 * @returns he html folder of the "api-files" repository stored in the Google Drive used to store HTML code
 */
function getApiFilesHtmlFolder() {
  return DriveApp.getFolderById(API_FILES_HTML_FOLDER_ID);
}

/**
 * Checks if the given Google Drive folder contains a folder with the given name. If it does, returns that folder.
 * If such folder doesn't exist yet, creates it and then returns it.
 *
 * @param {Folder} parentFolder the given Google Drive folder that is the parent of the given folder
 * @param {String} folderName the folder name of the required folder
 *
 * @returns the folder with the given name stored in the given folder
 */
function getOrCreateFolderByParentAndName(parentFolder, folderName) {
  let resultFolder;
  try {
    resultFolder = parentFolder.getFoldersByName(folderName).next();
  } catch (error) {
    resultFolder = parentFolder.createFolder(folderName);
    DriveApp.getFileById(INDEX_HTML_ID).makeCopy('index.html', resultFolder);
  }

  return resultFolder;
}

/**
 * Checks if a file with the given name exists on the given folder. If it does, replaces it with a file
 * with the same name and the given content. If it doesn't exists yet, creates it with the given content.
 *
 * @param {Folder} parentFolder the given Google Drive folder
 * @param {String} fileName the given name of the file to create or update
 * @param {String} fileContent the content of the file to create or update
 * @param {MimeType} mimeType the give Apps Script file mime type
 *
 * @see https://developers.google.com/apps-script/reference/base/mime-type
 */
function saveOrUpdateFile(parentFolder, fileName, fileContent, mimeType) {
  const existingFile = getFileByParentFolderAndName(parentFolder, fileName);

  if (existingFile) {
    existingFile.setTrashed(true);
  }

  parentFolder.createFile(fileName, fileContent, mimeType);
}

/**
 * Checks if a file with the given name exists on the given folder. If it does, returns the file.
 * If the file doesn't exists, returns null.
 *
 * @param {Folder} parentFolder the given Google Drive folder
 * @param {String} fileName the file given name
 *
 * @returns the file with the given name if it exist or null if it doesn't exists
 */
function getFileByParentFolderAndName(parentFolder, fileName) {
  try {
    return parentFolder.getFilesByName(fileName).next();
  } catch (error) {
    return null;
  }
}
