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
		if(!$("#hours option[value = '-1']").is(':selected'))
		{
			submitSchedule();
		}
		else
		{
			alert("You must select an hour time slot.");
		}
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
	var slots = new Array(5);

	for (var i = 0; i < 5; ++i)
	{
		slots[i] = new Array(5);
	}

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

	$.getJSON(servletUrl, function(semesterDisplay) // Calls up Java doGet with parameters
	{
		$("#semesterDisplay").text("Semester: " + semesterDisplay);
	}

	// If a semester is selected, clear professor name and counts
	$("#professorDisplay").text("");
	$("#coursesCount").text("");

}

function professorDisplay()
{
	var servletUrl = 'professorDisplay';

	$.getJSON(servletUrl, function(professorDisplay) // Calls up Java doGet with parameters
	{
		$("#professorDisplay").text("Professor: " + professorDisplay);
	}
}

function updateProfessorCoursesCount()
{
	var servletUrl = 'coursesCount';
	var current;
	var minimum;
	var maximum;
	var output = "Courses Teaching: " + current +
					" (Min: " + minimum + ", Max: " + maximum + ")";

	$.getJSON(servletUrl, function(coursesCount) // Calls up Java doGet with parameters
	{
		current = coursesCount.current;
		minimum = coursesCount.min;
		maximum = coursesCount.max;

		$("#coursesCount").text(output);
	}
}
/*************************************************************************/



/****************************** Buttons ******************************/
function submitSchedule()
{
	var servletUrl = 'submitSchedule';

	$.getJSON(servletUrl, function(submitSchedule) // Calls up Java doGet with parameters
	{

	}

	updateProfessorCoursesCount()

}

function deleteSchedule()
{
	var servletUrl = 'deleteSchedule';

	$.getJSON(servletUrl, function(deleteSchedule) // Calls up Java doGet with parameters
	{

	}

	updateProfessorCoursesCount()
}

function submitPreference()
{
	var servletUrl = 'submitPreference';

	$.getJSON(servletUrl, function(submitPreference) // Calls up Java doGet with parameters
	{

	}
}

function deletePreference()
{
	var servletUrl = 'deletePreference';

	$.getJSON(servletUrl, function(deletePreference) // Calls up Java doGet with parameters
	{

	}
}
/*************************************************************************/
