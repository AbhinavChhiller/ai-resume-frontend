export default {
	firstName: "James",
	lastName: "Carter",
	jobTitle: "Full Stack Developer",
	address: "525 N Tryon Street, NC 28117",
	phone: "1234567890",
	email: "example@gmail.com",
	themeColor: "#ff6666",
	summary:
		"Experienced full stack developer with expertise in modern web technologies and scalable systems.",

	experience: [
		{
			id: 1,
			title: "Full Stack Developer",
			companyName: "Amazon",
			city: "New York",
			state: "NY",
			startDate: "Jan 2021",
			endDate: "",
			currentlyWorking: true,
			workSummary: `Designed, developed, and maintained full-stack web applications.
    - Implemented responsive user interfaces with React.
    - Built RESTful APIs using Node.js and Express.
    - Collaborated with cross-functional teams using Agile methodologies.`,
		},
		{
			id: 2,
			title: "Frontend Developer",
			companyName: "Google",
			city: "Mountain View",
			state: "CA",
			startDate: "Jun 2019",
			endDate: "Dec 2020",
			currentlyWorking: false,
			workSummary: `Developed modern, accessible web UI using Angular and TypeScript.
    - Optimized components for maximum performance.
    - Led frontend architecture planning sessions.
    - Wrote unit tests and participated in code reviews.`,
		},
	],

	education: [
		{
			id: 1,
			universityName: "University of North Carolina",
			degree: "Bachelor of Science",
			major: "Computer Science",
			city: "Charlotte",
			state: "NC",
			startDate: "2016",
			endDate: "2020",
			description:
				"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
		},
	],

	skills: [
		"JavaScript",
		"React",
		"Node.js",
		"Express",
		"MongoDB",
		"HTML/CSS",
		"Git",
		"REST APIs",
	],
};
