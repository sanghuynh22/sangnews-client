export interface User {
	name: string;
	password: string;
	role: string;
	views_id?: number;
}

export interface News {
	id?: number;
	title?: string;
	content?: string;
	image?: string;
	id_user?: number;
	created_at?: Date | undefined;
	views?: number;
}

export interface FastNews {
	content?: string;
	id_user?: number;
	created_at?: Date | undefined;
}
