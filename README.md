A drag and drop Neto API integration for handling CSV files, and updating stock levels for Neto SKUs.

My aim has been to create something that would enable warehouse staff to drag and drop a CSV when the stock arrives (typically a 'restock alert report' file), and assuming everything ordered is delivered, to submit for  immediate updates of all stock in the file.

Currently there are a few limitations:
-   The stock qty column must be the leftmost field of the CSV
-   The stock qty field parameter must be set Case-Sensitively
-   There is no test/warning for parameters present
-   There is no support for drag and drop of multiple files at once - however there is support for adding multiple files if dragged one at a time.

Use:
1.  Click the 'parameters' button (below the console) and enter your Neto details (URL, API key, and CSV qty field name - defaults to 'Reorder Quantity')
2.  Set your update method for your next CSV upload (defaults to 'increment', default can be changed via parameter screen) - can be increment, set or decrement
3.  Drag and drop your CSV file onto the drop field, and use the output on the right hand side of the screen to check all is well (adding files one after the other will display the preview reverse-chronologically, with the first added at the bottom)
*   3a. Drag and drop additional CSVs, setting update method per file
4.  Optional - click 'get quantity' to see the current quantities for all SKUs listed in the submitted CSV
5.  Optional - preview the API call to be sent to server
6.  Click Update Quantity to send your new values to your database
7.  Optional - click 'get quantity' to see the changed quantities
8.  Click Reset to do clear submitted data and to do a new batch of updates.
