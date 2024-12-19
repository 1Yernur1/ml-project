import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useMutation } from "@tanstack/react-query";

type FormDataType = z.infer<typeof FormSchema>;

const FormSchema = z.object({
	height: z
		.number({
			required_error: "Введите рост",
		})
		.min(50, "Рост должен быть не менее 50 см")
		.max(250, "Рост не может превышать 250 см"),
	weight: z
		.number({
			required_error: "Введите вес",
		})
		.min(20, "Вес должен быть не менее 20 кг")
		.max(200, "Вес не может превышать 200 кг"),
	ap_hi: z
		.number({
			required_error: "Введите систолическое давление",
		})
		.min(50, "Систолическое давление не может быть меньше 50")
		.max(300, "Систолическое давление не может превышать 300"),
	ap_lo: z
		.number({
			required_error: "Введите диастолическое давление",
		})
		.min(30, "Диастолическое давление не может быть меньше 30")
		.max(200, "Диастолическое давление не может превышать 200"),
	age_years: z.number().min(0, "Возраст не может быть отрицательным").max(120, "Возраст не может превышать 120 лет"),
	gender: z.enum(["1", "2"], {
		errorMap: () => ({ message: "Выберите пол" }),
	}),
	cholesterol: z.enum(["1", "2", "3"], {
		errorMap: () => ({ message: "Выберите уровень холестерина" }),
	}),
	gluc: z.enum(["1", "2", "3"], {
		errorMap: () => ({ message: "Выберите уровень глюкозы" }),
	}),
	smoke: z.enum(["0", "1"], {
		errorMap: () => ({ message: "Укажите, курите ли вы" }),
	}),
	alco: z.enum(["0", "1"], {
		errorMap: () => ({ message: "Укажите, употребляете ли вы алкоголь" }),
	}),
	active: z.enum(["0", "1"], {
		errorMap: () => ({ message: "Укажите, являетесь ли вы физически активным" }),
	}),
});

export const UserInfoForm = () => {
	const form = useForm<FormDataType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {},
	});

	const mutation = useMutation({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutationFn: async (data: any) => {
			return await fetch("https://mlbackend-k5ao.onrender.com/api/predict/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then((res) => res.json());
		},

		onSuccess: (data) => {
			console.log("data", data);
		},
	});

	const onSubmit = (data: FormDataType) => {
		const formattedBody = {
			...data,
			gender: +data.gender,
			cholesterol: +data.cholesterol,
			gluc: +data.gluc,
			smoke: +data.smoke,
			alco: +data.alco,
			active: +data.active,
		};
		mutation.mutate(formattedBody);
	};

	if (mutation.isPending) {
		return (
			<div className="min-h-screen grid place-items-center">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-slate-500 border-solid"></div>
			</div>
		);
	}

	if (mutation.isError) {
		return (
			<div className="min-h-screen grid place-items-center">
				<p className="text-red-500">Произошла ошибка</p>
			</div>
		);
	}

	if (mutation.isSuccess) {
		return (
			<div className="min-h-screen grid place-items-center">
				<p>
					Вероятность заболевания: <span className="font-bold">{mutation.data.disease_probability}</span>
				</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen container grid place-items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-96">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="height"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Рост</FormLabel>
									<FormControl>
										<Input
											placeholder="Введите рост в см"
											{...field}
											value={field.value || ""}
											onChange={(e) => field.onChange(+e.target.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Вес</FormLabel>
									<FormControl>
										<Input
											placeholder="Введите вес в кг"
											{...field}
											value={field.value || ""}
											onChange={(e) => field.onChange(+e.target.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ap_hi"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Систолическое давление </FormLabel>
									<FormControl>
										<Input
											placeholder="Введите систолическое давление"
											{...field}
											value={field.value || ""}
											onChange={(e) => field.onChange(+e.target.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ap_lo"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Диастолическое давление</FormLabel>
									<FormControl>
										<Input
											placeholder="Введите диастолическое давление"
											{...field}
											value={field.value || ""}
											onChange={(e) => field.onChange(+e.target.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="age_years"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Возраст</FormLabel>
									<FormControl>
										<Input
											placeholder="Введите возраст"
											{...field}
											value={field.value || ""}
											onChange={(e) => field.onChange(+e.target.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пол</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Выберите пол" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="2">Мужской</SelectItem>
											<SelectItem value="1">Женский</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cholesterol"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Холестерин</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Выберите уровень холестерина" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="1">Нормальный</SelectItem>
											<SelectItem value="2">Выше нормы</SelectItem>
											<SelectItem value="3">Значительно выше нормы</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="gluc"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Глюкоза</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Выберите уровень глюкозы" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="1">Нормальный</SelectItem>
											<SelectItem value="2">Выше нормы</SelectItem>
											<SelectItem value="3">Значительно выше нормы</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="smoke"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Курение</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Курите ли вы" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="1">Да</SelectItem>
											<SelectItem value="0">Нет</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="alco"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Алкоголь</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Пьёте ли вы" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="1">Да</SelectItem>
											<SelectItem value="0">Нет</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="active"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Физическая активность</FormLabel>

									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Выберите значение" />
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											<SelectItem value="1">Да</SelectItem>
											<SelectItem value="0">Нет</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit">Отправить</Button>
				</form>
			</Form>
		</div>
	);
};
