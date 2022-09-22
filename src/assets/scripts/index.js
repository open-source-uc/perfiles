function createProfile(member) {
  // Create the profile div from the member object
  const profile = document.createElement("div");
  profile.classList.add("profile");

  const avatar = document.createElement("img");
  // Use GitHub avatar
  avatar.src = `https://avatars.githubusercontent.com/${member.username}?s=120`;
  avatar.alt = member.name;
  avatar.classList.add("profile__avatar");
  profile.appendChild(avatar);

  // Add name
  const name = document.createElement("p");
  name.classList.add("profile__name");
  name.innerText = member.name;
  profile.appendChild(name);

  // Add title
  const title = document.createElement("p");
  title.classList.add("profile__title");
  title.innerText = member.title || "Integrante";
  profile.appendChild(title);

  return profile;
}

function fillProfiles(members) {
  // Create all of the profile divs based on the list of members

  // Group users by their role
  const coordinators = members.filter(
    (member) => member.role === "coordinator"
  );
  const students = members.filter((member) => member.role === "member");
  const alumni = members.filter((member) => member.role === "alumni");

  // Fill coordinators profiles inside #coordination-profiles
  const coordinationProfiles = document.getElementById("coordination-profiles");

  coordinators.forEach((coordinator) => {
    const profile = createProfile(coordinator);
    coordinationProfiles.appendChild(profile);
  });

  // Fill students profiles inside #members-profiles
  const studentsProfiles = document.getElementById("members-profiles");

  students.forEach((student) => {
    const profile = createProfile(student);
    studentsProfiles.appendChild(profile);
  });

  // Fill alumni profiles inside #hall-of-fame-profiles
  const alumniProfiles = document.getElementById("hall-of-fame-profiles");

  alumni.forEach((alumnus) => {
    const profile = createProfile(alumnus);
    alumniProfiles.appendChild(profile);
  });
}

// On-type search bar (.search-members__input)
const searchInputs = document.getElementsByClassName("search-members__input");

Array.from(searchInputs).forEach((input) => {
  input.addEventListener("input", (event) => {
    // Filter members by name
    const membersFiltered = window.members.filter((member) =>
      member.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    // Clear profiles
    const profiles = document.querySelectorAll(".profile");
    profiles.forEach((profile) => profile.remove());

    // Fill profiles with filtered members
    fillProfiles(membersFiltered);
  });
});

// Scroll to top button
const btnScrollup = document.getElementById("btn_scrollup");
btnScrollup.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const addBtnScrollup = () => {
  if (window.scrollY < 300) {
    btnScrollup.classList.remove("btn_scrollup--visible");
  } else {
    btnScrollup.classList.add("btn_scrollup--visible");
  }
};

// Scroll to admin navbar .nav-admin
const navbarAdmin = document.querySelector(".nav-admin");
const adminnavbarScroll = () => {
  if (window.scrollY > 70) {
    // Cambiamos el padding-top a 0
    navbarAdmin.style.paddingTop = "0";
  } else {
    // Cambiamos el padding-top a 70px
    navbarAdmin.style.paddingTop = "70px";
  }
};

window.onscroll = () => {
  addBtnScrollup();
  adminnavbarScroll();
};

// Dark mode
const btnSwitch = document.getElementById("switchtheme");
btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("activetheme");
  // Guardamos el modo en localstorage
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "true");
  } else {
    localStorage.setItem("dark-mode", "false");
  }
});

// Load members on page load and fill their profiles on the profiles div
window.onload = () => {
  // revisamos el localStorage TODO: hacer antes de que cargue la pagina
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    btnSwitch.classList.add("activetheme");
  } else {
    document.body.classList.remove("dark");
  }
  // Fetch from /assets/members.json and save on window.members
  fetch("/assets/members.json")
    .then((response) => response.json())
    .then((data) => {
      window.members = data;
      fillProfiles(data);
    });
};
