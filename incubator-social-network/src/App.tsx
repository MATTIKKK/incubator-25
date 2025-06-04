import './app.css'

interface User {
  name: string;
  age: number;
  hasMoney: boolean;
  hobbies: string[]
}

const Matik: User = {
  name: 'Amina',
  age: 22,
  hasMoney: true,
  hobbies: ["chess"]
}

const App = () => {
  return (
    <div>{Matik.hasMoney && "She is a rich bitch"}</div>
  )
}

export default App