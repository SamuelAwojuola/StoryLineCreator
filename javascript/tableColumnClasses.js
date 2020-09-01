//FROM USEFUL SCRIPTS FOLDER

//When I wrote the original code, I didn't know that all tds have a colspan attribute.

//THIS WILL ADD CLASSES [e.g, col-1, col-2, col-3, etc.] TO ALL <td>s INDICATING THE COLUMN EACH BELONGS TO
//A <td> with, for example, 'colspan = 5', will have five col-x classes
//To hide a column, a class will be targeted and it is the cells that will be hidden and not the classes.
//The hidden col-x class will be changed to col-x-hidden
//If there is no col-x class, it means that that cell is to be hidden
//To restore a column, the col-x-hidden will be restored to col-x
//The colspan value of a cell with colspan will be made equal to the number of  class-x'es it has.

var arrayOfAllColClasses = [];
var colClassesCount = [];

function generateColumnClasses() {

	var ArrayOfAllTds = storyLineTable.getElementsByTagName("td");
	var customIndex = 0;
	//	customIndex = customIndex++;

	//TO ADD CUSTOM CLASSES TO THE <TD>
	for (var i = 0; i < ArrayOfAllTds.length; i++) {
		var TD = ArrayOfAllTds[i];
		var tdsIndexInItsRow = TD.cellIndex;

		if (tdsIndexInItsRow == 0) {
			customIndex = 0;
		}

		var colSpan = customIndex + 1;
		var colClass = "col-" + colSpan;
		TD.classList.add(colClass);
		customIndex = customIndex + 1;
		//			alert(customIndex);

		//FOR IF THE OTHER <td>s APART FROM THE FIRST IN THE ROW HAS A "colspan" ATTRIBUTE
		//			if (TD.hasAttribute("colspan")) {
		var colSpan2 = TD.colSpan;

		//TO SAVE THE ORGINAL COLSPAN AS ANOTHER MADE-UP ATTRIBUTE
		TD.setAttribute("originalcolspan", colSpan2);
		
		if (!TD.hasAttribute("hiddencol_xs_count")) {
			TD.setAttribute("hiddencol_xs_count", 0);
		}

		for (var cI = 1; cI < colSpan2; cI++) {
			var colSpan = customIndex + 1;
			var colClass = "col-" + colSpan;
			TD.classList.add(colClass);
			customIndex = customIndex + 1;
		}
		//			}


		if (arrayOfAllColClasses.indexOf(colClass) == -1) {
			//arrayOfAllColClasses.push(colClass);
			if (colClassesCount.indexOf(customIndex) == -1) {
				colClassesCount.push(customIndex);
			}
		}
	}
	//THE COL-X CLASSES HAVE TO BE SORTED FOR THE CONNECT SVG CURVES FUNCTION TO WORK AS DESIRED SINCE IT MOVES FROM COLUMN TO COLUMN AS LISTED IN THE COL-CLASS ARRAY 
	colClassesCount.sort(function (a, b) {
		return a - b
	});
	arrayOfAllColClasses = [];
	for (i = 0; i < colClassesCount.length; i++) {
		arrayOfAllColClasses.push("col-" + colClassesCount[i])
	}
}

/*function deleteCol_xClasses() {
	var ArrayOfAllTds = document.getElementsByTagName("td");
	for (var i = 0; i < ArrayOfAllTds.length; i++) {
		var classlist = ArrayOfAllTds[i].classList;
		for (j = 0; j < classlist.length; j++) {
			if (classlist[j].match(/^(col-\d+)$/)) {
				classlist.remove(classlist[j])
			}
		}
	}
}*/
