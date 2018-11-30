<style lang="less">
    .own-space{
    &-btn-box{
        margin-bottom: 10px;
        button{
            padding-left: 0;
            span{
                color: #2D8CF0;
                transition: all .2s;
            }
            span:hover{
                color: #0C25F1;
                transition: all .2s;
            }
        }
    }
    &-tra{
        width:10px;
        height:10px;
        transform:rotate(45deg);
        position:absolute;
        top:50%;
        margin-top:-6px;
        left:-3px;
        box-shadow:0 0 2px 3px rgba(0,0,0,.1);
        background-color:white;z-index:100;
    }
    &-input-identifycode-con{
        position:absolute;
        width:200px;
        height:100px;
        right:-220px;
        top:50%;
        margin-top:-50px;
        border-radius:4px;
        box-shadow:0 0 2px 3px rgba(0,0,0,.1);
    }
}

</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="用户姓名：" prop="realname">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.realname" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户手机：" prop="phone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.phone" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <!--
                        <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                    </FormItem>
                    <FormItem label="公司：">
                        <span>{{ userForm.company }}</span>
                    </FormItem>
                    <FormItem label="部门：">
                        <span>{{ userForm.department }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" @click="userupdate">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" @click="userpwd">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
//!/usr/bin/env nodejs
// encoding=utf-8
//codeby     道长且阻
//email      ydhcui@suliu.net/QQ664284092
//https://github.com/ydhcui/scanui
import util from '@/libs/util.js';
import CryptoJS from 'crypto-js'
export default {
    name: 'own-space',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                realname: '',
                phone: '',
                company: '',
                department: ''
            },
            uid: '',  // 登录用户的userId
            securityCode: '',  // 验证码
            phoneHasChanged: false,  // 是否编辑了手机
            save_loading: false,
            identifyError: '',  // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false,  // 验证码是否正确
            hasGetIdentifyCode: false,  // 是否点了获取验证码
            canGetIdentifyCode: false,  // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            gettingIdentifyCodeBtnContent: '获取验证码'  // “获取验证码”按钮的文字
        };
    },
    methods: {
        getIdentifyCode () {
            this.hasGetIdentifyCode = true;
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    this.canGetIdentifyCode = true;
                    let timeLast = 60;
                    let timer = setInterval(() => {
                        if (timeLast >= 0) {
                            this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
                            timeLast -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '获取验证码';
                            this.canGetIdentifyCode = false;
                        }
                    }, 1000);
                    this.inputCodeVisible = true;
                    // you can write ajax request here
                }
            });
        },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.$store.commit('removeTag', 'ownspace_index');
            sessionStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        userupdate () {

            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                  util.ajax({
                        method:'POST',
                        action:'userupdate',
                        json: this.userForm
                    }).then(res => {
                        this.$Message.info('修改成功');
                    }).catch(err => {
                        this.$Message.error(err);
                    });  
                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        userpwd () {
            let data = this.userForm;
            data['oldpwd']=CryptoJS.SHA256(this.editPasswordForm.oldPass).toString();
            data['newpwd']=this.editPasswordForm.newPass;//CryptoJS.SHA256(this.editPasswordForm.newPass).toString();
            util.ajax({
                method:'POST',
                action:'userupdate',
                json:data
            }).then(res => {
                this.$Message.info('修改成功');
                this.editPasswordModal = false;
                this.$store.commit('logout', this);
                this.$store.commit('clearOpenedSubmenu');
                sessionStorage.clear();
                this.$router.push({
                    name: 'login'
                });
            }).catch(err => {
                this.$Message.error(err);
            });
        },
        init () {
            util.ajax({
                method:'POST',
                action:'userinfo',
                json:{}
            }).then(res => {
                this.userForm = res;
            }).catch(err => {
                this.$Message.error(err);
            });
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        submitCode () {
            let vm = this;
            vm.checkIdentifyCodeLoading = true;
            if (this.securityCode.length === 0) {
                this.$Message.error('请填写短信验证码');
            } else {
                setTimeout(() => {
                    this.$Message.success('验证码正确');
                    this.inputCodeVisible = false;
                    this.checkIdentifyCodeLoading = false;
                }, 1000);
            }
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        }
    },
    mounted () {
        this.init();
    }
};
</script>
