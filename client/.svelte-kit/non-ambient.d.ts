
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
		RouteId(): "/" | "/connection" | "/cours" | "/cours/[slug]" | "/register" | "/tableau-de-bord" | "/tableau-de-bord/admin" | "/tableau-de-bord/instructor" | "/tableau-de-bord/student";
		RouteParams(): {
			"/cours/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/connection": Record<string, never>;
			"/cours": { slug?: string };
			"/cours/[slug]": { slug: string };
			"/register": Record<string, never>;
			"/tableau-de-bord": Record<string, never>;
			"/tableau-de-bord/admin": Record<string, never>;
			"/tableau-de-bord/instructor": Record<string, never>;
			"/tableau-de-bord/student": Record<string, never>
		};
		Pathname(): "/" | "/connection" | "/cours" | `/cours/${string}` & {} | "/register" | "/tableau-de-bord/admin" | "/tableau-de-bord/instructor" | "/tableau-de-bord/student";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}