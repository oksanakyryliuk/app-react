import { Outlet } from "react-router-dom";
import ButtonAppBar from "../components/nav";

export const DefaultLayout = () => {

    return (
        <div className="min-h-screen bg-slate-900 font-roboto text-white">
            <ButtonAppBar/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}