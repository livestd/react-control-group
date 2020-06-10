import React, { useEffect, useState } from 'react';

export interface ControlRequiredProps<T> {
  active?: boolean;
  children?: T;
}

type valueKey = string | number | symbol;

interface Props<K extends valueKey, T, P extends ControlRequiredProps<T>> {
  component: React.ComponentType<P>;
  values: Record<K, T> | T[];
  active?: K | K[];
  componentProps?: P;
  onChange?: (data: K[]) => void;
  radio?: boolean;
  itemClassName?: string;
}

const ControlGroup = <K extends valueKey, T, P extends ControlRequiredProps<T>>({
  values,
  radio,
  onChange,
  active,
  component: Component,
  componentProps,
  itemClassName,
}: Props<K, T, P>) => {

  const valuesArray =
    values instanceof Array
      ? values.reduce((b, v, i) => {
        return [ ...b, [i, v] as [K, T] ];
      }, [] as [K, T][])
      : Object.entries(values) as [K, T][];

  const [inited, setInited] = useState(false);

  const defaultActive: K[] = radio ? [valuesArray[0][0]] : [];

  const activeItems: K[] = !active
    ? defaultActive
    : !(active instanceof Array)
      ? [active]
      : radio
        ? active.slice(0, 1)
        : active;

  const [activeState, setActiveState] = useState<K[]>(activeItems);

  useEffect(() => {
    if (inited) {
      setActiveState(activeItems);
    } else {
      setInited(true);
    }
  }, [active]);

  useEffect(() => {
    if (onChange && inited) {
      onChange(activeState);
    }
  }, [activeState]);

  const change = (v: K) => {
    if (onChange) {
      if (radio) {
        if (v !== activeState[0]) {
          setActiveState([v]);
        }
        return;
      }

      const i = activeState.indexOf(v);
      if (i >= 0) {
        setActiveState(activeState.filter((v: K, k: number) => k !== i));
        return;
      }

      setActiveState([...activeState.filter((v: K) => v !== undefined), v]);
    }
  };

  return (
    <>
      {valuesArray.map(([k, v], i) => (
        <div key={i} onClick={() => change(k)} className={itemClassName}>
          <Component
            {...({
              ...componentProps,
              active: activeState.includes(k),
              children: v,
            } as P)}
          />
        </div>
      ))}
    </>
  );
};

export default ControlGroup;
