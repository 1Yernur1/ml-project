import { BrowserRouter, Route, Routes } from "react-router";
import { UserInfoForm } from "../pages";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<UserInfoForm />} />
			</Routes>
		</BrowserRouter>
	);
};
