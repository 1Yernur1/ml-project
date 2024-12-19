import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

type FormDataType = z.infer<typeof FormSchema>;

const FormSchema = z.object({
	height: z.string(),
	weight: z.string(),
});

export const UserInfoForm = () => {
	const form = useForm<FormDataType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			height: "",
			weight: "",
		},
	});

	function onSubmit(data: FormDataType) {
		console.log(data);
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
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Введите рост в см" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Array.from({ length: 101 }, (_, i) => 230 - i).map((value) => (
												<SelectItem key={value} value={value.toString()}>
													{value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="weight"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Вес</FormLabel>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Введите вес в кг" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Array.from({ length: 121 }, (_, i) => 160 - i).map((value) => (
												<SelectItem key={value} value={value.toString()}>
													{value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};
