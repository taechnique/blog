<template>
    <div class="phantom-header-wrapper">
        <div class="nav-bar">
            <div class="window-controller">
                <div class="window window-close">
                </div>
                <div class="window window-minimize">
                </div>
                <div class="window window-maximize">
                </div>
            </div>
            <div class="nav-bar-element">
                <ul>
            </div>
        </div>
    </div>        
</template>

<script>
export default {
    menuArray = ['About', 'Post', 'github']
}
</script>

<style scoped>
.nav-bar {
    width:  80%;
    height: 120px;
    margin: 20px auto;
    background-color: #fcfcfc;
    border-radius: 15px;
    box-shadow: 0 1px 8px 0 rgb(32 33 36 / 28%);
}
.nav-bar .window-controller {
    display: block;
    padding: 5px;
    background-color:#ededed;
    border-radius: 15px 15px 0px 0px;
}
.nav-bar .window-controller .window {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1.46px solid lightgrey;
    display: inline-block;
    margin: 5px 2px;
}
.nav-bar .window-controller .window-close {
    background-color: #d55934;
}
.nav-bar .window-controller .window-minimize {
    background-color: #f1c54a;
}
.nav-bar .window-controller .window-maximize {
    background-color: #22b12d;
}
</style>