// This should probably be memoized
function getMembers() {
  // Get all organization members
  // For now, let's mock this
  const members = [
    {
      name: "Max Militzer",
      role: "coordinator",
      title: "Coordinador General",
      // This is also their GitHub username
      username: "Dyotson",
    },
    {
      name: "Diego Costa",
      role: "coordinator",
      title: "Coordinador de Comunidad e Inserción",
      username: "diegocostares",
    },
    {
      name: "Lucas Natero",
      role: "coordinator",
      title: "Coordinador Externo",
      username: "lnatero",
    },
    {
      name: "Fernando Smith",
      role: "coordinator",
      title: "Coordinador de Educación",
      username: "fernandosmither",
    },
    {
      name: "Benjamín Vicente",
      role: "coordinator",
      title: "Coordinador de Proyectos",
      username: "benjavicente",
    },
    {
      name: "Martín Atria",
      role: "member",
      username: "Maratripa",
    },
    {
      name: "Agustín Covarrubias",
      role: "member",
      username: "agucova",
    },
    {
      name: "Alister MacCormack",
      role: "member",
      username: "a-maccormack",
    },
    {
      name: "José Antonio Castro",
      role: "member",
      username: "Baelfire18",
    },
    {
      name: "Ignacio Palma",
      role: "member",
      username: "IgnacioPalma",
    },
    {
      name: "Juan Vargas",
      role: "member",
      username: "v4rgas",
    },
  ];

  return members;
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
  const members = getMembers();
  fillProfiles(members);
};

// On-type earch bar (#search-members-input)
const searchInput = document.getElementById("search-members-input");

searchInput.addEventListener("input", (event) => {
  // Filter members by name
  const members = getMembers().filter((member) =>
    member.name.toLowerCase().includes(event.target.value.toLowerCase())
  );

  // Clear profiles
  const profiles = document.querySelectorAll(".profile");
  profiles.forEach((profile) => profile.remove());

  // Fill profiles with filtered members
  fillProfiles(members);
});
