import { ReimentForm, ReimentInput, ReimentSelect } from "@/components/form";
import Wrapper from "@/components/shared/Wrapper";
import { FormSubmitLoading } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useSignUpMutation } from "@/redux/features/auth/auth.api";
import registerUserSchema from "@/schemas/CreateUser.schema";
import { GenderOptions } from "@/utils/Constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  // ! functin for register
  const handleRegister = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Registering a user.....");

    try {
      const result = await signUp(data);

      // * if there is error
      if (result?.error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMsg = (result?.error as any)?.data?.errorMessages[0]
          ?.message;

        toast.error(errorMsg, {
          id: toastId,
          duration: 1400,
        });

        return;
      }

      // * for success sign up
      if (result?.data?.success) {
        toast.success(result?.data?.message, {
          id: toastId,
          duration: 1400,
        });

        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!! ", { id: toastId, duration: 1400 });
      console.log(error);
    }

    //
  };

  return (
    <>
      {isLoading && <FormSubmitLoading />}

      <div className="SignUpContainer w-full min-h-screen flex items-center justify-center  ">
        <Wrapper className=" signUpWrapper  formContainer py-14 ">
          <div className="    w-[95%] xsm:w-[85%] sm:w-[78%] md:w-[70%] xmd:w-[65%] lg:w-[55%] m-auto p-3 xsm:p-5 sm:p-7 md:p-10  rounded-md shadow-xl bg-gray-200  backdrop-blur bg-opacity-60 border   ">
            <p className=" mb-3 xsm:mb-5 sm:mb-8 text-xl xsm:text-2xl sm:text-3xl text-center font-semibold CormorantFont text-gray-700   ">
              Sign up
            </p>

            {/*  */}

            {/* form starts  */}
            <ReimentForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerUserSchema)}
            >
              <ReimentInput
                type="text"
                label="Name :"
                name="name"
                placeholder="Enter Your Name"
              />

              <ReimentInput
                type="email"
                label="Email :"
                name="email"
                placeholder="Enter Your Email"
              />

              <ReimentSelect
                name="gender"
                label="Gender  : "
                options={GenderOptions}
              />

              <ReimentInput
                type="number"
                label="Age :"
                name="age"
                placeholder="Enter your age"
              />

              <ReimentInput
                type="number"
                label="Phone :"
                name="phone"
                placeholder="Enter your phone number"
              />

              <ReimentInput
                type="password"
                label="Password :"
                name="password"
                placeholder="Enter Your Password"
              />

              <ReimentInput
                type="password"
                label="Confirm Password :"
                name="confirmPassword"
                placeholder="Confirm your password "
              />

              {/* ${
              isLoading
                ? " cursor-not-allowed bg-gray-300  "
                : " bg-prime50 hover:bg-prime100"
            } */}

              <Button
                // disabled={isLoading}
                className={`px-3 xsm:px-4 sm:px-5 md:px-6 font-semibold text-xs sm:text-sm md:text-base  active:scale-95 duration-500 bg-prime100 hover:bg-prime100 `}
              >
                Register
              </Button>
            </ReimentForm>
            {/* form ends */}

            {/*  */}

            <div className="text-center  mt-6  ">
              <a className="right-0 inline-block text-sm font-semibold align-baseline text-gray-900 hover:text-gray-950   ">
                Already have an account ?{" "}
                <span className=" text-blue-700 font-bold cursor-pointer ">
                  <Link to={`/login`}>Login </Link>
                </span>
              </a>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default SignUp;
