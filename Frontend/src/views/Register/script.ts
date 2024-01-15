import axios, { HttpStatusCode } from "axios";

const registerForm=document.querySelector(".login-form") as HTMLFormElement;
const registerFullName= document.querySelector(".full-name") as HTMLInputElement;
const registerEmail= document.querySelector(".email") as HTMLInputElement;
const registerUsername= document.querySelector(".username") as HTMLInputElement;
const registerPassword = document.querySelector(".password") as HTMLInputElement;
const registerRetypePassword = document.querySelector(".re-type-password") as HTMLInputElement;
const registerErrorMessage= document.getElementById("error-message") as HTMLDivElement;

const http = axios.create({
  baseURL: "http://localhost:4000",
})
registerForm.addEventListener("submit",async (e)=>{
  e.preventDefault();
  registerErrorMessage.style.display="none";

  const fullname= registerFullName.value.trim();
  const email= registerEmail.value.trim();
  const username=registerUsername.value.trim();
  const password=registerPassword.value.trim();
  const rePassword=registerRetypePassword.value.trim();

  const user={fullname,email,username,password};
  console.log(user);

  if(validateInput(fullname,email,username,password,rePassword)){
    try {
      const response= await http({
        url:"auth/signup",
        data:user,
        method:"POST"
      });
      console.log(response);  
      if(response.status === HttpStatusCode.Created){
        alert("User registration successsful");
        window.location.href="/views/Login/"
      }
    } catch (error:any) {
      console.log("Error from api", error);
      console.log("SignUp Failed");
      registerErrorMessage.style.display = "block";
      if (error.response) {
        registerErrorMessage.innerHTML = error.response.data.message;
      }
    }    
  }
  else{
    registerErrorMessage.style.display="block";
  }
});

function validateInput(fullName:string,email:string,username:string,password:string,rePassword:string){
  if(fullName === ""){
    registerErrorMessage.innerHTML="Please enter full name";
    return false;
  }
  if(email === ""){
    registerErrorMessage.innerHTML="Please enter email";
    return false;
  }
  if(username === ""){
    registerErrorMessage.innerHTML="Please enter username";
    return false;
  }
  if(password === ""){
    registerErrorMessage.innerHTML="Please enter password";
    return false;
  }
  if(password !== rePassword){
    registerErrorMessage.innerHTML="Your passwords doesn't match";
    return false;
  }
  return true;
}