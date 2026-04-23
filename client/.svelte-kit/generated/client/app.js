export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17')
];

export const server_loads = [0];

export const dictionary = {
		"/": [2],
		"/accessibilite": [3],
		"/conditions": [4],
		"/connection": [5],
		"/contact": [6],
		"/cours": [7],
		"/cours/[slug]": [8],
		"/mentions-legales": [9],
		"/plan-du-site": [10],
		"/profil": [11],
		"/protection-donnees": [12],
		"/register": [13],
		"/tableau-de-bord": [14],
		"/tableau-de-bord/admin": [15],
		"/tableau-de-bord/instructor": [16],
		"/tableau-de-bord/student": [17]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';