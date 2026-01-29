const Input = ({ label, name, type = "text", errors, ...props }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        type={type}
        name={name}
        {...props}
      />
      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
    </>
  );
};

export default Input;
