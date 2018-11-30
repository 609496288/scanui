<template>
    <div>
        <Form :label-width="80">
            <FormItem label="LOGO地址">
    			<Input v-model="logosrc" placeholder="http://xx.oo/logo.png"></Input>
    		</FormItem>
            <Button type="primary" style="width: 100px;" @click="logo">保存</Button> 
        </Form>
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
    name: 'system',
    data () {
        return {
            logosrc: localStorage.getItem('logosrc'),
        };
    },
    methods: {
       	logo(){
		    localStorage.setItem('logosrc',this.logosrc);
            this.$Message.info('修改成功');
		}
    },
};
</script>