A drag and drop Neto API integration for handling CSV files, and updating stock levels for Neto SKUs.

Live application can be found here: <https://readeral.github.io/netoupload/>

Built with ReactJS

Dependencies: React Dropzone, React Radio Group, PapaParse

Both development and production builds utilise <https://cors-anywhere.herokuapp.com/>, due to the changing nature of the target API URL. As such, it is subject to usage limits and not recommended as a permanent solution. It is recommended that for regular use, you fork this project and deploy on your own server, resolving CORS issues that way.

## Goals:
My aim has been to create something that would enable warehouse staff to drag and drop a CSV when the stock arrives (typically a 'restock alert report' file), and assuming everything ordered is delivered, to submit for  immediate updates of all stock in the file.

## Limitations to be observed:
Currently there are a few limitations that need to be observed for use:
-   The stock qty column must be the leftmost field of the CSV
-   The stock qty field parameter must be set Case-Sensitively
-   There is no test/warning for lack of/partial parameters present - the application just hangs, this is the first thing on my list to fix. One can easily click 'reset' to resolve the issue and go in and set the parameters.
-   There is presently no support for drag and drop of multiple files at once - however there is support for adding multiple files if dragged one at a time.
-   The application will allow resubmission of data if the 'Update Quantity' button is pressed a second time before resetting.

## Use:
*Please read the limitations above before use.*
1.  Click the 'parameters' button (below the console) and enter your Neto details (URL, API key, and CSV qty field name - defaults to 'Reorder Quantity'). These details are stored per session, and are not cleared when clicking 'reset'.
2.  Set your update method for your next CSV upload (defaults to 'increment', default can be changed via parameter screen) - can be increment, set or decrement
3.  Drag and drop your CSV file onto the drop field, and use the output on the right hand side of the screen to check all is well (adding files one after the other will display the preview reverse-chronologically, with the first added at the bottom)
*   3a. Drag and drop additional CSVs, setting update method per file
4.  Optional - click 'get quantity' to see the current quantities for all SKUs listed in the submitted CSV
5.  Optional - preview the API call to be sent to server
6.  Click Update Quantity to send your new values to your database
7.  Optional - click 'get quantity' to see the changed quantities
8.  Click Reset to do clear submitted data and to do a new batch of updates.
