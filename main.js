// Servlet on the server should be mapped on an url-pattern of /myservlet
/*$.get('myservlet', function(data) {
	alert(data);
});*/


$(document).ready(function()
{
	$('#semester').change(function() { fillOptions('professor'); });

	$('#professor').change(function() { fillOptions('course'); });
	$('#course').change(function() { fillOptions('room'); });

	/* Course checkboxes for enabling/disabling certain time slots */
	$('#monday').click(function() { adjustHours('monday'); });
	$('#tuesday').click(function() { adjustHours('tuesday'); });
	$('#wednesday').click(function() { adjustHours('wednesday'); });
	$('#thursday').click(function() { adjustHours('thursday'); });
	$('#friday').click(function() { adjustHours('friday'); });



	$('#professor').change(function() { fillOptions('prefDay'); });
	$('#prefDay').change(function() { fillOptions('prefHours'); });

	$('#submitSchedule').click(function() { submitSchedule(); });
 });

function fillOptions(listId)
{
	var boxList = $('#' + listId);

	$.getJSON('schedule/options?box=' + boxList + '&val=' + $(this).val(), function(opts) // Calls up Java doGet with parameters
	{
		$('>option', boxList).remove(); // Clean old options first.
		if (opts)
		{
			$.each(opts, function(key, value)
			{
				boxList.append($('<option/>').val(key).text(value));
			});
			boxList.attr('disabled', false);
		}
		else
		{
			boxList.append($('<option/>').text("Please select parent"));
		}
	});

	alert("success");
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
				$("#hours option[value = '11:30']").attr("disabled", true);
				break;
			case 'wednesday':
				$("#hours option[value = '2:30']").attr("disabled", true);
				$("#hours option[value = '4:00']").attr("disabled", true);
				break;
			case 'friday':
				$("#hours option[value = '8:30']").attr("disabled", true);
				$("#hours option[value = '10:00']").attr("disabled", true);
				break;
		}

	}
}


function submitSchedule()
{

}