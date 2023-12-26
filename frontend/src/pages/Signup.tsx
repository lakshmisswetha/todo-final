import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-img.jpg";
import { Checkbox, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import { z } from "zod";
import { BASE_URL } from "../utils/config";
import { toFormikValidate } from "zod-formik-adapter";

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5, "min 5 req"),
});

const Signup = () => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const navigate = useNavigate();

    // const BlackField = styled(TextField)({
    //     "& .MuiFilledInput-underline:after": {
    //         borderBottomColor: "#1E4C74",
    //     },
    //     "& label.Mui-focused": {
    //         color: "#1E4C74",
    //     },
    //     "& .MuiFilledInput-root": {
    //         backgroundColor: "#CCDAE6",
    //     },
    // });

    const onSubmit = () => {
        submit(values.username, values.email, values.password);
    };

    const submit = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (data.status) {
                navigate("/");
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: toFormikValidate(signupSchema),
        onSubmit,
    });

    return (
        <div className="h-screen flex justify-center bg-white-50 sm:justify-between">
            <div className="hidden sm:flex justify-center items-center w-[50%]">
                <img src={loginImg} alt="login" className="w-[400px] h-[400px]" />
            </div>
            <div className="w-full bg-gradient-to-br from-slate-200 from-50% to-indigo-300 flex flex-col justify-around sm:w-[50%]">
                <div className="flex flex-col text-center">
                    <div className="text-3xl font-bold ">Welcome !!</div>
                    <div className="font-semibold mt-4">Register your Account</div>
                </div>

                <div className="px-12 sm:px-20 flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col  w-[360px] items-center "
                    >
                        <TextField
                            style={{ marginBottom: "15px" }}
                            fullWidth
                            id="username"
                            label="Username"
                            variant="filled"
                            value={values.username}
                            onChange={handleChange}
                            error={Boolean(errors.username)}
                        />
                        <TextField
                            style={{ marginBottom: "15px" }}
                            fullWidth
                            id="email"
                            label="Email"
                            variant="filled"
                            value={values.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                        />
                        <TextField
                            style={{ marginBottom: "15px" }}
                            fullWidth
                            id="password"
                            label="Password"
                            variant="filled"
                            value={values.password}
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                        />
                        <div className="flex justify-end items-center ">
                            <Checkbox {...label} defaultChecked />
                            <div className="text-sm">I agree with terms and privacy policy</div>
                        </div>
                        <Button
                            sx={{ width: "180px", mt: "20px" }}
                            type="submit"
                            variant="contained"
                        >
                            Create Account
                        </Button>
                    </form>
                </div>

                <div className="text-center font-semibold">
                    <Link to={"/"}>Already have an account? Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
