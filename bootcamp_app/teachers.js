const { Pool } = require("pg");
const argv = process.argv.slice(2);

const cohort_name = argv[0];
const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});

pool.connect();

pool
	.query(
		`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${cohort_name}'
ORDER BY teacher;
`
	)
	.then(res => {
		res.rows.forEach(row => {
			console.log(`${row.cohort}: ${row.teacher}`);
		});
	})
	.catch(err => console.error("query error", err.stack));
