import React from 'react';

const Flag = props => {
  // Supported Size: 16px, 24, 32, 48, 64
  return (
    <img 
      src={`https://www.countryflags.io/${props.countryCode}/${props.design || 'shiny'}/${props.size || '64'}.png`} 
      alt={props.countryName + 'flag'}
      title={props.countryName}
    />
  )
}

export default Flag
