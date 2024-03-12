import React, { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid...")
    .required("Email is required..."),
  password: yup.string().required("Password is required..."),
  gender: yup.string().required("Gender is required..."),
});

const Register = () => {
  const [error, setError] = useState([]);

  async function handleForm(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    let formObj = Object.fromEntries(formData.entries());
    try {
      let validForm = await schema.isValid(formObj);
      if (validForm) {
        // submit the form
      } else {
        await schema.validate(formObj, { abortEarly: false });
      }
    } catch (err) {
      setError(err.errors);
      // console.log(err)
      // console.log(err.errors)
    }
  }

  return (
    <>
      <div className="card">
        <form onSubmit={handleForm}>
          <div>
            <input type="text" placeholder="Your email" name="email" />
            {error?.[0] && <div className="error">{error?.[0]}</div>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
            />
            {error?.[1] && <div className="error">{error?.[1]}</div>}
          </div>
          <div>
            <input
              type="radio"
              placeholder="Add name..."
              name="gender"
              value="male"
            />{" "}
            Male
            <input
              type="radio"
              placeholder="Add name..."
              name="gender"
              value="female"
            />{" "}
            Female
            {error?.[2] && <div className="error">{error?.[2]}</div>}
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
