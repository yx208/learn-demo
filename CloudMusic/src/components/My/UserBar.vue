<template>
    <div class="user-bar-container">
        <div class="avatar-wrap"><img class="avatar" src="@/assets/images/avatar.jpg" alt=""></div>
        <div class="content">
            <p class="name">白衣莹墨</p>
            <div class="meta">
                <div class="vip-wrap"><img class="vip" src="@/assets/images/common/level.png" alt=""></div>
                <span class="level">Lv.9</span>
            </div>
        </div>
        <div class="right-token"><i class="iconfont icon-arrow-right-1"></i></div>
    </div>
</template>

<style scoped>

    .user-bar-container {
        padding: 12rem 46rem 32rem ;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .avatar-wrap {
        width: 100rem;
        height: 100rem;
        overflow: hidden;
        font-size: 0;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
    }

    .avatar {
        width: 100%;
        height: 100%;
    }

    /* 中间的 */

    .content {
        margin-left: 24rem;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-items: center;
    }

    .name {
        font-weight: bold;
        margin-bottom: 16rem;
    }

    .meta {
        height: 100%;
        display: flex;
    }

    .vip-wrap {
        width: 80rem;
        font-size: 0;
    }

    .vip {
        width: 100%;
    }

    .level {
        height: 30rem;
        line-height: 30rem;
        padding: 0 10rem;
        margin-left: 12rem;
        font-size: 20rem;
        background-color: var(--light-color);
        border-radius: 32rem;
    }


    /* right */

    .right-token .iconfont {
        font-size: 36rem;
    }

</style>