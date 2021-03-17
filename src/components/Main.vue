<template>
  <div>
    <h1>APT GROUPS GRAPHS</h1>
    <p>
      Visualize live data from the ATT&CK service.
    </p>
    <p>
      <a href="https://github.com/Dadard29/cti-api"><img src="../assets/icons8-github-48.png" alt="github"></a>
      <a href="https://gitlab.com/dadard/cti-api"><img src="../assets/icons8-gitlab-48.png" alt="gitlab"></a>
      <a href="https://documenter.getpostman.com/view/7424587/TWDRtLFb"><img src="../assets/postman.png" alt="postman"></a>
    </p>
    <Controls ref="controls"></Controls>
  </div>
</template>

<script>
import Controls from "@/components/Controls";
export default {
  name: 'Main',
  components: {Controls},
  methods: {

  }
}
</script>


<style scoped>

</style>
