<script>
  import ChatMessages from "./ChatMessages.svelte";
</script>

<style>
  .chat {
    min-height: 300px;
    width: 100%;
    position: relative;
    overflow: auto;
    height: 100%;
    max-height: 85%;
  }
  .textarea {
    height: 10%;
  }
  .button {
    float: right;
  }
</style>

<button class="button is-danger is-fullwidth">Subscribe Now!</button>
<div class="chat">
  <ChatMessages />
</div>
<textarea name="" id="" cols="30" rows="10" class="textarea" />
