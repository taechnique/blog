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
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Categories</a>
                    </li>
                    <li>
                        <span id="search-wrapper" class="search-box">
                            <input class="search-input" type="search" placeholder="검색어 입력">
                        </span>
                    </li>
                    <li>
                        <div id="mode-wrapper" class="color-mode-box" @mouseover="isModeHover = true" @mouseout="isModeHover = false">
                            <div class="switch-name">
                                <div class="dark-mode-wrapper">
                                    <input type="checkbox" name="dark-mode" id="dark-mode"  @change="switchDarkMode($event)">
                                    <label for="dark-mode">dark mode</label>
                                    <div class="switch" v-bind:class="{ active: isDark }" @click="clickSwitch($event)">
                                        <div class="switch-button" v-bind:class="{ active: isDark }"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="comming-soon" :class="{ ment: isModeHover }">
                                <span>준비 중..</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>        
</template>

<script>
export default {
    data() {
        return {
            isDark: false,
            isModeHover: false
        }
    },
    methods: {
        switchDarkMode: function(e) {
            this.isDark = e.target.checked
            
        },
        clickSwitch: function(e) {
            this.isDark = !this.isDark
        }
    }
}
</script>