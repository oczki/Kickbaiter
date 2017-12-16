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

    function textMatch(haystack, needle) {
        return haystack.toLowerCase().indexOf(needle) !== -1;
    }

    function isClickbait(text) {
        return textMatch(text, "first") ||
               textMatch(text, "smart") ||
               textMatch(text, "the most") ||
               textMatch(text, "all-in-one");
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
        let projects = getProjects();
        for (let project of projects) {
            processProjectIfNeeded(project);
        }
    }

    run();

})();