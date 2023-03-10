import { useContext } from 'react'
import { useState } from 'react'
import AuthContext from '../context/AuthContext';
import WorkoutContext from '../context/WorkoutContext'

const WorkoutForm = () => {

  const { dispatch } = useContext(WorkoutContext);

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null);
  const [emptyField, setEmptyField] = useState([]);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const workout = {title, load, reps};
    
    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyField(json.emptyField);
    }

    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({payload: json, type: "CREATE_WORKOUT"})
      console.log('new workout added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyField.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyField.includes("load") ? "error" : ""}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
        className={emptyField.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm;