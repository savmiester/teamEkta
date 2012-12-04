/*
	Created by: David Morris
	For use only by (except given permission by the creator):
		Team Ektha in CS683 - Software Project Management @ NJIT
		Members:
				David Morris
				Eddie Pagan
				Shruthi Shankaran
				Savio Dsouza
	November 15, 2012


	Uses JQuery, JSON, and AJAX.
*/




$(document).ready(function()
{

/* Window resize handle; something neat but most will not know of existence */
	$(window).resize(function()
	{
		if($(window).width() < 775)
		{
			$('#windowSize').text("For best viewing make the window as large as the screen.");
		}
		else
		{
			$('#windowSize').text("");
		}
	});


/* Dropdown Menus */
	$('#semester').change(function()
	{
		if(!$("#semester option[value = '-1']").is(':selected'))
		{
			semesterDisplay();

			fillProfessorOptions();
		}
		else
		{
			$('#professor').val('-1');
			$('#professor').attr('disabled', true);
			$('#prefDay').val('-1');
			$('#prefDay').attr('disabled', true);
		}

		emptyCalendar();
	});

	$('#professor').change(function()
	{
		if(!$("#professor option[value = '-1']").is(':selected'))
		{
			professorDisplay();
			updateProfessorCoursesCount();

			fillCourseOptions();
			fillPrefDaysOptions();
			updateCalendar();
		}
		else
		{
			$('#course').val('-1');
			$('#course').attr('disabled', true);
		}
	});

	/* Schedule Dropdowns */
		$('#course').change(function()
		{
			if(!$("#course option[value = '-1']").is(':selected'))
			{
				fillRoomOptions();
			}
			else
			{
				$('#room').val('-1');
				$('#room').attr('disabled', true);
			}
		});
		$('#room').change(function()
		{
			if(!$("#room option[value = '-1']").is(':selected'))
			{
				enableDays();
			}
			else
			{
				disableDays();
			}
		});
		$('#hours').change(function()
		{
			if(!$("#hours option[value = '-1']").is(':selected'))
			{
				$('#submitSchedule').attr('disabled', false);
				$('#deleteSchedule').attr('disabled', false);
			}
			else
			{
				$('#submitSchedule').attr('disabled', true);
				$('#deleteSchedule').attr('disabled', true);
			}
		});


	/* Preference Dropdowns */
		$('#prefDay').change(function()
		{
			if(!$("#prefDay option[value = '-1']").is(':selected'))
			{
				fillPrefHourOptions();
			}
			else
			{
				$('#hours').val('-1');
				$('#hours').attr('disabled', true);
			}
		});
		$('#prefHours').change(function()
		{
			if(!$("#prefHours option[value = '-1']").is(':selected'))
			{
				$('#submitPreference').attr('disabled', true);
				$('#deletePreference').attr('disabled', true);
			}
			else
			{
				$('#submitPreference').attr('disabled', false);
				$('#deletePreference').attr('disabled', false);
			}
		});


	/* Course checkboxes for enabling/disabling certain time slots */
	$('#monday').click(function() { adjustHours('monday'); });
	$('#tuesday').click(function() { adjustHours('tuesday'); });
	$('#wednesday').click(function() { adjustHours('wednesday'); });
	$('#thursday').click(function() { adjustHours('thursday'); });
	$('#friday').click(function() { adjustHours('friday'); });


/* Buttons clicked */
	$('#submitSchedule').click(function()
	{
			submitSchedule();
			/*************************************************************************************
		if(!$("#hours option[value = '-1']").is(':selected'))
		{
			submitSchedule();
		}
		else
		{
			alert("You must select an hour time slot.");
		}
		*************************************************************************************/
	});

	$('#deleteSchedule').click(function()
	{
		if(!$("#hours option[value = '-1']").is(':selected'))
		{
			deleteSchedule();
		}
		else
		{
			alert("You must select an hour time slot.");
		}
	});

	$('#submitPreference').click(function()
	{
		if(!$("#prefHours option[value = '-1']").is(':selected'))
		{
			submitPreference();
		}
		else
		{
			alert("You must select an hour time slot.");
		}
	});

	$('#deletePreference').click(function()
	{
		if(!$("#prefHours option[value = '-1']").is(':selected'))
		{
			deletePreference();
		}
		else
		{
			alert("You must select an hour time slot.");
		}
	});
 });




/****************************** Filling Dropdowns ******************************/
function fillProfessorOptions()
{
	var boxList = $('#professor');
	var boxListVal = $(boxList).val();

	var servletUrl = 'professorOptions';

	$.getJSON(servletUrl, function(options) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first
		boxList.append($('<option></option>').val('-1').text("Professor")); // Refill "Professor" option

		if (options)
		{
			$.each(options, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});

			boxList.attr('disabled', false);
			alert("success"); //&&&
		}
	});
}


function fillCourseOptions()
{
	var boxList = $('#course');
	var boxListVal = $(boxList).val();

	var servletUrl = 'courseOptions';

	$.getJSON(servletUrl, function(options) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first
		boxList.append($('<option></option>').val('-1').text("Course:Section")); // Refill "Course:Section" option

		if (options)
		{
			$.each(options, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});

			boxList.attr('disabled', false);
			alert("success"); //&&&
		}
	});
}


function fillRoomOptions()
{
	var boxList = $('#room');
	var boxListVal = $(boxList).val();

	var servletUrl = 'roomOptions';

	$.getJSON(servletUrl, function(options) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first
		boxList.append($('<option></option>').val('-1').text("Room")); // Refill "Room" option

		if (options)
		{
			$.each(options, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});

			boxList.attr('disabled', false);
			alert("success"); //&&&
		}
	});
}


function fillPrefDayOptions()
{
	var boxList = $('#prefDay');
	var boxListVal = $(boxList).val();

	var servletUrl = 'prefDayOptions';

	$.getJSON(servletUrl, function(options) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first
		boxList.append($('<option></option>').val('-1').text("Day")); // Refill "Day" option

		if (options)
		{
			$.each(options, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});

			boxList.attr('disabled', false);
			alert("success"); //&&&
		}
	});
}


function fillPrefHoursOptions()
{
	var boxList = $('#prefHours');
	var boxListVal = $(boxList).val();

	var servletUrl = 'prefHoursOptions';

	$.getJSON(servletUrl, function(options) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first
		boxList.append($('<option></option>').val('-1').text("Hours")); // Refill "Hours" option

		if (options)
		{
			$.each(options, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});

			boxList.attr('disabled', false);
			alert("success"); //&&&
		}
	});
}
/*************************************************************************/



/****************************** Days Handle ******************************/
function enableDays()
{
	$('#monday').attr('disabled', false);
	$('#tuesday').attr('disabled', false);
	$('#wednesday').attr('disabled', false);
	$('#thursday').attr('disabled', false);
	$('#friday').attr('disabled', false);
}

function disableDays()
{
	$('#monday').attr('disabled', true);
	$('#tuesday').attr('disabled', true);
	$('#wednesday').attr('disabled', true);
	$('#thursday').attr('disabled', true);
	$('#friday').attr('disabled', true);

	$('#monday').attr('checked', false);
	$('#tuesday').attr('checked', false);
	$('#wednesday').attr('checked', false);
	$('#thursday').attr('checked', false);
	$('#friday').attr('checked', false);
}


function adjustHours(day)
{
	$('#hours option').each(function()
	{
		$(this).attr('disabled', false);
	})

	if($('#' + day).is(':checked'))
	{
		switch(day)
		{
			case 'monday':
				$("#hours option[value = '2']").attr('disabled', true); // 11:30
				break;
			case 'wednesday':
				$("#hours option[value = '4']").attr('disabled', true); // 2:30
				$("#hours option[value = '5']").attr('disabled', true); // 4:00
				break;
			case 'friday':
				$("#hours option[value = '0']").attr('disabled', true); // 8:30
				$("#hours option[value = '1']").attr('disabled', true); // 10:00
				break;
		}

	}
}
/*************************************************************************/



/****************************** Calendar Handles ******************************/
function updateCalendar()
{
//	var slots = new Array(5);
	var servletUrl = 'calendarDisplay';

/*	for (var i = 0; i < 5; ++i)
	{
		slots[i] = new Array(7);
	}
*/
	emptyCalendar();

	$.getJSON(servletUrl, function(key, value) // Calls up Java doGet with parameters
	{
		$('#M1').text(value.M1);
		$('#T1').text(value.T1);
		$('#W1').text(value.W1);
		$('#H1').text(value.H1);
		$('#F1').text(value.F1);

		$('#M2').text(value.M2);
		$('#T2').text(value.T2);
		$('#W2').text(value.W2);
		$('#H2').text(value.H2);
		$('#F2').text(value.F2);

		$('#M3').text(value.M3);
		$('#T3').text(value.T3);
		$('#W3').text(value.W3);
		$('#H3').text(value.H3);
		$('#F3').text(value.F3);

		$('#M4').text(value.M4);
		$('#T4').text(value.T4);
		$('#W4').text(value.W4);
		$('#H4').text(value.H4);
		$('#F4').text(value.F4);

		$('#M5').text(value.M5);
		$('#T5').text(value.T5);
		$('#W5').text(value.W5);
		$('#H5').text(value.H5);
		$('#F5').text(value.F5);

		$('#M6').text(value.M6);
		$('#T6').text(value.T6);
		$('#W6').text(value.W6);
		$('#H6').text(value.H6);
		$('#F6').text(value.F6);

		$('#M7').text(value.M7);
		$('#T7').text(value.T7);
		$('#W7').text(value.W7);
		$('#H7').text(value.H7);
		$('#F7').text(value.F7);
	});

}

function emptyCalendar()
{
	for(i = 1; i <=7; ++i)
	{
		$('#M' + i).text("");
		$('#T' + i).text("");
		$('#W' + i).text("");
		$('#H' + i).text("");
		$('#F' + i).text("");
	}
}
/*************************************************************************/



/************* Right side above the calendar to handle displaying
	professor selected, semester selected, and teachings of professor ****/
function semesterDisplay()
{
	var servletUrl = 'semesterDisplay';

	$.getJSON(servletUrl, function(key, value) // Calls up Java doGet with parameters
	{
		$('#semesterDisplay').text("Semester: " + value);
	});

	// If a semester is selected, clear professor name and counts
	$('#professorDisplay').text("");
	$('#coursesCount').text("");

}

function professorDisplay()
{
	var servletUrl = 'professorDisplay';

	$.getJSON(servletUrl, function(key, value) // Calls up Java doGet with parameters
	{
		$('#professorDisplay').text("Professor: " + value);
	});
}

function updateProfessorCoursesCount()
{
	var servletUrl = 'coursesCount';
	var current;
	var minimum;
	var maximum;
	var output = "Courses Teaching: " + current +
					" (Min: " + minimum + ", Max: " + maximum + ")";

	$.getJSON(servletUrl, function(key, value) // Calls up Java doGet with parameters
	{
		current = value.current;
		minimum = value.min;
		maximum = value.max;

		$('#coursesCount').text(output);
	});
}
/*************************************************************************/



/****************************** BUTTONS ******************************/
function submitSchedule()
{
	var servletUrl = 'submitSchedule';
	var dayChecked = 0;

	if($('#monday').is(':checked'))
	{
		dayChecked = 0";
	}

	if($('#tuesday').is(':checked'))
	{
		dayChecked = 1;
	}

	if($('#wednesday').is(':checked'))
	{
		dayChecked = dayChecked + 2;
	}

	if($('#thursday').is(':checked'))
	{
		dayChecked = dayChecked + 4;
	}

	if($('#friday').is(':checked'))
	{
		dayChecked = dayChecked + 8;
	}


	$.post(servletUrl,                   // Should call up Java doPost with requesting parameters
		{                                    // of the below for validation and input to database
			semester:  $('#semester').val(),
			professor: $('#professor').val(),
			course:    $('#course').val(),
			room:      $('#room').val(),
			day:       dayChecked,
			hours:     $('#hours').val()
		}, function() { alert("The schedule has been updated"); }
	);


	/*$.ajax(servletUrl,                     // Should call up Java doPost with requesting parameters
	{                                      // of the below for validation and input to database
		semester:  $('#semester').val(),
		professor: $('#professor').val(),
		course:    $('#course').val(),
		room:      $('#room').val(),
		day:       dayChecked,
		hours:     $('#hours').val()
	});*/


	//$.get(servletUrl, {	});
	//$.ajax({data: JSON.stringify($('#M1')), contentType : 'application/json', type : 'POST'});


	updateProfessorCoursesCount();
	updateCalendar();

	alert("Success?");
}

function deleteSchedule()
{
	var servletUrl = 'deleteSchedule';
	var dayChecked = 0;

	if($('#monday').is(':checked'))
	{
		dayChecked = 0";
	}

	if($('#tuesday').is(':checked'))
	{
		dayChecked = 1;
	}

	if($('#wednesday').is(':checked'))
	{
		dayChecked = dayChecked + 2;
	}

	if($('#thursday').is(':checked'))
	{
		dayChecked = dayChecked + 4;
	}

	if($('#friday').is(':checked'))
	{
		dayChecked = dayChecked + 8;
	}


	$.post(servletUrl,
		{
			semester:  $('#semester').val(),
			professor: $('#professor').val(),
			course:    $('#course').val(),
			room:      $('#room').val(),
			day:       dayChecked,
			hours:     $('#hours').val()
		}, function() { alert("The schedule has been updated"); }
	);


	/*$.ajax(servletUrl,
	{
		semester:  $('#semester').val(),
		professor: $('#professor').val(),
		course:    $('#course').val(),
		room:      $('#room').val(),
		day:       dayChecked,
		hours:     $('#hours').val()
	});*/

	updateProfessorCoursesCount();
	updateCalendar();

	alert("Success?");
}

function submitPreference()
{
	var servletUrl = 'submitPreference';


	$.post(servletUrl,
		{
			semester:  $('#semester').val(),
			professor: $('#professor').val(),
			prefDay:   $('#prefDay').val(),
			prefHours: $('#prefHours').val()
		}, function() { alert("The schedule has been updated"); }
	);


	/*$.ajax(servletUrl,
	{
		semester:  $('#semester').val(),
		professor: $('#professor').val(),
		prefDay:   $('#prefDay').val(),
		prefHours: $('#prefHours').val()
	});*/


	updateCalendar();

	alert("Success?");
}

function deletePreference()
{
	var servletUrl = 'deletePreference';

	$.post(servletUrl,
		{
			semester:  $('#semester').val(),
			professor: $('#professor').val(),
			prefDay:   $('#prefDay').val(),
			prefHours: $('#prefHours').val()
		}, function() { alert("The schedule has been updated"); }
	);


	/*$.ajax(servletUrl,
	{
		semester:  $('#semester').val(),
		professor: $('#professor').val(),
		course:    $('#prefDay').val(),
		room:      $('#prefHours').val()
	});*/

	updateCalendar();

	alert("Success?");
}
/*************************************************************************/
