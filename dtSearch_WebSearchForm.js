/*
	
	The onload and onunload event handlers call readData and saveDataGlobal
	to save the state of the search form so it will be restored the next time the
	form loads.  These functions are implemented in Utilites.js.

	saveDataGlobal saves the form data as a global cookie (one that applies to the
	whole site, not just the folder with the search form).  This ensures that the
	same form data can be recovered when the search form appended to search results.


	updateField() makes it easy to add field searches to a search form.  The onchange
	handler for the field edit control calls updateField(this).  updateField maintains
	a list of (fieldname, value) pairs in fieldTable of the names and values of
	any field criteria on the form.   Each time a field value changes on the form,
	the booleanConditions form variable is updated to reflect the field search.
	
	updateFilters does the same thing with filterTable and a File Conditions
	("xfilter") expression maintained in the hidden fileConditions form variable.
	

*/


// Set up form load and unload events to read or save the cookie with the form data
// This avoids the need to add onload and onunload calls to the body tag of the
// search form.
addEvent(window,"load", readFormState);
addEvent(window,"unload",saveFormState);

// filterTable and fieldTable are used to add support for 
// field searching and date range or filename searching
var filterTable = new Array;
var fieldTable = new Array;

// Add event listener
function addEvent(o,e,f){
	if (o.addEventListener){ o.addEventListener(e,f,true); return true; }
	else if (o.attachEvent){ return o.attachEvent("on"+e,f); }
	else { return false; }
	}

function readFormState()
{	readData('dtSearch.DemoForm', document.SearchForm); 
}

function saveFormState()
{	saveDataGlobal('dtSearch.DemoForm', document.SearchForm);
}

function doSearch() {
    document.SearchForm.submit()
    }


function updateField(ctrl)
{	var fld =  "(" + ctrl.name + " contains (" + ctrl.value + ")) ";
	if (isBlank(ctrl.value))
		fld = "";
	fieldTable[ctrl.name] = fld;
	var req = "";
	var fBlank = true;
	for (f in fieldTable) {
		var item = fieldTable[f];
		if (!isBlank(item)) {
			if (!isBlank(req))
				req = req + " and ";
			req = req + item;
			fBlank = false;
			}
		}
	document.SearchForm.booleanConditions.value = req;
}

function updateDateFilter()
{
	var f= makeDateFilter();
	filterTable["date"] = f;
	updateFilters();
}

function updateFilter(type, ctrl)
{	filterTable[type] = type + " \"" + ctrl.value + "\"";
	updateFilters();
}

function updateFilters()
{	var req = "xfilter(";
	var fBlank = true;
	for (f in filterTable) {
		var item = filterTable[f];
		if (!isBlank(item)) {
			req = req + item;
			fBlank = false;
			}
		}
	if (fBlank)
		document.SearchForm.fileConditions.value = "";
	else
		document.SearchForm.fileConditions.value = req + ")";
}

function makeDateFilter()
{
    if (isFieldBlank(document.SearchForm.StartYear) && isFieldBlank(document.SearchForm.EndYear))
        return ""

    var begin, end;
    var beginMonth, endMonth

    if (isFieldBlank(document.SearchForm.StartMonth))
        beginMonth = "M01";
    else
        beginMonth = document.SearchForm.StartMonth.value;

    if (isFieldBlank(document.SearchForm.EndMonth))
        endMonth = "M12";
    else
        endMonth = document.SearchForm.EndMonth.value;

    if (isFieldBlank(document.SearchForm.StartYear))
        begin = "M01/D01/Y1980";
    else
        begin =  beginMonth + "/" + document.SearchForm.StartYear.value + "/D01";
    if (isFieldBlank(document.SearchForm.EndYear))
        end = "M12/D31/Y2999";
    else
        end =  endMonth + "/" + document.SearchForm.EndYear.value + "/D31";

    var filter;
    filter = "date \"" + begin + "~~" + end + "\"";
    return filter;
    }

function clearDateSearch() {
    document.SearchForm.StartMonth.selectedIndex = 0
    document.SearchForm.EndMonth.selectedIndex = 0
    document.SearchForm.StartYear.selectedIndex = 0
    document.SearchForm.EndYear.selectedIndex = 0
    updateDateSearch()
    }
    
function isBlank(str)
{	if (!str)
		return true;
	if (str.length == 0)
		return true;
	var i;
	for (i = 0; i < str.length; ++i) {
		var ch = str.charCodeAt(i);
		
		if (ch != 32)
			return false;
		}
	return true;
}


function isFieldBlank(theField) {
        if (theField && isBlank(theField.value))
            return true;
        else
            return false;
    }

//box hide box show	

//For Case Number and other Indexes to Search -Search Requests-

function exact()
	{
	
	document.getElementById('sakto').innerHTML = '<SELECT class=\"form-control custom-select\" NAME=\"searchType\" SIZE=\"1\" ID=\"pulldown\"><OPTION VALUE=\"allwords\">all of the words<OPTION VALUE=\"anywords\">any of the words<OPTION VALUE=\"phrase\" SELECTED=\"1\">the exact phrase<OPTION VALUE=\"bool\">boolean</SELECT>';
	
	}
	
function allwords()
	{
	
	document.getElementById('sakto').innerHTML = '<SELECT class=\"form-control custom-select\" NAME=\"searchType\" SIZE=\"1\" ID=\"pulldown\"><OPTION VALUE=\"allwords\" SELECTED=\"1\">all of the words<OPTION VALUE=\"anywords\">any of the words<OPTION VALUE=\"phrase\">the exact phrase<OPTION VALUE=\"bool\">boolean</SELECT>';
	
	}

//for Categories and Indexes to Search	

function sc()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{7e10028c3ae6b69b2083d1d8f39275a2} 12. SC ALL" onclick=\"allwords()\"> A. ALL <option value="*{f6df8cbf80797b096c3a33422644a21b} 1. Decisions" onclick=\"exact()\"> B. Case Number <option value="*{f6df8cbf80797b096c3a33422644a21b} 1. Decisions" SELECTED=\"1\" onclick=\"allwords()\"> C. SC Decision<option value="*{93ddad1fd17d3809405dfad53bfb070f} 2. Resolutions" onclick=\"allwords()\">D. SC Resolution<option value="*{f0dabe0876b58e6c44e4c5b343d545b9} 3. Admin. Matters" onclick=\"allwords()\"> E. Admin Matters<option value="*{3cb26d04e0e24df44da1674d59a85ede} 6. Judiciary All" onclick=\"allwords()\"> F. Bar Matters<option value="*{2509f05757351ffc4710c3f54a0e932a} 4. Circulars" onclick=\"allwords()\"> G. Circulars<option value="*{f07c50d9fc59397680a7be2ed4d03dea} 6. Manuals" onclick=\"allwords()\"> H. Manuals</select>';

	}

function ca()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{3e988e1a7b19c06dd3b18386a6a9b70f} 1. CA Decisions" SELECTED=1> A. CA Decisions<option value="*{a77525fdbb25bbf59f41a4b9d9f35f82} 2. CA Resolutions"> B. CA Resolutions<option value="*{5e565ad476e6675256f891144f3132b3} 3. CA All">C. CA All</select>';

	}

function lawlist()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{0bc94a65ae966e90b7cc7fd5a7f3d89c} 10. Lawlist" SELECTED=1> A. List</select>';

	}

function laws()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{e583c62b17e52cbc55d6f38f88698b77} 8. Laws" SELECTED=1> A. Laws<option value="*{8f1b4966a5df4ed4fe0a1bdb7686a675} 5. Rules of Court"> B. Rules of Court</select>';

	}

function ei()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{94934d5cbfebba8206fb5f67a2ff9983} 1. Administrative Orders" SELECTED=1>A. Administrative Orders<option value="*{9524277323ed689eeecacd7100669381} 2. Executive Orders"> B. Executive Orders<option value="*{dff1770fb2e58a896da3f8b5f3469f5c} 3. Memorandum Circulars"> C. Memorandum Circulars<option value="*{9c91984e5614fdb86b040135bbe6c302} 4. Memorandum Orders"> D. Memorandum Orders<option value="*{e7f4d19da0b40aa0f7564e8fa4b16173} 5. Presidential Proclamation"> E. Presidential Proclamation</select>';

	}
	
function other_is()

	{

		document.getElementById('laman').innerHTML = '<select class=\"form-control\" size=\"3\" name=\"index\" id=\"formstyle\" multiple><option value="*{09691cce4d5201d76b4fa995947d11a7} 9. Journals" SELECTED=1> A. Journals<option value="*{003b08d2f81b55910f001418506cd70d} 11. ONAR"> B. ONAR<option value="*{aad1bb32a49065c1aea8da2b9998f403} treaties"> C. Treaties</select>';

	}
/* Remove for dtSearch 2019
function cta()

	{

		document.getElementById('laman').innerHTML = "<select name=\"index\" id=\"formstyle\" multiple><option value=\"D:\\Inetpub\\wwwroot\\ctadecision\"> A. CTA Jurisprudence<option value=\"D:\\Inetpub\\wwwroot\\ctainternal\"> B. CTA Internal Rules<option value=\"D:\\Inetpub\\wwwroot\\ctaall\"> C. CTA All</select>";

	}

function sb()

	{

		document.getElementById('laman').innerHTML = "<select name=\"index\" id=\"formstyle\" multiple><option value=\"D:\\Inetpub\\wwwroot\\sbdecision\"> A. SB Jurisprudence<option value=\"D:\\Inetpub\\wwwroot\\sbinternal\"> B. SB Internal Rules<option value=\"D:\\Inetpub\\wwwroot\\sbaall\"> C. SB All</select>";

	}

function hret()

	{

		document.getElementById('laman').innerHTML = "<select name=\"index\" id=\"formstyle\" multiple><option value=\"D:\\Inetpub\\wwwroot\\hretdecision\"> A. HRET Jurisprudence<option value=\"D:\\Inetpub\\wwwroot\\hretinternal\"> B. HRET Internal Rules<option value=\"D:\\Inetpub\\wwwroot\\hretaall\"> C. HRET All</select>";

	}
	
function og()

	{

		document.getElementById('laman').innerHTML = "<select name=\"index\" id=\"formstyle\" multiple><option value=\"D:\\Inetpub\\wwwroot\\og\"> A. Official Gazette</select>";

	} 
	
function court_is()

	{

		document.getElementById('laman').innerHTML = "<select name=\"index\" id=\"formstyle\" multiple><option value=\"D:\\Inetpub\\wwwroot\\amendments\"> A. Amendments<option value=\"D:\\Inetpub\\wwwroot\\barmatters\"> B. Bar Matters<option value=\"D:\\Inetpub\\wwwroot\\circular\"> C. Circulars<option value=\"D:\\Inetpub\\wwwroot\\ocacircular\"> D. OCA Circulars<option value=\"D:\\Inetpub\\wwwroot\\scadmincir\"> E. SC Admin. Circular<option value=\"E:\\Inetpub\\wwwroot\\scadminorder\"> F. SC Admin. Order<option value=\"D:\\Inetpub\\wwwroot\\scmemocir\"> G. SC Memo Circular<option value=\"D:\\Inetpub\\wwwroot\\scmemoorder\"> H. SC Memo Order<option value=\"D:\\Inetpub\\wwwroot\\cirall\"> I. Court Issuances All</select>";

	} 
*/	