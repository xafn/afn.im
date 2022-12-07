//---Lanyard Interfaces---
export interface Spotify {
	track_id: string;
	timestamps: Timestamps;
	song: string;
	artist: string;
	album_art_url: string;
	album: string;
}

export interface Timestamps {
	start: number;
	end: number;
}
//--------------------------
export interface Repo {
	owner: string;
	repo: string;
	link: string;
	description: string;
	image: string;
	website: string;
	language: string;
	languageColor: string;
	stars: string;
	forks: any;
}
