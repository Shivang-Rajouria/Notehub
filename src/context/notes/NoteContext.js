import {createContext} from "react";
// yaha humne ek naya context banaya hai or fir usko humne use kiya hai notestate me
//It's a way to share data between components without using traditional props.
const NoteContext = createContext();

export default NoteContext;

//the Context API in React allows you to create a central place to store and 
//access data that can be shared by multiple components without the need to pass props through each component in the hierarchy. 