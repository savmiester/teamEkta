<!-- Schedule Management -->

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"
  xmlns:c="http://java.sun.com/jsp/jstl/core"
  version="2.0">

<html>
<head>
	<style type = "text/css" media = "screen">@import url("main.css");@import url("schedule_management.css");</style>

	<script src = "http://code.jquery.com/jquery-latest.min.js"></script>
	<script src = "main.js"></script>
</head>

<body>

	<div id = "container">



		<!---------------------- Top part of the page ---------------------->

		<div id = "header">
			<noscript>You MUST have javascript enabled on this page or it will not be functional!!</noscript>
			<h2 id = "windowSize"></h2>

			<div id = "banner">University Course Scheduler</div>

			<div id = "menu">
				<b>Schedule Management</b> &nbsp; | &nbsp;
				<a href = "administration.jsp">Administration</a> &nbsp; | &nbsp;
				<a href = "reports.jsp">Reports</a>
			</div>

		</div>
		



		<!--<<<<<<<<<<<<<<<<<<<< Left side of the page <<<<<<<<<<<<<<<<<<<<-->

		<div id = "sideInput">

			<!-- Semester -->
			<select id = "semester" name = "semester">
				<option value = "-1" selected>Semester</option>
				<c:forEach items="${semester}" var="option">
					<option value="${option.key}" ${param.semester == option.key ? 'selected' : ''}>${option.value}</option>
				</c:forEach>
			</select>

			<!-- Professor Name -->
			<select id = "professor" name = "professor" disabled>
				<option value = "-1" selected>Professor</option>
			</select>


			<!--@@@@@@@@@@@@@@@@@@@ PROFESSOR SCHEDULER @@@@@@@@@@@@@@@@@@@-->
			<div id = "professorScheduler">
				<label>Schedule</label>

				<!-- Course -->
				<select id = "course" disabled>
					<option value = "-1" selected>Course:Section</option>
				</select>

				<!-- Room -->
				<select id = "room" disabled>
					<option value = "-1" selected>Room</option>
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
							<td><input name = "monday" id = "monday" type = "checkbox"  disabled></td>
							<td><input name = "tuesday" id = "tuesday" type = "checkbox"  disabled></td>
							<td><input name = "wednesday" id = "wednesday" type = "checkbox"  disabled></td>
							<td><input name = "thursday" id = "thursday" type = "checkbox"  disabled></td>
							<td><input name = "friday" id = "friday" type = "checkbox"  disabled></td>
						</tr>
					</table>

				<!-- Time -->
				<select id = "hours" disabled>
					<option value = "-1" selected>Hours</option>
					<option value = "0" disabled>8:30AM - 10:00AM</option>
					<option value = "1" disabled>10:00AM - 11:30AM</option>
					<option value = "2" disabled>11:30AM - 1:00PM</option>
					<option value = "3" disabled>1:00PM - 2:30PM</option>
					<option value = "4" disabled>2:30PM - 4:00PM</option>
					<option value = "5" disabled>4:00PM - 5:30PM</option>
					<option value = "6" disabled>6:00PM - 9:00PM</option>
				</select>

				<button id = "submitSchedule" name = "submitSchedule" type = "submit" disabled>Submit</button>

				<button id = "deleteSchedule" name = "deleteSchedule" type = "submit" disabled>Delete</button>

			</div>
		

			<!--@@@@@@@@@@@@@@@@@@@ PROFESSOR PREFERENCES @@@@@@@@@@@@@@@@@@@-->
			<div id = "professorPreferences" disabled>
				<label>Professor Preference</label>

				<!-- Days -->
				<select id = "prefDay" disabled>
					<option value = "-1" selected>Day</option>
				</select>

				<!-- Hours -->
				<select id = "prefHours" disabled>
					<option value = "-1" selected>Hours</option>
				</select>

				<button id = "submitPreference" name = "submitPreference" type = "submit" disabled>Submit</button>
				<button id = "deletePreference" name = "deletePreference" type = "submit" disabled>Delete</button>
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
						<td id = "professorDisplay"></td>
						<td id = "semesterDisplay" align = "right"></td>
					</tr>
					<tr>
						<td id = "coursesCount"></td>
					</tr>
				</table>


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
						<td id = "M1"></td>
						<td id = "T1"></td>
						<td id = "W1"></td>
						<td id = "H1"></td>
						<td id = "F1"></td>
					</tr>

					<tr>
						<td>10:00AM - 11:30AM</td>
						<td id = "M2"></td>
						<td id = "T2"></td>
						<td id = "W2"></td>
						<td id = "H2"></td>
						<td id = "F2"></td>
					</tr>

					<tr>
						<td>11:30AM - 1:00PM</td>
						<td id = "M3"></td>
						<td id = "T3"></td>
						<td id = "W3"></td>
						<td id = "H3"></td>
						<td id = "F3"></td>
					</tr>

					<tr>
						<td>1:00PM - 2:30PM</td>
						<td id = "M4"></td>
						<td id = "T4"></td>
						<td id = "W4"></td>
						<td id = "H4"></td>
						<td id = "F4"></td>
					</tr>

					<tr>
						<td>2:30PM - 4:00PM</td>
						<td id = "M5"></td>
						<td id = "T5"></td>
						<td id = "W5"></td>
						<td id = "H5"></td>
						<td id = "F5"></td>
					</tr>

					<tr>
						<td>4:00PM - 5:30PM</td>
						<td id = "M6"></td>
						<td id = "T6"></td>
						<td id = "W6"></td>
						<td id = "H6"></td>
						<td id = "F6"></td>
					</tr>

					<tr>
						<td>6:00PM - 9:00PM</td>
						<td id = "M7"></td>
						<td id = "T7"></td>
						<td id = "W7"></td>
						<td id = "H7"></td>
						<td id = "F7"></td>
					</tr>
				</table>	

			</div>

		</div>


		<div id = "footer">
			Copyright 2012 Ektha<br>
			Designed and developed for CS683 - Software Project Management Fall 2012 project at <a href = "http://www.njit.edu/" target = "_blank">NJIT</a>.
		</div>
		
	</div>


</body>
</html>