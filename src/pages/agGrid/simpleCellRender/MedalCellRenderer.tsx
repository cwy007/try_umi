import React from 'react';

const MedalCellRenderer = (props: any) => (
  <span>{new Array(parseInt(props.value, 10)).fill('#').join('')}</span>
);

export default MedalCellRenderer;
