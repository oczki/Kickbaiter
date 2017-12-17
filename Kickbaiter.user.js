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
        "3d print.*",       // way too many of them
        "ultimate",
        "re[id]\\w{3,7}ed",  // reinvented, reimagined, redesigned
        "hologra.*",        // these are not holograms
        "all\\-?in\\-?one"
    ];

    const processedFlag = "kickbait-processed";
    const projectSelector = "div.mb5";
    const titleSelector = "div.clamp-3";

    function getProjects() {
        return document.querySelectorAll(projectSelector);
    }

    function getProjectTitle(project) {
        return project.querySelector(titleSelector).innerHTML;
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

    function isClickbait(text) {
        let regexp = new RegExp(triggers.join("|"), "i");
        return regexp.test(text);
    }

    function markAsClickbait(project) {
        project.style.opacity = 0.5;
    }

    function processProject(project) {
        let title = getProjectTitle(project);
        if (isClickbait(title)) {
            markAsClickbait(project);
        }
    }

    function run() {
        setTimeout(run, 1000);
        let projects = getProjects();
        for (let project of projects) {
            processProjectIfNeeded(project);
        }
    }

    setTimeout(run, 1000);

})();