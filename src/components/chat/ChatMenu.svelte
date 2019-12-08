<script>
  import ChatMessages from "./ChatMessages.svelte";
</script>

<style>
  .textarea {
    height: 50px;
    resize: none;
    border-color: #363636;
  }
  .button {
    float: right;
  }
</style>

<ChatMessages />

<textarea name="" id="" cols="30" rows="10" class="textarea is-dark" />
