document.addEventListener('DOMContentLoaded', e => { fetchData() });

let members = null

// Simulate the obtaining of the parameters as api 
const fetchData = async() => {
    const res = await fetch('src/assets/members.json');
    members = await res.json()
}

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

// Load members on page load and fill their profiles on the profiles div
window.onload = () => {
  fillProfiles(members);
};

// On-type earch bar (#search-members-input)
const searchInput = document.getElementById("search-members-input");

searchInput.addEventListener("input", (event) => {
  // Filter members by name
  const members_filtered = members.filter((member) =>
    member.name.toLowerCase().includes(event.target.value.toLowerCase())
  );

  // Clear profiles
  const profiles = document.querySelectorAll(".profile");
  profiles.forEach((profile) => profile.remove());

  // Fill profiles with filtered members
  fillProfiles(members_filtered);
});
