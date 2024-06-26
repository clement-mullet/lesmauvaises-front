import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import {ScrollToPlugin} from "gsap/ScrollToPlugin.js";
import {Draggable} from "gsap/Draggable.js";
import {MotionPathPlugin} from "gsap/MotionPathPlugin.js";
import {EaselPlugin} from "gsap/EaselPlugin.js";
import {PixiPlugin} from "gsap/PixiPlugin.js";
import {TextPlugin} from "gsap/TextPlugin.js";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin.js";
import {SplitText} from "gsap/SplitText.js";
import {MorphSVGPlugin} from "gsap/MorphSVGPlugin.js";
import {numberSource} from "./numberSource";

import {prepareAnimationHandler} from "./prepareAnimationHandler";

// ES6 Modules
import Matter from "matter-js";
// Ou, si vous avez besoin d'accéder à des modules spécifiques
import {Engine, Render, World, Bodies} from "matter-js";

import {PhysicsPropsPlugin} from "gsap/PhysicsPropsPlugin.js";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  Draggable,
  PhysicsPropsPlugin,
  MotionPathPlugin,
  MorphSVGPlugin,
  SplitText,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  DrawSVGPlugin
);

export class menuHandler {
  static loadLoader() {
    let storedValue = localStorage.getItem("loader")
      ? localStorage.getItem("loader")
      : localStorage.setItem("loader", false);

    if (storedValue != "true") {
      localStorage.setItem("loader", true);
      let engine = Matter.Engine.create(),
        world = engine.world;

      let width = window.innerWidth;
      let height = window.innerHeight;

      // Créer un renderer
      let render = Matter.Render.create({
        element: document.querySelector(".loader"),
        engine: engine,
        options: {
          width: width,
          height: height,
          background: "transparent", // Rend le fond du canvas transparent
          wireframes: false, // Pour un rendu plus réaliste des corps
        },
      });

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const numberBallW = Math.floor(windowWidth / 200);
      const numberBallH = Math.floor(windowHeight / 200);

      // Ajouter des corps
      let balls = [];
      let svgs = [];
      let xBalls = 0;
      let yball = -200; // Position verticale initiale de la première rangée de balles
      const loader = document.querySelector(".loader");
      const color = ["violet", "rose", "noir"];

      for (let i = 0; i < Math.floor(numberBallH); i++) {
        // Mettre à jour la position verticale pour la prochaine rangée de balles

        xBalls = 0;

        for (let j = 0; j < numberBallW; j++) {
          // Utiliser une fonction anonyme pour encapsuler le code à exécuter
          // Créer une balle avec les positions xBalls et yball
          let radius = Math.random() * (140 - 80) + 80;
          let mass = Math.random() * (100 - 8) + 8;
          let ball = Matter.Bodies.circle(xBalls + 200, yball, radius, {
            restitution: 0.9,
            mass: mass,
            isStatic: false, // Rendre la balle déplaçable
            angle: Math.random() * Math.PI * 2, // Définit une rotation aléatoire
            angularVelocity: (Math.random() * 2 - 1) * Math.PI, // Définit une vitesse de rotation aléatoire encore plus prononcée
            render: {
              fillStyle: "transparent",
              strokeStyle: "transparent",
              lineWidth: 0,
            },
          });
          xBalls += radius + 50;

          // Utiliser un index distinct pour accéder aux éléments SVG correspondant
          let svgIndex = i * numberBallW + j;
          loader.insertAdjacentHTML(
            "afterbegin",
            numberSource.getLogo(
              color[Math.floor(Math.random() * color.length)],
              svgIndex + 1
            )
          );
          let svg = document.getElementById(`ball${svgIndex + 1}`);

          balls.push(ball);
          svgs.push(svg);
        }
        yball -= 1000;
      }

      let ground = Matter.Bodies.rectangle(width / 2, height, width, 1, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });
      let leftWall = Matter.Bodies.rectangle(0, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });
      let rightWall = Matter.Bodies.rectangle(width, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: "transparent",
          strokeStyle: "transparent",
        },
      });

      let mouse = Matter.Mouse.create(render.canvas);

      // Créer une contrainte de souris pour déplacer les corps
      let mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2, // Rigidité de la contrainte
          render: {
            visible: false, // Ne pas rendre la contrainte de la souris visible
          },
        },
      });

      // Ajouter la contrainte de souris au monde
      Matter.World.add(world, mouseConstraint);

      // Garder le renderer informé de la mise à jour de la position de la souris
      render.mouse = mouse;

      let obstacleZero = Matter.Bodies.rectangle(
        width / 2 + 50,
        height / 2 + 25,
        200,
        100,
        {
          isStatic: true,
          render: {
            visible: false, // Rendre l'obstacle invisible
          },
        }
      );

      // Ajouter l'obstacle du texte "0" au monde
      Matter.World.add(world, obstacleZero);

      // Ajouter le texte "0" au conteneur loader
      loader.insertAdjacentHTML("beforeend", `<div class="zero-text">0</div>`);

      // Sélectionner l'élément texte "0"
      let zeroText = document.querySelector(".zero-text");

      // Positionner le texte au centre de la scène
      zeroText.style.position = "absolute";
      zeroText.style.top = `${height / 2 - 50}px`; // Décalage de moitié de la hauteur du texte pour le centrer correctement
      zeroText.style.left = `${width / 2 - 50}px`; // Décalage de moitié de la largeur du texte pour le centrer correctement
      zeroText.style.fontFamily = "'MADE SOULMAZE', Sans-serif"; // Police de caractère
      zeroText.style.fontSize = "100px"; // Taille de police, vous pouvez ajuster selon vos besoins

      zeroText.style.color = "#28282D"; // Couleur du texte, vous pouvez ajuster cela selon vos préférences

      Matter.World.add(world, [leftWall, rightWall, ground, ...balls]);

      // Lancer le moteur et le renderer
      Matter.Runner.run(engine);
      Matter.Render.run(render);

      // Fonction de mise à jour pour aligner les SVG avec les corps
      function updateSVGPositions() {
        // Demander la prochaine exécution de la fonction avant la mise à jour
        requestAnimationFrame(updateSVGPositions);

        // Iterer sur les balles et les svgs pour les mettre à jour
        for (let i = 0; i < balls.length; i++) {
          let ball = balls[i];
          let svg = svgs[i];

          // Définissez la nouvelle largeur et la nouvelle hauteur souhaitées
          const nouvelleLargeur = (ball.circleRadius + 3) * 2; // Nouvelle largeur en pixels
          const nouvelleHauteur = (ball.circleRadius + 3) * 2; // Nouvelle hauteur en pixels

          // Définissez le facteur d'échelle basé sur la nouvelle largeur
          const facteurEchelle =
            nouvelleLargeur / parseFloat(svg.getAttribute("width"));

          // Appliquez la transformation de mise à l'échelle au SVG
          svg.setAttribute("width", nouvelleLargeur + "px");
          svg.setAttribute("height", nouvelleHauteur + "px");
          svg.style.width = nouvelleLargeur + "px";
          svg.style.height = nouvelleHauteur + "px";
          svg.style.transform = "scale(" + facteurEchelle + ")";
          svg.style.zIndex = "-1";

          svg.style.transform += `rotate(${ball.angle}rad)`; // Utilisez la rotation du corps
          svg.style.transformOrigin = `${nouvelleLargeur / 2}px ${
            nouvelleHauteur / 2
          }px`; // Centre de rotation
          svg.style.top = `${ball.position.y - ball.circleRadius}px`; // 30 est la moitié de la taille du cercle
          svg.style.left = `${ball.position.x - ball.circleRadius}px`;
        }
      }

      // Appeler la fonction une seule fois pour démarrer la mise à jour
      updateSVGPositions();
      const tl = prepareAnimationHandler.animationLoaderPercent(
        balls,
        world,
        obstacleZero,
        ground
      );
      tl.play();
    } else {
      const loader = document.querySelector(".loader");
      gsap.set(loader, {
        display: "none",
        transition: "none",
      });
    }
  }

  static animateBall(obj) {
    let newY = window.innerHeight - 115; // Taille de l'objet doit être considérée

    gsap.to(obj, {
      duration: 2,
      y: newY,
      ease: "bounce.out",
      onComplete: () => {
        // Vérifier pour les interactions après chaque animation
        menuHandler.checkInteractions(obj);
        // Recommencer l'animation pour simuler un mouvement continu
        menuHandler.animateBall(obj);
      },
    });
  }

  static checkInteractions(currentObj) {
    const objs = document.querySelectorAll(".obj");
    objs.forEach((obj) => {
      if (obj !== currentObj && this.isClose(obj, currentObj)) {
        // Calculer une nouvelle trajectoire si les objets sont proches
        const angle = Math.atan2(
          currentObj.offsetTop - obj.offsetTop,
          currentObj.offsetLeft - obj.offsetLeft
        );
        gsap.to(currentObj, {
          x: "+=" + Math.cos(angle) * 30,
          y: "+=" + Math.sin(angle) * 30,
          ease: "power1.out",
        });
        gsap.to(obj, {
          x: "-=" + Math.cos(angle) * 30,
          y: "-=" + Math.sin(angle) * 30,
          ease: "power1.out",
        });
      }
    });
  }

  static isClose(obj1, obj2) {
    const distance = Math.sqrt(
      Math.pow(obj1.offsetLeft - obj2.offsetLeft, 2) +
        Math.pow(obj1.offsetTop - obj2.offsetTop, 2)
    );
    return distance < 50; // Seuil de distance pour une interaction
  }

  static loadCursor() {
    let cursor = document.querySelector(".curseur svg");
    // Définissez la largeur et la hauteur de votre SVG
    const svgWidth = cursor.clientWidth;
    const svgHeight = cursor.clientHeight;

    console.log("SVG Width: " + svgWidth);
    console.log("SVG Height: " + svgHeight);

    function updatePosition(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Ajustez la position pour centrer le SVG
      const offsetX = mouseX - svgWidth / 2;
      const offsetY = mouseY - svgHeight / 2;

      gsap.to(cursor, {
        duration: 0.2, // Durée de l'animation
        x: offsetX - 12, // Position horizontale ajustée
        y: offsetY - 12, // Position verticale ajustée
        ease: "power2.out", // Facilité de l'animation
      });
    }

    // Associer la fonction à l'événement de déplacement de la souris
    document.addEventListener("mousemove", updatePosition);
  }

  static cursorMorph() {
    let cursor = document.querySelector(".curseur #path1");
    let morphTl = gsap.timeline({repeat: -1});

    morphTl.to(".curseur #path1", {
      duration: 0.5,
      morphSVG: ".curseur #path2",
      ease: "linear",
    });
    morphTl.to(".curseur #path1", {
      duration: 0.5,
      morphSVG: ".curseur #path3",
      ease: "linear",
    });
    morphTl.to(".curseur #path1", {
      duration: 0.5,
      morphSVG: ".curseur #path4",
      ease: "linear",
    });
    morphTl.to(".curseur #path1", {
      duration: 0.5,
      morphSVG:
        "M44.1575 57.412C44.1575 57.412 53.826 33.2875 70.0552 28L99.4058 35.9313C120.563 46.8129 120.784 56.3859 117.361 74.5966C115.662 91.9126 111.056 97.8797 99.4058 105C83.6285 100.741 76.6162 105 59.0055 94.0944C41.3949 83.1888 44.1575 57.412 44.1575 57.412Z",
      ease: "linear",
    });

    // Fonction pour calculer l'angle entre deux points
    function calculateAngle(centerX, centerY, mouseX, mouseY) {
      const radians = Math.atan2(mouseY - centerY, mouseX - centerX);
      let angle = radians * (180 / Math.PI);
      return angle;
    }

    // Variables pour stocker la position précédente de la souris
    let prevMouseX = null;
    let prevMouseY = null;
    let mouseMoveTimeout;
    let moovingMorphTl; // Stocker la référence de la timeline ici

    function handleMouseMove(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Si c'est le premier mouvement de la souris, initialisez la position précédente
      if (prevMouseX === null || prevMouseY === null) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        return; // Pas d'angle à calculer lors du premier mouvement
      }

      // Calculer l'angle en fonction de la position précédente de la souris
      const angle = calculateAngle(prevMouseX, prevMouseY, mouseX, mouseY);

      // Si une timeline existe déjà, la tuer pour éviter des timelines multiples
      if (moovingMorphTl) {
        moovingMorphTl.kill();
      }

      moovingMorphTl = gsap.timeline({repeat: -1});
      morphTl.pause();

      moovingMorphTl.to(".curseur #path1", {
        duration: 0.5,
        morphSVG: ".curseur #mooving1",
        ease: "linear",
      });
      moovingMorphTl.to(".curseur #path1", {
        duration: 0.5,
        morphSVG: ".curseur #mooving2",
        ease: "linear",
      });
      moovingMorphTl.to(".curseur #path1", {
        duration: 0.5,
        morphSVG: ".curseur #mooving3",
        ease: "linear",
      });
      moovingMorphTl.to(".curseur #path1", {
        duration: 0.5,
        morphSVG: ".curseur #mooving4",
        ease: "linear",
      });

      gsap.to(".curseur #path1", {
        rotate: angle,
        duration: 0.2,
        transformOrigin: "center center", // Assurez-vous que l'origine de transformation est définie au centre
      });

      // Mettre à jour la position précédente de la souris
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Réinitialiser le délai d'inactivité
      clearTimeout(mouseMoveTimeout);

      mouseMoveTimeout = setTimeout(() => {
        console.log("Mouse stopped moving");
        moovingMorphTl.pause();
        gsap.to(".curseur #path1", {
          duration: 0.5,
          morphSVG: ".curseur #path4",
          onComplete: () => {
            morphTl.resume(4);
          },
        });
      }, 100); // 1 seconde d'inactivité
    }

    // Ajouter l'événement de mouvement de la souris
    document.addEventListener("mousemove", handleMouseMove);

    // Fonction pour calculer l'angle (doit être définie ailleurs dans votre code)
    function calculateAngle(x1, y1, x2, y2) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    }
  }

  static initChangeColor() {
    const icon = document.querySelector(".icon");

    icon.addEventListener("click", () => {
      gsap.set(".svg-line", {zIndex: 10});
      gsap.set("#lineLogo path", {drawSVG: "0% 0%"});
      prepareAnimationHandler.currentColorIndex =
        (prepareAnimationHandler.currentColorIndex + 1) % 3;

      const tlSwitchColor = prepareAnimationHandler.switchColor(
        prepareAnimationHandler.currentColorIndex
      );
      // MENU OPEN BURGER
      const iconTimeline = prepareAnimationHandler.animationColor(
        icon,
        prepareAnimationHandler.currentColorIndex
      );
      const burgerTimeline = prepareAnimationHandler.changeBurgerColor(
        prepareAnimationHandler.currentColorIndex
      );
      const lineLogoTimeline = prepareAnimationHandler.changeLineMorph(
        prepareAnimationHandler.currentColorIndex
      );
      tlSwitchColor.play();
      iconTimeline.play();
      burgerTimeline.play();
      lineLogoTimeline.play();
    });
  }

  static setStaticValue() {
    gsap.set(".svg-line", {zIndex: -1});
    gsap.set("#lineLogo path", {drawSVG: "0% 0%"});
    gsap.set("#burgerDraw1", {drawSVG: "0% 0%"});
    gsap.set(".openMenu", {
      attr: {
        width: window.innerWidth,
        height: window.innerHeight / 1.5,
        viewBox: `0 0 ${window.innerWidth} ${window.innerHeight / 1.5}`,
      },
    });
  }
}
