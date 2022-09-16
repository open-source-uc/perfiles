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
  ];

  return members;
}

function fillProfiles(members) {
  // Group users by their role
  const coordinators = members.filter(
    (member) => member.role === "coordinator"
  );
  const students = members.filter((member) => member.role === "member");
  const alumni = members.filter((member) => member.role === "alumni");

  // Fill coordinators profiles inside #coordination-profiles
  const coordinationProfiles = document.getElementById("coordination-profiles");

  coordinators.forEach((coordinator) => {
    const profile = document.createElement("div");
    profile.classList.add("profile");

    const avatar = document.createElement("img");
    // Use GitHub avatar
    avatar.src = `https://avatars.githubusercontent.com/${coordinator.username}`;
    avatar.alt = coordinator.name;
    avatar.classList.add("profile__avatar");
    // Add name
    const name = document.createElement("p");
    name.classList.add("profile__name");
    name.innerText = coordinator.name;
    // Add title
    const title = document.createElement("p");
    title.classList.add("profile__title");
    title.innerText = coordinator.title;

    profile.appendChild(avatar);
    profile.appendChild(name);
    profile.appendChild(title);

    coordinationProfiles.appendChild(profile);
  });
}

// Load members on page load and fill their profiles on the profiles div
window.onload = () => {
  const members = getMembers();
  fillProfiles(members);
};
