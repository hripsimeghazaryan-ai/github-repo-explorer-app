import './Inputs.css';

const Inputs = ({ title, placeholder, value, onChange, id }) => {
  return (
    <div className="input-group">
      <label className="input-group__label" htmlFor={id}>{title}</label>
      <input
        id={id}
        className="input-group__field"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        aria-required="true"
      />
    </div>
  );
};

export default Inputs;