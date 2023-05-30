import React, { FC, ReactNode, useContext, useRef } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import classNames from 'classnames';
import ThemeContext from '../../context/themeContext';
import useAsideTouch from '../../hooks/useAsideTouch';
import useMounted from '../../hooks/useMounted';
import Tooltips from '../../components/bootstrap/Tooltips';

interface IAsideHeadProps {
	children: ReactNode;
}
export const AsideHead: FC<IAsideHeadProps> = ({ children }) => {
	return <div className='aside-head'>{children}</div>;
};

interface IAsideBodyProps {
	children: ReactNode;
}
export const AsideBody: FC<IAsideBodyProps> = ({ children }) => {
	return <div className='aside-body'>{children}</div>;
};

interface IAsideFootProps {
	children: ReactNode;
}
export const AsideFoot: FC<IAsideFootProps> = ({ children }) => {
	return <div className='aside-foot'>{children}</div>;
};

interface IAsideProps {
	children: any;
}
const Aside: FC<IAsideProps> = ({ children }) => {
	const { asideStatus } = useContext(ThemeContext);

	const { asideStyle, touchStatus, hasTouchButton, asideWidthWithSpace, x } = useAsideTouch();

	const isModernDesign = process.env.NEXT_PUBLIC_MODERN_DESGIN === 'true';

	const constraintsRef = useRef(null);

	const { mounted } = useMounted();

	return (
		<>
			<motion.aside
				style={mounted ? (asideStyle as MotionStyle) : undefined}
				className={classNames('aside', {
					open: mounted && asideStatus,
					'aside-touch-bar': mounted && hasTouchButton && isModernDesign,
					'aside-touch-bar-close':
						mounted && !touchStatus && hasTouchButton && isModernDesign,
					'aside-touch-bar-open':
						mounted && touchStatus && hasTouchButton && isModernDesign,
				})}>
				{children}
			</motion.aside>
			{mounted && asideStatus && hasTouchButton && isModernDesign && (
				<>
					<motion.div className='aside-drag-area' ref={constraintsRef} />
					<Tooltips title='Toggle Aside' flip={['top', 'right']}>
						<motion.div
							className='aside-touch'
							drag='x'
							whileDrag={{ scale: 1.2 }}
							whileHover={{ scale: 1.1 }}
							dragConstraints={constraintsRef}
							// onDrag={(event, info) => console.log(info.point.x, info.point.y)}
							dragElastic={0.1}
							style={{ x, zIndex: 1039 }}
							onClick={() => x.set(x.get() === 0 ? asideWidthWithSpace : 0)}
						/>
					</Tooltips>
				</>
			)}
		</>
	);
};

export default Aside;
