(function(){
	"use strict";
	
	var acc = ""; // accumalator for the input numbers
	var currVal = ""; // current value = curr value op acc 
	var currOp = "+/="; // stored operator; default is plus to help with chaining operations

	function resetValues(changeOutput)
	{
		acc = "";
		currOp = "+/=";
		currVal = "";
		if(changeOutput == true)
			document.getElementById("output").value = currVal;
	}
	
	// Adds the input number to acc variable
	// Ignores decimal point if one is already present in the acc
	function getNumber()
	{
		if(this.value == "." && acc.includes("."))
			return;
		
		acc = acc + this.value;
		document.getElementById("output").value = acc;
	}
	
	// handles operators
	// For consecutive operators, second one is considered
	// Handles negative numbers
	function getOperator()
	{
		// handle 2 consecutive operators
		
		if(acc == "" && this.value == "-")
		{
			// Here - is the sign of the number and not op
			acc = acc + this.value;
			document.getElementById("output").value = acc;
			return;
		}
		else if(acc == "-")
		{
			// Invalid input. Number expected after - operator
			return;
		}
		else if(acc == "")
		{
			// consecutive operator.
			// consider the current one
			currOp = this.value;
		}
		else // normal case
		{
			currVal = applyOperator(currVal, acc, currOp);
		}
		
		// to display o/p for transaction chaining
		document.getElementById("output").value = currVal;
		
		if(currVal == "Undefined")
		{	
			resetValues(false);
			return;
		}
		
		acc = "";
		currOp = this.value;
	}

	// assign events
	function init() 
	{
		var nos = document.getElementsByClassName("numbers");
		for(var i = 0; i < nos.length; i++)
		{	
			nos[i].addEventListener("click", getNumber);
		}
		
		var ops = document.getElementsByClassName("operators");
		for(var i = 0; i < ops.length; i++)
		{	
			ops[i].addEventListener("click", getOperator);
		}
		
		var resetButton = document.getElementById("clearAll");
		resetButton.addEventListener("click", function(){resetValues(true)});
	}

	function applyOperator(lhs, rhs, op)
	{
		if(lhs == "" || lhs == "Undefined")
			lhs = 0;
		if(rhs == "")
			rhs = 0;
		
		lhs = parseFloat(lhs); // exceptions?
		rhs = parseFloat(rhs);
		var result;
		
		if(op == "+/=")
		{
			result = lhs + rhs;
		}
		else if(op == "-")
		{
			result = lhs - rhs;
		}
		else if(op == "*")
		{
			result = lhs * rhs;
		}
		else if(op = "/")
		{
			if(rhs == 0)
			{
				return "Undefined";
			}
			result = lhs / rhs;
		}
		
		return result;
	}
	
	// below line is from Nat's notes
	window.addEventListener("load", init, false);
})();

// To do:
// 6 /-1 -> Undefined - Done
// Handle 2 consecutive operators - Done
// start with - and it shows a zero (op handling) - Done
