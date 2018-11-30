<script>
//!/usr/bin/env nodejs
// encoding=utf-8
//codeby     道长且阻
//email      ydhcui@suliu.net/QQ664284092
//https://github.com/ydhcui/scanui
export default {
  components: {
   'remote-js': {
    render(createElement) {
      return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
    },
    props: {
      src: { type: String, required: true },
    },
  },
  },
}
</script>