import classes from './Button.Module.css';

export function Button({mode, ...restProps}) {
  return (
  <button type="button" className={classes.component} {...restProps} />
  )
}

Button.defaultProps = {
  mode: 'primary',
}