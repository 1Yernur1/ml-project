import { BrowserRouter, Route, Routes } from "react-router";
import { SuccessPage, UserInfoForm } from "../pages";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<UserInfoForm />} />
				<Route path="/success" element={<SuccessPage />} />
			</Routes>
		</BrowserRouter>
	);
};
