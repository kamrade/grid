import React, {useRef, useEffect, useState, PropsWithChildren} from 'react'
import s from './TD.module.scss';
import { TableHeading } from './grid.types';
import { Button } from 'shared';
import classNames from "classnames/bind";
import { GridTDTheme } from './grid.types';
import { RiArrowRightUpFill } from "react-icons/ri";

const sx = classNames.bind(s);

export interface GridTDProps {
  el: TableHeading;
  theme?: GridTDTheme;
  link?: string;
  interactionText?: string;
  border?: boolean;
  setColumnMaxWidth?: (el: TableHeading, currentWidth: number) => void;
}

export const TD: React.FC<PropsWithChildren<GridTDProps>> = ({ children, el, theme = 'base', link, interactionText, border, setColumnMaxWidth }) => {

  const refContent       = useRef<HTMLDivElement>(null);
  const refHiddenContent = useRef<HTMLSpanElement>(null);
  const refAddons        = useRef<HTMLDivElement>(null);

  const [contentWidth, setContentWidth] = useState<number>(0);
  const [addonWidth, setAddonWidth] = useState<number>(0);

  // Calculate width of all elements
  useEffect(() => {
    setContentWidth( refHiddenContent?.current?.getBoundingClientRect().width || 0 );
    setAddonWidth( refAddons?.current?.getBoundingClientRect().width || 0 );
  }, [el, el.width]);

  // Send width to parent to determine the max possible width of this column by content
  //
  useEffect(() => {
    if (setColumnMaxWidth) {
      setColumnMaxWidth(el, contentWidth + addonWidth);
    }
    // eslint-disable-next-line
  }, [contentWidth, addonWidth]);

  function openDetails() {
    // @ts-ignore
    alert(Object.keys(el).map(((key: string) => `${key}: ${el[key]}`)));
  }

  return (
    <div
      className={sx({
        GridTD: true,
        GridThemeBase: theme === 'base' || !theme,
        GridThemePrimary: theme === 'primary',
        GridThemeSuccess: theme === 'success',
        GridThemeDanger: theme === 'danger',
        GridThemeMuted: theme === 'muted',
        GridLink: link,
        GridTDBorder: border,
      })}
      style={{ width: `${el.width}px` }}
    >

      <div className={s.GridTDContent} ref={refContent}>
        {children}
        <span className={s.GridTDContentHidden} ref={refHiddenContent}>{children}</span>
      </div>

      <div className={s.GridTDAddons} ref={refAddons} >

        <span className={s.Link}>
          {link && <RiArrowRightUpFill/>}
        </span>

      </div>

      { interactionText &&
        <div className={s.openDetails} >
          <Button bold size={'xs'} theme={'base'} variant={'outlined'} onClick={openDetails}>{interactionText || 'Open'}</Button>
        </div>
      }

    </div>
  );

}
