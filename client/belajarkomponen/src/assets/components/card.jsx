import Button from "./button"

const Card = ({count,setCount}) => {
  return(
    <div className="card">
    <Button setCount={setCount} count={count}/>
    <p>
      Edit <code>src/App.jsx</code> and save to test HMR
    </p>
  </div>
  )
}
export default Card