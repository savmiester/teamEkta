<!-- Schedule Management -->

<html>
<head>
	<style type = "text/css" media = "screen">@import url("main.css");@import url("schedule_management.css");</style>
	<script src="main.js"></script>
</head>

<body>

	<div id = "container">



		<!---------------------- Top part of the page ---------------------->

		<div id = "header">
			<noscript>You MUST have javascript enabled on this page or it will not be functional!!</noscript>

			<div id = "banner">University Course Scheduler</div>

			<div id = "menu">
				<b>Schedule Management</b> &nbsp | &nbsp
				<a href = "administration.jsp">Administration</a> &nbsp | &nbsp
				<a href = "reports.jsp">Reports</a>
			</div>

		</div>
		



		<!--<<<<<<<<<<<<<<<<<<<< Left side of the page <<<<<<<<<<<<<<<<<<<<-->

		<div id = "sideInput">

			<!-- Semester -->
			<select id = "professorSchedulerSemester" onchange = "changeSemester();">
				<option>Semester</option>
				<%
					for(int i = 0; i < arraylist.size; ++i)
					{
						String semester = (String)list.get(i);
				%>
				<option value = "<%= semester%>"><%= semester%></option>
				<%
					}
				%>	
			</select>

			<!-- Professor Name -->
			<select id = "professorSchedulerProfessor">
				<option>Professor</option>
			</select>


			<!--@@@@@@@@@@@@@@@@@@@ PROFESSOR SCHEDULER @@@@@@@@@@@@@@@@@@@-->
			<div id = "professorScheduler">
				<label>Schedule</label>

				<!-- Course -->
				<select id = "professorSchedulerCourse">
					<option>Course:Section</option>
				</select>

				<!-- Room -->
				<select id = "professorSchedulerRoom">
					<option>Room</option>
				</select>

				<label>Select day(s):</label>
					<table>
						<tr>
							<td><label for = "monday">M</label></td>
							<td><label for = "tuesday">T</label></td>
							<td><label for = "wednesday">W</label></td>
							<td><label for = "thursday">Th</label></td>
							<td><label for = "friday">F</label></td>
						</tr>

						<tr>
							<td><input name = "monday" id = "monday" type = "checkbox"></td>
							<td><input name = "tuesday" id = "tuesday" type = "checkbox"></td>
							<td><input name = "wednesday" id = "wednesday" type = "checkbox"></td>
							<td><input name = "thursday" id = "thursday" type = "checkbox"></td>
							<td><input name = "friday" id = "friday" type = "checkbox"></td>
						</tr>
					</table>

				<!-- Time -->
				<select id = "professorSchedulerTime">
					<option>Hours</option>
				</select>

				<button name = "submitSchedule" type = "submit">Submit</button>

				<button name = "deleteSchedule" type = "submit">Delete</button>

			</div>
		

			<!--@@@@@@@@@@@@@@@@@@@ PROFESSOR PREFERENCES @@@@@@@@@@@@@@@@@@@-->
			<div id = "professorPreferences">
				<label>Professor Preference</label>

				<!-- Days -->
				<select id = "professorPreferencesDays">
					<option>Day</option>
				</select>

				<!-- Hours -->
				<select id = "professorPreferencesHours">
					<option>Hours</option>
				</select>

				<button name = "submitPreference" type = "submit">Submit</button>
				<button name = "deletePreference" type = "submit">Delete</button>
			</div>

		</div>






		<!------------------------ Right side of the page ------------------------>

		<div id = "content">


			<!--@@@@@@@@@@@@@@@@@@@ SCHEDULE TEXT @@@@@@@@@@@@@@@@@@@-->
			<div id = "scheduleText">
				Must perform in order of operation: choose semester,
				choose professor, then can either work on scheduling
				or preference.
				<br>
				Scheduling: Choose course and section, rooms available,
				day(s) depending on course chosen, and the time slot.
				<br>
				No Work Preference: Choose day and hours.
			</div>


			<!--@@@@@@@@@@@@@@@@@@@ PROFESSOR CALENDAR @@@@@@@@@@@@@@@@@@@-->
			<div id = "professorCalendar">
				<table>
					<tr>
						<td>
							<label>Professor: </label>
						</td>
						<td align = "right">
							<label>Semester: </label>
						</td>
					</tr>
				</table>
				<label>Courses Teaching:  </label> <label>(Min: </label> <label>, Max: </label> <label>)</label>


				<!-- Calendar table -->
				<table border = 1>
					<tr>
						<th width = 15%></th>
						<th width = 17%>Monday</th>
						<th width = 17%>Tuesday</th>
						<th width = 17%>Wednesday</th>
						<th width = 17%>Thursday</th>
						<th width = 17%>Friday</th>
					</tr>

					<tr>
						<td>8:30AM - 10:00AM</td>
						<td id = "M1">&nbsp</td>
						<td id = "T1">&nbsp</td>
						<td id = "W1">&nbsp</td>
						<td id = "H1">&nbsp</td>
						<td id = "F1">&nbsp</td>
					</tr>

					<tr>
						<td>10:00AM - 11:30AM</td>
						<td id = "M2">&nbsp</td>
						<td id = "T2">&nbsp</td>
						<td id = "W2">&nbsp</td>
						<td id = "H2">&nbsp</td>
						<td id = "F2">&nbsp</td>
					</tr>

					<tr>
						<td>11:30AM - 1:00PM</td>
						<td id = "M3">&nbsp</td>
						<td id = "T3">&nbsp</td>
						<td id = "W3">&nbsp</td>
						<td id = "H3">&nbsp</td>
						<td id = "F3">&nbsp</td>
					</tr>

					<tr>
						<td>1:00PM - 2:30PM</td>
						<td id = "M4">&nbsp</td>
						<td id = "T4">&nbsp</td>
						<td id = "W4">&nbsp</td>
						<td id = "H4">&nbsp</td>
						<td id = "F4">&nbsp</td>
					</tr>

					<tr>
						<td>2:30PM - 4:00PM</td>
						<td id = "M5">&nbsp</td>
						<td id = "T5">&nbsp</td>
						<td id = "W5">&nbsp</td>
						<td id = "H5">&nbsp</td>
						<td id = "F5">&nbsp</td>
					</tr>

					<tr>
						<td>4:00PM - 5:30PM</td>
						<td id = "M6">&nbsp</td>
						<td id = "T6">&nbsp</td>
						<td id = "W6">&nbsp</td>
						<td id = "H6">&nbsp</td>
						<td id = "F6">&nbsp</td>
					</tr>

					<tr>
						<td>6:00PM - 9:00PM</td>
						<td id = "M7">&nbsp</td>
						<td id = "T7">&nbsp</td>
						<td id = "W7">&nbsp</td>
						<td id = "H7">&nbsp</td>
						<td id = "F7">&nbsp</td>
					</tr>
				</table>	

			</div>

		</div>
	</div>


</body>
</html>