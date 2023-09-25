import s from "./addNewUser.module.scss";
import InputGroup from "../../components/InputGroup/InnputGroup";
import { Button } from "@mui/joy";
import { FormProvider, useForm } from "react-hook-form";
import SelectSmall from "../../components/Select/Select.tsx";
import { schemaValidationAddUser } from "./schemaValidation.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../services/api-user-service/api-user-service.ts";
import {IRegisterUser} from "../../common/interfaces/api-user-type.ts";

export enum ESelectRole {
  Administrator = "ADMINISTRATOR",
  User = "USER",
}
const defaultValues = {
  firstName: "",
  lastName: "",
  sex: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  roles: "USER"
};
export const AddNewUser = () => {
  const formAddUser = useForm({
    mode: "onTouched",
    defaultValues,
    resolver: yupResolver(schemaValidationAddUser),
  });

  const {
    formState: { errors },
  } = formAddUser;
  const onSubmit = async (data: IRegisterUser) => {
    try {
      const { response } = await register(data);
      console.log(response)
      if (!response) {
        formAddUser.setError("confirmPassword", {
          type: "manual",
          message: response.errors ? response?.errors[0] : ""
        });
      }
      if (response) {
        formAddUser.reset();
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={s.addUserWrapper}>
      <FormProvider {...formAddUser}>
        <form onSubmit={formAddUser.handleSubmit(onSubmit)}>
          <h3 className={s.titleForm}>Add new user</h3>
          <InputGroup
            name={"name"}
            id={"name"}
            classNameInput={"firstName"}
            placeholder={"FirstName"}
            type={"text"}
            field={"firstName"}
            errorMassage={errors?.firstName?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
            autoComplete={''}/>
          <InputGroup
            name={"lastName"}
            id={"lastName"}
            classNameInput={"lastName"}
            placeholder={"LastName"}
            type={"text"}
            field={"lastName"}
            errorMassage={errors?.lastName?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
            autoComplete={''}/>
          <InputGroup
              name={"sex"}
              id={"sex"}
              classNameInput={"sex"}
              placeholder={"Sex"}
              type={"text"}
              field={"sex"}
              errorMassage={errors?.sex?.message}
              classNameError={s.error}
              classNameInputGroupWrapper={s.inputGroupWrapper}
              autoComplete={''}/>
          <InputGroup
              name={"phone"}
              id={"phone"}
              classNameInput={"phone"}
              placeholder={"Phone"}
              type={"text"}
              field={"phone"}
              errorMassage={errors?.phone?.message}
              classNameError={s.error}
              classNameInputGroupWrapper={s.inputGroupWrapper}
              autoComplete={''}/>
          <InputGroup
            name={"email"}
            id={"email"}
            classNameInput={"email"}
            placeholder={"Email"}
            type={"email"}
            field={"email"}
            errorMassage={errors?.email?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
            autoComplete={''}/>
          <SelectSmall
            label={"Role"}
            field={"roles"}
            errorMassage={errors?.roles?.message}
            classNameError={s.error}
            value={ESelectRole}
          />
          <InputGroup
            name={"password"}
            id={"password"}
            classNameInput={"password"}
            placeholder={"Password"}
            type={"password"}
            field={"password"}
            errorMassage={errors?.password?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
            autoComplete={''}/>
          <InputGroup
            name={"confirmPassword"}
            id={"confirmPassword"}
            classNameInput={"confirmPassword"}
            placeholder={"Confirm password"}
            type={"password"}
            field={"confirmPassword"}
            errorMassage={errors?.confirmPassword?.message}
            classNameError={s.error}
            classNameInputGroupWrapper={s.inputGroupWrapper}
            autoComplete={''}/>
          <Button type={"submit"}>Add user</Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddNewUser;
