"use strict";

const setPortfoiloTemplate = (src, mainTitle, gitLink, webLink) => {
    return `
    <div class="portfolio-card opacity-0">
                    <div class="portfolio-img-wrapper">
                        <img src="${src}" alt="project-img-1">
                    </div>
                    <div>
                        <h3 class="portfolio-title">${mainTitle}</h3>
                        <div class="space-x-4">
                            <a href="${gitLink}" class="portfolio-card-btn">github</a>
                            <a href="${webLink}" class="portfolio-card-btn">website</a>
                        </div>
                    </div>
                </div>
                `
},
    portfolioWrapper = document.getElementById("profile-wrapper"),
    title = document.getElementById("main-title"),
    hiElem = document.getElementById("say-hi"),
    skillCards = document.querySelectorAll(".skill-card"),
    skillCardsWrapper = document.getElementById("skill-cards-wrapper"),
    footer = document.querySelector("footer"),
    scrollBtn = document.getElementById("scroll-back"),
    portfolioCards = document.getElementsByClassName("portfolio-card");

let batteryLevel,
    isCharging;
//  ========================================================> Functions <========================================================  \\
function getboundTop(elem) {
    return elem.getBoundingClientRect().top - (window.innerHeight / 1.5);
}

async function windowLoadHandler() {
    setTimeout(() => {
        title.classList.remove("opacity-0", "translate-y-14");
        hiElem.classList.remove("opacity-0", "-translate-x-24");
    }, 100);

    await setInterval(() => {
        window.navigator.getBattery().then(data => {
            batteryLevel = data["level"];
            isCharging = data["charging"];
        });
    }, 100);
    let batteryCendition = batteryLevel < 0.50 || isCharging;

    document.body.addEventListener("mousemove", event => {

        if (window.innerWidth < 768 || batteryCendition) {
            return false;
        }

        if (window.navigator.deviceMemory < 4) {
            return false;
        }

        document.body.insertAdjacentHTML("beforebegin", `

                    <span class="fallower" style="left:${event.pageX}px;top:${event.pageY}px"></span>
        `);

        for (let item of document.getElementsByClassName("fallower")) {
            item.addEventListener("animationend", event => item.remove());
        }
    });
}

//  ========================================================> Event listeners <========================================================  \\

window.addEventListener("load", () => {
    fetch("./../json/potfolios.json").then(res => {
        if (res.status == 200) {
            return res.json();
        } else {
            console.log("Error we cant found data");
        }
    })
        .then(data => {
            for (let item of data) {
                portfolioWrapper.insertAdjacentHTML("beforeend", setPortfoiloTemplate(item["img-src"], item["title"], item["git-link"], item["website-link"]));
            }
        })
        .catch(err => {
            console.warn(err);
        })
})

window.addEventListener("load", windowLoadHandler);

window.addEventListener("scroll", event => {
    // ------------------------------------------------> portfolioCards
    for (let item of portfolioCards) {
        if (getboundTop(item) < 0) {
            item.classList.remove("opacity-0");
        } else {
            item.classList.add("opacity-0");
        }
    }
    //  -----------------------------------------------> skillCards
    if (getboundTop(skillCardsWrapper) < 0) {
        for (let item of skillCards) {
            item.classList.remove("opacity-0", "translate-y-64");
        }
    } else {
        for (let item of skillCards) {
            item.classList.add("opacity-0", "translate-y-64");
        }
    }
    // -------------------------------------------------> footer
    if (footer.getBoundingClientRect().top - (window.innerHeight + 100) < 0) {
        footer.style.cssText = `transform:translateY(0px);`;
    } else {
        footer.style.cssText = `transform:translateY(200px);`;
    }
});
//  =============> smooth scroll
scrollBtn.addEventListener("click", e => {
    window.scrollTo(0, 0);
})