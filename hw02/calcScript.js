(function(){
	"use strict";
	
	var acc = ""; // accumalator for the input numbers
	var currVal = ""; // current value of acc
	var currOp = "+/="; // stored op; default should be plus for chaining?

	function resetValues(changeOutput)
	{
		acc = "";
		currOp = "+/=";
		currVal = "";
		if(changeOutput == true)
			document.getElementById("output").value = currVal;
	}

	function getNumber()
	{
		if(this.value == "." && acc.includes("."))
			return;
		
		acc = acc + this.value;
		document.getElementById("output").value = acc;
	}

	function getOperator()
	{
		// handle 2 consecutive operators

		currVal = applyOperator(currVal, acc, currOp);
		
		// which value to show during op input
		document.getElementById("output").value = currVal; // if "" -> 0
		
		if(currVal == "Undefined")
		{	
			resetValues(false);
			return;
		}
		
		acc = "";
		currOp = this.value;
	}

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
		
	window.addEventListener("load", init, false);
})();

// To do:
// 6 /-1 -> Undefined
// Number.prototype.toPrecision
// Handle 2 consecutive operators
// start with - and it shows a zero (op handling)