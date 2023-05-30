import React, { cloneElement, forwardRef, HTMLAttributes, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface INavLinkDropdownProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactElement<INavItemProps>[] | ReactNode[] | string;
	className?: string;
}
export const NavLinkDropdown = forwardRef<HTMLSpanElement, INavLinkDropdownProps>(
	({ children, className, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={classNames('nav-link', 'cursor-pointer', className)}
				aria-current='page'
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</span>
		);
	},
);
NavLinkDropdown.displayName = 'NavLinkDropdown';
NavLinkDropdown.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

interface INavItemProps extends HTMLAttributes<HTMLLIElement> {
	children: ReactNode;
	className?: string;
	isActive?: boolean;
	isDisable?: boolean;
}
export const NavItem = forwardRef<HTMLLIElement, INavItemProps>(
	({ children, className, isActive, isDisable, ...props }, ref) => {
		// @ts-ignore
		if (children.type.displayName === 'Dropdown') {
			// @ts-ignore
			return cloneElement(children, {
				tag: 'li',
				// @ts-ignore
				className: classNames(children.props.className, 'nav-item'),
			});
		}
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<li ref={ref} className={classNames('nav-item', className)} {...props}>
				{
					// @ts-ignore
					cloneElement(children, {
						className: classNames(
							// @ts-ignore
							children.props.className,
							{ active: isActive, disabled: isDisable },
							'nav-link',
						),
					})
				}
			</li>
		);
	},
);
NavItem.displayName = 'NavItem';
NavItem.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	isActive: PropTypes.bool,
	isDisable: PropTypes.bool,
};

interface INavProps extends HTMLAttributes<HTMLElement> {
	children: ReactElement<INavItemProps>[] | ReactNode[];
	className?: string;
	tag?: 'ul' | 'nav';
	design?: 'tabs' | 'pills';
	isFill?: boolean;
	isJustified?: boolean;
	isVertical?: boolean;
	verticalBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | null;
}
const Nav = forwardRef<HTMLUListElement, INavProps>(
	(
		{
			tag: Tag = 'ul',
			children,
			className,
			design = 'pills',
			isFill,
			isJustified,
			isVertical,
			verticalBreakpoint,
			...props
		},
		ref,
	) => {
		return (
			// @ts-ignore
			<Tag
				ref={ref}
				className={classNames(
					'nav',
					{
						[`nav-${design}`]: design,
						'nav-fill': isFill,
						'nav-justified': isJustified,
					},
					{
						[`flex${verticalBreakpoint ? `-${verticalBreakpoint}` : ''}-column`]:
							isVertical || !!verticalBreakpoint,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</Tag>
		);
	},
);
Nav.displayName = 'Nav';
Nav.propTypes = {
	// @ts-ignore
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['ul', 'nav']),
	design: PropTypes.oneOf(['tabs', 'pills']),
	isFill: PropTypes.bool,
	isJustified: PropTypes.bool,
	isVertical: PropTypes.bool,
	verticalBreakpoint: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
};

export default Nav;
