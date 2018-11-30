<template>
    <div id="main" class="app-main">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
//!/usr/bin/env nodejs
// encoding=utf-8
//codeby     道长且阻
//email      ydhcui@suliu.net/QQ664284092
//https://github.com/ydhcui/scanui
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
