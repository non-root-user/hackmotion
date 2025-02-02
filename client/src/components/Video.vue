<template>
    <div class="video-view">
      <h1>The best solution for you: Impact Training Program</h1>
      <div class="video-container">
        <video ref="video" loop @timeupdate="updateCards">
          <source src="/media/impact-drill-video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>

        <div class="video-progress-slider">
          <div class="video-progress-slider-fill" ref="videoProgressBar"></div>
        </div>

        <div class="video-description">
          <div class="video-description-card" ref="cardStaticTop" @click="jumpToTime(5)">
            <h5><span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" stroke="#5773ff" fill="none" stroke-width="2"/>
              </svg>
            </span> Static top drill</h5>
            <p>
              <span>Get a feel for the optimal wrist position at Top of your swing</span>
            </p>
          </div>
          <div class="video-description-card" ref="cardTopDrill" @click="jumpToTime(14)">
            <h5><span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" stroke="#5773ff" fill="none" stroke-width="2"/>
              </svg>
            </span> Dynamic top drill</h5>
            <p>
              <span>Dynamically train your wrist position at Top</span>
            </p>
          </div>
          <div class="video-description-card" ref="cardTopFullSwing" @click="jumpToTime(24)">
            <h5><span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M7 10l5 5 5-5" stroke="#5773ff" fill="none" stroke-width="2"/>
              </svg>
            </span> Top full swing challenge</h5>
            <p>
              <span>Train your maximum power swing</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
<script lang="ts">
    import { Analytics, EventTypes } from '../services/analytics';

    export default {
      data: () => {
        return {
          videoProgress: "0%",
          videoEndEventSent: false,
        }
      },

      mounted() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const video = this.$refs.video as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.play();
            }
          });
        }, { threshold: 0.5 });

        observer.observe(this.$refs.video);
      },
  
      methods: {
        jumpToTime(time: number) {
          const video = this.$refs.video as HTMLVideoElement;
          video.currentTime = time;
        },

        updateCards() {
          const video = this.$refs.video as HTMLVideoElement;
          const currentTime = video.currentTime;
          const progressPercent = (currentTime / video.duration) * 100;

          this.videoProgress = `${progressPercent}%`;

          if (currentTime >= video.duration - 5 && !this.videoEndEventSent) {
            Analytics.sendData(Analytics.gatherData(), EventTypes.VIDEO_WATCHED);
            this.videoEndEventSent = true;
          }

          if (window.innerWidth < 1000) {
            this.$refs.videoProgressBar.style.width = this.videoProgress;
            this.$refs.videoProgressBar.style.height = "100%";
          } else {
            this.$refs.videoProgressBar.style.height = this.videoProgress;
            this.$refs.videoProgressBar.style.width = "100%";
          }

          const allCards = [
            {card: this.$refs.cardStaticTop, time: 5},
            {card: this.$refs.cardTopDrill, time: 14},
            {card: this.$refs.cardTopFullSwing, time: 24},
          ];

          allCards.forEach(card => {
            const cardElement = card.card as HTMLElement;
            const cardTime = card.time;

            if (currentTime >= cardTime) {
              cardElement.classList.add("active");
              if (cardElement.previousElementSibling) {
                cardElement.previousElementSibling.classList.remove("active");
              }
            } else {
              cardElement.classList.remove("active");
            }
          });
        },
      }
    }
</script>
<style lang="scss" scoped>
    .video-view {
      width: 100%;
      padding: 50px 100px;
      box-sizing: border-box;
      overflow: hidden;
    }

    h1 {
      margin-bottom: 20px;
      color: #5773ff;
      font-weight: 500;
    }

    video {
      max-width: 60%;
      display: inline-block;
      vertical-align: top;
    }

    .video-container {
      position: relative;
    }

    .video-progress-slider {
      display: inline-block;
      vertical-align: top;
      width: 5px;
      background: #fff;
      height: 100%;
      position: absolute;
      margin-left: 20px;
      border-radius: 5px;

      .video-progress-slider-fill {
        width: 100%;
        background: #5773ff;
        height: 20%;
        border-radius: 5px;
        transition: all .3s linear;
      }
    }

    .video-description {
      display: inline-block;
      width: 40%;
      box-sizing: border-box;
      padding-left: 60px;

      h5 {
        margin: 0;
        padding: 0;
        color: #5773ff;
        font-weight: 500;
        cursor: pointer;
        font-size: 1.25rem;

        svg {
          transition: all 0.3s ease;
          transform: rotate(0) translateY(-2px);
          vertical-align: middle;
        }
      }

      p {
        font-size: 1rem;
        overflow: hidden;
        height: 0;
        margin-bottom: 0;

        span {
          display: block;
          transition: all 0.3s ease;
          transform: translateY(-20px);
        }
      }

      .active {
        h5 svg {
          transform: rotate(180deg);
        }

        p {
          height: auto;
          margin-bottom: 20px;

          span {
            transform: translateY(0);
          }
        }
      }
    }

    @media screen and (max-width: 1000px) {
      .video-view {
        padding: 0 20px;
      }

      video {
        max-width: 100%;
      }

      .video-progress-slider {
        /* make horizontal */
        width: 100%;
        height: 5px;
        margin-left: 0;
        margin-top: 20px;
        display: block;
        
        .video-progress-slider-fill {
          height: 100%;
          width: 20%;
        }
      }

      .video-description {
        display: block;
        padding-left: unset;
        margin-top: 50px;
        width: 100%;
      }
    }
</style>
  
  