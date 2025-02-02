<template>
    <div class="intro-content">
        <div class="left-content">
            <h1><span>We have put together a swing improvement solution to help you</span> <span class="break-message"><span>{{ breakMessage }}</span></span></h1>
            <div class="intro-text">
                <p>Pack includes:</p>
                <ul>
                    <li>Swing Analyzer - HackMotion Core</li>
                    <li>Drills by coach Tyler Ferrell</li>
                    <li>Game improvement plan by HackMotion</li>
                </ul>
                <button class="start-button">
                    Start Now
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        </div>
        <div class="right-content">
            <img src="/media/improv-graph.png" alt="Improvement Graph" />
            <img src="/media/improv-progress-bar.png" alt="Improvement Progress Bar" />
            <img src="/media/clubface-control.png" alt="Can clubface control improve your swing? - Yes!" />
        </div>
    </div>
  </template>
<script lang="ts">
    export default {
      data: () => {
        return {
            breakMessage: "break Par",
        }
      },

      beforeMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const breakMessage = urlParams.get("break");

        const allowedOptions = ["Par", "80", "90", "100"];

        if (allowedOptions.includes(breakMessage)) {
            this.breakMessage = `break ${breakMessage}`;
        }
      },
  
      methods: {

      }
    }
</script>
<style lang="scss" scoped>
    .left-content {
        width: 50%;
        padding: 50px 100px;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .right-content {
        width: 50%;
        max-width: 820px;
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        padding: 50px 100px;

        img {
            animation: fade-in 1s ease-out 1 forwards;
            opacity: 0;
            transform: translateY(-5px);
        }

        img:first-child {
            width: 100%;
            max-width: calc(600px + 20px);
            margin-bottom: 20px;
            animation-delay: 1s;
        }

        img:nth-child(2), img:nth-child(3) {
            width: calc(50% - 15px);
            max-width: 350px;
            vertical-align: middle;
            animation-delay: 1.5s;
        }

        img:nth-child(3) {
            float: right;
            animation-delay: 2s;
        }
        
    }

    @keyframes slide-in-h1 {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    h1 {
        margin: 0;
        padding: 0;

        span {
            vertical-align: middle;

            &.break-message {
                display: inline-block;
                color: #5773ff;
                overflow: hidden;
                white-space: nowrap;

                span {
                    display: block;
                    animation: slide-in-h1 1s ease 1 forwards;
                }
            }
        }
    }

    .intro-text {
        margin-top: 30px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        border-left: solid 5px #5773ff;
        padding: 10px;
        font-weight: 600;
        cursor: pointer;

        &:hover, &:active {
            border-left-width: 10px;
            background: rgba(255, 255, 255, .25);
        }
    }

    @keyframes arrow-transform {
        0% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }

    button {
        background: #5773ff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 20px;
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: bold;
        margin-top: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;

        svg {
            margin-left: .5rem;
        }

        &:hover, &:active {
            background: #6d85ff;

            svg {
                animation: arrow-transform .6s ease 2;
            }
        }
    }

    @media screen and (max-width: 1000px) {
        .left-content, .right-content {
            width: 100%;
            padding: 20px;
            display: block;
        }

        .right-content {
            text-align: center;
        }

        .intro-content .right-content img {
            width: 100%;
            max-width: unset;
            margin-right: 0;
            margin-bottom: 20px;
        }
        
    }
</style>
