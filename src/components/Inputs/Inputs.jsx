const Inputs = ({ title, placeholder, value, onChange }) => {

    // forks_count
    // open_issues_count
    // stargazers_count

  return (
    <div>
      <label>{title}</label>
      <input type="text" placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
};

export default Inputs;