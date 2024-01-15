import axios from "axios";

export const renderNavbar = async function (placeholder: HTMLElement,selected:string) {
  try {
    const response = await fetch("../../components/Navbar/navbar.html");
    const data = await response.text();
    placeholder.innerHTML = data;

    onload();

    //Active Page Highlight
    const findTechButton= document.querySelector(".findTech") as HTMLButtonElement;
    const profileButton=document.querySelector(".profile") as HTMLButtonElement;
    if(selected=="profile"){
      profileButton?.classList.add("active-btn");
      findTechButton.classList.remove("active-btn");
    }
    else if(selected=="findTechnician"){
      findTechButton.classList.add("active-btn");
      profileButton?.classList.remove("active-btn");
    }
  } catch (error) {
    window.location.href="/views/LandingPage/"
  }
};

async function onload() {
  const loginButton = document.querySelector(".btn-login") as HTMLButtonElement;
  const signupButton = document.querySelector(
    ".btn-signup"
  ) as HTMLButtonElement;
  const logoutButton = document.querySelector(
    ".btn-logout"
  ) as HTMLButtonElement;
  const usernameDisplay = document.querySelector(
    ".usernameDisplay"
  ) as HTMLElement;

  const http = axios.create({
    baseURL: "http://localhost:4000",
  });

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const responseProfile = await http({
      url: "/user/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    if (responseProfile.data.username) {
      await loggedInState();
      usernameDisplay.textContent = `Welcome, ${responseProfile.data.username}`;
      logoutButton.addEventListener("click", async function (e) {
        e.preventDefault();
        localStorage.clear();
        await loggedOutState();
        window.location.href="/views/LandingPage/"
      });
    } else {
      await loggedOutState();
    }
  }
  async function loggedOutState() {
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
    signupButton.style.display = "block";
    usernameDisplay.style.display = "none";
  }
  
  async function loggedInState() {
    loginButton.style.display = "none";
    signupButton.style.display = "none";
    logoutButton.style.display = "block";
    usernameDisplay.style.display = "block";
  }
}
