<template>
    <div class="header">
      <img src="/media/logo.png" alt="HackMotion" />
    </div>
  </template>
<script lang="ts">
    export default {
      data: () => {
        return {

        }
      },
  
      methods: {

      }
    }
</script>
<style lang="scss" scoped>
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

    .header {
        width: 100%;    
        padding: 40px;
        box-sizing: border-box;

        img {
            animation: fade-in 1s ease-out .75s 1 forwards;
            opacity: 0;
            transform: translateY(-5px);
        }
    }

    @media (max-width: 1000px) {
        .header {
            display: none;
        }
    }
</style>
  
  