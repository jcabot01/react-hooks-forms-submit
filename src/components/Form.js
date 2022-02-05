import React, { useState } from "react";

function Form() {
  const [firstName, setFirstName] = useState("Sylvia"); //set State using first name from form
  const [lastName, setLastName] = useState("Woods");  //set State using last name from form
  const [submittedData, setSubmittedData] = useState([]); //set State of Submissions, using the submitted data from form
  const [errors, setErrors] = useState([])

  function handleFirstNameChange(event) { //collect the value entered into the first name input
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {  //collect the value entered into the last name input
    setLastName(event.target.value);
  }

  function handleSubmit(event){ //when submit is clicked, take in the event data
    event.preventDefault(); //prevent page refresh
    if (firstName.length > 0) { //create some validation logic, form requires first name
      const formData = {firstName: firstName, lastName: lastName};  //create new variable, combining the first and last name States
    // props.sendFormDataSomewhere(formData); //this was put in intially, to send off to a different component
    const dataArray = [...submittedData, formData]; //make a copy of this submitted State, (include all previous entries), and add on the new entry (formData)
    setSubmittedData(dataArray); //set the new submitted data and old data as State 
    setFirstName(""); //reset input fields to blank
    setLastName("");
    setErrors([]);
    } else { //otherwise, return this error message
      setErrors(["First names is required!"]); //set State to this error
    }    
  }

  const listofSubmissions = submittedData.map((data, index) => {  //for every entry, return the input data and it's index.  In JSX, we define the key with index, then stage first and last names
    return (
      <div key = {index}>
        {data.firstName} {data.lastName}
      </div>
    );
  });

  //we have submit handler, input onChange handler; each one receives current State
  //we also have the current State of listed submissions.
  return (
    <div>
    <form onSubmit={handleSubmit} >
      <input type="text" onChange={handleFirstNameChange} value={firstName} />
      <input type="text" onChange={handleLastNameChange} value={lastName} />
      <button type="submit">Submit</button>
    </form>
    {/*conditionally render the errors into JSX; if the current State of errors has any characters (or errors), return the error State, which = "message" in red  */}
    {errors.length > 0 
      ? errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))
      : null}
    <h3>Submissions</h3>
      {listofSubmissions}
    </div>
  );
}

export default Form;
