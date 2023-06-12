import React, { useState, useRef } from 'react'
import Card from '../../UI/Card';
import styles from './AddUser.module.css'
import Button from '../../UI/Button';
import ErrorModal from '../../UI/ErrorModal';

const AddUser = ({ onAddUser }) => {

  // useRef is better for reading not for manipulating DOM. Be careful
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
      return;
    }

    if (+enteredAge < 1) { // +enteredAge force to number
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid age (> 0).'
      });
      return;
    }

    onAddUser(enteredName, enteredAge); // setting up the state to App.js

    nameInputRef.current.value = '' // cleaning the input - YOU SHOULDN'T DO THAT
    ageInputRef.current.value = '' // cleaning the input - YOU SHOULDN'T DO THAT
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input 
            id='username' 
            type="text" 
            ref={nameInputRef} 
          />

          <label htmlFor='age'>Age</label>
          <input 
            id='age' 
            type="number" 
            ref={ageInputRef}
          />

          <Button type='submit'>Add User</Button>
        </form>
      </Card>

    </>
  )
}

export default AddUser