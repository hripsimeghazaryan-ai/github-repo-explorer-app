import './Inputs.css';

const Inputs = ({ title, placeholder, value, onChange }) => {

    // forks_count
    // open_issues_count
    // stargazers_count

  return (
    <div className="input-group">
      <label className="input-group__label">{title}</label>
      <input className="input-group__field" type="text" placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
};

export default Inputs;