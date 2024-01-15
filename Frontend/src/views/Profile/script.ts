import axios, { HttpStatusCode } from "axios";
import { renderNavbar } from "../../components/Navbar/navbar";

const http = axios.create({
  baseURL: "http://localhost:4000",
});

const fullName = document.getElementById("full-name") as HTMLInputElement;
const profession = document.getElementById("profession") as HTMLInputElement;
const availableTime = document.getElementById(
  "available-time"
) as HTMLInputElement;
const minimumCharge = document.getElementById(
  "minimum-charge"
) as HTMLInputElement;
const Location = document.getElementById("location") as HTMLInputElement;
const contactNumber = document.getElementById(
  "contact-number"
) as HTMLInputElement;
const Description = document.getElementById(
  "description"
) as HTMLTextAreaElement;
const registerErrorMessage = document.querySelector(
  ".message"
) as HTMLParagraphElement;
const imageUpload=document.getElementById("image") as HTMLInputElement;

const addButton = document.querySelector(".btn-add") as HTMLButtonElement;
const updateButton = document.querySelector(".btn-update") as HTMLButtonElement;
const deleteButton = document.querySelector(".btn-delete") as HTMLButtonElement;

const accessToken = localStorage.getItem("accessToken");

//On Load
document.addEventListener("DOMContentLoaded", async function (e) {
  e.preventDefault();

  const navBar=document.querySelector(".nav-bar") as HTMLElement;
  renderNavbar(navBar,"profile");
 

  if (accessToken) {
    try {
      const responseProfile = await http({
        url: "/profile/",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });

      if (responseProfile.data.profileId) {
        fullName.value = responseProfile.data.fullName;
        profession.value = responseProfile.data.professionName;
        availableTime.value = responseProfile.data.availableTime;
        minimumCharge.value = responseProfile.data.minimumCharge;
        Location.value = responseProfile.data.location;
        contactNumber.value = responseProfile.data.contactNumber;
        Description.value = responseProfile.data.description;

        addButton.style.display = "none";
      } else {
        updateButton.style.display = "none";
        deleteButton.style.display = "none";

        const responseUser= await http({
          url: "/user/",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          method: "GET",
        });
        fullName.value=responseUser.data.fullname;        
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/views/Login/";
    }
  } else {
    window.location.href = "/views/Login/";
  }
});

//Get Form Datas
function getFormDatas(){
 registerErrorMessage.style.display = "none";
 const full_name = fullName.value.trim();
 const profession_name = profession.value.trim();
 const available_time = availableTime.value.trim();
 const minimum_charge = minimumCharge.value.trim();
 const location = Location.value.trim();
 const contact_number = contactNumber.value.trim();
 const description = Description.value.trim();
 const image=imageUpload?.files?.[0] ?? null;

 return {
   full_name,
   profession_name,
   available_time,
   minimum_charge,
   location,
   contact_number,
   description,
   image
 };
}

//Add Button event
addButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const profileData=getFormDatas();
  if (
    validateInput(
      profileData.full_name,
      profileData.profession_name,
      profileData.available_time,
      profileData.minimum_charge,
      profileData.location,
      profileData.contact_number,
      profileData.description
    )
  ) {
    try {
      console.log(profileData);
      const response = await http({
        url: "/profile/",
        data: profileData,
        headers: { Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data" },
        method: "POST",
      });
      console.log(response);
      if (response.status === HttpStatusCode.Created) {
        alert("New profile created successfully");
        window.location.href = "/views/LandingPage/";
      }
    } catch (error: any) {
      registerErrorMessage.style.display = "block";
      if (error.response) {
        registerErrorMessage.textContent = error.response.data.message;
      }
    }
  } else {
    registerErrorMessage.style.display = "block";
  }
});

//Update Button event
updateButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const profileData=getFormDatas();
  if (
    validateInput(
      profileData.full_name,
      profileData.profession_name,
      profileData.available_time,
      profileData.minimum_charge,
      profileData.location,
      profileData.contact_number,
      profileData.description
    )
  ) {
    try {
      console.log(profileData);
      
      await http({
        url: "/profile/",
        data: profileData,
        headers: { Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data" },
        method: "PUT",
      });
      alert("Profile updated successfully");
      window.location.href = "/views/Profile/";
    } catch (error: any) {
      registerErrorMessage.style.display = "block";
      if (error.response) {
        registerErrorMessage.textContent = error.response.data.message;
      }
    }
  } else {
    registerErrorMessage.style.display = "block";
  }
});

//Delete Button Event
deleteButton.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    await http({
      url: "/profile/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
  } catch (error: any) {
    if (error.response) {
      registerErrorMessage.textContent = error.response.data.message;
      registerErrorMessage.style.display = "block";
      window.location.href="/views/Profile/";
    }
  }
});

//Validations
function validateInput(
  fullName: string,
  professionName: string,
  availableTime: string,
  minimumCharge: string,
  location: string,
  contactNumber: string,
  description: string
) {
  if (fullName === "") {
    registerErrorMessage.textContent = "Please enter your Full Name";
    return false;
  }
  if (professionName === "") {
    registerErrorMessage.textContent = "Please enter your Profession";
    return false;
  }
  if (availableTime === "") {
    registerErrorMessage.textContent = "Please enter your Available Time";
    return false;
  }
  if (minimumCharge === "") {
    registerErrorMessage.textContent = "Please enter your Minimum Charge";
    return false;
  }
  if (location === "") {
    registerErrorMessage.textContent = "Please enter your Location";
    return false;
  }
  if (contactNumber === "") {
    registerErrorMessage.textContent = "Please enter your Contact Number";
    return false;
  }
  if (description === "") {
    registerErrorMessage.textContent = "Please enter your Description";
    return false;
  }
  return true;
}
