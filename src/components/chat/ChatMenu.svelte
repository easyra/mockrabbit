<script>
  import ChatMessages from "./ChatMessages.svelte";
</script>

<style>
  .panel {
    min-height: 300px;
    max-height: 75vh;
    width: 100%;
    position: relative;
    overflow: auto;
  }

  .fas {
    cursor: pointer;
  }
</style>

<div class="panel is-black">
  <p class="panel-heading ">Chat</p>
  <p class="panel-tabs">
    <a class="is-active">Chat</a>
    <a>Donate</a>
    <a href="">Settings</a>
  </p>
  <ChatMessages />
</div>
