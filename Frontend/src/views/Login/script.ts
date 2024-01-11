import axios, { HttpStatusCode } from "axios";

const form = document.querySelector(".form-container") as HTMLDivElement;
const signInUsername = document.querySelector(".username") as HTMLInputElement;
const signInPassword = document.querySelector(".password") as HTMLInputElement;
const loginErrorMessage = document.getElementById(
  "login-error-message"
) as HTMLDivElement;

const http = axios.create({
  baseURL: "http://localhost:4000",
});

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginErrorMessage.style.display = "none";
  const username = signInUsername.value;
  const password = signInPassword.value;

  console.log({ username, password });

  try {
    const response = await http({
      url: "/auth/login",
      data: {
        username,
        password,
      },
      method: "POST",
    });
    console.log(response);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    if (response.status === HttpStatusCode.Accepted) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/views/LandingPage/";
    }
  } catch (error: any) {
    console.log("Error from api", error);
    console.log("Login Failed");
    loginErrorMessage.style.display = "block";
    if (error.response) {
      loginErrorMessage.innerHTML = error.response.data.message;
    }
  }
});
