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
import {PhysicsPropsPlugin} from "gsap/PhysicsPropsPlugin.js";
import {letterSource} from "./letterSource";

// ES6 Modules
import Matter from "matter-js";
// Ou, si vous avez besoin d'accéder à des modules spécifiques
import {Engine, Render, World, Bodies} from "matter-js";

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

import {utilsHandler} from "./utilsHandler";
import {serviceHandler} from "./serviceHandler";
import {menuHandler} from "./menuHandler";

export class prepareAnimationHandler {
  static currentColorIndex = 2; // Indice de la couleur actuelle
  static colors = ["#C62369", "#9B9BC1", "#CDDD20", "#29292E"]; // Ordre des couleurs : purple, pink, yellow
  static isOpen = false;

  static animationFirstSectionHomepage() {
    const tl = gsap.timeline({paused: true});
    const containerFirstSection = document.querySelector(".main-container-top");
    const firstTransitionBlocs = document.querySelectorAll(
      ".container-transition-top > div"
    );

    // ANIMATION PADDING FIRST SECTION
    tl.to(containerFirstSection, {
      padding: "120px 0 0 0",
    });

    // ANIMATION TRANSITION FIRST SECTION

    tl.to(firstTransitionBlocs[0], {
      height: "100%",
    })
      .to(
        firstTransitionBlocs[1],
        {
          height: "100%",
        },
        "-=0.3"
      )
      .to(
        firstTransitionBlocs[2],
        {
          height: "100%",
        },
        "-=0.3"
      )
      .to(
        firstTransitionBlocs[3],
        {
          height: "100%",
        },
        "-=0.3"
      )
      .to(
        firstTransitionBlocs[4],
        {
          height: "100%",
        },
        "-=0.3"
      )
      .to(
        firstTransitionBlocs[5],
        {
          height: "100%",
        },
        "-=0.3"
      );

    // ANIMATION APPEAR SECOND SECTION

    const container = document.getElementById("screenSection");
    tl.set(container, {
      position: "fixed",
      top: 0,
      duration: 0,
      zIndex: 10,
      onComplete: () => {
        // ANIMATION DRAW FIRST LIGNE SECOND SECTION
        const tlSecondSection = gsap.timeline({});

        const containerBlocText = document.querySelectorAll(
          ".second-section-bloc-text"
        );

        // ANIMATION SVG PATH

        // ANIMATION APPEAR TEXT WITH BLOC
        containerBlocText.forEach((element, index) => {
          const blackBlock = document.createElement("div");
          blackBlock.style.position = "absolute";
          blackBlock.style.top = "0";
          blackBlock.style.background = "#29292E";
          blackBlock.style.left = "0";
          blackBlock.style.width = "0%";
          blackBlock.style.height = "100%";
          blackBlock.style.zIndex = "10";

          const h2Element = element.querySelectorAll("h2");
          const imgElement = element.querySelector("img");
          // Ajouter le bloc noir à l'élément parent
          element.appendChild(blackBlock);

          tlSecondSection.set(
            h2Element,
            {
              opacity: 0,
            },
            0
          );
          tlSecondSection.set(
            imgElement,
            {
              opacity: 0,
            },
            0
          );

          // Utiliser index pour décaler chaque animation séquentiellement
          const delay = index * 0.3; // ajustez la valeur du délai pour correspondre à vos besoins

          tlSecondSection
            .to(
              blackBlock,
              {
                duration: 0.2,
                width: "100%",
                background: "#000000",
                ease: "none",
                onComplete: () => {
                  // Supprimer le bloc noir
                  blackBlock.style.right = "0";
                  blackBlock.style.left = null;
                },
              },
              delay
            )
            .to(
              h2Element,
              {
                duration: 0,
                opacity: 1,
              },
              delay + 0.2
            )
            .to(
              imgElement,
              {
                duration: 0,
                opacity: 1,
              },
              delay + 0.2
            )
            .to(
              blackBlock,
              {
                duration: 0.2,
                width: "0%",
                ease: "none",
              },
              delay + 0.2
            ); // commence après la première animation
        });
      },
    });

    // ANIMATION APPEAR TV MAN BOY
    const tvMan = document.querySelector(".tv_man");
    // tl.fromTo(
    //   tvMan,
    //   {
    //     y: "100%",
    //   },
    //   {
    //     y: "0",
    //     ease: "none",
    //     duration: 0.5,
    //   }
    // )
    //   .to(tvMan, {
    //     width: "100vw",
    //     left: 0,
    //   })
    //   .to(tvMan, {
    //     scale: 5,
    //     y: 1000,
    //   });

    return tl;
  }

  static animationSecondSectionHomepage() {
    const tl = gsap.timeline({paused: true});
    console.log("test");
    const container = document.getElementById("screenSection");

    return tl;
  }

  static animationsBrunchText(content) {
    const tl = gsap.timeline({paused: true});

    content.forEach((element) => {
      const blackBlock = document.createElement("div");

      // Appliquer les styles au bloc noir
      blackBlock.style.position = "absolute";
      blackBlock.style.top = "0";
      blackBlock.style.background = "#29292E";
      blackBlock.style.left = "0";
      blackBlock.style.width = "0%";
      blackBlock.style.height = "100%";
      blackBlock.style.zIndex = "10";
      // Ajouter le bloc noir à l'élément parent
      element.appendChild(blackBlock);

      const svgElementDom = blackBlock.querySelector("svg");
      const maskElementDom = blackBlock.querySelector("mask");
      const pathElementsDom = blackBlock.querySelectorAll("path");
      const blackBlockWidth = blackBlock.getBoundingClientRect().width;
      const blackBlockHeight = blackBlock.getBoundingClientRect().height;

      // tl.set([svgElementDom, maskElementDom], {
      //   attr: {
      //     width: blackBlockWidth,
      //     height: blackBlockHeight,
      //     viewbox: `0 0 ${blackBlockWidth} ${blackBlockHeight}`,
      //   },
      // });

      // tl.set(pathElementsDom, {drawSVG: "0% 0%"});
      // tl.to(pathElementsDom, {
      //   drawSVG: "0% 100%",
      //   duration: 0.5,
      //   ease: "power1.inOut",
      // });
      // Animation pour rendre le bloc noir visible
      tl
        .to(blackBlock, {
          duration: 0.2,
          width: "100%",
          background: "#29292E",
          // drawSVG: "0% 100%",
          ease: "none",
          onComplete: () => {
            // Supprimer le bloc noir
            blackBlock.style.right = "0";
            blackBlock.style.left = null;
          },
        })
        .to(element.querySelector("h2"), {
          duration: 0,
          opacity: 1,
        })
        .to(blackBlock, {
          duration: 0.2,
          width: 0,
          // drawSVG: "0% 0%",
          ease: "none",
        }),
        "+=0.1";
    });

    return tl;
  }
  static eraseText() {
    const tl = gsap.timeline({paused: true});
    const lineErase = document.querySelectorAll(".line-erase-mauvaises path");

    if (lineErase.length > 0) {
      tl.to(lineErase, {
        drawSVG: "0% 100%",
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          letterSource
            .getLetters("M,A,U,V,A,I,S,E,S")
            .then((letters) => {
              const container = document.querySelector(
                ".mauvaises-text-letter"
              );
              const svgHTML = letters
                .map((svg) =>
                  svg != "*"
                    ? "<span>" + svg + "</span>"
                    : "<b class='space'></b>"
                )
                .join("");
              container.innerHTML += `<div class="lm-typo index z-9 rotate ro--350">${svgHTML}</div>`;

              const width = container.getBoundingClientRect().width;
              const tlLetterSourceAnime =
                prepareAnimationHandler.animeLetterSource(
                  container,
                  100,
                  0.3,
                  "#C62369",
                  1.5
                );
              return tlLetterSourceAnime.play();
            })
            .catch((error) => {
              console.error("Une erreur s'est produite :", error);
            });
        },
      });
    }

    return tl;
  }

  static animationSwitch(element) {
    const tl = gsap.timeline({paused: true});
    const title = element.querySelector(".title h2");
    const fakeTitle = element.querySelector(
      ".fake-title .elementor-widget-container"
    );
    const svg = element.querySelector(".svg path");
    const container = element.querySelector(".container-image");
    const images = element.querySelectorAll(".container-image img");
    const illustration = element.querySelector(".image-switch img");
    const lineElement = element.querySelector(".line-decoration");
    const svgLineElement = element.querySelector(".line-decoration svg");
    const pathLineElement = element.querySelectorAll(".line-decoration path");

    tl.set(illustration, {
      opacity: 0,
    });

    tl.to(element, {
      flexGrow: 2,
      duration: 0.2,
    })
      .to(
        illustration,
        {
          transform: "translate(0, -10%)",
          duration: 0,
          opacity: 1,
        },
        "-=0.1"
      )

      .to(
        pathLineElement,
        {
          drawSVG: "100%",
          ease: "power1.inOut",
          stroke: "#C62369",
          duration: 0.3,
          opacity: 0.6,
        },
        "-=0.15"
      )
      .to(
        title,
        {
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "calc(1800vw / 1018)",
          letterSpacing: "2px",
          fontWeight: 400,
          duration: 0.1,
        },
        "-=0.25"
      )
      .to(
        fakeTitle,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.1,
        },
        "-=0.25"
      );

    // tl.to(container, {
    //   // width: newSize,
    //   // height: newSize,
    //   // top: newTop,
    //   left: 60,
    //   duration: 0,
    // });
    // .to(
    //   illustration,
    //   {
    //     width: newSize,
    //     height: newSize,
    //     transform: "translate(0, -50%)",
    //     duration: 0,
    //     onComplete: () => {
    //       tl.to(illustration, {
    //         opacity: 1,
    //         duration: 0.1,
    //       });
    //     },
    //   },
    //   "-=0.1"
    // )
    // .to(images, {duration: 0.1, opacity: 1, stagger: 0.1});

    return tl;
  }

  static animeLetterSource(target, size, duration, color, max) {
    const tl = gsap.timeline({paused: true});
    const spanElement = target.querySelectorAll(".lm-typo > span");
    const pathElement = target.querySelectorAll(".lm-typo path");
    const svgElement = target.querySelectorAll(".lm-typo svg");
    let stagger;

    max = parseFloat(max).toFixed(2);
    const minMaxWidth = utilsHandler.setDynamicFontSize(size / max);
    size = parseInt(utilsHandler.setDynamicFontSize(size));

    duration == 0.05 ? (stagger = 0.01) : (stagger = 0.1);
    gsap.set(spanElement, {
      width: `calc(${size}vw / 1018)`,
      maxWidth: `calc(${minMaxWidth}vw / 1018)`,
      minWidth: `calc(${minMaxWidth}vw / 1018)`,
    });
    gsap.set(pathElement, {
      stroke: "#29292E",
    });
    gsap.set(svgElement, {
      attr: {
        width: `calc(${size}vw / 1018)`,
        height: `calc(${size}vw / 1018)`,
      },
    });

    tl.fromTo(
      pathElement,
      {
        drawSVG: "0%",
        duration: duration,
      },
      {
        drawSVG: "100%",
        duration: duration,
        stroke: color,
        stagger: stagger,
      }
    );
    return tl;
  }

  static animationMenuOpen(container, currentColorIndex) {
    const tl = gsap.timeline({paused: true});
    const tlShowMenuItem = prepareAnimationHandler.showMenuItem();

    // Troisième animation
    const globalColor = getComputedStyle(
      document.querySelector(".elementor-kit-7")
    ).getPropertyValue("--e-global-color-0259c30");

    // Utiliser la valeur dans votre TweenLite
    tl.set("#burgerDraw1", {stroke: globalColor});
    tl.set("#lineLogo path", {stroke: "#29292E"});
    tl.set(".openMenu", {top: 0, duration: 0});
    tl.set(".menu", {background: "transparent", duration: 0.5});

    // Lancement simultané des animations
    tl.to(["#burgerDraw1", "#lineLogo path"], {
      drawSVG: "0% 100%",
      duration: 1,
      ease: "power1.inOut",
      onComplete: function () {
        letterSource
          .getLetters("O,U,*,P,A,S")
          .then((letters) => {
            const newsProject = document.querySelector(".news-project");
            const svgHTML = letters
              .map((svg) =>
                svg != "*"
                  ? "<span>" + svg + "</span>"
                  : "<b class='space'></b>"
              )
              .join("");
            newsProject.innerHTML += `<div class="lm-typo rotate ro-20 top t-15 right r-60">${svgHTML}</div>`;

            const target = document.querySelector(".container-project");
            const width = target.getBoundingClientRect().width;
            const tlLetterSourceAnime =
              prepareAnimationHandler.animeLetterSource(
                newsProject,
                18,
                0.5,
                "#28282D",
                1
              );
            return tlLetterSourceAnime.play();
          })
          .catch((error) => {
            console.error("Une erreur s'est produite :", error);
          });

        letterSource
          .getLetters("V,I,E,N,S,*,N,O,U,S,*,D,I,R,E,*,B,O,N,J,O,U,R")
          .then((letters) => {
            const target = document.querySelector(".target-adresse");
            const widthElement = target
              .querySelector(".elementor-heading-title")
              .getBoundingClientRect().width;
            const sizeByCase = Math.round(widthElement / letters.length);
            const svgHTML = letters
              .map((svg) =>
                svg != "*"
                  ? "<span>" + svg + "</span>"
                  : "<b class='space'></b>"
              )
              .join("");
            target.innerHTML += `<div class="lm-typo top t-25 left">${svgHTML}</div>`;

            const tlLetterSourceAnime =
              prepareAnimationHandler.animeLetterSource(
                target,
                sizeByCase * 1.5,
                0.2,
                "28282D",
                1
              );
            return tlLetterSourceAnime.play();
          })
          .catch((error) => {
            console.error("Une erreur s'est produite :", error);
          });
      },
    })
      .to(
        ".detail-menu",
        {
          top: 0,
          zIndex: 11,
          duration: 0,
          onComplete: function () {
            tlShowMenuItem.play();
          },
        },
        "-=0.5"
      )
      .to("#lineLogo path", {
        drawSVG: "0% 0%",
        stroke: prepareAnimationHandler.colors[3],
        duration: 0.5,
        ease: "power1.inOut",
      })
      .to(
        "#mainLogo path",
        {
          fill: prepareAnimationHandler.colors[3],
          duration: 0.5,
          ease: "power1.inOut",
        },
        "=-0.3"
      );
    return tl;
  }

  static animationMenuClose(container, currentColorIndex) {
    const tl = gsap.timeline({paused: true});
    const allLettersMenu = document.querySelectorAll(
      "#menu-1-4871bd2 li a > div:not(.invisible-container)"
    );

    allLettersMenu.forEach((letter, index) => {
      tl.from(
        letter,
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: "bounce.out",
        },
        index * 0.01
      );
    });

    return tl;
  }

  static splitText(contentNewsProject, type) {
    const tl = gsap.timeline({paused: true});

    const splitProject = new SplitText(contentNewsProject, {type: type});
    let project;

    switch (type) {
      case "words":
        project = splitProject.words;
        break;
      case "chars":
        project = splitProject.chars;
        break;
    }

    gsap.set(contentNewsProject, {
      y: 0,
      duration: 0,
    });

    project.forEach((char, index) => {
      tl.from(
        char,
        {
          y: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power4.out",
        },
        "-=0.1"
      );
    });

    return tl;
  }

  static animationLoaderPercent(balls, world, obstacleZero, ground) {
    const tl = gsap.timeline({paused: true});
    const text = document.querySelector(".zero-text");
    const steps = 4;

    // Fonction récursive pour animer chaque étape
    function animateStep(step, duration, newText) {
      text.innerHTML = newText;
      const splitText = new SplitText(text, {type: "chars"});

      tl.from(splitText.chars, {
        y: 200,
        stagger: 0.1,
        delay: 0.2,
        duration: 0.4,
      });
      if (step < steps) {
        tl.to(splitText.chars, {
          y: -200,
          stagger: 0.1,
          delay: 0.2,
          duration: 0.4,
          onComplete: function () {
            animateStep(
              step + 1,
              duration,
              (parseInt(newText) + 25).toString()
            );
          },
        });
      } else {
        Matter.World.remove(world, ground);
        const loader = document.querySelector(".loader");
        setTimeout(() => {
          gsap.to(loader, {
            duration: 1,
            opacity: 0,
            ease: "power4.out",
            onComplete: () => {
              gsap.to(loader, {
                duration: 0,
                y: "100vh",
                ease: "none",
              });
            },
          });
        }, 2000);
      }
    }

    // Appeler la fonction récursive pour animer chaque étape
    animateStep(1, 1, "25");

    return tl;
  }
  static detailMenu() {
    menuHandler.setStaticValue();
    menuHandler.loadCursor();
    menuHandler.cursorMorph();
    menuHandler.initChangeColor();

    const menu = document.querySelector(".menu");
    const logo = document.querySelector(".main-logo");
    const button =
      menu.querySelector(".menu-button") || menu.querySelector(".burger-icon");
    const container = document.querySelector(".detail-menu");
    const tlOpen = prepareAnimationHandler.animationMenuOpen(
      container,
      prepareAnimationHandler.currentColorIndex
    );
    logo.addEventListener("click", () => {
      window.location.href = "/";
    });
    button.addEventListener("click", () => {
      if (prepareAnimationHandler.isOpen) {
        tlOpen.reverse();
      } else {
        tlOpen.play();
      }

      prepareAnimationHandler.isOpen = !prepareAnimationHandler.isOpen; // Inverser l'état isOpen
    });
  }

  static showMenuItem() {
    const tl = gsap.timeline({paused: true});

    const menuItems = document.querySelectorAll("#menu-1-4871bd2 li a");

    menuItems.forEach((line, index) => {
      const svg = `<svg  style="visibility: hidden" class="absolute" width="468" height="54" viewBox="0 0 468 54" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="mask0_3562_37614" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="468" height="54">
    <path d="M339.542 2.47479C338.275 2.63604 337.008 2.79354 335.741 2.95479C335.793 3.21354 335.849 3.47604 335.901 3.73479C337.482 3.54354 339.64 3.76104 340.546 3.08604C344.048 0.479795 348.281 2.00604 352.149 1.66479C352.654 1.61979 353.215 2.55355 353.905 2.79355C354.616 3.0373 355.522 2.98855 356.341 3.06355V1.11354C358.01 1.47354 359.617 1.81854 361.373 2.19729C361.409 2.12979 361.635 1.69854 361.986 1.03479C362.892 1.57104 363.726 2.05854 364.586 2.56854C365.951 1.48854 367.321 -0.476462 368.871 2.79729C372.322 -1.33146 375.69 2.24229 379.31 2.89854C379.192 1.98354 379.109 1.33479 379.027 0.686036L379.537 0.566045C379.985 1.27479 380.438 1.97979 381.221 3.21354C381.767 2.05479 382.081 1.37979 382.441 0.611043C385.897 2.13354 389.311 3.08979 393.056 0.806039C393.334 1.18854 393.844 1.90479 394.353 2.61729C394.704 2.42229 395.054 2.22729 395.404 2.02854C395.461 1.49229 395.517 0.959793 395.553 0.599793C397.5 1.10604 399.189 1.54479 400.878 1.97979C401.043 -0.637709 403.366 0.731046 404.885 0.907296C405.678 1.00105 406.379 1.52604 407.264 1.92354C407.754 1.45479 408.346 0.884789 408.933 0.31479C409.015 0.55479 409.098 0.791041 409.185 1.03104C410.298 0.952291 411.405 0.832289 412.517 0.806039C413.553 0.783539 414.593 0.911043 415.628 0.881043C422.998 0.671043 430.367 0.416046 437.742 0.251046C438.587 0.232296 439.452 0.689788 440.914 1.09854C443.062 1.09854 446.095 0.933536 449.072 1.15479C451.287 1.31979 453.455 1.93854 455.607 2.43729C456.746 2.69979 458.481 2.97729 458.739 3.53979C459.053 4.22979 458.193 5.25354 457.683 6.08604C457.276 6.75729 456.56 7.32729 456.122 7.99104C453.3 12.2698 448.82 13.6423 441.965 13.0348C439.194 12.791 436.249 13.9198 433.344 14.0735C429.548 14.276 425.717 14.066 421.911 14.171C420.783 14.201 419.702 14.8835 418.564 14.9548C408.197 15.6223 397.814 16.1473 387.458 16.8673C378.043 17.5198 368.655 18.3748 359.256 19.121C355.538 19.4173 351.819 19.7623 348.086 19.9123C342.658 20.1298 337.194 20.0098 331.786 20.3623C325.287 20.7823 318.823 21.5285 312.35 22.1773C311.84 22.2298 311.397 22.6385 311.037 23.366C316.537 22.166 321.919 23.5085 327.403 23.1035C332.409 22.736 337.564 23.4485 342.822 23.6735C343.966 23.7185 345.109 23.8198 346.252 23.801C348.869 23.7485 351.485 23.5423 354.096 23.5723C358.777 23.6248 363.459 23.9173 368.135 23.8985C371.92 23.8835 375.716 23.3473 379.49 23.426C384.053 23.5198 388.616 23.9473 393.159 24.3635C397.809 24.791 402.434 25.376 407.682 25.961C406.616 28.1398 405.709 29.9885 404.617 32.2123C404.921 32.516 405.673 33.2585 406.42 34.0048L406.667 33.1423C410.102 33.3523 413.542 33.5548 416.977 33.7723C417.616 33.8135 418.27 34.0085 418.883 33.9485C422.256 33.626 425.604 33.1798 428.987 32.9323C429.677 32.8835 430.424 33.5698 431.207 33.8098C431.768 33.9823 432.541 34.1623 433.035 34.016C437.006 32.8198 436.995 32.7973 440.24 34.016C443.139 30.3223 446.24 35.3173 449.407 33.7873C449.134 33.5435 448.809 33.251 448.217 32.7223C454.026 33.2173 459.578 33.506 464.991 34.3048C466.108 34.4698 467.411 36.5585 467.319 37.7023C467.236 38.666 465.243 39.5398 463.884 40.6235C465.485 42.596 465.114 43.1735 460.907 43.0685C453.702 42.8923 446.502 42.3785 439.303 42.3485C434.487 42.3298 429.672 43.031 424.841 43.1735C419.454 43.3348 414.052 43.2185 408.655 43.2373C402.393 43.2598 396.13 43.316 389.868 43.3198C381.607 43.3273 373.347 43.1735 365.091 43.3198C359.302 43.421 353.534 44.0398 347.746 44.1748C343.085 44.2835 338.414 43.9498 333.743 43.9385C331.101 43.931 328.459 44.186 325.817 44.3173C314.307 44.8948 302.807 45.6223 291.286 46.001C282.562 46.286 273.807 46.0423 265.068 46.1923C261.283 46.2598 257.523 46.8448 253.738 46.991C245.58 47.3023 237.412 47.4785 229.244 47.7073C226.716 47.7785 224.177 47.7935 221.653 47.9098C213.82 48.2735 205.992 48.6635 198.159 49.0573C186.726 49.6273 175.298 50.2498 163.865 50.7598C160.301 50.9173 156.707 50.786 153.133 50.786C153.102 50.4898 153.066 50.1898 153.035 49.8935C160.116 49.5523 167.197 49.2073 175.283 48.8173C173.897 48.1273 173.032 47.3323 172.285 47.3848C162.969 48.0485 153.663 48.8323 144.455 50.2723C146.772 50.111 149.09 49.9535 151.407 49.7923C151.464 50.0773 151.526 50.3623 151.582 50.6473C146.638 52.196 141.118 51.3448 135.942 51.911C130.483 52.511 124.947 52.7885 119.441 53.1298C113.9 53.471 108.348 53.7185 103.466 53.9735C102.554 50.8685 101.766 48.1798 100.917 45.2773C102.652 45.5885 103.631 45.7648 104.609 45.941C104.831 45.2248 105.057 44.5085 105.227 43.9535C119.019 42.8998 133.109 41.8198 147.2 40.7435C147.215 40.2935 147.236 39.8473 147.251 39.3973C142.755 40.0273 138.553 38.9885 134.247 38.8798C129.195 38.7523 124.123 39.0035 119.065 39.2135C114.039 39.4235 109.028 39.7835 104.017 40.0798C104.213 37.961 104.372 36.1723 104.532 34.4398C99.1142 34.541 102.827 31.001 100.494 29.801C103.857 29.3548 106.726 28.976 109.847 28.5635C109.651 28.9273 109.404 29.3885 109.157 29.8498C109.368 30.011 109.579 30.1723 109.785 30.3298C110.702 29.6998 111.613 29.066 112.473 28.4735C114.508 30.5435 118.004 29.0548 121.089 28.856C128.366 28.3835 135.617 27.6898 142.874 27.0598C149.62 26.471 156.367 25.8523 163.108 25.241C171.255 24.4985 179.403 23.7485 187.55 23.006C195.749 22.256 203.942 21.4835 212.146 20.7823C215.664 20.4823 219.207 20.3248 222.74 20.1073C229.028 19.7135 235.321 19.346 241.604 18.8998C242.294 18.851 242.928 18.3785 244.674 17.651C242.629 17.3735 241.558 17.0698 240.523 17.1148C233.019 17.456 225.526 17.9023 218.023 18.2435C210.03 18.611 210.025 18.5773 208.304 19.6648C205.925 18.0185 201.81 18.1123 200.142 19.5785H192.648C192.654 19.6235 192.659 19.6648 192.664 19.7098C188.874 19.7098 185.068 19.5673 181.293 19.7435C176.199 19.9835 171.121 20.4748 166.038 20.846C161.125 21.206 156.212 21.5773 151.289 21.8848C147.869 22.0985 144.408 22.0685 141.009 22.3948C136.925 22.7848 132.903 23.5198 128.825 23.9473C126.069 24.236 123.263 24.2473 120.482 24.3898C118.586 24.4873 116.686 24.5285 114.806 24.7048C109.883 25.1698 104.98 25.7435 100.051 26.1785C95.3856 26.591 90.6991 26.8723 86.0177 27.2248C78.6069 27.7835 71.1857 28.2635 63.7955 28.946C55.8027 29.6848 47.8459 30.6298 39.8634 31.451C35.8928 31.8598 31.9015 32.141 27.9412 32.5873C23.1002 33.131 18.2901 33.8285 13.4491 34.3835C9.43722 34.8448 5.39962 35.1898 1.37747 35.591L0.826416 34.8298C3.12847 34.0648 5.43052 33.2998 7.73257 32.5348C7.62442 32.2198 7.51627 31.9048 7.40812 31.5898C4.42112 32.5085 1.98002 32.4298 2.67012 29.7185C2.92247 28.7248 4.76617 27.3823 6.13607 27.1948C13.5109 26.1973 20.9732 25.5485 28.3944 24.7123C35.7022 23.8873 42.9895 22.9798 50.4106 22.0948C50.2767 21.4798 50.1325 20.8423 49.9935 20.2048C51.0338 22.571 53.1504 21.7385 55.2259 21.4235C58.5785 20.9135 61.9672 20.4823 65.3714 20.2048C67.8279 20.006 70.3257 20.1298 72.808 20.096C75.0328 20.066 75.0122 20.0585 75.2233 18.101C75.2439 17.921 75.692 17.606 75.8928 17.6248C76.3718 17.6735 76.9074 17.8085 77.2576 18.041C77.8859 18.4573 78.3957 18.971 78.9571 19.4435C79.2609 18.7798 79.5648 18.116 79.6214 17.996C83.005 18.3785 86.4967 18.7723 90.2819 19.1998V16.376C90.5858 16.256 90.8845 16.1398 91.1883 16.0198C91.6467 16.6198 92.105 17.2198 93.0063 18.3935C94.4637 18.2435 96.7761 17.936 99.109 17.7748C105.16 17.3548 111.232 17.0698 117.263 16.5448C118.324 16.451 119.235 15.4535 120.219 14.8723C120.152 14.5085 120.08 14.141 120.013 13.7773C121.239 14.3285 122.459 14.8798 124.339 15.7273C124.509 15.6148 125.379 15.0373 126.255 14.4598C126.316 14.6735 126.383 14.891 126.445 15.1048C127.424 14.9173 128.402 14.726 129.381 14.5385L129.087 13.9273C130.926 14.2723 132.764 14.6173 134.608 14.9585L134.948 14.5273C134.505 14.2573 134.057 13.9835 133.073 13.3835H135.586C135.2 15.4873 137.482 15.0185 138.713 14.7973C140.036 14.561 141.143 13.691 141.833 13.3535C144.372 13.6685 146.834 14.3285 149.213 14.2048C157.047 13.8035 164.859 13.1698 172.661 12.5098C174.52 12.3523 177.662 12.9373 176.601 9.89229C179.578 9.91104 182.596 9.05979 184.882 11.261C185.145 11.5123 186.149 11.426 186.798 11.381C200.27 10.4698 213.748 9.55104 227.21 8.57604C227.766 8.53479 228.25 7.92729 228.755 7.57104C229.11 7.31979 229.445 6.83604 229.785 6.83604C230.475 6.83604 231.397 6.95229 231.799 7.28604C232.947 8.24604 232.757 8.19728 233.9 7.52978C234.827 6.98979 236.063 6.72728 236.151 6.69728C238.571 7.13978 240.085 7.41729 241.599 7.69479C241.517 7.27104 241.434 6.85104 241.383 6.59229C243.386 6.84354 245.776 7.14354 248.16 7.44354C248.078 7.09479 248.001 6.74229 247.846 6.07854C249.072 6.70104 250.107 8.28729 251.621 6.15354C252.085 5.50104 256.148 6.18354 258.558 6.28479C259.588 6.32604 260.958 6.78729 261.592 6.46104C265.464 4.46229 270.892 4.25229 274.049 5.66229C277.134 5.26479 279.838 4.26354 281.198 4.86729C284.282 6.23979 286.44 4.45479 288.717 4.50354C294.67 4.63479 300.629 1.97979 306.592 4.34229C306.685 4.37979 309.754 5.60229 308.626 3.34854C309.409 3.17229 310.187 2.87229 310.98 2.83479C315.007 2.63979 319.045 2.51229 323.325 2.35104C323.603 2.97729 323.901 3.65979 324.143 4.20729C325.766 4.13979 327.218 4.08354 328.881 4.01604C328.799 3.51354 328.717 2.99604 328.516 1.78104C332.378 4.10604 335.824 1.88229 339.429 1.69104C339.475 1.94229 339.516 2.19354 339.563 2.44479L339.542 2.47479ZM169.952 18.2398C166.754 18.2698 163.551 18.2585 160.353 18.371C159.791 18.3898 159.266 18.9335 158.725 19.2335C159.117 19.5185 159.549 20.081 159.894 20.051C163.582 19.7435 167.254 19.346 170.931 18.9748C181.684 18.9298 184.46 18.5135 185.14 16.2598C179.882 16.946 174.917 17.5948 169.952 18.2398ZM208.212 16.1585C209.18 16.3198 210.169 16.6573 211.122 16.6123C218.687 16.256 226.252 15.8435 233.807 15.386C234.219 15.3598 234.575 14.7785 234.951 14.456C234.338 14.2498 233.715 13.856 233.107 13.8673C228.359 13.9648 223.6 14.0473 218.862 14.321C215.298 14.5273 211.765 15.0035 208.222 15.3598C202.739 15.4948 199.907 16.1535 199.725 17.336C202.624 16.9348 205.415 16.5485 208.207 16.1585H208.212ZM190.058 46.9648C190.182 47.3285 190.31 47.696 190.434 48.0598C202.083 47.5948 213.727 47.1335 225.439 46.6685C224.306 45.0335 221.875 44.7485 217.925 45.011C209.777 45.5585 201.599 45.8323 193.436 46.2748C192.293 46.3385 191.186 46.7248 190.063 46.961L190.058 46.9648ZM148.477 35.8835C148.549 36.2323 148.621 36.581 148.698 36.9298C160.827 36.3185 172.95 35.7073 185.078 35.096C185.202 34.8598 185.32 34.6235 185.438 34.3835C184.707 34.0948 183.955 33.5473 183.255 33.581C182.271 33.6298 181.339 34.3535 180.366 34.3723C173.954 34.4998 167.527 34.3723 161.12 34.6198C156.887 34.7848 152.69 35.4448 148.472 35.8798L148.477 35.8835ZM147.756 40.7173C157.083 39.956 165.369 39.281 174.088 38.5685C170.952 37.0873 150.393 38.4223 147.756 40.7173ZM448.696 41.066C444.798 38.6023 434.477 38.5873 430.517 41.066H448.696ZM225.964 33.131L225.861 32.0623C219.217 32.366 212.574 32.6735 205.93 32.9773C205.961 33.296 205.992 33.6148 206.028 33.9298C212.672 33.6635 219.32 33.3973 225.964 33.131ZM284.973 44.1973C281.764 41.9773 275.409 42.3298 273.993 44.1973H284.973ZM250.05 22.8335C250.066 23.2535 250.076 23.6735 250.092 24.0898C255.159 23.861 260.232 23.6323 265.299 23.4035C265.31 23.141 265.315 22.8748 265.32 22.6123C260.247 20.6248 255.123 24.3035 250.045 22.8298L250.05 22.8335ZM157.113 18.9823C156.944 18.746 156.779 18.5098 156.609 18.2698C153.308 18.7048 150.006 19.1435 146.705 19.5785C146.824 19.9573 146.942 20.3323 147.061 20.711C150.315 19.8335 154.343 21.3973 157.113 18.9785V18.9823ZM256.138 45.0298C258.98 44.4748 262.529 46.031 265.768 43.5373C261.602 43.2485 258.409 42.761 256.138 45.0298Z" fill="#CDDD20"/>
    </mask><g mask="url(#mask0_3562_37614)"><path d="M4 31L210.5 13L452.5 5.5L105 31L402 27.5L105 49.5L465 38.5" stroke="#CDDD20" stroke-width="20"/></g></svg>`;

      const widthElement = line.offsetWidth;
      const heightElement = line.offsetHeight;
      line.innerHTML += svg;
      line.innerHTML += `<div class="invisible-container"></div>`;

      const pathElement = line.querySelectorAll("path");
      tl.set(pathElement, {
        drawSVG: "0% 0%",
        stroke: "white",
      });
      const svgElement = line.querySelector("svg");
      const chars = new SplitText(line, {type: "chars"}).chars;
      const randomDelay = Math.random() * (0.3 - 0.1) + 0.1;

      const tlLineSvg = prepareAnimationHandler.animationFooter(pathElement);

      const target = line.querySelector(".invisible-container");
      tl.set(svgElement, {
        autoAlpha: 1,
        left: -40,
        visibility: "visible",
        width: widthElement,
        height: heightElement,
      });
      tl.from(
        chars,
        {
          y: 20,
          opacity: 0,
          duration: 0.1,
          stagger: 0.05,
          ease: "bounce.out",
        },
        index * 0.15
      );

      target.addEventListener("mouseenter", () => {
        tlLineSvg.play();
      });

      target.addEventListener("mouseout", () => {
        tlLineSvg.reverse();
      });
    });

    return tl;
  }

  static animationColor(icon, currentColorIndex) {
    const tl = gsap.timeline({paused: true});

    tl.to(icon, {
      x: "-80px",
      rotate: -180,
      duration: 0.7,
      onComplete: function () {
        //ICON CHANGE
        gsap.to(icon.querySelector("circle"), {
          fill: prepareAnimationHandler.colors[currentColorIndex],
          duration: 0,
        });
        gsap.to(icon.querySelector("svg"), {
          fill: currentColorIndex === 2 ? "black" : "white",
          duration: 0,
        });
      },
    }).to(icon, {
      x: 0,
      rotate: -360,
      duration: 0.7,
    });

    return tl;
  }

  static changeLineMorph(currentColorIndex) {
    const tl = gsap.timeline({paused: true});

    const logo = document.querySelector("#mainLogo");
    const width = logo.getBoundingClientRect().width;
    const height = logo.getBoundingClientRect().height;

    tl.set("#lineLogo", {
      attr: {
        width: width + 50,
        height: height,
      },
    });

    tl.to("#lineLogo path", {
      drawSVG: "0% 100%",
      stroke: prepareAnimationHandler.colors[currentColorIndex],
      duration: 0.5,
      ease: "power1.inOut",
    })
      .to(
        "#mainLogo path",
        {
          fill: prepareAnimationHandler.colors[currentColorIndex],
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.3"
      )
      .to("#lineLogo path", {
        drawSVG: "0% 0%",
        stroke: prepareAnimationHandler.colors[currentColorIndex],
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: function () {
          tl.to(".svg-line", {zIndex: -1, duration: 0});
        },
      });

    return tl;
  }
  static changeBurgerColor(currentColorIndex) {
    const tl = gsap.timeline({paused: true});

    const circlePath = MorphSVGPlugin.convertToPath("#circle-start");
    const circlePathEnd = MorphSVGPlugin.convertToPath("#circle-end");
    const circleModel = document.querySelector(".circle-model svg circle");

    tl.set(circlePath, {
      duration: 0,
      fill: prepareAnimationHandler.colors[currentColorIndex],
      morphSVG: circlePath,
    });

    tl.to(circlePath, {
      duration: 0.7,
      fill: prepareAnimationHandler.colors[currentColorIndex],
      morphSVG: "#morph1",
    })
      .to(
        circlePath,
        {
          duration: 0.7,
          fill: prepareAnimationHandler.colors[currentColorIndex],
          morphSVG: "#morph2",
        },
        "-=0.3"
      )
      .to(
        circlePath,
        {
          duration: 0.7,
          fill: prepareAnimationHandler.colors[currentColorIndex],
          morphSVG: "#morph3",
        },
        "-=0.3"
      )
      .to(
        circlePath,
        {
          duration: 0.7,
          fill: prepareAnimationHandler.colors[currentColorIndex],
          morphSVG: circlePathEnd,
        },
        "-=0.3"
      )
      .to(circleModel, {
        duration: 0.7,
        fill: prepareAnimationHandler.colors[currentColorIndex],
      });

    return tl;
  }

  static switchColor(currentColorIndex) {
    const tl = gsap.timeline({paused: true});
    const elements = document.querySelectorAll(".color-switcher");
    const allElements = document.querySelectorAll("main *");

    tl.staggerTo(allElements, 0.3, {
      "--e-global-color-0259c30":
        prepareAnimationHandler.colors[currentColorIndex],
    });
    if (elements.length > 0) {
      tl.staggerTo(
        elements,
        0.3,
        {
          backgroundColor: prepareAnimationHandler.colors[currentColorIndex],
        },
        0
      );
    }

    return tl;
  }

  static animationFooter(element) {
    const tl = gsap.timeline({paused: true});

    tl.to(element, {
      duration: 0.5,
      drawSVG: "100%",
      ease: "none",
    });

    return tl;
  }

  static constructTransition(state) {
    const tl = gsap.timeline({paused: true});
    const containerTransition = document.querySelector(".transition");
    const clientReact = containerTransition.getBoundingClientRect();
    const width = clientReact.width;
    const height = clientReact.height;

    const lineElement = `<svg width="2424" id="lineElement" height="2177" viewBox="0 0 2424 2177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_3661_36980" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="2424" height="2177">
    <path d="M2296.01 859.537C2284.37 858.679 2272.95 856.052 2262.25 851.992C2259.59 850.954 2256.94 849.878 2254.36 848.686L2252.44 847.802L2250.79 846.983C2249.7 846.38 2248.55 846.035 2247.42 845.586C2244.94 844.638 2242.44 843.678 2239.96 842.73C2237.45 841.705 2234.96 840.693 2232.46 839.668C2212.51 831.392 2193.32 821.964 2174.14 812.24C2150.42 800.224 2126.69 787.17 2103.65 773.604C2091.7 766.571 2078.76 758.603 2066.04 751.596C2053.37 744.511 2040.93 738.349 2030.05 734.788C2027.73 734.019 2024.76 732.431 2021.81 730.317C2019.03 728.319 2017.71 726.999 2020.24 727.845C2034.1 732.469 2016.47 722.874 2010.62 719.364C1980.38 701.02 1950.05 682.598 1919.71 664.189C1891.94 647.344 1864.68 630.216 1837.73 612.781C1810.75 595.397 1784.06 577.757 1757.35 560.001C1734.99 545.192 1712.43 530.255 1689.89 515.344C1661.12 496.32 1631.99 477.399 1603.72 457.953C1569.94 434.727 1537.31 410.426 1503.63 387.367C1458.59 356.494 1413.12 324.826 1370.48 293.389C1340.69 271.432 1309.29 250.563 1281.23 228.388C1259.05 210.825 1234.62 194.633 1211.31 177.262C1180.19 154.1 1147.87 130.798 1114.92 109.366C1109.87 106.086 1104.82 102.807 1099.78 99.5274L1092.17 94.5953C1089.63 92.9684 1087.08 91.4696 1084.55 89.8939C1074.39 83.6551 1064.23 77.4036 1054.07 71.1649C1043.88 64.939 1033.67 58.7643 1023.34 52.6921L1015.56 48.17C1013.1 46.7865 1010.01 44.8393 1006.94 43.5198C1001.46 40.9449 996.025 38.4596 990.504 36C983.048 32.6693 977.475 29.3514 971.98 25.9822C969.238 24.2912 966.509 22.5874 963.576 20.8708C962.103 20.0125 960.591 19.1414 958.99 18.2703C958.183 17.8347 957.363 17.3992 956.53 16.9508C955.556 16.4512 954.57 15.9516 953.545 15.4391L950.509 13.9403L948.997 13.1845C948.741 13.0692 948.498 12.9155 948.229 12.8258L947.409 12.5952L940.888 10.7889L929.436 7.61192C921.916 5.51099 914.409 3.39726 906.902 1.29633L903.264 0.284302L899.421 1.53973C892.721 3.73033 886.047 5.90812 879.372 8.08591L871.327 10.7121L870.533 19.3848C869.47 30.9399 870.123 42.9177 872.967 54.4856C874.351 60.5194 877.348 69.0768 878.77 69.871C880.051 70.7037 881.063 71.7926 882.024 73.048C882.972 74.3163 883.741 75.8279 884.599 77.4549C885.009 78.2747 885.406 79.1459 885.816 80.0682C886.239 80.9649 886.674 81.9001 887.136 82.8737C888.007 84.8465 889.07 86.845 890.223 88.9971C890.607 89.6889 890.991 90.3807 891.389 91.0724C891.734 91.7514 892.196 92.3407 892.452 93.0581C893.015 94.4672 893.566 95.838 894.143 97.1959C895.565 100.437 897 103.576 898.473 106.548C901.394 112.53 904.366 117.949 907.21 122.574C912.91 131.836 918.086 137.933 921.455 139.035C925.695 146.311 929.397 154.549 927.514 152.755C921.903 147.323 923.095 151.09 926.003 156.714C928.936 162.312 933.599 169.742 934.855 171.651C943.809 185.499 951.15 198.258 959.528 211.632C969.251 227.095 979.333 242.518 989.543 257.584C999.727 272.623 1009.82 287.791 1020.1 302.83C1040.86 332.858 1061.91 362.732 1083.6 392.107C1090.32 401.215 1098.21 410.823 1104.18 419.252C1133.34 461.399 1167.43 502.521 1199.76 543.258C1228.74 579.742 1258.68 615.907 1289.62 651.161C1322.58 688.837 1353.85 728.05 1389.37 763.189C1394.19 767.929 1397.92 772.22 1401.21 776.576C1406.37 783.391 1411.91 790.283 1417.68 797.201C1423.47 804.093 1429.51 810.998 1435.66 817.903C1441.81 824.795 1448.08 831.674 1454.39 838.489C1460.66 845.317 1466.97 852.056 1473.22 858.653C1500.43 887.502 1525.33 916.134 1553.44 944.291C1579.68 970.617 1604.77 999.646 1633.35 1022.99C1634.92 1024.27 1638.42 1027.61 1638.69 1028.07C1644.75 1038.33 1660.72 1051 1670.77 1061.66C1678.84 1070.24 1687.28 1078.56 1695.89 1086.73C1704.51 1094.89 1713.31 1102.92 1722.23 1110.96C1731.07 1119.03 1740.1 1126.82 1748.83 1134.76C1757.56 1142.65 1766.13 1150.63 1774.37 1158.79C1792.25 1176.51 1812.94 1190.62 1830.66 1208.46C1845.23 1223.13 1861.04 1237.17 1877.4 1250.87C1906.47 1275.25 1934.54 1300.94 1963.39 1325.62C1969.05 1330.46 1974.8 1335.47 1980.54 1340.53C1986.25 1345.56 1992.02 1350.56 1997.67 1355.62C2008.98 1365.76 2020.42 1376.02 2031.84 1386.24C2047.38 1400.04 2063.86 1416.08 2077.4 1428.02C2090.56 1439.62 2097.05 1446.75 2106.02 1457.03C2110.73 1462.46 2118.12 1469.57 2124.23 1475.51L2128.74 1479.94L2134.74 1486C2135.26 1486.51 2135.78 1487.05 2136.31 1487.55L2138.02 1488.78L2141.43 1491.25C2142.8 1492.22 2143.09 1492.52 2143.76 1493.04L2145.58 1494.5C2150.3 1498.47 2154.21 1502.87 2157.44 1507.56C2163.91 1516.91 2167.39 1527.76 2168.89 1540.34C2168.93 1540.67 2168.98 1541.01 2169.03 1541.35L2186.3 1509.71C2184.02 1510.87 2181.87 1511.68 2179.91 1512.17C2177.94 1512.66 2176.14 1512.85 2174.39 1512.8C2172.63 1512.75 2170.86 1512.44 2168.92 1511.85C2166.98 1511.26 2164.86 1510.35 2162.58 1509.09L2159.5 1507.4L2154.49 1506.21C2143.62 1503.62 2132.89 1500.55 2122.45 1496.96C2111.77 1493.32 2101.21 1489.16 2090.84 1484.47C2085.65 1482.14 2080.51 1479.67 2075.43 1477.07C2072.88 1475.77 2070.34 1474.45 2067.83 1473.08L2065.93 1472.07L2063.81 1470.89L2059.44 1468.46L2041.97 1459.75C2036.48 1456.97 2030.99 1454.24 2025.54 1451.4C2014.6 1445.81 2003.73 1440.05 1992.9 1434.26C1953.24 1413 1915.74 1387.51 1875.77 1366.05C1870.6 1363.28 1863.03 1358.53 1861.8 1356.07C1860.77 1354.02 1854.7 1350.37 1851.55 1348.82C1840.79 1343.51 1830.68 1337.09 1820.75 1330.49C1815.81 1327.16 1810.89 1323.83 1806 1320.52C1801.1 1317.19 1796.25 1313.87 1791.34 1310.71C1779.79 1303.24 1768.24 1295.76 1756.83 1288.09C1745.43 1280.39 1734.03 1272.7 1722.62 1265C1699.91 1249.45 1677.13 1233.98 1654.09 1218.68C1636.12 1206.91 1618.67 1194.03 1600.98 1181.67C1592.15 1175.46 1583.32 1169.26 1574.36 1163.35C1565.4 1157.42 1556.32 1151.76 1547.13 1146.39C1544.64 1144.93 1539.32 1140.86 1537.17 1138.88C1527.26 1129.77 1513.56 1120.56 1500.85 1111.43C1452.54 1076.92 1404.23 1042.21 1356.85 1006.6C1346.55 998.877 1333.24 990.653 1325.17 983.889C1294.98 958.537 1262.21 935.67 1229.89 912.432C1219.95 905.258 1210.83 898.34 1203.64 891.973C1195.52 884.799 1187.35 878.432 1177.91 871.348C1117.61 826.268 1058.96 779.484 998.549 733.904C988.339 726.205 977.847 717.865 967.816 709.385C952.879 696.754 936.315 684.302 920.071 672.567C916.459 669.954 914.576 668.583 911.181 665.663C889.851 647.356 866.37 629.678 843.067 612.46C803.752 583.342 765.871 553.161 727.03 523.735C715.68 515.177 704.342 506.325 693.043 497.601C681.732 488.89 670.407 480.384 659.159 472.416C648.194 464.627 637.254 456.826 626.39 448.947C615.565 441.03 604.753 433.113 593.967 425.222C583.193 417.292 572.432 409.388 561.697 401.484C550.898 393.657 540.124 385.842 529.376 378.054C502.448 358.633 475.329 339.366 447.709 320.355C420.09 301.383 391.983 282.769 363.083 265.001C356.831 261.17 350.336 257.263 343.726 253.42C337.321 249.667 330.864 245.888 324.536 242.173C311.725 234.55 298.057 226.569 285.22 219.805C276.766 215.334 267.657 211.222 257.908 207.84C248.16 204.446 237.77 201.794 227.061 200.18L179.021 193.044L171.783 241.173C170.976 246.502 170.605 252.37 171.002 258.672C171.399 264.95 172.629 271.637 174.819 278.119C176.997 284.601 180.136 290.776 183.761 296.118C187.387 301.485 191.46 306.033 195.534 309.825L187.092 299.371C197.468 316.435 209.216 332.666 221.937 348.295C223.487 350.191 225.049 352.087 226.651 353.944L230.609 358.53C232.966 361.541 235.324 364.551 237.693 367.562C243.112 374.39 248.582 381.205 254.091 387.982C265.134 401.548 276.381 414.999 287.808 428.284C310.662 454.866 334.272 480.756 358.42 505.57C359.855 507.056 362.148 509.887 362.839 511.04C367.746 519.187 376.918 528.103 385.091 537.173C399.606 553.43 415.029 567.803 428.762 582.932C462.185 619.622 497.721 653.762 531.938 689.785C563.247 722.759 597.118 755.208 629.247 787.965C662.606 822.053 696.925 855.374 730.834 889.065C747.129 905.245 766.23 922.091 783.063 939.27C820.546 977.471 859.337 1013.76 898.293 1050.04C910.425 1061.34 925.26 1070.92 933.638 1084.05C933.766 1084.26 934.88 1085.25 935.534 1085.85C958.528 1107.11 980.665 1128.84 1004.08 1150.05C1026.48 1170.27 1049.52 1190.15 1071.48 1210.44C1103.15 1239.74 1135.89 1267.59 1167.74 1296.31C1177.77 1305.38 1187.15 1311.39 1197.46 1321.16C1212.87 1335.77 1228.11 1351.52 1246.05 1362.98C1247.94 1364.19 1252.36 1367.58 1253.35 1368.65C1267.24 1383.81 1286.9 1398.72 1303.37 1413.68C1329.2 1437.11 1357.52 1460.11 1383.75 1481.33C1400.7 1495.07 1420.58 1511.67 1432.57 1522.44C1452.9 1540.72 1472.99 1557.51 1493.28 1574.84C1503.83 1583.83 1515.13 1593.72 1524.86 1601.61C1556.29 1627.14 1583.85 1654.6 1615.76 1680.32C1633.69 1694.74 1653.63 1712.79 1671.02 1728.65C1708.94 1763.24 1745.95 1797.78 1782.73 1832.78C1792.19 1841.74 1801.72 1851.22 1810.52 1860.51C1814.32 1864.53 1818.14 1868.57 1821.96 1872.61L1828.07 1879.05C1829.09 1880.13 1830.09 1881.2 1831.16 1882.26L1834.37 1885.43L1835.96 1886.99L1837.3 1888.35L1837.97 1889.03C1838.15 1889.3 1838.41 1889.49 1838.62 1889.73L1839.97 1891.09C1841.74 1892.92 1843.53 1894.73 1845.27 1896.57C1848.8 1900.25 1852.25 1903.99 1855.67 1907.76C1862.52 1915.32 1869.11 1923.1 1875.51 1931.07L1880.23 1937.11L1882.56 1940.16L1883.72 1941.68L1884.52 1942.78C1885.65 1944.28 1886.87 1946.01 1887.97 1947.64C1888.51 1950.1 1889.05 1952.54 1889.57 1954.99C1890.51 1959.14 1891.45 1963.3 1892.4 1967.49L1911.81 1913.15C1911.64 1913.23 1911.5 1913.32 1911.36 1913.43C1911.25 1913.51 1911.18 1913.5 1911.12 1913.56C1911.08 1913.61 1911.08 1913.56 1911.08 1913.56C1911.08 1913.57 1911.07 1913.54 1911.09 1913.57L1911.35 1914.03L1911.85 1914.98C1912 1915.28 1912.18 1915.67 1912.31 1915.92L1912.71 1916.69C1912.96 1917.2 1913.22 1917.74 1913.45 1918.29C1915.26 1922.32 1915.63 1924.77 1915.65 1925.09C1915.69 1925.47 1915.45 1923.51 1916.22 1919.72C1916.31 1919.18 1916.42 1918.66 1916.55 1918.15L1916.76 1917.39L1916.86 1917.02L1916.97 1916.53C1917.13 1915.88 1917.31 1915.25 1917.51 1914.62L1917.82 1913.7L1917.98 1913.25L1918.06 1913.01V1913C1918.02 1912.96 1918 1912.98 1917.92 1912.97C1917.81 1912.89 1917.68 1912.86 1917.54 1912.83L1901.49 1908.17C1890.34 1906.86 1879.44 1904.34 1868.84 1900.49C1866.19 1899.52 1863.57 1898.48 1860.97 1897.36C1859.67 1896.78 1858.36 1896.22 1857.07 1895.6L1853.09 1893.73C1852.38 1893.4 1851.64 1893.15 1850.92 1892.87L1848.62 1892C1845.08 1890.63 1841.53 1889.26 1838 1887.89C1834.65 1886.61 1831.33 1885.2 1828.03 1883.81C1805.59 1874.41 1783.53 1867.1 1762.27 1856.73C1731.23 1841.59 1700.4 1825.5 1669.38 1808.6C1657.55 1802.16 1645.48 1797.63 1635.59 1790.96C1624.57 1783.5 1612.16 1776.46 1599.73 1769.38C1587.32 1762.32 1574.82 1755.21 1563.49 1747.64C1559.64 1745.06 1555.22 1742.51 1550.68 1740.11C1546.15 1737.67 1541.48 1735.39 1537.15 1733.37C1522.84 1726.68 1508.15 1719.75 1496.13 1708.58C1493.16 1705.8 1486.22 1701.38 1479.92 1697.51C1441.06 1673.52 1402.17 1649.13 1363.71 1624.16C1346.28 1612.85 1328.2 1602.32 1312 1591.48C1281.44 1571.05 1250.43 1551.55 1219.85 1531.33C1180 1504.88 1140.09 1478.4 1100.2 1451.92C1043.36 1414.33 986.519 1376.74 929.679 1339.15C898.831 1318.68 868.509 1297.55 838.097 1276.79C817.92 1262.99 796.155 1249.63 777.887 1235.91C758.3 1221.22 738.059 1209.7 718.357 1195.1C686.382 1171.38 651.358 1151.94 616.834 1126.61C594.108 1109.96 566.924 1091.42 540.982 1074.36C490.24 1040.99 440.958 1005.96 390.561 972.282C382.709 967.03 374.907 961.739 367.221 956.448C359.637 951.171 352.066 945.918 344.495 940.653C329.353 930.11 314.172 919.567 298.531 909.126C292.241 904.976 285.861 900.774 279.443 896.534L274.613 893.369L269.797 890.103L259.894 883.416C246.648 874.474 233.453 865.571 220.925 856.603C212.982 850.915 204.886 845.368 196.687 839.937C192.588 837.221 188.463 834.531 184.312 831.866L177.984 827.818C175.524 826.268 173.116 824.731 170.579 823.194L163.367 819.081L156.526 815.238C151.709 812.574 146.354 809.704 140.295 806.834C134.249 803.965 127.497 801.108 120.067 798.636C112.663 796.163 104.618 794.101 96.355 792.769L0.109619 777.281L29.087 870.9C33.7116 885.824 40.3987 899.544 47.6238 911.291C52.1844 918.721 57.0396 925.37 61.8819 931.506C63.0861 932.992 64.3287 934.581 65.5201 935.99L69.1327 940.269L72.6812 944.304C73.8854 945.662 74.9999 946.879 76.1785 948.16C80.7903 953.195 85.1971 957.806 89.2324 962.059L92.1404 965.121L93.7289 966.787L94.1516 967.222C94.2413 967.414 94.4206 967.53 94.5487 967.683L95.3814 968.567L102.081 975.613C120.029 994.265 138.412 1012.16 155.924 1029.69C168.171 1041.93 177.856 1047.02 187.617 1056.63C205.936 1074.68 225.472 1092.04 244.791 1108.92C264.173 1125.85 283.85 1142.73 303.168 1159.7C310.521 1166.16 317.759 1172.49 325.138 1177.49C338.628 1186.67 350.874 1196.67 360.354 1208.21C365.914 1214.99 375.599 1223.1 384.054 1229.75C390.382 1234.73 397.479 1240.2 401.963 1244.63C426.495 1268.83 456.074 1292.25 482.016 1315.82C499.233 1331.48 517.052 1344.33 533.616 1359.61C546.235 1371.27 558.917 1382.35 573.598 1393.38C588.266 1404.38 602.742 1416.26 616.155 1430.01C630.797 1445.05 650.064 1460.63 668.883 1474.42C673.828 1478.03 678.17 1480.92 681.347 1484.96C689.38 1495.19 702.254 1505.03 714.885 1513.53C720.983 1517.63 725.684 1521.01 729.464 1525.35C735.818 1532.63 746.604 1540.8 755.187 1548.51C764.231 1556.66 773.814 1564.1 783.434 1571.58C793.055 1579.07 802.74 1586.53 811.989 1594.5C859.952 1635.94 911.809 1675.96 960.578 1716.97C999.727 1749.89 1041.63 1782.75 1079.56 1815.94C1116.89 1848.59 1155.25 1879.09 1191.81 1912.23C1208.38 1927.46 1225.29 1942.72 1241.88 1958.32C1246.06 1962.2 1250.22 1966.08 1254.4 1969.97L1267.15 1981.92C1275.59 1989.86 1284.02 1997.82 1292.43 2005.73C1297.53 2010.6 1302.67 2015.51 1307.82 2020.41L1314.96 2027.27L1314.92 2027.38C1314.88 2027.51 1314.87 2027.5 1315.22 2027.5C1315.62 2027.48 1316.51 2027.61 1317.16 2027.91C1317.79 2028.18 1318.18 2028.61 1316.84 2028.33C1316.13 2028.18 1315.98 2028.14 1316.15 2028.24L1317.22 2028.86C1317.62 2029.12 1317.94 2029.42 1317.72 2029.39C1317.61 2029.38 1317.36 2029.28 1316.9 2029.03C1316.39 2028.78 1315.74 2028.39 1314.84 2027.79C1314.55 2027.59 1315.53 2028.28 1315.85 2028.54C1317.26 2029.7 1315.97 2028.86 1315.93 2028.83C1315.79 2028.79 1314.99 2028.09 1314.75 2027.79C1314.46 2027.48 1314.67 2027.59 1315.34 2028.83C1315.7 2029.52 1316.17 2030.6 1316.61 2032.07C1316.71 2032.42 1316.44 2032.3 1316.29 2031.97C1315.22 2029.74 1314.98 2029 1314.84 2028.74C1314.72 2028.48 1314.66 2028.7 1314.56 2028.64C1314.49 2028.59 1314.43 2028.56 1314.37 2028.54L1314.26 2028.51L1314.24 2028.5H1314.23H1314.21L1314.14 2028.46L1310.15 2026.45C1298.74 2020.71 1287.37 2014.84 1276.05 2008.91C1264.73 2002.97 1253.48 1996.89 1242.27 1990.73C1236.68 1987.62 1231.07 1984.54 1225.53 1981.35L1217.17 1976.63L1208.87 1971.82C1203.12 1968.47 1197.38 1965.1 1191.64 1961.74C1185.85 1958.31 1180.07 1954.86 1174.28 1951.43C1162.36 1944.4 1150.43 1937.35 1138.52 1930.32C1114.89 1916.37 1091.32 1902.29 1067.88 1887.79C1041.39 1871.39 1013.08 1855.23 988.006 1839.13C972.044 1828.88 956.018 1818.83 940.158 1809C924.363 1799.2 908.644 1789.44 892.964 1779.7C861.514 1760.14 830.193 1740.49 799.012 1719.81C789.161 1713.22 779.284 1706.61 769.279 1699.91C759.248 1693.21 748.987 1686.55 738.226 1680.02C726.453 1672.89 708.326 1658.82 692.057 1647.97C646.964 1617.89 601.781 1587.62 556.56 1557.07C545.005 1549.32 533.463 1541.57 521.933 1533.82L505.075 1522.61C502.282 1520.74 499.425 1518.89 496.671 1517L488.459 1511.27C464.478 1494.72 440.023 1478.9 415.119 1463.81C390.215 1448.72 364.863 1434.4 339.14 1420.77L335.335 1418.77C335.284 1418.77 335.194 1418.7 335.117 1418.68C335.079 1418.65 335.105 1418.69 335.015 1418.63L334.733 1418.43L334.169 1418.05L333.029 1417.29L330.147 1415.47C327.649 1413.94 325.241 1412.4 322.55 1410.95C312.135 1405.1 300.388 1399.95 287.59 1396.36C274.831 1392.75 261.073 1390.79 247.519 1390.81C233.953 1390.79 220.694 1392.74 208.626 1395.96C205.898 1396.73 203.169 1397.53 200.44 1398.36L171.719 1407.14L158.153 1434.5C152.99 1444.9 148.571 1457.08 146.214 1470.57C143.818 1484.01 143.69 1498.67 146.021 1512.4C148.327 1526.16 152.888 1538.7 158.294 1549.43L160.356 1553.43C161.061 1554.78 161.778 1555.94 162.496 1557.21L164.699 1560.91L165.122 1561.6L165.327 1561.91L165.737 1562.53L166.557 1563.76C166.749 1564.04 166.71 1564 166.736 1564.05L166.8 1564.17L168.337 1567.04C174.064 1577.75 179.918 1588.42 185.811 1599.08L190.243 1607.06L192.472 1611.05L193.587 1613.05L195.047 1615.45L200.953 1624.99L202.439 1627.35L203.861 1629.5L206.718 1633.8C221.962 1656.83 238.616 1677.77 255.231 1697.81C271.001 1716.68 287.27 1734.11 303.437 1750.8C311.508 1759.09 319.591 1767.3 327.546 1775.31C335.54 1783.37 343.547 1791.44 351.566 1799.52C375.394 1823.53 401.002 1846.64 426.392 1869.93C460.353 1900.99 495.057 1932.14 530.837 1960.78C540.304 1968.29 549.796 1976.2 559.66 1983.66C564.579 1987.4 569.499 1991.12 574.546 1994.61C579.593 1998.1 584.705 2001.44 589.867 2004.57C603.575 2012.83 621.791 2024.4 639.021 2035.22C646.644 2040.08 653.254 2043.55 659.749 2047.08C663.003 2048.85 666.244 2050.61 669.664 2052.45C673.085 2054.3 676.646 2056.27 680.489 2058.52C691.032 2064.69 697.642 2066.03 691.737 2059.49C687.753 2055.07 681.629 2049.49 674.507 2043.57C667.461 2037.57 659.416 2031.2 651.563 2025.29C624.405 2004.69 602.793 1984.98 589.496 1970.13C584.167 1964.07 578.85 1958.01 573.342 1951.75C567.833 1945.51 562.197 1939.05 556.009 1932.42C550.847 1926.9 546.734 1921.48 542.161 1916.08C539.881 1913.38 537.511 1910.67 534.885 1907.9C532.284 1905.11 529.44 1902.25 526.161 1899.3C502.051 1877.55 484.591 1856.89 457.522 1833.21C453.435 1829.69 447.991 1824.31 443.161 1819.08C438.332 1813.84 434.194 1808.68 432.875 1805.44C431.773 1802.79 426.38 1796.69 421.307 1793.47C415.862 1790.05 409.867 1784.43 404.179 1778.74C398.491 1773.05 393.252 1767.16 389.421 1763.08C382.709 1755.94 376.086 1748.8 369.578 1741.66C363.032 1734.5 356.524 1727.31 350.003 1720.06C336.975 1705.56 323.985 1690.81 310.957 1675.54C302.028 1665.02 292.958 1653.76 284.49 1642.48C276.023 1631.19 267.952 1620.1 260.791 1610.05C258.946 1607.59 257.319 1605.12 255.731 1602.75C254.155 1600.38 252.631 1598.11 251.209 1595.85C249.812 1593.54 248.467 1591.3 247.186 1589.11C245.931 1586.92 244.586 1584.75 243.599 1582.68C239.397 1574.33 235.772 1566.47 231.942 1558.04C230.238 1554.28 229.315 1551.75 226.676 1547.56C225.011 1544.9 223.384 1542.21 221.783 1539.48L219.451 1535.45L218.439 1533.66C218.132 1533.08 217.632 1532.43 217.235 1531.83L215.98 1529.98C215.557 1529.32 215.07 1528.45 214.622 1527.7L213.251 1525.34L212.008 1522.88C210.343 1519.61 208.985 1516.1 207.807 1512.51C205.513 1505.3 204.54 1497.45 204.937 1489.71C205.334 1481.95 207.281 1474.39 209.972 1467.38C210.689 1465.41 211.611 1463.58 212.444 1461.71L214.186 1457.76L218.811 1456.28C227.227 1453.56 236.156 1452.06 245.162 1452.05C254.168 1452 263.174 1453.65 271.68 1456.47C280.224 1459.27 288.167 1463.46 295.635 1468.31L297.045 1469.21L297.749 1469.68L298.338 1470.1L300.708 1471.79L301.9 1472.64C302.297 1472.88 302.707 1473.08 303.117 1473.31L305.576 1474.65C309.291 1476.62 313.045 1478.61 316.837 1480.63C327.06 1485.96 337.833 1490.85 349.478 1498.23C373.959 1513.71 398.376 1529.76 422.575 1546.3C428.609 1550.46 434.642 1554.62 440.689 1558.79C446.659 1562.99 452.641 1567.19 458.624 1571.4C470.678 1579.59 482.836 1587.55 495.044 1595.58C516.399 1609.57 536.358 1624.12 557.956 1638.22C596.465 1663.36 633.462 1691.93 673.61 1717C683.615 1723.23 696.758 1731.98 707.955 1740.03C750.319 1770.47 793.952 1799.2 838.366 1827.58C848.204 1833.76 858.504 1840.25 868.586 1846.6C878.693 1852.92 888.493 1859.23 897.294 1865.23C932.626 1889.23 969.507 1912.13 1005.45 1935.33C1034.74 1954.22 1065.82 1973.08 1095.68 1991.85C1108.44 1999.89 1121.36 2007.74 1134.24 2015.62C1147.07 2023.56 1159.96 2031.26 1172.85 2038.9C1195.89 2052.57 1219.48 2065.65 1243.13 2078.38C1254.96 2084.73 1266.81 2091 1278.64 2097.2C1290.09 2103.17 1301.48 2109.1 1312.79 2115.01C1318.81 2118.17 1324.96 2121.22 1331.08 2124.36C1337.19 2127.52 1343.38 2130.63 1349.66 2133.56C1362.21 2139.44 1375.06 2144.85 1388.15 2149.71C1410.74 2158.09 1433.95 2164.85 1457.61 2170.08L1462.06 2171.04C1463.53 2171.4 1465.06 2171.56 1466.45 2172.18C1469.28 2173.28 1472.19 2174.2 1475.15 2174.95C1481.06 2176.39 1487.26 2176.93 1493.28 2175.95C1499.34 2175.05 1504.96 2172.23 1509.66 2168.44C1514.38 2164.62 1518.17 2159.82 1521.28 2154.68C1521.32 2154.59 1521.46 2154.5 1521.4 2154.41L1521.29 2154.12L1521.09 2153.53L1520.69 2152.35L1519.9 2149.99L1518.28 2145.25L1515.02 2135.72C1513.9 2132.53 1512.84 2129.35 1511.66 2126.11L1509.93 2121.27L1509.5 2120.07L1509.28 2119.46C1509.21 2119.26 1509.03 2119.12 1508.91 2118.94L1507.31 2116.93C1498.76 2106.19 1490.22 2095.46 1481.67 2084.71C1477.41 2079.33 1473.15 2073.96 1468.9 2068.58L1467.31 2066.57L1465.63 2064.62L1462.26 2060.74C1460.03 2058.15 1457.79 2055.57 1455.49 2053.02C1446.4 2042.74 1437.08 2032.7 1427.73 2022.73C1418.31 2012.69 1408.33 2001.99 1398.19 1991.64C1393.14 1986.47 1388.01 1981.43 1383.04 1976.68C1380.55 1974.32 1378.07 1972.03 1375.65 1969.84C1374.43 1968.76 1373.24 1967.69 1372.06 1966.65C1370.9 1965.65 1369.76 1964.67 1368.64 1963.73C1355.24 1952.48 1343.87 1941.49 1332.67 1930.52C1327.07 1925.04 1321.51 1919.56 1315.76 1914.06C1310.01 1908.56 1304.02 1903.09 1297.61 1897.57C1292.22 1892.94 1286.79 1887.98 1281.3 1882.8C1275.82 1877.63 1270.17 1872.36 1264.51 1866.93C1258.83 1861.51 1253.08 1856.03 1247.29 1850.49C1241.47 1845 1235.49 1839.62 1229.48 1834.31C1218.83 1824.94 1207.67 1816.21 1197.47 1806.75C1190.67 1800.39 1183.66 1794.09 1176.51 1787.81C1169.34 1781.57 1162.01 1775.41 1154.68 1769.22C1140.05 1756.81 1125.15 1744.6 1110.99 1732.09C1079.09 1704.08 1044.06 1676.75 1011.53 1649.33C995.577 1635.84 980.281 1623.2 963.678 1610.17C939.249 1591.04 914.806 1571.55 893.976 1551.97C887.379 1545.78 880.038 1539.38 872.301 1533.59C843.516 1512.03 817.51 1489.7 792.658 1467.24C779.771 1455.67 765.999 1444.27 752.164 1432.97C738.367 1421.62 724.608 1410.22 712.003 1398.53C699.73 1387.13 684.716 1376.72 673.443 1366.14C651.076 1345.2 629.964 1324.79 603.203 1305.74C601.768 1304.72 599.347 1302.41 597.695 1300.82C582.425 1286.14 567.859 1271.42 548.336 1258.19C543.186 1254.69 539.112 1250.39 536.319 1247.04C530.17 1239.66 520.87 1231.58 510.737 1222.51C490.586 1204.47 469.564 1187.27 449.221 1168.78C416.669 1139.19 381.901 1109.23 347.787 1079.52C320.923 1056.18 294.021 1032.8 267.132 1009.43C240.525 986.066 214.532 962.431 189.949 937.822C181.02 928.855 172.232 919.734 163.687 910.51C159.319 905.757 154.95 901.005 150.608 896.29C146.278 891.589 142.178 887.08 138.399 882.66C132.75 876.114 127.741 869.67 123.718 863.252C119.645 856.834 116.813 850.467 114.943 844.075L82.4941 881.776C86.2732 882.532 90.0523 883.71 94.0107 885.376C99.8779 887.874 106.386 891.486 113.777 895.855C117.364 897.994 121.72 900.543 124.807 902.427C128.433 904.784 132.058 907.141 135.696 909.511C150.928 919.465 166.249 929.482 181.302 939.308C195.726 948.801 204.335 957.46 217.145 965.339C220.515 967.453 223.909 969.592 227.317 971.744C230.725 973.922 234.132 976.138 237.527 978.393C244.316 982.902 251.093 987.552 257.87 992.19C271.411 1001.46 284.913 1010.73 298.441 1018.82C307.882 1024.47 315.428 1030.19 322.512 1035.72C329.609 1041.27 336.334 1046.75 344.264 1052.09C374.792 1072.7 404.512 1094.23 436.333 1114.09C451.386 1123.51 469.743 1136.31 483.041 1146.63C514.26 1170.87 548.618 1189 579.286 1212.18C579.773 1212.54 580.798 1212.99 581.336 1213.39C597.528 1225.24 612.35 1232.39 630.848 1245.48C643.774 1254.61 655.816 1263.94 668.793 1272.92C704.483 1297.61 740.378 1322.15 776.248 1346.7C782.192 1350.77 788.674 1355.07 793.478 1357.33C806.083 1363.22 824.518 1375.66 836.636 1380.76C843.4 1383.62 852.38 1390.58 853.367 1393.04C855.66 1398.73 870.93 1407.98 882.946 1416.47C889.224 1420.91 895.168 1424.08 902.226 1429.4C930.845 1450.92 961.718 1472.15 993.386 1493.39C1004.34 1500.74 1011.85 1505.44 1019.31 1508.58C1026.51 1511.59 1034.05 1515.51 1039.2 1521.82C1040.7 1523.65 1044.44 1526.64 1047.86 1528.55C1068.49 1540.07 1085.75 1554.12 1104.91 1566.78C1150.56 1596.88 1196.37 1624.65 1243.01 1655.81C1262.3 1668.7 1281.99 1681.65 1301.88 1694.58C1321.76 1707.5 1341.84 1720.38 1361.88 1732.95C1414.07 1765.7 1467.17 1798.73 1521.03 1827.22C1526.92 1830.34 1534.8 1834.96 1536.51 1837.4C1539.68 1841.94 1550.5 1847.5 1560.23 1853.3C1583.59 1867.15 1608.24 1880.36 1631.77 1892.56C1653.22 1903.68 1668.35 1914.93 1689 1923.54C1695.04 1926.01 1701.28 1928.97 1707.7 1931.96C1710.89 1933.48 1714.12 1935.02 1717.36 1936.56C1720.61 1938.07 1723.87 1939.58 1727.1 1941.09C1740.01 1947.07 1752.79 1952.33 1763.86 1954.84C1764.89 1955.07 1769.4 1957.05 1771.04 1957.91C1776.24 1960.69 1781.58 1963.41 1787.14 1965.96C1792.72 1968.45 1798.44 1970.95 1804.37 1973.28C1807.34 1974.42 1810.35 1975.58 1813.39 1976.73C1814.5 1977.14 1815.62 1977.56 1816.74 1977.98C1817.14 1978.11 1817.52 1978.29 1817.9 1978.47L1819.59 1979.24C1826.48 1982.35 1833.72 1985.17 1841.22 1987.71C1857.11 1993.09 1873.58 1996.88 1890.11 1999.03L1878.4 1995.62C1884.73 1998.62 1891.84 2001.22 1899.7 2002.82C1907.53 2004.43 1916.14 2004.99 1924.61 2004.03C1933.08 2003.11 1941.27 2000.79 1948.49 1997.62C1955.74 1994.46 1962.05 1990.55 1967.57 1986.43L1987.57 1971.49L1981.91 1946.28L1978.44 1930.83L1973.33 1908.54L1963.53 1894.73C1961.89 1892.41 1960.25 1890.17 1958.5 1887.82L1956.48 1885.1L1954.64 1882.65C1949.72 1876.13 1944.67 1869.7 1939.44 1863.39C1929 1850.79 1918 1838.59 1906.34 1826.97C1902.68 1823.36 1898.99 1819.74 1895.3 1816.09C1891.92 1812.5 1888.52 1808.9 1885.11 1805.31C1877.91 1797.74 1870.66 1790.2 1863.36 1782.91C1848.74 1768.34 1833.88 1754.81 1818.79 1744.03C1817.52 1743.12 1813.54 1739.04 1811.63 1736.88C1793.74 1716.79 1771.84 1696.04 1750.14 1676.82C1729.08 1658.23 1707.98 1639.63 1686.92 1621.06C1665.81 1602.6 1644.74 1584.18 1623.77 1565.84C1584.94 1532.06 1547.34 1497.71 1506.75 1467.31C1505.64 1466.47 1503.95 1464.94 1503.03 1463.99C1478.12 1438.35 1446.34 1414.89 1418.85 1392.25C1399.59 1376.4 1377.33 1358.28 1360.5 1343.49C1329.65 1316.41 1298.21 1289.77 1267.77 1262.43C1238.96 1236.55 1208.87 1209.57 1182.14 1192.48C1177.54 1189.54 1172.16 1184.57 1171.02 1182.08C1167.37 1174.21 1151.79 1161.02 1141.16 1152.21C1111.59 1127.65 1085.97 1100.04 1055.9 1074.84C1046.37 1066.86 1032.36 1056.05 1020.99 1043.5C1007.61 1028.76 989.338 1014.1 975.387 998.813C970.045 992.984 964.293 988.539 959.758 985.836C957.273 984.35 952.085 980.84 950.714 979.366C932.075 959.254 910.194 940.986 891.055 921.309C863.654 893.1 857.389 887.349 830.82 865.648C828.899 864.072 824.902 860.203 823.941 858.884C818.471 851.505 815.204 848.238 808.517 844.459C802.163 840.846 793.375 831.328 786.573 823.168C783.819 819.85 783.729 817.839 779.54 814.149C758.403 795.536 737.637 770.747 716.64 754.311C713.848 752.121 710.952 749.315 708.032 745.741C686.215 719.018 656.597 690.195 631.258 665.483C589.701 624.925 551.052 583.24 508.982 541.849C456.984 490.709 405.793 433.843 356.216 378.066C345.199 365.666 335.041 355.469 324.216 343.03C317.746 335.574 313.301 329.425 309.048 323.442C306.934 320.445 304.859 317.486 302.604 314.424C300.158 311.093 297.531 307.634 294.431 303.894L291.293 300.422L288.859 297.706C287.257 295.874 285.669 294.042 284.093 292.185C280.942 288.483 277.919 284.665 274.959 280.796C269.054 273.059 263.519 265.001 258.408 256.623L252.387 249.167V249.154L251.695 249.808C251.17 250.333 250.683 250.794 250.12 251.255C249.633 251.678 249.223 252.024 248.723 252.395C248.288 252.728 247.968 252.972 247.545 253.241C246.136 254.189 245.38 254.419 245.636 254.33C245.879 254.24 247.084 253.894 249.261 253.753C249.889 253.702 250.363 253.715 251.068 253.702C251.811 253.676 252.426 253.728 253.22 253.753C253.566 253.766 254.257 253.804 254.078 253.792C254.078 253.792 254.065 253.804 254.078 253.779C254.104 253.74 254.104 253.689 254.104 253.638L214.891 282.667C220.976 283.602 227.112 285.254 233.389 287.624C243.65 291.57 254.552 296.861 266.12 303.42C271.898 306.673 277.816 310.119 283.888 313.77C286.976 315.628 290.063 317.473 293.137 319.317C296.148 321.149 299.146 322.968 302.143 324.788C333.913 344.298 365.158 363.565 396.057 384.421C432.337 408.889 468.501 434.881 504.229 459.682C515.425 467.369 526.699 476.72 538.062 485.291C543.737 489.595 549.425 493.733 555.1 497.435C560.749 501.176 566.399 504.493 572.01 507.12C576.006 508.99 579.376 512.59 580.964 514.703C582.079 516.177 580.477 516.42 585.435 519.738C598.784 528.628 612.555 539.505 626.172 549.625C639.79 559.732 653.126 569.302 665.565 575.63C669.344 577.552 672.803 580.383 677.248 583.816C691.647 594.91 706.174 606.094 720.765 617.085C746.809 636.813 770.585 656.849 795.668 676.808C802.906 682.56 809.171 688.132 817.587 694.32C835.612 707.527 854.968 721.914 871.468 734.711C912.987 766.891 956.082 796.906 996.448 830.342C1001.71 834.697 1006.71 838.182 1012.58 841.846C1034.62 855.566 1059.12 873.449 1080.97 891.205C1116.23 919.99 1152.74 949.351 1189.4 974.729C1220.47 996.161 1249.34 1020.03 1280.47 1040.14C1290.96 1046.9 1300.66 1055.14 1310.8 1063.43C1320.96 1071.69 1331.56 1080.03 1343.77 1087.06C1344.88 1087.71 1347.76 1090.19 1349.52 1091.7C1365.39 1105.2 1387.5 1117.14 1402.2 1130.98C1402.49 1131.25 1404.69 1132.43 1406.09 1133.3C1415.4 1139.1 1424.37 1145.16 1433.09 1151.48C1441.84 1157.74 1450.36 1164.26 1458.75 1170.99C1466.97 1177.6 1475.92 1185.12 1484.57 1190.91C1500.78 1201.82 1516.43 1213 1532.04 1224.11C1539.83 1229.68 1547.62 1235.26 1555.41 1240.83C1563.24 1246.35 1571.09 1251.86 1579.03 1257.32C1585.48 1261.76 1592.01 1266.27 1598.55 1270.79C1605.14 1275.25 1611.74 1279.72 1618.26 1284.14C1624.8 1288.52 1631.3 1292.81 1637.68 1296.91C1644.08 1300.99 1650.4 1304.86 1656.52 1308.46C1665.16 1313.52 1673.88 1319.86 1682.3 1325.61C1690.75 1331.32 1698.9 1336.47 1706.28 1339.24C1706.29 1339.25 1706.82 1339.68 1707.5 1340.24C1708.17 1340.79 1709.03 1341.47 1709.7 1341.96C1723.42 1351.92 1737.48 1361.59 1751.87 1371.21C1766.23 1380.87 1781.1 1390.17 1796.43 1399.41C1811.47 1408.51 1826.97 1418.05 1841.79 1426.76C1856.32 1435.27 1853.79 1437.29 1867.05 1444.82C1896.99 1461.79 1925.98 1480.92 1956.56 1497.15C1979.91 1509.49 1997.28 1519.32 2005.58 1527.61C2008.11 1528.85 2009.67 1529.45 2010.62 1529.66C2011.57 1529.86 2012.09 1529.78 2012.72 1529.76C2013.97 1529.71 2015.65 1529.9 2022.03 1533.06C2024.11 1534.04 2026 1535.18 2027.96 1536.27C2029.72 1537.28 2032.34 1538.66 2034.65 1539.9C2039.38 1542.43 2044.17 1544.85 2049.01 1547.18C2058.7 1551.83 2068.6 1556.08 2078.6 1559.81C2098.61 1567.29 2119.08 1572.65 2138.93 1575.47C2139.11 1575.49 2139.3 1575.53 2139.62 1575.58L2130.15 1572.2C2132.5 1573.22 2135.67 1574.74 2138.98 1576.07C2140.58 1576.76 2142.27 1577.36 2143.76 1577.94C2144.5 1578.22 2145.21 1578.49 2145.86 1578.74C2146.52 1578.99 2147.13 1579.19 2147.66 1579.39C2152.57 1581.28 2158.3 1582.73 2164.4 1583.6C2170.51 1584.48 2177.08 1584.64 2183.59 1584.05C2190.08 1583.47 2196.52 1582.18 2202.49 1580.38C2208.45 1578.57 2213.97 1576.31 2219.02 1573.94L2242.91 1562.71L2240.63 1534.36C2240.09 1527.75 2239.46 1521.38 2238.62 1515.47C2238.12 1511.34 2236.92 1506.95 2235.58 1502.97C2234.85 1500.97 2234.08 1499.08 2233.34 1497.35C2232.62 1495.6 2231.75 1494.07 2231.05 1492.72C2229.33 1489.4 2227.45 1486.23 2225.72 1483C2224.8 1481.41 2223.87 1479.83 2222.94 1478.25L2221.56 1475.86L2220.08 1473.52C2216.25 1467.19 2211.92 1460.98 2206.86 1454.71C2202.17 1448.85 2196.95 1443.53 2191.49 1438.5C2189.41 1436.66 2187.34 1434.83 2185.24 1432.99L2184.35 1432.21C2184.07 1431.95 2183.92 1431.68 2183.69 1431.41L2182.45 1429.81L2182.12 1429.41L2181.84 1429.09C2181.72 1428.96 2181.63 1428.81 2181.48 1428.71L2180.08 1427.13L2177.24 1423.98C2175.32 1421.91 2173.39 1419.83 2171.45 1417.76C2167.57 1413.6 2163.52 1409.57 2159.41 1405.6C2139.62 1386.65 2119.99 1369.36 2101.91 1349.8C2100.14 1347.87 2096.01 1344.29 2094.03 1342.87C2076.95 1330.66 2062.77 1315.83 2048.34 1301.95C2045.37 1299.09 2042.57 1296.68 2039.88 1294.45C2037.2 1292.26 2034.62 1290.23 2032.08 1288.07C2013.26 1272 1993.89 1256.73 1975.65 1240.48C1953.06 1220.38 1931.76 1199.43 1909.25 1179.57C1882.51 1156.01 1856.01 1130.03 1828.2 1109.1C1817.58 1101.09 1810.3 1090.81 1800.41 1083.16C1794.12 1078.29 1788.25 1073.32 1782.5 1068.19C1776.74 1063.1 1771.34 1057.75 1765.9 1052.45C1760.47 1047.06 1755.05 1041.68 1749.6 1036.28C1744.12 1030.89 1738.61 1025.5 1732.91 1020.21C1727.67 1015.45 1722.27 1010.55 1716.83 1005.6C1711.43 1000.64 1706.07 995.559 1701.18 990.23C1680.04 967.325 1657.18 944.15 1634.14 921.578C1622.24 909.921 1611.06 897.661 1600.46 887.233C1580.24 867.313 1560.74 842.563 1540.25 826.486C1537.26 824.141 1532.58 819.004 1530.33 815.635C1520.31 800.826 1506.22 785.492 1491.57 770.068C1484.26 762.369 1476.83 754.657 1469.8 746.984C1462.8 739.297 1456.17 731.662 1450.38 724.104C1442.29 720.338 1433.9 707.719 1428.3 700.571C1423.24 694.14 1417.96 688.734 1412.75 683.418C1407.54 678.089 1402.44 672.824 1397.66 666.726C1391.25 658.501 1384.79 650.764 1378.56 643.513C1372.33 636.262 1366.24 629.601 1360.41 623.618C1348.72 611.705 1338.33 602.455 1329.98 597.203C1318 580.447 1317.04 569.609 1289.64 543.886C1286.96 541.337 1283.22 535.277 1280.71 531.255C1272.58 518.431 1239.28 477.015 1228.23 466.177C1218.88 457.107 1213.16 449.729 1209.52 442.068C1207.4 437.584 1204.22 432.883 1199.42 428.501C1188.76 418.74 1179.37 405.455 1170.03 392.478C1163.06 382.845 1156.68 373.532 1150.23 363.975C1143.77 354.431 1137.03 344.798 1129.04 334.716C1123.26 327.35 1115.01 317.588 1112.25 312.835C1102.95 296.861 1092.12 282.269 1080.89 267.755C1075.26 260.556 1069.63 253.151 1064.11 245.631C1058.58 238.099 1053.17 230.412 1048.06 222.38C1046.19 219.459 1044.26 216.5 1042.26 213.515C1040.32 210.62 1038.36 207.687 1036.38 204.715C1032.38 198.809 1028.29 192.788 1024.18 186.703C1015.93 174.546 1007.55 162.12 999.766 149.873C990.363 135.102 981.523 120.063 973.107 104.959C968.892 97.4008 964.793 89.817 960.758 82.246C958.759 78.4541 956.761 74.6622 954.775 70.8831C953.725 68.859 952.674 66.8478 951.636 64.8237L949.087 60.0069L947.806 57.6114C947.358 56.8299 946.756 56.1382 946.243 55.3951C945.231 54.0116 944.194 52.6153 943.156 51.2061C942.874 50.7577 942.579 50.3094 942.259 49.861C941.926 49.4126 941.696 48.9643 941.401 48.5159C941.119 48.0675 940.812 47.632 940.581 47.1708C939.505 45.3773 938.647 43.5839 938.006 41.7648C937.366 39.9457 936.93 38.0881 936.789 36.1922C936.674 34.2834 936.815 32.3106 937.34 30.3378C937.442 29.9791 937.519 29.6204 937.583 29.2361C937.686 28.8389 937.788 28.429 937.852 27.9935C937.968 27.1608 938.224 26.1744 938.326 25.1751L901.253 72.5228C907.44 70.7037 914.358 68.3594 921.237 65.7973L889.249 66.8093C896.218 68.4747 903.277 69.9351 909.644 71.0624C912.833 71.6261 915.844 72.1001 918.598 72.4716C919.969 72.6509 921.276 72.8175 922.505 72.9456C922.902 72.9968 922.902 72.9584 923.03 72.9456C923.146 72.9199 923.261 72.9071 923.364 72.8815C923.581 72.8431 923.799 72.7918 924.017 72.7278C922.403 74.4316 922.864 75.3796 924.132 75.9817C924.786 76.2507 925.567 76.7631 926.528 77.0962L926.707 77.1602L926.81 77.1987L927.091 77.3268C927.463 77.4933 927.834 77.6598 928.219 77.8392C928.975 78.1851 929.743 78.5309 930.525 78.8768C932.088 79.5814 933.702 80.286 935.316 81.0162C942.003 84.0138 945.039 84.7953 948.165 85.3974C957.824 87.2805 967.24 92.93 976.707 98.7203L978.487 99.8092L978.936 100.078C979.051 100.155 979.051 100.168 979.115 100.219L979.397 100.463C979.781 100.783 980.14 101.129 980.486 101.475L980.614 101.603C980.639 101.628 980.87 101.782 980.985 101.859L981.831 102.448L983.522 103.601C984.649 104.357 985.789 105.1 986.929 105.817C991.49 108.674 996.14 111.134 1000.94 112.722C1002.35 113.183 1009.95 117.962 1009.28 118.5C1006.3 120.908 1022.61 128.966 1031.84 134.769C1038.02 138.651 1044.92 142.494 1051.51 146.311C1053.15 147.272 1054.77 148.233 1056.38 149.181L1057.55 149.898L1058.62 150.603C1059.32 151.077 1060.01 151.538 1060.71 151.999C1063.45 153.857 1065.98 155.714 1068.21 157.572C1078.32 166.04 1089.96 173.418 1102.28 181.399C1110.17 186.485 1118.53 192.545 1125.31 196.964C1146.7 210.889 1164.57 226.595 1185.76 240.341C1200.46 249.859 1214.98 261.004 1229.65 271.893C1244.29 282.769 1259.18 293.44 1274.17 301.844C1275.45 302.561 1279.01 305.29 1280.11 306.366C1290.69 316.678 1306.15 327.055 1321.17 337.867C1368.22 371.764 1415.17 405.622 1462.64 439.057C1473.32 446.577 1486.51 457.735 1493.94 458.427C1495.35 458.555 1500.63 462.244 1503.28 464.755C1516.35 477.053 1534.77 489.608 1554.67 502.7C1563.18 508.324 1571.1 512.846 1580.68 519.623C1610.25 540.453 1641.62 560.283 1672.2 581.113C1680.88 586.993 1689.8 593.027 1698.86 599.176C1707.96 605.274 1717.26 611.346 1726.67 617.316C1742.56 627.321 1762.98 637.992 1772.82 648.586C1773.2 648.996 1776.13 650.943 1777.03 651.379C1786.22 655.811 1794.91 661.102 1803.55 666.649C1812.17 672.209 1820.66 678.114 1829.49 683.661C1894.9 725.078 1962.3 764.457 2028.92 803.914C2052.65 817.877 2076.14 831.738 2100.98 845.407C2125.76 859.037 2151.58 872.309 2178.76 884.056C2190.63 889.206 2204.89 895.842 2219.19 901.056C2220.98 901.684 2222.77 902.311 2224.54 902.926L2225.21 903.157L2225.51 903.259H2225.53C2225.54 903.259 2225.57 903.246 2225.59 903.234C2225.71 903.259 2225.83 903.272 2225.98 903.272C2226.18 903.336 2226.39 903.4 2226.59 903.439L2226.74 903.477L2226.82 903.49L2227.21 903.644C2227.77 903.874 2228.32 904.092 2228.88 904.31C2231.1 905.206 2233.33 906.001 2235.52 906.744C2244.29 909.69 2252.76 911.368 2259.97 911.714C2255.66 912.726 2260.19 915.48 2268.85 918.094C2273.17 919.375 2278.5 920.592 2284.14 921.437C2289.76 922.308 2295.68 922.872 2301.15 923.128L2281.65 919.477C2283.46 920.067 2285.13 920.592 2286.76 921.079C2294.74 923.41 2303.45 925.114 2312.59 925.793C2321.71 926.485 2331.21 926.113 2340.41 924.627C2349.61 923.167 2358.45 920.617 2366.48 917.389C2374.53 914.174 2381.78 910.305 2388.27 906.206L2407.69 893.92L2416.08 872.335C2418.99 864.866 2421.58 856.245 2422.99 846.214C2424.4 836.247 2424.47 824.769 2422.32 813.214C2421.8 810.345 2421.09 807.462 2420.35 804.631C2419.54 801.813 2418.63 799.033 2417.65 796.279C2416.61 793.614 2415.51 790.937 2414.3 788.362C2413.09 785.876 2411.8 783.353 2410.46 781.008C2405.05 771.58 2398.76 763.996 2392.64 757.847L2405.43 775.026L2402.82 770.094C2391.15 748.265 2375.54 728.511 2358.86 709.001C2355.48 705.016 2352.21 701.276 2348.96 697.599C2348.15 696.677 2347.32 695.78 2346.5 694.871C2346.36 694.653 2346.38 694.537 2346.34 694.409L2346.32 694.204L2346.45 694.268L2346.47 694.281C2346.48 694.294 2346.41 694.204 2346.38 694.166L2346.15 693.871C2345.54 693.09 2344.92 692.296 2344.29 691.501C2339.32 685.135 2333.96 678.755 2327.08 671.799C2303.12 647.83 2282.48 624.49 2260.23 601.815C2252.06 593.501 2243.09 584.38 2234.99 577.283C2223.08 566.804 2209.19 557.977 2205.73 548.049C2205.61 547.691 2202.28 544.488 2200.37 542.656L2176.9 520.033L2153.12 497.256C2149.92 494.207 2145.6 489.902 2143.98 489.39C2136.2 486.956 2130.41 479.987 2124.98 471.98C2122.29 468.009 2117.14 463.295 2112.12 458.299C2079.9 426.26 2044.85 394.912 2015.28 362.604C2009.39 356.16 2001.96 349.063 1995.22 342.3C1990.77 337.841 1986.3 334.908 1990.04 339.135C2002.36 353.047 1991.9 343.657 1987.71 340.275C1980.33 334.357 1975.63 329.028 1975.57 326.235C1975.54 324.941 1976.86 324.147 1969.91 318.254C1961.44 310.978 1958.99 307.34 1956.67 302.984C1955.05 299.884 1950.1 295.208 1946.45 291.07C1932.49 275.16 1920.56 266.948 1907.51 252.972C1897.18 241.942 1885.42 225.878 1878.29 224.494C1878 224.443 1874.8 221.24 1873.37 219.536C1850.52 192.801 1827.21 168.768 1804.04 144.479C1796.08 136.153 1789.82 129.645 1788.52 132.066C1786.65 135.602 1779.89 129.171 1767.46 112.197C1757.61 98.7203 1743.74 84.2572 1739.56 81.3364C1725.84 71.7926 1723.82 77.1474 1719.93 80.0298C1719.5 80.3628 1723.51 85.9995 1725.65 89.3302C1730.66 97.0421 1731.86 100.001 1729.64 98.6563C1728.53 97.9901 1726.58 96.2223 1723.76 93.468C1720.98 90.6881 1717.4 86.8834 1713.04 82.1179C1719.91 91.3671 1722.69 95.9404 1723.06 97.9261C1723.43 99.9117 1721.42 99.284 1718.79 98.0798C1712.76 95.3255 1712.66 98.605 1728.75 117.065C1735.1 124.316 1741.01 132.207 1743.12 136.101C1749.58 147.977 1762.03 162.696 1774.48 177.351C1787.01 192.109 1799.82 206.777 1812.68 221.355C1825.07 235.344 1839.17 250.832 1847.51 262.413C1869.59 293.197 1900.67 326.594 1929.42 357.967C1935.7 364.769 1947.06 375.056 1952.64 377.977C1955.05 379.258 1955.6 378.605 1960.44 383.934C1963.73 387.521 1963.55 388.366 1962.67 388.533C1959.71 389.084 1966.59 396.642 1975.3 406.186C1988.06 420.187 2002.7 432.409 2015.96 446.423C2036.64 468.201 2059.44 492.311 2080.41 503.917C2082.04 504.814 2085.52 508.068 2087.4 510.45C2089.38 512.961 2088.01 512.41 2085.93 511.04C2073.31 502.713 2081.1 511.398 2090.88 521.57C2096.65 527.591 2102.82 533.983 2109.12 539.902C2117.09 547.357 2125.78 556.299 2133.59 563.345C2141.36 570.365 2148.23 575.541 2152.56 575.515C2153.88 575.502 2161.32 581.036 2163.37 580.857C2164.47 580.754 2170.43 583.778 2176 591.656C2180.43 597.921 2183.7 603.198 2193.19 613.011C2197.14 617.111 2196.9 617.892 2191.53 614.305C2186.69 611.064 2177.37 604.697 2180.88 610.091C2184.11 615.061 2193.13 623.503 2201.28 630.024C2202.3 630.844 2204.34 633.239 2205.81 634.866C2232.14 663.908 2263.29 693.846 2290.22 724.847C2293.03 728.05 2296.07 731.56 2299.16 734.916C2299.88 735.685 2300.58 736.454 2301.29 737.209C2301.97 737.927 2302.68 738.542 2303.4 739.208C2305.07 740.745 2306.67 742.218 2308.18 743.615C2314.47 749.367 2319.7 755.259 2324.48 761.37C2329.24 767.493 2333.56 773.886 2337.89 780.855C2342.46 788.246 2346.7 796.048 2350.7 804.067L2349.07 801.877C2351.89 804.823 2354.53 808.154 2356.68 811.959C2358.83 815.751 2360.49 820.004 2361.32 824.436C2362.16 828.869 2362.24 833.391 2361.74 837.695C2361.24 842.012 2360.2 846.124 2358.88 850.031L2358.05 852.504L2355.25 854.464C2350.43 857.833 2345.14 860.856 2339.36 863.252C2333.56 865.571 2327.28 867.326 2320.77 868.03C2322.8 867.172 2323.43 866.288 2323.07 865.686C2322.71 865.084 2321.36 864.571 2319.35 864.11C2317.39 863.688 2314.74 863.098 2311.65 862.432C2308.63 861.702 2305.27 860.78 2301.84 859.627L2303.89 860.011C2301.33 859.883 2298.66 859.742 2296.01 859.537ZM2210.59 571.608C2206.96 568.52 2202.49 564.933 2201.7 562.499C2200.87 559.989 2204.88 563.243 2210.01 567.765C2218.01 574.823 2225.39 582.125 2237.89 594.769C2225.49 584.265 2218.1 577.975 2210.59 571.608Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_3661_36980)">
    <path d="M693.159 2067.26L206.359 1584.95L171.771 1487.59L192.267 1429.3H290.268L1427.2 2128.11L1489.97 2149.25H1515.59L57.1164 886.132L3.95276 779.164L1886.46 1978.87H1956.28L1972.29 1923.14L351.118 497.332L159.601 215.501L171.771 171.305L2056.2 1533.7L2188.79 1557.4H2235.54L1254.9 578.679L877.63 17.5785C877.63 17.5785 1727.89 561.385 2272.7 909.831L2382.23 886.132L2412.97 811.831L1720.56 77.7879" stroke="#28282D" stroke-width="107"/>
    </g>
    </svg>    
    `;

    const transitionElement = `<svg width="1696" height="1696" id="transitionElement" viewBox="0 0 1696 1696" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_3596_37645" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="243" y="242" width="1210" height="1212">
    <path d="M1041.16 288.981C1044.04 289.846 1046.92 290.711 1049.87 291.593C1037.32 307.841 1065.95 299.429 1061.54 313.014C1064.58 309.944 1065.7 308.825 1066.8 307.688C1071.36 312.234 1077.66 310.114 1082.44 311.674C1092.44 314.913 1100.99 322.376 1110.78 326.7C1115.68 328.871 1121.95 327.939 1130.32 328.634C1127.25 324.411 1125.43 319.323 1121.95 317.644C1109.01 311.386 1095.46 306.382 1082.27 300.599C1078.05 298.75 1074.23 295.986 1070.24 293.628C1071.74 292.56 1073.23 291.508 1074.74 290.44C1072.82 291.22 1070.89 292.017 1067.24 293.51C1068.94 287.998 1070.09 284.25 1071.65 279.179C1121.23 300.124 1170.46 321.087 1210.2 359.145C1213.56 361.774 1218.08 363.741 1219.98 367.184C1222.41 371.594 1221.46 371.831 1226.82 371.051C1228.67 370.779 1231.26 371.627 1232.67 372.899C1242.42 381.702 1252.02 390.691 1261.5 399.781C1266.69 404.75 1271.49 410.11 1276.61 415.13C1282.45 420.862 1283.28 422.745 1284.57 436.601C1286.91 433.769 1288.64 431.7 1290.35 429.614L1293.1 430.089C1292.45 434.227 1292.13 438.484 1290.91 442.435C1290.67 443.182 1286.86 442.673 1284.75 443.063C1283.36 443.317 1281.36 443.843 1280.94 444.827C1280.33 446.235 1280.19 448.762 1281.06 449.762C1284.79 454.036 1288.96 457.92 1294.32 463.313C1297.27 457.004 1300.15 450.848 1303.46 443.775C1312.72 451.102 1310.86 460.294 1309.45 470.284C1311.92 469.911 1314.13 469.588 1316.35 469.249C1317.45 471.997 1318.54 474.761 1320.61 480.002C1321.01 475.1 1321.2 472.862 1321.4 470.352C1338.6 486.837 1348.88 507.324 1361.68 529.966C1355.49 528.796 1353.05 528.338 1350.88 527.931C1346.4 534.308 1350.68 538.633 1363.8 541.312C1362.67 537.276 1361.63 533.595 1359.94 527.609C1376.56 550.742 1381.83 565.412 1379.63 571.738C1379.87 574.147 1379.76 576.64 1380.44 578.93C1380.97 580.71 1382.05 582.881 1383.55 583.746C1390.99 588.037 1393.13 594.516 1395.42 602.69C1400.2 619.735 1408.56 635.762 1413.99 652.672C1423.11 681.13 1432.31 709.674 1439.14 738.727C1443.82 758.655 1445.03 779.465 1446.87 799.952C1448.89 822.373 1449.03 844.998 1451.66 867.334C1453.12 879.647 1453.03 891.468 1451.59 903.68C1450.11 916.196 1450.84 928.984 1449.27 941.467C1447.54 955.17 1444.11 968.653 1441.7 982.272C1439.87 992.669 1438.7 1003.18 1436.78 1013.56C1436.17 1016.87 1433.65 1019.8 1432.76 1023.11C1431.54 1027.76 1431.22 1032.64 1430.19 1037.34C1429.2 1041.84 1427.86 1046.25 1426.52 1050.66C1424.03 1058.93 1421.76 1067.31 1418.77 1075.4C1415.31 1084.74 1411.39 1093.92 1407.09 1102.89C1406.51 1104.08 1402.49 1103.6 1401.35 1103.74C1400.01 1111.12 1400.22 1119.19 1396.89 1125.33C1394.2 1130.28 1391.79 1137.42 1383.7 1138.59C1381.75 1138.86 1379.97 1143.88 1379.2 1146.99C1378.87 1148.36 1381.26 1150.41 1382.75 1152.69C1382.85 1152.65 1381.75 1153.16 1380.59 1153.42C1379.12 1153.74 1377.59 1153.87 1376.12 1154.09C1379.31 1167.17 1375.47 1172.09 1361.53 1171.55C1361.99 1174.33 1363.35 1177.31 1362.57 1179.52C1361.91 1181.38 1358.75 1182.35 1356.49 1183.84C1358.11 1186.11 1359.78 1188.49 1362.38 1192.15C1354.56 1196.71 1347.34 1200.92 1340.03 1205.18C1341.47 1208.26 1343.16 1211.91 1344.86 1215.56C1344.27 1215.91 1343.67 1216.29 1343.08 1216.64C1341.49 1213.74 1339.87 1210.84 1337.96 1207.38C1330.38 1217.59 1324.19 1227.21 1316.67 1235.65C1309.02 1244.27 1300.07 1251.73 1291.13 1260.21C1296.56 1265.66 1301.41 1271.68 1290.2 1276.99C1289.01 1268.9 1285.18 1268.85 1279.16 1274.36C1281.43 1275.85 1283.72 1277.38 1286.03 1278.89C1285.36 1279.75 1284.69 1280.62 1284.02 1281.46C1279.67 1279.94 1275.31 1278.41 1270.69 1276.8C1270.22 1279.56 1269.74 1282.35 1269.46 1284.08C1256.91 1292.89 1238.66 1295.52 1241.68 1316.79C1241.3 1314.57 1240.93 1312.35 1240.56 1310.13C1239.84 1309.91 1239.15 1309.69 1238.44 1309.48C1237.32 1312.26 1234.45 1316.35 1235.37 1317.59C1241.74 1326.15 1234.25 1328.73 1228.21 1334.09C1225.48 1329.73 1223.02 1325.81 1219.46 1320.13C1215.15 1319.74 1215.86 1319.69 1216.41 1327.1C1216.71 1331.41 1214.29 1335.92 1213.17 1340.06C1211.54 1338.5 1208.3 1335.43 1202.77 1330.16C1203.35 1336.92 1203.63 1340.47 1204.01 1344.78C1198.43 1344.32 1193.24 1343.88 1188.05 1343.45C1188.05 1342.57 1188.06 1341.69 1188.08 1340.82C1184.96 1343.22 1182.01 1345.88 1178.67 1347.93C1174.94 1350.22 1169.92 1350.56 1171.75 1357.67C1172.17 1359.31 1165.51 1364.03 1161.45 1365.3C1154.86 1367.37 1147.73 1367.77 1140.85 1368.88C1142 1380.58 1139.36 1387.63 1132.86 1389.86C1133.17 1386.26 1133.45 1382.77 1133.88 1377.61C1132.91 1379.49 1127.52 1379.63 1127.37 1379.71C1125.19 1380.83 1122.65 1381.65 1121.01 1383.33C1118.16 1386.19 1116 1389.74 1113.31 1392.79C1110.18 1396.32 1102.3 1396.05 1104.54 1403.98C1104.71 1404.61 1102.76 1406.41 1101.55 1406.75C1091.26 1409.56 1080.91 1412.19 1070.57 1414.8C1068.9 1415.23 1066.6 1414.53 1065.51 1415.45C1044.72 1432.71 1018.38 1434.26 993.788 1440.4C979.66 1443.92 964.99 1445.2 950.557 1447.49C945.452 1438.62 941.755 1448.96 937.464 1448.37C933.071 1447.76 927.22 1450.66 924.981 1442.87C924.269 1440.4 918.231 1439.43 914.771 1437.85C912.923 1442.84 911.634 1446.33 911.176 1447.52C905.427 1444.77 900.61 1442.46 895.471 1439.99C896.319 1445.11 896.777 1447.86 897.523 1452.34C892.978 1449.5 890.129 1447.72 886.838 1445.69C886.397 1447.49 886.007 1449.16 885.482 1451.34C872.236 1445.81 858.77 1446.42 844.913 1448.91C839.69 1449.86 833.906 1447.59 828.36 1446.91C820.915 1445.99 812.604 1442.43 809.433 1453.49C807.89 1450.27 806.38 1445.48 805.515 1445.6C800.156 1446.31 794.966 1448.13 789.471 1449.64C786.673 1442.01 771.154 1440.36 761.233 1449.33C762.182 1446.28 762.776 1444.36 763.403 1442.35C748.173 1439.99 733.401 1438.17 718.833 1435.32C700.261 1431.7 681.877 1427.07 663.34 1423.3C658.964 1422.42 654.232 1423.32 649.314 1423.4C649.212 1423.64 649.907 1422.06 650.653 1420.4C632.574 1414.46 614.291 1409.27 596.67 1402.39C584.068 1397.45 572.892 1388.33 560.053 1384.63C548.283 1381.26 540.125 1373.68 530.458 1367.72C516.245 1358.97 501.236 1351.49 487.244 1342.43C477.814 1336.33 469.419 1328.58 460.786 1321.3C450.729 1312.86 440.773 1304.29 431.021 1295.49C419.523 1285.09 407.905 1274.8 397.118 1263.69C390.199 1256.55 384.805 1247.95 378.513 1240.17C370.254 1229.97 361.367 1220.26 353.514 1209.76C347.222 1201.34 342.049 1192.08 336.435 1183.18C325.937 1166.53 314.116 1150.52 305.365 1133C295.443 1113.12 288.235 1091.88 279.925 1071.21C275.023 1059.02 269.342 1047.01 265.729 1034.44C262.744 1024.08 262.405 1012.97 260.59 1002.25C260.2 999.945 258.504 997.859 257.351 995.705C256.249 993.669 254.23 991.753 254.061 989.667C253.247 979.406 253.009 969.094 252.365 958.8C252.195 956.188 250.821 953.61 250.855 951.032C250.957 938.499 242.291 927.61 246.208 913.771C248.871 904.375 245.496 893.334 245.36 883.039C245.275 877.086 246.242 871.116 246.683 865.876C245.598 862.263 243.919 858.939 243.698 855.513C243.223 847.932 243.206 840.266 243.613 832.685C243.783 829.531 246.208 826.478 246.361 823.323C246.615 817.828 243.563 809.128 246.005 807.33C253.603 801.75 247.684 794.932 249.787 789.115C252.076 782.738 252.806 775.615 253.196 768.763C254.671 742.373 262.524 717.425 270.529 692.595C275.125 678.332 280.79 664.357 286.726 650.586C289.795 643.462 294.714 637.17 298.292 630.25C299.87 627.198 299.547 623.161 301.176 620.176C307.858 607.948 315.1 596.025 321.833 583.831C323.817 580.235 324.309 575.792 326.378 572.247C332.501 561.732 339.013 551.42 345.56 541.143C346.34 539.922 349.478 539.413 349.478 538.565C349.478 526.218 363.419 523.877 366.624 515.262C369.864 506.527 383.059 504.611 380.192 491.586C379.175 486.939 386.179 480.205 390.283 475.033C391.199 473.879 395.355 475.27 398.662 475.541C393.184 462.075 408.21 456.987 410.788 446.54C414.18 447.388 417.436 448.202 421.015 449.101C419.913 435.346 420.269 435.058 436.058 435.991C435.736 433.192 435.414 430.479 435.024 427.019C437.5 426.747 439.908 426.493 444.742 425.984C440.316 424.458 438.467 423.83 439.45 424.17C448.575 413.281 458.107 401.901 468.13 389.927C469.232 393.048 470.199 395.762 471.675 399.951C475.779 391.759 478.001 383.873 482.936 378.479C487.549 373.425 494.893 370.746 501.304 367.557C504.136 366.149 507.748 366.387 510.716 365.166C511.531 364.827 511.31 361.96 511.666 359.688C512.531 359.959 514.515 360.57 516.483 361.18C518.789 350.495 536.326 335.859 541.94 336.859C547.978 332.128 551.963 328.21 556.627 325.479C571.196 316.948 585.34 307.061 600.91 300.955C636 287.184 671.616 274.548 707.52 263.05C726.6 256.944 746.681 253.806 766.456 250.092C775.021 248.481 783.959 248.786 793.965 250.313C791.15 252.992 788.318 255.638 785.553 258.335C784.078 259.776 782.721 261.337 781.313 262.846C782.806 264.033 784.179 266.035 785.808 266.272C792.49 267.222 799.291 268.273 805.956 267.866C807.822 267.747 809.399 262.727 811.095 259.963C808.415 258.962 805.82 257.521 803.056 257.114C801.19 256.842 799.104 258.012 796.594 258.674C794.661 249.431 797.544 244.071 806.974 243.698C823.425 243.071 839.893 242.24 856.344 242.477C882.514 242.833 908.869 242.29 934.767 245.275C962.921 248.515 990.905 254.417 1018.48 261.099C1029.52 263.762 1039.34 271.547 1049.57 277.296C1049.82 277.432 1048.47 281.265 1047.26 282.927C1045.57 285.267 1043.31 287.201 1041.28 289.27C1036.09 283.164 1031.95 274.65 1021.55 281.129C1020.96 281.502 1019.7 281.027 1018.86 280.688C1013.9 278.687 1008.98 276.601 1004.05 274.548C1003.46 275.651 1002.88 276.736 1002.29 277.839C1004.78 279.467 1007.1 281.485 1009.8 282.638C1015.79 285.182 1022.7 286.234 1027.83 289.88C1033.36 293.815 1036.97 293.696 1041.12 288.981H1041.16ZM699.685 1362.28C695.377 1365.28 695.089 1368.21 699.888 1370.96C700.346 1371.23 701.177 1370.84 702.483 1370.67C702.517 1368.88 702.551 1367.01 702.602 1363.31C708.674 1365.99 714.084 1368.37 720.529 1371.22C720.868 1369.88 721.58 1367.06 722.292 1364.26C723.683 1369.45 725.125 1373.45 732.451 1373C735.962 1372.78 739.761 1377.41 743.238 1379.73C751.769 1376.71 760.385 1376.37 768.441 1383.14C778.939 1374.56 785.672 1384.5 793.033 1387.16C794.729 1384.73 797.408 1382.95 798.595 1383.65C804.65 1387.26 810.688 1390.31 817.998 1389.53C821.475 1389.16 825.019 1389.07 828.445 1388.41C838.536 1386.46 849.611 1391.69 858.956 1384.28C859.312 1384 859.974 1384.12 861.008 1384C860.652 1386.41 860.347 1388.57 859.567 1393.98C870.268 1392.13 880.97 1390.26 891.672 1388.41C931.765 1387.9 952.508 1384.78 964.108 1381.78C966.245 1381.22 972.368 1379.58 981.441 1377.42C1000.23 1372.98 1003.68 1373.06 1010.92 1370.83C1029.05 1365.23 1043.06 1353.71 1042.16 1351.9C1041.09 1349.71 1018.4 1361.89 976.15 1371.27C974.946 1371.54 967.11 1373.27 958.24 1374.81C939.194 1378.14 911.074 1381.36 874.797 1379.71C856.904 1378.61 842.488 1375.17 833.041 1377.46C826.715 1379 819.355 1375.78 812.621 1376.39C803.039 1377.25 793.931 1377.51 784.654 1374.01C778.566 1371.72 771.68 1371.62 765.252 1370.18C759.571 1368.91 754.008 1367.04 748.343 1365.62C746.851 1365.25 744.68 1364.81 743.713 1365.53C738.896 1369.25 735.47 1367.45 731.536 1363.86C728.602 1361.16 724.718 1361.9 722.53 1364.5C721.444 1365.21 720.359 1365.92 719.291 1366.65C718.171 1362.97 717.052 1359.31 715.627 1354.7C709.929 1357.51 705.078 1359.92 700.211 1362.31C693.443 1357.38 685.676 1347.49 680.113 1348.59C670.276 1350.56 671.073 1344.59 668.767 1339.59C665.917 1341.82 663.56 1343.69 661.66 1345.18C666.155 1355.02 674.092 1357.33 683.132 1354.93C684.506 1358.87 685.608 1362.01 686.643 1364.97C691.459 1363.99 695.564 1363.14 699.668 1362.31L699.685 1362.28ZM1225.56 394.235C1220.14 388.774 1214.71 383.313 1208.25 376.8C1209.33 376.207 1207.87 377.004 1206.4 377.801C1208.79 372.442 1208.26 368.592 1202.11 365.81C1195.26 362.707 1188.85 358.619 1182.43 354.634C1180.98 353.735 1180.43 351.428 1179.28 349.902C1177.36 347.375 1175.29 344.966 1173.29 342.507C1171.36 344.322 1168.1 345.916 1167.76 348.002C1167.22 351.292 1167.7 355.515 1169.46 358.229C1171.65 361.638 1175.26 364.436 1178.84 366.556C1181.79 368.303 1185.57 368.659 1188.98 369.643C1190.68 372.696 1193.2 375.596 1196.36 376.783C1199.45 377.954 1203.19 377.394 1206.65 377.58C1211.03 385.162 1215.42 392.76 1220.41 401.375C1222.8 397.949 1224.17 395.999 1225.53 394.049C1227.33 397.695 1228.55 401.816 1231.04 404.886C1235.89 410.822 1241.13 416.504 1246.83 421.609C1250.48 424.865 1255.06 427.29 1259.59 429.19C1260.74 429.682 1264.32 427.138 1264.93 425.34C1265.42 423.881 1263.64 420.676 1261.99 419.658C1257.58 416.911 1251.9 415.774 1248.19 412.399C1241.81 406.616 1236.55 399.611 1230.89 393.184C1229.45 393.438 1227.5 393.794 1225.56 394.201V394.235ZM547.452 1286.94C545.858 1284.06 544.721 1280.73 542.516 1278.44C540.38 1276.22 537.123 1275.07 534.359 1273.46C533.239 1276.71 530.628 1280.43 531.442 1283.09C532.188 1285.57 536.411 1287.79 539.481 1288.52C541.991 1289.11 545.06 1287.31 547.876 1286.59C547.842 1291.69 547.808 1296.81 547.757 1303.83C550.759 1299.36 552.404 1296.91 553.829 1294.81C558.696 1297.41 562.563 1299.44 565.26 1300.88C566.074 1304.33 566.701 1307.01 567.346 1309.67C573.791 1304.8 575.419 1312.53 579.404 1314.09C584.052 1315.93 589.14 1316.59 594.092 1317.71C593.837 1320.73 593.6 1323.73 593.346 1326.75C599.706 1312.59 607.829 1335.96 613.087 1324.22C611.985 1321.59 610.543 1318.15 608.881 1314.15C605.557 1317.2 602.284 1323.91 598.06 1315.4C596.619 1316.3 595.16 1317.18 593.719 1318.08C597.789 1307.18 584.035 1308.19 583.661 1304.29C578.166 1302.09 574.944 1301.05 571.959 1299.54C563.767 1295.44 555.66 1291.13 547.503 1286.94H547.452ZM446.048 1176.91C455.579 1177.28 452.968 1182.74 448.677 1189.86C453.663 1187.32 456.275 1186 459.972 1184.11C462.262 1191.25 464.297 1197.58 466.502 1204.48C468.961 1203.02 471.488 1201.53 473.761 1200.19C479.781 1208.37 485.616 1216.3 492.484 1225.67C494.604 1226.31 500.88 1226.46 504.645 1229.62C529.372 1250.27 554.287 1270.61 582.44 1286.57C591.599 1291.76 600.621 1297.37 610.272 1301.53C617.157 1304.5 624.671 1305.56 619.684 1317.13C628.012 1308.48 634.982 1313.52 642.326 1316.5C656.996 1322.47 671.972 1327.73 686.575 1333.84C694.156 1337.01 701.228 1341.37 708.894 1345.39C711.913 1341.16 721.326 1343.1 725.634 1348.42C730.654 1349.56 732.672 1349.68 734.368 1350.49C736.149 1351.34 737.556 1353.75 739.252 1353.9C746.443 1354.53 753.77 1354.05 760.893 1355.05C764.336 1355.54 767.44 1358.41 769.628 1359.62C773.054 1359.7 775.988 1359.55 778.837 1359.97C780.126 1360.16 781.33 1362.31 782.416 1362.19C788.097 1361.57 793.745 1360.48 799.393 1359.55C799.003 1360.65 798.612 1361.75 798.205 1362.85C801.801 1365.01 805.379 1367.16 807.499 1368.43C820.219 1358.65 830.921 1362.67 842.217 1369.96C841.708 1367.77 841.301 1366.04 840.419 1362.31C852.766 1368.94 864.672 1363.35 877.12 1367.42C887.839 1370.93 901.661 1364.84 914.127 1363.11C926.406 1361.41 938.702 1358.67 951.015 1358.63C962.005 1358.6 971.299 1351.98 983.544 1354.51C992.55 1356.38 1003.56 1349.32 1013.51 1345.74C1022.33 1342.57 1030.74 1338.18 1039.65 1335.36C1047.59 1332.84 1055.66 1333.07 1063.68 1327.93C1074.55 1320.98 1088.37 1318.72 1100.59 1313.65C1105.44 1311.64 1108.95 1306.04 1113.83 1304.58C1122.79 1301.92 1130.6 1298.49 1137.35 1291.66C1140.2 1288.77 1145.89 1288.77 1150.21 1287.25C1151.75 1286.7 1153.3 1285.75 1154.43 1284.58C1159.84 1279.06 1165.03 1273.31 1170.49 1267.83C1171.24 1267.08 1173.12 1266.93 1174.31 1267.2C1182.25 1269.08 1182.23 1269.13 1181.77 1261.77C1184.45 1261.99 1188.51 1263.52 1189.83 1262.23C1196.32 1255.97 1203.77 1249.8 1207.67 1242C1212.37 1232.58 1218.69 1225.77 1224.85 1221.48C1228.53 1222.8 1230.57 1223.55 1232.06 1224.07C1232.52 1218.63 1232.84 1214.73 1233.26 1209.54C1237.2 1212.4 1239.3 1213.95 1241.91 1215.85C1242.2 1212.33 1242.42 1209.74 1242.52 1208.5C1255.57 1210.44 1251.75 1200.58 1252.46 1193.64C1255.23 1195.83 1256.92 1197.17 1258.62 1198.51C1262.06 1193.92 1268.12 1189.25 1267.47 1185.81C1266.73 1181.81 1264.55 1182.32 1269.78 1179.79C1275.07 1177.23 1278.29 1169.83 1281.7 1164.12C1286.45 1156.11 1290.1 1147.45 1294.98 1139.54C1300.82 1130.1 1309.13 1121.87 1313.38 1111.85C1322.02 1091.51 1328.85 1070.41 1336.04 1049.48C1344.16 1025.83 1353.36 1002.39 1359.23 978.168C1363.75 959.495 1362.72 939.533 1366.2 920.521C1370.3 898.1 1367.55 876.069 1365.89 853.902C1363.99 828.326 1361.8 802.751 1359.24 777.243C1358.77 772.477 1355.22 768.067 1354.24 763.268C1350.73 746.155 1348.52 728.737 1344.27 711.828C1340.38 696.378 1335.46 681.012 1329.21 666.358C1321.88 649.178 1312.81 632.727 1304.12 616.14C1296.46 601.503 1289.18 586.545 1280.07 572.824C1270.64 558.628 1259.11 545.824 1248.71 532.256C1242.91 524.674 1238.78 515.33 1231.72 509.292C1215.4 495.351 1201.29 479.239 1185.94 464.399C1173.26 452.137 1159.84 440.858 1145.46 431.327C1122.36 416.012 1100.35 398.763 1073.89 388.621C1053.95 380.972 1035.22 370.254 1014.8 363.47C1009.75 361.791 1005.86 356.584 1000.79 354.854C993.805 352.48 986.122 352.208 978.88 350.461C961.954 346.374 945.215 341.439 928.204 337.792C901.526 332.06 874.475 329.601 847.118 330.398C840.114 330.601 833.058 329.346 824.951 328.685C822.628 333.722 819.812 334.163 812.791 329.363C810.824 328.023 807.126 327.803 804.803 328.668C801.173 330.025 798.273 334.01 794.678 334.655C761.775 340.523 728.652 346.323 697.785 359.111C664.289 372.984 631.997 389.809 599.315 405.581C592.531 408.855 586.375 413.417 579.676 416.86C578.065 417.691 575.402 416.436 573.214 416.131C574.215 414.027 575.046 411.823 576.267 409.855C576.827 408.939 578.149 408.499 579.116 407.837C578.726 407.006 578.319 406.158 577.929 405.327C572.298 407.6 566.667 409.889 560.087 412.552C563.496 414.875 565.412 416.181 569.211 418.776C564.955 418.217 563.191 417.979 559.035 417.419C563.445 420.472 565.819 422.134 570.483 425.357C564.768 426.357 560.986 426.629 557.492 427.765C555.321 428.46 553.354 430.258 551.692 431.954C548.3 435.397 545.569 439.637 541.804 442.571C538.446 445.183 533.307 445.692 530.339 448.558C525.93 452.815 522.741 458.327 518.654 463.805C517.399 458.547 516.636 455.376 515.872 452.221C514.346 461.21 514.532 461.363 504.831 472.506C493.383 485.65 481.817 498.709 469.707 511.242C466.705 514.346 461.414 515.262 456.919 517.297C453.137 523.979 448.762 531.713 444.182 539.803C443.453 538.259 442.809 536.903 441.35 533.85C436.533 550.691 432.65 566.854 414.468 573.35C422.151 580.778 414.892 584.849 410.585 588.953C407.311 592.074 402.8 593.871 398.323 596.585C401.291 598.196 403.207 599.248 407.277 601.469C401.952 604.336 398.458 606.218 394.947 608.101C392.319 619.43 388.045 630.742 382.38 641.325C379.972 645.82 374.663 648.771 370.101 652.96C370.83 654.792 372.34 658.489 373.934 662.441C364.64 662.746 365.556 662.661 366.387 671.531C366.947 677.467 365.335 683.997 363.198 689.712C355.058 711.421 342.931 731.841 342.422 755.958C342.371 758.417 341.897 760.944 341.218 763.319C338.64 772.443 335.842 781.5 333.213 790.607C328.295 807.686 336.266 826.325 326.921 842.878C332.365 851.409 327.939 860.059 327.803 868.776C327.515 888.433 328.278 908.293 330.957 927.729C333.417 945.588 338.708 963.108 343.236 980.644C347.833 998.401 352.734 1016.11 358.093 1033.64C360.637 1041.94 365.437 1049.13 370.254 1056.56C383.567 1077.06 394.507 1099.09 407.057 1120.12C410.127 1125.26 413.298 1128.91 407.345 1133.62C407.21 1133.73 407.769 1134.71 408.363 1136.1C410.602 1135.01 412.772 1133.96 415.283 1132.72C416.3 1134.93 417.318 1137.13 418.471 1139.61C416.979 1139.8 415.995 1139.95 414.977 1140.02C413.62 1140.12 412.247 1140.17 410.279 1140.27C411.619 1142.24 412.467 1143.85 413.705 1145.05C414.011 1145.34 415.69 1144.44 416.588 1143.85C422.626 1139.9 424.356 1143.63 425.849 1148.7C426.832 1152.04 428.24 1157.76 430.038 1157.99C442.011 1159.57 439.569 1165.85 435.55 1173.65C438.28 1174.87 441.113 1176.13 443.945 1177.4C444.64 1177.3 445.319 1177.14 445.997 1176.94L446.048 1176.91ZM1355.46 651.756L1349.78 652.468C1349.63 656.589 1348.24 661.152 1349.52 664.747C1354.39 678.349 1360.14 691.629 1365.6 705.146C1365.94 704.959 1369.38 703.535 1369.27 703.043C1364.87 685.896 1360.14 668.835 1355.48 651.756H1355.46ZM476.372 1214.74C475.694 1214.27 474.999 1213.81 474.32 1213.34C472.845 1216.35 470.945 1219.24 469.962 1222.41C467.231 1231.28 473.879 1234.31 479.832 1238.13C487.515 1243.05 494.774 1248.6 502.983 1254.4C501.931 1246.17 501.236 1240.66 500.574 1235.43C497.674 1237.54 494.299 1239.96 490.653 1242.59C488.77 1237.74 486.905 1232.91 484.988 1228.01C481.969 1229.46 479.866 1230.46 475.813 1232.43C476.033 1225.51 476.203 1220.12 476.372 1214.74ZM332.145 1139.36C339.2 1151.11 345.814 1162.13 352.463 1173.21C355.058 1171.55 357.313 1170.1 359.586 1168.66C358.263 1165.66 357.025 1162.81 355.77 1159.96C355.058 1160.83 354.362 1161.68 353.65 1162.54C351.818 1161.23 349.071 1160.3 348.375 1158.55C346.968 1155.03 346.442 1151.09 345.984 1147.28C345 1138.98 341.439 1135.15 332.145 1139.37V1139.36ZM275.685 900.474C261.93 907.241 268.053 916.518 268.562 923.726C269.138 931.867 272.14 939.821 274.209 948.403C279.874 948.488 279.636 948.556 277.957 941.958C275.956 934.004 274.413 925.948 272.445 916.925C272.564 916.807 274.057 915.331 276.38 913.025C273.582 913.364 272.259 913.533 270.834 913.703C272.14 910.141 273.378 906.732 275.668 900.457L275.685 900.474ZM1385.04 757.315C1383.02 757.722 1381.02 758.112 1379 758.519C1380.93 768.169 1382.87 777.803 1385.11 788.996C1387.68 786.52 1390.84 784.739 1390.62 783.518C1389.14 774.716 1386.97 766.032 1385.04 757.315ZM387.417 1224.16C396.762 1211.4 384.144 1207.99 382.702 1200.77C382.651 1200.48 380.498 1200.11 379.938 1200.53C379.056 1201.21 377.954 1202.87 378.242 1203.57C380.939 1210.05 383.907 1216.41 387.417 1224.14V1224.16ZM291.966 1046.86C293.544 1043.02 295.104 1040.97 295.07 1038.94C294.951 1032.47 294.409 1026 293.679 1019.57C293.459 1017.67 292.102 1015.9 291.271 1014.07C289.694 1016.12 286.573 1018.36 286.794 1020.18C287.845 1028.39 289.846 1036.49 291.966 1046.86ZM1271.19 517.348C1265.23 511.191 1257.7 503.729 1256.67 504.594C1255.02 505.934 1272.78 525.183 1291.22 557.407C1318.3 604.726 1331.85 628.402 1333.9 633.982C1334.6 635.881 1336.63 641.715 1342.16 645.175C1346.64 647.974 1351.64 648.109 1355.12 647.787C1338.38 618.209 1319.57 587.579 1298.47 556.305C1289.4 542.856 1280.29 529.881 1271.19 517.365V517.348ZM274.871 958.41C277.94 966.025 273.09 976.065 282.621 984.07C281.858 974.318 281.349 967.805 280.807 960.852C279.314 960.241 277.092 959.325 274.871 958.41ZM266.543 891.282C272.937 885.77 273.378 877.951 266.747 864.536C266.679 873.321 266.611 882.09 266.543 891.282ZM1377.73 727.906C1367.16 734.979 1379.24 742.271 1376.05 751.837C1389.94 742.865 1372.86 735.318 1377.73 727.906ZM643.412 1334.16C647.211 1348.74 650.959 1351.25 660.372 1344.89C654.775 1341.35 649.772 1338.18 643.412 1334.16ZM763.607 1403.59C776.819 1403.52 779.787 1401.54 785.384 1404.25C788.725 1405.87 788.47 1406.97 793.965 1410.19C793.965 1410.19 799.274 1413.31 805.854 1415.46C816.251 1418.89 828.292 1418.79 840.843 1418.11C860.55 1417.03 859.855 1415.69 871.863 1415.46C888.653 1415.16 891.842 1417.75 905.528 1418.11C930.307 1418.74 952.016 1411.02 951.727 1408.87C951.422 1406.59 926.542 1409.56 871.218 1409.49C862.518 1409.49 845.507 1409.39 823.679 1406.9C818.269 1406.29 812.452 1405.61 804.531 1404.25C779.227 1399.91 775.581 1395.84 757.671 1394.35C750.616 1393.76 752.023 1394.47 733.249 1393.69C728.822 1393.5 720.427 1393.13 709.488 1392.37C673.939 1389.91 656.25 1386.56 656.03 1387.75C655.538 1390.23 732.468 1407 732.689 1406.07C732.74 1405.87 729.212 1405.05 729.297 1404.25C729.45 1402.76 741.915 1402.88 747.122 1402.93C757.315 1403.03 756.382 1403.63 763.624 1403.59H763.607Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_3596_37645)">
    <path d="M1331.5 1154.5L1199.5 1288L1110.5 1350L1037 1388.5L916 1407.5H788.5L695 1388.5L597 1350L490.5 1288L403 1202L342.5 1102.5L298 993.5L286.5 859.5L305.5 716L367 583.5L465 453L621.5 345L762.5 293.5H943.5L1110.5 345L1277 483L1341.5 596.5L1392 716L1409 859.5L1392 1012L1331.5 1154.5Z" stroke="white" stroke-width="107"/>
    </g>
    <mask id="mask1_3596_37645" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="562" y="872" width="570" height="284">
    <path d="M637.119 1082.81C640.426 1078.86 641.41 1077.66 642.411 1076.47C640.189 1075.03 637.357 1071.87 635.847 1072.41C624.45 1076.5 623.348 1063.15 615.784 1061.12C616.988 1059.36 618.192 1057.59 620.261 1054.57C616.869 1053.84 613.596 1053.86 611.137 1052.44C607.321 1050.23 603.742 1047.38 600.672 1044.21C595.381 1038.77 590.564 1032.86 585.561 1027.13C579.879 1020.6 574.452 1013.85 568.499 1007.56C561.071 999.724 561.122 990.837 564.056 980.339C566.905 984.053 569.381 987.292 572.264 991.057C573.689 988.903 575.164 986.665 577.166 983.629C580.965 990.159 584.204 995.738 587.443 1001.3C586.595 986.19 584.442 971.706 593.668 958.528C599.349 961.547 605.031 964.566 610.73 967.585C611.272 966.635 611.832 965.668 612.375 964.719C615.003 968.094 617.615 971.486 620.244 974.861C621.041 975.844 621.838 976.828 622.635 977.812C618.701 978.524 614.749 979.236 610.814 979.932C611.628 981.288 612.442 982.662 613.257 984.019C617.734 986.071 622.194 988.106 628.164 990.854C628.266 992.414 628.538 996.722 628.809 1001.03C629.572 1000.33 630.352 999.622 631.115 998.927C635.389 1001.03 640.223 1002.42 643.818 1005.35C655.199 1014.63 666.324 1024.25 677.043 1034.27C679.485 1036.56 679.875 1041.04 680.113 1041.65C691.815 1047.03 701.873 1051.59 711.845 1056.3C714.084 1057.35 716.238 1058.76 718.137 1060.34C721.699 1063.31 725.057 1066.55 729.314 1070.41C735.504 1067.31 736.369 1068.26 741.237 1076.76C742.695 1079.32 749.852 1081.35 752.413 1079.96C757.773 1077.06 762.03 1081.9 763.794 1081.47C772.647 1079.35 776.904 1094.24 786.198 1086.76C786.808 1086.27 788.301 1086.76 789.352 1086.98C801.818 1089.63 814.165 1093.44 826.783 1094.67C839.571 1095.9 852.647 1095.02 865.537 1094.19C873.304 1093.7 880.987 1091.58 888.687 1090.09C901.407 1087.61 914.602 1086.42 926.694 1082.1C938.448 1077.91 949.421 1071.07 960.038 1064.31C972.147 1056.57 983.205 1047.23 995.264 1039.43C999.707 1036.54 1005.69 1036.07 1008.75 1032.98C1011.21 1029.35 1013.5 1025.6 1016.12 1022.13C1026 1009.07 1035.88 996.044 1045.96 983.154C1048.59 979.796 1051.94 976.998 1054.98 973.962C1055.49 973.453 1056.49 973.165 1056.62 972.622C1061.61 950.93 1066.67 929.238 1071.31 907.462C1072.02 904.137 1070.77 900.423 1070.6 896.896C1070.55 895.963 1071.19 895.013 1071.58 893.911C1085.24 899.287 1079.39 911.091 1081.93 920.758C1084.71 920.097 1088.51 919.181 1095.48 917.519C1092.51 914.432 1090.73 912.55 1089.29 911.04C1089.36 908.31 1089.44 904.697 1089.58 898.388C1093.16 904.426 1095.9 909.039 1099.87 915.738C1102.64 900.304 1105.01 886.991 1107.39 873.694C1108.45 873.372 1109.51 873.05 1110.57 872.728C1114.76 879.223 1118.94 885.719 1123.48 892.757C1124.19 890.569 1124.77 888.806 1125.35 887.059C1125.87 887.008 1126.42 886.957 1126.94 886.906C1128.54 903.68 1131.94 920.521 1131.2 937.176C1130.5 952.473 1126.97 968.161 1121.8 982.645C1111.34 1011.97 1093.67 1036.53 1071.7 1059.2C1053.79 1077.69 1034.88 1094.09 1012.77 1106.3C989.345 1119.24 964.854 1130.45 940.144 1140.8C927.084 1146.26 912.77 1149.51 898.693 1151.57C882.768 1153.87 866.486 1153.57 850.374 1154.67C824.392 1156.47 798.969 1152.77 774.529 1144.55C753.16 1137.37 732.231 1128.64 711.692 1119.31C686.965 1108.08 662.848 1095.48 637.136 1082.83L637.119 1082.81ZM1062.8 987.258C1068.45 969.874 1074.47 962.666 1079.11 959.376C1080.5 958.392 1084.95 955.509 1084.95 951.642C1084.95 948.556 1081.62 947.267 1082.15 944.468C1082.9 940.398 1088.42 938.447 1090.12 936.141C1087.53 936.548 1086.02 935.734 1085.49 935.395C1082.51 933.478 1081.42 928.322 1083.73 923.048C1079.54 928.424 1074.57 935.87 1070.33 945.384C1066.41 954.186 1064.27 962.242 1063.05 968.619C1054.18 984.392 1045.31 1000.15 1036.43 1015.92L1062.8 987.258Z" fill="white"/>
    </mask>
    <g mask="url(#mask1_3596_37645)">
    <path d="M572 977.06L673.187 1073.69L787.662 1122H920.023L1030.92 1052.45L1084.58 995.642L1104 873" stroke="white" stroke-width="97"/>
    </g>
    <mask id="mask2_3596_37645" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="673" y="631" width="102" height="187">
    <path d="M720.936 634.473C723.751 639.375 725.243 642.004 726.753 644.615C727.77 644.005 728.788 643.411 729.806 642.801C728.839 640.494 727.855 638.188 726.617 635.254C729.823 634.134 732.604 633.167 736.454 631.845C737.065 637.628 737.556 642.411 738.065 647.176C738.235 648.703 737.862 650.992 738.71 651.62C745.884 656.945 747.698 666.239 752.82 672.074C766.558 687.745 766.541 707.028 770.883 725.175C772.409 731.535 771.765 738.404 772.155 745.918C769.051 744.849 766.643 744.035 764.234 743.204L763.268 744.459C765.863 747.105 770.17 749.428 770.73 752.447C772.935 764.319 774.394 776.395 774.885 788.436C774.953 790.115 768.135 792.1 764.15 794.118C763.03 792.71 761.64 790.98 759.35 788.148C759.045 791.811 758.892 793.897 758.706 795.966C757.383 810.213 749.123 815.386 734.961 812.163C730.654 811.18 724.921 812.35 720.986 814.572C708.165 821.814 699.125 817.302 696.344 802.767C693.002 785.214 687.982 767.966 684.421 750.446C682.826 742.661 683.624 734.385 682.216 726.549C680.045 714.474 675.262 702.653 674.703 690.577C674.228 680.248 670.259 668.885 682.301 659.371C689.203 653.926 690.611 641.529 694.783 631.573C698.938 635.627 703.501 640.07 706.655 643.157C711.981 639.901 716.916 636.899 720.919 634.456L720.936 634.473Z" fill="white"/>
    </mask>
    <g mask="url(#mask2_3596_37645)">
    <path d="M708 626L736 818" stroke="white" stroke-width="97"/>
    </g>
    <mask id="mask3_3596_37645" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="931" y="605" width="98" height="189">
    <path d="M1026 781.449C1003.47 767.168 1018.58 791.031 1012.17 793.558C1008.54 790.709 1004.69 787.69 999.996 783.993C1000.03 787.487 1000.05 789.318 1000.06 791.167C999.47 791.252 998.859 791.32 998.266 791.404C997.367 785.977 996.468 780.567 995.366 773.952C992.448 780.346 989.955 785.824 987.191 791.879C973.555 785.197 965.211 775.258 957.324 762.708C948.352 748.428 944.486 735.114 945.978 722.699C944.129 710.403 942.925 701.177 941.331 692.019C939.889 683.759 941.331 674.38 932.834 668.614C932.054 668.071 931.104 666.256 931.375 665.917C939.771 655.131 926.186 637.933 942.467 628.894C945.418 627.248 945.062 619.684 946.165 615.156C950.557 612.51 955.34 609.627 961.395 605.998C963.158 608.355 965.38 611.323 967.348 613.952C970.265 612.391 973.453 610.712 974.827 609.983C983.833 612.646 991.566 615.936 999.606 617.055C1010.34 618.548 1008.22 628.317 1009.39 633.439C1015.62 660.778 1020.65 688.457 1024.71 716.221C1027.35 734.351 1027.79 752.837 1028.78 771.171C1028.96 774.461 1027.05 777.87 1026.03 781.466L1026 781.449Z" fill="white"/>
    </mask>
    <g mask="url(#mask3_3596_37645)">
    <path d="M967 606L997 803" stroke="white" stroke-width="97"/>
    </g>
    </svg>`;

    containerTransition.innerHTML = transitionElement + lineElement;

    const svgElement = containerTransition.querySelector("#transitionElement");
    const svgLine = containerTransition.querySelector("#lineElement");

    const pathElement = svgElement.querySelectorAll("path");
    const pathLine = svgLine.querySelectorAll("path");

    tl.to(containerTransition, {
      duration: 0,
      zIndex: 999999,
      attr: {},
    });

    tl.to(svgElement, {
      autoAlpha: 1,
      duration: 0,
      zIndex: 9999,
      attr: {width: width, height: height},
    });

    tl.to(svgLine, {
      autoAlpha: 1,
      duration: 0,
      left: -400,
      top: -200,
      position: "absolute",
      attr: {width: width + 800, height: height + 400},
    });

    if (state) {
      // SETTER
      tl.set(pathElement, {drawSVG: "0% 0%"});
      tl.set(pathLine, {drawSVG: "0% 0%"});

      tl.to(containerTransition, {
        duration: 0.5,
        opacity: 1,
        onComplete: function () {
          tl.to(containerTransition, {
            zIndex: 9999,
          });
        },
      });

      tl.to(svgLine, {
        autoAlpha: 1,
        duration: 0,
        left: -400,
        top: -200,
        position: "absolute",
        attr: {width: width + 800, height: height + 400},
      });

      tl.to(pathLine, {
        duration: 0.3,
        drawSVG: "100%",
        ease: "none",
      })
        .to(svgLine, {
          duration: 0.3,
          background: "#28282D",
        })
        .to(pathElement, {
          duration: 0.3,
          drawSVG: "100%",
          ease: "none",
          stroke: "#CDDD20",
        });
    } else {
      tl.set(svgLine, {
        duration: 0,
        background: "#28282D",
      });
      tl.set(pathElement, {drawSVG: "100%", duration: 0, stroke: "#CDDD20"});
      tl.set(pathLine, {drawSVG: "0%", duration: 0});

      tl.to(svgLine, {
        autoAlpha: 1,
        duration: 0,
        left: -400,
        top: -200,
        position: "absolute",
        attr: {width: width + 800, height: height + 400},
      });

      tl.set(".menu", {
        visibility: "visible",
        duration: 0,
      });

      tl.set(".blackscreen", {
        visibility: "hidden",
      });

      tl.to(pathElement, {
        duration: 0.5,
        delay: 0.2,
        drawSVG: "0%",
        ease: "none",
      }).to(svgLine, {
        duration: 0.5,
        ease: "none",
        opacity: 0,
        onComplete: function () {
          tl.to(containerTransition, {
            duration: 0.3,
            opacity: 0,
            onComplete: function () {
              tl.to(containerTransition, {
                duration: 0,

                zIndex: -1,
              });
            },
          });
        },
      });
    }

    return tl;
  }
}
