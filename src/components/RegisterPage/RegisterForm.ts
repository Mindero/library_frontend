interface RegisterForm {
  name: string,
  email: string,
  password: string,
  phone_number: string,
}

type FilterFunction = (val : string) => boolean

export function filterForm(form : RegisterForm, filterFunction: FilterFunction) : string | null{
  const ans = Object.keys(form).find((field) => {
    const val : string = form[field as keyof RegisterForm];
    return filterFunction(val);
  });
  return (ans === undefined)? null : ans;
}

export default RegisterForm;