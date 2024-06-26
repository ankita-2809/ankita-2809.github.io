/*******************************************************************************
**
** FileName: APIWrapper.js
**
//***********************************************
//Copyright © 2005-2013 Harbinger Knowledge Products
//all rights reserved
//***********************************************
*******************************************************************************/
var _Debug = false; // set this to false to turn debugging off
// and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;


// local variable definitions
var apiHandle = null;
var API = null;
var findAPITries = 0;

var _MSGTOSHOW = true;


/*******************************************************************************
 **
 ** Function: doLMSInitialize()
 ** Inputs:  None
 ** Return:  CMIBoolean true if the initialization was successful, or
 **          CMIBoolean false if the initialization failed.
 **
 ** Description:
 ** Initialize communication with LMS by calling the LMSInitialize
 ** function which will be implemented by the LMS.
 **
 *******************************************************************************/

function doLMSInitialize() {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSInitialize was not successful.');
            _MSGTOSHOW = false;
        }
        return 'false';
    }

    var result = api.LMSInitialize('');

    if (result.toString() != 'true') {
        var err = ErrorHandler();
    }

    return result.toString();
}

/*******************************************************************************
 **
 ** Function doLMSFinish()
 ** Inputs:  None
 ** Return:  CMIBoolean true if successful
 **          CMIBoolean false if failed.
 **
 ** Description:
 ** Close communication with LMS by calling the LMSFinish
 ** function which will be implemented by the LMS
 **
 *******************************************************************************/
function doLMSFinish() {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSFinish was not successful.');
            _MSGTOSHOW = false;
        }
        return 'false';
    } else {
        // call the LMSFinish function that should be implemented by the API

        var result = api.LMSFinish('');
        if (result.toString() != 'true') {
            var err = ErrorHandler();
        }

    }

    return result.toString();
}

/*******************************************************************************
 **
 ** Function doLMSGetValue(name)
 ** Inputs:  name - string representing the cmi data model defined category or
 **             element (e.g. cmi.core.student_id)
 ** Return:  The value presently assigned by the LMS to the cmi data model
 **       element defined by the element or category identified by the name
 **       input value.
 **
 ** Description:
 ** Wraps the call to the LMS LMSGetValue method
 **
 *******************************************************************************/
function doLMSGetValue(name) {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSGetValue was not successful.');
            _MSGTOSHOW = false;
        }
        return '';
    } else {
        var value = api.LMSGetValue(name);
        var errCode = api.LMSGetLastError().toString();
        if (errCode != _NoError) {
            if (_MSGTOSHOW) {
                // an error was encountered so display the error description
                var errDescription = api.LMSGetErrorString(errCode);
                alert('LMSGetValue(' + name + ') failed. \n' + errDescription);
                _MSGTOSHOW = false;
            }
            return '';
        } else {
            if (value.toString() == 'undefined') {
                setTimeOut('Wait()', 5000);
                if (value.toString() == 'undefined') {
                    return '';
                } else {
                    return value.toString();
                }
            } else {
                return value.toString();
            }

        }
    }
}

/*******************************************************************************
 **
 ** Function doLMSSetValue(name, value)
 ** Inputs:  name -string representing the data model defined category or element
 **          value -the value that the named element or category will be assigned
 ** Return:  CMIBoolean true if successful
 **          CMIBoolean false if failed.
 **
 ** Description:
 ** Wraps the call to the LMS LMSSetValue function
 **
 *******************************************************************************/
function doLMSSetValue(name, value) {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSSetValue was not successful.');
            _MSGTOSHOW = false;
        }
        return;
    } else {
        var result = api.LMSSetValue(name, value);
        if (result.toString() != 'true') {
            var err = ErrorHandler();
        }
    }

    return;
}

/*******************************************************************************
 **
 ** Function doLMSCommit()
 ** Inputs:  None
 ** Return:  None
 **
 ** Description:
 ** Call the LMSCommit function 
 **
 *******************************************************************************/
function doLMSCommit() {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSCommit was not successful.');
            _MSGTOSHOW = false;
        }
        return 'false';
    } else {
        var result = api.LMSCommit('');
        if (result != 'true') {
            var err = ErrorHandler();
        }
    }

    return result.toString();
}

/*******************************************************************************
 **
 ** Function doLMSGetLastError()
 ** Inputs:  None
 ** Return:  The error code that was set by the last LMS function call
 **
 ** Description:
 ** Call the LMSGetLastError function 
 **
 *******************************************************************************/
function doLMSGetLastError() {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            //since we can't get the error code from the LMS, return a general error    
            alert('Unable to locate the LMS\'s API Implementation.\nLMSGetLastError was not successful.');
            _MSGTOSHOW = false;
        }
        return _GeneralError;
    }

    return api.LMSGetLastError().toString();
}

/*******************************************************************************
 **
 ** Function doLMSGetErrorString(errorCode)
 ** Inputs:  errorCode - Error Code
 ** Return:  The textual description that corresponds to the input error code
 **
 ** Description:
 ** Call the LMSGetErrorString function 
 **
 ********************************************************************************/
function doLMSGetErrorString(errorCode) {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSGetErrorString was not successful.');
            _MSGTOSHOW = false;
        }
    }

    return api.LMSGetErrorString(errorCode).toString();
}

/*******************************************************************************
 **
 ** Function doLMSGetDiagnostic(errorCode)
 ** Inputs:  errorCode - Error Code(integer format), or null
 ** Return:  The vendor specific textual description that corresponds to the 
 **          input error code
 **
 ** Description:
 ** Call the LMSGetDiagnostic function
 **
 *******************************************************************************/
function doLMSGetDiagnostic(errorCode) {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSGetDiagnostic was not successful.');
            _MSGTOSHOW = false;
        }
    }

    return api.LMSGetDiagnostic(errorCode).toString();
}

/*******************************************************************************
 **
 ** Function LMSIsInitialized()
 ** Inputs:  none
 ** Return:  true if the LMS API is currently initialized, otherwise false
 **
 ** Description:
 ** Determines if the LMS API is currently initialized or not.
 **
 *******************************************************************************/
function LMSIsInitialized() {
    // there is no direct method for determining if the LMS API is initialized
    // for example an LMSIsInitialized function defined on the API so we'll try
    // a simple LMSGetValue and trap for the LMS Not Initialized Error

    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nLMSIsInitialized() failed.');
            _MSGTOSHOW = false;
        }
        return false;
    } else {
        var value = api.LMSGetValue('cmi.core.student_name');
        var errCode = api.LMSGetLastError().toString();
        if (errCode == _NotInitialized) {
            return false;
        } else {
            return true;
        }
    }
}

/*******************************************************************************
 **
 ** Function ErrorHandler()
 ** Inputs:  None
 ** Return:  The current value of the LMS Error Code
 **
 ** Description:
 ** Determines if an error was encountered by the previous API call
 ** and if so, displays a message to the user.  If the error code
 ** has associated text it is also displayed.
 **
 *******************************************************************************/
function ErrorHandler() {
    var api = getAPIHandle();
    if (api == null) {
        if (_MSGTOSHOW) {
            alert('Unable to locate the LMS\'s API Implementation.\nCannot determine LMS error code.');
            _MSGTOSHOW = false;
        }
        return;
    }

    // check for errors caused by or from the LMS
    //If the values in the manifest files are optional then compliant LMS return the 
    //error code as NotImplementedError or InvalidArgumentError
    var errCode = api.LMSGetLastError().toString();
    if (errCode != _NoError && errCode != _InvalidArgumentError && errCode != _NotImplementedError) {
        // an error was encountered so display the error description
        var errDescription = api.LMSGetErrorString(errCode);

        if (_Debug == true) {
            errDescription += '\n';
            errDescription += api.LMSGetDiagnostic(null);
            // by passing null to LMSGetDiagnostic, we get any available diagnostics
            // on the previous error.
        }

        if (_MSGTOSHOW) {
            alert(errDescription);
            _MSGTOSHOW = false;
        }
    }

    return errCode;
}

/******************************************************************************
 **
 ** Function getAPIHandle()
 ** Inputs:  None
 ** Return:  value contained by APIHandle
 **
 ** Description:
 ** Returns the handle to API object if it was previously set,
 ** otherwise it returns null
 **
 *******************************************************************************/
function getAPIHandle() {
    if (apiHandle == null) {
        apiHandle = getAPI();
    }

    return apiHandle;
}


/*******************************************************************************
 **
 ** Function findAPI(win)
 ** Inputs:  win - a Window Object
 ** Return:  If an API object is found, it's returned, otherwise null is returned
 **
 ** Description:
 ** This function looks for an object named API in parent and opener windows
 **
 *******************************************************************************/
function findAPI(win) {
    // Check to see if the window (win) contains the API
    // if the window (win) does not contain the API and
    // the window (win) has a parent window and the parent window  
    // is not the same as the window (win)

    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
        // increment the number of findAPITries
        findAPITries++;

        // Note: 7 is an arbitrary number, but should be more than sufficient
        if (findAPITries > 7) {
            if (_MSGTOSHOW) {
                alert('Error finding API -- too deeply nested.');
                _MSGTOSHOW = false;
            }
            return null;
        }

        // set the variable that represents the window being 
        // being searched to be the parent of the current window
        // then search for the API again
        win = win.parent;
    }
    return win.API;
}

/*******************************************************************************
 **
 ** Function getAPI()
 ** Inputs:  none
 ** Return:  If an API object is found, it's returned, otherwise null is returned
 **
 ** Description:
 ** This function looks for an object named API, first in the current window's 
 ** frame hierarchy and then, if necessary, in the current window's opener window
 ** hierarchy (if there is an opener window).
 **
 *******************************************************************************/
function getAPI() {
    var theAPI = findAPI(window);
    if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != 'undefined')) {
        theAPI = findAPI(window.opener);
    }
    if (theAPI == null) {
        if (_MSGTOSHOW) {
            alert('Unable to find an API adapter. Upload this SCORM package on LMS to get the adapter.');
            _MSGTOSHOW = false;
        }
    }
    return theAPI
}

function Wait() {
    return;
}