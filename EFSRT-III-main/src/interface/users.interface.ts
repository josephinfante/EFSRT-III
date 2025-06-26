export interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	role_id: string;
	status: string;
	created_at: number;
	updated_at: number | null;
}
