import axios from "axios";

const form = document.querySelector(".form-container");

const http = axios.create({
  baseURL: 'http://localhost:4000'
})

form?.addEventListener("submit",async (e) => {
  e.preventDefault();

  const username = (document.querySelector(".username") as HTMLInputElement)
    .value;

  const password = (document.querySelector(".password") as HTMLInputElement)
    .value;

  console.log({ username, password });

  try {
    const response= await http({
      url: "/auth/login",
      data: {
        username,
        password,
      },
      method: "POST",
    });
    console.log(response);
    console.log(response.data.accessToken);

  } catch (error) {
    console.log("Error from api",error);
  } 
});
