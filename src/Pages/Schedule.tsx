import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Information from "../components/Information";
import axios from "axios";
const Schedule: React.FC<any> = (): any => {
	const [currentDate, setCurrentDate] = useState<Date>(new Date());
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [events, setEvents] = useState([]);

	const fetchEvents = async (date: Date): Promise<void> => {
		try {
			const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
			const url = `${process.env.REACT_APP_SCHEDULE_URL}/calendarEvents?offsetTz=420&important=0&date=${formattedDate}`;
			const response = await axios.get(url);
			const data = await response.data.data.list;
			setEvents(data);
		} catch (error) {
			console.log("error schedule fetch: ", error);
		}
	};

	const startOfWeek: Date = new Date(
		currentDate.setDate(
			currentDate.getDate() -
				currentDate.getDay() +
				(currentDate.getDay() === 0 ? -6 : 1)
		)
	);

	const month: string = startOfWeek.toLocaleString("default", {
		month: "long",
	});
	const year: number = startOfWeek.getFullYear();

	const daysInWeek: Date[] = new Array(7)
		.fill(0)
		.map(
			(_, i) =>
				new Date(
					startOfWeek.getFullYear(),
					startOfWeek.getMonth(),
					startOfWeek.getDate() + i
				)
		);

	const handlePrevWeek = (): void => {
		const prevWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
		setCurrentDate(prevWeek);
	};

	const handleNextWeek = (): void => {
		const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
		setCurrentDate(nextWeek);
	};

	const handleSelectDate = async (date: Date): Promise<void> => {
		setSelectedDate(date);
		fetchEvents(date);
	};
	useEffect(() => {
		fetchEvents(new Date());
	}, []);
	return (
		<div className="container" style={{ padding: "0 0 5px 0" }}>
			{/* Header */}
			<Header />

			{/* Calendar */}
			<div className="calendar-box-center">
				<div className="calendar-header">
					<h2>
						{month} {year}
					</h2>
				</div>
				<div className="calendar-grid">
					<div className="calendar-day">Mon</div>
					<div className="calendar-day">Tue</div>
					<div className="calendar-day">Wed</div>
					<div className="calendar-day">Thu</div>
					<div className="calendar-day">Fri</div>
					<div className="calendar-day">Sat</div>
					<div className="calendar-day">Sun</div>
					{daysInWeek.map((day: Date) => (
						<div
							key={day.toString()}
							className={`calendar-date ${
								day.toDateString() === selectedDate.toDateString()
									? "active"
									: ""
							}`}
							onClick={() => handleSelectDate(day)}
						>
							{day.getDate()}
						</div>
					))}
				</div>
				<div className="calendar-nav">
					<button onClick={handlePrevWeek}>{"<"}</button>
					<button onClick={handleNextWeek}>{">"}</button>
				</div>
			</div>

			{/* Information */}
			<>
				{events?.map(
					(even: any, i: any) =>
						even["content"] && (
							<Information
								key={i}
								flag={even.content[even.content.length - 1].country_flag}
								translate={even.content[even.content.length - 1].translate}
								previous={even.content[even.content.length - 1].previous}
								consensus={even.content[even.content.length - 1].consensus}
								actual={even.content[even.content.length - 1].actual}
								date={even.content[even.content.length - 1].pub_time}
							/>
						)
				)}
			</>
		</div>
	);
};

export default Schedule;
