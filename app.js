//basics
let controller
let slideScene
let pageScene

function animateSlides() {
    //Initializes controller
    controller = new ScrollMagic.Controller()

    //Selectors
    const sliders = document.querySelectorAll(".slide")
    const nav = document.querySelector(".nav-header")

    //Loops over each slide and select more parts inside of them
    sliders.forEach((slide, i, slides) => {
        const revealImg = slide.querySelector(".reveal-img")
        const img = slide.querySelector("img")
        const revealText = slide.querySelector(".reveal-text")

        //GSAP (what, [time], properties [from/to]), delay
        const slideTl = gsap.timeline({
            defaults: {
                duration: 1, ease: "power2.inOut"
            }
        })
        slideTl.fromTo(revealImg, {x: "0%"}, {x: "100%"})
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, "-=1")
        slideTl.fromTo(revealText, {x: "0%"}, {x: "100%"}, "-=0.75")
        slideTl.fromTo(nav, {y: "-100%"}, {y: "0%"}, "-=0.5")

        //Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false //just runs animation once on scroll up and down
        })
        .setTween(slideTl)
        .addIndicators()
        .addTo(controller) //don't forget to add it to the controller

        //New animation
        const pageTl = gsap.timeline()
        let nextSlide = slides.length - 1 === i ? "end" : slides[i + 1]
        pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"}) //adds moment before scrolling next slide up -> gets slide stuck on page for a while
        pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5})
        pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5") //reverses to end moment

        //Create Scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
        .setPin(slide, {pushFollowers: false}) //section gets stuck in page, scrolling up stops + removes space between slides
        .setTween(pageTl)
        .addTo(controller)
    })
}

animateSlides()



// // Basics
// gsap.registerPlugin(ScrollTrigger);

// function animateSlides() {
//     // Selectors
//     const sliders = document.querySelectorAll(".slide");
//     const nav = document.querySelector(".nav-header");

//     // Loops over each slide and select more parts inside of them
//     sliders.forEach((slide, i, slides) => {
//         const revealImg = slide.querySelector(".reveal-img");
//         const img = slide.querySelector("img");
//         const revealText = slide.querySelector(".reveal-text");

//         // GSAP animation
//         const slideTl = gsap.timeline({
//             defaults: {
//                 duration: 1, ease: "power2.inOut"
//             }
//         });
//         slideTl.fromTo(revealImg, {x: "0%"}, {x: "100%"});
//         slideTl.fromTo(img, {scale: 2}, {scale: 1}, "-=1");
//         slideTl.fromTo(revealText, {x: "0%"}, {x: "100%"}, "-=0.75");
//         slideTl.fromTo(nav, {y: "-100%"}, {y: "0%"}, "-=0.5");

//         // Create ScrollTrigger for slide animation
//         ScrollTrigger.create({
//             trigger: slide,
//             start: "top 25%",
//             animation: slideTl,
//             markers: true // Add markers for visualization (remove in production)
//         });

//         // New animation
//         const pageTl = gsap.timeline();
//         let nextSlide = slides.length - 1 === i ? "end" : slides[i + 1];
//         pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"});
//         pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5});
//         pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5");

//         // Create ScrollTrigger for pinning and page animation
//         ScrollTrigger.create({
//             trigger: slide,
//             pin: true,
//             pinSpacing: false,
//             start: "top top",
//             end: "+=100%", // Adjust the duration as needed
//             animation: pageTl,
//             markers: true // Add markers for visualization (remove in production)
//         });
//     });
// }

// animateSlides();

