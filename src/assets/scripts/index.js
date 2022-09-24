/* eslint-disable no-undef */
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
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  // Fetch from /assets/members.json and save on window.members
  fetch("/assets/members.json")
    .then((response) => response.json())
    .then((data) => {
      window.members = data;
      fillProfiles(data);
    });
}

// If on logros
if (window.location.pathname.startsWith("/logros")) {
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.8;

  const badgeObj = new Image();
  const badgeObj2 = new Image();
  const badgeObj3 = new Image();
  const badgeObj4 = new Image();
  const badgeObj5 = new Image();
  const badgeObj6 = new Image();
  const badgeObj7 = new Image();
  const badgeObj8 = new Image();

  const stage = new Konva.Stage({
    container: "logros-canvas",
    width,
    height,
    draggable: true,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const dragEmoji = new Image();
  // eslint-disable-next-line func-names
  dragEmoji.onload = function () {
    const raisedEmoji = new Konva.Image({
      x: 140,
      y: 0,
      image: dragEmoji,
      width: 50,
      height: 50,
    });
    layer.add(raisedEmoji);
  };
  dragEmoji.src = "/assets/images/emoji/raised-back.svg";

  const hoverEmoji = new Image();
  // eslint-disable-next-line func-names
  hoverEmoji.onload = function () {
    const raisedEmoji = new Konva.Image({
      x: 370,
      y: 380,
      image: hoverEmoji,
      width: 50,
      height: 50,
    });
    layer.add(raisedEmoji);
  };
  hoverEmoji.src = "/assets/images/emoji/index-pointing.svg";

  const dragInfoText = new Konva.Text({
    x: 0,
    y: 60,
    text: "¡Arrastra para moverte!",
    fontSize: 30,
    fontFamily: "Inter",
    fill: "white",
  });
  layer.add(dragInfoText);

  const hoverInfoText = new Konva.Text({
    x: 260,
    y: 450,
    text: "¡Haz hover sobre un logro\npara ver su descripción!",
    fontSize: 25,
    fontFamily: "Inter",
    fill: "white",
  });
  layer.add(hoverInfoText);

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

  const chickenBadge = new Konva.Image({
    x: 50,
    y: 250,
    image: badgeObj,
    width: 100,
    height: 100,
  });
  layer.add(chickenBadge);
  badgeObj.src = "/assets/images/badges/chicken.png";

  const pullRequestBadge = new Konva.Image({
    x: 350,
    y: 250,
    image: badgeObj2,
    width: 100,
    height: 100,
  });
  layer.add(pullRequestBadge);
  badgeObj2.src = "/assets/images/badges/pull-request.png";

  const pyramidsBadge = new Konva.Image({
    x: 850,
    y: 50,
    image: badgeObj3,
    width: 100,
    height: 100,
  });
  layer.add(pyramidsBadge);
  badgeObj3.src = "/assets/images/badges/pyramids.png";

  const lockKeyBadge = new Konva.Image({
    x: 850,
    y: 250,
    image: badgeObj4,
    width: 100,
    height: 100,
  });
  layer.add(lockKeyBadge);
  badgeObj4.src = "/assets/images/badges/lock-key.png";

  const spaceInvaderBadge = new Konva.Image({
    x: 850,
    y: 450,
    image: badgeObj5,
    width: 100,
    height: 100,
  });
  layer.add(spaceInvaderBadge);
  badgeObj5.src = "/assets/images/badges/space-invader.png";

  const foxBadge = new Konva.Image({
    x: 1150,
    y: 250,
    image: badgeObj6,
    width: 100,
    height: 100,
  });
  layer.add(foxBadge);
  badgeObj6.src = "/assets/images/badges/fox.png";

  const twoHeartsBadge = new Konva.Image({
    x: 1150,
    y: 450,
    image: badgeObj7,
    width: 100,
    height: 100,
  });
  layer.add(twoHeartsBadge);
  badgeObj7.src = "/assets/images/badges/two-hearts.png";

  const rocketshipBadge = new Konva.Image({
    x: 1450,
    y: 250,
    image: badgeObj8,
    width: 100,
    height: 100,
  });
  layer.add(rocketshipBadge);
  badgeObj8.src = "/assets/images/badges/rocketship.png";

  // tooltips
  const tooltipText1 = new Konva.Text({
    x: -50,
    y: 60,
    text: "APLICANTE\n\nHaber sobrevivido al onboarding, y haber sido aceptado como miembro de la comunidad!",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect1 = new Konva.Rect({
    x: tooltipText1.x(),
    y: tooltipText1.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText1.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect1);
  layer.add(tooltipText1);
  tooltipText1.hide();
  tooltipRect1.hide();

  const tooltipText2 = new Konva.Text({
    x: 250,
    y: 60,
    text: "PRIMERA PR\n\nA que no era tan difícil hacer tu primera contribución, eh?.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect2 = new Konva.Rect({
    x: tooltipText2.x(),
    y: tooltipText2.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText2.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect2);
  layer.add(tooltipText2);
  tooltipText2.hide();
  tooltipRect2.hide();

  const tooltipText3 = new Konva.Text({
    x: 750,
    y: -150,
    text: "ESTAFA PIRAMIDAL\n\nGracias por invitar a 3 amigos a OSUC!... Que ahora ellos inviten a 3 amigos también. 😈",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect3 = new Konva.Rect({
    x: tooltipText3.x(),
    y: tooltipText3.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText3.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect3);
  layer.add(tooltipText3);
  tooltipText3.hide();
  tooltipRect3.hide();

  const tooltipText4 = new Konva.Text({
    x: 750,
    y: 50,
    text: "2FA\n\n¿Tanto les cuesta adaptarse a la tecnología, que tenemos que darles un logro para que lo hagan?.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect4 = new Konva.Rect({
    x: tooltipText4.x(),
    y: tooltipText4.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText4.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect4);
  layer.add(tooltipText4);
  tooltipText4.hide();
  tooltipRect4.hide();

  const tooltipText5 = new Konva.Text({
    x: 750,
    y: 250,
    text: "AYUDANTE\n\nHaber sido ayudante de un curso DCC.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect5 = new Konva.Rect({
    x: tooltipText5.x(),
    y: tooltipText5.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText5.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect5);
  layer.add(tooltipText5);
  tooltipText5.hide();
  tooltipRect5.hide();

  const tooltipText6 = new Konva.Text({
    x: 1050,
    y: 50,
    text: "TENEMOS QUE HABLAR\n\nLa dipre u otra autoridad de la universidad te reta por un proyecto.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect6 = new Konva.Rect({
    x: tooltipText6.x(),
    y: tooltipText6.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText6.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect6);
  layer.add(tooltipText6);
  tooltipText6.hide();
  tooltipRect6.hide();

  const tooltipText7 = new Konva.Text({
    x: 1050,
    y: 250,
    text: "ADMIN\n\nHaber sido coordinador de un curso DCC.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect7 = new Konva.Rect({
    x: tooltipText7.x(),
    y: tooltipText7.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText7.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect7);
  layer.add(tooltipText7);
  tooltipText7.hide();
  tooltipRect7.hide();

  const tooltipText8 = new Konva.Text({
    x: 1350,
    y: 50,
    text: "ELON MUSK\n\nTener uno o más proyectos con más de 100 usuarios diarios!.",
    fontSize: 18,
    fontFamily: "Calibri",
    fill: "#555",
    width: 300,
    padding: 20,
    align: "center",
  });
  const tooltipRect8 = new Konva.Rect({
    x: tooltipText8.x(),
    y: tooltipText8.y(),
    stroke: "#555",
    strokeWidth: 5,
    fill: "#ddd",
    width: 300,
    height: tooltipText8.height(),
    shadowColor: "black",
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
  });
  layer.add(tooltipRect8);
  layer.add(tooltipText8);
  tooltipText8.hide();
  tooltipRect8.hide();

  chickenBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText1.show();
    tooltipRect1.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  chickenBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText1.hide();
    tooltipRect1.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  pullRequestBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText2.show();
    tooltipRect2.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  pullRequestBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText2.hide();
    tooltipRect2.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  pyramidsBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText3.show();
    tooltipRect3.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  pyramidsBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText3.hide();
    tooltipRect3.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  lockKeyBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText4.show();
    tooltipRect4.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  lockKeyBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText4.hide();
    tooltipRect4.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  spaceInvaderBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText5.show();
    tooltipRect5.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  spaceInvaderBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText5.hide();
    tooltipRect5.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  foxBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText6.show();
    tooltipRect6.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  foxBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText6.hide();
    tooltipRect6.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  twoHeartsBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText7.show();
    tooltipRect7.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  twoHeartsBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText7.hide();
    tooltipRect7.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);

  rocketshipBadge.on("mouseover", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "pointer";
    tooltipText8.show();
    tooltipRect8.show();
    shape.scaleX(1.2);
    shape.scaleY(1.2);
  });
  rocketshipBadge.on("mouseout", (evt) => {
    const shape = evt.target;
    document.body.style.cursor = "default";
    tooltipText8.hide();
    tooltipRect8.hide();
    shape.scaleX(1);
    shape.scaleY(1);
  });
  setTimeout(() => {
    layer.batchDraw();
  }, 100);
}
