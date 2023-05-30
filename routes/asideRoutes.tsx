import React from 'react';
import { demoPagesMenu, pageLayoutTypesPagesMenu } from '../menu';
import DefaultAside from '../pages/_layout/_asides/DefaultAside';

const asides = [
	{ path: demoPagesMenu.login.path, element: null, exact: true },
	{ path: demoPagesMenu.signUp.path, element: null, exact: true },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null, exact: true },
	{ path: '/*', element: <DefaultAside />, exact: true },
];

export default asides;
