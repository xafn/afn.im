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

export interface Root {
	success: boolean;
	data: Data;
}

export interface Data {
	spotify: Spotify;
	listening_to_spotify: boolean;
	kv: Kv;
	discord_user: DiscordUser;
	discord_status: string;
	activities: Activity[];
	active_on_discord_web: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
}

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

export interface Kv {}

export interface DiscordUser {
	username: string;
	public_flags: number;
	id: string;
	display_name: any;
	discriminator: string;
	bot: boolean;
	avatar_decoration: any;
	avatar: string;
}

export interface Activity {
	type: number;
	timestamps: Timestamps2;
	sync_id: string;
	state: string;
	session_id: string;
	party: Party;
	name: string;
	id: string;
	flags: number;
	details: string;
	created_at: number;
	assets: Assets;
}

export interface Timestamps2 {
	start: number;
	end: number;
}

export interface Party {
	id: string;
}

export interface Assets {
	large_text: string;
	large_image: string;
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