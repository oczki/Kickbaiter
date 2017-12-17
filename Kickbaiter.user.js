// ==UserScript==
// @name         Kickbaiter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  The WORLD'S FIRST, SMART, ULTIMATE userscript which hides projects that use clickbait-y text.
// @author       fri
// @match        https://www.kickstarter.com/discover/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const triggers = [
        "(?!smartp)smart([^p]|er|est)?",  // smart, smarter, smartest, but not smartphone
        "simple(r|st)?",
        "(world'?s? )?(1|fir|be|mo|smalle|large|wide)st",
        "game chang.*",
        "innovat.*",
        "levitat.*",
        "revolut.*",
        "3d print.*",        // way too many of them
        "ultimate",
        "re[id]\\w{3,7}ed",  // reinvented, reimagined, redesigned
        "hologra.*",         // these are not holograms
        "all\\-?in\\-?one"
    ];

    const processedFlag = "kickbait-processed";
    const projectSelector = "div.mb5";
    const titleSelector = "div.clamp-3 a";

    function getProjectTitle(project) {
        let title = project.querySelector(titleSelector);
        if (title)
            return title.innerHTML;
        return "";
    }

    function isClickbait(text) {
        let regexp = new RegExp(triggers.join("|"), "i");
        return regexp.test(text);
    }

    function markAsClickbait(project) {
        project.classList.add("kickbait");
    }

    function processProject(project) {
        let title = getProjectTitle(project);
        if (isClickbait(title)) {
            markAsClickbait(project);
        }
    }

    function setProcessedFlag(project) {
        project.setAttribute(processedFlag, "true");
    }

    function wasProcessed(project) {
        return project.getAttribute(processedFlag) === "true";
    }

    function processProjectIfNeeded(project) {
        if (!wasProcessed(project)) {
            processProject(project);
            setProcessedFlag(project);
        }
    }

    function getProjects() {
        return document.querySelectorAll(projectSelector);
    }

    function run() {
        setTimeout(run, 1000);
        let projects = getProjects();
        for (let project of projects) {
            processProjectIfNeeded(project);
        }
    }

    function applyCss(rules) {
        let styleElem = document.createElement("style");
        styleElem.type = "text/css";
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = rules;
        } else {
            styleElem.innerHTML = rules;
        }
        document.head.appendChild(styleElem);
    }

    run();

    applyCss(`
        .kickbait {
            opacity: 0.15;
            transition: opacity 0.5s;
        }
        .kickbait:hover {
            opacity: 0.5;
        }
        .kickbait * {
            cursor: not-allowed;
        }
    `);

})();