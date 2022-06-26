import './spinner.css';

interface Props {
  color?: string;
}
const Spinner = ({ color = '#C831302E' }: Props) => (
  <div className="loader" style={{ borderTopColor: color }}></div>
);

export default Spinner;
