[![NPM](https://img.shields.io/npm/v/@livestd/react-control-group.svg)](https://www.npmjs.com/package/@livestd/react-control-group)

Basic react control group component (like a checkboxes or radio inputs).
Can be used for single or multiple selection
## Installation
```
npm install --save @livestd/react-control-group
```

## types

```js
interface ControlRequiredProps<T> {
  active?: boolean;
  children?: T;
}

type valueKey = string | number | symbol;

interface Props<K extends valueKey, T, P extends ControlRequiredProps<T>>
```

## Props

- `component: React.ComponentType<P>` - component to render for the each element
- `itemClassName?: string` - apply a className to the component wrapper
- `values: Record<K, T> | T[]` - Record or array of values that may includes any type
- `active?: K | K[]` - active elements by default
- `componentProps?: P` - default props for the component
- `onChange?: (active: K[]) => void` - subscribe to change events
- `radio?: boolean` - allow the user to select multiple values. Is `false` by default
  
## Usage

```js
import ControlGroup, { ControlRequiredProps } from './ControlGroup';

// define component for the elements
// ControlRequiredProps contains active flag (boolean)
// and children - content of current element
const ControlNode = ({ children, active }: ControlRequiredProps<string>) => {
  return (
    <div
      style={{
        border: '1px solid black',
        background: active ? '#000' : '#FFF'
      }}
    >
      {children}
    </div>
  );
};

const CheckboxesComponent = () => (
  <ControlGroup
    // elements can be any type which your ControlNode can use 
    values={['a', 'b', 'c']}
    component={ControlNode}
    // onChange hook calls with array of actual choose
    // in case of array it would be an indexes of elements
    onChange={(v: number[]) => console.log(v)}
  />
)

// also you can use typed Record as values

type KeyType = 'a' | 'b' | 'c';

type ValueType = {
  id: number;
  name: string;
}

const RecordValues: Record<KeyType, ValueType> = {
  a: { id: 1, name: 'first' },
  b: { id: 2, name: 'second' },
  c: { id: 3, name: 'third' },
};

const ItemComponent = ({ children, active }: ControlRequiredProps<ValueType>) => (
  <div
  style={{
    border: '1px solid black',
    background: active ? '#000' : '#FFF'
  }}
  >
    {children && children.name}
  </div>
);

const RadioComponent = () => (
  <ControlGroup
    radio
    values={RecordValues}
    component={ControlItem}
    onChange={(v: KeyType[]) => console.log(v.map(i => RecordValues[i].id))}
  />
)
```