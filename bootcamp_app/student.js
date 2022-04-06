const { Pool } = require("pg");
const argv = process.argv.slice(2);

const cohort_name = argv[0];
const limit = argv[1] || 5;
const values = [`%${cohort_name}%`, limit];

const pool = new Pool({
	user: "vagrant",
	password: "123",
	host: "localhost",
	database: "bootcampx",
});

pool.connect();
const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort 
FROM students
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

pool
	.query(queryString, values)
	.then(res => {
		res.rows.forEach(user => {
			console.log(
				`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
			);
		});
	})
	.catch(err => console.error("query error", err.stack));
