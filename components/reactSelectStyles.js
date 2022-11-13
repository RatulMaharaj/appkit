const customStyles = {
  placeholder: (provided, state) => ({
    ...provided,
    color: "rgb(var(--colors-primary))",
    textTransform: "capitalize",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "rgb(var(--colors-primary))",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "rgb(var(--colors-primary))",
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: "rgb(var(--backgroundColor-primary))",
    color: "rgb(var(--colors-primary))",
    marginTop: 0,
    borderRadius: "0.375rem",
    overflow: "hidden",
  }),
  control: (provided, state) => ({
    ...provided,
    height: "2.5rem",
    fontSize: "14px",
    backgroundColor: "rgb(var(--backgroundColor-primary))",
    color: "rgb(var(--colors-primary))",
    border: state.isFocused
      ? "1px solid rgb(var(--colors-accent1))"
      : "1px solid rgb(var(--colors-tertiary))",
    borderRadius: "0.375rem",
    margin: "0.5rem 0",
    boxShadow: "none",
    "&:hover": {
      border: state.isFocused
        ? "1px solid rgb(var(--colors-accent1))"
        : "1px solid rgb(var(--colors-tertiary))",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: "rgb(var(--colors-primary))",
    fontSize: "14px",
    backgroundColor: "rgb(var(--backgroundColor-primary))",
    "&:hover": {
      backgroundColor: "rgb(var(--backgroundColor-secondary))",
    },
  }),
};

export default customStyles;
