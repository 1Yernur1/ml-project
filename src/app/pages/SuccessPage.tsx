import { useLocation } from "react-router";

export const SuccessPage = () => {
	const location = useLocation();
	console.log("location", location);
	const { mutationData } = location.state || {};

	if (!mutationData) {
		return <p>Данные не найдены</p>;
	}

	return (
		<div className="min-h-screen grid place-items-center">
			<div className="text-center">
				<p>
					Вероятность заболевания: <span className="font-bold">{mutationData.disease_probability}</span>
				</p>
				<p>{mutationData.recommendation}</p>
			</div>
		</div>
	);
};
