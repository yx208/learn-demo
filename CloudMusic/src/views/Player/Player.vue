<template>
    <div class="player-container">
        <div class="inner-container">
            <player-topbar></player-topbar>
            <div class="center-container">
                <div class="f-c-center album">
                    <div class="album-cover-wrap">
                        <img class="album-cover" src="@/assets/images/avatar.jpg" alt="">
                    </div>
                </div>
                <player-operate></player-operate>
                <player-progress></player-progress>
            </div>
            <player-controller @control="onController"></player-controller>
        </div>
    </div>
</template>

<script lang="ts">

    import { defineComponent, onMounted } from "vue"
    import PlayerTopbar from "@/components/Player/PlayerTopbar.vue"
    import PlayerOperate from "@/components/Player/PlayerOperate.vue"
    import PlayerProgress from "@/components/Player/PlayerProgress.vue"
    import PlayerController from "@/components/Player/PlayerController.vue"
    import AudioPlayer from "../../utils/Player"

    export default defineComponent({
        name: 'Player',
        components: {
            PlayerTopbar,
            PlayerOperate,
            PlayerProgress,
            PlayerController
        },
        setup() {

            // const src = 'http://m7.music.126.net/20210419202131/0c1b4d208f7b7a7645a225a854d41102/ymusic/ts/free/ce1a55a64685a36efbb7eb27e14ba3a1.mp3'
            // const audio = new Audio('@/assets/audio/17.flac')
            // let isPlay = false

            // const player = new AudioPlayer('http://m7.music.126.net/20210419213144/506036ea4eaacf3e39a44308b901fbd9/ymusic/ts/free/ce1a55a64685a36efbb7eb27e14ba3a1.mp3')

            function onController(type) {

                // player.play()

                // isPlay ? audio.pause() : audio.play()
                // isPlay = !isPlay
            }

            return {
                onController
            }
        }
    })

</script>

<style scoped>

    .player-container {
        height: 100vh;
        /*background: var(--light-color);*/
        background-image: url('@/assets/images/avatar.jpg');
        background-size: cover;
        background-position: center center;
        color: var(--light-color);
    }

    .inner-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        color: var(--three-level);
        background-color: rgba(0, 0, 0, .8);
        backdrop-filter: blur(20px);
    }

    .center-container {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .album {
        flex: 1;
    }

    .album-cover-wrap {
        width: 400rem;
        height: 400rem;
        overflow: hidden;
        font-size: 0;
        border-radius: 50%;
    }

    .album-cover {
        width: 100%;
        height: 100%;
    }

</style>
