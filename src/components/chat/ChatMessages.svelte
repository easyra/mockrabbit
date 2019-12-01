<script>
  import ChatMessage from "./ChatMessage.svelte";
  import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
  import "simplebar/dist/simplebar.css";
</script>

<style>
  .chat {
    overflow: auto;
    position: absolute;
  }
</style>

<div class="chat">
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
  <ChatMessage />
</div>
