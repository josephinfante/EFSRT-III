export interface Employee {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string | null;
	hire_at: number;
	position: string;
	salary: number;
	department_id: string | null;
	status: string;
	created_at: number;
	updated_at: number | null;
}
