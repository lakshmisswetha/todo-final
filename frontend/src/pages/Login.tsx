import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/login-img.jpg";
import { Checkbox, TextField, Button, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { BASE_URL } from "../utils/config";

const Login = () => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const theme = {
        palette: {
            primary: {
                main: "#1E4C74",
            },
        },
    };

    const themes = createTheme(theme);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status && data.token) {
                localStorage.setItem("token", data.token);
                navigate("/todo");
                setError(false);
            } else {
                console.log(data);
                setError(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="h-screen flex justify-center bg-white-50 sm:justify-between">
            <div className="hidden sm:flex justify-center items-center w-[50%]">
                <img src={loginImg} alt="login" className="w-[400px] h-[400px]" />
            </div>
            <div className="w-full bg-gradient-to-br from-slate-200 from-50% to-indigo-300 flex flex-col justify-around sm:w-[50%]">
                <div className="flex flex-col text-center">
                    <div className="text-3xl font-bold ">Welcome Back !!</div>
                    <div className="font-semibold mt-4">Enter your details</div>
                </div>

                <ThemeProvider theme={themes}>
                    <div className="px-12 sm:px-20 flex items-center justify-center">
                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col  w-[360px] items-center "
                        >
                            <TextField
                                style={{ marginBottom: "15px" }}
                                fullWidth
                                id="standard-basic"
                                label="Email"
                                variant="filled"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error}
                            />
                            <TextField
                                style={{ marginBottom: "15px" }}
                                fullWidth
                                id="standard-basic"
                                label="Password"
                                variant="filled"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-end items-center ">
                                <Checkbox {...label} defaultChecked />
                                <div className="text-sm">Remember Password</div>
                            </div>
                            <Button
                                sx={{ width: "180px", mt: "20px" }}
                                type="submit"
                                variant="contained"
                            >
                                Sign In
                            </Button>
                        </form>
                    </div>
                </ThemeProvider>

                <div className="text-center font-semibold">
                    <Link to={"/signup"}>New User? Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
