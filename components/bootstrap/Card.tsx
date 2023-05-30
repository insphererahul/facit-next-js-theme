import React, {
	Children,
	FC,
	forwardRef,
	HTMLAttributes,
	memo,
	ReactElement,
	ReactNode,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import TagWrapper from '../TagWrapper';
import Icon from '../icon/Icon';
import Button from './Button';
import PrismCode from '../extras/PrismCode';
import { TColor } from '../../type/color-type';
import { TIcons } from '../../type/icons-type';
import { TCardBorderSize, TCardShadow, TCardSize } from '../../type/card-type';

interface ICardLabelProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children:
		| ReactElement<ICardTitleProps>
		| ReactElement<ICardTitleProps>[]
		| ReactElement<ICardSubTitleProps>
		| ReactElement<ICardSubTitleProps>[]
		| ReactNode;
	icon?: TIcons;
	iconColor?: null | TColor;
	pre?: ReactNode;
}
export const CardLabel = forwardRef<HTMLDivElement, ICardLabelProps>(
	({ tag = 'div', className, children, icon, iconColor = 'primary', pre, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-label', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{pre}
				{icon && (
					<Icon
						icon={icon}
						className={classNames('card-icon', { [`text-${iconColor}`]: iconColor })}
					/>
				)}
				<div className='card-title-wrapper'>{children}</div>
			</TagWrapper>
		);
	},
);
CardLabel.displayName = 'CardLabel';
CardLabel.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
	icon: PropTypes.string,
	iconColor: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	pre: PropTypes.node,
};

interface ICardActionsProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode;
}
export const CardActions = forwardRef<HTMLDivElement, ICardActionsProps>(
	({ tag = 'div', className, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-actions', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardActions.displayName = 'CardActions';
CardActions.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
};

interface ICardTitleProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode;
}
export const CardTitle = forwardRef<HTMLDivElement, ICardTitleProps>(
	({ tag = 'h5', className, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-title', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardTitle.displayName = 'CardTitle';
CardTitle.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
};

interface ICardSubTitleProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode;
}
export const CardSubTitle = forwardRef<HTMLDivElement, ICardSubTitleProps>(
	({ tag = 'h6', className, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-subtitle', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardSubTitle.displayName = 'CardSubTitle';
CardSubTitle.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
};

interface ICardHeaderProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children:
		| ReactElement<ICardLabelProps>
		| ReactElement<ICardLabelProps>[]
		| ReactElement<ICardActionsProps>
		| ReactElement<ICardActionsProps>[]
		| ReactNode;
	size?: TCardSize;
	borderSize?: TCardBorderSize;
	borderColor?: null | TColor;
}
export const CardHeader = forwardRef<HTMLDivElement, ICardHeaderProps>(
	({ tag = 'div', className, children, size, borderSize, borderColor, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card-header',
					{
						[`card-header-${size}`]: size,
						[`card-header-border-${borderSize}`]: borderSize,
						[`card-header-border-${borderColor}`]: borderColor,
					},

					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardHeader.displayName = 'CardHeader';
CardHeader.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
	borderSize: PropTypes.oneOf([null, 0, 1, 2, 3, 4, 5]),
	borderColor: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	size: PropTypes.oneOf([null, 'sm', 'lg']),
};

interface ICardBodyProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	isScrollable?: boolean;
	children: ReactNode;
}
export const CardBody = forwardRef<HTMLDivElement, ICardBodyProps>(
	({ tag = 'div', className, isScrollable, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card-body',
					{ 'card-body-scrollable': isScrollable },
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardBody.displayName = 'CardBody';
CardBody.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
	isScrollable: PropTypes.bool,
};

interface ICardCodeViewProps {
	children: string;
	language?: string;
	customStyle?: object;
	isPrismJs?: boolean;
	className?: string;
}
export const CardCodeView: FC<ICardCodeViewProps> = memo(
	({ children, language = 'jsx', customStyle, isPrismJs = true, className }) => {
		if (isPrismJs) {
			return (
				<PrismCode
					code={children}
					language={language}
					className={classNames('my-0', className)}
					style={customStyle}
				/>
			);
		}
		return (
			<SyntaxHighlighter
				language={language}
				style={atomOneLight}
				customStyle={{
					borderRadius: 13,
					backgroundColor: 'var(--bs-light)',
					fontSize: '1rem',
					padding: '1.5rem 2rem',
					...customStyle,
				}}
				wrapLongLines
				PreTag='code'
				className={classNames('shadow-sm', className)}>
				{children}
			</SyntaxHighlighter>
		);
	},
);
CardCodeView.displayName = 'CardCodeView';
CardCodeView.propTypes = {
	children: PropTypes.string.isRequired,
	language: PropTypes.string,
	isPrismJs: PropTypes.bool,
	className: PropTypes.string,
	// eslint-disable-next-line react/forbid-prop-types
	customStyle: PropTypes.object,
};

interface ICardFooterLeftProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode;
}
export const CardFooterLeft = forwardRef<HTMLDivElement, ICardFooterLeftProps>(
	({ tag = 'div', className, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-footer-left', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardFooterLeft.displayName = 'CardFooterLeft';
CardFooterLeft.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
};

interface ICardFooterRightProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode;
}
export const CardFooterRight = forwardRef<HTMLDivElement, ICardFooterRightProps>(
	({ tag = 'div', className, children, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-footer-right', className)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardFooterRight.displayName = 'CardFooterRight';
CardFooterRight.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
};

interface ICardFooterProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children:
		| ReactElement<ICardFooterLeftProps>
		| ReactElement<ICardFooterLeftProps>[]
		| ReactElement<ICardFooterRightProps>
		| ReactElement<ICardFooterRightProps>[];
	size?: TCardSize;
	borderSize?: TCardBorderSize;
	borderColor?: null | TColor;
}
export const CardFooter = forwardRef<HTMLDivElement, ICardFooterProps>(
	({ tag = 'div', className, children, size, borderSize, borderColor, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card-footer',
					{
						[`card-footer-${size}`]: size,
						[`card-footer-border-${borderSize}`]: borderSize,
						[`card-footer-border-${borderColor}`]: borderColor,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);
CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.string,
	borderSize: PropTypes.oneOf([null, 0, 1, 2, 3, 4, 5]),
	borderColor: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	size: PropTypes.oneOf([null, 'sm', 'lg']),
};

interface ICardTabItemProps {
	id: string;
	title: string;
	icon?: TIcons;
	children: ReactNode;
}
export const CardTabItem: FC<ICardTabItemProps> = ({ id, title, icon, children }) => {
	throw new Error(
		`Title ${title} component should be used as a child in the component Card.Id: ${id}, Icon Name: ${icon}, Children: ${children},`,
	);
};
CardTabItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export interface ICardProps extends HTMLAttributes<HTMLElement> {
	tag?: string | null;
	className?: string;
	children: ReactNode | ReactNode[];
	hasTab?: boolean;
	tabButtonColor?: TColor;
	tabBodyClassName?: string;
	shadow?: TCardShadow;
	borderSize?: TCardBorderSize;
	borderColor?: null | TColor;
	stretch?: boolean | 'full' | 'semi' | null;
	isCompact?: boolean;
	onSubmit?(...args: unknown[]): unknown;
	noValidate?: true;
}
const Card = forwardRef<HTMLDivElement, ICardProps>(
	(
		{
			tag = 'div',
			className,
			children,
			hasTab,
			tabButtonColor = 'primary',
			tabBodyClassName,
			shadow,
			borderSize,
			borderColor,
			stretch,
			isCompact,
			...props
		},
		ref,
	) => {
		const [activeTab, setActiveTab] = useState<number>(0);
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card',
					{
						[`card-stretch-${stretch === 'semi' ? 'semi' : 'full'}`]: stretch,
						'card-compact': isCompact,
						[`shadow${shadow !== 'md' ? `-${shadow}` : ''}`]:
							!!shadow && shadow !== '3d',
						[`u-shadow-3d--primary-sm`]: shadow === '3d',
						border: borderSize || borderSize === 0,
						[`border-${borderSize}`]: borderSize || borderSize === 0,
						[`border-${borderColor}`]: borderColor,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{!hasTab ? (
					children
				) : (
					<>
						<CardHeader borderSize={1}>
							<CardActions>
								{Children.map(children, (item, index) => (
									<Button
										// @ts-ignore
										key={item.props.id}
										isLight
										color={index === activeTab ? tabButtonColor : 'light'}
										role='tab'
										// @ts-ignore
										aria-controls={item.props.id}
										aria-selected={index === activeTab}
										isActive={index === activeTab}
										// @ts-ignore
										icon={item.props.icon || null}
										onClick={() => setActiveTab(index)}>
										{/* @ts-ignore */}
										{item.props.title}
									</Button>
								))}
							</CardActions>
						</CardHeader>
						{Children.map(children, (item, index) => {
							if (activeTab === index) {
								return (
									<CardBody
										// @ts-ignore
										key={item.props.id}
										role='tabpanel'
										// @ts-ignore
										aria-labelledby={item.props.id}
										className={tabBodyClassName}>
										{/* @ts-ignore */}
										{item.props.children}
									</CardBody>
								);
							}
							return null;
						})}
					</>
				)}
			</TagWrapper>
		);
	},
);
Card.displayName = 'Card';
Card.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	shadow: PropTypes.oneOf([null, 'none', 'sm', 'md', 'lg', '3d']),
	borderSize: PropTypes.oneOf([null, 0, 1, 2, 3, 4, 5]),
	borderColor: PropTypes.oneOf([
		null,
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	tag: PropTypes.string,
	hasTab: PropTypes.bool,
	tabButtonColor: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
	tabBodyClassName: PropTypes.string,
	// @ts-ignore
	stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['full', 'semi'])]),
	isCompact: PropTypes.bool,
};

export default Card;
