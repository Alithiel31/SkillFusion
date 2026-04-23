
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/accessibilite" | "/conditions" | "/connection" | "/contact" | "/cours" | "/cours/[slug]" | "/mentions-legales" | "/plan-du-site" | "/profil" | "/protection-donnees" | "/register" | "/tableau-de-bord" | "/tableau-de-bord/admin" | "/tableau-de-bord/instructor" | "/tableau-de-bord/student";
		RouteParams(): {
			"/cours/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/accessibilite": Record<string, never>;
			"/conditions": Record<string, never>;
			"/connection": Record<string, never>;
			"/contact": Record<string, never>;
			"/cours": { slug?: string };
			"/cours/[slug]": { slug: string };
			"/mentions-legales": Record<string, never>;
			"/plan-du-site": Record<string, never>;
			"/profil": Record<string, never>;
			"/protection-donnees": Record<string, never>;
			"/register": Record<string, never>;
			"/tableau-de-bord": Record<string, never>;
			"/tableau-de-bord/admin": Record<string, never>;
			"/tableau-de-bord/instructor": Record<string, never>;
			"/tableau-de-bord/student": Record<string, never>
		};
		Pathname(): "/" | "/accessibilite" | "/conditions" | "/connection" | "/contact" | "/cours" | `/cours/${string}` & {} | "/mentions-legales" | "/plan-du-site" | "/profil" | "/protection-donnees" | "/register" | "/tableau-de-bord" | "/tableau-de-bord/admin" | "/tableau-de-bord/instructor" | "/tableau-de-bord/student";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}