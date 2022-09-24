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
if (btnScrollup) {
  btnScrollup.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

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
  if (window.location.pathname.startsWith("/admin")) {
    adminnavbarScroll();
  }
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

// revisamos el localStorage TODO: hacer antes de que cargue la pagina
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");
  btnSwitch.classList.add("activetheme");
} else {
  document.body.classList.remove("dark");
}

// If on homepage
// Load members on page load and fill their profiles on the profiles div
if (window.location.pathname === "/") {
  // Fetch from /assets/members.json and save on window.members
  fetch("/assets/members.json")
    .then((response) => response.json())
    .then((data) => {
      window.members = data;
      fillProfiles(data);
    });
}

// If on logros
if (window.location.pathname === "/logros.html") {
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.8;

  const stage = new Konva.Stage({
    container: "logros-canvas",
    width,
    height,
    draggable: true,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  // const WIDTH = 3000;
  // const HEIGHT = 3000;
  // const NUMBER = 200;

  const imageObj3 = new Image();
  imageObj3.onload = function () {
    const raisedEmoji = new Konva.Image({
      x: 140,
      y: 0,
      image: imageObj3,
      width: 50,
      height: 50,
    });
    layer.add(raisedEmoji);
  };
  imageObj3.src = "/assets/images/emoji/raised-back.svg";

  const simpleText = new Konva.Text({
    x: 0,
    y: 60,
    text: "¡Arrastra para moverte!",
    fontSize: 30,
    fontFamily: "Inter",
    fill: "white",
  });
  layer.add(simpleText);

  const horLine1 = new Konva.Line({
    points: [150, 300, 360, 300],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine1);

  const horLine2 = new Konva.Line({
    points: [440, 300, 650, 300],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine2);

  const horLine3 = new Konva.Line({
    points: [650, 100, 900, 100],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine3);

  const horLine4 = new Konva.Line({
    points: [650, 300, 950, 300],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine4);

  const horLine5 = new Konva.Line({
    points: [650, 500, 950, 500],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine5);

  const horLine6 = new Konva.Line({
    /* [440, 300, 660, 300] */
    points: [900, 300, 1200, 300],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine6);

  const horLine7 = new Konva.Line({
    points: [900, 500, 1200, 500],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine7);

  const horLine8 = new Konva.Line({
    points: [1200, 300, 1500, 300],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(horLine8);

  const vertLine1 = new Konva.Line({
    points: [650, 300, 650, 100],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(vertLine1);

  const vertLine2 = new Konva.Line({
    points: [650, 300, 650, 500],
    stroke: "black",
    strokeWidth: 10,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(vertLine2);

  const imageObj = new Image();
  imageObj.onload = function () {
    const chicken = new Konva.Image({
      x: 50,
      y: 250,
      image: imageObj,
      width: 100,
      height: 100,
    });
    layer.add(chicken);
  };
  imageObj.src = "/assets/images/badges/chicken.png";

  const imageObj2 = new Image();
  imageObj2.onload = function () {
    const fox = new Konva.Image({
      x: 350,
      y: 250,
      image: imageObj2,
      width: 100,
      height: 100,
    });
    layer.add(fox);
  };
  imageObj2.src = "/assets/images/badges/fox.png";

  const imageObj8 = new Image();
  imageObj8.onload = function () {
    const eight = new Konva.Image({
      x: 850,
      y: 50,
      image: imageObj8,
      width: 100,
      height: 100,
    });
    layer.add(eight);
  };
  imageObj8.src = "/assets/images/badges/fox.png";

  const imageObj5 = new Image();
  imageObj5.onload = function () {
    const five = new Konva.Image({
      x: 850,
      y: 250,
      image: imageObj5,
      width: 100,
      height: 100,
    });
    layer.add(five);
  };
  imageObj5.src = "/assets/images/badges/fox.png";

  const imageObj6 = new Image();
  imageObj6.onload = function () {
    const six = new Konva.Image({
      x: 850,
      y: 450,
      image: imageObj6,
      width: 100,
      height: 100,
    });
    layer.add(six);
  };
  imageObj6.src = "/assets/images/badges/fox.png";

  const imageObj4 = new Image();
  imageObj4.onload = function () {
    const four = new Konva.Image({
      x: 1150,
      y: 250,
      image: imageObj4,
      width: 100,
      height: 100,
    });
    layer.add(four);
  };
  imageObj4.src = "/assets/images/badges/fox.png";

  const imageObj7 = new Image();
  imageObj7.onload = function () {
    const seven = new Konva.Image({
      x: 1150,
      y: 450,
      image: imageObj7,
      width: 100,
      height: 100,
    });
    layer.add(seven);
  };
  imageObj7.src = "/assets/images/badges/fox.png";

  const imageObj9 = new Image();
  imageObj9.onload = function () {
    const nine = new Konva.Image({
      x: 1450,
      y: 250,
      image: imageObj9,
      width: 100,
      height: 100,
    });
    layer.add(nine);
  };
  imageObj9.src = "/assets/images/badges/fox.png";
}
