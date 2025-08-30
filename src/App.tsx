import './App.css'
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div className="container mt-5 mx-auto flex space-between gap-6">
            <div className="flex-1">
                {/*children setup in main.tsx get rendered in the Outlet component.*/}
                <Outlet/>
            </div>
            <div className="flex-1">
                Messages go here (coming soon . . .)
            </div>
        </div>
    )
}

export default App
