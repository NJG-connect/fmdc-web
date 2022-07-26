import './spinner.css';

interface Props {
  color?: string;
  className?: string;
}
const Spinner = ({ color = '#C831302E', className = '' }: Props) => (
  <div
    className={`loader ${className}`}
    style={{ borderTopColor: color }}></div>
);

export default Spinner;
