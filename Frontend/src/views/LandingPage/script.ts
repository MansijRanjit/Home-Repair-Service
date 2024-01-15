import axios from "axios";
import { renderNavbar } from "../../components/Navbar/navbar";

const http = axios.create({
  baseURL: "http://localhost:4000",
});

//Onload
document.addEventListener("DOMContentLoaded", async function () {
  try {
    //Render Navbar
    const navbar=document.querySelector(".nav-bar") as HTMLDivElement;
    renderNavbar(navbar,"findTech");

    //Render Profiles
    const response = await http({
      url: "/profile/all",
      method: "GET",
    });
    const profiles = response.data;
    addCards(profiles);

  } catch (error) {
    console.log(error);
  }
});

// Filter search
const professionInput = document.querySelector(
  ".profession-input"
) as HTMLInputElement;
const locationInput = document.querySelector(
  ".location-input"
) as HTMLInputElement;
const search = document.querySelector(".btn-big") as HTMLButtonElement;

search.addEventListener("click", async (e) => {
  e.preventDefault();
  findProfession();
});

professionInput.addEventListener("keydown", async function (e) {
  if (e.key == "Enter") {
    findProfession();
  }
});

locationInput.addEventListener("keydown", async function (e) {
  if (e.key == "Enter") {
    findProfession();
  }
});

async function findProfession() {
  const professionValue =
    professionInput.value == "" ? "all" : professionInput.value.toLowerCase();
  const locationValue =
    locationInput.value == "" ? "all" : locationInput.value.toLowerCase();

  const searchParam = [professionValue, locationValue];
  const response = await http({
    url: `/profile/all/${searchParam}`,
    method: "GET",
  });
  const profiles = response.data;
  addCards(profiles);
}

//Add cards to display
function addCards(profiles: []) {
  const profileCount = document.querySelector(".profile-status") as HTMLElement;
  profileCount.innerHTML = `${profiles.length} Profiles`;

  const container = document.querySelector(".cards") as HTMLElement;
  container.innerHTML = ``;

  profiles.forEach((profile: any) => {
    console.log(profile);

    //Create profile card container
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    //Create profile picture element container
    const profilePic = document.createElement("div");
    profilePic.className = "profile-card__pic";
    const img = document.createElement("img");
    img.src = "http://localhost:4000/"+profile.image.replace(/\\/g,"/");
    img.alt = profile.professionName;
    img.width = 190;
    img.height = 190;
    profilePic.appendChild(img);

    //Create profile card info container
    const profileInfo = document.createElement("div");
    profileInfo.className = "profile-card__info";

    //Populate profile information
    //profession
    const professionName = document.createElement("h1");
    professionName.className = "profession-name";
    professionName.textContent = profile.professionName;

    //full name
    const fullName = document.createElement("h2");
    fullName.className = "full-name";
    fullName.textContent = profile.fullName;

    //location
    const location = document.createElement("div");
    location.className = "location fieldWithIcon";
    location.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      `;
    const locationText = document.createElement("p") as HTMLElement;
    locationText.textContent = profile.location;
    location.appendChild(locationText);

    //minimum charge
    const minimumCharge = document.createElement("div");
    minimumCharge.className = "minimum-charge fieldWithIcon";
    minimumCharge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`;
    const chargeText = document.createElement("p");
    chargeText.textContent = profile.minimumCharge;
    minimumCharge.appendChild(chargeText);

    //available-time
    const availableTime = document.createElement("div");
    availableTime.className = "available-time fieldWithIcon";
    availableTime.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9d910b" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const availableTimeText = document.createElement("p");
    availableTimeText.textContent = profile.availableTime;
    availableTime.appendChild(availableTimeText);

    //contact number
    const contactNumber = document.createElement("div");
    contactNumber.className = "contact-number fieldWithIcon";
    contactNumber.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
    const contactNumberText = document.createElement("p");
    contactNumberText.textContent = profile.contactNumber;
    contactNumber.appendChild(contactNumberText);

    //description
    const description = document.createElement("div");
    description.className = "description";
    description.textContent = profile.description;

    profileInfo.appendChild(professionName);
    profileInfo.appendChild(fullName);
    profileInfo.appendChild(location);
    profileInfo.appendChild(minimumCharge);
    profileInfo.appendChild(availableTime);
    profileInfo.appendChild(contactNumber);
    profileInfo.appendChild(description);

    profileCard.appendChild(profilePic);
    profileCard.appendChild(profileInfo);

    container?.appendChild(profileCard);
  });
}
