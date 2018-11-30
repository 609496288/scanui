<template>
    <div @click="showMessage" class="message-con">
        <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <Badge :count="value" dot>
                <Icon type="ios-bell" :size="22"></Icon>
            </Badge>
        </Tooltip>
    </div>
</template>

<script>
//!/usr/bin/env nodejs
// encoding=utf-8
//codeby     道长且阻
//email      ydhcui@suliu.net/QQ664284092
//https://github.com/ydhcui/scanui
import util from '@/libs/util.js';
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        showMessage () {
            util.openNewPage(this, 'message_index');
            this.$router.push({
                name: 'message_index'
            });
        }
    }
};
</script>
