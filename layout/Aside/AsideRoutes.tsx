import React from 'react';
import { useRouter } from 'next/router';
import asides from '../../routes/asideRoutes';
import { pathToRoute } from '../../helpers/helpers';
import Mounted from '../../components/Mounted';

const AsideRoutes = () => {
	const router = useRouter();

	const PAGE = asides.find((key) => {
		return key.path.substring(key.path?.length - 2) === '/*'
			? router.pathname.includes(key.path.substring(0, key.path?.length - 2))
			: key.path === pathToRoute(router.pathname);
	});

	if (PAGE) return <Mounted>{PAGE?.element}</Mounted>;
	return null;
};

export default AsideRoutes;
